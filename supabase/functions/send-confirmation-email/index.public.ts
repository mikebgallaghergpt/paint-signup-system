import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Resend } from "npm:resend";
import { generateWelcomeEmail } from "../../emails/WelcomeEmail.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

export const config = {
  runtime: "edge",
  permissions: "public",
};

serve(async (req) => {
  try {
    const { email, full_name } = await req.json();

    const html = generateWelcomeEmail(full_name);

    const data = await resend.emails.send({
      from: "Gallagher Art School <info@gallagherartschool.com>",
      to: [email],
      subject: "🎨 Welcome to Gallagher Art School!",
      html,
    });

    return new Response(JSON.stringify({ status: "ok", data }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
