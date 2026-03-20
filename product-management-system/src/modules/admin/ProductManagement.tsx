import React, { useState } from 'react';
import { productService } from '../../services/product.service';
import { adminService } from '../../services/admin.service';
import { Product } from '../../types';
import { currencyPipe } from '../../utils/pipes';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit2, Trash2, Save, X, Package, AlertCircle } from 'lucide-react';

export const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(productService.getProducts());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm(product);
  };

  const handleSave = () => {
    if (!editForm.id) return;
    
    // In a real app, this would call productService.updateProduct
    // For now, we update local state and log it
    const updatedProducts = products.map(p => p.id === editForm.id ? { ...p, ...editForm } as Product : p);
    setProducts(updatedProducts);
    
    adminService.addLog(
      'UPDATE',
      'Product',
      editForm.id,
      `Updated product: ${editForm.name}. New Price: ${editForm.price}, Stock: ${editForm.stock}`
    );
    
    setEditingId(null);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      
      adminService.addLog(
        'DELETE',
        'Product',
        id,
        `Deleted product: ${name}`
      );
    }
  };

  const handleAdd = () => {
    const newProduct: Product = {
      id: `p${Date.now()}`,
      name: editForm.name || 'New Product',
      description: editForm.description || '',
      price: editForm.price || 0,
      category: editForm.category || 'Electronics',
      image: editForm.image || 'https://picsum.photos/seed/new/400/300',
      stock: editForm.stock || 0,
      brand: editForm.brand || 'Generic',
      manufacturedDate: new Date().toISOString().split('T')[0],
      addedDate: new Date().toISOString().split('T')[0]
    };

    setProducts([newProduct, ...products]);
    adminService.addLog(
      'CREATE',
      'Product',
      newProduct.id,
      `Created new product: ${newProduct.name}`
    );
    setIsAdding(false);
    setEditForm({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-2 h-10 bg-brand-red rounded-full"></div>
          <div>
            <h1 className="text-4xl font-bold text-sky-900 dark:text-white tracking-tight">Product Management</h1>
            <p className="text-sky-600 dark:text-slate-400 mt-1">Add, edit, or remove products from the catalog</p>
          </div>
        </div>
        <button 
          onClick={() => { setIsAdding(true); setEditForm({}); }}
          className="flex items-center gap-2 bg-sky-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-sky-700 transition-all shadow-lg relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand-red/10 to-brand-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Plus size={20} className="relative z-10" />
          <span className="relative z-10">Add New Product</span>
        </button>
      </div>

      <div className="glass rounded-[2.5rem] border-white/20 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-white/10 dark:bg-slate-800/50 border-b border-white/10">
                <th className="px-6 py-4 text-xs font-bold text-sky-900 dark:text-slate-300 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-xs font-bold text-sky-900 dark:text-slate-300 uppercase tracking-wider">Category & Brand</th>
                <th className="px-6 py-4 text-xs font-bold text-sky-900 dark:text-slate-300 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-xs font-bold text-sky-900 dark:text-slate-300 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-xs font-bold text-sky-900 dark:text-slate-300 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <AnimatePresence mode="popLayout">
                {isAdding && (
                  <motion.tr
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-brand-yellow/5 dark:bg-brand-yellow/10"
                  >
                    <td className="px-6 py-4">
                      <input 
                        type="text" 
                        placeholder="Product Name"
                        className="w-full p-2 bg-white/50 dark:bg-slate-900/50 border border-white/20 rounded-xl text-sm dark:text-white focus:ring-2 focus:ring-brand-yellow outline-none"
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="Category"
                          className="w-1/2 p-2 bg-white/50 dark:bg-slate-900/50 border border-white/20 rounded-xl text-sm dark:text-white focus:ring-2 focus:ring-brand-yellow outline-none"
                          onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        />
                        <input 
                          type="text" 
                          placeholder="Brand"
                          className="w-1/2 p-2 bg-white/50 dark:bg-slate-900/50 border border-white/20 rounded-xl text-sm dark:text-white focus:ring-2 focus:ring-brand-yellow outline-none"
                          onChange={(e) => setEditForm({ ...editForm, brand: e.target.value })}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <input 
                        type="number" 
                        placeholder="Price"
                        className="w-24 p-2 bg-white/50 dark:bg-slate-900/50 border border-white/20 rounded-xl text-sm dark:text-white focus:ring-2 focus:ring-brand-yellow outline-none"
                        onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input 
                        type="number" 
                        placeholder="Stock"
                        className="w-20 p-2 bg-white/50 dark:bg-slate-900/50 border border-white/20 rounded-xl text-sm dark:text-white focus:ring-2 focus:ring-brand-yellow outline-none"
                        onChange={(e) => setEditForm({ ...editForm, stock: Number(e.target.value) })}
                      />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={handleAdd} className="p-2 bg-brand-yellow text-white rounded-xl hover:scale-110 transition-transform">
                          <Save size={18} />
                        </button>
                        <button onClick={() => setIsAdding(false)} className="p-2 bg-white/20 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-white/30 transition-all">
                          <X size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                )}
                {products.map((product) => (
                  <motion.tr 
                    key={product.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-brand-white/5 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      {editingId === product.id ? (
                        <input 
                          type="text" 
                          value={editForm.name}
                          className="w-full p-2 bg-white/50 dark:bg-slate-900/50 border border-white/20 rounded-xl text-sm dark:text-white focus:ring-2 focus:ring-brand-yellow outline-none"
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        />
                      ) : (
                        <div className="flex items-center gap-3">
                          <img src={product.image} alt="" className="w-10 h-10 rounded-lg object-cover border border-white/10" />
                          <span className="text-sm font-bold text-sky-900 dark:text-white">{product.name}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === product.id ? (
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={editForm.category}
                            className="w-1/2 p-2 bg-white/50 dark:bg-slate-900/50 border border-white/20 rounded-xl text-sm dark:text-white focus:ring-2 focus:ring-brand-yellow outline-none"
                            onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                          />
                          <input 
                            type="text" 
                            value={editForm.brand}
                            className="w-1/2 p-2 bg-white/50 dark:bg-slate-900/50 border border-white/20 rounded-xl text-sm dark:text-white focus:ring-2 focus:ring-brand-yellow outline-none"
                            onChange={(e) => setEditForm({ ...editForm, brand: e.target.value })}
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-brand-red">{product.category}</span>
                          <span className="text-[10px] text-sky-400 dark:text-slate-500 uppercase tracking-wider">{product.brand}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === product.id ? (
                        <input 
                          type="number" 
                          value={editForm.price}
                          className="w-24 p-2 bg-white/50 dark:bg-slate-900/50 border border-white/20 rounded-xl text-sm dark:text-white focus:ring-2 focus:ring-brand-yellow outline-none"
                          onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                        />
                      ) : (
                        <span className="text-sm font-black text-brand-yellow">{currencyPipe(product.price)}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === product.id ? (
                        <input 
                          type="number" 
                          value={editForm.stock}
                          className="w-20 p-2 bg-white/50 dark:bg-slate-900/50 border border-white/20 rounded-xl text-sm dark:text-white focus:ring-2 focus:ring-brand-yellow outline-none"
                          onChange={(e) => setEditForm({ ...editForm, stock: Number(e.target.value) })}
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${product.stock > 5 ? 'bg-emerald-500' : 'bg-brand-red'}`}></div>
                          <span className={`text-sm font-bold ${product.stock > 5 ? 'text-emerald-600' : 'text-brand-red'}`}>{product.stock}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {editingId === product.id ? (
                          <>
                            <button onClick={handleSave} className="p-2 bg-brand-yellow text-white rounded-xl hover:scale-110 transition-transform">
                              <Save size={18} />
                            </button>
                            <button onClick={() => setEditingId(null)} className="p-2 bg-white/20 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-white/30 transition-all">
                              <X size={18} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              onClick={() => handleEdit(product)} 
                              className="p-2 text-brand-yellow hover:bg-brand-yellow/10 rounded-xl transition-all"
                              title="Edit Product"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button onClick={() => handleDelete(product.id, product.name)} className="p-2 text-brand-red hover:bg-brand-red/10 rounded-xl transition-all">
                              <Trash2 size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 border-white/20 flex items-center gap-4">
          <div className="p-3 bg-brand-red text-white rounded-2xl shadow-lg shadow-brand-red/20">
            <Package size={24} />
          </div>
          <div>
            <p className="text-sky-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Total Products</p>
            <h4 className="text-2xl font-black text-sky-900 dark:text-white">{products.length}</h4>
          </div>
        </div>
        <div className="glass-card p-6 border-white/20 flex items-center gap-4">
          <div className="p-3 bg-brand-yellow text-white rounded-2xl shadow-lg shadow-brand-yellow/20">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-sky-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Low Stock Alert</p>
            <h4 className="text-2xl font-black text-sky-900 dark:text-white">{products.filter(p => p.stock <= 5).length}</h4>
          </div>
        </div>
        <div className="glass-card p-6 border-white/20 flex items-center gap-4">
          <div className="p-3 bg-sky-600 text-white rounded-2xl shadow-lg shadow-sky-600/20">
            <Save size={24} />
          </div>
          <div>
            <p className="text-sky-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Inventory Value</p>
            <h4 className="text-2xl font-black text-sky-900 dark:text-white">
              {currencyPipe(products.reduce((sum, p) => sum + (p.price * p.stock), 0))}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};
