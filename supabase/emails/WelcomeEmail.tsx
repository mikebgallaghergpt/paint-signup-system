import React from 'react';
import { Html } from '@react-email/html';
import { Head } from '@react-email/head';
import { Preview } from '@react-email/preview';
import { Body } from '@react-email/body';
import { Container } from '@react-email/container';
import { Text } from '@react-email/text';
import { Link } from '@react-email/link';

type WelcomeEmailProps = {
  user_name?: string;
  gift_certificate_link?: string;
  unsubscribe_url?: string;
  goals?: string[];
  reasons?: string[];
};

export const WelcomeEmail = ({
  user_name = 'Friend',
  gift_certificate_link,
  unsubscribe_url,
  goals = [],
  reasons = [],
}: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Gallagher Art School!</Preview>
      <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#fff', padding: '0' }}>
        <Container style={{ padding: '32px' }}>
          <div style={{ background: 'linear-gradient(to right, #7b42f6, #b01eff)', color: 'white', padding: '32px', borderRadius: '10px 10px 0 0', textAlign: 'center' }}>
            <h1>Welcome to<br />Gallagher Art School!</h1>
          </div>

          <Text>Hi {user_name},</Text>

          <Text>
            Thank you for your interest in Gallagher Art School! We're thrilled to have you join our community of passionate artists.
          </Text>

          {(goals.length > 0 || reasons.length > 0) && (
            <div style={{ backgroundColor: '#f7f7f7', borderLeft: '4px solid #7b42f6', padding: '16px', borderRadius: '6px' }}>
              <Text style={{ fontWeight: 'bold' }}>🎯 Your Profile Selections:</Text>

              {goals.length > 0 && (
                <>
                  <Text style={{ margin: '8px 0 4px 0' }}>🖌️ Art Goals:</Text>
                  <ul>
                    {goals.map((goal, idx) => (
                      <li key={`goal-${idx}`}>{goal}</li>
                    ))}
                  </ul>
                </>
              )}

              {reasons.length > 0 && (
                <>
                  <Text style={{ margin: '8px 0 4px 0' }}>💡 Why You Signed Up:</Text>
                  <ul>
                    {reasons.map((reason, idx) => (
                      <li key={`reason-${idx}`}>{reason}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          {gift_certificate_link && (
            <div style={{ backgroundColor: '#fff3cd', borderLeft: '4px solid #ffa500', padding: '16px', marginTop: '16px', borderRadius: '6px' }}>
              <Text>
                🎁 You mentioned interest in a gift certificate! You can find more info or purchase one here:
              </Text>
              <Link href={gift_certificate_link} style={{ fontWeight: 'bold', color: '#0077ff' }}>
                {gift_certificate_link}
              </Link>
            </div>
          )}

          <Text style={{ marginTop: '24px' }}>
            Based on your interests, we think you'll love our upcoming classes. We'll be in touch soon with personalized recommendations!
          </Text>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Link
              href="https://gallagherartschool.com/classes"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                backgroundColor: '#5C6BC0',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
              }}
            >
              Explore Our Classes
            </Link>
          </div>

          <Text>Questions? Reply to this email anytime.</Text>

          <Text>Best regards,<br />The Gallagher Art School Team</Text>

          <Text style={{ fontSize: '12px', color: '#999', textAlign: 'center' }}>
            © 2025 Gallagher Art School. All rights reserved.<br />
            <Link href={unsubscribe_url ?? '#'} style={{ color: '#999' }}>
              Unsubscribe
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;