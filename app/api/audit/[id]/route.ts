import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { data: audit, error: auditError } = await supabaseAdmin
            .from("audits")
            .select("*")
            .eq("id", params.id)
            .single();

        if (auditError || !audit) {
            return NextResponse.json(
                { error: "Audit not found" },
                { status: 404 }
            );
        }

        const { data: tools, error: toolsError } = await supabaseAdmin
            .from("audit_tools")
            .select("*")
            .eq("audit_id", params.id);

        if (toolsError) throw toolsError;

        const { data: summaryData } = await supabaseAdmin
            .from("audit_summaries")
            .select("summary")
            .eq("audit_id", params.id)
            .single();

        return NextResponse.json(
            {
                ...audit,
                tools,
                summary: summaryData?.summary || "",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Get audit error:", error);
        return NextResponse.json(
            { error: "Failed to fetch audit" },
            { status: 500 }
        );
    }
}
