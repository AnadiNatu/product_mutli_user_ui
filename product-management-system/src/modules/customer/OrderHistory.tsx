import React, { useState, useEffect } from 'react';
import { orderService } from '../../services/order.service';
import { useAuth } from '../../hooks/useAuth';
import { Order } from '../../types';
import { currencyPipe } from '../../utils/pipes';
import { motion, AnimatePresence } from 'motion/react';
import { Package, ChevronDown, ChevronUp, Clock, CheckCircle2, Truck, XCircle, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const OrderHistory: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setOrders(orderService.getUserOrders(user.id));
    }
  }, [user]);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered': return 'text-emerald-500 bg-emerald-500/10';
      case 'shipped': return 'text-sky-500 bg-sky-500/10';
      case 'processing': return 'text-brand-yellow bg-brand-yellow/10';
      case 'cancelled': return 'text-brand-red bg-brand-red/10';
      default: return 'text-slate-400 bg-slate-400/10';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'delivered': return <CheckCircle2 size={16} />;
      case 'shipped': return <Truck size={16} />;
      case 'processing': return <Clock size={16} />;
      case 'cancelled': return <XCircle size={16} />;
      default: return <Package size={16} />;
    }
  };

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-brand-red/10 rounded-full flex items-center justify-center text-brand-red mx-auto mb-6">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-3xl font-bold text-sky-900 dark:text-white">No orders yet</h2>
        <p className="text-sky-600 dark:text-slate-400 mt-2 mb-8">You haven't placed any orders yet. Start shopping to see them here!</p>
        <Link to="/" className="bg-sky-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-sky-700 transition-all shadow-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-red/10 to-brand-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="relative z-10">Explore Products</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-2 h-10 bg-brand-yellow rounded-full"></div>
        <h1 className="text-4xl font-bold text-sky-900 dark:text-white">My Orders</h1>
      </div>

      <div className="space-y-6">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card overflow-hidden"
          >
            <div 
              className="p-6 flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red">
                  <Package size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-sky-900 dark:text-white">{order.id}</h3>
                  <p className="text-sm text-slate-500">{new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}</p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-slate-500 uppercase font-black tracking-widest mb-1">Total Amount</p>
                  <p className="text-lg font-black text-brand-red">{currencyPipe(order.total)}</p>
                </div>

                <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  {order.status}
                </div>

                <div className="text-slate-400">
                  {expandedOrder === order.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
            </div>

            <AnimatePresence>
              {expandedOrder === order.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-white/10 overflow-hidden"
                >
                  <div className="p-6 bg-white/5">
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.productId} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-brand-yellow font-bold text-xs">
                              {item.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-sky-900 dark:text-white">{item.name}</p>
                              <p className="text-xs text-slate-500">Qty: {item.quantity} × {currencyPipe(item.price)}</p>
                            </div>
                          </div>
                          <p className="font-bold text-sky-900 dark:text-white">{currencyPipe(item.price * item.quantity)}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
                      <div className="text-sm text-slate-500">
                        Placed on {new Date(order.createdAt).toLocaleString()}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-slate-500 font-bold">Total:</span>
                        <span className="text-2xl font-black text-brand-red">{currencyPipe(order.total)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
