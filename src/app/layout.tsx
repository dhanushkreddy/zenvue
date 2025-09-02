
import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/components/layout/AppProvider';

export const metadata: Metadata = {
  title: {
    default: 'Zenvue - Your Feed, Your Rules.',
    template: '%s | Zenvue',
  },
  description: 'Take back control of your ad experience. With Zenvue, you can save, track, and monetize the ads you choose to see. Join over 5,000 early adopters shaping the future of a transparent, user-first advertising ecosystem.',
  keywords: ['adblock alternative', 'ad monetization', 'affiliate marketing', 'creator economy', 'user-centric advertising', 'privacy'],
  openGraph: {
    title: 'Zenvue - Your Feed, Your Rules.',
    description: 'Stop scrolling past good ads. Start earning from them.',
    url: 'https://zenvue.com', // Replace with your actual domain
    siteName: 'Zenvue',
    images: [
      {
        url: 'https://zenvue.com/og-image.png', // Replace with your actual OG image URL
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zenvue - Your Feed, Your Rules.',
    description: 'Take back control of your ad experience. Save, track, and monetize the ads you actually like.',
    // site: '@zenvue', // Replace with your Twitter handle
    // creator: '@creatorhandle', // Replace with creator's Twitter handle
    images: ['https://zenvue.com/twitter-image.png'], // Replace with your actual Twitter image URL
  },
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
