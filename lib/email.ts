// lib/email.ts
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export enum EmailType {
  WELCOME = 'welcome',
  WELCOME_GIFT = 'welcome_gift',
  EMAIL_VERIFICATION = 'email_verification',
  PASSWORD_RESET = 'password_reset',
  CLASS_REMINDER = 'class_reminder',
  CLASS_FOLLOWUP = 'class_followup',
  BOOKING_CONFIRMATION = 'booking_confirmation',
}

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  react: React.ReactElement;
  type: EmailType;
  from?: string;
  replyTo?: string;
  tags?: Array<{ name: string; value: string }>;
}

interface EmailResponse {
  id: string;
  from: string;
  to: string[];
  created_at: string;
}

/**
 * Send an email using Resend
 */
export async function sendEmail({
  to,
  subject,
  react,
  type,
  from = 'Gallagher Art School <hello@gallagherartschool.com>',
  replyTo = 'hello@gallagherartschool.com',
  tags = [],
}: SendEmailOptions): Promise<{ data: EmailResponse | null; error: Error | null }> {
  try {
    // Add default tags
    const allTags = [
      { name: 'email_type', value: type },
      ...tags,
    ];

    const { data, error } = await resend.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      react,
      replyTo,
      tags: allTags,
    });

    if (error) {
      console.error('Email sending error:', error);
      return { data: null, error: error as Error };
    }

    return { data: data as EmailResponse, error: null };
  } catch (error) {
    console.error('Email sending exception:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Send bulk emails (up to 100 at once)
 */
export async function sendBulkEmails(
  emails: Array<Omit<SendEmailOptions, 'tags'>>
): Promise<void> {
  const batch = emails.map(email => ({
    from: email.from || 'Gallagher Art School <hello@gallagherartschool.com>',
    to: Array.isArray(email.to) ? email.to : [email.to],
    subject: email.subject,
    react: email.react,
    replyTo: email.replyTo || 'hello@gallagherartschool.com',
    tags: [{ name: 'email_type', value: email.type }],
  }));

  try {
    const { data, error } = await resend.batch.send(batch);
    
    if (error) {
      console.error('Bulk email error:', error);
      throw error;
    }

    console.log(`Successfully sent ${data?.data?.length || 0} emails`);
  } catch (error) {
    console.error('Bulk email exception:', error);
    throw error;
  }
}

export { resend };