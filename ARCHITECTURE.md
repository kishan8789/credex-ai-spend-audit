# Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Browser                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │   Landing Page (Hero, FAQ, Social Proof)            │  │
│  │   Audit Form (localStorage persistence)             │  │
│  │   Results Page (Client-side rendering)              │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
              ↓                                  ↓
┌────────────────────────────────┐  ┌──────────────────────────┐
│   Next.js API Routes           │  │   Public Share Page      │
│  • POST /api/audit             │  │  /audit/[id]             │
│  • GET /api/audit/[id]         │  │  (No auth required)      │
│  • GET /api/public/audit/[id]  │  │                          │
│  • POST /api/email/send        │  └──────────────────────────┘
└────────────────────────────────┘
        ↓
┌────────────────────────────────────────────────────────────┐
│              Backend Services                              │
│  ┌───────────────────────────────────────────────────┐    │
│  │  Audit Engine (lib/audit-engine.ts)               │    │
│  │  • Input: tools, team size                        │    │
│  │  • Logic: tool-specific rules                     │    │
│  │  • Output: recommendations, savings               │    │
│  └───────────────────────────────────────────────────┘    │
│  ┌───────────────────────────────────────────────────┐    │
│  │  AI Service (services/ai-service.ts)              │    │
│  │  • Claude API (primary)                           │    │
│  │  • OpenAI fallback                                │    │
│  │  • Template fallback                              │    │
│  └───────────────────────────────────────────────────┘    │
│  ┌───────────────────────────────────────────────────┐    │
│  │  Email Service (services/email-service.ts)        │    │
│  │  • Resend API integration                         │    │
│  │  • HTML email templates                           │    │
│  └───────────────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────────┘
        ↓
┌────────────────────────────────────────────────────────────┐
│              External APIs & Data                          │
│  ┌──────────────────┐  ┌──────────────┐  ┌────────────┐  │
│  │  Supabase DB     │  │  Anthropic   │  │  Resend    │  │
│  │  PostgreSQL      │  │  Claude API  │  │  Email     │  │
│  │                  │  │              │  │            │  │
│  │ • audits         │  │ Summaries    │  │ Delivery   │  │
│  │ • audit_tools    │  │ Insights     │  │            │  │
│  │ • audit_summaries│  │              │  │            │  │
│  └──────────────────┘  └──────────────┘  └────────────┘  │
│                                                             │
│  ┌──────────────────┐                                      │
│  │  OpenAI API      │  (Fallback AI)                       │
│  │  GPT-3.5-turbo   │                                      │
│  └──────────────────┘                                      │
└────────────────────────────────────────────────────────────┘
```

## Data Flow

### Audit Creation Flow

```
User Input
    ↓
[Audit Form Page]
    ↓ (localStorage)
Persist Draft
    ↓
Submit Form
    ↓
POST /api/audit
    ↓
┌─ Validate Input
├─ Run Audit Engine
│  ├─ Load tool pricing
│  ├─ Apply recommendation rules
│  └─ Calculate savings
├─ Generate AI Summary
│  ├─ Try Claude API
│  ├─ Fallback to OpenAI
│  └─ Final fallback to template
├─ Save to Supabase
│  ├─ Create audit record
│  ├─ Insert recommendations
│  └─ Store AI summary
└─ Return audit ID
    ↓
Redirect to Results Page
    ↓
[Results Page]
    ↓
Fetch audit with GET /api/audit/[id]
    ↓
Display recommendations & savings
    ↓
User can:
├─ Send via email
├─ Copy share link
└─ Go back home
```

### Public Share Flow

```
User clicks share link
    ↓
/audit/[id] (public route)
    ↓
GET /api/public/audit/[id]
    ↓
Fetch audit data (limited fields)
    ↓
Display public results
    ↓
No sensitive data (email hidden)
```

## Database Schema

```
┌─────────────────────────────┐
│        audits               │
├─────────────────────────────┤
│ id (UUID, PK)               │
│ email                       │
│ company_name                │
│ team_size                   │
│ total_spend (DECIMAL)       │
│ total_savings (DECIMAL)     │
│ created_at (TIMESTAMP)      │
│ updated_at (TIMESTAMP)      │
└──────────┬──────────────────┘
           │
           │ 1:N
           │
┌──────────▼──────────────────┐
│    audit_tools              │
├─────────────────────────────┤
│ id (UUID, PK)               │
│ audit_id (FK)               │
│ tool_name                   │
│ plan_name                   │
│ monthly_spend (DECIMAL)     │
│ recommended_plan            │
│ recommended_tool            │
│ estimated_savings (DECIMAL) │
└─────────────────────────────┘

┌─────────────────────────────┐
│   audit_summaries           │
├─────────────────────────────┤
│ id (UUID, PK)               │
│ audit_id (FK)               │
│ summary (TEXT)              │
│ created_at (TIMESTAMP)      │
└─────────────────────────────┘
```

## Key Components

### Audit Engine (lib/audit-engine.ts)

Pure TypeScript module implementing the audit logic:

- **Input**: List of tools with spending, team size
- **Processing**: Apply tool-specific rules, calculate savings
- **Output**: Recommendations with reasoning and savings amounts

Rules are tool-specific and can be extended.

### AI Service (services/ai-service.ts)

Multi-layered LLM integration:

1. **Primary**: Anthropic Claude (most capable)
2. **Fallback 1**: OpenAI GPT-3.5 (backup)
3. **Fallback 2**: Template-based response (no API calls)

Prompt is dynamic based on audit data.

### Email Service (services/email-service.ts)

Handles email delivery via Resend:
- Builds HTML email with report link
- Supports future template variations
- Error handling and logging

## Deployment Architecture

```
┌──────────────────────────────────────────┐
│           Vercel (Deployment)            │
├──────────────────────────────────────────┤
│  Next.js App                             │
│  • Pages (SSR + Static)                  │
│  • API Routes (Serverless Functions)     │
│  • Edge Functions (optional)              │
└──────────────────────────────────────────┘
                  ↓
     ┌────────────┴────────────┐
     ↓                         ↓
┌──────────────┐      ┌──────────────┐
│ Supabase     │      │ Anthropic +  │
│ (Database)   │      │ OpenAI APIs  │
└──────────────┘      └──────────────┘
     ↓
┌──────────────┐
│ Resend       │
│ (Email)      │
└──────────────┘
```

## Scalability Considerations

### Current Design (MVP)

- Single Next.js deployment
- Synchronous processing
- Direct API calls to LLM services
- Database calls per request

### Future Optimizations

1. **Caching Layer**
   - Cache common recommendations
   - Use Vercel KV for temporary data

2. **Background Processing**
   - Queue AI summary generation
   - Use pg_cron for cleanup jobs

3. **Load Balancing**
   - Multiple deployment instances
   - Database connection pooling

4. **Rate Limiting**
   - Per-IP request limits
   - Per-user audit quotas

## Security

- **Database**: Row-level security not implemented (future enhancement)
- **Email**: No sensitive data in URLs, HTTPS only
- **API Keys**: Environment variables, never exposed to client
- **Public Endpoints**: Limited data exposure (no email, team size hidden)

## Monitoring

Recommended integrations:

1. **Error Tracking**: Sentry
2. **Analytics**: Vercel Analytics
3. **Logging**: Axiom or Datadog
4. **Performance**: Lighthouse CI

## Cost Estimate (Monthly)

| Service | Free Tier | Typical Cost |
|---------|-----------|-------------|
| Vercel | ✓ (14 days) | $20/month |
| Supabase | ✓ (500MB) | $25/month |
| Anthropic | - | ~$0.10 per audit |
| OpenAI | $5 credit | ~$0.01 per audit |
| Resend | ✓ (100/day) | $25/month |
| **Total** | - | ~$75/month (production) |

## Testing Strategy

See [TESTS.md](./TESTS.md) for comprehensive testing approach.
