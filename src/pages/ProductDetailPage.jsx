import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProduct, getProductQuantities } from '@/api/EcommerceApi';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Loader2, ArrowLeft, CheckCircle, Minus, Plus, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRjNGNEY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K";

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = useCallback(async () => {
    if (product && selectedVariant) {
      const availableQuantity = selectedVariant.inventory_quantity;
      try {
        await addToCart(product, selectedVariant, quantity, availableQuantity);
        toast({
          title: "Added to Cart",
          description: `${quantity} x ${product.title} (${selectedVariant.title}) secured.`,
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Action Failed",
          description: error.message,
        });
      }
    }
  }, [product, selectedVariant, quantity, addToCart, toast]);

  const handleQuantityChange = useCallback((amount) => {
    setQuantity(prevQuantity => {
        const newQuantity = prevQuantity + amount;
        if (newQuantity < 1) return 1;
        return newQuantity;
    });
  }, []);

  const handlePrevImage = useCallback(() => {
    if (product?.images?.length > 1) {
      setCurrentImageIndex(prev => prev === 0 ? product.images.length - 1 : prev - 1);
    }
  }, [product?.images?.length]);

  const handleNextImage = useCallback(() => {
    if (product?.images?.length > 1) {
      setCurrentImageIndex(prev => prev === product.images.length - 1 ? 0 : prev + 1);
    }
  }, [product?.images?.length]);

  const handleVariantSelect = useCallback((variant) => {
    setSelectedVariant(variant);

    if (variant.image_url && product?.images?.length > 0) {
      const imageIndex = product.images.findIndex(image => image.url === variant.image_url);

      if (imageIndex !== -1) {
        setCurrentImageIndex(imageIndex);
      }
    }
  }, [product?.images]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedProduct = await getProduct(id);

        try {
          const quantitiesResponse = await getProductQuantities({
            fields: 'inventory_quantity',
            product_ids: [fetchedProduct.id]
          });

          const variantQuantityMap = new Map();
          quantitiesResponse.variants.forEach(variant => {
            variantQuantityMap.set(variant.id, variant.inventory_quantity);
          });

          const productWithQuantities = {
            ...fetchedProduct,
            variants: fetchedProduct.variants.map(variant => ({
              ...variant,
              inventory_quantity: variantQuantityMap.get(variant.id) ?? variant.inventory_quantity
            }))
          };

          setProduct(productWithQuantities);

          if (productWithQuantities.variants && productWithQuantities.variants.length > 0) {
            setSelectedVariant(productWithQuantities.variants[0]);
          }
        } catch (quantityError) {
          throw quantityError;
        }
      } catch (err) {
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] bg-background">
        <Loader2 className="h-16 w-16 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 bg-background">
        <Link to="/shop" className="inline-flex items-center gap-2 text-foreground font-bold hover:text-primary transition-colors mb-8 uppercase tracking-wide text-sm">
          <ArrowLeft size={16} />
          Back to Collection
        </Link>
        <div className="text-center text-destructive p-12 bg-muted border border-border">
          <XCircle className="mx-auto h-16 w-16 mb-4" />
          <p className="mb-6 font-bold uppercase tracking-wide">Error loading product: {error}</p>
        </div>
      </div>
    );
  }

  const price = selectedVariant?.sale_price_formatted ?? selectedVariant?.price_formatted;
  const originalPrice = selectedVariant?.price_formatted;
  const availableStock = selectedVariant ? selectedVariant.inventory_quantity : 0;
  const isStockManaged = selectedVariant?.manage_inventory ?? false;
  const canAddToCart = !isStockManaged || quantity <= availableStock;

  const currentImage = product.images[currentImageIndex];
  const hasMultipleImages = product.images.length > 1;

  return (
    <>
      <Helmet>
        <title>{product.title} - INSTHINK.APPAREL</title>
        <meta name="description" content={product.description?.substring(0, 160) || product.title} />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 py-16 bg-background">
        <Link to="/shop" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors mb-8 font-bold uppercase tracking-wide text-sm">
          <ArrowLeft size={16} />
          Back to Collection
        </Link>
        <div className="grid md:grid-cols-2 gap-12 bg-card">
          
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="relative">
            <div className="relative overflow-hidden bg-muted aspect-[4/5] border border-border">
              <img
                src={!currentImage?.url ? placeholderImage : currentImage.url}
                alt={product.title}
                className="w-full h-full object-cover grayscale-0"
              />

              {hasMultipleImages && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-background border border-border hover:border-primary hover:text-primary text-foreground p-3 rounded-none transition-colors shadow-sm"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-background border border-border hover:border-primary hover:text-primary text-foreground p-3 rounded-none transition-colors shadow-sm"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {product.ribbon_text && (
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-widest px-4 py-2">
                  {product.ribbon_text}
                </div>
              )}
            </div>

            {hasMultipleImages && (
              <div className="flex gap-4 mt-6 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-24 bg-muted border-2 transition-colors ${
                      index === currentImageIndex ? 'border-primary' : 'border-transparent hover:border-border'
                    }`}
                  >
                    <img
                      src={!image.url ? placeholderImage : image.url}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-col py-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-3 uppercase tracking-tight">{product.title}</h1>
            <p className="text-xl text-muted-foreground mb-6 font-medium">{product.subtitle}</p>

            <div className="flex items-baseline gap-4 mb-8 pb-8 border-b border-border">
              <span className="text-3xl font-extrabold text-foreground">{price}</span>
              {selectedVariant?.sale_price_in_cents && (
                <span className="text-xl text-muted-foreground line-through font-medium">{originalPrice}</span>
              )}
            </div>

            <div className="prose prose-neutral max-w-none text-foreground/80 mb-8 font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: product.description }} />

            {product.additional_info?.length > 0 && (
              <div className="mb-8 space-y-6">
                {product.additional_info
                  .sort((a, b) => a.order - b.order)
                  .map((info) => (
                    <div key={info.id} className="border-l-4 border-primary pl-5">
                      <h3 className="text-lg font-bold text-foreground mb-2 uppercase tracking-wide">{info.title}</h3>
                      <div className="prose prose-neutral prose-sm max-w-none text-muted-foreground font-medium" dangerouslySetInnerHTML={{ __html: info.description }} />
                    </div>
                  ))}
              </div>
            )}

            {product.variants.length > 1 && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wide">Select Variant</h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map(variant => (
                    <Button
                      key={variant.id}
                      variant={selectedVariant?.id === variant.id ? 'default' : 'outline'}
                      onClick={() => handleVariantSelect(variant)}
                      className={`h-12 px-6 rounded-none font-bold uppercase tracking-wider transition-all border-2 ${
                        selectedVariant?.id === variant.id 
                          ? 'bg-primary border-primary text-primary-foreground hover:bg-primary/90' 
                          : 'border-border text-foreground hover:border-primary hover:text-primary'
                      }`}
                    >
                      {variant.title}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 mb-10">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wide w-24">Quantity</h3>
              <div className="flex items-center border-2 border-border h-12">
                <Button onClick={() => handleQuantityChange(-1)} variant="ghost" size="icon" className="h-full w-12 rounded-none hover:bg-muted hover:text-primary text-foreground"><Minus size={18} /></Button>
                <span className="w-12 text-center text-foreground font-bold text-lg">{quantity}</span>
                <Button onClick={() => handleQuantityChange(1)} variant="ghost" size="icon" className="h-full w-12 rounded-none hover:bg-muted hover:text-primary text-foreground"><Plus size={18} /></Button>
              </div>
            </div>

            <div className="mt-auto">
              <Button 
                onClick={handleAddToCart} 
                size="lg" 
                className="w-full h-16 bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold uppercase tracking-widest text-lg rounded-none disabled:opacity-50 disabled:cursor-not-allowed" 
                disabled={!canAddToCart || !product.purchasable}
              >
                <ShoppingCart className="mr-3 h-6 w-6" /> Add to Cart
              </Button>

              <div className="mt-4 text-center font-bold tracking-wide uppercase text-sm">
                {isStockManaged && canAddToCart && product.purchasable && (
                  <p className="text-[#10B981] flex items-center justify-center gap-2">
                    <CheckCircle size={16} /> {availableStock} Units Available
                  </p>
                )}

                {isStockManaged && !canAddToCart && product.purchasable && (
                   <p className="text-primary flex items-center justify-center gap-2">
                    <XCircle size={16} /> Max Capacity: {availableStock} left
                  </p>
                )}

                {!product.purchasable && (
                    <p className="text-muted-foreground flex items-center justify-center gap-2">
                      <XCircle size={16} /> Currently Unavailable
                    </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailPage;