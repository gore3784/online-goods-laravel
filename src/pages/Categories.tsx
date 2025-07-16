import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useStore } from '@/store/useStore';

type Category = {
  id: string;
  name: string;
  description: string | null;
};

export const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { setSelectedCategory } = useStore();

  useEffect(() => {
    fetch('http://localhost:8000/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Product Categories</h1>
        <p className="text-muted-foreground">
          Browse our wide selection of products by category
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/products" onClick={() => handleCategoryClick(category.id)}>
              <CardHeader>
                <CardTitle className="text-xl">{category.name}</CardTitle>
                <CardDescription>{category.description || 'No description.'}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Browse products
                  </span>
                  <span className="text-primary font-semibold">Browse →</span>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {/* Featured Categories Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.slice(0, 4).map((category) => (
            <Link
              key={category.id}
              to="/products"
              onClick={() => handleCategoryClick(category.id)}
              className="group"
            >
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <div className="text-center">
                  <div className="text-2xl mb-2">
                    {/* Tambahkan emoji dinamis jika ingin */}
                    📦
                  </div>
                  <span className="text-sm font-medium">{category.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
