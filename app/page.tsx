import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Navigation */}
            <nav className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="text-2xl font-bold text-white">Credex</div>
                        <div className="flex gap-4">
                            <Button variant="ghost" asChild>
                                <a href="#faq">FAQ</a>
                            </Button>
                            <Button asChild>
                                <Link href="/audit">Start Audit</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        Stop Overspending on{" "}
                        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            AI Tools
                        </span>
                    </h1>
                    <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                        Analyze your AI tool spending in seconds. Get actionable recommendations to cut costs by up to 60% without sacrificing productivity.
                    </p>
                    <Button size="lg" className="text-lg px-8 py-6" asChild>
                        <Link href="/audit">Start Your Free Audit</Link>
                    </Button>
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                        <div className="text-3xl mb-4">📊</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Spend Analysis</h3>
                        <p className="text-slate-300">See exactly where your AI budget is going across all your tools.</p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                        <div className="text-3xl mb-4">💡</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Smart Recommendations</h3>
                        <p className="text-slate-300">Get personalized suggestions for cheaper plans and alternative tools.</p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                        <div className="text-3xl mb-4">📈</div>
                        <h3 className="text-xl font-semibold text-white mb-2">Potential Savings</h3>
                        <p className="text-slate-300">Discover how much you could save monthly and yearly.</p>
                    </div>
                </div>
            </section>

            {/* Savings Examples */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-y border-slate-700/50">
                <h2 className="text-3xl font-bold text-white mb-12 text-center">Real Savings Examples</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-700/30 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-white mb-4">Startup A</h3>
                        <p className="text-slate-300 mb-4">ChatGPT Pro + Cursor Business + Claude API</p>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-slate-300">Current Monthly Spend:</span>
                                <span className="font-semibold text-white">$450</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-300">Recommended Spend:</span>
                                <span className="font-semibold text-white">$180</span>
                            </div>
                            <div className="border-t border-slate-600 pt-2 mt-2 flex justify-between">
                                <span className="text-green-400 font-semibold">Potential Savings:</span>
                                <span className="text-green-400 font-bold text-lg">$3,240/year</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-700/30 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-white mb-4">Team B</h3>
                        <p className="text-slate-300 mb-4">5 seats across multiple platforms</p>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-slate-300">Current Monthly Spend:</span>
                                <span className="font-semibold text-white">$1,200</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-300">Recommended Spend:</span>
                                <span className="font-semibold text-white">$450</span>
                            </div>
                            <div className="border-t border-slate-600 pt-2 mt-2 flex justify-between">
                                <span className="text-green-400 font-semibold">Potential Savings:</span>
                                <span className="text-green-400 font-bold text-lg">$9,000/year</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-3xl font-bold text-white mb-12 text-center">FAQ</h2>
                <div className="space-y-6 max-w-2xl mx-auto">
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-2">How long does the audit take?</h3>
                        <p className="text-slate-300">Just 2-3 minutes. Input your current tools, plans, and spending, and get instant recommendations.</p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-2">Is my data secure?</h3>
                        <p className="text-slate-300">Yes. We use Supabase with enterprise-grade encryption. Your data is never shared or sold.</p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-2">Can I share my audit?</h3>
                        <p className="text-slate-300">Yes. You get a public shareable link. The recipient sees only your recommendations, not sensitive details.</p>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-2">What tools do you support?</h3>
                        <p className="text-slate-300">ChatGPT, Claude API, Cursor, Copilot, and 50+ more. If we don't have your tool, you can add it manually.</p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h2 className="text-4xl font-bold text-white mb-6">Ready to Cut Your AI Costs?</h2>
                <Button size="lg" className="text-lg px-8 py-6" asChild>
                    <Link href="/audit">Start Your Free Audit Now</Link>
                </Button>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-slate-400">
                    <p>&copy; 2026 Credex AI. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
