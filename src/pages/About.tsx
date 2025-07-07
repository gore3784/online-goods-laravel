import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HeartIcon, ShieldCheckIcon, TruckIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export const About = () => {
  return (
    <div className="container py-8">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">About ECommerce</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Your trusted online shopping destination, bringing quality products and exceptional service 
          to customers across Indonesia since 2020.
        </p>
      </div>

      {/* Company Story */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">Our Story</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <p className="text-muted-foreground mb-4">
            Founded in 2020, ECommerce started as a small online marketplace with a simple mission: 
            to make quality products accessible to everyone across Indonesia. What began as a team of 
            passionate entrepreneurs has grown into one of the country's most trusted e-commerce platforms.
          </p>
          <p className="text-muted-foreground mb-4">
            We believe that shopping online should be easy, secure, and enjoyable. That's why we've 
            built our platform with cutting-edge technology and a customer-first approach that puts 
            your satisfaction at the heart of everything we do.
          </p>
          <p className="text-muted-foreground">
            Today, we serve thousands of customers nationwide, offering everything from electronics 
            and fashion to home goods and books. Our commitment to quality, competitive pricing, 
            and exceptional customer service has made us a preferred choice for online shoppers.
          </p>
        </CardContent>
      </Card>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <HeartIcon className="h-6 w-6 text-primary" />
              <span>Our Mission</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To provide an exceptional online shopping experience by offering high-quality products, 
              competitive prices, and outstanding customer service that exceeds expectations.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShieldCheckIcon className="h-6 w-6 text-primary" />
              <span>Our Vision</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To become Indonesia's most trusted and innovative e-commerce platform, connecting 
              people with the products they love while building lasting relationships with our community.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Core Values */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">Our Core Values</CardTitle>
          <CardDescription>
            The principles that guide everything we do
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Trust & Security</h3>
              <p className="text-sm text-muted-foreground">
                We protect your personal information and ensure secure transactions.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Customer First</h3>
              <p className="text-sm text-muted-foreground">
                Your satisfaction is our priority in every interaction.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TruckIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Quality Service</h3>
              <p className="text-sm text-muted-foreground">
                We deliver exceptional service from browsing to delivery.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Community</h3>
              <p className="text-sm text-muted-foreground">
                We build strong relationships with customers and partners.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">Our Impact</CardTitle>
          <CardDescription>
            Numbers that reflect our commitment to excellence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <p className="text-sm text-muted-foreground">Products Available</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100+</div>
              <p className="text-sm text-muted-foreground">Cities Served</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">99.5%</div>
              <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Section */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">Leadership Team</CardTitle>
          <CardDescription>
            Meet the people behind ECommerce
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/70 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                AS
              </div>
              <h3 className="font-semibold">Ahmad Suharto</h3>
              <p className="text-sm text-primary mb-2">Chief Executive Officer</p>
              <p className="text-sm text-muted-foreground">
                15+ years experience in e-commerce and technology leadership.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/70 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                DP
              </div>
              <h3 className="font-semibold">Dewi Pratiwi</h3>
              <p className="text-sm text-primary mb-2">Chief Technology Officer</p>
              <p className="text-sm text-muted-foreground">
                Expert in building scalable platforms and user experience design.
              </p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/70 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                BI
              </div>
              <h3 className="font-semibold">Budi Irawan</h3>
              <p className="text-sm text-primary mb-2">Chief Operating Officer</p>
              <p className="text-sm text-muted-foreground">
                Specialist in operations, logistics, and customer service excellence.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Awards & Recognition */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">Awards & Recognition</CardTitle>
          <CardDescription>
            Acknowledgments of our commitment to excellence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <Badge variant="default" className="bg-yellow-500">2023</Badge>
              <div>
                <h4 className="font-semibold">Best E-commerce Platform</h4>
                <p className="text-sm text-muted-foreground">Indonesia Digital Awards</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="default" className="bg-blue-500">2023</Badge>
              <div>
                <h4 className="font-semibold">Customer Service Excellence</h4>
                <p className="text-sm text-muted-foreground">National Customer Service Awards</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="default" className="bg-green-500">2022</Badge>
              <div>
                <h4 className="font-semibold">Top 10 Fastest Growing Startup</h4>
                <p className="text-sm text-muted-foreground">TechInAsia Awards</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="default" className="bg-purple-500">2022</Badge>
              <div>
                <h4 className="font-semibold">Innovation in Technology</h4>
                <p className="text-sm text-muted-foreground">Indonesian Startup Awards</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact CTA */}
      <Card className="text-center">
        <CardContent className="py-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Shop with Us?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of satisfied customers and experience the difference of shopping with ECommerce.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/products">Start Shopping</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};