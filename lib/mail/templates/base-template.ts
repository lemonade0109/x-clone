export function renderBaseEmailTemplate(params: {
  preheader: string;
  title: string;
  intro: string;
  bodyHtml: string;
  footerNote?: string;
  appName?: string;
}) {
  const appName = params.appName ?? "X Clone";
  const year = new Date().getFullYear();

  return `
  <!doctype html>
  <html>
    <body style="margin:0;padding:0;background:#f5f8fa;font-family:Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0f1419;">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
        ${params.preheader}
      </div>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e6ecf0;border-radius:16px;overflow:hidden;">
              <tr>
                <td style="background:#000000;padding:18px 24px;color:#ffffff;font-size:20px;font-weight:700;">
                  𝕏 ${appName}
                </td>
              </tr>

              <tr>
                <td style="padding:28px 24px 8px 24px;">
                  <h1 style="margin:0 0 8px 0;font-size:24px;line-height:1.25;">${params.title}</h1>
                  <p style="margin:0;color:#536471;font-size:15px;line-height:1.6;">
                    ${params.intro}
                  </p>
                </td>
              </tr>

              <tr>
                <td style="padding:16px 24px 8px 24px;">
                  ${params.bodyHtml}
                </td>
              </tr>

              ${
                params.footerNote
                  ? `<tr><td style="padding:8px 24px 24px 24px;color:#8b98a5;font-size:12px;line-height:1.5;">${params.footerNote}</td></tr>`
                  : ""
              }
            </table>

            <p style="margin:14px 0 0 0;color:#8b98a5;font-size:12px;">© ${year} ${appName}</p>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}
