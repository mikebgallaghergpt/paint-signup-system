// lib/email-service.ts
import { sendEmail, EmailType } from './email';
import { createClient } from '@supabase/supabase-js';

// Use service role client for server-side operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface WelcomeEmailData {
  to: string;
  firstName?: string;
  goals: string[];
  interests: string[];
  experienceLevel: string;
  userId: string;
}

interface WelcomeGiftEmailData {
  to: string;
  firstName?: string;
  userId: string;
}

/**
 * Send welcome email to new user
 */
export async function sendWelcomeEmail(data: WelcomeEmailData): Promise<void> {
  const { to, firstName, goals, interests, experienceLevel, userId } = data;

  // Dynamic import to avoid build issues
  const { default: WelcomeEmail } = await import('@/emails/WelcomeEmail');

  // Determine if it's holiday season
  const now = new Date();
  const isHolidaySeason = 
    process.env.ENABLE_HOLIDAY_GIFT_EMAILS === 'true' &&
    now >= new Date(process.env.HOLIDAY_GIFT_CAMPAIGN_START || '2024-11-15') &&
    now <= new Date(process.env.HOLIDAY_GIFT_CAMPAIGN_END || '2024-12-31');

  // Send email
  const { data: emailData, error } = await sendEmail({
    to,
    subject: `🎨 Welcome to Gallagher Art School${firstName ? `, ${firstName}` : ''}!`,
    react: WelcomeEmail({
      firstName,
      email: to,
      goals,
      interests,
      experienceLevel,
      isHolidaySeason,
      browseClassesUrl: `${process.env.NEXT_PUBLIC_APP_URL}/classes/browse?user=${userId}`,
      giftCertificateUrl: `${process.env.NEXT_PUBLIC_APP_URL}/gift`,
    }),
    type: EmailType.WELCOME,
  });

  if (error) {
    console.error('Failed to send welcome email:', error);
    throw error;
  }

  // Track email send
  await trackEmailSend({
    userId,
    emailType: 'welcome',
    subject: `Welcome to Gallagher Art School${firstName ? `, ${firstName}` : ''}!`,
    resendEmailId: emailData?.id,
    metadata: { goals, interests, experienceLevel },
  });
}

/**
 * Send welcome email to gift certificate buyer
 */
export async function sendWelcomeGiftEmail(data: WelcomeGiftEmailData): Promise<void> {
  const { to, firstName, userId } = data;

  // Dynamic import
  const { default: WelcomeGiftEmail } = await import('@/emails/WelcomeGiftEmail');

  const { data: emailData, error } = await sendEmail({
    to,
    subject: '🎁 Your Gift Certificate is Ready!',
    react: WelcomeGiftEmail({
      firstName,
      email: to,
      giftCertificateUrl: `${process.env.NEXT_PUBLIC_APP_URL}/gift`,
      browseClassesUrl: `${process.env.NEXT_PUBLIC_APP_URL}/classes/browse`,
    }),
    type: EmailType.WELCOME_GIFT,
  });

  if (error) {
    console.error('Failed to send gift welcome email:', error);
    throw error;
  }

  // Track email send
  await trackEmailSend({
    userId,
    emailType: 'welcome_gift',
    subject: 'Your Gift Certificate is Ready!',
    resendEmailId: emailData?.id,
  });
}

/**
 * Track email send in database
 */
async function trackEmailSend(data: {
  userId: string;
  emailType: string;
  subject: string;
  resendEmailId?: string;
  metadata?: any;
}): Promise<void> {
  try {
    await supabaseAdmin.from('email_sends').insert({
      user_id: data.userId,
      email_type: data.emailType,
      subject: data.subject,
      resend_email_id: data.resendEmailId,
      metadata: data.metadata,
    });
  } catch (error) {
    console.error('Failed to track email send:', error);
    // Don't throw - email was sent successfully, tracking is secondary
  }
}