import React, { useState } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import ShoppingCart from './components/ShoppingCart';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import SuccessPage from './pages/SuccessPage';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header setIsCartOpen={setIsCartOpen} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/about" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"><h1 className="text-4xl font-bold">About page coming soon</h1></div>} />
            <Route path="/contact" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"><h1 className="text-4xl font-bold">Contact page coming soon</h1></div>} />
            <Route path="/privacy" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"><h1 className="text-4xl font-bold">Privacy Policy</h1></div>} />
            <Route path="/terms" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"><h1 className="text-4xl font-bold">Terms of Service</h1></div>} />
            <Route path="*" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"><h1 className="text-4xl font-bold mb-4">Page not found</h1><p className="text-muted-foreground mb-8">The page you're looking for doesn't exist.</p><a href="/" className="text-primary hover:underline">Return home</a></div>} />
          </Routes>
        </main>
        <Footer />
        <ShoppingCart isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;