import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const SuccessPage = () => {
  const orderNumber = `INS-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <Helmet>
        <title>Order Secured - INSTHINK.APPAREL</title>
        <meta name="description" content="Your order with INSTHINK.APPAREL has been confirmed." />
      </Helmet>
      <div className="min-h-[80vh] flex items-center justify-center bg-background py-20">
        <div className="max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 border-2 border-primary mb-8 rounded-none">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 uppercase tracking-tighter">
              Order Secured
            </h1>
            <p className="text-lg text-muted-foreground mb-10 font-medium">
              Transaction complete. Your INSTHINK.APPAREL gear is entering the fulfillment queue.
            </p>

            <div className="bg-muted p-8 mb-10 text-left border border-border">
              <div className="flex items-start gap-5 mb-6">
                <Package className="h-7 w-7 text-primary mt-1" />
                <div>
                  <p className="font-bold uppercase tracking-wide mb-1 text-sm text-muted-foreground">Order ID</p>
                  <p className="text-2xl font-extrabold font-variant-numeric: tabular-nums">{orderNumber}</p>
                </div>
              </div>
              <div className="border-t-2 border-border pt-6">
                <p className="font-bold uppercase tracking-wide mb-1 text-sm text-muted-foreground">Estimated Drop</p>
                <p className="text-xl font-bold">{estimatedDelivery}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="font-bold uppercase tracking-wide h-14 px-8 rounded-none">
                <Link to="/shop">
                  Continue Browsing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-bold uppercase tracking-wide h-14 px-8 rounded-none border-2">
                <Link to="/">Return to Base</Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-10 font-medium">
              Confirmation intel has been dispatched to your email address.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;