import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, Crosshair, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About INSTHINK.APPAREL</title>
        <meta name="description" content="Discover the bold philosophy and modern origins behind INSTHINK.APPAREL." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-muted overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1600&q=80" 
            alt="Modern urban fashion context" 
            className="w-full h-full object-cover grayscale opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 uppercase tracking-tighter">
              About Us
            </h1>
            <p className="text-xl md:text-2xl text-foreground font-medium max-w-2xl mx-auto">
              Challenging the conventions of modern streetwear.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/5] overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1617326261545-21226018ba2a?w=800&q=80"
                alt="Bold apparel design"
                className="w-full h-full object-cover grayscale contrast-125"
              />
              <div className="absolute inset-0 border-4 border-primary m-4 mix-blend-overlay" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <h2 className="text-sm font-black uppercase tracking-widest text-primary mb-4">The Origin</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold mb-6 uppercase tracking-tight">Born from disruption.</h3>
              <div className="space-y-6 text-lg text-muted-foreground font-medium leading-relaxed">
                <p>
                  INSTHINK.APPAREL was established with a singular vision: to create clothing that refuses to blend in. We observed a landscape saturated with generic aesthetics and decided to chart a different course.
                </p>
                <p>
                  Our design philosophy is rooted in bold contrasts, technical precision, and modern utility. We don't just follow trends; we engineer garments that set the pace for contemporary street culture.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 bg-muted border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1 max-w-xl"
            >
              <h2 className="text-sm font-black uppercase tracking-widest text-primary mb-4">Our Ethos</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold mb-8 uppercase tracking-tight">Uncompromising standards.</h3>
              
              <div className="space-y-10">
                <div className="flex gap-5">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-14 h-14 bg-background border-2 border-primary flex items-center justify-center">
                      <Crosshair className="w-7 h-7 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold uppercase tracking-wide mb-2">Laser Focus</h4>
                    <p className="text-muted-foreground font-medium leading-relaxed">Every collection is tightly curated. We eliminate the noise to focus on impactful silhouettes, superior materials, and flawless execution.</p>
                  </div>
                </div>
                
                <div className="flex gap-5">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-14 h-14 bg-background border-2 border-primary flex items-center justify-center">
                      <ShieldAlert className="w-7 h-7 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold uppercase tracking-wide mb-2">Bold Expression</h4>
                    <p className="text-muted-foreground font-medium leading-relaxed">We design for those who lead, not those who follow. Our apparel is armor for the modern era, built to project confidence and strength.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="order-1 md:order-2 relative aspect-[4/5] overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80"
                alt="Technical apparel details"
                className="w-full h-full object-cover grayscale"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background text-foreground border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold mb-6 uppercase tracking-tighter"
          >
            Make your statement.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl mb-10 font-medium text-muted-foreground max-w-2xl mx-auto"
          >
            Explore the latest drops and elevate your wardrobe with INSTHINK.APPAREL.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button asChild size="lg" className="h-14 px-10 font-bold uppercase tracking-wide rounded-none">
              <Link to="/shop">
                Enter the Shop
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;