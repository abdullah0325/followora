export function otpEmailTemplate({ name, otp }) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Email Verification</title>
  </head>
  <body style="margin:0; padding:0; background:#f4f6f8;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 0;">
          <table width="100%" max-width="600" style="max-width:600px; background:#ffffff; border-radius:8px; overflow:hidden; font-family:Arial, sans-serif;">
            
            <!-- Header -->
            <tr>
              <td style="background:#2563eb; padding:20px; text-align:center; color:#ffffff;">
                <h1 style="margin:0; font-size:22px;">Email Verification</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px;">
                <p style="font-size:16px; color:#333;">Hi <strong>${name}</strong>,</p>

                <p style="font-size:14px; color:#555;">
                  Use the verification code below to complete your signup.  
                  This code is valid for <strong>10 minutes</strong>.
                </p>

                <div style="text-align:center; margin:30px 0;">
                  <span style="
                    display:inline-block;
                    background:#f1f5f9;
                    color:#111;
                    font-size:28px;
                    letter-spacing:6px;
                    padding:15px 25px;
                    border-radius:6px;
                    font-weight:bold;
                  ">
                    ${otp}
                  </span>
                </div>

                <p style="font-size:13px; color:#777;">
                  If you didn’t request this code, you can safely ignore this email.
                </p>

                <p style="margin-top:30px; font-size:14px; color:#333;">
                  Regards,<br/>
                  <strong>Ammara Team</strong>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f8fafc; padding:15px; text-align:center; font-size:12px; color:#888;">
                © ${new Date().getFullYear()} Ammara. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

export function welcomeEmailTemplate({ name }) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Welcome</title>
  </head>
  <body style="margin:0; padding:0; background:#f4f6f8;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 0;">
          <table width="100%" max-width="600" style="max-width:600px; background:#ffffff; border-radius:8px; overflow:hidden; font-family:Arial, sans-serif;">
            
            <!-- Header -->
            <tr>
              <td style="background:#16a34a; padding:25px; text-align:center; color:#ffffff;">
                <h1 style="margin:0; font-size:24px;">Welcome to Ammara 🎉</h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px;">
                <p style="font-size:16px; color:#333;">
                  Hi <strong>${name}</strong>,
                </p>

                <p style="font-size:14px; color:#555;">
                  Your account has been successfully created.  
                  We’re excited to have you as part of our community.
                </p>

                <div style="margin:30px 0; text-align:center;">
                  <p style="font-size:15px; color:#111;">
                    🚀 You can now log in and start using our services.
                  </p>
                </div>

                <p style="font-size:14px; color:#333;">
                  If you have any questions, feel free to reach out anytime.
                </p>

                <p style="margin-top:30px; font-size:14px; color:#333;">
                  Cheers,<br/>
                  <strong>Ammara Team</strong>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f8fafc; padding:15px; text-align:center; font-size:12px; color:#888;">
                © ${new Date().getFullYear()} Ammara. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}
