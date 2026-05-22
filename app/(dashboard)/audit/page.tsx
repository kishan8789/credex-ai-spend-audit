"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuditTool } from "@/types/audit";

const COMMON_TOOLS = ["ChatGPT", "Claude", "Cursor", "GitHub Copilot", "Perplexity", "NotebookLM"];

export default function AuditPage() {
    const router = useRouter();
    const [companyName, setCompanyName] = useState("");
    const [email, setEmail] = useState("");
    const [teamSize, setTeamSize] = useState(5);
    const [tools, setTools] = useState<AuditTool[]>([]);
    const [newTool, setNewTool] = useState<AuditTool>({
        name: COMMON_TOOLS[0],
        plan: "Pro",
        monthlySpend: 20,
        seats: 1,
    });
    const [loading, setLoading] = useState(false);

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("audit-draft");
        if (saved) {
            const data = JSON.parse(saved);
            setCompanyName(data.companyName || "");
            setEmail(data.email || "");
            setTeamSize(data.teamSize || 5);
            setTools(data.tools || []);
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem("audit-draft", JSON.stringify({ companyName, email, teamSize, tools }));
    }, [companyName, email, teamSize, tools]);

    const addTool = () => {
        setTools([...tools, { ...newTool }]);
        setNewTool({ name: COMMON_TOOLS[0], plan: "Pro", monthlySpend: 20, seats: 1 });
    };

    const removeTool = (index: number) => {
        setTools(tools.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/audit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    companyName,
                    email,
                    teamSize,
                    tools,
                }),
            });

            if (!response.ok) throw new Error("Failed to submit audit");

            const { id } = await response.json();
            localStorage.removeItem("audit-draft");
            router.push(`/results/${id}`);
        } catch (error) {
            alert("Error submitting audit: " + error);
        } finally {
            setLoading(false);
        }
    };

    const totalSpend = tools.reduce((sum, tool) => sum + tool.monthlySpend, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">AI Spending Audit</h1>
                    <p className="text-slate-300">Enter your current tools and spending to get personalized recommendations</p>
                </div>

                <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Company Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="company" className="text-slate-300">Company Name</Label>
                                <Input
                                    id="company"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    placeholder="Your startup name"
                                    className="mt-2 bg-slate-700/50 border-slate-600"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="email" className="text-slate-300">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="mt-2 bg-slate-700/50 border-slate-600"
                                    required
                                />
                            </div>
                        </div>

                        {/* Team Size */}
                        <div>
                            <Label htmlFor="teamSize" className="text-slate-300">Team Size: {teamSize} people</Label>
                            <input
                                id="teamSize"
                                type="range"
                                min="1"
                                max="100"
                                value={teamSize}
                                onChange={(e) => setTeamSize(parseInt(e.target.value))}
                                className="w-full mt-2"
                            />
                        </div>

                        {/* Tools Section */}
                        <div className="border-t border-slate-600 pt-8">
                            <h2 className="text-2xl font-semibold text-white mb-6">Your AI Tools</h2>

                            {tools.length > 0 && (
                                <div className="space-y-4 mb-6">
                                    {tools.map((tool, idx) => (
                                        <div key={idx} className="bg-slate-700/30 border border-slate-600 rounded p-4 flex justify-between items-center">
                                            <div>
                                                <p className="font-semibold text-white">{tool.name}</p>
                                                <p className="text-slate-400 text-sm">{tool.plan} • ${tool.monthlySpend}/month • {tool.seats} seat(s)</p>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => removeTool(idx)}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Add Tool Form */}
                            <div className="bg-slate-700/20 border border-slate-600 rounded p-6 space-y-4">
                                <h3 className="text-lg font-semibold text-white">Add a Tool</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="toolName" className="text-slate-300">Tool Name</Label>
                                        <select
                                            id="toolName"
                                            value={newTool.name}
                                            onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
                                            className="w-full mt-2 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-md text-white"
                                        >
                                            {COMMON_TOOLS.map((tool) => (
                                                <option key={tool} value={tool}>{tool}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <Label htmlFor="plan" className="text-slate-300">Plan</Label>
                                        <Input
                                            id="plan"
                                            value={newTool.plan}
                                            onChange={(e) => setNewTool({ ...newTool, plan: e.target.value })}
                                            placeholder="e.g., Pro, Team, Enterprise"
                                            className="mt-2 bg-slate-700/50 border-slate-600"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="spend" className="text-slate-300">Monthly Spend ($)</Label>
                                        <Input
                                            id="spend"
                                            type="number"
                                            value={newTool.monthlySpend}
                                            onChange={(e) => setNewTool({ ...newTool, monthlySpend: parseFloat(e.target.value) })}
                                            min="0"
                                            step="0.01"
                                            className="mt-2 bg-slate-700/50 border-slate-600"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="seats" className="text-slate-300">Seats</Label>
                                        <Input
                                            id="seats"
                                            type="number"
                                            value={newTool.seats}
                                            onChange={(e) => setNewTool({ ...newTool, seats: parseInt(e.target.value) })}
                                            min="1"
                                            className="mt-2 bg-slate-700/50 border-slate-600"
                                        />
                                    </div>
                                </div>
                                <Button
                                    type="button"
                                    onClick={addTool}
                                    variant="secondary"
                                    className="w-full"
                                >
                                    Add Tool
                                </Button>
                            </div>

                            {tools.length > 0 && (
                                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded">
                                    <p className="text-blue-200">
                                        <strong>Total Monthly Spend:</strong> ${totalSpend.toFixed(2)}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="border-t border-slate-600 pt-8">
                            <Button
                                type="submit"
                                size="lg"
                                disabled={!companyName || !email || tools.length === 0 || loading}
                                className="w-full"
                            >
                                {loading ? "Analyzing..." : "Generate My Audit"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
