import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/admin.service';
import { motion } from 'motion/react';
import { Activity, Server, Database, Globe, Cpu, Zap, ShieldCheck, RefreshCw } from 'lucide-react';

export const HealthCheckPage: React.FC = () => {
  const [health, setHealth] = useState(adminService.getHealth());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshHealth = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setHealth(adminService.getHealth());
      setIsRefreshing(false);
    }, 800);
  };

  const metrics = [
    { label: 'CPU Usage', value: `${health.cpuUsage}%`, icon: Cpu, color: health.cpuUsage > 80 ? 'red' : 'emerald' },
    { label: 'Memory', value: `${health.memoryUsage}%`, icon: Zap, color: health.memoryUsage > 80 ? 'red' : 'emerald' },
    { label: 'API Latency', value: `${health.apiLatency}ms`, icon: Globe, color: health.apiLatency > 200 ? 'amber' : 'emerald' },
    { label: 'DB Connection', value: health.dbConnection ? 'Active' : 'Failed', icon: Database, color: health.dbConnection ? 'emerald' : 'red' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <div className="p-2 rounded-xl bg-brand-red/10 dark:bg-brand-red/20">
              <Activity className="text-brand-red" size={36} />
            </div>
            System Health
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Real-time status of microservices and infrastructure</p>
        </div>
        <button 
          onClick={refreshHealth}
          disabled={isRefreshing}
          className="glass flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-brand-red hover:bg-brand-red/5 transition-all shadow-xl shadow-brand-red/10 disabled:opacity-50 border border-brand-red/20"
        >
          <RefreshCw size={20} className={isRefreshing ? 'animate-spin' : ''} />
          Refresh Status
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-8 rounded-3xl text-center relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-yellow/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transition-transform group-hover:scale-110 ${
              metric.color === 'red' 
                ? 'bg-brand-red/10 text-brand-red shadow-brand-red/20' 
                : metric.color === 'amber'
                ? 'bg-brand-yellow/10 text-brand-yellow shadow-brand-yellow/20'
                : 'bg-emerald-500/10 text-emerald-500 shadow-emerald-500/20'
            }`}>
              <metric.icon size={28} />
            </div>
            
            <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{metric.label}</p>
            <h3 className={`text-3xl font-black ${
              metric.color === 'red' ? 'text-brand-red' : metric.color === 'amber' ? 'text-brand-yellow' : 'text-emerald-500'
            }`}>
              {metric.value}
            </h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-brand-red/50" />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <Server size={24} className="text-brand-red" />
            Service Status
          </h2>
          <div className="space-y-4">
            {['Auth Service', 'Order Service', 'Product Service', 'Inventory Service', 'Notification Service'].map((service, idx) => (
              <div key={service} className="flex items-center justify-between p-5 glass rounded-2xl border border-white/5 dark:border-white/5 group hover:border-brand-yellow/30 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-black text-slate-400">0{idx + 1}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{service}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Operational</span>
                  <div className="relative">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                    <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping opacity-75"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-3xl p-8 relative overflow-hidden bg-slate-900/40">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 blur-3xl rounded-full -mr-16 -mt-16" />
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <ShieldCheck size={24} className="text-brand-yellow" />
            Infrastructure Security
          </h2>
          <div className="space-y-8">
            <div className="flex items-center gap-5 p-4 rounded-2xl hover:bg-white/5 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-brand-red/10 flex items-center justify-center shadow-lg shadow-brand-red/10">
                <Activity size={24} className="text-brand-red" />
              </div>
              <div>
                <p className="font-black text-slate-900 dark:text-white">SSL Certificate</p>
                <p className="text-slate-500 text-xs font-bold">Valid until Oct 2026 • Auto-renew active</p>
              </div>
            </div>
            
            <div className="flex items-center gap-5 p-4 rounded-2xl hover:bg-white/5 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-brand-yellow/10 flex items-center justify-center shadow-lg shadow-brand-yellow/10">
                <Database size={24} className="text-brand-yellow" />
              </div>
              <div>
                <p className="font-black text-slate-900 dark:text-white">Daily Backups</p>
                <p className="text-slate-500 text-xs font-bold">Last backup: 4 hours ago • Integrity: 100%</p>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-200 dark:border-white/10">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5" />
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  All systems are operating within normal parameters. No security incidents or unauthorized access attempts reported in the last 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
