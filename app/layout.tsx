import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import MusicPlayer from '../components/MusicPlayer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Flowroom - Coming Soon | A New Way of Learning',
  description:
    "Neuro-art lesson packs that help kids practice focus in today's distracted world. An environment that adapts to the child with tools for real focus, not forced attention.",
  keywords: [
    'Flowroom',
    'education',
    'learning',
    'focus',
    'attention',
    'neuro-art',
    'children',
    'classroom',
    'teachers',
    'educational resources',
    'SEL',
    'social emotional learning'
  ],
  authors: [{ name: 'Flowroom Team' }],
  creator: 'Flowroom',
  publisher: 'Flowroom',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  metadataBase: new URL('https://flowroom.art'),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Flowroom - Coming Soon | A New Way of Learning',
    description:
      "Neuro-art lesson packs that help kids practice focus in today's distracted world. An environment that adapts to the child with tools for real focus, not forced attention.",
    url: 'https://flowroom.art',
    siteName: 'Flowroom',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/window.png',
        width: 1200,
        height: 630,
        alt: 'Flowroom - A New Way of Learning'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flowroom - Coming Soon | A New Way of Learning',
    description:
      "Neuro-art lesson packs that help kids practice focus in today's distracted world.",
    images: ['/images/window.png'],
    creator: '@flowroom'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    // Add verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='bg-black'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MusicPlayer />
        {children}
        <Toaster
          position='top-right'
          containerStyle={{
            padding: 0,
            zIndex: 9999
          }}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1a1a1a',
              color: '#ffda17',
              border: '2px solid #ffda17',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: '500'
            },
            success: {
              iconTheme: {
                primary: '#ffda17',
                secondary: '#1a1a1a'
              }
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#1a1a1a'
              },
              style: {
                border: '2px solid #ef4444',
                color: '#ef4444'
              }
            }
          }}
        />
      </body>
    </html>
  );
}
