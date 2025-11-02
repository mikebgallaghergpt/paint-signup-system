// supabase/functions/send-confirmation-email/index.ts

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { Resend } from 'npm:resend'
import { render } from '@react-email/render'
import { WelcomeEmail } from '../../emails/WelcomeEmail.tsx'

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

serve(async (req) => {
  try {
    const {
      first_name,
      last_name,
      email,
      goals,
      interests,
      gift_link,
    } = await req.json()

    const full_name = `${first_name} ${last_name}`
    const unsubscribe_url = 'https://gallagherartschool.com/unsubscribe'

    // ✅ Render email using component function, not JSX
    const emailComponent = WelcomeEmail({
      full_name,
      goals,
      interests,
      gift_certificate_link: gift_link || null,
      unsubscribe_url,
    })

    const html = render(emailComponent)

    const data = await resend.emails.send({
      from: 'Gallagher Art School <info@gallagherartschool.com>',
      to: [email],
      subject: '🎨 Welcome to Gallagher Art School!',
      html,
    })

    return new Response(JSON.stringify({ success: true, data }), { status: 200 })
  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 })
  }
})
