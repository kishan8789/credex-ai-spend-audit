"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

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
    email: string;
    team_size: number;
    total_spend: number;
    total_savings: number;
    tools: Tool[];
    summary: string;
}

export default function ResultsPage({ params }: { params: { id: string } }) {
    const [audit, setAudit] = useState<Audit | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAudit = async () => {
            try {
                const res = await fetch(`/api/audit/${params.id}`);
                if (!res.ok) throw new Error("Failed to load audit");
                const data = await res.json();
                setAudit(data);
            } catch (err) {
                setError("Could not load your audit. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchAudit();
    }, [params.id]);

    const handleSaveReport = async () => {
        if (!audit) return;
        try {
            // Send email
            const res = await fetch("/api/email/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    to: audit.email,
                    companyName: audit.company_name,
                    auditId: audit.id,
                }),
            });

            if (!res.ok) throw new Error("Failed to send email");
            alert("Report saved! Check your email.");
        } catch (error) {
            alert("Error saving report: " + error);
        }
    };

    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/audit/${params.id}`;

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="max-w-4xl mx-auto px-4 py-16">
                    <Skeleton className="h-12 w-64 mb-8" />
                    <Skeleton className="h-40 mb-8" />
                    <Skeleton className="h-96" />
                </div>
            </div>
        );
    }

    if (error || !audit) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="max-w-4xl mx-auto px-4 py-16">
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-red-200">
                        {error}
                    </div>
                </div>
            </div>
        );
    }

    const savingsPercent = ((audit.total_savings / audit.total_spend) * 100).toFixed(1);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="max-w-4xl mx-auto px-4 py-16">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-white mb-2">{audit.company_name}'s AI Spend Audit</h1>
                    <p className="text-slate-300">Generated for {audit.email}</p>
                </div>

                {/* Savings Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                        <p className="text-slate-400 text-sm">Current Monthly Spend</p>
                        <p className="text-3xl font-bold text-white mt-2">${audit.total_spend.toFixed(2)}</p>
                    </div>
                    <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-6">
                        <p className="text-green-400 text-sm">Potential Monthly Savings</p>
                        <p className="text-3xl font-bold text-green-400 mt-2">${audit.total_savings.toFixed(2)}</p>
                    </div>
                    <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-6">
                        <p className="text-blue-400 text-sm">Annual Savings</p>
                        <p className="text-3xl font-bold text-blue-400 mt-2">${(audit.total_savings * 12).toFixed(2)}</p>
                    </div>
                </div>

                {/* Savings Reduction */}
                <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-purple-700/30 rounded-lg p-8 mb-8">
                    <p className="text-2xl font-bold text-white mb-2">
                        Potential {savingsPercent}% Reduction
                    </p>
                    <p className="text-slate-300">
                        By implementing our recommendations, you could reduce your monthly AI tool spend from ${audit.total_spend.toFixed(2)} to ${(audit.total_spend - audit.total_savings).toFixed(2)}.
                    </p>
                </div>

                {/* AI Summary */}
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-8 mb-8">
                    <h2 className="text-2xl font-semibold text-white mb-4">Executive Summary</h2>
                    <p className="text-slate-300 leading-relaxed">{audit.summary}</p>
                </div>

                {/* Recommendations */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-white mb-6">Detailed Recommendations</h2>
                    <div className="space-y-4">
                        {audit.tools.map((tool, idx) => (
                            <div key={idx} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">{tool.tool_name}</h3>
                                        <p className="text-slate-400">{tool.plan_name} → {tool.recommended_plan}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-green-400 font-semibold">${tool.estimated_savings.toFixed(2)}/month</p>
                                        <p className="text-slate-400 text-sm">${tool.monthly_spend.toFixed(2)} current</p>
                                    </div>
                                </div>
                                <div className="w-full bg-slate-700/50 rounded-full h-2">
                                    <div
                                        className="bg-green-500 h-2 rounded-full"
                                        style={{
                                            width: `${Math.min((tool.estimated_savings / tool.monthly_spend) * 100, 100)}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-8 mb-8">
                    <h2 className="text-2xl font-semibold text-white mb-6">Next Steps</h2>
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <Button onClick={handleSaveReport} size="lg" className="flex-1">
                                Save Report via Email
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => {
                                    navigator.clipboard.writeText(shareUrl);
                                    alert("Share link copied!");
                                }}
                                className="flex-1"
                            >
                                Copy Share Link
                            </Button>
                        </div>
                        <p className="text-slate-400 text-sm">
                            Share link: <code className="bg-slate-700/50 px-2 py-1 rounded">{shareUrl}</code>
                        </p>
                    </div>
                </div>

                {/* Back Link */}
                <div className="text-center">
                    <Button variant="ghost" asChild>
                        <Link href="/">← Back to Home</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
