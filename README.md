# Credex AI Spend Audit

A SaaS application that helps startups analyze their AI tool spending and discover cheaper alternatives.

## Features

- 📊 **Spend Analysis** - Input your AI tools and current spending
- 💡 **Smart Recommendations** - Get personalized suggestions for cost optimization
- 📈 **Potential Savings** - See exactly how much you could save monthly and yearly
- 🤖 **AI-Generated Summary** - Get founder-friendly insights using Claude or GPT
- 📧 **Email Reports** - Save and share your audit via email
- 🔗 **Shareable URLs** - Create public audit results for team sharing

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety across the codebase
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Accessible component library

### Backend
- **Next.js API Routes** - Serverless functions for backend logic
- **Supabase PostgreSQL** - Database for audits and results
- **Anthropic Claude API** - Primary AI model for summaries
- **OpenAI GPT** - Fallback AI model

### Additional Services
- **Resend** - Email delivery
- **Vercel** - Deployment platform

### Testing
- **Vitest** - Unit and integration tests
- **React Testing Library** - Component testing

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Anthropic API key (optional but recommended)
- OpenAI API key (fallback)
- Resend account for emails

### Setup

1. **Clone and install:**
```bash
npm install
```

2. **Configure environment:**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your API keys:
- Supabase credentials
- Anthropic/OpenAI API keys
- Resend API key

3. **Set up database:**

Create these tables in Supabase:

```sql
-- Audits table
CREATE TABLE audits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  company_name TEXT NOT NULL,
  team_size INTEGER NOT NULL,
  total_spend DECIMAL NOT NULL,
  total_savings DECIMAL NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Audit tools table
CREATE TABLE audit_tools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  audit_id UUID REFERENCES audits(id) ON DELETE CASCADE,
  tool_name TEXT NOT NULL,
  plan_name TEXT NOT NULL,
  monthly_spend DECIMAL NOT NULL,
  recommended_plan TEXT NOT NULL,
  recommended_tool TEXT,
  estimated_savings DECIMAL NOT NULL
);

-- Audit summaries table
CREATE TABLE audit_summaries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  audit_id UUID REFERENCES audits(id) ON DELETE CASCADE,
  summary TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

4. **Run development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/app
  /(marketing)        # Landing pages
  /(dashboard)        # Authenticated pages
    /audit            # Audit form page
    /results/[id]     # Results page
  /api
    /audit            # Audit creation endpoint
    /email            # Email sending
    /public           # Public audit viewing
/components
  /ui                 # Reusable UI components
/lib
  - utils.ts          # Utility functions
  - supabase.ts       # Supabase client
  - audit-engine.ts   # Core audit logic
/services
  - ai-service.ts     # LLM integration
  - email-service.ts  # Email handling
/types
  - audit.ts          # TypeScript types
/tests              # Test files
```

## Main Flow

1. User lands on homepage
2. Clicks "Start Audit"
3. Fills in company info, team size, and AI tools with spending
4. Form data saved to localStorage
5. Submit triggers audit engine
6. Results page shows:
   - Current spend analysis
   - Recommendations for each tool
   - AI-generated summary
   - Total potential savings
7. User can save report via email or copy shareable link
8. Public URL allows viewing audit results without email

## Audit Logic

### Tool-Specific Rules

**ChatGPT:**
- Enterprise for small team → recommend Team plan
- Pro for large team → recommend Team plan with per-seat pricing

**Cursor:**
- Business for solo developer → recommend Pro

**Claude API:**
- High spend with low usage → recommend optimization

**Default:**
- Compare current plan against optimal tier for team size
- Calculate monthly savings

## API Endpoints

### POST /api/audit
Create a new audit

```json
{
  "companyName": "Acme Inc",
  "email": "founder@acme.com",
  "teamSize": 5,
  "tools": [
    {
      "name": "ChatGPT",
      "plan": "Enterprise",
      "monthlySpend": 200,
      "seats": 1
    }
  ]
}
```

### GET /api/audit/:id
Fetch full audit with recommendations (authenticated)

### GET /api/public/audit/:id
Fetch public audit data (no auth needed)

### POST /api/email/send
Send audit report via email

```json
{
  "to": "founder@acme.com",
  "companyName": "Acme Inc",
  "auditId": "uuid"
}
```

## Testing

Run tests:
```bash
npm run test
```

Run tests with UI:
```bash
npm run test:ui
```

## Deployment

Deploy to Vercel:

1. Push code to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## Tradeoffs

### Decisions Made

1. **localStorage for form persistence** - Simple state management without backend state
2. **Next.js API routes** - Single deployment target, no separate backend needed
3. **Supabase** - Easy setup, built-in auth ready, good free tier
4. **Claude + OpenAI** - LLM flexibility with fallback strategy
5. **Resend for email** - Developer-friendly, good deliverability

### Alternatives Considered

- Vercel KV for caching (chose simpler approach)
- Auth0 (chose Supabase for simplicity)
- S3 for file storage (chose database)

## Monitoring & Analytics

Key metrics to track:
- Audit completion rate
- Average savings discovered
- Share rate of public URLs
- Email open rate
- Tool recommendations distribution

## Future Enhancements

- PDF export of reports
- Benchmark mode (compare against similar companies)
- Referral system
- Integration with actual billing systems
- More AI tool coverage
- Advanced analytics dashboard

## Contributing

Pull requests welcome. Please maintain TypeScript types and test coverage.

## License

MIT
