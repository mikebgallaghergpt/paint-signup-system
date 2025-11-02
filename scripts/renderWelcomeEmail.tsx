// scripts/renderWelcomeEmail.tsx
import React from 'react';
import { render } from '@react-email/render';
import { WelcomeEmail } from '../supabase/emails/WelcomeEmail.tsx'; // Ensure correct path

const html = await render(
  <WelcomeEmail
    user_name="Mike"
    gift_certificate_link="https://gallagherartschool.com/gift-certificate"
    unsubscribe_url="https://gallagherartschool.com/unsubscribe"
    goals={[
      "Develop fundamental art skills",
      "Prepare portfolio for college/university",
      "Explore creativity and self-expression",
      "Learn specific techniques (painting, drawing, etc.)"
    ]}
    reasons={[
      "Gift certificate for someone",
      "Career change or advancement",
      "Connect with other artists"
    ]}
  />
);

// Correctly log resolved HTML
console.log(html);