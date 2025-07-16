import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Eye, Search, Filter } from 'lucide-react';
import { Order, OrderItem } from '@/types';

// Mock orders data
const mockOrders: Order[] = [
  {
    id: '1001',
    user_id: '1',
    total_amount: 2500000,
    status: 'delivered',
    created_at: '2024-01-15T10:30:00Z',
    shipping_address: {
      full_name: 'John Doe',
      phone: '081234567890',
      address: 'Jl. Sudirman No. 123',
      city: 'Jakarta',
      postal_code: '12345',
      province: 'DKI Jakarta'
    },
    order_items: [
      {
        id: '1',
        order_id: '1001',
        product_id: '1',
        product: {
          id: '1',
          name: 'Wireless Bluetooth Headphones',
          description: 'Premium headphones',
          price: 2500000,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=300&fit=crop',
          category_id: '1',
          stock: 15,
          slug: 'wireless-bluetooth-headphones'
        },
        quantity: 1,
        price: 2500000
      }
    ]
  },
  {
    id: '1002',
    user_id: '2',
    total_amount: 1200000,
    status: 'processing',
    created_at: '2024-01-16T14:20:00Z',
    shipping_address: {
      full_name: 'Jane Smith',
      phone: '081234567891',
      address: 'Jl. Thamrin No. 456',
      city: 'Jakarta',
      postal_code: '12346',
      province: 'DKI Jakarta'
    },
    order_items: [
      {
        id: '2',
        order_id: '1002',
        product_id: '6',
        product: {
          id: '6',
          name: 'Running Shoes',
          description: 'Professional running shoes',
          price: 1200000,
          image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=300&fit=crop',
          category_id: '4',
          stock: 18,
          slug: 'running-shoes'
        },
        quantity: 1,
        price: 1200000
      }
    ]
  },
  {
    id: '1003',
    user_id: '3',
    total_amount: 3200000,
    status: 'shipped',
    created_at: '2024-01-17T09:15:00Z',
    shipping_address: {
      full_name: 'Bob Johnson',
      phone: '081234567892',
      address: 'Jl. Gatot Subroto No. 789',
      city: 'Bandung',
      postal_code: '40123',
      province: 'Jawa Barat'
    },
    order_items: [
      {
        id: '3',
        order_id: '1003',
        product_id: '7',
        product: {
          id: '7',
          name: 'Coffee Table',
          description: 'Modern wooden coffee table',
          price: 2200000,
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=300&fit=crop',
          category_id: '3',
          stock: 6,
          slug: 'coffee-table'
        },
        quantity: 1,
        price: 2200000
      },
      {
        id: '4',
        order_id: '1003',
        product_id: '4',
        product: {
          id: '4',
          name: 'Casual Cotton T-Shirt',
          description: 'Comfortable cotton t-shirt',
          price: 150000,
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=300&fit=crop',
          category_id: '2',
          stock: 25,
          slug: 'casual-cotton-tshirt'
        },
        quantity: 7,
        price: 1050000
      }
    ]
  }
];

export const AdminOrders = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shipping_address.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      pending: { variant: 'secondary' as const, label: 'Pending' },
      processing: { variant: 'default' as const, label: 'Processing' },
      shipped: { variant: 'outline' as const, label: 'Shipped' },
      delivered: { variant: 'default' as const, label: 'Delivered' },
      cancelled: { variant: 'destructive' as const, label: 'Cancelled' }
    };

    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">Manage customer orders</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order List</CardTitle>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <code className="font-mono">#{order.id}</code>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.shipping_address.full_name}</p>
                      <p className="text-sm text-muted-foreground">{order.shipping_address.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(order.created_at)}</TableCell>
                  <TableCell>{formatPrice(order.total_amount)}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value) => handleStatusChange(order.id, value as Order['status'])}
                    >
                      <SelectTrigger className="w-[120px]">
                        {getStatusBadge(order.status)}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewOrder(order)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Order Details - #{selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p><strong>Name:</strong> {selectedOrder.shipping_address.full_name}</p>
                    <p><strong>Phone:</strong> {selectedOrder.shipping_address.phone}</p>
                    <p><strong>Address:</strong> {selectedOrder.shipping_address.address}</p>
                    <p><strong>City:</strong> {selectedOrder.shipping_address.city}</p>
                    <p><strong>Province:</strong> {selectedOrder.shipping_address.province}</p>
                    <p><strong>Postal Code:</strong> {selectedOrder.shipping_address.postal_code}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Order Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p><strong>Order ID:</strong> #{selectedOrder.id}</p>
                    <p><strong>Date:</strong> {formatDate(selectedOrder.created_at)}</p>
                    <p><strong>Status:</strong> {getStatusBadge(selectedOrder.status)}</p>
                    <p><strong>Total:</strong> {formatPrice(selectedOrder.total_amount)}</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.order_items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <img 
                                src={item.product.image} 
                                alt={item.product.name}
                                className="w-12 h-12 object-cover rounded-md"
                              />
                              <div>
                                <p className="font-medium">{item.product.name}</p>
                                <p className="text-sm text-muted-foreground">{item.product.description}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{formatPrice(item.product.price)}</TableCell>
                          <TableCell>{formatPrice(item.price)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};