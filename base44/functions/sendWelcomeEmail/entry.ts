import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    const { user_email, user_name } = body;

    if (!user_email) {
      return Response.json({ error: 'Missing user_email' }, { status: 400 });
    }

    const firstName = user_name ? user_name.split(' ')[0] : 'there';

    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Carena</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f7f4;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f7f4;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#5a8a64 0%,#7aaa82 100%);padding:48px 40px 40px;text-align:center;">
              <div style="display:inline-block;background:rgba(255,255,255,0.18);border-radius:16px;padding:14px 22px;margin-bottom:20px;">
                <span style="font-size:28px;">🌿</span>
              </div>
              <h1 style="margin:0;color:#ffffff;font-size:32px;font-weight:700;letter-spacing:-0.5px;line-height:1.2;">Welcome to Carena</h1>
              <p style="margin:10px 0 0;color:rgba(255,255,255,0.85);font-size:15px;">Your personal care assistant</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <p style="margin:0 0 20px;color:#2d4a32;font-size:17px;font-weight:600;line-height:1.4;">
                Hi ${firstName}! 👋
              </p>
              <p style="margin:0 0 20px;color:#4a5c4e;font-size:15px;line-height:1.7;">
                We're so happy you chose Carena to help you on your self-care journey. You've just taken the first step toward a smarter, more personalized routine — and we're here for every step of the way.
              </p>
              <p style="margin:0 0 32px;color:#4a5c4e;font-size:15px;line-height:1.7;">
                Carena can help you find products that truly match your needs, goals, and lifestyle — no more guessing what works for your skin or hair.
              </p>

              <!-- Feature pills -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td style="padding:4px;">
                    <table cellpadding="0" cellspacing="0" style="background:#f0f7f1;border-radius:12px;padding:14px 18px;width:100%;">
                      <tr>
                        <td style="width:32px;font-size:20px;">🔍</td>
                        <td style="padding-left:12px;color:#2d4a32;font-size:14px;font-weight:600;">Scan & analyze products instantly</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px;">
                    <table cellpadding="0" cellspacing="0" style="background:#f0f7f1;border-radius:12px;padding:14px 18px;width:100%;">
                      <tr>
                        <td style="width:32px;font-size:20px;">✨</td>
                        <td style="padding-left:12px;color:#2d4a32;font-size:14px;font-weight:600;">Get personalized ingredient insights</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px;">
                    <table cellpadding="0" cellspacing="0" style="background:#f0f7f1;border-radius:12px;padding:14px 18px;width:100%;">
                      <tr>
                        <td style="width:32px;font-size:20px;">🌱</td>
                        <td style="padding-left:12px;color:#2d4a32;font-size:14px;font-weight:600;">Build a routine that works for you</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="#" style="display:inline-block;background:linear-gradient(135deg,#5a8a64,#7aaa82);color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 36px;border-radius:50px;letter-spacing:0.3px;">
                      Start Your Journey →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8faf8;border-top:1px solid #e8f0e9;padding:24px 40px;text-align:center;">
              <p style="margin:0;color:#8aab8e;font-size:12px;line-height:1.6;">
                You're receiving this because you created a Carena account.<br/>
                © 2026 Carena · Your Personal Care Assistant
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: user_email,
      subject: 'Welcome to Carena 🌿',
      body: htmlBody,
      from_name: 'Carena',
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});