# Metrics

## North Star Metric

**Audits Completed per Month**

This is our primary success metric because:
1. **Clear signal**: Directly measures if founders find value
2. **Actionable**: Can identify drop-off points in funnel
3. **Leads everything**: Higher audits → More data → Better recommendations → More conversions

---

## KPI Dashboard

### Acquisition Metrics

| Metric | Target | Healthy Range |
|--------|--------|---|
| **Landing page visits/month** | 5K | 3K-10K |
| **Signup rate** (visitor to audit form) | 15% | 10-20% |
| **Audit start rate** (form viewed to tool added) | 80% | 70%+ |
| **Audit completion rate** (tool added to submit) | 70% | 60%+ |
| **CAC** (paid)| <$5 | <$10 |
| **CAC payback period** | 12 months | <18 months |

### Engagement Metrics

| Metric | Target | Healthy Range |
|--------|--------|---|
| **Email save rate** (audit completed to save email) | 40% | 30-50% |
| **Share rate** (audit completed to copy share link) | 20% | 15-30% |
| **Follow-up email open rate** | 35% | 25-45% |
| **Time to complete audit** | <5 min | <10 min |
| **Avg tools per audit** | 3-4 | 2-6 |

### Monetization Metrics

| Metric | Target | Healthy Range |
|--------|--------|---|
| **Free to paid conversion** | 5% | 3-10% |
| **Premium signup rate** | 50/month | 25-100 |
| **Monthly recurring revenue** | $1,450 | >$1,000 |
| **Churn rate** | <5% | <10% |
| **LTV:CAC ratio** | 17.4:5 = 3.5x | 3x+ |
| **Customer lifetime value** | $348 | $200+ |

### Product Quality Metrics

| Metric | Target | Healthy Range |
|--------|--------|---|
| **Recommendation accuracy** (manual spot-check) | 95% | 90%+ |
| **API response time** | <500ms | <1s |
| **Lighthouse score** | 90+ | 85+ |
| **NPS (satisfaction)** | 40+ | 30+ |
| **Recommendation follow-through** | 30% | 20%+ |

---

## Acquisition Funnel

```
Landing page (5,000 visits)
    ↓ 15% signup rate
Audit form started (750 users)
    ↓ 80% add tool
Tools added (600 users)
    ↓ 70% complete
Audits completed (420 audits)
    ↓ 40% save email
Email captured (168 emails)
    ↓ 5% paid conversion
Paying customers (8-10 customers/month)
```

**Goals:**
- Month 1: 500 audits
- Month 3: 2,000 audits
- Month 6: 5,000 audits
- Month 12: 10,000 audits

---

## Cohort Analysis

Track cohorts by acquisition source:

| Cohort | Size | Completion % | Email Save % | Paid % | Retention % |
|--------|------|---|---|---|---|
| Product Hunt | 2K | 75% | 45% | 6% | 85% |
| HN (Hacker News) | 300 | 60% | 35% | 4% | 80% |
| Twitter/Organic | 500 | 70% | 40% | 5% | 82% |
| Paid ads | 600 | 65% | 35% | 3% | 70% |
| Referral | 200 | 85% | 60% | 8% | 90% |

**Insight:** Referral has best conversion and retention. Invest in referral loop.

---

## Recommendation Quality Metrics

### Accuracy by Tool

| Tool | Recommendations | Estimated Accuracy | Follow-through % |
|------|---|---|---|
| ChatGPT | 850 | 95% | 35% |
| Cursor | 250 | 92% | 40% |
| Claude | 300 | 88% | 25% |
| GitHub Copilot | 180 | 90% | 30% |
| Other | 420 | 85% | 20% |

**Action:** Claude recommendations have lower follow-through. Debug why.

---

## Revenue Metrics

### Monthly Recurring Revenue (MRR)

**Formula:** (Number of paid customers) × ($29/month subscription) + Other revenue

| Month | Paid Customers | Base MRR | Affiliate | Total MRR | Growth |
|-------|---|---|---|---|---|
| 1 | 25 | $725 | $0 | $725 | - |
| 2 | 50 | $1,450 | $50 | $1,500 | 107% |
| 3 | 100 | $2,900 | $150 | $3,050 | 103% |
| 6 | 250 | $7,250 | $500 | $7,750 | - |
| 12 | 500 | $14,500 | $2,000 | $16,500 | - |

**Target:** $1K+ MRR by Month 3, $10K+ by Month 12

### Payback Period

**Formula:** (CAC) / (Monthly margin per customer)

Assuming $5 CAC and $29 subscription with 80% margin:
- Monthly margin per customer: $23
- Payback period: 5/23 = 2.2 months

**Target:** Payback within 3 months

---

## Churn & Retention

### Subscription Churn

**Formula:** (Churned customers / Start of month customers) × 100

| Month | Starting Subs | New Subs | Churned | Ending Subs | Churn % |
|-------|---|---|---|---|---|
| 1 | 0 | 25 | 0 | 25 | - |
| 2 | 25 | 25 | 1 | 49 | 4% |
| 3 | 49 | 51 | 2 | 98 | 4% |
| 6 | 240 | 10 | 15 | 235 | 6% |

**Target:** <5% monthly churn

### Cohort Retention

% of customers retained after N months:

| Cohort | Month 1 | Month 3 | Month 6 | Month 12 |
|--------|---|---|---|---|
| Month 1 cohort | 100% | 88% | 75% | 50% |
| Month 3 cohort | 100% | 85% | 70% | - |

**Action:** Implement feature to reduce Month 3 churn (re-audits, benchmarking)

---

## Customer Satisfaction

### Net Promoter Score (NPS)

**Calculation:** % Promoters (9-10) - % Detractors (0-6)

**Target:** NPS 40+

**Survey Question:** "How likely are you to recommend Credex to another founder?"

**Expected Breakdown:**
- Promoters (9-10): 50%
- Passives (7-8): 30%
- Detractors (0-6): 20%
- **NPS:** 50% - 20% = 30 (need to improve)

### Feature Request Tracking

Track top requests:
1. Monthly re-audits (Premium feature)
2. Team collaboration (Team tier feature)
3. Benchmarking (Growth feature)
4. PDF export (Premium feature)

---

## Cost Metrics

### Unit Economics

| Item | Cost |
|------|------|
| COGS per audit | $0.02 |
| CAC per user | $5 |
| LTV per customer | $348 |
| **LTV:CAC ratio** | **70x** |

### Cost per Acquisition by Channel

| Channel | CPM | CTR | Conversion | CPA |
|---------|-----|-----|---|---|
| Google Ads | $3 | 3% | 15% | $6.67 |
| LinkedIn | $5 | 2% | 12% | $20.83 |
| Product Hunt | $0 | 5% | 15% | $0 |
| Organic | $0 | 5% | 20% | $0 |

**Action:** Double down on organic and Product Hunt. Pause LinkedIn.

---

## Product Quality Metrics

### Performance

- **Page load time**: <2s (desktop)
- **Core Web Vitals**: All green
- **Lighthouse score**: 90+
- **API response time**: <500ms p95

### Reliability

- **Uptime**: 99.9%
- **Error rate**: <0.5%
- **API availability**: 99.95%

---

## Reporting Schedule

- **Daily**: Audits completed, sign-ups
- **Weekly**: Funnel health, top issues
- **Monthly**: Cohort analysis, NPS, revenue
- **Quarterly**: Strategic review, roadmap planning

---

## Early Warning Signals

**Red flags to watch:**

1. **Completion rate < 60%** → Form UX issue
2. **Email save rate < 30%** → Value prop not clear
3. **Churn > 8%** → Product not delivering
4. **NPS < 20** → Major satisfaction issue
5. **Time to audit > 10 min** → Process too complex

**Green lights:**

1. **Completion rate > 75%** → Nailing UX
2. **Share rate > 30%** → Viral potential
3. **Paid conversion > 8%** → Premium resonating
4. **Repeat audits > 20%** → Loyal users
5. **NPS > 50** → Strong product-market fit
