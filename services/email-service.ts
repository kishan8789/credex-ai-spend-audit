import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAuditEmail(
    email: string,
    companyName: string,
    auditId: string
) {
    const auditUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/audit/${auditId}`;

    try {
        const result = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || "noreply@credex.io",
            to: email,
            subject: `Your ${companyName} AI Spend Audit Report is Ready`,
            html: `
        <h1>Your AI Spend Audit is Ready</h1>
        <p>Hi there,</p>
        <p>We've completed the AI spend audit for <strong>${companyName}</strong>.</p>
        <p>Your personalized report shows potential savings and actionable recommendations to optimize your AI tool spending.</p>
        <p><a href="${auditUrl}" style="background: #3b82f6; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block;">View Your Full Report</a></p>
        <p>You can also share this report publicly using this link: <a href="${auditUrl}">${auditUrl}</a></p>
        <p>Questions? Reply to this email or visit our website.</p>
        <p>Best,<br/>Credex Team</p>
      `,
        });

        return result;
    } catch (error) {
        console.error("Failed to send email:", error);
        throw error;
    }
}
