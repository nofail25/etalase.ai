import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Etalase.AI - AutoPromo untuk UMKM',
  description: 'Ubah foto produk biasa menjadi konten pemasaran profesional siap pakai untuk marketplace dan media sosial.',
  other: {
    'dicoding:email': 'naufalrisra@gmail.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={inter.variable}>
      <head>
        <meta name="dicoding:email" content="naufalrisra@gmail.com" />
      </head>
      <body suppressHydrationWarning className="font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
