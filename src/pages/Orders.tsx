import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, ArchiveBoxIcon, TruckIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

// Mock order data
const mockOrders = [
  {
    id: 'ORD-001',
    date: '2024-01-20',
    status: 'delivered',
    total: 3750000,
    items: [
      {
        id: '1',
        name: 'Wireless Bluetooth Headphones',
        quantity: 1,
        price: 2500000,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop'
      },
      {
        id: '4',
        name: 'Casual Cotton T-Shirt',
        quantity: 2,
        price: 150000,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop'
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      address: 'Jl. Sudirman No. 123',
      city: 'Jakarta',
      postalCode: '12345'
    }
  },
  {
    id: 'ORD-002',
    date: '2024-01-18',
    status: 'shipped',
    total: 12000000,
    items: [
      {
        id: '2',
        name: 'Smartphone Galaxy Pro',
        quantity: 1,
        price: 12000000,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&h=100&fit=crop'
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      address: 'Jl. Sudirman No. 123',
      city: 'Jakarta',
      postalCode: '12345'
    },
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'ORD-003',
    date: '2024-01-25',
    status: 'processing',
    total: 2950000,
    items: [
      {
        id: '6',
        name: 'Running Shoes',
        quantity: 1,
        price: 1200000,
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop'
      },
      {
        id: '9',
        name: 'Fitness Tracker Watch',
        quantity: 1,
        price: 1800000,
        image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=100&h=100&fit=crop'
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      address: 'Jl. Sudirman No. 123',
      city: 'Jakarta',
      postalCode: '12345'
    }
  }
];

export const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return <Badge variant="default" className="bg-yellow-500">Processing</Badge>;
      case 'shipped':
        return <Badge variant="default" className="bg-blue-500">Shipped</Badge>;
      case 'delivered':
        return <Badge variant="default" className="bg-green-500">Delivered</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <ArchiveBoxIcon className="h-5 w-5 text-yellow-500" />;
      case 'shipped':
        return <TruckIcon className="h-5 w-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      default:
        return <CalendarIcon className="h-5 w-5" />;
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Order History</h1>
        <p className="text-muted-foreground">
          Track and manage your orders
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {mockOrders.map((order) => (
            <Card key={order.id} className="w-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <CardDescription className="flex items-center space-x-4 mt-1">
                      <span className="flex items-center space-x-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{formatDate(order.date)}</span>
                      </span>
                      <span>{order.items.length} items</span>
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(order.status)}
                    <div className="text-lg font-bold mt-1">
                      {formatPrice(order.total)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Order Items */}
                  <div className="grid gap-3">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity} × {formatPrice(item.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Info */}
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Shipping Address</h4>
                    <p className="text-sm text-muted-foreground">
                      {order.shippingAddress.name}<br />
                      {order.shippingAddress.address}<br />
                      {order.shippingAddress.city} {order.shippingAddress.postalCode}
                    </p>
                  </div>

                  {/* Tracking Number */}
                  {order.trackingNumber && (
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">Tracking Information</h4>
                      <p className="text-sm font-mono bg-muted p-2 rounded">
                        {order.trackingNumber}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="border-t pt-4 flex space-x-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {order.status === 'delivered' && (
                      <Button variant="outline" size="sm">
                        Reorder
                      </Button>
                    )}
                    {order.status === 'shipped' && (
                      <Button variant="outline" size="sm">
                        Track Package
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Filtered tabs */}
        {['processing', 'shipped', 'delivered'].map((status) => (
          <TabsContent key={status} value={status} className="space-y-6">
            {mockOrders
              .filter((order) => order.status === status)
              .map((order) => (
                <Card key={order.id} className="w-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                        <CardDescription className="flex items-center space-x-4 mt-1">
                          <span className="flex items-center space-x-2">
                            <CalendarIcon className="h-4 w-4" />
                            <span>{formatDate(order.date)}</span>
                          </span>
                          <span>{order.items.length} items</span>
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(order.status)}
                        <div className="text-lg font-bold mt-1">
                          {formatPrice(order.total)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center space-x-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                Qty: {item.quantity} × {formatPrice(item.price)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};