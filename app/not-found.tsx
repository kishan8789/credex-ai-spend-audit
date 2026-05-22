import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-white mb-4">404</h1>
                <p className="text-xl text-slate-300 mb-8">Page not found</p>
                <Button asChild>
                    <Link href="/">Go back home</Link>
                </Button>
            </div>
        </div>
    );
}
