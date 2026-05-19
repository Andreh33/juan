import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { cn } from '@/lib/utils/cn';
import './globals.css';
import { Header } from '@/components/nav/Header';
import { Footer } from '@/components/nav/Footer';
import { CustomCursor } from '@/components/interactive/CustomCursor';
import { LenisProvider } from '@/components/interactive/LenisProvider';
import { GrainOverlay } from '@/components/interactive/GrainOverlay';
import { PolboEasterEgg } from '@/components/interactive/PolboEasterEgg';
import { ScrollToTop } from '@/components/interactive/ScrollToTop';
import { PageTransition } from '@/components/interactive/PageTransition';
import { RestaurantSchema } from '@/components/seo/RestaurantSchema';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://elrefugiodeacabana.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'El Refugio de A Cabana — Cocina gallega en Ferrol',
    template: '%s · El Refugio de A Cabana',
  },
  description:
    'Cocina gallega de barrio en A Cabana, Ferrol. Pulpo, raxo, tortilla y el calor de toda la vida. Reservas al 659 633 047.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'El Refugio de A Cabana',
    url: SITE_URL,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#07111A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn(fraunces.variable, inter.variable, jetbrains.variable, 'h-full antialiased')}
    >
      <body className="flex min-h-full flex-col bg-[color:var(--color-bg-deep)] text-[color:var(--color-text-primary)]">
        <a href="#main" className="skip-link">
          Saltar al contenido principal
        </a>
        <RestaurantSchema />
        <GrainOverlay />
        <LenisProvider>
          <CustomCursor />
          <PageTransition />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
          <PolboEasterEgg />
        </LenisProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
