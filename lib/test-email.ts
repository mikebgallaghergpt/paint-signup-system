
async function testEmail() {
  try {
    console.log('Sending test email...');
    
    await sendWelcomeEmail({
      to: 'mikebgallagher@mac.comm', // ⚠️ CHANGE THIS TO YOUR EMAIL
      firstName: 'Michael',
      goals: ['fundamental-skills', 'creativity'],
      interests: ['drawing', 'painting'],
      experienceLevel: 'just-starting',
      userId: 'test-user-123',
    });
    
    console.log('✅ Test email sent! Check your inbox.');
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
}

testEmail();
