# Etalase.AI — Generator Konten & Asisten CS UMKM Berbasis Generative AI

---

## Fitur

- **Analisis Visual Foto Produk (Multi-modal):** Menggunakan kemampuan visual `gemini-3.5-flash` untuk menganalisis warna, tekstur (misal: renyah, lumer, tebal), dan bentuk kemasan secara langsung dari foto, menghasilkan deskripsi yang **100% autentik dan akurat**, bukan template generik.
- **Ekspor 1-Klik ke WhatsApp Admin:** Tombol praktis untuk mengirimkan seluruh paket konten (*Deskripsi + Caption + Insight + Template CS*) langsung ke WhatsApp admin toko/pemilik untuk disimpan atau diposting.
- **Panduan Onboarding Visual 4 Langkah:** Tooltip panduan interaktif bagi pengguna pemula/non-teknis.
- **Client-Side Image Compression:** Kompresi foto otomatis di peramban pengguna sebelum diproses AI untuk menghemat *bandwidth* dan mempercepat durasi generasi.

---

## Teknologi yang Digunakan

- **Core Framework:** [Next.js 15 (App Router)](https://nextjs.org/) & React 19 (`use client` + Serverless API Route)
- **Generative AI SDK:** [`@google/genai`](https://www.npmjs.com/package/@google/genai) (Google Gen AI SDK terbaru) dengan model `gemini-3.5-flash`
- **Structured JSON Engine:** Enforcing strict JSON schema boundaries with `responseSchema` and `responseMimeType: "application/json"`
- **Styling & UI:** Tailwind CSS v4, Inter Typography, & `lucide-react` icons
- **Animations:** `motion/react` (Framer Motion)

---
