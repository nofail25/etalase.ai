'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Camera, ImageIcon, Copy, TrendingUp,
  Sparkles, CheckCircle2, RefreshCw, X,
  Loader2, AlertCircle, Package, FileText, Send, MessageSquare,
  ArrowLeft, ChevronRight, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ResultData {
  ecommerceDescription: string;
  socialMediaCaption: string;
  marketInsight: string;
  customerServiceReplies?: string[];
}

// --- Utility: Client-side image compression ---
const compressImage = (file: File, maxWidth = 1024, quality = 0.82): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else if (height > maxWidth) {
          width = Math.round((width * maxWidth) / height);
          height = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) { resolve(event.target?.result as string); return; }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = (err) => reject(err);
      img.src = event.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

const TONES = [
  { id: 'Gaul/Asyik', label: 'Gaul & Asyik', desc: 'Kasual, anak muda' },
  { id: 'Profesional', label: 'Profesional', desc: 'Formal, marketplace' },
  { id: 'Keluarga/Hangat', label: 'Hangat', desc: 'Akrab, keluarga' },
];

const ONBOARDING_STEPS = [
  {
    icon: Camera,
    color: 'bg-blue-50 text-blue-600',
    title: 'Foto Produk Anda',
    desc: 'Ambil atau unggah foto produk dari kamera atau galeri ponsel Anda. Tidak perlu edit — foto apa adanya sudah cukup. AI akan menganalisis warna, tekstur, dan kemasan secara otomatis.',
  },
  {
    icon: Package,
    color: 'bg-violet-50 text-violet-600',
    title: 'Isi Nama & Keunggulan',
    desc: 'Ketik nama produk Anda (wajib) dan keunggulan tambahan jika ada. Contoh: "Keripik Pisang Coklat" dengan keunggulan "manis pas, tanpa pengawet, kemasan zipper".',
  },
  {
    icon: FileText,
    color: 'bg-amber-50 text-amber-600',
    title: 'Pilih Gaya Bahasa',
    desc: 'Pilih gaya bahasa yang sesuai target pembeli Anda. Gaul/Asyik untuk anak muda, Profesional untuk katalog resmi, atau Hangat untuk produk keluarga & kuliner rumahan.',
  },
  {
    icon: Sparkles,
    color: 'bg-green-50 text-green-600',
    title: 'Salin & Gunakan!',
    desc: 'Klik "Buat Konten Sekarang" dan tunggu beberapa detik. Anda akan mendapat deskripsi marketplace + caption media sosial yang siap disalin dan dipasang langsung di Shopee, Tokopedia, Instagram, atau TikTok.',
  },
];

// --- Sub-components ---
function CopyButton({ text, label = 'Salin' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const handle = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };
  return (
    <button
      onClick={handle}
      className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-all duration-200 ${
        copied
          ? 'bg-green-50 text-green-700 border border-green-200'
          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <CheckCircle2 className={`w-3.5 h-3.5 ${copied ? 'text-green-600' : 'text-gray-400'}`} />
      {copied ? 'Tersalin!' : label}
    </button>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
      {children}
    </p>
  );
}

// --- Main Component ---
export default function AppClient() {
  const [step, setStep] = useState<'input' | 'loading' | 'result'>('input');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [productName, setProductName] = useState('');
  const [sellingPoints, setSellingPoints] = useState('');
  const [tone, setTone] = useState('Gaul/Asyik');
  const [result, setResult] = useState<ResultData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [quota, setQuota] = useState<number>(10);
  const [maxQuota] = useState<number>(10);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Tampilkan onboarding hanya untuk pengguna baru & atur kuota harian (cek localStorage)
  useEffect(() => {
    const seen = localStorage.getItem('etalase_onboarded');
    if (!seen) {
      setShowOnboarding(true);
    }
    const today = new Date().toISOString().split('T')[0];
    const savedQuotaDate = localStorage.getItem('etalase_daily_quota_date');
    const savedCount = localStorage.getItem('etalase_daily_quota_count');
    if (savedQuotaDate !== today) {
      localStorage.setItem('etalase_daily_quota_date', today);
      localStorage.setItem('etalase_daily_quota_count', '10');
      setQuota(10);
    } else if (savedCount !== null) {
      setQuota(parseInt(savedCount, 10));
    }
  }, []);

  const dismissOnboarding = () => {
    localStorage.setItem('etalase_onboarded', '1');
    setShowOnboarding(false);
    setOnboardingStep(0);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const compressed = await compressImage(file, 1024, 0.82);
        setImagePreview(compressed);
      } catch (err) {
        console.error('Gagal mengompres gambar:', err);
      }
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const handleReset = () => {
    setStep('input');
    setProductName('');
    setSellingPoints('');
    setTone('Gaul/Asyik');
    setImagePreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim()) { setError('Nama produk wajib diisi.'); return; }
    if (quota <= 0) {
      setError('❌ Kuota harian gratis Anda (10/10) telah habis hari ini. Kuota akan di-reset besok pagi, atau klik badge "Kuota Gratis: 0/10" di pojok kanan atas untuk mereset kuota pengujian IDCamp.');
      return;
    }
    setError(null);
    setStep('loading');
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: imagePreview, productName, sellingPoints, tone }),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Gagal menghasilkan konten');
      }
      const data = await response.json();
      setResult(data);
      setStep('result');
      const newQuota = Math.max(0, quota - 1);
      setQuota(newQuota);
      localStorage.setItem('etalase_daily_quota_count', newQuota.toString());
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan. Coba lagi.');
      setStep('input');
    }
  };

  const handleSendToWhatsApp = () => {
    if (!result) return;
    let text = `*ETALASE.AI — AUTO-PROMO UMKM*\n*Produk:* ${productName}\n\n`;
    text += `*1. DESKRIPSI MARKETPLACE:*\n${result.ecommerceDescription}\n\n`;
    text += `*2. CAPTION MEDIA SOSIAL:*\n${result.socialMediaCaption}\n\n`;
    text += `*3. INSIGHT PASAR (AI):*\n${result.marketInsight}\n\n`;
    if (result.customerServiceReplies && result.customerServiceReplies.length > 0) {
      text += `*4. TEMPLATE BALASAN CHAT CS:*\n`;
      result.customerServiceReplies.forEach((reply, idx) => {
        text += `[Opsi ${idx + 1}]: ${reply}\n\n`;
      });
    }
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-inter">

      {/* ===== ONBOARDING OVERLAY ===== */}
      {showOnboarding && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            {/* Progress Bar */}
            <div className="h-1 bg-gray-100">
              <div
                className="h-1 bg-blue-600 transition-all duration-300"
                style={{ width: `${((onboardingStep + 1) / ONBOARDING_STEPS.length) * 100}%` }}
              />
            </div>
            <div className="p-6">
              {/* Step Icon */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${ONBOARDING_STEPS[onboardingStep].color}`}>
                {React.createElement(ONBOARDING_STEPS[onboardingStep].icon, { className: 'w-6 h-6' })}
              </div>
              {/* Step Counter */}
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
                Langkah {onboardingStep + 1} dari {ONBOARDING_STEPS.length}
              </p>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {ONBOARDING_STEPS[onboardingStep].title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {ONBOARDING_STEPS[onboardingStep].desc}
              </p>
            </div>
            {/* Actions */}
            <div className="px-6 pb-5 flex items-center justify-between">
              <button
                onClick={dismissOnboarding}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                Lewati panduan
              </button>
              {onboardingStep < ONBOARDING_STEPS.length - 1 ? (
                <button
                  onClick={() => setOnboardingStep(s => s + 1)}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
                >
                  Lanjut
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={dismissOnboarding}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
                >
                  Mulai Sekarang
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mr-1">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Beranda</span>
            </a>
            <span className="text-gray-200">|</span>
            <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900 text-sm tracking-tight">Etalase.AI</span>
            <span className="hidden sm:inline text-gray-300 text-sm">|</span>
            <span className="hidden sm:inline text-gray-500 text-xs">Generator Konten UMKM</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Quota Badge (Click to reset in Judge/Test Mode) */}
            <div
              title="Klik untuk mereset kuota (Mode Pengujian Juri)"
              onClick={() => {
                setQuota(10);
                localStorage.setItem('etalase_daily_quota_count', '10');
                alert('⚡ Kuota harian gratis telah di-reset kembali menjadi 10/10 untuk keperluan pengujian IDCamp!');
              }}
              className="cursor-pointer flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-amber-50 sm:bg-amber-50/80 hover:bg-amber-100 border border-amber-200/80 text-amber-800 text-xs font-medium transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span><span className="hidden sm:inline">Kuota Gratis: </span><strong className="font-semibold">{quota}/{maxQuota}</strong></span>
            </div>
            <button
              onClick={() => setShowOnboarding(true)}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Panduan</span>
            </button>
            {step === 'result' && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Buat Baru
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <AnimatePresence mode="wait">

          {/* =================== INPUT STEP =================== */}
          {step === 'input' && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {/* Page Title */}
              <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
                  Buat Konten Promosi
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Unggah foto produk, isi detail singkat, dan biarkan AI menyusun konten pemasaran Anda.
                </p>
              </div>

              {/* Two-column layout for desktop */}
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                  {/* LEFT: Photo Upload */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <ImageIcon className="w-4 h-4 text-gray-400" />
                      <h2 className="text-sm font-semibold text-gray-700">Foto Produk</h2>
                      <span className="ml-auto text-[11px] text-gray-400">Opsional</span>
                    </div>

                    {!imagePreview ? (
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => cameraInputRef.current?.click()}
                          className="group flex flex-col items-center justify-center gap-2.5 border border-dashed border-gray-200 rounded-xl p-6 hover:border-blue-400 hover:bg-blue-50/40 transition-all duration-200"
                        >
                          <Camera className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                          <span className="text-xs font-medium text-gray-500 group-hover:text-blue-600">Kamera</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="group flex flex-col items-center justify-center gap-2.5 border border-dashed border-gray-200 rounded-xl p-6 hover:border-blue-400 hover:bg-blue-50/40 transition-all duration-200"
                        >
                          <ImageIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                          <span className="text-xs font-medium text-gray-500 group-hover:text-blue-600">Dari Galeri</span>
                        </button>
                      </div>
                    ) : (
                      <div className="relative rounded-xl overflow-hidden aspect-square bg-gray-50 border border-gray-200">
                        <img src={imagePreview} alt="Preview produk" className="w-full h-full object-contain" />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute top-2.5 right-2.5 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full border border-gray-200 flex items-center justify-center hover:bg-white shadow-sm transition-colors"
                        >
                          <X className="w-3.5 h-3.5 text-gray-600" />
                        </button>
                      </div>
                    )}

                    <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleImageChange} />
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />

                    <p className="mt-3 text-[11px] text-gray-400 leading-relaxed">
                      AI akan menganalisis foto secara mendalam untuk menghasilkan deskripsi visual yang autentik.
                    </p>
                  </div>

                  {/* RIGHT: Product Details */}
                  <div className="flex flex-col gap-5">
                    {/* Product Name */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <Package className="w-4 h-4 text-gray-400" />
                        <h2 className="text-sm font-semibold text-gray-700">Detail Produk</h2>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1.5">
                            Nama Produk <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Contoh: Keripik Pisang Coklat Lumer"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1.5">
                            Keunggulan Produk
                            <span className="ml-1.5 text-[11px] font-normal text-gray-400">Opsional</span>
                          </label>
                          <textarea
                            placeholder="Contoh: manis pas, tanpa pengawet, kemasan premium..."
                            value={sellingPoints}
                            onChange={(e) => setSellingPoints(e.target.value)}
                            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none h-[90px]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Tone Selection */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <h2 className="text-sm font-semibold text-gray-700">Gaya Bahasa</h2>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {TONES.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setTone(t.id)}
                            className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-200 ${
                              tone === t.id
                                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500/20'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <span className={`text-xs font-semibold ${tone === t.id ? 'text-blue-700' : 'text-gray-700'}`}>
                              {t.label}
                            </span>
                            <span className={`text-[10px] mt-0.5 ${tone === t.id ? 'text-blue-500' : 'text-gray-400'}`}>
                              {t.desc}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Error */}
                    {error && (
                      <div className="flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl">
                        <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm py-3 rounded-xl transition-colors shadow-sm shadow-blue-200"
                    >
                      <Sparkles className="w-4 h-4" />
                      Buat Konten Sekarang
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          )}

          {/* =================== LOADING STEP =================== */}
          {step === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center justify-center min-h-[50vh] gap-5 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
                <Loader2 className="w-7 h-7 text-white animate-spin" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">AI sedang menganalisis...</h2>
                <p className="mt-1 text-sm text-gray-500 max-w-xs">
                  Menganalisis visual foto dan menyusun konten pemasaran profesional.
                </p>
              </div>
            </motion.div>
          )}

          {/* =================== RESULT STEP =================== */}
          {step === 'result' && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Result Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span className="text-xs font-semibold text-green-600 uppercase tracking-wide">Konten siap digunakan</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
                    Hasil untuk "{productName}"
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSendToWhatsApp}
                    className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-xs sm:text-sm px-4.5 py-3 rounded-xl transition-colors shadow-sm shadow-emerald-200 shrink-0 w-full sm:w-auto"
                  >
                    <Send className="w-4 h-4" />
                    Kirim Semua ke WhatsApp
                  </button>
                </div>
              </div>

              {/* Desktop: 2 columns. Mobile: 1 column */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT (2/3): Text results */}
                <div className="lg:col-span-2 space-y-5">

                  {/* Ecommerce Description */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <SectionLabel>Deskripsi Marketplace</SectionLabel>
                        <p className="text-[11px] text-gray-400">Shopee · Tokopedia · Lazada</p>
                      </div>
                      <CopyButton text={result.ecommerceDescription} label="Salin Teks" />
                    </div>
                    <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap bg-gray-50 rounded-xl p-4 border border-gray-100">
                      {result.ecommerceDescription}
                    </div>
                    <p className="mt-2.5 text-[11px] text-gray-400">
                      Telah dioptimasi — bebas kata hiperbolis terlarang marketplace.
                    </p>
                  </div>

                  {/* Social Media Caption */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <SectionLabel>Caption Media Sosial</SectionLabel>
                        <p className="text-[11px] text-gray-400">Gaya: {tone.split('/')[0]}</p>
                      </div>
                      <CopyButton text={result.socialMediaCaption} label="Salin Teks" />
                    </div>
                    <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap bg-gray-50 rounded-xl p-4 border border-gray-100">
                      {result.socialMediaCaption}
                    </div>
                  </div>

                  {/* Customer Service Replies Card */}
                  {result.customerServiceReplies && result.customerServiceReplies.length > 0 && (
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                            <MessageSquare className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <SectionLabel>Template Balasan CS (WhatsApp / DM)</SectionLabel>
                            <p className="text-[11px] text-gray-400">Siap copas untuk menjawab chat calon pembeli</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {result.customerServiceReplies.map((reply, index) => {
                          const titles = [
                            '👋 Info Ready Stock & Sapaan Ramah',
                            '📦 Info Pengiriman & Kemasan Aman',
                            '⏳ Follow-Up Pembeli yang Ragu'
                          ];
                          return (
                            <div key={index} className="bg-emerald-50/60 rounded-xl p-4 border border-emerald-100 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                              <div className="flex-1">
                                <p className="text-[11px] font-bold text-emerald-800 mb-1.5">{titles[index] || `Opsi Balasan ${index + 1}`}</p>
                                <p className="text-xs text-gray-800 leading-relaxed whitespace-pre-wrap font-medium">{reply}</p>
                              </div>
                              <div className="shrink-0 self-end sm:self-center">
                                <CopyButton text={reply} label="Salin Balasan" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT (1/3): Photo + Market Insight */}
                <div className="space-y-5">

                  {/* Photo preview */}
                  {imagePreview && (
                    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                      <SectionLabel>Foto Produk</SectionLabel>
                      <div className="rounded-xl overflow-hidden aspect-square bg-gray-50 border border-gray-100">
                        <img
                          src={imagePreview}
                          alt="Foto produk yang dianalisis"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex items-center gap-1.5 mt-2.5">
                        <Sparkles className="w-3 h-3 text-blue-500" />
                        <span className="text-[11px] text-blue-600 font-medium">Dianalisis oleh AI</span>
                      </div>
                    </div>
                  )}

                  {/* Market Insight */}
                  <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center">
                        <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                      </div>
                      <div>
                        <SectionLabel>Insight Harga Pasar</SectionLabel>
                      </div>
                    </div>
                    <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-amber-50/60 rounded-xl p-4 border border-amber-100">
                      {result.marketInsight}
                    </div>
                    <p className="mt-2.5 text-[11px] text-gray-400">
                      Estimasi umum dari AI. Sesuaikan dengan lokasi dan segmen pasar Anda.
                    </p>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
