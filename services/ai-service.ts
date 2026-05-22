import { Recommendation } from "@/types/audit";

export interface SummaryInput {
  companyName: string;
  teamSize: number;
  totalSpend: number;
  totalSavings: number;
  recommendations: Recommendation[];
}

export async function generateAISummary(
  input: SummaryInput
): Promise<string> {
  const savingsPercent = (
    (input.totalSavings / input.totalSpend) *
    100
  ).toFixed(1);

  const yearlySavings = (
    input.totalSavings * 12
  ).toFixed(2);

  return `
Based on your current spending of $${input.totalSpend.toFixed(
    2
  )}/month, we identified opportunities to save $${
    input.totalSavings
  }/month (${savingsPercent}% reduction).

By optimizing subscriptions and consolidating overlapping AI tools, your company could save $${yearlySavings} annually.

Recommended next step:
Implement the highest-impact savings recommendations first and reassess tool usage monthly.
`;
}