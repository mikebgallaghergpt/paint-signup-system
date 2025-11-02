// emails/WelcomeGiftEmail.tsx
import * as React from 'react';
import {
  Text,
  Heading,
  Button,
  Section,
  Hr,
} from '@react-email/components';
import { EmailLayout } from './components/EmailLayout';

interface WelcomeGiftEmailProps {
  firstName?: string;
  email: string;
  giftCertificateUrl: string;
  browseClassesUrl: string;
}

export const WelcomeGiftEmail: React.FC<WelcomeGiftEmailProps> = ({
  firstName,
  email,
  giftCertificateUrl,
  browseClassesUrl,
}) => {
  const greeting = firstName ? `Hi ${firstName}` : 'Hello';

  return (
    <EmailLayout preview="Your gift certificate is ready! Give the gift of creativity.">
      <Heading style={h1}>
        {greeting}! 🎁
      </Heading>
      
      <Text style={paragraph}>
        Thank you for choosing Gallagher Art School! Your gift certificate is ready and waiting.
      </Text>

      <Section style={giftBox}>
        <Heading as="h2" style={h2}>
          🎨 The Perfect Creative Gift
        </Heading>
        <Text style={paragraph}>
          Give someone special the gift of artistic expression. Our gift certificates can be used
          for any class and never expire.
        </Text>
      </Section>

      <Section style={buttonContainer}>
        <Button href={giftCertificateUrl} style={button}>
          Get Your Gift Certificate
        </Button>
      </Section>

      <Hr style={divider} />

      <Section>
        <Heading as="h2" style={h2}>
          How Gift Certificates Work
        </Heading>
        
        <ul style={list}>
          <li style={listItem}>
            <strong>Any Amount:</strong> Choose from $50 to $500, or any custom amount
          </li>
          <li style={listItem}>
            <strong>All Classes:</strong> Valid for any class at Gallagher Art School
          </li>
          <li style={listItem}>
            <strong>Never Expires:</strong> Can be used anytime, no expiration date
          </li>
          <li style={listItem}>
            <strong>Beautiful Presentation:</strong> Delivered via email with a personalized message
          </li>
        </ul>
      </Section>

      <Hr style={divider} />

      <Section style={tipsBox}>
        <Heading as="h3" style={h3}>
          💡 Gift-Giving Tips
        </Heading>
        <ul style={list}>
          <li style={listItem}>Order by December 20th for guaranteed holiday delivery</li>
          <li style={listItem}>Add a personal message to make it extra special</li>
          <li style={listItem}>Consider pairing with art supplies for a complete gift</li>
        </ul>
      </Section>

      <Hr style={divider} />

      <Section>
        <Button href={browseClassesUrl} style={secondaryButton}>
          Browse All Classes
        </Button>
      </Section>

      <Text style={paragraph}>
        <strong>Questions?</strong> We're here to help! Reply to this email or call us at 
        <strong> (310) 555-0123</strong>.
      </Text>

      <Text style={signature}>
        Happy gifting!<br />
        <strong>The Gallagher Art School Team</strong>
      </Text>
    </EmailLayout>
  );
};

// Styles
const h1 = { fontSize: '32px', fontWeight: '700', lineHeight: '40px', margin: '0 0 24px', color: '#1e293b' };
const h2 = { fontSize: '24px', fontWeight: '600', lineHeight: '32px', margin: '0 0 16px', color: '#1e293b' };
const h3 = { fontSize: '18px', fontWeight: '600', lineHeight: '28px', margin: '0 0 12px', color: '#1e293b' };

const paragraph = { fontSize: '16px', lineHeight: '26px', margin: '0 0 16px', color: '#475569' };

const giftBox = {
  backgroundColor: '#fef3c7',
  padding: '32px',
  borderRadius: '8px',
  textAlign: 'center' as const,
  margin: '24px 0',
  border: '2px solid #fbbf24',
};

const tipsBox = {
  backgroundColor: '#eff6ff',
  padding: '24px',
  borderRadius: '8px',
  margin: '24px 0',
};

const list = { margin: '0', padding: '0 0 0 20px' };
const listItem = { fontSize: '16px', lineHeight: '28px', color: '#475569', marginBottom: '12px' };

const buttonContainer = { textAlign: 'center' as const, margin: '32px 0' };

const button = {
  backgroundColor: '#8b5cf6',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 32px',
};

const secondaryButton = {
  backgroundColor: '#3b82f6',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 32px',
};

const divider = { borderColor: '#e2e8f0', margin: '32px 0' };

const signature = { fontSize: '16px', lineHeight: '26px', margin: '32px 0 0', color: '#475569' };

export default WelcomeGiftEmail;