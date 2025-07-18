import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarIcon, TruckIcon, MapPinIcon, CubeIcon } from '@heroicons/react/24/outline';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  postalCode: string;
}

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  trackingNumber?: string;
}

interface OrderDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order | null;
  type: 'details' | 'tracking';
}

export const OrderDetailsModal = ({ 
  open, 
  onOpenChange, 
  order,
  type 
}: OrderDetailsModalProps) => {
  if (!order) return null;

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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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

  const trackingSteps = [
    {
      title: 'Order Confirmed',
      description: 'Your order has been confirmed and is being prepared',
      date: order.date,
      completed: true
    },
    {
      title: 'Processing',
      description: 'Your order is being processed and packed',
      date: '2024-01-19',
      completed: order.status !== 'processing'
    },
    {
      title: 'Shipped',
      description: 'Your order has been shipped and is on the way',
      date: '2024-01-20',
      completed: order.status === 'delivered' || order.status === 'shipped'
    },
    {
      title: 'Delivered',
      description: 'Your order has been delivered successfully',
      date: order.status === 'delivered' ? '2024-01-22' : '',
      completed: order.status === 'delivered'
    }
  ];

  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 50000; // Mock shipping cost
  const tax = subtotal * 0.1; // 10% tax

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>
            {type === 'details' ? `Order Details - ${order.id}` : `Track Package - ${order.id}`}
          </DialogTitle>
        </DialogHeader>
        
        <div className="overflow-y-auto flex-1 space-y-6">
          {/* Order Status */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Order Status</h3>
              <p className="text-sm text-muted-foreground">
                Placed on {formatDate(order.date)}
              </p>
            </div>
            {getStatusBadge(order.status)}
          </div>

          {type === 'tracking' && (
            <>
              {/* Tracking Number */}
              {order.trackingNumber && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <CubeIcon className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-medium">Tracking Number</h4>
                        <p className="text-sm font-mono bg-muted p-2 rounded mt-1">
                          {order.trackingNumber}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Tracking Timeline */}
              <div>
                <h3 className="font-semibold mb-4">Package Timeline</h3>
                <div className="space-y-4">
                  {trackingSteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        step.completed ? 'bg-primary' : 'bg-muted'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium ${
                            step.completed ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {step.title}
                          </h4>
                          {step.date && (
                            <span className="text-sm text-muted-foreground">
                              {formatDate(step.date)}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {type === 'details' && (
            <>
              {/* Order Items */}
              <div>
                <h3 className="font-semibold mb-4">Order Items</h3>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatPrice(item.price)}</p>
                        <p className="text-sm text-muted-foreground">
                          Total: {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <Card>
                <CardContent className="p-4 space-y-3">
                  <h3 className="font-semibold">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{formatPrice(shipping)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium text-base">
                      <span>Total</span>
                      <span>{formatPrice(order.total)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Shipping Address */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <MapPinIcon className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Shipping Address</h4>
                  <div className="text-sm text-muted-foreground">
                    <p>{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p>{order.shippingAddress.city} {order.shippingAddress.postalCode}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          {type === 'details' && order.status === 'delivered' && (
            <Button>
              Reorder
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};