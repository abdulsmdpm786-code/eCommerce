import React, { useState, useEffect } from 'react';
import { Loader2, ShoppingCart, Star, Plus, X, Search, Filter, Trash2 } from 'lucide-react';
import Axios_Api from '../Api/api';

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    rating: "",
    numReviews: "",
    isFeatured: "false"
  });

  useEffect(() => {
    // Check admin status
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = parseJwt(token);
      if (decoded && decoded.role === 'admin') {
        setIsAdmin(true);
      }
    }

    // Fetch products
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await Axios_Api.get('/login/products/getAll');
        if (response.status === 200) {
          setProducts(response.data.AllItems || []);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const productData = {
        ...newProduct,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        rating: newProduct.rating ? Number(newProduct.rating) : 0,
        numReviews: newProduct.numReviews ? Number(newProduct.numReviews) : 0,
        createdAt: new Date().toISOString()
      };

      const response = await Axios_Api.post('/login/products/createOne', productData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setProducts(prev => [response.data.product, ...prev]);
        setIsAdding(false);
        setNewProduct({
          name: "", description: "", price: "", category: "", brand: "", stock: "", rating: "", numReviews: "", isFeatured: "false"
        });
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert(error?.response?.data?.errMsg || "Error creating product");
    }
  };

  const handleDeleteProduct = async (id) => {
    if(!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await Axios_Api.delete(`/login/products/deleteOne/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setProducts(prev => prev.filter(p => p._id !== id && p.id !== id));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert(error?.response?.data?.errMsg || "Error deleting product");
    }
  };

  // Get unique categories for the filter
  const categories = ["All", ...new Set(products.map(p => p.category).filter(Boolean))];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full min-h-[80vh] flex flex-col relative z-10 px-4 md:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Our Collection</h1>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Explore our handpicked selection of premium products designed to elevate your everyday lifestyle.
        </p>
      </div>

      {/* Admin Add Button */}
      {isAdmin && (
        <div className="mb-8 flex justify-end">
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center justify-center py-2 px-6 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-lg"
          >
            {isAdding ? <X className="w-5 h-5 mr-2" /> : <Plus className="w-5 h-5 mr-2" />}
            {isAdding ? "Cancel" : "Add New Product"}
          </button>
        </div>
      )}

      {/* Add Product Form */}
      {isAdmin && isAdding && (
        <div className="mb-10 p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl animate-in slide-in-from-top-4 duration-300">
          <h2 className="text-2xl font-bold text-white mb-6">Create New Product</h2>
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">Name *</label>
              <input required name="name" value={newProduct.name} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/50 outline-none" placeholder="Product Name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">Category *</label>
              <input required name="category" value={newProduct.category} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/50 outline-none" placeholder="e.g. Electronics" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-200">Description *</label>
              <textarea required name="description" value={newProduct.description} onChange={handleInputChange} rows="3" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/50 outline-none" placeholder="Detailed product description..."></textarea>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">Price ($) *</label>
              <input required type="number" step="0.01" name="price" value={newProduct.price} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/50 outline-none" placeholder="99.99" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">Stock *</label>
              <input required type="number" name="stock" value={newProduct.stock} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/50 outline-none" placeholder="100" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">Brand</label>
              <input name="brand" value={newProduct.brand} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/50 outline-none" placeholder="Brand Name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">Is Featured</label>
              <select name="isFeatured" value={newProduct.isFeatured} onChange={handleInputChange} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-indigo-500/50 outline-none [&>option]:bg-slate-800">
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
            <div className="md:col-span-2 mt-4">
              <button type="submit" className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg">
                Submit Product
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter Section */}
      <div className="mb-10 flex flex-col md:flex-row gap-4 items-center bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
        <div className="relative w-full md:w-2/3">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search products by name or description..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          />
        </div>
        <div className="relative w-full md:w-1/3 flex items-center">
          <Filter className="absolute left-3 h-5 w-5 text-slate-400" />
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all cursor-pointer [&>option]:bg-slate-800"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center py-20">
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <Loader2 className="w-12 h-12 text-indigo-400 animate-spin relative z-10" />
          </div>
          <p className="mt-4 text-indigo-300 font-medium animate-pulse">Loading amazing products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-2">No products found</h2>
          <p className="text-slate-400">Try adjusting your search or filter criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
          {filteredProducts.map((product) => (
            <div 
              key={product._id || product.id} 
              className="group flex flex-col bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px_0_rgba(79,70,229,0.3)] transition-all duration-300 hover:-translate-y-2"
            >
              {/* Product Info Without Image */}
              <div className="p-6 flex flex-col flex-1 relative">
                 <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-indigo-500/20 text-indigo-300 text-xs font-semibold px-2 py-1 rounded-md inline-block">
                        {product.category}
                      </span>
                      {isAdmin && (
                        <button 
                          onClick={() => handleDeleteProduct(product._id || product.id)}
                          className="p-1 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-md transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white leading-tight mt-1">{product.name}</h3>
                    {product.brand && <p className="text-sm text-slate-400 mt-1">by {product.brand}</p>}
                  </div>
                  <span className="text-xl font-black text-emerald-400">${Number(product.price).toFixed(2)}</span>
                </div>
                
                <p className="text-slate-300 text-sm mb-6 flex-1 line-clamp-3">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium text-slate-200">{product.rating || "New"}</span>
                    <span className="text-xs text-slate-400">({product.numReviews || 0} reviews)</span>
                  </div>
                  <div className="text-sm text-slate-300 font-medium">
                    Stock: {product.stock > 0 ? <span className="text-emerald-400">{product.stock}</span> : <span className="text-red-400">Out of Stock</span>}
                  </div>
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
