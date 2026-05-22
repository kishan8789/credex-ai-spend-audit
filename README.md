Credex AI Spend Audit

AI-powered SaaS platform that helps startups analyze AI tool expenses, optimize subscriptions, and discover cost-saving alternatives.

🚀 Live Demo
Frontend: Add Vercel URL here
GitHub Repo: GitHub Repository
📌 Problem Statement

Modern startups use multiple AI tools like ChatGPT, Claude, Cursor, Notion AI, and GitHub Copilot.
Most teams overspend because they:

Use higher plans than required
Pay for unused seats
Miss cheaper alternatives
Lack centralized spending visibility

Credex AI Spend Audit solves this by generating intelligent cost optimization reports.

✨ Features
📊 Spend Analysis

Analyze current AI subscriptions and monthly costs.

🤖 AI-Powered Recommendations

Get optimized tool and pricing recommendations using Claude/OpenAI.

💰 Savings Calculator

See monthly and yearly potential savings instantly.

📧 Email Reports

Send audit summaries directly to founders or team members.

🔗 Public Share Links

Generate shareable audit URLs for stakeholders.

💾 Persistent Form State

Auto-save form data using localStorage.

📱 Responsive Dashboard

Fully responsive modern UI built using Tailwind + shadcn/ui.

🛠 Tech Stack
Frontend
Next.js
TypeScript
Tailwind CSS
shadcn/ui
Backend
Next.js API Routes
Supabase PostgreSQL
Anthropic Claude API
OpenAI GPT API
Services
Resend
Vercel
Testing
Vitest
React Testing Library
🧱 System Architecture
User → Next.js Frontend → API Routes → Audit Engine
                                   ↓
                           Supabase Database
                                   ↓
                        Claude/OpenAI AI Service
                                   ↓
                            Email + Public Links
📂 Folder Structure
/app
  /(marketing)
  /(dashboard)
    /audit
    /results/[id]

  /api
    /audit
    /email
    /public

/components
  /ui

/lib
  utils.ts
  supabase.ts
  audit-engine.ts

/services
  ai-service.ts
  email-service.ts

/types
/tests
⚙️ Environment Variables

Create .env.local

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

ANTHROPIC_API_KEY=
OPENAI_API_KEY=

RESEND_API_KEY=

NEXT_PUBLIC_APP_URL=
🗄 Database Schema
audits
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
audit_tools
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
audit_summaries
CREATE TABLE audit_summaries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  audit_id UUID REFERENCES audits(id) ON DELETE CASCADE,
  summary TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
🔄 Application Flow
User starts audit
Adds company + AI tool expenses
Audit engine analyzes subscriptions
AI generates optimization insights
Savings calculated automatically
Results displayed on dashboard
Report shared via email/public link
🧠 Audit Logic
ChatGPT
Enterprise → Team plan for small teams
Pro → Better seat optimization
Cursor
Business → Pro for solo developers
Claude API
Detects excessive API spend patterns
Generic Rules
Detect unused enterprise plans
Compare against team size
Calculate yearly savings
📡 API Endpoints
POST /api/audit

Create new audit.

{
  "companyName": "Acme Inc",
  "email": "founder@acme.com",
  "teamSize": 5
}
GET /api/public/audit/:id

Fetch public audit report.

POST /api/email/send

Send audit report via email.

🧪 Testing
npm run test
npm run test:ui

Includes:

Component testing
API testing
Audit engine validation
Utility testing
🔐 Security Considerations
API keys stored securely in environment variables
Public routes separated from internal APIs
Input validation on API routes
UUID-based public sharing
Server-side AI processing
🚀 Deployment
Deploy on Vercel
Push repository to GitHub
Import project in Vercel
Configure environment variables
Deploy

Production-ready with serverless scaling.

📈 Future Improvements
PDF export
Stripe billing integration
Benchmark analytics
Multi-user collaboration
Real-time dashboards
OAuth authentication
Admin analytics panel
📊 Business Impact

This platform helps startups:

Reduce unnecessary AI expenses
Improve SaaS budget visibility
Optimize team subscriptions
Make data-driven purchasing decisions
🤝 Contributing

Pull requests are welcome.

Please maintain:

Type safety
Test coverage
Consistent code formatting
📜 License

MIT License © 2026 Kishan Kumar

⭐ Why This Project Stands Out
Real-world SaaS problem solving
AI integration with fallback strategy
Full-stack architecture
Production-ready deployment
Scalable database design
Clean UI/UX implementation
Modern TypeScript ecosystem
