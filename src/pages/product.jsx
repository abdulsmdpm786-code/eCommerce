import React, { useState, useEffect } from 'react';
import { Loader2, ShoppingCart, Star } from 'lucide-react';


const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 299.99,
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    category: 'Audio'
  },
  {
    id: 2,
    name: 'Minimalist Smart Watch',
    price: 199.00,
    rating: 4.6,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    category: 'Wearables'
  },
  {
    id: 3,
    name: 'Vintage Polaroid Camera',
    price: 149.50,
    rating: 4.9,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80',
    category: 'Photography'
  },
  {
    id: 4,
    name: 'Sport Running Shoes',
    price: 129.99,
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    category: 'Footwear'
  },
  {
    id: 5,
    name: 'Luxury Ocean Perfume',
    price: 85.00,
    rating: 4.5,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80',
    category: 'Beauty'
  },
  {
    id: 6,
    name: 'Classic Aviator Sunglasses',
    price: 159.00,
    rating: 4.8,
    reviews: 94,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80',
    category: 'Accessories'
  }
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call with a 1.5 second delay
    const fetchProducts = async () => {
      setIsLoading(true);
      setTimeout(() => {
        setProducts(MOCK_PRODUCTS);
        setIsLoading(false);
      }, 1500);
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full min-h-[80vh] flex flex-col relative z-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Our Collection</h1>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Explore our handpicked selection of premium products designed to elevate your everyday lifestyle.
        </p>
      </div>

      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <Loader2 className="w-12 h-12 text-indigo-400 animate-spin relative z-10" />
          </div>
          <p className="mt-4 text-indigo-300 font-medium animate-pulse">Loading amazing products...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group flex flex-col bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px_0_rgba(79,70,229,0.3)] transition-all duration-300 hover:-translate-y-2"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden bg-slate-800">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 z-20">
                  <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/30">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-white leading-tight">{product.name}</h3>
                  <span className="text-lg font-black text-indigo-300">${product.price.toFixed(2)}</span>
                </div>
                
                <div className="flex items-center space-x-1 mb-6">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-medium text-slate-200">{product.rating}</span>
                  <span className="text-xs text-slate-400">({product.reviews} reviews)</span>
                </div>

                <div className="mt-auto">
                  <button className="w-full flex items-center justify-center py-3 px-4 rounded-xl text-sm font-medium text-white bg-white/10 border border-white/20 hover:bg-indigo-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 shadow-sm">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
