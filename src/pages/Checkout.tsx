import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useStore } from '@/store/useStore';
import { ShippingAddress } from '@/types';
import { toast } from 'sonner';
import { CreditCard, Building, Truck } from 'lucide-react';
import { PaymentMethodModal } from '@/components/payment/PaymentMethodModal';

export const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useStore();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    full_name: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
    province: ''
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleInputChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getPaymentMethodName = () => {
    const paymentNames: Record<string, string> = {
      'bank_bca': 'Bank BCA',
      'bank_mandiri': 'Bank Mandiri',
      'bank_bri': 'Bank BRI',
      'bank_bni': 'Bank BNI',
      'gopay': 'GoPay',
      'ovo': 'OVO',
      'dana': 'DANA',
      'shopeepay': 'ShopeePay',
      'linkaja': 'LinkAja',
      'va_bca': 'Virtual Account BCA',
      'va_mandiri': 'Virtual Account Mandiri',
      'va_bri': 'Virtual Account BRI',
      'credit_card': 'Kartu Kredit',
      'cod': 'Bayar di Tempat (COD)'
    };
    return paymentNames[paymentMethod] || 'Pilih metode pembayaran';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate payment method
    if (!paymentMethod) {
      toast.error('Silakan pilih metode pembayaran');
      return;
    }
    
    // Validate form
    const requiredFields: (keyof ShippingAddress)[] = [
      'full_name', 'phone', 'address', 'city', 'postal_code', 'province'
    ];
    
    for (const field of requiredFields) {
      if (!shippingAddress[field].trim()) {
        toast.error(`Please fill in ${field.replace('_', ' ')}`);
        return;
      }
    }

    setLoading(true);
    
    try {
      // Simulate API call to create order
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create order object
      const order = {
        id: `order-${Date.now()}`,
        user_id: 'guest',
        total_amount: grandTotal,
        status: 'pending' as const,
        shipping_address: shippingAddress,
        created_at: new Date().toISOString(),
        order_items: cartItems.map(item => ({
          id: `item-${item.id}`,
          order_id: `order-${Date.now()}`,
          product_id: item.product.id,
          product: item.product,
          quantity: item.quantity,
          price: item.product.price
        }))
      };

      // Clear cart after successful order
      clearCart();
      
      toast.success('Order placed successfully!');
      navigate('/orders');
      
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">No Items to Checkout</h1>
          <p className="text-muted-foreground mb-8">
            Your cart is empty. Add some items to proceed with checkout.
          </p>
          <Button asChild size="lg">
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = 50000;
  const grandTotal = subtotal + shipping;

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input
                      id="full_name"
                      value={shippingAddress.full_name}
                      onChange={(e) => handleInputChange('full_name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={shippingAddress.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    value={shippingAddress.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={shippingAddress.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="postal_code">Postal Code *</Label>
                    <Input
                      id="postal_code"
                      value={shippingAddress.postal_code}
                      onChange={(e) => handleInputChange('postal_code', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="province">Province *</Label>
                    <Input
                      id="province"
                      value={shippingAddress.province}
                      onChange={(e) => handleInputChange('province', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Metode Pembayaran</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-accent/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{getPaymentMethodName()}</p>
                        {paymentMethod && (
                          <p className="text-sm text-muted-foreground">
                            Metode pembayaran yang dipilih
                          </p>
                        )}
                      </div>
                      <Button 
                        type="button"
                        variant="outline" 
                        onClick={() => setIsPaymentModalOpen(true)}
                      >
                        {paymentMethod ? 'Ubah' : 'Pilih'}
                      </Button>
                    </div>
                  </div>
                  
                  {!paymentMethod && (
                    <p className="text-sm text-destructive">
                      * Silakan pilih metode pembayaran untuk melanjutkan
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="truncate mr-2">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span>{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
      
      {/* Payment Method Modal */}
      <PaymentMethodModal
        open={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        selectedMethod={paymentMethod}
        onMethodSelect={setPaymentMethod}
        onConfirm={() => {}}
      />
    </div>
  );
};