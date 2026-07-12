# Etalase.AI — Generator Konten & Asisten CS UMKM Berbasis Generative AI 🚀

<div align="center">
  <h3 align="center">Solusi Digitalisasi & Akselerasi UMKM Indonesia dengan Google Gemini AI</h3>
  <p align="center">
    <strong>IDCamp Developer Challenge #2: Digitalization & Acceleration of MSMEs with Generative AI</strong><br />
    Diselenggarakan oleh Dicoding Indonesia
  </p>
</div>

---

## 📌 Latar Belakang & Permasalahan UMKM

Pelaku UMKM di Indonesia sering kali memiliki produk berkualitas (kuliner rumahan, jajanan pasar, kerajinan, hingga busana lokal), namun menghadapi kendala besar saat beralih ke ranah digital:
1. **Keterbatasan Waktu & Keahlian Copywriting:** Sulit merangkai kata-kata promosi yang menarik dan persuasif untuk marketplace maupun media sosial.
2. **Klaim Berlebihan & Blokir Marketplace:** Sering menggunakan kata terlarang seperti *"Paling"*, *"Nomor 1"*, atau *"Terbaik di Dunia"* yang berujung pada pemblokiran *listing* produk oleh sistem algoritma e-commerce.
3. **Kewalahan Menjawab Chat Pembeli (CS):** Saat promosi berhasil dan calon pembeli bertanya melalui DM atau WhatsApp, penjual sering kehabisan waktu atau menjawab terlalu singkat sehingga pembeli batal transaksi (*lost sales*).
4. **Kebingungan Menentukan Harga Kompetitif:** Kurangnya riset pasar mengenai kisaran harga produk serupa.

---

## 🌟 Solusi yang Ditawarkan: Etalase.AI (4-in-1 AI Assistant)

**Etalase.AI** hadir sebagai *Minimum Viable Product (MVP)* berbasis **Google Gemini AI (`gemini-3.5-flash`)** yang dirancang khusus dengan antarmuka yang sangat mudah dipahami (*Google-vibe design, clean, tanpa jargon rumit*) bahkan bagi pengguna non-teknis.

Hanya dalam **1 kali klik upload foto produk dan nama**, Etalase.AI menghasilkan **4 pilar solusi digital sekaligus**:

1. 🛒 **Deskripsi Marketplace Otomatis:** Teks terstruktur (pembuka menarik, bullet points keunggulan spesifik, saran penyimpanan) yang telah **dioptimasi bebas kata hiperbolis terlarang e-commerce** (Shopee, Tokopedia, Lazada).
2. 📱 **Caption Media Sosial 3 Gaya Bahasa:** Pilihan *Tone* pemasaran disesuaikan dengan target pembeli:
   - **Gaul & Asyik:** Kasual, anak muda, ceria dengan sapaan *Kak/Bestie*.
   - **Profesional:** Rapi, formal, elegan untuk katalog resmi dengan sapaan *Bapak/Ibu/Anda*.
   - **Hangat (Keluarga):** Penuh perhatian, akrab untuk kuliner rumahan & produk keluarga dengan sapaan *Bunda/Sahabat*.
3. 💬 **Template Balasan Chat CS (WhatsApp/DM):** Asisten cerdas yang menyiapkan 3 skrip balasan siap copas untuk admin toko:
   - *[Sapaan & Info Ready Stock Ramah]*
   - *[Info Pengiriman & Kualitas Packing Aman]*
   - *[Follow-Up Halus untuk Pembeli yang Masih Ragu]*
4. 📈 **Riset Kisaran Harga Pasar (AI Insight):** Estimasi kisaran harga jual produk sejenis di pasaran sebagai referensi harga kompetitif bagi UMKM.

---

## ✨ Fitur Unggulan Tambahan

- **🎯 Analisis Visual Foto Produk (Multi-modal):** Menggunakan kemampuan visual `gemini-3.5-flash` untuk menganalisis warna, tekstur (misal: renyah, lumer, tebal), dan bentuk kemasan secara langsung dari foto, menghasilkan deskripsi yang **100% autentik dan akurat**, bukan template generik.
- **⚡ Indikator Kuota Harian Gratis (`Freemium Model`):** Manajemen kuota harian (`10/10`) berbasis *localStorage* dengan sistem reset otomatis harian, serta fitur klik-to-reset khusus pengujian juri.
- **📲 Ekspor 1-Klik ke WhatsApp Admin:** Tombol praktis untuk mengirimkan seluruh paket konten (*Deskripsi + Caption + Insight + Template CS*) langsung ke WhatsApp admin toko/pemilik untuk disimpan atau diposting.
- **🧭 Panduan Onboarding Visual 4 Langkah:** Tooltip panduan interaktif bagi pengguna pemula/non-teknis.
- **🗜️ Client-Side Image Compression:** Kompresi foto otomatis di peramban pengguna sebelum diproses AI untuk menghemat *bandwidth* dan mempercepat durasi generasi.

---

## 🛠️ Teknologi yang Digunakan

- **Core Framework:** [Next.js 15 (App Router)](https://nextjs.org/) & React 19 (`use client` + Serverless API Route)
- **Generative AI SDK:** [`@google/genai`](https://www.npmjs.com/package/@google/genai) (Google Gen AI SDK terbaru) dengan model `gemini-3.5-flash`
- **Structured JSON Engine:** Enforcing strict JSON schema boundaries with `responseSchema` and `responseMimeType: "application/json"`
- **Styling & UI:** Tailwind CSS v4, Inter Typography, & `lucide-react` icons
- **Animations:** `motion/react` (Framer Motion)

---

## 🚀 Cara Menjalankan Lokal

1. **Kloning repositori:**
   ```bash
   git clone https://github.com/nofail25/etalase.ai.git
   cd etalase.ai
   ```

2. **Install dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variable:**
   Buat file `.env.local` di root folder dan masukkan API Key Gemini Anda:
   ```env
   GEMINI_API_KEY=AIzaSy...your_api_key_here
   ```

4. **Jalankan server pengembangan:**
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 🏆 Kesesuaian dengan Kriteria IDCamp Challenge #2

| Kriteria | Bobot | Implementasi di Etalase.AI |
| :--- | :---: | :--- |
| **Kesesuaian Tema** | 30% | Menjawab langsung kebutuhan UMKM dalam pemasaran & pelayanan (Asisten Konten + Asisten Chatbot CS) dengan Generative AI. |
| **Manfaat untuk Masyarakat** | 25% | Menghemat jam kerja UMKM setiap hari, mencegah pemblokiran toko di marketplace, dan meningkatkan omset melalui *fast response CS*. |
| **Desain & Kemudahan** | 25% | Desain kelas enterprise bergaya Google, responsif untuk Mobile & Desktop, dilengkapi *onboarding guide* 4 langkah. |
| **Inovasi & Kebaruan** | 20% | Fitur 4-in-1 dengan analisis visual foto multidimensi serta ekspor langsung ke WhatsApp yang sangat praktis bagi perilaku UMKM Indonesia. |

---

<div align="center">
  <p>Dibuat dengan ❤️ untuk kemajuan UMKM Indonesia di IDCamp 2024/2025.</p>
</div>
