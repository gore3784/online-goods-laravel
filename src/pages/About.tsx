import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HeartIcon, ShieldCheckIcon, TruckIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export const About = () => {
  return (
    <div className="container py-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Tentang Hinggi.id</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Hinggi.id adalah toko daring yang menjual berbagai produk budaya Sumba, khususnya sarung adat Hinggi, serta pakaian, dress, tas, dan kerajinan lainnya.
        </p>
      </div>

      {/* Company Story */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">Kisah Kami</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <p className="text-muted-foreground mb-4">
            Hinggi.id berdiri dengan tujuan melestarikan dan memasarkan kekayaan budaya Sumba melalui platform digital. Kami berkomitmen untuk menjadi jembatan antara para perajin lokal dan pasar yang lebih luas, baik di dalam maupun luar negeri.
          </p>
          <p className="text-muted-foreground mb-4">
            Dengan semangat pelestarian budaya dan pemberdayaan ekonomi lokal, kami menyajikan produk-produk berkualitas tinggi yang mencerminkan nilai, keindahan, dan makna adat Sumba.
          </p>
          <p className="text-muted-foreground">
            Hinggi.id hadir bukan hanya sebagai toko online, tapi sebagai wadah promosi dan edukasi budaya yang mengedepankan integritas, keaslian, dan inovasi dalam setiap produk yang kami tampilkan.
          </p>
        </CardContent>
      </Card>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <HeartIcon className="h-6 w-6 text-primary" />
              <span>Misi Kami</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Menyediakan akses mudah terhadap produk budaya Sumba berkualitas tinggi sambil memberdayakan pengrajin lokal dan memperkenalkan nilai-nilai tradisional kepada dunia.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShieldCheckIcon className="h-6 w-6 text-primary" />
              <span>Visi Kami</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Menjadi platform unggulan dalam penjualan produk budaya Sumba yang mengedepankan kualitas, keaslian, dan keberlanjutan.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Core Values */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">Nilai-Nilai Utama Kami</CardTitle>
          <CardDescription>
            Prinsip yang menjadi dasar dari setiap langkah kami
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Kepercayaan & Keamanan</h3>
              <p className="text-sm text-muted-foreground">
                Kami menjamin keamanan transaksi dan melindungi data pribadi Anda.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Pelanggan Adalah Prioritas</h3>
              <p className="text-sm text-muted-foreground">
                Kepuasan pelanggan selalu menjadi fokus utama kami.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TruckIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Layanan Berkualitas</h3>
              <p className="text-sm text-muted-foreground">
                Pengalaman berbelanja yang menyenangkan dari pemesanan hingga pengiriman.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Komunitas</h3>
              <p className="text-sm text-muted-foreground">
                Kami tumbuh bersama komunitas dan mendukung pelaku budaya lokal.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact CTA */}
      <Card className="text-center">
        <CardContent className="py-8">
          <h2 className="text-2xl font-bold mb-4">Siap Berbelanja Produk Budaya Sumba?</h2>
          <p className="text-muted-foreground mb-6">
            Temukan koleksi produk khas Sumba hanya di Hinggi.id dan dukung pelestarian budaya Indonesia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/products">Mulai Belanja</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/contact">Hubungi Kami</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
