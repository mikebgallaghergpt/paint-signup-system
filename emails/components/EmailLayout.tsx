// emails/components/EmailLayout.tsx
import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Img,
  Hr,
  Text,
  Link,
} from '@react-email/components';

interface EmailLayoutProps {
  preview?: string;
  children: React.ReactNode;
}

export const EmailLayout: React.FC<EmailLayoutProps> = ({ preview, children }) => {
  return (
    <Html>
      <Head />
      {preview && (
        <div style={{ display: 'none', overflow: 'hidden', lineHeight: '1px', opacity: 0, maxHeight: 0, maxWidth: 0 }}>
          {preview}
        </div>
      )}
      <Body style={body}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img
              src="https://via.placeholder.com/150x40/3b82f6/ffffff?text=Gallagher+Art"
              width="150"
              height="40"
              alt="Gallagher Art School"
              style={logo}
            />
          </Section>

          {/* Main Content */}
          <Section style={content}>
            {children}
          </Section>

          {/* Footer */}
          <Hr style={divider} />
          <Section style={footer}>
            <Text style={footerText}>
              Gallagher Art School<br />
              123 Art Street, West Los Angeles, CA 90025<br />
              (310) 555-0123
            </Text>
            <Text style={footerLinks}>
              <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/classes`} style={link}>
                Browse Classes
              </Link>
              {' · '}
              <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/about`} style={link}>
                About Us
              </Link>
              {' · '}
              <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/contact`} style={link}>
                Contact
              </Link>
            </Text>
            <Text style={unsubscribeText}>
              <Link href="#" style={unsubscribeLink}>
                Unsubscribe
              </Link>
              {' from these emails'}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const body = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0',
  marginBottom: '64px',
  maxWidth: '600px',
};

const header = {
  padding: '32px 48px',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
};

const content = {
  padding: '0 48px 48px',
};

const divider = {
  borderColor: '#e6ebf1',
  margin: '32px 0',
};

const footer = {
  padding: '0 48px 48px',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#8898aa',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0 0 16px',
};

const footerLinks = {
  color: '#8898aa',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0 0 16px',
};

const link = {
  color: '#556cd6',
  textDecoration: 'none',
};

const unsubscribeText = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '20px',
  margin: '0',
};

const unsubscribeLink = {
  color: '#8898aa',
  textDecoration: 'underline',
};

export default EmailLayout;