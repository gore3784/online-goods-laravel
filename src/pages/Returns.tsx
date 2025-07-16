import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowPathIcon, ShieldCheckIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export const Returns = () => {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Pengembalian & Pengembalian Dana</h1>
        <p className="text-muted-foreground">
          Kebijakan pengembalian kami yang mudah memastikan kepuasan Anda dalam setiap pembelian
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Kebijakan Pengembalian */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ArrowPathIcon className="h-5 w-5" />
                <span>Ringkasan Kebijakan Pengembalian</span>
              </CardTitle>
              <CardDescription>
                Hal-hal penting yang perlu Anda ketahui saat mengembalikan barang
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Batas Waktu 30 Hari</h4>
                <p className="text-sm text-green-700">
                  Anda memiliki waktu 30 hari sejak tanggal pengiriman untuk mengembalikan barang dan mendapatkan pengembalian dana penuh.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Barang yang Dapat Dikembalikan</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Barang dalam kondisi asli dengan label</li>
                  <li>• Elektronik yang belum dibuka dalam kemasan asli</li>
                  <li>• Pakaian dan aksesoris (belum dipakai, masih ada tag)</li>
                  <li>• Buku dan media (belum dibuka/digunakan)</li>
                  <li>• Barang rumah tangga (belum digunakan)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Syarat Pengembalian</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Dalam kemasan asli</li>
                  <li>• Sertakan semua aksesoris dan manual</li>
                  <li>• Tidak ada tanda-tanda pemakaian atau kerusakan</li>
                  <li>• Sertakan bukti pembelian atau konfirmasi pesanan</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ExclamationTriangleIcon className="h-5 w-5" />
                <span>Barang yang Tidak Dapat Dikembalikan</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-red-700 font-medium mb-2">
                  Barang berikut tidak dapat dikembalikan karena alasan kebersihan dan keamanan:
                </p>
                <ul className="text-sm text-red-600 space-y-1">
                  <li>• Produk perawatan pribadi (sudah dibuka)</li>
                  <li>• Pakaian dalam dan baju renang</li>
                  <li>• Makanan dan suplemen</li>
                  <li>• Barang custom atau personalisasi</li>
                  <li>• Perangkat lunak dan unduhan digital</li>
                  <li>• Barang yang rusak karena kesalahan penggunaan</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Kasus Khusus</h4>
                <p className="text-sm text-muted-foreground">
                  Beberapa elektronik atau peralatan rumah tangga mungkin memiliki masa pengembalian berbeda. Silakan periksa halaman produk atau hubungi layanan pelanggan.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Proses Pengembalian */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cara Mengembalikan Barang</CardTitle>
              <CardDescription>
                Langkah mudah untuk mengembalikan pembelian Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Mulai Pengembalian", "Cetak Label Pengembalian", "Kemas Barang", "Kirim Paket"].map((title, i) => (
                  <div className="flex items-start space-x-3" key={i}>
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold">{title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {[
                          'Masuk ke "Riwayat Pesanan" dan pilih "Kembalikan Barang".',
                          'Unduh dan cetak label pengembalian dari email Anda.',
                          'Kemas barang dengan aman dan tempelkan label pengembalian.',
                          'Kirim ke titik drop-off atau jadwalkan penjemputan.'
                        ][i]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t">
                <Button className="w-full">Mulai Proses Pengembalian</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ClockIcon className="h-5 w-5" />
                <span>Estimasi Waktu Pengembalian Dana</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Waktu Pemrosesan</h4>
                  <Badge variant="secondary">2-3 Hari</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Dana akan diproses setelah barang diterima dan diperiksa oleh tim kami.
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Metode Pengembalian</h4>
                  <Badge variant="outline">Metode Pembayaran Asli</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Dana akan dikembalikan ke metode pembayaran awal Anda.
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Proses Bank</h4>
                  <Badge variant="secondary">3-7 Hari</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Bank atau penyedia pembayaran Anda mungkin membutuhkan waktu tambahan untuk memproses dana.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShieldCheckIcon className="h-5 w-5" />
                <span>Biaya Pengiriman Pengembalian</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold text-green-600">Gratis Biaya Pengembalian</h4>
                <p className="text-sm text-muted-foreground">
                  Kami menanggung biaya untuk barang rusak, salah kirim, atau kesalahan kami.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-orange-600">Biaya Ditanggung Pelanggan</h4>
                <p className="text-sm text-muted-foreground">
                  Untuk pengembalian karena perubahan pikiran atau ukuran, biaya pengiriman ditanggung pelanggan.
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-700">
                  <strong>Tips:</strong> Pertimbangkan untuk menukar ukuran atau warna agar tidak perlu membayar ongkos kirim kembali!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Kontak */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Butuh Bantuan Pengembalian?</CardTitle>
          <CardDescription>
            Tim layanan pelanggan kami siap membantu Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <h4 className="font-semibold mb-2">Email</h4>
              <p className="text-sm text-muted-foreground">returns@hinggi.id</p>
              <p className="text-xs text-muted-foreground">Balasan dalam 24 jam</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">Telepon</h4>
              <p className="text-sm text-muted-foreground">+62 21 1234 5678</p>
              <p className="text-xs text-muted-foreground">Senin - Jumat, 09.00 - 18.00</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">Live Chat</h4>
              <p className="text-sm text-muted-foreground">Tersedia di website</p>
              <p className="text-xs text-muted-foreground">Senin - Jumat, 09.00 - 18.00</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};