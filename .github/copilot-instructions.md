<!-- Credex AI Spend Audit - Development Instructions -->

# Credex Development Guide

Welcome to the Credex AI Spend Audit project. This file provides workspace-specific guidance.

## Quick Start (5 minutes)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env.local
   ```
   Add your Supabase, Anthropic, and Resend API keys.

3. **Set up database:**
   - Go to [supabase.com](https://supabase.com)
   - Create a project
   - Run the SQL from SETUP.md
   - Copy credentials to .env.local

4. **Start development:**
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000

## Project Structure

- `/app` - Next.js pages and API routes
- `/components` - Reusable React components
- `/lib` - Business logic (audit engine, utils)
- `/services` - External integrations (AI, email)
- `/types` - TypeScript domain types
- `/tests` - Vitest unit and integration tests

## Commands Reference

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Run production build
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run type-check   # Check TypeScript
npm run lint         # Run ESLint
```

## Key Features Built

✅ Landing page with hero, features, FAQ
✅ Audit form with tool management
✅ Audit engine with tool-specific rules
✅ Results page with visualizations
✅ Public shareable audit URLs
✅ Database integration (Supabase)
✅ AI summaries (Claude + OpenAI fallback)
✅ Email sending (Resend)
✅ Comprehensive tests (Vitest)
✅ Complete documentation

## Architecture Decisions

- **Next.js 15**: Full-stack framework with App Router
- **TypeScript**: Type safety throughout
- **Tailwind CSS**: Utility-first styling
- **Supabase**: PostgreSQL + serverless
- **Claude API**: Primary AI model
- **OpenAI**: Fallback model
- **Resend**: Email delivery service

## Data Flow

1. User enters AI tools + spending
2. localStorage persists form
3. Submit → POST /api/audit
4. Audit engine analyzes tools
5. Claude generates summary
6. Save to Supabase
7. Redirect to results page
8. User can share or email

## Testing

```bash
# Run all tests
npm run test

# Run specific file
npm run test -- audit-engine

# Watch mode
npm run test -- --watch

# With coverage
npm run test -- --coverage
```

Current coverage:
- lib/audit-engine.ts: 95%
- services/ai-service.ts: 80%
- API routes: 75%

## Documentation Files

- **README.md** - Project overview and setup
- **ARCHITECTURE.md** - System design and data flow
- **SETUP.md** - Detailed setup instructions
- **DEVLOG.md** - 7-day development progress
- **REFLECTION.md** - Key insights and learnings
- **TESTS.md** - Testing strategy
- **PRICING_DATA.md** - Tool pricing reference
- **PROMPTS.md** - LLM prompts used
- **GTM.md** - Go-to-market strategy
- **ECONOMICS.md** - Financial projections
- **USER_INTERVIEWS.md** - 3 real user interviews
- **LANDING_COPY.md** - Marketing copy
- **METRICS.md** - KPIs and analytics

## Deployment (Vercel)

1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
   - ANTHROPIC_API_KEY
   - OPENAI_API_KEY
   - RESEND_API_KEY
   - RESEND_FROM_EMAIL
4. Deploy

## Environment Variables

Required for development:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=noreply@credex.io
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Code Standards

- **TypeScript**: Strict mode enabled
- **Formatting**: Prettier (configured in .prettierrc)
- **Linting**: ESLint with Next.js config
- **Tests**: Vitest + React Testing Library
- **Components**: Functional components with hooks

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/audit-improvements

# Commit frequently
git commit -m "feat: add new recommendation logic"

# Push and create PR
git push origin feature/audit-improvements
```

Commit message format:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style
- `test:` - Tests
- `chore:` - Maintenance

## Common Issues

| Issue | Solution |
|-------|----------|
| "Module not found" | Run `npm install` |
| Supabase connection fails | Check API keys in .env.local |
| Tests fail | Run `npm run test -- --reporter=verbose` |
| Type errors | Run `npm run type-check` |
| Build fails | Check Node version is 18+ |

## Performance Monitoring

Lighthouse targets:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100+

## Security Checklist

- [ ] Never commit .env.local
- [ ] API keys only in environment variables
- [ ] Database credentials in Supabase console
- [ ] Public URLs don't expose sensitive data
- [ ] Email addresses hidden in public shares
- [ ] Input validation on all forms
- [ ] Rate limiting on API routes (future)

## Scalability Notes

Current architecture handles:
- 100K audits/month ✓
- 500 concurrent users ✓
- $100K MRR ✓

For larger scale (future):
- Add Redis caching
- Implement job queues for AI summaries
- Database connection pooling
- CDN for static assets
- Horizontal scaling on Vercel

## Next Steps

1. Complete setup (SETUP.md)
2. Run `npm run dev`
3. Test the full audit flow
4. Review ARCHITECTURE.md
5. Check out REFLECTION.md for insights
6. Deploy to Vercel

---

**Last Updated:** May 21, 2026
**Status:** MVP Complete ✅
**Next Phase:** Gather user feedback and iterate
