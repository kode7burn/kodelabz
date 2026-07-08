import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '7Labz System Canvas',
  description: 'Design, validate, and operate multi-tenant automation architectures.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
