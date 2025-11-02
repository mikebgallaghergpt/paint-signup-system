
import { Resend } from "npm:resend";
import { render } from "npm:@react-email/render";
import { WelcomeEmail } from "../../emails/WelcomeEmail.tsx";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

Deno.serve(async (req) => {
  const { email, full_name } = await req.json();

  const html = render(
    <WelcomeEmail full_name={full_name} />
  );

  const data = await resend.emails.send({
    from: 'Gallagher Art School <info@gallagherartschool.com>',
    to: [email],
    subject: '🎨 Welcome to Gallagher Art School!',
    html,
  });

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
});
