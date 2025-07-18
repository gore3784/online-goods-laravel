import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, ShoppingCartIcon, HeartIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useStore } from '@/store/useStore';
import { Badge } from '@/components/ui/badge';
import { LogOutIcon, Settings } from 'lucide-react';
import { LoginModal } from '@/components/auth/LoginModal';
import { RegisterModal } from '@/components/auth/RegisterModal';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const navigate = useNavigate();

  const {
    searchQuery,
    setSearchQuery,
    getCartItemsCount,
    user,
    wishlistItems
  } = useStore();

  const cartItemsCount = getCartItemsCount();
  const wishlistCount = wishlistItems.length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    // Clear user data (e.g., from localStorage)
    localStorage.removeItem('userToken'); // Or whatever you use for authentication
    // Redirect to login page or home
    navigate('/login');
  };

  const handleSwitchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">E</span>
          </div>
          <span className="font-bold text-xl">Hinggi.id</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/products" className="text-foreground hover:text-primary transition-colors">
            Products
          </Link>
          <Link to="/categories" className="text-foreground hover:text-primary transition-colors">
            Categories
          </Link>
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2 flex-1 max-w-md mx-4">
          <div className="relative flex-1">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <Button type="submit" size="sm">
            Search
          </Button>
        </form>

        {/* User Actions */}
        <div className="flex items-center space-x-2">
          {/* Wishlist */}
          <Button variant="ghost" size="sm" asChild className="relative">
            <Link to="/wishlist">
              <HeartIcon className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs">
                  {wishlistCount}
                </Badge>
              )}
            </Link>
          </Button>

          {/* Cart */}
          <Button variant="ghost" size="sm" asChild className="relative">
            <Link to="/cart">
              <ShoppingCartIcon className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </Badge>
              )}
            </Link>
          </Button>

          {/* User Menu */}
          {/* {user ? (
            <Button variant="ghost" size="sm" asChild>
              <Link to="/profile">
                <UserIcon className="h-5 w-5" />
                <span className="ml-2 hidden sm:inline">Profile</span>
              </Link>
            </Button>
          ) : (
            <Button variant="default" size="sm" asChild>
              <Link to="/login">Login</Link>
            </Button>
          )} */}

          {/* User Menu */}
          {user ? (
            <> {/* Use a fragment to group multiple elements */}
              <Button variant="ghost" size="sm" asChild>
                <Link to="/profile">
                  <UserIcon className="h-5 w-5" />
                  <span className="ml-2 hidden sm:inline">Profile</span>
                </Link>
               </Button>
               {/* Admin Link - Only show for logged in users */}
               <Button variant="ghost" size="sm" asChild>
                 <Link to="/admin">
                   <Settings className="h-4 w-4" />
                   <span className="ml-2 hidden sm:inline">Admin</span>
                 </Link>
               </Button>
               {/* Logout Button */}
               <Button variant="ghost" size="sm" onClick={handleLogout} className="ml-2">
                <LogOutIcon className="h-5 w-5" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
           ) : (
             <div className="flex items-center space-x-2">
               <Button 
                 variant="ghost" 
                 size="sm" 
                 onClick={() => setShowLoginModal(true)}
               >
                 Login
               </Button>
               <Button 
                 variant="default" 
                 size="sm" 
                 onClick={() => setShowRegisterModal(true)}
               >
                 Sign Up
               </Button>
             </div>
           )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-5 w-5" />
            ) : (
              <Bars3Icon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <Button type="submit" size="sm">
                Search
              </Button>
            </form>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
               <Link
                 to="/categories"
                 className="text-foreground hover:text-primary transition-colors py-2"
                 onClick={() => setIsMobileMenuOpen(false)}
               >
                 Categories
               </Link>
               {user && (
                 <Link
                   to="/admin"
                   className="text-foreground hover:text-primary transition-colors py-2"
                   onClick={() => setIsMobileMenuOpen(false)}
                 >
                   Admin Panel
                 </Link>
               )}
            </nav>
          </div>
        </div>
      )}
      
      <LoginModal 
        open={showLoginModal} 
        onOpenChange={setShowLoginModal}
        onSwitchToRegister={handleSwitchToRegister}
      />
      
      <RegisterModal 
        open={showRegisterModal} 
        onOpenChange={setShowRegisterModal}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </header>
  );
};