import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: {
    default: 'Hafiz Idris - Full Stack Developer',
    template: '%s | Hafiz Idris',
  },
  description: 'Full Stack Developer from Johor, Malaysia specializing in web and mobile applications. Creating bug-free, user-friendly experiences with over 9 years of expertise.',
  keywords: ['Full Stack Developer', 'Web Developer', 'Mobile Developer', 'React', 'Ionic', 'TypeScript', 'Malaysia', 'Johor'],
  authors: [{ name: 'Hafiz Idris' }],
  creator: 'Hafiz Idris',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://codenamehafiz.github.io',
    title: 'Hafiz Idris - Full Stack Developer',
    description: 'Full Stack Developer from Johor, Malaysia specializing in web and mobile applications.',
    siteName: 'Hafiz Idris Portfolio',
    images: [
      {
        url: 'https://yourwebsite.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hafiz Idris - Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hafiz Idris - Full Stack Developer',
    description: 'Full Stack Developer from Johor, Malaysia specializing in web and mobile applications.',
    creator: '@codenamehafiz',
    images: ['https://yourwebsite.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
