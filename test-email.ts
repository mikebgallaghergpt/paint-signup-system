// test-email.ts
import { sendWelcomeEmail } from './lib/email-service';

async function testEmail() {
  await sendWelcomeEmail({
    to: 'your-email@example.com', // Use YOUR email
    firstName: 'Michael',
    goals: ['fundamental-skills', 'creativity'],
    interests: ['drawing', 'painting'],
    experienceLevel: 'just-starting',
    userId: 'test-user-id',
  });
  
  console.log('✅ Test email sent! Check your inbox.');
}

testEmail();