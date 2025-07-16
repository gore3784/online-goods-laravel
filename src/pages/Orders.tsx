import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import {
  CalendarIcon,
  ArchiveBoxIcon,
  TruckIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

type OrderItem = {
  id: string;
  product: {
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
};

type Order = {
  id: string;
  total_amount: number;
  status: string;
  created_at: string;
  tracking_number?: string;
  shipping_address: {
    full_name: string;
    address: string;
    city: string;
    postal_code: string;
    province: string;
    phone: string;
  };
  order_items: OrderItem[];
};

export const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token') || '';

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error('Failed to fetch orders');
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processing':
        return <Badge className="bg-yellow-500">Processing</Badge>;
      case 'shipped':
        return <Badge className="bg-blue-500">Shipped</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500">Delivered</Badge>;
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

  const statuses = ['all', 'processing', 'shipped', 'delivered'];

  const filteredOrders = (status: string) =>
    status === 'all'
      ? orders
      : orders.filter((order) => order.status === status);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Order History</h1>
        <p className="text-muted-foreground">Track and manage your orders</p>
      </div>

      {loading ? (
        <p className="text-center text-sm text-muted-foreground">
          Loading orders...
        </p>
      ) : (
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {statuses.map((s) => (
              <TabsTrigger key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          {statuses.map((status) => (
            <TabsContent key={status} value={status} className="space-y-6">
              {filteredOrders(status).map((order) => (
                <Card key={order.id} className="w-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          Order #{order.id.slice(0, 8)}
                        </CardTitle>
                        <CardDescription className="flex items-center space-x-4 mt-1">
                          <span className="flex items-center space-x-2">
                            <CalendarIcon className="h-4 w-4" />
                            <span>{formatDate(order.created_at)}</span>
                          </span>
                          <span>{order.order_items.length} items</span>
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(order.status)}
                        <div className="text-lg font-bold mt-1">
                          {formatPrice(order.total_amount)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Items */}
                    <div className="grid gap-3">
                      {order.order_items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-4"
                        >
                          <img
                            src={`http://localhost:8000/storage/${item.product.image}`}
                            alt={item.product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">
                              {item.product.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity} ×{' '}
                              {formatPrice(item.product.price)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shipping */}
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">Shipping Address</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {order.shipping_address.full_name}
                        <br />
                        {order.shipping_address.address}, {order.shipping_address.city},{' '}
                        {order.shipping_address.province} {order.shipping_address.postal_code}
                        <br />
                        {order.shipping_address.phone}
                      </p>
                    </div>

                    {/* Tracking */}
                    {order.tracking_number && (
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-2">Tracking Number</h4>
                        <p className="text-sm font-mono bg-muted p-2 rounded">
                          {order.tracking_number}
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
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};
