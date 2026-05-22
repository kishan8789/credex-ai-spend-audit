import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShareSection } from "@/components/ShareSection";
import { supabaseAdmin } from "@/lib/supabase";

interface Tool {
    tool_name: string;
    plan_name: string;
    monthly_spend: number;
    recommended_plan: string;
    recommended_tool: string | null;
    estimated_savings: number;
}

interface Audit {
    id: string;
    company_name: string;
    team_size: number;
    total_spend: number;
    total_savings: number;
    created_at: string;
    tools: Tool[];
    summary: string;
}

async function getAudit(id: string): Promise<Audit | null> {
    try {
        const { data: audit, error: auditError } = await supabaseAdmin
            .from("audits")
            .select("id, company_name, team_size, total_spend, total_savings, created_at")
            .eq("id", id)
            .single();

        if (auditError || !audit) return null;

        const { data: tools } = await supabaseAdmin
            .from("audit_tools")
            .select("tool_name, plan_name, monthly_spend, recommended_plan, recommended_tool, estimated_savings")
            .eq("audit_id", id);

        const { data: summaryData } = await supabaseAdmin
            .from("audit_summaries")
            .select("summary")
            .eq("audit_id", id)
            .single();

        return {
            id: audit.id,
            company_name: audit.company_name,
            team_size: audit.team_size,
            total_spend: audit.total_spend,
            total_savings: audit.total_savings,
            created_at: audit.created_at,
            tools: tools || [],
            summary: summaryData?.summary || "",
        };
    } catch (error) {
        console.error("Error fetching audit:", error);
        return null;
    }
}

// ✅ OPEN GRAPH METADATA FOR SOCIAL SHARING (Twitter, LinkedIn, Facebook)
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const audit = await getAudit(params.id);

    if (!audit) {
        return {
            title: "Audit Not Found",
            description: "This audit could not be found.",
        };
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const savingsPercent = ((audit.total_savings / audit.total_spend) * 100).toFixed(1);
    const description = `${audit.company_name}'s AI Spend Audit: Potential savings of $${audit.total_savings.toFixed(2)}/month (${savingsPercent}% reduction). Team size: ${audit.team_size}.`;

    return {
        title: `${audit.company_name}'s AI Spend Audit Results - Credex`,
        description: description,
        openGraph: {
            title: `${audit.company_name}'s AI Spend Audit Results`,
            description: description,
            type: "website",
            url: `${appUrl}/audit/${params.id}`,
            images: [
                {
                    url: `${appUrl}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: `${audit.company_name} Audit Results`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${audit.company_name}'s AI Spend Audit Results`,
            description: description,
            images: [`${appUrl}/og-image.png`],
        },
    };
}

export default async function PublicAuditPage({ params }: { params: { id: string } }) {
    const audit = await getAudit(params.id);

    if (!audit) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <nav className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="text-2xl font-bold text-white">Credex</div>
                            <Button asChild>
                                <Link href="/">Create Your Own Audit</Link>
                            </Button>
                        </div>
                    </div>
                </nav>
                <div className="max-w-4xl mx-auto px-4 py-16">
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-red-200 mb-8">
                        Could not load this audit. It may have been deleted.
                    </div>
                    <Button asChild>
                        <Link href="/">← Back to Home</Link>
                    </Button>
                </div>
            </div>
        );
    }

    const savingsPercent = ((audit.total_savings / audit.total_spend) * 100).toFixed(1);
    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/audit/${audit.id}`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header Navigation */}
            <nav className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="text-2xl font-bold text-white">Credex</div>
                        <Button asChild>
                            <Link href="/">Create Your Own Audit</Link>
                        </Button>
                    </div>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto px-4 py-16">
                {/* Page Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        {audit.company_name}'s AI Spend Audit Results
                    </h1>
                    <p className="text-slate-300">
                        Shared publicly • {new Date(audit.created_at).toLocaleDateString()}
                    </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                        <p className="text-slate-400 text-sm">Team Size</p>
                        <p className="text-3xl font-bold text-white mt-2">{audit.team_size}</p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                        <p className="text-slate-400 text-sm">Current Monthly Spend</p>
                        <p className="text-3xl font-bold text-white mt-2">${audit.total_spend.toFixed(2)}</p>
                    </div>
                    <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-6">
                        <p className="text-green-400 text-sm">Potential Monthly Savings</p>
                        <p className="text-3xl font-bold text-green-400 mt-2">${audit.total_savings.toFixed(2)}</p>
                    </div>
                </div>

                {/* Savings Reduction Highlight */}
                <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-purple-700/30 rounded-lg p-8 mb-8">
                    <p className="text-2xl font-bold text-white mb-2">
                        {savingsPercent}% Potential Reduction in AI Spend
                    </p>
                    <p className="text-slate-300 mb-4">
                        {audit.company_name} could reduce monthly AI tool spend from <span className="font-semibold">${audit.total_spend.toFixed(2)}</span> to <span className="font-semibold text-green-400">${(audit.total_spend - audit.total_savings).toFixed(2)}</span>.
                    </p>
                    <p className="text-slate-400 text-sm">
                        Annual savings potential: <span className="font-semibold text-green-400">${(audit.total_savings * 12).toFixed(2)}</span>
                    </p>
                </div>

                {/* Share URL Section */}
                <ShareSection shareUrl={shareUrl} />

                {/* AI Summary */}
                {audit.summary && (
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-8 mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">AI Analysis Summary</h2>
                        <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{audit.summary}</p>
                    </div>
                )}

                {/* Detailed Recommendations */}
                {audit.tools.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-6">Detailed Recommendations ({audit.tools.length})</h2>
                        <div className="space-y-4">
                            {audit.tools.map((tool, idx) => (
                                <div
                                    key={idx}
                                    className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-slate-600/50 transition"
                                >
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-white">{tool.tool_name}</h3>
                                            <div className="mt-2 space-y-1 text-sm">
                                                <p className="text-slate-400">
                                                    Current: <span className="text-slate-300 font-medium">{tool.plan_name}</span> (${tool.monthly_spend.toFixed(2)}/mo)
                                                </p>
                                                <p className="text-slate-400">
                                                    Recommended: <span className="text-blue-400 font-medium">{tool.recommended_plan}</span>
                                                    {tool.recommended_tool && (
                                                        <span className="text-purple-400 ml-2">
                                                            (or switch to {tool.recommended_tool})
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-green-400 font-semibold text-lg">
                                                Save ${tool.estimated_savings.toFixed(2)}/mo
                                            </p>
                                            <p className="text-green-400/70 text-sm">
                                                ${(tool.estimated_savings * 12).toFixed(2)}/yr
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-purple-700/30 rounded-lg p-8 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Ready to Audit Your Own AI Spending?</h2>
                    <p className="text-slate-300 mb-6">Get personalized recommendations in minutes.</p>
                    <Button size="lg" className="text-lg px-8 py-6" asChild>
                        <Link href="/">Create Your Free Audit</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
