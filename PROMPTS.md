# LLM Prompts

This document contains all prompts used to interact with Claude and OpenAI APIs.

---

## AI Summary Generation Prompt

**Purpose:** Generate founder-friendly summary of audit results

**Model:** Claude 3.5 Sonnet (primary), GPT-3.5-turbo (fallback)

**Prompt Template:**

```
You are a helpful financial advisor for AI tool spending. Analyze this company's AI tool spending and provide a concise, founder-friendly summary with actionable next steps.

Company: {companyName}
Team Size: {teamSize} people
Current Monthly Spend: ${totalSpend}
Potential Savings: ${totalSavings}/month (${totalSavings * 12}/year)

Recommendations:
{recommendationsList}

Provide a 2-3 sentence executive summary highlighting the biggest opportunity and key action items. Keep it direct and actionable. Focus on:
1. The primary cost driver
2. The #1 recommendation
3. Immediate next step (specific action)
```

**Example Output:**

```
Your team is spending $450/month on AI tools but could optimize to $180 with smarter plan selection. The biggest opportunity is consolidating from Enterprise ChatGPT and Claude API overages into Team plans—this alone saves $3,240/year. Start by downgrading ChatGPT Enterprise to Team (5-minute change, no impact) and re-evaluating Claude usage patterns this week.
```

---

## Alternative Prompt Variations

### For High-Spend Audits ($500+/month)

```
This company is spending ${totalSpend}/month on AI tools—that's ${totalSpend * 12}/year. 
Provide a brief executive summary focused on:
1. Why this level of spending might be justified
2. Where the biggest waste likely is
3. The single action that would have highest impact

Keep tone balanced—don't assume all high spend is waste.
```

### For Small Teams (1-2 people)

```
This is a solo or tiny team spending ${totalSpend}/month on AI tools.
Provide advice optimized for:
1. Minimal switching costs (they're time-constrained)
2. Consolidation opportunities (fewer tools, not more)
3. Pay-as-you-go models that fit variable usage

Avoid enterprise solutions.
```

### For High Savings Potential ($200+/month)

```
This company could save ${totalSavings}/month (${(totalSavings/totalSpend)*100}% reduction).
Create a sense of urgency by:
1. Highlighting the annual savings (${totalSavings * 12})
2. Contextualizing that amount ("that's ${totalSavings * 12 / 52} per week")
3. Suggesting a 30-day trial implementation plan
```

---

## Recommendation Generation Prompt

**Purpose:** Generate detailed reasoning for specific tool recommendations

**Model:** Used internally in audit-engine.ts (no API call)

**Logic Format:**

```typescript
{
  toolName: string;           // e.g., "ChatGPT"
  currentPlan: string;        // e.g., "Enterprise"
  recommendedPlan: string;    // e.g., "Team"
  reason: string;             // "Why this recommendation"
  estimatedSavings: number;   // Monthly USD savings
}
```

**Example Rules Encoded:**

```
IF tool == "ChatGPT" AND plan == "Enterprise" AND teamSize <= 5:
  THEN recommendedPlan = "Team"
  reason = "Enterprise plan is overkill for team size. Team plan offers same features at 1/3 cost."
  estimatedSavings = currentSpend - (25 * teamSize)
```

---

## Edge Cases & Special Prompts

### When API Fails (Template Fallback)

```
Based on your current spending of ${totalSpend}/month, we've identified opportunities to save ${totalSavings}/month (${(totalSavings/totalSpend)*100}% reduction).

By consolidating tools and optimizing plans, you could save ${totalSavings * 12} annually.

Start by implementing the highest-impact recommendations first, and reassess in 30 days to ensure each tool is still delivering value to your team.
```

### For Public Sharing

```
This company has shared their ${companyName} AI spend audit publicly. They're currently spending ${totalSpend}/month and have identified ${totalSavings}/month in potential savings through smarter tool selection.

Their top recommendation: ${topRecommendation}

Interested in optimizing your own AI spending? Run your free audit.
```

---

## Prompt Engineering Learnings

### What Works Well
- **Specificity**: Including exact numbers makes Claude more precise
- **Context**: Mentioning "founder-friendly" changes tone
- **Format**: JSON/structured output when we need parsing
- **Examples**: Showing what good output looks like improves quality

### What Doesn't Work
- **Vague instructions**: "Be helpful" produces generic output
- **Complex constraints**: Too many requirements confuse the model
- **Technical jargon**: Claude does better with plain language

### Token Optimization
- Short prompts: ~150 tokens for execution summary
- Full analysis: ~300 tokens for detailed recommendations
- Average response: 100-200 tokens
- Cost per audit: ~$0.10 Claude, ~$0.01 OpenAI

---

## API Integration Code

### Anthropic Implementation

```typescript
const message = await anthropic.messages.create({
  model: "claude-3-5-sonnet-20241022",
  max_tokens: 1024,
  messages: [
    {
      role: "user",
      content: buildPrompt(input),
    },
  ],
});

return message.content[0].text;
```

### OpenAI Fallback

```typescript
const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "user",
      content: buildPrompt(input),
    },
  ],
  max_tokens: 1024,
});

return response.choices[0].message.content;
```

---

## A/B Test Prompts (Future)

### Variant A: Action-Focused

"Your biggest opportunity is $X/month savings. Here's exactly how: [steps]"

### Variant B: Confidence-Focused

"We've identified these recommendations with 95% confidence based on your data."

### Variant C: Comparison-Focused

"Similar teams your size spend $Y/month. You're at $X."

**Metric to test:** Email save rate, follow-through on recommendations

---

## Monitoring & Quality

### Prompt Metrics
- Average response tokens: Track cost per audit
- Response time: Should be <2s for P99
- Hallucination rate: Manual spot-check for accuracy

### Quality Checks
- Does output include all ${variables}?
- Is tone consistent with brand?
- Are numbers mathematically correct?
- Are recommendations specific to this company?

---

## Future Improvements

1. **Few-shot prompting**: Add examples of great summaries
2. **Chain-of-thought**: Ask Claude to reason step-by-step
3. **Retrieval augmentation**: Look up recent tool pricing
4. **Output parsing**: Use structured formats for consistency
5. **User feedback loop**: Retrain based on what founders act on
