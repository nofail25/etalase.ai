import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://etalase-ai.vercel.app'),
  title: {
    default: 'Etalase.AI — Generator Konten & Asisten CS UMKM Berbasis AI',
    template: '%s | Etalase.AI',
  },
  description: 'Ubah foto produk biasa menjadi deskripsi marketplace bebas hiperbolis, caption sosmed, riset pasar, dan template balasan chat WhatsApp admin secara instan dengan Google Gemini AI.',
  keywords: [
    'generator konten UMKM',
    'AI copywriting Indonesia',
    'deskripsi produk otomatis Shopee Tokopedia',
    'caption Instagram AI',
    'asisten CS WhatsApp UMKM',
    'Google Gemini AI UMKM',
    'IDCamp challenge',
    'etalase ai'
  ],
  authors: [{ name: 'Naufal Risra', url: 'https://github.com/nofail25/etalase.ai' }],
  creator: 'Naufal Risra',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://etalase-ai.vercel.app',
    title: 'Etalase.AI — Generator Konten & Asisten CS UMKM Berbasis AI',
    description: 'Ubah foto produk menjadi deskripsi marketplace, caption sosmed, insight pasar, dan skrip balasan CS dalam 1 klik.',
    siteName: 'Etalase.AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Etalase.AI — Generator Konten & Asisten CS UMKM',
    description: 'Satu workspace AI untuk copywriting produk, insight harga, dan chat admin toko.',
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
  other: {
    'dicoding:email': 'naufalrisra@gmail.com',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Etalase.AI',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  description: 'Generator konten pemasaran 4-in-1 berbasis Google Gemini AI khusus untuk membantu UMKM Indonesia menyusun deskripsi marketplace, caption media sosial, riset harga, dan balasan chat WhatsApp.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'IDR',
  },
  author: {
    '@type': 'Person',
    name: 'Naufal Risra',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={inter.variable}>
      <head>
        <meta name="dicoding:email" content="naufalrisra@gmail.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="font-inter antialiased overflow-x-hidden bg-white text-gray-950 relative min-h-screen">
        {children}
      </body>
    </html>
  );
}
