# Business Economics

## Unit Economics

### Cost per Audit

| Component | Cost |
|-----------|------|
| LLM API (Claude) | $0.008 |
| LLM API (GPT fallback) | $0.001 |
| Database (Supabase) | $0.0001 |
| Email (Resend) | $0.01 |
| Infrastructure (Vercel) | $0.00015 |
| **Total COGS per Audit** | **~$0.02** |

### Customer Acquisition Cost (CAC)

**Launch Phase (Product Hunt):**
- Organic reach: No ad spend
- Cost to acquire: ~$0
- CTR: 5% (typical PH)
- Audit completion: 15% of traffic
- **CAC: $0**

**Growth Phase (Months 2-3):**
- Paid ads (Google, LinkedIn): $1,000/month
- Expected conversions: 200 audits/month
- **CAC: $5 per audit**

**Mature Phase (Month 3+):**
- Organic + referral: 60% of traffic
- Paid ads: 40% of traffic
- Cost: $2,000/month
- Conversions: 1,000 audits/month
- **CAC: $2 per audit**

### Lifetime Value (LTV)

**Free User Path:**
- Probability: 90% of audits
- Value: $0
- **LTV: $0**

**Premium Subscriber Path:**
- Probability: 5% convert to paid
- Monthly subscription: $29
- Avg lifetime: 12 months
- **LTV per paid: $348**

**Blended LTV per Audit:**
- (95% × $0) + (5% × $348) = **$17.40 per audit**

### CAC Payback Period

- Premium LTV: $348
- Monthly subscription revenue: $29
- Payback period: 12 months (full subscription duration)
- **Target: Break even within first year**

---

## Financial Projections (Year 1)

### Revenue Model

**Scenario 1: Freemium Only (Conservative)**

| Month | Audits | Free Users | Paid Users | MRR | ARR |
|-------|--------|-----------|-----------|-----|-----|
| 1 | 500 | 475 | 25 | $725 | $8,700 |
| 2 | 1,000 | 950 | 50 | $1,450 | $17,400 |
| 3 | 2,000 | 1,900 | 100 | $2,900 | $34,800 |
| 6 | 5,000 | 4,750 | 250 | $7,250 | $87,000 |
| 12 | 10,000 | 9,500 | 500 | $14,500 | $174,000 |

**Assumptions:**
- 5% conversion to paid monthly
- $29/month premium tier
- Average customer stays 12 months

**Scenario 2: Freemium + Affiliate (Moderate)**

Add 10% revenue from affiliate partnerships (users switching tools).

| Month | MRR (Freemium) | MRR (Affiliate) | Total MRR |
|-------|---|---|---|
| 3 | $2,900 | $290 | $3,190 |
| 6 | $7,250 | $725 | $7,975 |
| 12 | $14,500 | $1,450 | $15,950 |

**Scenario 3: Freemium + Affiliate + API (Aggressive)**

Add $500/month from API white-label tier.

- **Month 12 MRR: $16,450**
- **Year 1 Revenue: $160,000+**

---

## Operating Costs

### Fixed Monthly Costs

| Item | Cost |
|------|------|
| Vercel (Pro) | $50 |
| Supabase (Pro) | $25 |
| Anthropic API quota | $100 (buffer) |
| Email service | $30 |
| Domain + CDN | $20 |
| Analytics | $15 |
| **Total Monthly Fixed** | **$240** |

### Variable Costs (Per Audit)

- API calls: $0.009 average
- Database: $0.0001
- Email: $0.01
- **Total per audit: $0.019**

### Monthly Operating Budget

**Month 1 (500 audits):**
- Fixed: $240
- Variable (500 × $0.019): $9.50
- **Total: $249.50**
- **Margin: 90%** (excluding marketing)

**Month 12 (10,000 audits):**
- Fixed: $240
- Variable (10,000 × $0.019): $190
- **Total: $430**
- **Margin: 97%** (on COGS alone)

---

## Profitability Timeline

### Conservative Case (5% conversion)

| Month | Revenue | COGS | Gross Profit | Fixed Costs | Operating P&L |
|-------|---------|------|---|---|---|
| 1 | $725 | $10 | $715 | $240 | +$475 |
| 2 | $1,450 | $20 | $1,430 | $240 | +$1,190 |
| 3 | $2,900 | $40 | $2,860 | $240 | +$2,620 |
| 6 | $7,250 | $100 | $7,150 | $240 | +$6,910 |
| 12 | $14,500 | $190 | $14,310 | $240 | +$14,070 |

**Profitability:** Profitable from Month 1 (excluding marketing spend)

### With Marketing Spend

Including $1,000-2,000/month marketing:

| Month | Operating P&L | Marketing Spend | Net P&L |
|-------|---|---|---|
| 1 | +$475 | -$1,000 | -$525 |
| 2 | +$1,190 | -$1,500 | -$310 |
| 3 | +$2,620 | -$1,200 | +$1,420 |
| 6 | +$6,910 | -$2,000 | +$4,910 |
| 12 | +$14,070 | -$2,000 | +$12,070 |

**Break-even marketing:** Month 2-3
**Path to profitability:** Month 3

---

## Expansion Economics

### SaaS Audit Add-on

Extend to audit all SaaS tools (Slack, Notion, Figma, etc.)

**Additional Revenue:**
- 30% of users adopt ("I love this, let's do SaaS too")
- Separate tier: $19/month
- **New ARR by Month 12: $50,000+**

### AI Agency White-label

Offer product to agencies serving multiple clients.

**Economics:**
- $500/month API tier per agency
- 20 agencies by Month 12
- **New ARR: $120,000**

---

## Fundraising Potential

### Path to Seed Funding

**Metrics VCs care about:**
- Month 1: 500 audits (proof of concept)
- Month 3: 2,000 audits, $1,450 MRR (traction)
- Month 6: 5,000 audits, $7,250 MRR (growth)

**Seed Round Target:**
- Amount: $250-500K
- Use: Product (2 engineers), Marketing, Operations
- Runway: 18+ months

**Milestone for Series A:**
- $100K+ MRR
- 10K+ active users
- Proven unit economics
- 2-3 adjacent product lines

---

## Pricing Strategy

### Current: Freemium

| Tier | Price | Target | Features |
|------|-------|--------|----------|
| Free | $0 | New users | Basic audit, share link |
| Pro | $29/mo | Engaged users | Monthly re-audits, PDF export |
| API | $500/mo | Partners | White-label, API access |

### Alternative: Usage-Based

- $0.50 per audit (COGS: $0.02)
- **Margin: 96%**
- Trade-off: Unpredictable revenue

### Alternative: Value-Based

- Charge % of savings ($X audit = $2 commission)
- **Example:** $2,000/year savings = $200 charge
- Risk: Misaligned if we estimate savings wrong

### Recommended: Freemium + Premium

- Keep free tier to drive viral adoption
- Premium for power users (re-audits, reports)
- Highest lifetime value

---

## Sensitivity Analysis

### What if conversion is 3% instead of 5%?

- Month 12 MRR: $8,700 (instead of $14,500)
- Still profitable, just slower growth
- Recommendation: Improve conversion via UX

### What if LLM API costs 10x?

- COGS per audit: $0.19 (instead of $0.019)
- Still 96% margin on paid tiers
- Break-even point: Still Month 3

### What if customer stays 6 months instead of 12?

- LTV per paid: $174 (instead of $348)
- CAC payback: 6 months
- Recommendation: Focus on retention improvements

---

## Investment Ask Memo

**Credex AI: Business Model Summary**

- **Stage:** Pre-seed (MVP built)
- **Market:** $2B+ (all startups doing AI)
- **Addressable:** $20M (startups spending $100+/month on AI)
- **Gross Margin:** 95%+
- **Path to Profitability:** Month 3
- **Year 1 Revenue Projection:** $150K-200K
- **Ask:** $250K seed to 2x growth
- **Use:** 1 engineer (product), marketing, BD

**Why now?**
- AI tool proliferation (ChatGPT, Claude, Cursor, etc.)
- Cost awareness growing among founders
- First-mover advantage in this niche

**Why us?**
- Built MVP in 7 days (execution chops)
- Founder who understands AI costs
- Clear path to $1M ARR
