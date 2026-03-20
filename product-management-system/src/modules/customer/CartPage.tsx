import React, { useState, useEffect } from 'react';
import { cartService } from '../../services/cart.service';
import { productService } from '../../services/product.service';
import { adminService } from '../../services/admin.service';
import { orderService } from '../../services/order.service';
import { useAuth } from '../../hooks/useAuth';
import { currencyPipe } from '../../utils/pipes';
import { motion } from 'motion/react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CartPage: React.FC = () => {
  const { user } = useAuth();
  const [items, setItems] = useState(cartService.getItems());
  const [total, setTotal] = useState(cartService.getTotal());
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const updateCart = () => {
      setItems([...cartService.getItems()]);
      setTotal(cartService.getTotal());
    };
    return cartService.subscribe(updateCart);
  }, []);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Deduct stock for each item
    let allSuccess = true;
    items.forEach(item => {
      const success = productService.deductStock(item.productId, item.quantity);
      if (!success) allSuccess = false;
    });

    if (allSuccess && user) {
      const order = orderService.createOrder(user.id, items, total);
      adminService.addLog('CHECKOUT', 'Order', order.id, `Order completed for ${items.length} items. Total: ${currencyPipe(total)}`);
      cartService.clearCart();
      setIsSuccess(true);
    } else if (!user) {
      alert('Please login to complete your order.');
    } else {
      alert('Some items are out of stock!');
    }
    
    setIsCheckingOut(false);
  };

  if (isSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-brand-yellow/10 rounded-full flex items-center justify-center text-brand-yellow mx-auto mb-6"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h2 className="text-3xl font-bold text-sky-900 dark:text-white">Order Successful!</h2>
        <p className="text-sky-600 dark:text-slate-400 mt-2 mb-8">Thank you for your purchase. Your stock has been updated.</p>
        <Link to="/" className="bg-sky-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-sky-700 transition-all shadow-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-red/10 to-brand-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="relative z-10">Back to Shop</span>
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-brand-red/10 rounded-full flex items-center justify-center text-brand-red mx-auto mb-6">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-3xl font-bold text-sky-900 dark:text-white">Your cart is empty</h2>
        <p className="text-sky-600 dark:text-slate-400 mt-2 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/" className="bg-sky-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-sky-700 transition-all shadow-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-red/10 to-brand-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="relative z-10">Start Shopping</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-2 h-10 bg-brand-red rounded-full"></div>
        <h1 className="text-4xl font-bold text-sky-900 dark:text-white">Shopping Cart</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <motion.div 
              key={item.productId}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-6 flex flex-col sm:flex-row items-center gap-6"
            >
              <div className="w-24 h-24 bg-brand-white/10 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center text-brand-red font-bold text-xl border border-white/20">
                {item.name.charAt(0)}
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-bold text-sky-900 dark:text-white">{item.name}</h3>
                <p className="text-brand-yellow font-bold">{currencyPipe(item.price)}</p>
              </div>
              <div className="flex items-center gap-4 bg-white/30 dark:bg-slate-800/50 px-4 py-2 rounded-2xl border border-white/10">
                <button 
                  onClick={() => cartService.updateQuantity(item.productId, item.quantity - 1)}
                  className="text-brand-red hover:scale-110 transition-transform"
                >
                  <Minus size={18} />
                </button>
                <span className="font-bold text-sky-900 dark:text-white w-8 text-center">{item.quantity}</span>
                <button 
                  onClick={() => cartService.updateQuantity(item.productId, item.quantity + 1)}
                  className="text-brand-red hover:scale-110 transition-transform"
                >
                  <Plus size={18} />
                </button>
              </div>
              <div className="text-right min-w-[100px]">
                <p className="text-lg font-black text-sky-900 dark:text-white">{currencyPipe(item.price * item.quantity)}</p>
                <button 
                  onClick={() => cartService.removeFromCart(item.productId)}
                  className="text-brand-red/60 hover:text-brand-red transition-colors mt-1"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="glass p-8 rounded-[2.5rem] h-fit sticky top-24 border-white/20 shadow-2xl">
          <h2 className="text-2xl font-bold text-sky-900 dark:text-white mb-6 flex items-center gap-2">
            Order Summary
            <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
          </h2>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-sky-600 dark:text-slate-400">
              <span>Subtotal</span>
              <span>{currencyPipe(total)}</span>
            </div>
            <div className="flex justify-between text-sky-600 dark:text-slate-400">
              <span>Shipping</span>
              <span className="text-brand-yellow font-bold">Free</span>
            </div>
            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-xl font-bold text-sky-900 dark:text-white">Total</span>
              <span className="text-2xl font-black text-brand-red">{currencyPipe(total)}</span>
            </div>
          </div>
          <button 
            onClick={handleCheckout}
            disabled={isCheckingOut}
            className="w-full bg-sky-600 text-white py-4 rounded-2xl font-bold hover:bg-sky-700 transition-all shadow-lg flex items-center justify-center gap-2 group disabled:opacity-50 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-red/10 to-brand-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative z-10">{isCheckingOut ? 'Processing...' : 'Checkout'}</span>
            {!isCheckingOut && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform relative z-10" />}
          </button>
        </div>
      </div>
    </div>
  );
};
