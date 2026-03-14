import { renderBaseEmailTemplate } from "@/lib/mail/templates/base-template";

const APP_NAME = "X Clone";

export function renderVerificationCodeEmail(code: string, ttlMinutes = 10) {
  const text = [
    `${APP_NAME} verification code`,
    "",
    `Your code is: ${code}`,
    `This code expires in ${ttlMinutes} minutes.`,
    "",
    `If you did not request this, you can ignore this email.`,
  ].join("\n");

  const html = renderBaseEmailTemplate({
    appName: APP_NAME,
    preheader: `Your ${APP_NAME} verification code is ${code}.`,
    title: "Verify your email",
    intro: "Use the one-time code below to continue creating your account.",
    bodyHtml: `
      <div style="display:inline-block;background:#f7f9f9;border:1px solid #dbe4ea;border-radius:12px;padding:14px 18px;">
        <span style="font-size:34px;line-height:1;font-weight:800;letter-spacing:8px;color:#0f1419;">${code}</span>
      </div>
      <p style="margin:14px 0 0 0;color:#536471;font-size:14px;line-height:1.6;">
        This code expires in <strong>${ttlMinutes} minutes</strong>.<br/>
        If you didn’t request this, you can safely ignore this email.
      </p>
    `,
    footerNote: "For your security, never share this code with anyone.",
  });

  return { text, html };
}
