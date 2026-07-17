'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  ChevronRight,
  Copy,
  FileText,
  MessageSquareText,
  Package,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  WandSparkles,
  Zap,
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

const googleColors = [
  'bg-[#4285F4]',
  'bg-[#EA4335]',
  'bg-[#FBBC05]',
  'bg-[#34A853]',
];

const painPoints = [
  {
    icon: FileText,
    title: 'Teks produk terasa datar',
    desc: 'Produk sudah bagus, tapi deskripsi marketplace belum membuat pembeli berhenti dan klik.',
  },
  {
    icon: MessageSquareText,
    title: 'Caption sering mentok',
    desc: 'Butuh versi gaul, profesional, atau hangat tanpa mengulang kalimat yang sama setiap hari.',
  },
  {
    icon: TrendingUp,
    title: 'Harga sulit dibaca',
    desc: 'Butuh gambaran cepat agar harga tetap kompetitif tanpa menebak-nebak terlalu lama.',
  },
];

const steps = [
  {
    icon: Camera,
    title: 'Unggah foto produk',
    desc: 'Pakai kamera atau galeri. AI membaca warna, bentuk, kemasan, dan konteks visual.',
    color: 'text-[#4285F4] bg-[#4285F4]/10',
  },
  {
    icon: Package,
    title: 'Tambahkan detail singkat',
    desc: 'Masukkan nama produk dan keunggulan seperti rasa, bahan, ukuran, atau kemasan.',
    color: 'text-[#EA4335] bg-[#EA4335]/10',
  },
  {
    icon: WandSparkles,
    title: 'Dapatkan konten siap pakai',
    desc: 'Deskripsi marketplace, caption sosial, insight harga, dan template balasan chat langsung rapi.',
    color: 'text-[#34A853] bg-[#34A853]/10',
  },
];

const features = [
  'Deskripsi marketplace bebas klaim berlebihan',
  'Caption media sosial dalam beberapa gaya bahasa',
  'Analisis visual dari foto produk',
  'Template balasan WhatsApp dan DM',
  'Insight harga pasar berbasis AI',
  'Ekspor hasil lengkap ke WhatsApp',
];

const audiences = [
  'UMKM kuliner',
  'Toko fashion lokal',
  'Reseller produk',
  'Warung online',
  'Frozen food',
  'Kerajinan tangan',
  'Produk rumahan',
  'Katalog admin',
];

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
      className={`will-change-transform transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
}

function BrandMark({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dimensions = size === 'lg' ? 'h-11 w-11' : size === 'sm' ? 'h-7 w-7' : 'h-9 w-9';
  const iconSize = size === 'lg' ? 'h-5 w-5' : size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';

  return (
    <div className={`${dimensions} relative grid shrink-0 place-items-center rounded-lg bg-white shadow-sm ring-1 ring-gray-200`}>
      <div className="absolute inset-1 rounded-md bg-[conic-gradient(from_30deg,#4285F4,#34A853,#FBBC05,#EA4335,#4285F4)] opacity-95" />
      <div className="relative grid h-[72%] w-[72%] place-items-center rounded-md bg-white">
        <Sparkles className={`${iconSize} text-gray-900`} />
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-400">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">{title}</h2>
      {desc && <p className="mt-4 text-base leading-7 text-gray-600">{desc}</p>}
    </Reveal>
  );
}

function HeroPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto mt-12 w-full max-w-5xl overflow-hidden rounded-lg border border-gray-200 bg-white shadow-[0_28px_90px_rgba(60,64,67,0.16)]"
    >
      <div className="flex h-12 items-center justify-between border-b border-gray-100 px-4">
        <div className="flex items-center gap-2">
          {googleColors.map((color) => (
            <span key={color} className={`h-2.5 w-2.5 rounded-full ${color}`} />
          ))}
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-500 sm:flex">
          <ShieldCheck className="h-3.5 w-3.5 text-[#34A853]" />
          Foto tidak disimpan di server
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-gray-100 bg-[#f8fafd] p-5 sm:p-8 lg:border-b-0 lg:border-r">
          <div className="aspect-[4/3] overflow-hidden rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex h-full flex-col justify-between rounded-md bg-[linear-gradient(135deg,#fff7e0,#e8f0fe_52%,#e6f4ea)] p-4">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">
                  Foto produk
                </span>
                <Camera className="h-5 w-5 text-gray-500" />
              </div>
              <div className="grid place-items-center">
                <div className="relative h-28 w-28 rounded-lg bg-white shadow-xl ring-1 ring-black/5 sm:h-36 sm:w-36">
                  <div className="absolute inset-x-5 top-5 h-10 rounded-md bg-[#FBBC05]" />
                  <div className="absolute inset-x-4 bottom-5 h-14 rounded-md bg-[#EA4335]" />
                  <div className="absolute left-7 top-10 h-16 w-16 rounded-full bg-[#34A853]/90" />
                  <div className="absolute right-5 top-8 h-10 w-10 rounded-md bg-[#4285F4]/90" />
                </div>
              </div>
              <div className="h-2 rounded-full bg-white/70">
                <motion.div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#4285F4,#34A853,#FBBC05,#EA4335)]"
                  initial={{ width: '28%' }}
                  animate={{ width: ['28%', '82%', '58%'] }}
                  transition={{ duration: 5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-8">
          <div className="mb-5 flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <Search className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-500">Buat konten untuk brownies panggang premium...</span>
            <Sparkles className="ml-auto h-4 w-4 text-[#4285F4]" />
          </div>

          <div className="space-y-3">
            {[
              ['Deskripsi Marketplace', 'Brownies panggang dengan tekstur fudgy, aroma cokelat pekat, dan kemasan rapi untuk hampers maupun camilan harian.'],
              ['Caption Sosial', 'Siap bikin sore kamu lebih manis? Brownies ini dipanggang fresh dengan rasa cokelat yang nempel di hati.'],
              ['Insight Harga', 'Kisaran harga produk sejenis: Rp35.000 - Rp55.000 tergantung ukuran, topping, dan area pengiriman.'],
            ].map(([label, text], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.45 + index * 0.12 }}
                className="rounded-lg border border-gray-200 bg-white p-4"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">{label}</p>
                  <Copy className="h-3.5 w-3.5 text-gray-400" />
                </div>
                <p className="text-sm leading-6 text-gray-700">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const ribbonY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <div className="min-h-screen overflow-hidden bg-white font-inter text-gray-950">
      <motion.div
        aria-hidden="true"
        style={{ y: ribbonY }}
        className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[620px] bg-[linear-gradient(120deg,rgba(66,133,244,0.12),rgba(52,168,83,0.08)_38%,rgba(251,188,5,0.10)_68%,rgba(234,67,53,0.10))]"
      />

      <header className="sticky top-0 z-30 border-b border-gray-200/80 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Etalase.AI beranda">
            <BrandMark />
            <span className="text-sm font-semibold tracking-tight text-gray-950">Etalase.AI</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-gray-600 md:flex">
            <a href="#cara-kerja" className="transition-colors hover:text-gray-950">Cara kerja</a>
            <a href="#fitur" className="transition-colors hover:text-gray-950">Fitur</a>
            <a href="#umkm" className="transition-colors hover:text-gray-950">Untuk UMKM</a>
          </nav>

          <Link
            href="/app"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-gray-950 px-4 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-md"
          >
            Coba gratis
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main className="overflow-x-hidden">
        <section className="relative overflow-hidden px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20">
          <div className="mx-auto max-w-6xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 shadow-sm"
            >
              <span className="flex items-center gap-1.5">
                {googleColors.map((color) => (
                  <span key={color} className={`h-1.5 w-1.5 rounded-full ${color}`} />
                ))}
              </span>
              AI workspace untuk jualan online
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="mx-auto mt-7 max-w-4xl text-5xl font-semibold tracking-tight text-gray-950 sm:text-6xl lg:text-7xl"
            >
              Etalase.AI
              <span className="mt-3 block bg-[linear-gradient(90deg,#4285F4,#34A853,#FBBC05,#EA4335)] bg-clip-text text-transparent">
                bikin konten jualan terasa siap tayang.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600"
            >
              Upload foto produk, tambahkan sedikit konteks, lalu AI menyusun deskripsi marketplace,
              caption sosial, insight harga, dan balasan chat dalam satu alur yang bersih.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Link
                href="/app"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#1f1f1f] px-6 text-sm font-semibold text-white shadow-lg shadow-gray-900/15 transition-all hover:-translate-y-0.5 hover:bg-black sm:w-auto"
              >
                <Sparkles className="h-4 w-4" />
                Buat konten sekarang
              </Link>
              <a
                href="#cara-kerja"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-6 text-sm font-semibold text-gray-700 transition-all hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-sm sm:w-auto"
              >
                Lihat alurnya
                <ChevronRight className="h-4 w-4" />
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.36 }}
              className="mt-4 text-xs font-medium text-gray-400"
            >
              Gratis. Tanpa daftar. Langsung bisa dipakai.
            </motion.p>

            <HeroPreview />
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-gray-200 bg-[#f8fafd] px-5 py-16 sm:px-8">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
            {painPoints.map(({ icon: Icon, title, desc }, index) => (
              <Reveal key={title} delay={index * 0.08} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-[#EA4335]/10 text-[#EA4335]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold tracking-tight text-gray-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">{desc}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="cara-kerja" className="relative overflow-hidden bg-white px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Cara kerja"
              title="Dari foto produk ke konten siap salin dalam tiga langkah."
              desc="Alurnya dibuat seperti assistant modern: fokus, cepat, dan tidak membuat admin toko kebanyakan mikir."
            />

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {steps.map(({ icon: Icon, title, desc, color }, index) => (
                <Reveal key={title} delay={index * 0.1} className="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="mb-8 flex items-center justify-between">
                    <div className={`grid h-11 w-11 place-items-center rounded-lg ${color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-semibold text-gray-300">0{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-gray-950">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-600">{desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="fitur" className="relative overflow-hidden border-y border-gray-200 bg-gray-950 px-5 py-20 text-white sm:px-8">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gray-400">Fitur utama</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Satu workspace untuk copywriting, insight, dan chat admin.
              </h2>
              <p className="mt-5 text-base leading-7 text-gray-300">
                Bukan cuma generator teks. Etalase.AI merapikan seluruh kebutuhan promosi produk
                agar admin bisa langsung pasang, salin, atau kirim hasilnya.
              </p>
              <Link
                href="/app"
                className="mt-8 inline-flex h-11 items-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-gray-950 transition-all hover:-translate-y-0.5 hover:bg-gray-100"
              >
                Buka workspace
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>

            <div className="grid gap-3 sm:grid-cols-2">
              {features.map((feature, index) => (
                <Reveal key={feature} delay={index * 0.05} className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#34A853]" />
                  <p className="text-sm leading-6 text-gray-200">{feature}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="umkm" className="relative overflow-hidden bg-white px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Untuk siapa"
              title="Dibuat untuk ritme jualan UMKM Indonesia."
              desc="Ringan untuk dipakai sendiri, cukup rapi untuk dibagikan ke admin toko, dan cukup cepat untuk produksi konten harian."
            />

            <Reveal className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {audiences.map((label) => (
                <div
                  key={label}
                  className="flex min-h-16 items-center justify-center rounded-lg border border-gray-200 bg-white px-3 text-center text-sm font-semibold text-gray-700 shadow-sm"
                >
                  {label}
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white px-5 pb-20 sm:px-8">
          <Reveal className="mx-auto max-w-6xl overflow-hidden rounded-lg border border-gray-200 bg-[linear-gradient(120deg,#f8fafd,#ffffff_44%,#fef7e0)] p-6 shadow-[0_24px_80px_rgba(60,64,67,0.12)] sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <BrandMark size="lg" />
                  <div className="flex items-center gap-1">
                    {googleColors.map((color) => (
                      <span key={color} className={`h-2 w-8 rounded-full ${color}`} />
                    ))}
                  </div>
                </div>
                <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">
                  Siapkan etalase digital yang terasa lebih profesional hari ini.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
                  Mulai dari satu foto produk. Hasilnya bisa langsung dipakai untuk marketplace,
                  Instagram, TikTok, WhatsApp, atau katalog admin.
                </p>
              </div>

              <Link
                href="/app"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#1f1f1f] px-6 text-sm font-semibold text-white shadow-lg shadow-gray-900/15 transition-all hover:-translate-y-0.5 hover:bg-black"
              >
                <Zap className="h-4 w-4" />
                Mulai gratis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-gray-200 px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <BrandMark size="sm" />
            <span className="text-sm font-semibold text-gray-800">Etalase.AI</span>
          </div>
          <p className="text-xs font-medium text-gray-400">Solusi AI untuk UMKM Indonesia</p>
          <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
            <Send className="h-3.5 w-3.5" />
            Siap salin ke marketplace, sosial, dan WhatsApp
          </div>
        </div>
      </footer>
    </div>
  );
}
