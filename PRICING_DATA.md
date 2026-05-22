# Pricing Data

## Official Tool Pricing

This document contains current pricing (as of May 2026) for AI tools analyzed by Credex.

---

## ChatGPT (OpenAI)

| Plan | Price | Features |
|------|-------|----------|
| Free | $0 | GPT-3.5 access, limited usage |
| Plus | $20/month | GPT-4 access, priority support |
| Team | $25/user/month (minimum 2) | Team management, priority support, higher limits |
| Enterprise | Custom | SSO, advanced admin features, custom agreements |

**Source:** https://openai.com/pricing/

**Recommendation Logic:**
- Enterprise → Team if team_size ≤ 5
- Individual Pro → Team if team_size > 3

---

## Claude API (Anthropic)

| Model | Price |
|-------|-------|
| Claude 3.5 Sonnet | $3/1M input, $15/1M output |
| Claude 3 Opus | $15/1M input, $75/1M output |
| Claude 3 Haiku | $0.25/1M input, $1.25/1M output |

**Web Access (Claude.ai):**
- Free: Limited usage
- Pro: $20/month

**Source:** https://www.anthropic.com/pricing

**Recommendation Logic:**
- High spend ($100+/month) → Audit usage patterns
- Suggest Haiku for non-critical tasks

---

## Cursor

| Plan | Price | Features |
|------|-------|----------|
| Free | $0 | Limited tokens |
| Pro | $20/month | Unlimited tokens, 500 fast requests/month |
| Business | $40/month | Team features, priority support |

**Source:** https://www.cursor.sh/pricing

**Recommendation Logic:**
- Business for 1 dev → recommend Pro
- Shared Business account → verify necessary

---

## GitHub Copilot

| Plan | Price | Features |
|------|-------|----------|
| Individual | $10/month | 1 person, all IDEs |
| Business | $21/user/month | Team management, license management |

**Source:** https://github.com/features/copilot/plans

**Recommendation Logic:**
- Verify individual vs team needs
- Check for duplicate licenses

---

## Perplexity AI

| Plan | Price | Features |
|------|-------|----------|
| Free | $0 | Web + codebase search |
| Pro | $20/month | Priority support, unlimited searches |

**Source:** https://www.perplexity.ai/

---

## NotebookLM (Google)

| Plan | Price |
|------|-------|
| Free | $0 |
| Premium | $20/month (Coming 2024) |

**Source:** https://notebooklm.google.com/

---

## Midjourney

| Plan | Price | Credits/Month |
|------|-------|----------------|
| Basic | $10/month | 3.3 hours |
| Standard | $30/month | 15 hours |
| Pro | $60/month | 30 hours |

**Source:** https://www.midjourney.com/pricing/

---

## ElevenLabs

| Plan | Price | Characters/Month |
|------|-------|-----------------|
| Free | $0 | 10,000 |
| Starter | $11/month | 100,000 |
| Creator | $99/month | 1,000,000 |

**Source:** https://elevenlabs.io/pricing

---

## Runway ML

| Plan | Price | Credits/Month |
|------|-------|----------------|
| Free | $0 | 8.33 credits |
| Starter | $20/month | 40 credits |
| Pro | $100/month | 200 credits |

**Source:** https://www.runway.com/pricing

---

## Zapier

| Plan | Price | Tasks/Month |
|------|-------|------------|
| Free | $0 | 100 |
| Starter | $24.99/month | 750 |
| Professional | $74.99/month | Unlimited |

**Source:** https://zapier.com/pricing

---

## Make (formerly Integromat)

| Plan | Price | Operations/Month |
|------|-------|------------------|
| Free | $0 | 1,000 |
| Standard | $9/month | 10,000 |
| Pro | $29/month | 50,000 |

**Source:** https://www.make.com/pricing

---

## Dify (Open Source + Managed)

| Plan | Price | Features |
|------|-------|----------|
| Self-Hosted | $0 | Full source code, can run locally |
| Managed Cloud | $9/month | Cloud hosting, 1000 API calls |

**Source:** https://dify.ai/pricing

---

## Landscape Analysis

### By Price Point

**$0-20/month:**
- ChatGPT Free, Claude.ai Free, Cursor Free, GitHub Copilot Personal
- Good for individuals, testing

**$20-50/month:**
- ChatGPT Plus, Claude Pro, Cursor Pro, Perplexity Pro
- Primary tier for individual developers
- Best cost/benefit for solo founders

**$50-100/month:**
- Teams of 2-5 people
- Multiple tools subscription
- Common overspend area

**$100+/month:**
- Enterprise plans
- Larger teams or heavy usage
- Often optimizable

### Trends

1. **Price Increases:** Most tools raised prices in 2024-2025
2. **Team Plans:** Emergence of team/business tier offerings
3. **Usage-Based:** APIs trending toward pay-per-use (Claude, OpenAI)
4. **Bundle Deals:** Increasing Microsoft/Google ecosystem bundles

---

## Data Quality Notes

- Pricing verified May 2026
- Excludes free trials and limited-time offers
- Team pricing typically $18-25 per person
- Enterprise pricing requires contact sales
- International pricing may vary

---

## How Credex Uses This Data

1. **Baseline Comparison** - Compare user's actual spend against official pricing
2. **Plan Recommendations** - Suggest lower-cost alternatives
3. **Team Sizing** - Calculate per-user costs
4. **Savings Calculations** - Compute potential monthly/yearly savings

---

## Update Frequency

This data is manually updated quarterly. For real-time pricing, check official vendor websites.

**Last Updated:** May 2026
**Next Update:** August 2026
