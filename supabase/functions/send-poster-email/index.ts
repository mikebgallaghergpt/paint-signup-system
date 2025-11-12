import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { Resend } from 'npm:resend@2.0.0';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { to } = await req.json();

    if (!to) {
      throw new Error('Email address is required');
    }

    const posterUrl = 'https://zpgvjrmupplqqwlnmfiy.supabase.co/storage/v1/object/public/posters/Pralaya.webp';

    const { data, error } = await resend.emails.send({
      from: 'Gallagher Art School <noreply@gallagherartschool.com>',
      to: [to],
      subject: '🎨 Your Exclusive Digital Poster from Gallagher Art School',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Digital Poster</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
          
          <!-- Header -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000;">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <h1 style="color: #ffffff; font-size: 24px; font-weight: 600; letter-spacing: 0.3em; margin: 0;">
                  GALLAGHER ART SCHOOL
                </h1>
                <p style="color: rgba(255,255,255,0.7); font-size: 12px; letter-spacing: 0.2em; margin: 10px 0 0 0;">
                  EXCLUSIVE DIGITAL POSTER
                </p>
              </td>
            </tr>
          </table>

          <!-- Main Content -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  
                  <!-- Welcome Message -->
                  <tr>
                    <td style="padding: 40px 40px 20px 40px; text-align: center;">
                      <h2 style="color: #1f2937; font-size: 28px; font-weight: 700; margin: 0 0 16px 0;">
                        Thank You! 🎨
                      </h2>
                      <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0;">
                        Here's your exclusive digital poster as promised.
                      </p>
                    </td>
                  </tr>

                  <!-- Poster Image -->
                  <tr>
                    <td style="padding: 20px 40px;">
                      <a href="${posterUrl}" target="_blank" style="display: block; text-decoration: none;">
                        <img src="${posterUrl}" alt="Pralaya by Michael Gallagher" style="width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                      </a>
                    </td>
                  </tr>

                  <!-- Artwork Details -->
                  <tr>
                    <td style="padding: 20px 40px; border-top: 1px solid #e5e7eb;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding: 8px 0;">
                            <p style="color: #1f2937; font-size: 14px; font-weight: 600; margin: 0;">
                              Michael Gallagher
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 4px 0;">
                            <p style="color: #6b7280; font-size: 14px; font-style: italic; margin: 0;">
                              Pralaya, 1980
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0 0 0;">
                            <p style="color: #9ca3af; font-size: 12px; margin: 0; line-height: 1.5;">
                              60 × 72 inches<br>
                              Acrylic on Canvas<br>
                              <span style="padding-top: 8px; display: block;">
                                Permanent Collection, Solomon R. Guggenheim Museum of Art, New York
                              </span>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Download Button -->
                  <tr>
                    <td align="center" style="padding: 20px 40px 40px 40px;">
                      <a href="${posterUrl}" download="Pralaya-Michael-Gallagher.webp" target="_blank" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 600; font-size: 16px;">
                        Download High-Resolution Version
                      </a>
                    </td>
                  </tr>

                  <!-- Call to Action -->
                  <tr>
                    <td style="padding: 20px 40px 40px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
                      <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0 0 16px 0;">
                        Ready to start your artistic journey?
                      </p>
                      <a href="https://gallagherartschool.com" style="display: inline-block; background-color: #10b981; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: 600; font-size: 14px;">
                        Explore Classes
                      </a>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>

          <!-- Footer -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center" style="padding: 40px 20px;">
                <table width="600" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center">
                      <p style="color: #9ca3af; font-size: 12px; letter-spacing: 0.15em; margin: 0 0 8px 0;">
                        GALLAGHERARTSCHOOL.COM
                      </p>
                      <p style="color: #d1d5db; font-size: 10px; margin: 0; line-height: 1.5;">
                        © 2025 Michael Gallagher / Gallagher Art School<br>
                        Used with permission. Not for resale.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Email sent successfully:', data);
    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
