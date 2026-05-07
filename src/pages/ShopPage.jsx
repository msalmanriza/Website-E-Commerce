import React from 'react';
import { Helmet } from 'react-helmet';
import ProductsList from '@/components/ProductsList';

const ShopPage = () => {
  return (
    <>
      <Helmet>
        <title>Shop INSTHINK.APPAREL Collection</title>
        <meta name="description" content="Browse the latest drops from INSTHINK.APPAREL. Bold streetwear and modern contemporary designs." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-16 border-b border-border pb-8">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 uppercase tracking-tighter">
            The Collection
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl font-medium">
            Explore our curated selection of high-performance, modern apparel. Built for impact.
          </p>
        </div>
        <ProductsList />
      </div>
    </>
  );
};

export default ShopPage;