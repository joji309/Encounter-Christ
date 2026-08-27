import type { Metadata } from 'next';
import { Cinzel, Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '600', '700', '900'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://encounterchrist.vercel.app'),
  title: {
    default: 'Encounter Christ | Eucharistic Miracles, The Science & Catholic Faith',
    template: '%s | Encounter Christ',
  },
  description: 'Encounter the living Jesus Christ through the verified forensic evidence of Eucharistic Miracles. Returning to the Catholic Church, Reconciliation, Adoration, and Discipleship.',
  keywords: [
    'Eucharistic Miracles',
    'Real Presence',
    'Lanciano Miracle',
    'Buenos Aires Miracle',
    'Catholic Church',
    'Carlo Acutis',
    'Confession Guide',
    'Eucharistic Adoration',
    'Holy Mass',
    'Catholic Apologetics'
  ],
  authors: [{ name: 'Encounter Christ Apostolate' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://encounterchrist.vercel.app',
    title: 'Encounter Christ | Eucharistic Miracles & The Catholic Faith',
    description: 'Encounter the living Jesus Christ through the verified forensic evidence of Eucharistic Miracles.',
    siteName: 'Encounter Christ',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1548625361-195fe578b871?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Encounter Christ in the Holy Eucharist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Encounter Christ | Eucharistic Miracles & The Catholic Faith',
    description: 'Discover the scientific and spiritual realities of Eucharistic Miracles.',
    images: ['https://images.unsplash.com/photo-1548625361-195fe578b871?auto=format&fit=crop&w=1200&q=80'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased min-h-screen flex flex-col text-stone-800 selection:bg-amber-500/30 selection:text-amber-200">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
