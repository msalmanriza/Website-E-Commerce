import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { MapPin, Mail, Phone, MessageCircle, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const existingMessages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
      const newMessage = { ...formData, timestamp: new Date().toISOString() };
      localStorage.setItem('contact_messages', JSON.stringify([...existingMessages, newMessage]));
      
      toast({
        title: 'Message Sent',
        description: 'We have received your inquiry. The team will get back to you shortly.',
      });
      
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Contact INSTHINK.APPAREL</title>
        <meta name="description" content="Get in touch with INSTHINK.APPAREL for inquiries, orders, or collaborations." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-muted py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 uppercase tracking-tighter" 
          >
            Contact Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium"
          >
            Inquiries, support, or collaborations. Drop us a line.
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Info & Socials */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-16"
            >
              <div>
                <h2 className="text-3xl font-extrabold mb-8 uppercase tracking-tight">HQ Info</h2>
                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <div className="bg-muted p-4 border border-border mt-1">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 uppercase tracking-wide">Studio</h3>
                      <p className="text-muted-foreground font-medium">100 Industrial Ave<br/>Sector 4, Metro Area<br/>ZIP 90210</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-5">
                    <div className="bg-muted p-4 border border-border mt-1">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 uppercase tracking-wide">Email</h3>
                      <p className="text-muted-foreground font-medium">hello@insthinkapparel.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="bg-muted p-4 border border-border mt-1">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 uppercase tracking-wide">Phone</h3>
                      <p className="text-muted-foreground font-medium">+1 (555) 019-2834</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-extrabold mb-8 uppercase tracking-tight">Connect</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild variant="outline" className="h-14 px-8 justify-start font-bold uppercase tracking-wide border-2 hover:border-primary hover:text-primary rounded-none">
                    <a href="https://wa.me/15550192834" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-5 h-5 mr-3" />
                      WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="h-14 px-8 justify-start font-bold uppercase tracking-wide border-2 hover:border-primary hover:text-primary rounded-none">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                      <Instagram className="w-5 h-5 mr-3" />
                      Instagram
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-muted p-10 border border-border">
                <h2 className="text-3xl font-extrabold mb-8 uppercase tracking-tight">Direct Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold uppercase tracking-wide">Full Name</label>
                    <Input 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name" 
                      required 
                      className="bg-background border-2 border-border focus-visible:border-primary rounded-none h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold uppercase tracking-wide">Email Address</label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com" 
                      required 
                      className="bg-background border-2 border-border focus-visible:border-primary rounded-none h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold uppercase tracking-wide">Message</label>
                    <Textarea 
                      id="message" 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help?" 
                      rows={6} 
                      required 
                      className="bg-background border-2 border-border focus-visible:border-primary rounded-none resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-14 text-base font-bold uppercase tracking-wide rounded-none mt-4" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Transmitting...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;