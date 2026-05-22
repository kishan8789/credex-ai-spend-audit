import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Credex - AI Spend Audit",
    description: "Analyze your AI tool spending and discover cheaper alternatives",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
