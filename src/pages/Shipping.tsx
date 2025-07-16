import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TruckIcon, ClockIcon, MapPinIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export const Shipping = () => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Informasi Pengiriman</h1>
        <p className="text-muted-foreground">
          Semua yang perlu Anda ketahui tentang kebijakan pengiriman dan opsi pengantaran kami
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Opsi Pengiriman */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TruckIcon className="h-5 w-5" />
                <span>Opsi Pengiriman</span>
              </CardTitle>
              <CardDescription>
                Pilih kecepatan pengiriman yang sesuai dengan kebutuhan Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Pengiriman Standar</h4>
                  <Badge variant="secondary">Paling Populer</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Pengiriman terpercaya untuk pesanan harian Anda
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Estimasi Waktu:</span>
                    <p className="text-muted-foreground">2-5 hari kerja</p>
                  </div>
                  <div>
                    <span className="font-medium">Biaya:</span>
                    <p className="text-muted-foreground">{formatPrice(15000)} - {formatPrice(35000)}</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Pengiriman Ekspres</h4>
                  <Badge variant="default">Cepat</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Pengiriman cepat saat Anda membutuhkannya segera
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Estimasi Waktu:</span>
                    <p className="text-muted-foreground">1-2 hari kerja</p>
                  </div>
                  <div>
                    <span className="font-medium">Biaya:</span>
                    <p className="text-muted-foreground">{formatPrice(25000)} - {formatPrice(50000)}</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Pengiriman Hari yang Sama</h4>
                  <Badge variant="destructive">Hanya Jakarta</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Pesanan tiba di hari yang sama (khusus wilayah Jakarta)
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Estimasi Waktu:</span>
                    <p className="text-muted-foreground">Hari yang sama</p>
                  </div>
                  <div>
                    <span className="font-medium">Biaya:</span>
                    <p className="text-muted-foreground">{formatPrice(50000)} - {formatPrice(75000)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPinIcon className="h-5 w-5" />
                <span>Wilayah Pengiriman</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-600">Jakarta & Sekitarnya</h4>
                  <p className="text-sm text-muted-foreground">
                    Jakarta, Bogor, Depok, Tangerang, Bekasi (Jabodetabek)
                  </p>
                  <p className="text-sm font-medium">Semua opsi pengiriman tersedia</p>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-600">Kota Besar</h4>
                  <p className="text-sm text-muted-foreground">
                    Bandung, Surabaya, Yogyakarta, Semarang, Medan, Makassar
                  </p>
                  <p className="text-sm font-medium">Pengiriman Standar & Ekspres</p>
                </div>

                <div>
                  <h4 className="font-semibold text-orange-600">Wilayah Lain</h4>
                  <p className="text-sm text-muted-foreground">
                    Seluruh wilayah lainnya di Indonesia
                  </p>
                  <p className="text-sm font-medium">Hanya pengiriman standar</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kebijakan Pengiriman */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShieldCheckIcon className="h-5 w-5" />
                <span>Gratis Ongkir</span>
              </CardTitle>
              <CardDescription>
                Nikmati pengiriman gratis untuk pesanan yang memenuhi syarat
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">
                  Pengiriman Standar Gratis
                </h4>
                <p className="text-sm text-green-700">
                  Berlaku untuk pesanan di atas {formatPrice(500000)} di wilayah Jakarta.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">
                  Pengiriman Ekspres Gratis
                </h4>
                <p className="text-sm text-blue-700">
                  Berlaku untuk pesanan di atas {formatPrice(1000000)} di wilayah Jakarta.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ClockIcon className="h-5 w-5" />
                <span>Waktu Pemrosesan</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold">Pemrosesan Pesanan</h4>
                <p className="text-sm text-muted-foreground">
                  Sebagian besar pesanan diproses dalam 1-2 hari kerja setelah konfirmasi pembayaran.
                </p>
              </div>

              <div>
                <h4 className="font-semibold">Batas Waktu Pemesanan</h4>
                <p className="text-sm text-muted-foreground">
                  Pesanan sebelum pukul 14.00 pada hari kerja biasanya diproses di hari yang sama.
                </p>
              </div>

              <div>
                <h4 className="font-semibold">Akhir Pekan & Hari Libur</h4>
                <p className="text-sm text-muted-foreground">
                  Pesanan pada akhir pekan atau hari libur akan diproses di hari kerja berikutnya.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Catatan Penting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold">Keakuratan Alamat</h4>
                <p className="text-sm text-muted-foreground">
                  Pastikan alamat pengiriman Anda benar. Kami tidak bertanggung jawab atas pengiriman ke alamat yang salah.
                </p>
              </div>

              <div>
                <h4 className="font-semibold">Pelacakan Paket</h4>
                <p className="text-sm text-muted-foreground">
                  Nomor resi akan dikirim melalui email setelah pesanan dikirim. Anda dapat melacaknya melalui situs kami atau sistem pelacakan ekspedisi.
                </p>
              </div>

              <div>
                <h4 className="font-semibold">Percobaan Pengiriman</h4>
                <p className="text-sm text-muted-foreground">
                  Jika pengiriman gagal, kurir akan mencoba hingga 3 kali. Setelah itu, paket akan dikembalikan ke kami.
                </p>
              </div>

              <div>
                <h4 className="font-semibold">Cuaca & Keadaan Tak Terduga</h4>
                <p className="text-sm text-muted-foreground">
                  Waktu pengiriman dapat terpengaruh oleh cuaca, bencana alam, atau kondisi di luar kendali kami.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};