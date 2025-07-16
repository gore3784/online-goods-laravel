import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Product, Category } from '@/types';
import { useStore } from '@/store/useStore';

export const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { selectedCategory, setSelectedCategory } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProducts = await fetch('http://localhost:8000/api/products/featured');
        const resCategories = await fetch('http://localhost:8000/api/categories');

        const dataProducts = await resProducts.json();
        const dataCategories = await resCategories.json();

        setProducts(dataProducts.slice(0, 5)); // 5 produk unggulan pertama
        setCategories(dataCategories);
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category_id === selectedCategory)
    : products;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Selamat Datang di Hinggi.id
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
              Temukan produk budaya Sumba terbaik dengan harga terjangkau. Belanja sekarang dan nikmati pengiriman yang cepat dan aman.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/products">Belanja Sekarang</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-black border-black hover:bg-gray-100 hover:text-black">
                <Link to="/about">Tentang Kami</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Kategori */}
      <section className="container">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Belanja Berdasarkan Kategori</h2>
          <p className="text-muted-foreground text-lg">Jelajahi koleksi kami berdasarkan jenis produk</p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(null)}
          >
            Semua Kategori
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </section>

      {/* Produk Unggulan */}
      <section className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              {selectedCategory
                ? categories.find((cat) => cat.id === selectedCategory)?.name
                : 'Produk Unggulan'}
            </h2>
            <p className="text-muted-foreground">
              {selectedCategory
                ? categories.find((cat) => cat.id === selectedCategory)?.description
                : 'Lihat pilihan produk terbaik dari kami'}
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/products">Lihat Semua</Link>
          </Button>
        </div>

        <ProductGrid products={filteredProducts} loading={loading} />
      </section>

      {/* Statistik */}
      <section className="bg-muted/50 py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1000+</div>
              <div className="text-muted-foreground">Pelanggan Puas</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Produk Tersedia</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Kategori Produk</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Dukungan Pelanggan</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};