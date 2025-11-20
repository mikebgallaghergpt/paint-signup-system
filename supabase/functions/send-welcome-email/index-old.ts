import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { 
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      }
    })
  }

  try {
    const { to, firstName, goals, interests } = await req.json()

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
  from: 'Gallagher Art School <hello@gallagherartschool.com>',
  to: [to],
  subject: `🎨 Welcome to Gallagher Art School${firstName ? `, ${firstName}` : ''}!`,
  html: `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #3b82f6;">Welcome${firstName ? ` ${firstName}` : ''}! 🎨</h1>
      <p>Thank you for signing up for Gallagher Art School!</p>
      
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2 style="margin-top: 0;">Your Goals:</h2>
        <ul>
          ${goals.map((g: string) => `<li>${g}</li>`).join('')}
        </ul>
        
        <h2>Your Interests:</h2>
        <ul>
          ${interests.map((i: string) => `<li>${i}</li>`).join('')}
        </ul>
      </div>
      
      ${interests.includes('Gift Certificate') ? `
        <div style="background: #fef3c7; border: 2px solid #fbbf24; padding: 24px; border-radius: 8px; margin: 24px 0; text-align: center;">
          <h2 style="color: #92400e; margin-top: 0;">🎁 Ready to Give the Gift of Art?</h2>
          <p style="color: #78350f; font-size: 16px;">
            Purchase a gift certificate and make someone's creative dreams come true!
          </p>
          <a href="https://gallagherartschool.com/gift-certificate/" 
             style="display: inline-block; background: #8b5cf6; color: white; padding: 14px 32px; 
                    text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 12px;">
            Purchase Gift Certificate →
          </a>
        </div>
      ` : ''}
      
      <p>We'll be in touch soon with personalized class recommendations!</p>
      
      <p style="margin-top: 40px; color: #64748b; font-size: 14px;">
        Gallagher Art School<br>
        West Los Angeles, CA
      </p>
    </div>
  `,
}),
    })

    const data = await res.json()

    return new Response(JSON.stringify(data), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
})
