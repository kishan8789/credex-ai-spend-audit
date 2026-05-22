"use client";

import { useState } from "react";

interface ShareSectionProps {
    shareUrl: string;
}

export function ShareSection({ shareUrl }: ShareSectionProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">Share This Audit</h2>
            <div className="flex items-center gap-2 bg-slate-900/50 p-3 rounded border border-slate-700/50">
                <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="flex-1 bg-transparent text-slate-300 text-sm outline-none"
                />
                <button
                    onClick={handleCopy}
                    className="text-blue-400 hover:text-blue-300 transition px-3 py-1 whitespace-nowrap"
                    title="Copy URL"
                >
                    {copied ? "✓ Copied" : "📋 Copy"}
                </button>
            </div>
        </div>
    );
}
