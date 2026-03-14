import { transporter, mailFrom } from "@/lib/mail/transporter";

export async function sendSignupCodeEmail(email: string, code: string) {
  await transporter.sendMail({
    from: mailFrom,
    to: email,
    subject: "Your X Clone verification code",
    text: `Your verification code is: ${code}\nThis code expires in 10 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.5">
        <h2>Verify your email</h2>
        <p>Your verification code is:</p>
        <p style="font-size:28px; font-weight:700; letter-spacing:4px;">${code}</p>
        <p>This code expires in 10 minutes.</p>
      </div>
    `,
  });
}