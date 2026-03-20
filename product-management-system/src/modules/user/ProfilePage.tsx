import React, { useState, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'motion/react';
import { 
  User as UserIcon, 
  Mail, 
  Camera, 
  Shield, 
  Bell, 
  CreditCard, 
  ChevronRight, 
  Check,
  Save,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'security' | 'preferences'>('details');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    updateUser({ name, email });
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="glass p-8 rounded-[2.5rem] border-white/20 shadow-2xl sticky top-24">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                <div className="w-32 h-32 rounded-[2rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl transition-transform group-hover:scale-105">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-black/40 rounded-[2rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white" size={32} />
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>
              <h2 className="text-2xl font-bold text-sky-900 dark:text-white mt-4">{user.name}</h2>
              <p className="text-sky-600 dark:text-slate-400 capitalize font-medium">{user.role}</p>
            </div>

            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab('details')}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                  activeTab === 'details' 
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-200 dark:shadow-none' 
                  : 'text-sky-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <UserIcon size={20} />
                  <span className="font-bold">Account Details</span>
                </div>
                <ChevronRight size={18} />
              </button>
              <button 
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                  activeTab === 'security' 
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-200 dark:shadow-none' 
                  : 'text-sky-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Shield size={20} />
                  <span className="font-bold">Security</span>
                </div>
                <ChevronRight size={18} />
              </button>
              <button 
                onClick={() => setActiveTab('preferences')}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                  activeTab === 'preferences' 
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-200 dark:shadow-none' 
                  : 'text-sky-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Bell size={20} />
                  <span className="font-bold">Preferences</span>
                </div>
                <ChevronRight size={18} />
              </button>
            </nav>

            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex items-center gap-3 p-4 text-sky-400 dark:text-slate-500">
                <CreditCard size={20} />
                <span className="text-xs font-black uppercase tracking-widest">Billing Info</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-10 rounded-[3rem] border-white/20 shadow-2xl relative overflow-hidden"
          >
            {/* Decorative Gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            
            {activeTab === 'details' && (
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className="text-3xl font-bold text-sky-900 dark:text-white">Account Details</h2>
                    <p className="text-sky-600 dark:text-slate-400 mt-1">Update your personal information</p>
                  </div>
                  {showSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2 text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-200 dark:border-emerald-500/20"
                    >
                      <Check size={18} />
                      <span className="text-sm font-bold">Changes saved!</span>
                    </motion.div>
                  )}
                </div>

                <form onSubmit={handleSave} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-sky-900 dark:text-slate-300 ml-1">Full Name</label>
                      <div className="relative">
                        <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-red" size={20} />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-slate-800/50 border border-white/20 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-yellow transition-all dark:text-white font-medium"
                          placeholder="Your name"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-sky-900 dark:text-slate-300 ml-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-red" size={20} />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-slate-800/50 border border-white/20 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-yellow transition-all dark:text-white font-medium"
                          placeholder="name@example.com"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="bg-sky-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-sky-700 transition-all shadow-xl flex items-center gap-2 group relative overflow-hidden disabled:opacity-50"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-red/10 to-brand-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      {isSaving ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <Save size={20} className="relative z-10" />
                      )}
                      <span className="relative z-10">{isSaving ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-sky-900 dark:text-white mb-2">Security Settings</h2>
                <p className="text-sky-600 dark:text-slate-400 mb-10">Manage your password and account security</p>

                <div className="space-y-8">
                  <div className="glass p-6 rounded-3xl border-white/10 bg-white/30 dark:bg-slate-800/30">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-brand-red/10 rounded-2xl text-brand-red">
                          <Lock size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold text-sky-900 dark:text-white">Change Password</h3>
                          <p className="text-xs text-sky-500 dark:text-slate-500">Last changed 3 months ago</p>
                        </div>
                      </div>
                      <button className="text-sky-600 dark:text-sky-400 font-bold text-sm hover:underline">Update</button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-sky-400 dark:text-slate-500 uppercase tracking-widest">Current Password</label>
                        <div className="relative">
                          <input type="password" value="••••••••" readOnly className="w-full px-4 py-3 bg-white/50 dark:bg-slate-900/50 border border-white/10 rounded-xl focus:outline-none dark:text-white" />
                          <Eye className="absolute right-4 top-1/2 -translate-y-1/2 text-sky-300" size={18} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-sky-400 dark:text-slate-500 uppercase tracking-widest">New Password</label>
                        <div className="relative">
                          <input type="password" placeholder="Enter new password" disabled className="w-full px-4 py-3 bg-white/50 dark:bg-slate-900/50 border border-white/10 rounded-xl focus:outline-none dark:text-white opacity-50" />
                          <EyeOff className="absolute right-4 top-1/2 -translate-y-1/2 text-sky-300" size={18} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="glass p-6 rounded-3xl border-white/10 bg-white/30 dark:bg-slate-800/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-brand-yellow/10 rounded-2xl text-brand-yellow">
                          <Shield size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold text-sky-900 dark:text-white">Two-Factor Authentication</h3>
                          <p className="text-xs text-sky-500 dark:text-slate-500">Add an extra layer of security</p>
                        </div>
                      </div>
                      <div className="w-12 h-6 bg-sky-200 dark:bg-slate-700 rounded-full relative cursor-pointer">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-sky-900 dark:text-white mb-2">Preferences</h2>
                <p className="text-sky-600 dark:text-slate-400 mb-10">Customize your experience</p>

                <div className="space-y-6">
                  {[
                    { title: 'Email Notifications', desc: 'Receive updates about your orders', enabled: true },
                    { title: 'Marketing Emails', desc: 'Get news about latest products and offers', enabled: false },
                    { title: 'Order Status Alerts', desc: 'Real-time push notifications for delivery', enabled: true },
                    { title: 'Desktop Notifications', desc: 'Show browser alerts for important updates', enabled: false }
                  ].map((pref, i) => (
                    <div key={i} className="flex items-center justify-between p-6 glass rounded-3xl border-white/10 bg-white/30 dark:bg-slate-800/30">
                      <div>
                        <h3 className="font-bold text-sky-900 dark:text-white">{pref.title}</h3>
                        <p className="text-xs text-sky-500 dark:text-slate-500">{pref.desc}</p>
                      </div>
                      <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${pref.enabled ? 'bg-emerald-500' : 'bg-sky-200 dark:bg-slate-700'}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${pref.enabled ? 'right-1' : 'left-1'}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
