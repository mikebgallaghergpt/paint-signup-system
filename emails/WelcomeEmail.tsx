// emails/WelcomeEmail.tsx
import * as React from 'react';
import {
  Text,
  Heading,
  Button,
  Section,
  Hr,
} from '@react-email/components';
import { EmailLayout } from './components/EmailLayout';

interface WelcomeEmailProps {
  firstName?: string;
  email: string;
  goals: string[];
  interests: string[];
  experienceLevel: string;
  isHolidaySeason?: boolean;
  browseClassesUrl: string;
  giftCertificateUrl: string;
}

// Map goal IDs to friendly names
const goalNames: Record<string, string> = {
  'fundamental-skills': 'Building Fundamental Skills',
  'portfolio-prep': 'Portfolio Preparation',
  'creativity': 'Creative Expression',
  'specific-techniques': 'Learning Specific Techniques',
  'professional-development': 'Professional Development',
  'community': 'Community & Connection',
  'personal-enrichment': 'Personal Enrichment',
  'gift-certificate': 'Gift Certificate',
};

const interestNames: Record<string, string> = {
  'drawing': 'Drawing',
  'painting': 'Painting',
  'sculpture': 'Sculpture',
  'mixed-media': 'Mixed Media',
  'color-theory': 'Color Theory',
};

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  firstName,
  email,
  goals,
  interests,
  experienceLevel,
  isHolidaySeason = false,
  browseClassesUrl,
  giftCertificateUrl,
}) => {
  const greeting = firstName ? `Hi ${firstName}` : 'Hello';

  return (
    <EmailLayout preview="Welcome to Gallagher Art School! Your personalized class recommendations await.">
      {/* Hero Section */}
      <Heading style={h1}>
        {greeting}! Welcome to Gallagher Art School 🎨
      </Heading>
      
      <Text style={paragraph}>
        We're thrilled to have you join our creative community! Based on what you've shared with us,
        we've hand-picked classes that perfectly match your artistic journey.
      </Text>

      {/* What You're Looking For */}
      <Section style={infoBox}>
        <Heading as="h2" style={h2}>
          Your Artistic Goals
        </Heading>
        <ul style={list}>
          {goals.map((goal, index) => (
            <li key={index} style={listItem}>
              {goalNames[goal] || goal}
            </li>
          ))}
        </ul>

        {interests.length > 0 && (
          <>
            <Heading as="h3" style={h3}>
              Interested In
            </Heading>
            <Text style={paragraph}>
              {interests.map(i => interestNames[i] || i).join(', ')}
            </Text>
          </>
        )}
      </Section>

      {/* CTA Button */}
      <Section style={buttonContainer}>
        <Button href={browseClassesUrl} style={button}>
          Browse Your Personalized Classes
        </Button>
      </Section>

      <Hr style={divider} />

      {/* What to Expect */}
      <Section>
        <Heading as="h2" style={h2}>
          What Happens Next?
        </Heading>
        
        <div style={stepContainer}>
          <div style={step}>
            <div style={stepNumber}>1</div>
            <div style={stepContent}>
              <Text style={stepTitle}>Browse Your Matches</Text>
              <Text style={stepDescription}>
                We've curated classes based on your goals and experience level.
              </Text>
            </div>
          </div>

          <div style={step}>
            <div style={stepNumber}>2</div>
            <div style={stepContent}>
              <Text style={stepTitle}>Pick Your Class</Text>
              <Text style={stepDescription}>
                Choose a class and session time that works for you.
              </Text>
            </div>
          </div>

          <div style={step}>
            <div style={stepNumber}>3</div>
            <div style={stepContent}>
              <Text style={stepTitle}>Start Creating</Text>
              <Text style={stepDescription}>
                Join us in our West LA studio and bring your vision to life!
              </Text>
            </div>
          </div>
        </div>
      </Section>

      {/* Holiday Gift Section (conditional) */}
      {isHolidaySeason && (
        <>
          <Hr style={divider} />
          <Section style={giftSection}>
            <Heading as="h2" style={h2}>
              🎄 Perfect Holiday Gift Idea
            </Heading>
            <Text style={paragraph}>
              Give the gift of creativity this season! Our gift certificates make
              thoughtful presents for the artist in your life.
            </Text>
            <Button href={giftCertificateUrl} style={secondaryButton}>
              Shop Gift Certificates
            </Button>
          </Section>
        </>
      )}

      {/* Social Proof */}
      <Hr style={divider} />
      <Section style={testimonialBox}>
        <Text style={testimonialQuote}>
          "I came in nervous about my drawing skills and left with confidence and
          a portfolio I'm proud of. The instructors are incredible!"
        </Text>
        <Text style={testimonialAuthor}>
          — Sarah M., Portfolio Prep Graduate
        </Text>
      </Section>

      {/* Questions */}
      <Section>
        <Text style={paragraph}>
          <strong>Have questions?</strong> Reply to this email or call us at <strong>(310) 555-0123</strong>.
          We're here to help you start your creative journey!
        </Text>
      </Section>

      <Text style={signature}>
        With excitement,<br />
        <strong>The Gallagher Art School Team</strong>
      </Text>
    </EmailLayout>
  );
};

// Styles
const h1 = { fontSize: '32px', fontWeight: '700', lineHeight: '40px', margin: '0 0 24px', color: '#1e293b' };
const h2 = { fontSize: '24px', fontWeight: '600', lineHeight: '32px', margin: '0 0 16px', color: '#1e293b' };
const h3 = { fontSize: '18px', fontWeight: '600', lineHeight: '28px', margin: '16px 0 8px', color: '#1e293b' };

const paragraph = { fontSize: '16px', lineHeight: '26px', margin: '0 0 16px', color: '#475569' };

const infoBox = {
  backgroundColor: '#f8fafc',
  padding: '24px',
  borderRadius: '8px',
  margin: '24px 0',
};

const list = { margin: '0', padding: '0 0 0 20px' };
const listItem = { fontSize: '16px', lineHeight: '28px', color: '#475569', marginBottom: '8px' };

const buttonContainer = { textAlign: 'center' as const, margin: '32px 0' };

const button = {
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

const secondaryButton = {
  ...button,
  backgroundColor: '#8b5cf6',
};

const divider = { borderColor: '#e2e8f0', margin: '32px 0' };

const stepContainer = { margin: '24px 0' };

const step = { display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'flex-start' };

const stepNumber = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: '#eff6ff',
  color: '#3b82f6',
  fontSize: '20px',
  fontWeight: '600',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const stepContent = { flex: 1 };

const stepTitle = { fontSize: '16px', fontWeight: '600', color: '#1e293b', margin: '0 0 4px' };

const stepDescription = { fontSize: '14px', color: '#64748b', margin: '0' };

const giftSection = {
  backgroundColor: '#fef3c7',
  padding: '32px',
  borderRadius: '8px',
  textAlign: 'center' as const,
};

const testimonialBox = {
  borderLeft: '4px solid #3b82f6',
  paddingLeft: '24px',
  margin: '24px 0',
};

const testimonialQuote = {
  fontSize: '18px',
  fontStyle: 'italic',
  lineHeight: '28px',
  color: '#475569',
  margin: '0 0 12px',
};

const testimonialAuthor = {
  fontSize: '14px',
  color: '#64748b',
  margin: '0',
};

const signature = { fontSize: '16px', lineHeight: '26px', margin: '32px 0 0', color: '#475569' };

export default WelcomeEmail;