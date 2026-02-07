import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space', display: 'swap' });

export const metadata: Metadata = {
  title: 'TKM - Teens Kingdom Ministry | Gospel Teaching for Nigerian Teens',
  description:
    'Teens Kingdom Ministry in Lagos, Nigeria. Calling teenagers to ministry, teaching the gospel, and building community through departments, rankings, and events.',
  keywords: [
    'Teens Kingdom Ministry',
    'TKM Lagos',
    'teen ministry',
    'gospel teaching',
    'youth fellowship'
  ],
  openGraph: {
    title: 'Join TKM: Called to Ministry, Empowered by the Gospel',
    description: 'A vibrant teen Christian community in Lagos with events, media, and weekly WhatsApp programs.',
    url: 'https://example.com',
    siteName: 'Teens Kingdom Ministry',
    images: [{ url: 'https://placehold.co/1200x630/png?text=Teens+Kingdom+Ministry' }],
    type: 'website'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen bg-slate-950 text-white">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
