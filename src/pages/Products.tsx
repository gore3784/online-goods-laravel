import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/products/ProductGrid';
import { useStore } from '@/store/useStore';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category_id: string;
  created_at?: string;
};

type Category = {
  id: string;
  name: string;
};

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState('all');
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  } = useStore();

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams, setSearchQuery]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (selectedCategory) queryParams.append('category', selectedCategory);
      if (searchQuery) queryParams.append('search', searchQuery);

      const res = await fetch(`http://localhost:8000/api/products?${queryParams}`);
      const json = await res.json();
      setProducts(json.data || []);
      setLoading(false);
    };

    fetchProducts();
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    fetch('http://localhost:8000/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'under-100k':
          filtered = filtered.filter(product => product.price < 100000);
          break;
        case '100k-500k':
          filtered = filtered.filter(product => product.price >= 100000 && product.price <= 500000);
          break;
        case 'over-500k':
          filtered = filtered.filter(product => product.price > 500000);
          break;
      }
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'stock':
        filtered.sort((a, b) => b.stock - a.stock);
        break;
      default:
        filtered.sort((a, b) =>
          new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
        );
    }

    return filtered;
  }, [products, priceRange, sortBy]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Products</h1>
        <p className="text-muted-foreground">
          {filteredAndSortedProducts.length} products found
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* Search */}
        <div className="relative">
          <Input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        {/* Category Filter */}
        <Select
          value={selectedCategory || 'all'}
          onValueChange={(value) => setSelectedCategory(value === 'all' ? null : value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Price Range Filter */}
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger>
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="under-100k">Under {formatPrice(100000)}</SelectItem>
            <SelectItem value="100k-500k">
              {formatPrice(100000)} - {formatPrice(500000)}
            </SelectItem>
            <SelectItem value="over-500k">Over {formatPrice(500000)}</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="name">Name: A to Z</SelectItem>
            <SelectItem value="stock">Stock: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      {(searchQuery || selectedCategory || priceRange !== 'all' || sortBy !== 'newest') && (
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory(null);
              setPriceRange('all');
              setSortBy('newest');
              setSearchParams({});
            }}
          >
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Products Grid */}
      <ProductGrid products={filteredAndSortedProducts} loading={loading} />
    </div>
  );
};
