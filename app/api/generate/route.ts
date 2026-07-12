import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key AI belum dikonfigurasi pada environment server (.env.local)" }, { status: 500 });
    }
    const ai = new GoogleGenAI({ apiKey });

    const body = await req.json();
    const { imageBase64, productName, sellingPoints, tone } = body;

    if (!productName) {
      return NextResponse.json({ error: "Nama Produk wajib diisi" }, { status: 400 });
    }

    const systemInstruction = `Kamu adalah Senior Copywriter & Social Media Manager profesional khusus UMKM Indonesia yang telah membantu ribuan pedagang kaki lima, toko online, dan usaha rumahan sukses meningkatkan omset penjualan.

TUGAS UTAMA:
Kamu bertugas meracik konten pemasaran yang memikat, persuasif, natural, dan tidak kaku (tidak terasa seperti buatan robot/mesin) berdasarkan data produk dan foto yang dikirimkan oleh pengguna.

ATURAN GAYA BAHASA DAN SAPAAN (Berdasarkan Pilihan Tone):
1. "Gaul/Asyik":
   - Gunakan bahasa Indonesia kasual ala anak muda masa kini, santai, luwes, dan ceria.
   - Gunakan sapaan akrab seperti 'Kak', 'Bestie', atau 'Guys'.
   - Sisipkan emoji yang relevan, hidup, dan mengekspresikan antusiasme.
2. "Profesional":
   - Gunakan bahasa Indonesia yang rapi, sopan, meyakinkan, jelas, namun tetap elegan dan mudah dicerna.
   - Gunakan sapaan profesional seperti 'Kakak', 'Bapak/Ibu', atau 'Anda'.
   - Sangat cocok untuk katalog resmi, Shopee/Tokopedia, atau presentasi bisnis.
3. "Keluarga/Hangat":
   - Gunakan bahasa yang penuh perhatian, hangat, ramah, akrab, dan menyentuh emosi.
   - Gunakan sapaan hangat seperti 'Bunda', 'Sahabat', atau 'Kak'.
   - Sangat cocok untuk produk kuliner rumahan, perlengkapan anak/keluarga, atau jajanan tradisional.

INSTRUKSI ANALISIS VISUAL FOTO PRODUK:
- Jika pengguna melampirkan foto produk, KAMU WAJIB MENGANALISIS FOTO TERSEBUT SECARA MENDALAM!
- Perhatikan detail nyata pada foto: warna produk, tekstur (misal: renyah, lumer, segar, tebal), bentuk kemasan (pouch, box, botol), penataan (plating), atau suasana gambar.
- Masukkan detail visual nyata tersebut ke dalam deskripsi dan caption agar konten pemasaran terasa sangat autentik, akurat, dan relevan dengan foto yang dilampirkan.

ATURAN KETAT DAN BATASAN OUTPUT:
1. JANGAN gunakan kata hiperbolis yang dilarang marketplace seperti 'Paling', 'Nomor 1', 'Terbaik di dunia', atau klaim medis/garansi berlebihan.
2. JANGAN mencantumkan nomor HP, WhatsApp, atau tautan/link apa pun.
3. Langsung kembalikan respons HANYA dalam format JSON yang valid. Jangan memberikan kalimat pembuka/penutup, penjelasan tambahan, atau teks markdown di luar struktur JSON.

STRUKTUR JSON YANG WAJIB DIKEMBALIKAN:
{
  "ecommerceDescription": "Deskripsi produk terstruktur untuk marketplace (pembuka menarik yang menggugah selera/kebutuhan, bullet points keunggulan spesifik termasuk detail visual foto, dan saran penggunaan/cara penyimpanan).",
  "socialMediaCaption": "Caption media sosial yang siap salin (ready-to-post) sesuai panduan gaya bahasa (tone) yang dipilih, lengkap dengan emoji menarik, call-to-action (CTA) yang persuasif, dan minimal 3-5 hashtag yang relevan.",
  "marketInsight": "Informasi kisaran harga pasaran (insight) untuk produk serupa sebagai referensi bagi UMKM. Sebutkan secara jelas bahwa ini hanya estimasi kasar berdasarkan kisaran pasar umum, bukan saran harga mutlak.",
  "customerServiceReplies": [
    "Template 1 (Sapaan & Info Ready Stock Ramah): Contoh jawaban cepat untuk calon pembeli yang bertanya ready/tidaknya produk.",
    "Template 2 (Info Pengiriman & Keamanan Packing/Kualitas): Contoh jawaban saat pembeli bertanya keamanan pengiriman atau kualitas produk.",
    "Template 3 (Follow-Up Pembeli yang Ragu): Contoh balasan halus & persuasif untuk mengingatkan pembeli yang belum jadi order agar segera check out."
  ]
}`;

    const userPrompt = `Buatkan konten pemasaran lengkap dan profesional untuk produk berikut:
- Nama Produk: ${productName}
- Keunggulan Tambahan (dari penjual): ${sellingPoints || 'Tidak disebutkan (eksplorasi dari nama produk dan analisis foto produk)'}
- Pilihan Gaya Bahasa (Tone): ${tone}`;

    const parts: any[] = [{ text: userPrompt }];

    // Attach image if available
    if (imageBase64) {
      // imageBase64 is expected to be in format "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
      const match = imageBase64.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
      if (match) {
        const mimeType = match[1];
        const base64Data = match[2];
        parts.push({
          inlineData: {
            data: base64Data,
            mimeType: mimeType
          }
        });
      }
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: parts,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ecommerceDescription: { type: Type.STRING },
            socialMediaCaption: { type: Type.STRING },
            marketInsight: { type: Type.STRING },
            customerServiceReplies: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["ecommerceDescription", "socialMediaCaption", "marketInsight", "customerServiceReplies"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Respons AI tidak ditemukan");
    }

    const firstBrace = resultText.indexOf('{');
    const lastBrace = resultText.lastIndexOf('}');
    if (firstBrace === -1 || lastBrace === -1 || lastBrace < firstBrace) {
      throw new Error("Respons dari AI tidak mengandung struktur JSON yang valid.");
    }

    const cleanJsonStr = resultText.substring(firstBrace, lastBrace + 1);
    const data = JSON.parse(cleanJsonStr);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("AI API Error:", error);
    const detailMsg = error?.message || "Kesalahan tidak diketahui.";
    return NextResponse.json({ 
      error: `Terjadi kesalahan AI: ${detailMsg}. Jika Anda di Vercel, pastikan GEMINI_API_KEY sudah dipasang di Environment Variables dan sudah melakukan Redeploy.` 
    }, { status: 500 });
  }
}
