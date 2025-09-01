
import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/components/layout/AppProvider';

export const metadata: Metadata = {
  title: 'Zenvue - Your Feed, Your Rules',
  description: 'Take control of your ad experience with Zenvue. Save, track, and earn from the ads you see. Join over 5,000 early adopters and shape the future of advertising.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Caveat:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
