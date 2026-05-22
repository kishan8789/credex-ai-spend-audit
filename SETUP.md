# SETUP GUIDE

## Initial Setup

This is a complete Next.js 15 SaaS application. Follow these steps to get it running.

## Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- npm or yarn
- Git

## Installation (5 minutes)

### 1. Install Dependencies

```bash
npm install
```

This installs 50+ packages for Next.js, TypeScript, Tailwind, Supabase, and testing.

### 2. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your API keys:

```env
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Anthropic (Recommended)
ANTHROPIC_API_KEY=sk-ant-xxxxx

# OpenAI (Fallback)
OPENAI_API_KEY=sk-xxxxx

# Resend (Email)
RESEND_API_KEY=re_xxxxx
RESEND_FROM_EMAIL=noreply@credex.io

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set Up Supabase Database

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to SQL Editor
4. Run this script to create tables:

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

-- Create indexes for faster queries
CREATE INDEX idx_audits_email ON audits(email);
CREATE INDEX idx_audit_tools_audit_id ON audit_tools(audit_id);
CREATE INDEX idx_audit_summaries_audit_id ON audit_summaries(audit_id);
```

5. Copy your Supabase URL and keys to `.env.local`

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Folder Structure

```
credex/
├── app/                      # Next.js App Router
│   ├── (marketing)/          # Landing pages (public)
│   ├── (dashboard)/          # Audit pages
│   │   ├── audit/           # Audit form page
│   │   └── results/[id]/    # Results page
│   ├── audit/[id]/          # Public share page
│   ├── api/                 # API routes
│   │   ├── audit/          # Audit creation
│   │   ├── email/          # Email sending
│   │   └── public/         # Public data
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   └── globals.css          # Global styles
├── components/              # React components
│   └── ui/                 # Reusable UI components
├── lib/                    # Utilities & business logic
│   ├── supabase.ts        # DB client
│   ├── audit-engine.ts    # Core audit logic
│   └── utils.ts           # Helper functions
├── services/              # External service integrations
│   ├── ai-service.ts      # LLM integration
│   └── email-service.ts   # Email handling
├── types/                 # TypeScript types
│   └── audit.ts          # Domain types
├── tests/                 # Test files
├── public/                # Static assets
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── tailwind.config.ts     # Tailwind styles
└── README.md              # Documentation
```

---

## Running Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm start

# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Type check
npm run type-check

# Lint code
npm run lint
```

---

## Key Features

### Landing Page
- Hero section with CTA
- Feature highlights
- Savings examples
- FAQ section
- Responsive design

### Audit Form Page
- Input company info and team size
- Add AI tools with spending
- localStorage persistence
- Real-time spend calculation
- Form validation

### Results Page
- Spend analysis dashboard
- Per-tool recommendations
- AI-generated summary
- Savings visualization
- Email save & share options

### Public Share Page
- View-only audit results
- No email exposure
- Beautiful presentation
- CTA to create own audit

---

## Architecture Highlights

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Accessible components

### Backend
- **API Routes**: Serverless functions
- **Supabase**: PostgreSQL database + auth
- **Anthropic Claude**: AI summaries
- **OpenAI**: Fallback LLM

### Services
- **Resend**: Email delivery
- **Vercel**: Deployment

---

## Development Workflow

### Making Changes

1. Edit files in your favorite editor
2. Changes auto-reload on save (Hot Module Replacement)
3. Check `http://localhost:3000` to see updates
4. Run tests: `npm run test`

### Adding New Pages

```typescript
// app/new-page/page.tsx
export default function NewPage() {
  return <div>Your content here</div>;
}
```

### Adding New API Routes

```typescript
// app/api/endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();
  return NextResponse.json({ success: true });
}
```

### Adding New Components

```typescript
// components/MyComponent.tsx
export function MyComponent() {
  return <div>My component</div>;
}
```

---

## Debugging

### Server-side debugging
- Check terminal for Next.js logs
- Errors appear in console

### Client-side debugging
- Open browser DevTools (F12)
- Check Network tab for API calls
- Check Console for JavaScript errors

### Database debugging
- Go to Supabase dashboard
- Check table data directly
- Run SQL queries in SQL Editor

---

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repo
4. Add environment variables in Vercel dashboard
5. Click Deploy

**That's it!** Your app is live.

### Alternative: Self-hosted

1. Deploy to Heroku, Railway, or similar
2. Set environment variables
3. Run `npm run build && npm start`

---

## Common Issues & Fixes

### "Module not found" error
**Solution:** Run `npm install` again

### "Cannot find module '@/...'"
**Solution:** Check tsconfig.json has correct paths alias

### Database connection error
**Solution:** Check Supabase credentials in .env.local

### API returns 500 error
**Solution:** Check server logs in terminal, verify API keys

### "window is not defined"
**Solution:** Add `"use client"` at top of component

### Tests failing
**Solution:** Run `npm run test -- --reporter=verbose` to see details

---

## Next Steps

1. **Get Supabase running** (5 min)
2. **Run `npm run dev`** (2 min)
3. **Test the audit flow** (5 min)
4. **Deploy to Vercel** (10 min)
5. **Get API keys** for Claude/OpenAI (5 min)

---

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Anthropic API](https://docs.anthropic.com/)
- [Resend Email](https://resend.com/docs)

---

## Support

For questions:
1. Check [README.md](./README.md)
2. Check [ARCHITECTURE.md](./ARCHITECTURE.md)
3. Review code comments
4. Check issue tracker on GitHub

Good luck building! 🚀
