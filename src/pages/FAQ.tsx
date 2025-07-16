import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const faqData = [
  {
    category: 'Pesanan & Pembayaran',
    questions: [
      {
        id: 'order-1',
        question: 'Bagaimana cara memesan produk?',
        answer: 'Untuk memesan produk, telusuri koleksi kami, tambahkan produk ke keranjang, lalu lanjutkan ke pembayaran. Isi data pengiriman dan metode pembayaran untuk menyelesaikan pesanan.'
      },
      {
        id: 'order-2',
        question: 'Metode pembayaran apa saja yang tersedia?',
        answer: 'Kami menerima kartu kredit (Visa, MasterCard), transfer bank, serta dompet digital seperti OVO, GoPay, dan DANA.'
      },
      {
        id: 'order-3',
        question: 'Bisakah saya mengubah atau membatalkan pesanan?',
        answer: 'Anda dapat mengubah atau membatalkan pesanan dalam 1 jam setelah pemesanan. Setelah itu, silakan hubungi layanan pelanggan kami.'
      },
      {
        id: 'order-4',
        question: 'Bagaimana cara melacak pesanan saya?',
        answer: 'Setelah pesanan dikirim, Anda akan menerima nomor resi melalui email. Anda juga dapat melihat status pesanan di halaman "Riwayat Pesanan" akun Anda.'
      }
    ]
  },
  {
    category: 'Pengiriman & Pengantaran',
    questions: [
      {
        id: 'shipping-1',
        question: 'Berapa lama waktu pengiriman?',
        answer: 'Pengiriman standar memakan waktu 2-5 hari kerja di Jakarta dan 3-7 hari kerja untuk kota lainnya. Tersedia juga pengiriman ekspres.'
      },
      {
        id: 'shipping-2',
        question: 'Berapa biaya pengiriman?',
        answer: 'Biaya pengiriman tergantung lokasi dan berat paket. Pengiriman gratis tersedia untuk pesanan di atas Rp500.000 di wilayah Jakarta.'
      },
      {
        id: 'shipping-3',
        question: 'Apakah Anda mengirim ke luar negeri?',
        answer: 'Saat ini kami hanya melayani pengiriman dalam negeri. Namun, kami sedang mempersiapkan ekspansi ke luar negeri.'
      },
      {
        id: 'shipping-4',
        question: 'Bagaimana jika paket saya rusak atau hilang?',
        answer: 'Jika paket Anda rusak atau hilang saat pengiriman, segera hubungi kami. Kami akan menyelidiki dan memberikan pengganti atau pengembalian dana.'
      }
    ]
  },
  {
    category: 'Pengembalian & Pengembalian Dana',
    questions: [
      {
        id: 'return-1',
        question: 'Apa kebijakan pengembalian barang?',
        answer: 'Kami memberikan kebijakan pengembalian 30 hari untuk sebagian besar produk. Barang harus dalam kondisi asli lengkap dengan tag dan kemasan. Beberapa produk elektronik mungkin memiliki kebijakan berbeda.'
      },
      {
        id: 'return-2',
        question: 'Bagaimana cara mengembalikan produk?',
        answer: 'Masuk ke akun Anda, buka "Riwayat Pesanan", pilih pesanan, lalu klik "Kembalikan Barang" dan ikuti instruksinya.'
      },
      {
        id: 'return-3',
        question: 'Kapan saya akan menerima pengembalian dana?',
        answer: 'Pengembalian dana diproses dalam 5-7 hari kerja setelah barang diterima kembali oleh kami dan akan dikreditkan ke metode pembayaran Anda.'
      },
      {
        id: 'return-4',
        question: 'Siapa yang menanggung biaya pengembalian?',
        answer: 'Jika produk rusak atau salah, kami akan menanggung biaya pengembalian. Jika bukan karena kesalahan kami, biaya pengembalian ditanggung pembeli.'
      }
    ]
  },
  {
    category: 'Akun & Keamanan',
    questions: [
      {
        id: 'account-1',
        question: 'Bagaimana cara membuat akun?',
        answer: 'Klik "Daftar" di bagian atas halaman, isi data diri seperti nama, email, dan kata sandi. Anda akan menerima email konfirmasi untuk aktivasi.'
      },
      {
        id: 'account-2',
        question: 'Saya lupa kata sandi. Apa yang harus saya lakukan?',
        answer: 'Klik "Lupa Kata Sandi" di halaman masuk, masukkan email Anda, dan ikuti petunjuk yang dikirimkan.'
      },
      {
        id: 'account-3',
        question: 'Bagaimana cara memperbarui informasi akun saya?',
        answer: 'Masuk ke akun Anda dan buka bagian "Profil" untuk memperbarui informasi pribadi dan alamat pengiriman.'
      },
      {
        id: 'account-4',
        question: 'Apakah informasi saya aman?',
        answer: 'Ya, kami menggunakan enkripsi dan standar keamanan tinggi untuk melindungi data pribadi dan pembayaran Anda.'
      }
    ]
  },
  {
    category: 'Produk & Stok',
    questions: [
      {
        id: 'product-1',
        question: 'Bagaimana saya tahu ketersediaan produk?',
        answer: 'Ketersediaan produk ditampilkan di halaman masing-masing. Jika produk habis, Anda bisa mendaftar notifikasi saat stok tersedia kembali.'
      },
      {
        id: 'product-2',
        question: 'Apakah foto produk akurat?',
        answer: 'Kami berusaha menampilkan foto seakurat mungkin. Warna mungkin sedikit berbeda tergantung layar. Jika tidak puas, Anda dapat mengembalikannya.'
      },
      {
        id: 'product-3',
        question: 'Apakah ada garansi produk?',
        answer: 'Produk elektronik dilengkapi garansi dari produsen. Lama garansi tertera di halaman produk.'
      },
      {
        id: 'product-4',
        question: 'Bisakah saya meminta produk yang belum tersedia?',
        answer: 'Tentu! Hubungi kami untuk permintaan produk, dan kami akan usahakan mencarikannya atau memberi alternatif.'
      }
    ]
  }
];

export const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFAQ, setFilteredFAQ] = useState(faqData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredFAQ(faqData);
      return;
    }

    const filtered = faqData.map(category => ({
      ...category,
      questions: category.questions.filter(
        faq =>
          faq.question.toLowerCase().includes(query.toLowerCase()) ||
          faq.answer.toLowerCase().includes(query.toLowerCase())
      )
    })).filter(category => category.questions.length > 0);

    setFilteredFAQ(filtered);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Pertanyaan yang Sering Diajukan</h1>
        <p className="text-muted-foreground">
          Temukan jawaban atas pertanyaan umum seputar layanan kami
        </p>
      </div>

      {/* Pencarian */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari jawaban..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Kategori FAQ */}
      <div className="space-y-8">
        {filteredFAQ.map((category) => (
          <Card key={category.category}>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">{category.category}</h2>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFAQ.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">Tidak ada hasil ditemukan</h3>
            <p className="text-muted-foreground mb-4">
              Kami tidak menemukan FAQ yang cocok dengan pencarian Anda. Coba gunakan kata kunci lain.
            </p>
            <p className="text-sm text-muted-foreground">
              Masih punya pertanyaan? <a href="/contact" className="text-primary hover:underline">Hubungi tim kami</a>
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
