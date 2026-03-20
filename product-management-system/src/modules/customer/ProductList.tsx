import React, { useState, useMemo } from 'react';
import { productService } from '../../services/product.service';
import { cartService } from '../../services/cart.service';
import { currencyPipe, truncatePipe } from '../../utils/pipes';
import { motion } from 'motion/react';
import { ShoppingCart, Plus, Star, Check, Search, Filter, SlidersHorizontal } from 'lucide-react';

export const ProductList: React.FC = () => {
  const products = productService.getProducts();
  const [addedId, setAddedId] = useState<string | null>(null);
  
  // Filter states
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [brand, setBrand] = useState('All Brands');
  const [sortBy, setSortBy] = useState('Newest');
  const [maxPrice, setMaxPrice] = useState(1000);

  const brands = useMemo(() => {
    const b = new Set(products.map(p => p.brand));
    return ['All Brands', ...Array.from(b)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                            p.brand.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === 'All Categories' || p.category === category;
        const matchesBrand = brand === 'All Brands' || p.brand === brand;
        const matchesPrice = p.price <= maxPrice;
        return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'Price: Low to High': return a.price - b.price;
          case 'Price: High to Low': return b.price - a.price;
          case 'Name: A-Z': return a.name.localeCompare(b.name);
          case 'Manufactured Date': return new Date(b.manufacturedDate).getTime() - new Date(a.manufacturedDate).getTime();
          case 'Newest': 
          default: return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
        }
      });
  }, [products, search, category, brand, sortBy, maxPrice]);

  const handleAddToCart = (product: any) => {
    cartService.addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="relative">
            <div className="absolute -left-4 top-0 w-1 h-full bg-brand-red rounded-full"></div>
            <h1 className="text-4xl font-bold text-sky-900 dark:text-white tracking-tight">Our Products</h1>
            <p className="text-sky-600 dark:text-slate-400 mt-2">Discover premium gear for your digital lifestyle</p>
          </div>
          
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-red" size={20} />
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or brand..."
              className="w-full pl-12 pr-4 py-3 glass rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-yellow shadow-sm dark:text-white transition-all"
            />
          </div>
        </div>

        <div className="glass p-6 rounded-[2rem] border-white/20 flex flex-wrap items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red via-brand-white to-brand-yellow opacity-30"></div>
          <div className="flex items-center gap-2 text-sky-900 dark:text-slate-300 font-bold text-sm">
            <Filter size={18} className="text-brand-red" />
            Filters:
          </div>
          
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-white/50 dark:bg-slate-800/50 border border-white/20 dark:border-white/10 rounded-xl px-4 py-2 text-sky-700 dark:text-slate-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow transition-all"
          >
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Accessories</option>
            <option>Audio</option>
            <option>Furniture</option>
          </select>

          <select 
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="bg-white/50 dark:bg-slate-800/50 border border-white/20 dark:border-white/10 rounded-xl px-4 py-2 text-sky-700 dark:text-slate-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow transition-all"
          >
            {brands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>

          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white/50 dark:bg-slate-800/50 border border-white/20 dark:border-white/10 rounded-xl px-4 py-2 text-sky-700 dark:text-slate-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-yellow transition-all"
          >
            <option>Newest</option>
            <option>Manufactured Date</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Name: A-Z</option>
          </select>

          <div className="flex-1 min-w-[200px] flex items-center gap-4">
            <span className="text-xs font-bold text-sky-400 dark:text-slate-500 uppercase tracking-widest">Max Price: {currencyPipe(maxPrice)}</span>
            <input 
              type="range" 
              min="0" 
              max="1000" 
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="flex-1 h-1.5 bg-white/30 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-red"
            />
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 glass rounded-full flex items-center justify-center text-brand-red mx-auto mb-4">
            <SlidersHorizontal size={40} />
          </div>
          <h3 className="text-xl font-bold text-sky-900 dark:text-white">No products found</h3>
          <p className="text-sky-600 dark:text-slate-400 mt-1">Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card group"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star size={14} className="text-brand-yellow fill-brand-yellow" />
                  <span className="text-xs font-bold text-sky-900 dark:text-white">4.9</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <span className="text-xs font-semibold text-white/90 bg-brand-red/80 px-2 py-1 rounded-lg backdrop-blur-sm">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xl font-bold text-sky-900 dark:text-white group-hover:text-brand-red transition-colors">
                    {product.name}
                  </h3>
                  <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                    {currencyPipe(product.price)}
                  </span>
                </div>
                <p className="text-xs font-bold text-sky-400 dark:text-slate-500 mb-3 uppercase tracking-wider">{product.brand}</p>
                <p className="text-sky-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                  {truncatePipe(product.description, 80)}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className={`text-xs font-bold ${product.stock > 5 ? 'text-emerald-600' : 'text-brand-red'}`}>
                      {product.stock} units in stock
                    </span>
                    <span className="text-[10px] text-sky-400 dark:text-slate-500">Added: {new Date(product.addedDate).toLocaleDateString()}</span>
                  </div>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className={`p-3 rounded-2xl transition-all duration-300 flex items-center gap-2 font-bold shadow-sm disabled:opacity-50 ${
                      addedId === product.id 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-white/50 dark:bg-slate-800/50 hover:bg-brand-red text-brand-red dark:text-brand-yellow hover:text-white border border-white/20'
                    }`}
                  >
                    {addedId === product.id ? <Check size={20} /> : <Plus size={20} />}
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
