import { NextRequest, NextResponse } from "next/server";
import { auditEngine } from "@/lib/audit-engine";
import { generateAISummary } from "@/services/ai-service";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { companyName, email, teamSize, tools } = body;

        // Validate input
        if (!companyName || !email || !teamSize || !tools || tools.length === 0) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Run audit engine
        const auditResult = await auditEngine({
            tools,
            teamSize,
        });

        // Generate AI summary
        const aiSummary = await generateAISummary({
            companyName,
            teamSize,
            totalSpend: auditResult.totalCurrentSpend,
            totalSavings: auditResult.totalSavings,
            recommendations: auditResult.recommendations,
        });

        // Save audit
        const { data: auditData, error: auditError } = await supabaseAdmin
            .from("audits")
            .insert({
                email,
                company_name: companyName,
                team_size: teamSize,
                total_spend: auditResult.totalCurrentSpend,
                total_savings: auditResult.totalSavings,
            })
            .select()
            .single();

        if (auditError) throw auditError;

        // Save tool recommendations
        const toolsToInsert = auditResult.recommendations.map((rec) => ({
            audit_id: auditData.id,
            tool_name: rec.toolName,
            plan_name: rec.currentPlan,
            monthly_spend:
                tools.find((t: any) => t.name === rec.toolName)?.monthlySpend || 0,
            recommended_plan: rec.recommendedPlan,
            recommended_tool: rec.recommendedTool || null,
            estimated_savings: rec.estimatedSavings,
        }));

        const { error: toolsError } = await supabaseAdmin
            .from("audit_tools")
            .insert(toolsToInsert);

        if (toolsError) throw toolsError;

        // Save AI summary
        const { error: summaryError } = await supabaseAdmin
            .from("audit_summaries")
            .insert({
                audit_id: auditData.id,
                summary: aiSummary,
            });

        if (summaryError) {
            console.error("Summary save error:", summaryError);
        }

        return NextResponse.json(
            { id: auditData.id },
            { status: 201 }
        );
    } catch (error) {
        console.error("Audit API error:", error);

        return NextResponse.json(
            { error: "Failed to process audit" },
            { status: 500 }
        );
    }
}