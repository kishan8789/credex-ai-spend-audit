export interface AuditTool {
    id?: string;
    name: string;
    plan: string;
    monthlySpend: number;
    seats: number;
}

export interface AuditInput {
    companyName: string;
    email: string;
    teamSize: number;
    tools: AuditTool[];
}

export interface Recommendation {
    toolName: string;
    currentPlan: string;
    recommendedPlan: string;
    recommendedTool?: string;
    reason: string;
    estimatedSavings: number;
}

export interface AuditResult {
    id: string;
    companyName: string;
    email: string;
    teamSize: number;
    totalSpend: number;
    totalSavings: number;
    recommendations: Recommendation[];
    aiSummary: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuditDatabase {
    id: string;
    email: string;
    company_name: string;
    team_size: number;
    total_spend: number;
    total_savings: number;
    created_at: string;
    updated_at: string;
}

export interface AuditToolDatabase {
    id: string;
    audit_id: string;
    tool_name: string;
    plan_name: string;
    monthly_spend: number;
    recommended_plan: string;
    recommended_tool: string | null;
    estimated_savings: number;
}
