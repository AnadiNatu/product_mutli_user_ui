import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { cartService } from '../services/cart.service';
import { ShoppingCart, LogOut, User, Package, LayoutDashboard, Activity, ClipboardList, Sun, Moon } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCount = () => {
      const items = cartService.getItems();
      setCartCount(items.reduce((sum, item) => sum + item.quantity, 0));
    };
    updateCount();
    return cartService.subscribe(updateCount);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass border-b border-white/20 dark:border-white/10 sticky top-0 z-50 transition-all duration-300">
      {/* Accent Line */}
      <div className="h-1 w-full flex">
        <div className="h-full flex-1 bg-brand-red"></div>
        <div className="h-full flex-1 bg-brand-white"></div>
        <div className="h-full flex-1 bg-brand-yellow"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-sky-200 dark:shadow-none relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 to-brand-yellow/20"></div>
                <Package size={24} className="relative z-10" />
              </div>
              <span className="text-xl font-bold text-sky-900 dark:text-white tracking-tight">OrderFlow</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sky-700 dark:text-slate-300 hover:text-brand-red dark:hover:text-brand-yellow font-medium transition-colors">Products</Link>
            {user?.role === 'admin' && (
              <>
                <Link to="/admin" className="text-sky-700 dark:text-slate-300 hover:text-brand-red dark:hover:text-brand-yellow font-medium transition-colors flex items-center gap-1">
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
                <Link to="/admin/products" className="text-sky-700 dark:text-slate-300 hover:text-brand-red dark:hover:text-brand-yellow font-medium transition-colors flex items-center gap-1">
                  <Package size={18} />
                  Products
                </Link>
                <Link to="/admin/logs" className="text-sky-700 dark:text-slate-300 hover:text-brand-red dark:hover:text-brand-yellow font-medium transition-colors flex items-center gap-1">
                  <ClipboardList size={18} />
                  Logs
                </Link>
                <Link to="/admin/health" className="text-sky-700 dark:text-slate-300 hover:text-brand-red dark:hover:text-brand-yellow font-medium transition-colors flex items-center gap-1">
                  <Activity size={18} />
                  Health
                </Link>
              </>
            )}
            {user?.role === 'customer' && (
              <Link to="/orders" className="text-sky-700 dark:text-slate-300 hover:text-brand-red dark:hover:text-brand-yellow font-medium transition-colors">My Orders</Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 text-sky-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-full transition-all border border-transparent hover:border-white/20"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={22} className="text-brand-red" /> : <Sun size={22} className="text-brand-yellow" />}
            </button>
            {user?.role === 'customer' && (
              <Link to="/cart" className="relative p-2 text-sky-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-full transition-all border border-transparent hover:border-white/20">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-brand-red text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 shadow-sm">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
            {user ? (
              <>
                <Link to="/profile" className="flex items-center space-x-3 glass px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border-2 border-brand-white shadow-sm" />
                  <div className="hidden sm:block">
                    <p className="text-xs font-semibold text-sky-900 dark:text-white leading-none">{user.name}</p>
                    <p className="text-[10px] text-sky-600 dark:text-slate-400 capitalize">{user.role}</p>
                  </div>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-sky-600 dark:text-slate-400 hover:bg-brand-red/10 rounded-full transition-all"
                  title="Logout"
                >
                  <LogOut size={20} className="hover:text-brand-red" />
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="bg-sky-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-sky-700 transition-all shadow-md shadow-sky-100 dark:shadow-none"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
