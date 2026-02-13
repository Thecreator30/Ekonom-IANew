import React, { useState, useEffect } from 'react';
import { useNavigate } from '../context/ThemeContext';
import { ArrowLeft, Moon, Sun, Monitor, Bell, Shield, LogOut, ChevronRight, Key, ChevronDown, ChevronUp, Smartphone, MapPin, X, Check, Lock, Eye, EyeOff } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import EkoBot from '../components/EkoBot';

interface LoginEntry {
  id: number;
  device: string;
  ip: string;
  location: string;
  date: string;
  current: boolean;
}

interface ProfileData {
  company_name: string;
  email: string;
  plan: string;
}

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const [showHistory, setShowHistory] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loginHistory, setLoginHistory] = useState<LoginEntry[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const [profileRes, securityRes] = await Promise.all([
          api.get('/api/settings/profile'),
          api.get('/api/settings/security'),
        ]);
        if (profileRes.success && profileRes.data) {
          setProfile(profileRes.data);
        }
        if (securityRes.success && securityRes.data?.loginHistory) {
          setLoginHistory(securityRes.data.loginHistory);
        }
      } catch (err) {
        console.error('Failed to load settings data:', err);
      }
    };
    fetchSettings();
  }, []);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPass !== passwordForm.confirm) return;
    setPasswordSuccess(true);
    setTimeout(() => {
      setShowPasswordModal(false);
      setPasswordSuccess(false);
      setPasswordForm({ current: '', newPass: '', confirm: '' });
    }, 1500);
  };

  return (
    <div className="w-full min-h-full bg-transparent px-4 pb-32 animate-fade-in flex flex-col">
       {/* Header Simple */}
       <header className="pt-8 pb-6 flex items-center gap-4">
            <button onClick={() => navigate('/dashboard')} className="p-2 -ml-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition">
                <ArrowLeft size={24} className="text-gray-900 dark:text-white" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Parametres</h1>
        </header>

        <div className="space-y-6">

            {/* Profile Info */}
            {profile && (
              <section className="w-full">
                <div className="glass-panel rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 text-lg font-bold shrink-0">
                    {profile.company_name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-bold text-gray-900 dark:text-white block truncate">{profile.company_name}</span>
                    <span className="text-[11px] text-gray-500 block truncate">{profile.email}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-full shrink-0">{profile.plan}</span>
                </div>
              </section>
            )}

            {/* Appearance Section */}
            <section className="w-full" style={{ animationDelay: '0.05s' }}>
                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">Apparence</h2>
                <div className="glass-panel rounded-2xl p-1.5 grid grid-cols-2 gap-1.5">
                    <button
                        onClick={() => setTheme('light')}
                        className={`flex flex-col items-center justify-center py-6 rounded-xl transition-all duration-300 ${theme === 'light' ? 'bg-white shadow-sm text-blue-600' : 'bg-transparent text-gray-400 hover:bg-white/50 dark:hover:bg-white/5'}`}
                    >
                        <Sun size="28" className="mb-2" />
                        <span className="text-xs font-bold">Clair</span>
                    </button>
                    <button
                         onClick={() => setTheme('dark')}
                         className={`flex flex-col items-center justify-center py-6 rounded-xl transition-all duration-300 ${theme === 'dark' ? 'bg-white/10 shadow-sm text-white border border-white/10' : 'bg-transparent text-gray-400 hover:bg-black/5 dark:hover:bg-white/5'}`}
                    >
                        <Moon size="28" className="mb-2" />
                        <span className="text-xs font-bold">Sombre</span>
                    </button>
                </div>
            </section>

             {/* Security Section */}
             <section className="w-full" style={{ animationDelay: '0.1s' }}>
                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">Securite</h2>
                <div className="glass-panel rounded-2xl overflow-hidden divide-y divide-gray-100 dark:divide-white/5">

                    <button onClick={() => setShowPasswordModal(true)} className="w-full p-4 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition text-left group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
                                <Key size="20" />
                            </div>
                            <div className="min-w-0">
                                <span className="text-sm font-bold text-gray-900 dark:text-white block truncate">Mot de passe</span>
                                <span className="text-[11px] text-gray-500 block truncate">Change il y a 3 mois</span>
                            </div>
                        </div>
                        <ChevronRight size="16" className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex flex-col">
                        <button
                            onClick={() => setShowHistory(!showHistory)}
                            className="w-full p-4 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition text-left"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                                    <Shield size="20" />
                                </div>
                                <div className="min-w-0">
                                    <span className="text-sm font-bold text-gray-900 dark:text-white block truncate">Connexions</span>
                                    <span className="text-[11px] text-gray-500 block truncate">Appareils actifs</span>
                                </div>
                            </div>
                            {showHistory ? <ChevronUp size="16" className="text-gray-400" /> : <ChevronDown size="16" className="text-gray-400" />}
                        </button>

                        {/* Dropdown Content */}
                        {showHistory && (
                            <div className="bg-gray-50/50 dark:bg-black/40 border-t border-gray-100 dark:border-white/5 animate-slide-up">
                                {loginHistory.map((login) => (
                                    <div key={login.id} className="p-3 px-4 flex items-center justify-between border-b border-gray-100 dark:border-white/5 last:border-0">
                                        <div className="flex items-center gap-3 w-full">
                                            <div className="text-gray-400 shrink-0">
                                                {login.device.toLowerCase().includes('phone') ? <Smartphone size="16" /> : <Monitor size="16" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-semibold text-gray-900 dark:text-white truncate">{login.device}</span>
                                                    {login.current && <span className="text-[9px] font-bold bg-green-500 text-white px-1.5 py-0.5 rounded shrink-0">MOI</span>}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-[10px] text-gray-500 truncate">
                                                    <span>{login.location}</span> • <span>{login.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Preferences */}
            <section className="w-full" style={{ animationDelay: '0.15s' }}>
                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">Preferences</h2>
                <div className="glass-panel rounded-2xl overflow-hidden">
                    <button onClick={() => navigate('/notifications')} className="w-full p-4 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition text-left group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                                <Bell size="20" />
                            </div>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">Notifications</span>
                        </div>
                        <ChevronRight size="16" className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </section>

            <div className="pt-4 pb-8" style={{ animationDelay: '0.2s' }}>
                <button onClick={logout} className="w-full py-4 text-red-500 font-bold text-sm bg-red-50 dark:bg-red-500/10 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-100 dark:hover:bg-red-500/20 transition active:scale-95">
                    <LogOut size="18" />
                    Deconnexion
                </button>

                {/* EkoBot helper */}
                <div className="flex flex-col items-center mt-8 mb-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    <EkoBot size="sm" mood="happy" bubbleText="Besoin d'aide ?" showBubble />
                </div>

                <p className="text-center text-[10px] text-gray-400 mt-4">
                    Version 2.0.4 (Build 2026)
                </p>
            </div>
        </div>

        {/* Password Change Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowPasswordModal(false)}></div>
            <div className="bg-white dark:bg-[#1A1F2E] w-full max-w-sm rounded-3xl p-6 relative z-10 shadow-2xl border border-white/10 animate-slide-up gradient-border">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Changer le mot de passe</h3>
                <button onClick={() => setShowPasswordModal(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 transition">
                  <X size={20} />
                </button>
              </div>

              {passwordSuccess ? (
                <div className="flex flex-col items-center py-8 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center mb-4">
                    <Check size={32} className="text-green-600" />
                  </div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Mot de passe modifie !</p>
                </div>
              ) : (
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Mot de passe actuel</label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPass ? 'text' : 'password'}
                        value={passwordForm.current}
                        onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                        className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-11 pr-11 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                        {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Nouveau mot de passe</label>
                    <div className="relative">
                      <Key size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPass ? 'text' : 'password'}
                        value={passwordForm.newPass}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
                        className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-11 pr-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Confirmer</label>
                    <div className="relative">
                      <Key size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPass ? 'text' : 'password'}
                        value={passwordForm.confirm}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                        className={`w-full bg-gray-50 dark:bg-black/20 border rounded-xl py-3 pl-11 pr-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary ${passwordForm.confirm && passwordForm.confirm !== passwordForm.newPass ? 'border-red-400 dark:border-red-500' : 'border-gray-200 dark:border-white/10'}`}
                        required
                        minLength={6}
                      />
                    </div>
                    {passwordForm.confirm && passwordForm.confirm !== passwordForm.newPass && (
                      <p className="text-xs text-red-500 ml-1">Les mots de passe ne correspondent pas</p>
                    )}
                  </div>
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={!passwordForm.current || !passwordForm.newPass || passwordForm.newPass !== passwordForm.confirm}
                      className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white rounded-xl font-bold text-sm shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Check size={18} />
                      Modifier le mot de passe
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default Settings;
