import { transporter, mailFrom } from "@/lib/mail/transporter";
import { renderVerificationCodeEmail } from "./verification-code-template";

const APP_NAME = "X Clone";

export async function sendSignupCodeEmail(email: string, code: string) {
  const { text, html } = renderVerificationCodeEmail(code, 10);

  await transporter.sendMail({
    from: mailFrom,
    to: email,
    subject: `${code} is your ${APP_NAME} verification code`,
    text,
    html,
  });
}
