import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Package, 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  ShoppingBag
} from 'lucide-react';
import { currencyPipe } from '../../utils/pipes';
import { orderService } from '../../services/order.service';
import { productService } from '../../services/product.service';
import { authService } from '../../services/auth.service';
import { Order } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const allOrders = orderService.getOrders();
    setOrders(allOrders);
    setTotalRevenue(allOrders.reduce((sum, order) => sum + order.total, 0));
    setTotalProducts(productService.getProducts().length);
    setTotalUsers(authService.getUsers().length);
  }, []);

  const stats = [
    { label: 'Total Revenue', value: totalRevenue, icon: DollarSign, trend: '+12.5%', trendUp: true, color: 'sky' },
    { label: 'Total Orders', value: orders.length, icon: Package, trend: '+5.2%', trendUp: true, color: 'emerald' },
    { label: 'Total Customers', value: totalUsers, icon: Users, trend: '-2.1%', trendUp: false, color: 'amber' },
    { label: 'Total Products', value: totalProducts, icon: ShoppingBag, trend: '+4.3%', trendUp: true, color: 'indigo' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 flex items-center gap-4">
        <div className="w-2 h-12 bg-brand-red rounded-full"></div>
        <div>
          <h1 className="text-4xl font-bold text-sky-900 dark:text-white tracking-tight">Admin Dashboard</h1>
          <p className="text-sky-600 dark:text-slate-400 mt-1">Real-time overview of your store performance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 border-white/20"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-brand-white/10 dark:bg-slate-800/50 text-brand-red border border-white/10`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-bold ${stat.trendUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-brand-red'}`}>
                {stat.trend}
                {stat.trendUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              </div>
            </div>
            <p className="text-sky-600 dark:text-slate-400 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-black text-sky-900 dark:text-white mt-1">
              {typeof stat.value === 'number' ? currencyPipe(stat.value) : stat.value}
            </h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass p-8 rounded-[2.5rem] border-white/20 shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-sky-900 dark:text-white flex items-center gap-2">
              Recent Transactions
              <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
            </h2>
            <button className="text-brand-red dark:text-brand-red text-sm font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-6">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-white/10 dark:bg-slate-800/50 flex items-center justify-center text-brand-red font-bold border border-white/10">
                    {order.id.split('-')[1].substring(0, 2)}
                  </div>
                  <div>
                    <p className="text-sky-900 dark:text-white font-bold">{order.id}</p>
                    <p className="text-sky-500 dark:text-slate-500 text-xs">{new Date(order.createdAt).toLocaleDateString()} • {order.items.length} items</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sky-900 dark:text-white font-black">{currencyPipe(order.total)}</p>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider border ${
                    order.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <p className="text-center text-slate-500 py-10">No transactions yet.</p>
            )}
          </div>
        </div>

        <div className="glass p-8 rounded-[2.5rem] border-white/20 shadow-2xl">
          <h2 className="text-xl font-bold text-sky-900 dark:text-white mb-8 flex items-center gap-2">
            Top Products
            <div className="w-2 h-2 bg-brand-red rounded-full"></div>
          </h2>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <img 
                  src={`https://picsum.photos/seed/prod${i}/100/100`} 
                  alt="Product" 
                  className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-white/20"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1">
                  <p className="text-sky-900 dark:text-white font-bold text-sm">Premium Product {i}</p>
                  <div className="w-full bg-brand-white/10 dark:bg-slate-800/50 h-2 rounded-full mt-2 overflow-hidden">
                    <div className="bg-brand-red h-full rounded-full" style={{ width: `${90 - i * 20}%` }}></div>
                  </div>
                  <p className="text-[10px] text-sky-500 dark:text-slate-500 mt-1 font-medium">{120 - i * 30} sales this month</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 rounded-2xl border-2 border-white/20 text-brand-red font-bold hover:bg-white/10 transition-all">
            Inventory Report
          </button>
        </div>
      </div>
    </div>
  );
};
