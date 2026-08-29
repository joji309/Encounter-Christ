import type { Metadata } from 'next';
import { Cinzel, Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SITE_URL } from '@/lib/site-url';
import { fetchSiteStatus } from '@/lib/api';
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
  metadataBase: new URL(SITE_URL),
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
    url: SITE_URL,
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteStatus = await fetchSiteStatus();
  if (siteStatus.maintenance_mode) {
    return (
      <html lang="en" className={`${cinzel.variable} ${inter.variable}`}>
        <body className="min-h-screen bg-stone-950 text-amber-50">
          <main className="flex min-h-screen items-center justify-center px-6 text-center">
            <div className="max-w-xl space-y-6">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-amber-400">Encounter Christ</p>
              <h1 className="font-serif text-4xl font-bold sm:text-6xl">We&apos;ll be right back</h1>
              <p className="text-sm leading-relaxed text-stone-300">{siteStatus.maintenance_message}</p>
            </div>
          </main>
        </body>
      </html>
    );
  }
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
