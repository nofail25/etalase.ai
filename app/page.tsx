import React from 'react';
import Link from 'next/link';
import {
  Sparkles, Camera, FileText, Share2, ChevronRight,
  Package, TrendingUp, CheckCircle, ArrowRight, Zap, ShieldCheck
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-inter">

      {/* ===== NAVBAR ===== */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900 text-sm tracking-tight">Etalase.AI</span>
          </div>
          <Link
            href="/app"
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Coba Gratis
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="max-w-5xl mx-auto px-5 sm:px-8 pt-16 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-blue-100 mb-6">
          <Zap className="w-3.5 h-3.5" />
          Didukung Google Gemini AI
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 tracking-tight leading-tight max-w-3xl mx-auto">
          Konten Jualan Profesional,{' '}
          <span className="text-blue-600">Dalam Hitungan Detik</span>
        </h1>

        <p className="mt-6 text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
          Cukup foto produk Anda, dan biarkan AI meracik deskripsi marketplace
          serta caption media sosial yang siap pakai — tanpa perlu jago nulis.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/app"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm shadow-blue-200 text-sm"
          >
            <Sparkles className="w-4 h-4" />
            Buat Konten Sekarang — Gratis
          </Link>
          <a
            href="#cara-kerja"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium text-sm px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Lihat cara kerjanya
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        <p className="mt-4 text-xs text-gray-400">Gratis · Tanpa daftar · Langsung bisa dipakai</p>
      </section>

      {/* ===== PROBLEM STATEMENT ===== */}
      <section className="bg-gray-50 border-y border-gray-100 py-14">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Masalah Nyata UMKM</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight max-w-2xl mx-auto">
            Berjualan online itu susah — bukan karena produknya, tapi karena kontennya
          </h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: FileText, title: 'Deskripsi Membosankan', desc: 'Foto produk bagus, tapi deskripsinya "Kue brownies, enak, murah" — tidak ada yang klik.' },
              { icon: Share2, title: 'Caption Medsos Kaku', desc: 'Nulis caption Instagram terasa seperti laporan sekolah, bukan ajakan beli yang menggiurkan.' },
              { icon: TrendingUp, title: 'Tidak Tahu Harga Pasar', desc: 'Takut terlalu mahal, takut terlalu murah — tidak ada referensi yang mudah diakses.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl border border-gray-200 p-6 text-left shadow-sm">
                <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1.5">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="cara-kerja" className="py-16 max-w-5xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Cara Kerja</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
            3 langkah — selesai dalam 30 detik
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              step: '01',
              icon: Camera,
              title: 'Foto Produk Anda',
              desc: 'Ambil atau unggah foto produk langsung dari kamera atau galeri ponsel. Tidak perlu edit dulu.',
              color: 'bg-blue-50 text-blue-600',
            },
            {
              step: '02',
              icon: Package,
              title: 'Isi Nama & Keunggulan',
              desc: 'Ketik nama produk dan 1–2 keunggulan utama. Semakin detail, semakin akurat hasilnya.',
              color: 'bg-violet-50 text-violet-600',
            },
            {
              step: '03',
              icon: Sparkles,
              title: 'AI Langsung Bekerja',
              desc: 'Gemini AI menganalisis foto dan menghasilkan deskripsi marketplace + caption medsos yang siap salin.',
              color: 'bg-green-50 text-green-600',
            },
          ].map(({ step, icon: Icon, title, desc, color }) => (
            <div key={step} className="relative flex flex-col gap-4 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-gray-300 tracking-widest">{step}</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1.5">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="bg-gray-50 border-y border-gray-100 py-16">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Fitur Utama</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
              Satu alat, semua kebutuhan konten Anda
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Deskripsi Marketplace Otomatis', desc: 'Teks produk terstruktur, menarik, dan aman dari kata terlarang seperti "Terbaik" atau "Nomor 1" yang bisa membuat listing diblokir.' },
              { title: 'Caption Media Sosial 3 Gaya', desc: 'Pilih gaya Gaul, Profesional, atau Hangat — AI menyesuaikan sapaan, emoji, dan hashtag secara otomatis.' },
              { title: 'Analisis Visual Foto Produk', desc: 'AI membaca warna, tekstur, dan kemasan dari foto Anda untuk menghasilkan deskripsi yang autentik dan akurat.' },
              { title: 'Template Balasan Chat CS (WA/DM)', desc: 'Asisten cerdas yang menyiapkan 3 contoh jawaban siap copas saat calon pembeli bertanya ready stock, pengiriman, atau nego harga.' },
              { title: 'Insight Harga Pasar dari AI', desc: 'Dapatkan estimasi kisaran harga jual produk sejenis sebagai referensi agar harga Anda kompetitif di pasaran.' },
              { title: 'Ekspor 1-Klik ke WhatsApp Admin', desc: 'Satu tombol untuk mengirimkan seluruh hasil racikan AI (Deskripsi, Caption, Insight, & Balasan CS) ke WhatsApp Anda atau admin toko.' },
            ].map(({ title, desc }) => (
              <div key={title} className="flex items-start gap-3.5 bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{title}</p>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOR WHOM ===== */}
      <section className="py-16 max-w-5xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
            Untuk siapa Etalase.AI?
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            'Pedagang Kaki Lima', 'Warung Online', 'UMKM Kuliner', 'Toko Fashion Lokal',
            'Usaha Kerajinan', 'Penjual Frozen Food', 'Reseller Produk', 'Ibu Rumah Tangga Jualan',
          ].map((label) => (
            <div key={label} className="flex items-center justify-center text-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-3.5 text-xs font-medium text-gray-700">
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA BOTTOM ===== */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 text-center">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3">
            Siap berjualan lebih profesional?
          </h2>
          <p className="text-blue-100 text-sm leading-relaxed mb-8">
            Tidak perlu keahlian menulis. Tidak perlu bayar copywriter. Cukup foto produk Anda,
            sisanya biar AI yang urus.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-700 font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm"
          >
            <Sparkles className="w-4 h-4" />
            Mulai Buat Konten — Gratis
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="mt-4 text-blue-200 text-xs">Gratis · Tanpa daftar · Langsung bisa dipakai</p>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-700">Etalase.AI</span>
          </div>
          <p className="text-xs text-gray-400">
            Solusi AI untuk UMKM Indonesia · Didukung Google Gemini
          </p>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            Data foto tidak disimpan di server
          </div>
        </div>
      </footer>
    </div>
  );
}
