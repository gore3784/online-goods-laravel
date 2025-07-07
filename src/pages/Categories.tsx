import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockCategories, mockProducts } from '@/data/mockData';
import { useStore } from '@/store/useStore';

export const Categories = () => {
  const { setSelectedCategory } = useStore();

  const getCategoryProductCount = (categoryId: string) => {
    return mockProducts.filter(product => product.category_id === categoryId).length;
  };

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
        {mockCategories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <Link to="/products" onClick={() => handleCategoryClick(category.id)}>
              <CardHeader>
                <CardTitle className="text-xl">{category.name}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {getCategoryProductCount(category.id)} products available
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
          {mockCategories.slice(0, 4).map((category) => (
            <Link
              key={category.id}
              to="/products"
              onClick={() => handleCategoryClick(category.id)}
              className="group"
            >
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <div className="text-center">
                  <div className="text-2xl mb-2">
                    {category.name === 'Electronics' && '📱'}
                    {category.name === 'Fashion' && '👕'}
                    {category.name === 'Home & Garden' && '🏠'}
                    {category.name === 'Sports' && '⚽'}
                    {category.name === 'Books' && '📚'}
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