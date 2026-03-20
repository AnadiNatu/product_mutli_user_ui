import React from 'react';
import { adminService } from '../../services/admin.service';
import { datePipe, titleCasePipe } from '../../utils/pipes';
import { motion } from 'motion/react';
import { ClipboardList, Search, Filter, Download } from 'lucide-react';

export const CrmLogsPage: React.FC = () => {
  const logs = adminService.getLogs();

  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATE': return 'bg-emerald-50 text-emerald-600';
      case 'UPDATE': return 'bg-sky-50 text-sky-600';
      case 'DELETE': return 'bg-red-50 text-red-600';
      default: return 'bg-amber-50 text-amber-600';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-2 h-10 bg-brand-red rounded-full"></div>
          <div>
            <h1 className="text-4xl font-bold text-sky-900 dark:text-white tracking-tight">CRM Activity Logs</h1>
            <p className="text-sky-600 dark:text-slate-400 mt-1">Track all administrative actions and system events</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-3 glass border-white/20 rounded-xl text-brand-red hover:scale-110 transition-transform shadow-sm">
            <Download size={20} />
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-red" size={18} />
            <input 
              type="text" 
              placeholder="Search logs..." 
              className="pl-10 pr-4 py-2.5 bg-white/50 dark:bg-slate-900/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow shadow-sm w-64 text-sky-900 dark:text-white placeholder-sky-300 dark:placeholder-slate-600"
            />
          </div>
        </div>
      </div>

      <div className="glass rounded-[2.5rem] border-white/20 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-white/10 dark:bg-slate-800/50 border-b border-white/10">
                <th className="px-6 py-4 text-xs font-bold text-sky-900 dark:text-slate-300 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-4 text-xs font-bold text-sky-900 dark:text-slate-300 uppercase tracking-wider">Action</th>
                <th className="px-6 py-4 text-xs font-bold text-sky-900 dark:text-slate-300 uppercase tracking-wider">Entity</th>
                <th className="px-6 py-4 text-xs font-bold text-sky-900 dark:text-slate-300 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-xs font-bold text-sky-900 dark:text-slate-300 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {logs.map((log, index) => (
                <motion.tr 
                  key={log.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-brand-white/5 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-sky-500 dark:text-slate-400 font-medium">
                    {datePipe(log.timestamp)}
                    <span className="block text-[10px] opacity-70">{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${getActionColor(log.action)}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-sky-900 dark:text-white">{log.entity}</span>
                      <span className="text-[10px] text-brand-yellow font-mono">ID: {log.entityId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-brand-white/10 dark:bg-slate-800/50 flex items-center justify-center text-[10px] font-bold text-brand-red border border-white/10">
                        {log.user.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-sky-700 dark:text-slate-300">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-sky-600 dark:text-slate-400 max-w-xs truncate">
                    {log.details}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-brand-white/5 dark:bg-slate-800/50 border-t border-white/10 flex justify-between items-center">
          <p className="text-xs text-sky-400 dark:text-slate-500 font-medium">Showing {logs.length} recent activities</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs font-bold text-brand-red hover:bg-white/10 rounded-lg transition-all">Previous</button>
            <button className="px-3 py-1 text-xs font-bold text-brand-red hover:bg-white/10 rounded-lg transition-all">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
