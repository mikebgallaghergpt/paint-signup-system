import { NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/lib/email-service';

export async function GET(request: Request) {
  try {
    console.log('🚀 Starting email test...');
    console.log('API Key present:', !!process.env.RESEND_API_KEY);
    
    await sendWelcomeEmail({
      to: 'michael@youremail.com',
      firstName: 'Michael',
      goals: ['fundamental-skills', 'creativity'],
      interests: ['drawing', 'painting'],
      experienceLevel: 'just-starting',
      userId: 'test-user-123',
    });
    
    return NextResponse.json({ 
      success: true, 
      message: '✅ Email sent successfully! Check your inbox.' 
    });
  } catch (error: any) {
    console.error('❌ Email error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      details: error.stack,
    }, { status: 500 });
  }
}
