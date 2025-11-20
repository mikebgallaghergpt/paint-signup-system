import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

export const metadata = {
  title: 'Gallagher Art School',
  description: 'Professional art instruction from a Yale MFA graduate',
};
