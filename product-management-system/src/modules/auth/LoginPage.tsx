import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'motion/react';
import { Package, Mail, Lock, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  console.log('LoginPage rendering');
  const [email, setEmail] = useState('user@orderflow.com');
  const [password, setPassword] = useState('user123');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(email, password);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  const fillCredentials = (role: 'admin' | 'customer') => {
    if (role === 'admin') {
      setEmail('admin@orderflow.com');
      setPassword('admin123');
    } else {
      setEmail('user@orderflow.com');
      setPassword('user123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50 dark:bg-slate-950 px-4 transition-colors duration-300 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-2 flex">
        <div className="flex-1 bg-brand-red"></div>
        <div className="flex-1 bg-brand-white"></div>
        <div className="flex-1 bg-brand-yellow"></div>
      </div>
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-yellow/10 rounded-full blur-3xl"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="glass p-8 rounded-[2.5rem] border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-sky-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 to-brand-yellow/20"></div>
              <Package size={32} className="relative z-10" />
            </div>
            <h2 className="text-3xl font-bold text-sky-900 dark:text-white">Welcome Back</h2>
            <p className="text-sky-600 dark:text-slate-400 mt-2">Sign in to manage your orders</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-brand-red/10 text-brand-red p-3 rounded-xl text-sm border border-brand-red/20">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-sky-900 dark:text-slate-300 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-red" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-white/20 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-yellow transition-all dark:text-white"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-sky-900 dark:text-slate-300 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-red" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-white/20 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-yellow transition-all dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-sky-600 text-white py-4 rounded-2xl font-bold hover:bg-sky-700 transition-all shadow-lg flex items-center justify-center gap-2 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-red/10 to-brand-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10">Sign In</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform relative z-10" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-xs font-bold text-sky-400 dark:text-slate-500 uppercase tracking-widest mb-4 text-center">Quick Login</p>
            <div className="flex gap-3">
              <button 
                onClick={() => fillCredentials('admin')}
                className="flex-1 py-3 bg-white/30 dark:bg-slate-800/30 text-sky-600 dark:text-sky-400 rounded-xl text-xs font-black hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all border border-white/20"
              >
                ADMIN
              </button>
              <button 
                onClick={() => fillCredentials('customer')}
                className="flex-1 py-3 bg-brand-red/5 dark:bg-brand-red/10 text-brand-red rounded-xl text-xs font-black hover:bg-brand-red/10 dark:hover:bg-brand-red/20 transition-all border border-brand-red/20"
              >
                CUSTOMER
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
