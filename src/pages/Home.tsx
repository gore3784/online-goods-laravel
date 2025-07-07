import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Badge } from '@/components/ui/badge';
import { mockProducts, mockCategories } from '@/data/mockData';
import { Product, Category } from '@/types';
import { useStore } from '@/store/useStore';

export const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { selectedCategory, setSelectedCategory } = useStore();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFeaturedProducts(mockProducts.slice(0, 8));
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProducts = selectedCategory
    ? featuredProducts.filter(product => product.category_id === selectedCategory)
    : featuredProducts;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Selamat data di Toko kami
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
              Temukan produk yang anda butuhkan dengan harga yang terjangkau. Belanja sekarang dan nikmati pengiriman yang cepat dan aman.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/products">Shop Now</Link>
              </Button>
              {/* <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link to="/about">Learn More</Link>
              </Button> */}
              <Button size="lg" variant="outline" className="bg-white text-black border-black hover:bg-gray-100 hover:text-black">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground text-lg">
            Temukan produk yang anda butuhkan
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
          >
            All Categories
          </Button>
          {mockCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              {selectedCategory ?
                mockCategories.find(cat => cat.id === selectedCategory)?.name :
                'Featured Products'
              }
            </h2>
            <p className="text-muted-foreground">
              {selectedCategory ?
                mockCategories.find(cat => cat.id === selectedCategory)?.description :
                'Temukan produk yang anda butuhkan'
              }
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/products">View All</Link>
          </Button>
        </div>

        <ProductGrid products={filteredProducts} loading={loading} />
      </section>

      {/* Stats Section */}
      <section className="bg-muted/50 py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1000+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};