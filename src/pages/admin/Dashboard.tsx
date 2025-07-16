import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Users, ShoppingBag, TrendingUp } from 'lucide-react';
import { mockProducts } from '@/data/mockData';

export const AdminDashboard = () => {
  const totalProducts = mockProducts.length;
  const lowStockProducts = mockProducts.filter(p => p.stock < 10).length;
  const totalRevenue = 125000000; // Mock revenue
  const totalOrders = 156; // Mock orders

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts,
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'Low Stock Items',
      value: lowStockProducts,
      icon: TrendingUp,
      color: 'text-orange-600'
    },
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: ShoppingBag,
      color: 'text-green-600'
    },
    {
      title: 'Revenue',
      value: new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(totalRevenue),
      icon: Users,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your e-commerce store</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                <div>
                  <p className="font-medium">Order #1001</p>
                  <p className="text-sm text-muted-foreground">John Doe</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Rp 2,500,000</p>
                  <p className="text-sm text-green-600">Completed</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                <div>
                  <p className="font-medium">Order #1002</p>
                  <p className="text-sm text-muted-foreground">Jane Smith</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Rp 1,200,000</p>
                  <p className="text-sm text-yellow-600">Processing</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                <div>
                  <p className="font-medium">Order #1003</p>
                  <p className="text-sm text-muted-foreground">Bob Johnson</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Rp 3,200,000</p>
                  <p className="text-sm text-blue-600">Shipped</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Low Stock Alert</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProducts
                .filter(product => product.stock < 10)
                .slice(0, 3)
                .map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-red-600">Low Stock</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};