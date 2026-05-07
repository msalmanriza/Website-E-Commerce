import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast({
        title: 'Subscribed',
        description: 'Welcome to the INSTHINK.APPAREL crew.',
      });
      setEmail('');
    }
  };

  const features = [
    {
      icon: Zap,
      title: 'Modern aesthetics',
      description: 'Bold, contemporary designs that make a statement. Unapologetic styling for the modern era.',
    },
    {
      icon: Target,
      title: 'Precision crafted',
      description: 'Every stitch, every seam, engineered with absolute precision using premium technical fabrics.',
    },
    {
      icon: Shield,
      title: 'Built to endure',
      description: 'High-performance apparel designed to withstand the demands of your everyday grind.',
    },
  ];

  const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1695694455290-5d375698e89e', alt: 'Detailed fabric texture' },
    { src: 'https://images.unsplash.com/photo-1678088342576-dfbaabf4e18b', alt: 'Model wearing apparel' },
    { src: 'https://images.unsplash.com/photo-1687405181991-ac537513efdc', alt: 'Close up of stitching' },
    { src: 'https://images.unsplash.com/photo-1687226426034-809fb505652f', alt: 'Contemporary fashion styling' },
  ];

  return (
    <>
      <Helmet>
        <title>INSTHINK.APPAREL - Modern Apparel Collection</title>
        <meta name="description" content="Bold, contemporary fashion for the modern era. Discover the new collection from INSTHINK.APPAREL." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-background border-b border-border overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-none tracking-tighter uppercase">
                INSTHINK.<br/><span className="text-primary">APPAREL</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg font-medium">
                Redefining modern streetwear. Premium quality, bold silhouettes, and unapologetic design.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="font-bold uppercase tracking-wide h-14 px-8 rounded-none">
                  <Link to="/shop">
                    Shop Collection
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="font-bold uppercase tracking-wide h-14 px-8 rounded-none border-2 hover:bg-muted">
                  <Link to="/about">Our Story</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-[4/5] md:aspect-auto md:h-[650px] overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1523398002811-999aa8b95841?w=800&q=80"
                alt="Urban fashion styling"
                className="w-full h-full object-cover grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-primary mix-blend-multiply opacity-20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 uppercase tracking-tight">
              Defy Expectations
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
              We engineer garments that break the mold of conventional fashion.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card text-card-foreground p-8 shadow-sm border border-border group hover:border-primary transition-colors duration-300"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wide mb-3">{feature.title}</h3>
                <p className="text-muted-foreground font-medium leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Crafted with Intention (Product Photography Grid) */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight uppercase tracking-tight">
                Engineered for the bold
              </h2>
              <div className="w-16 h-2 bg-primary mb-8"></div>
              <p className="text-lg text-muted-foreground mb-6 font-medium leading-relaxed">
                INSTHINK.APPAREL was born from a desire to disrupt the status quo. We combine avant-garde silhouettes with premium materials to create garments that stand out in any environment.
              </p>
              <p className="text-lg text-muted-foreground mb-8 font-medium leading-relaxed">
                Every piece is a statement. Notice the sharp lines, the bold accents, and the uncompromising attention to detail. This isn't just clothing; it's an attitude.
              </p>
              <Button asChild variant="outline" size="lg" className="h-14 font-bold uppercase tracking-wide rounded-none border-2">
                <Link to="/about">Explore our ethos</Link>
              </Button>
            </motion.div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              {galleryImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative overflow-hidden bg-muted ${
                    idx === 1 || idx === 2 ? 'aspect-[4/5]' : 'aspect-square'
                  }`}
                >
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 ease-out"
                  />
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-muted border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 uppercase tracking-tight">
              Join the movement
            </h2>
            <p className="text-lg mb-10 text-muted-foreground font-medium">
              Get exclusive access to limited drops, early releases, and insider content.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto shadow-sm">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background text-foreground border-2 border-r-0 border-border h-14 text-base rounded-none focus-visible:ring-0 focus-visible:border-primary"
              />
              <Button type="submit" size="lg" className="h-14 px-8 font-bold uppercase tracking-wide whitespace-nowrap rounded-none">
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;