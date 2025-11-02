// scripts/renderWelcomeEmail.ts
import { render } from "@react-email/render";
import { WelcomeEmail } from "../supabase/emails/WelcomeEmail"; // or wherever it's located

const emailHtml = render(<WelcomeEmail />);
console.log(emailHtml);