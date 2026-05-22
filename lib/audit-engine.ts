import { Recommendation } from "@/types/audit";

// Pricing database for various AI tools
const toolPricing: Record<string, Record<string, { price: number; features: string[] }>> = {
    "ChatGPT": {
        "Free": { price: 0, features: ["GPT-3.5", "Limited"] },
        "Plus": { price: 20, features: ["GPT-4", "Advanced"] },
        "Team": { price: 25, features: ["Team management", "Priority support"] },
        "Enterprise": { price: 3000, features: ["Custom pricing"] },
    },
    "Claude": {
        "API": { price: 0.003, features: ["Pay-per-use"] }, // per 1K tokens
        "Pro": { price: 20, features: ["Web interface", "High usage"] },
    },
    "Cursor": {
        "Free": { price: 0, features: ["Limited"] },
        "Pro": { price: 20, features: ["Unlimited"] },
        "Business": { price: 40, features: ["Team", "Admin"] },
    },
    "GitHub Copilot": {
        "Free": { price: 0, features: ["Limited"] },
        "Pro": { price: 10, features: ["Individual"] },
        "Business": { price: 21, features: ["Enterprise"] },
    },
};

export interface AuditEngineInput {
    tools: Array<{ name: string; plan: string; monthlySpend: number; seats: number }>;
    teamSize: number;
}

export interface AuditEngineOutput {
    recommendations: Recommendation[];
    totalCurrentSpend: number;
    totalSavings: number;
}

/**
 * Core audit engine that analyzes tool spending and generates recommendations
 */
export async function auditEngine(input: AuditEngineInput): Promise<AuditEngineOutput> {
    const recommendations: Recommendation[] = [];
    let totalCurrentSpend = 0;
    let totalSavings = 0;

    for (const tool of input.tools) {
        totalCurrentSpend += tool.monthlySpend;

        const rec = generateRecommendation(tool, input.teamSize);
        recommendations.push(rec);
        totalSavings += rec.estimatedSavings;
    }

    return {
        recommendations,
        totalCurrentSpend,
        totalSavings,
    };
}

function generateRecommendation(
    tool: { name: string; plan: string; monthlySpend: number; seats: number },
    teamSize: number
): Recommendation {
    // ChatGPT specific logic
    if (tool.name.toLowerCase().includes("chatgpt")) {
        if (tool.plan === "Enterprise" && teamSize <= 5) {
            return {
                toolName: tool.name,
                currentPlan: tool.plan,
                recommendedPlan: "Team",
                reason: "Enterprise plan is overkill for your team size. Team plan offers the same features at 1/3 the price.",
                estimatedSavings: Math.max(0, tool.monthlySpend - (25 * teamSize)),
            };
        }
        if (tool.plan === "Pro" && teamSize > 3) {
            return {
                toolName: tool.name,
                currentPlan: tool.plan,
                recommendedPlan: "Team",
                reason: "Switch to Team plan to save per-seat costs with larger groups.",
                estimatedSavings: Math.max(0, tool.monthlySpend - (25 * teamSize)),
            };
        }
    }

    // Cursor specific logic
    if (tool.name.toLowerCase().includes("cursor")) {
        if (tool.plan === "Business" && teamSize === 1) {
            return {
                toolName: tool.name,
                currentPlan: tool.plan,
                recommendedPlan: "Pro",
                reason: "Business plan is for teams. Solo developers should use Pro.",
                estimatedSavings: Math.max(0, tool.monthlySpend - 20),
            };
        }
    }

    // Claude API usage optimization
    if (tool.name.toLowerCase().includes("claude")) {
        if (tool.monthlySpend > 100) {
            return {
                toolName: tool.name,
                currentPlan: tool.plan,
                recommendedPlan: "API with optimization",
                reason: "Your spending suggests inefficient prompting. Optimize your usage patterns to reduce costs by 40%.",
                estimatedSavings: tool.monthlySpend * 0.4,
            };
        }
    }

    // Default recommendation: no change needed
    return {
        toolName: tool.name,
        currentPlan: tool.plan,
        recommendedPlan: tool.plan,
        reason: "Your current plan is optimal for your team size.",
        estimatedSavings: 0,
    };
}
