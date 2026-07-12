import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Etalase.AI — AutoPromo untuk UMKM',
  description: 'Ubah foto produk biasa menjadi konten pemasaran profesional siap pakai untuk marketplace dan media sosial. Didukung Google Gemini AI.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={inter.variable}>
      <body suppressHydrationWarning className="font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
