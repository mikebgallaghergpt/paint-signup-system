export function generateWelcomeEmail({
  user_name = 'Friend',
  gift_certificate_link,
  unsubscribe_url = '#',
  goals = [],
  reasons = [],
}: {
  user_name?: string;
  gift_certificate_link?: string;
  unsubscribe_url?: string;
  goals?: string[];
  reasons?: string[];
}): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Welcome to Gallagher Art School</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #fff; padding: 0; margin: 0;">
        <div style="padding: 32px;">
          <div style="background: linear-gradient(to right, #7b42f6, #b01eff); color: white; padding: 32px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1>Welcome to<br />Gallagher Art School!</h1>
          </div>

          <p>Hi ${user_name},</p>

          <p>
            Thank you for your interest in Gallagher Art School! We're thrilled to have you join our community of passionate artists.
          </p>

          ${(goals.length || reasons.length) ? `
            <div style="background-color: #f7f7f7; border-left: 4px solid #7b42f6; padding: 16px; border-radius: 6px;">
              <p style="font-weight: bold;">🎯 Your Profile Selections:</p>

              ${goals.length ? `
                <p style="margin: 8px 0 4px 0;">🖌️ Art Goals:</p>
                <ul>${goals.map(goal => `<li>${goal}</li>`).join('')}</ul>
              ` : ''}

              ${reasons.length ? `
                <p style="margin: 8px 0 4px 0;">💡 Why You Signed Up:</p>
                <ul>${reasons.map(reason => `<li>${reason}</li>`).join('')}</ul>
              ` : ''}
            </div>
          ` : ''}

          ${gift_certificate_link ? `
            <div style="background-color: #fff3cd; border-left: 4px solid #ffa500; padding: 16px; margin-top: 16px; border-radius: 6px;">
              <p>🎁 You mentioned interest in a gift certificate! You can find more info or purchase one here:</p>
              <a href="${gift_certificate_link}" style="font-weight: bold; color: #0077ff;">${gift_certificate_link}</a>
            </div>
          ` : ''}

          <p style="margin-top: 24px;">
            Based on your interests, we think you'll love our upcoming classes. We'll be in touch soon with personalized recommendations!
          </p>

          <div style="text-align: center; margin-top: 24px;">
            <a href="https://gallagherartschool.com/classes"
               style="display: inline-block; padding: 12px 24px; background-color: #5C6BC0; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Explore Our Classes
            </a>
          </div>

          <p>Questions? Reply to this email anytime.</p>

          <p>Best regards,<br />The Gallagher Art School Team</p>

          <p style="font-size: 12px; color: #999; text-align: center;">
            © 2025 Gallagher Art School. All rights reserved.<br />
            <a href="${unsubscribe_url}" style="color: #999;">Unsubscribe</a>
          </p>
        </div>
      </body>
    </html>
  `;
}