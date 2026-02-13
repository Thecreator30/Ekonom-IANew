import React, { useState } from 'react';
import { useNavigate } from '../context/ThemeContext';
import { ArrowLeft, Moon, Sun, Monitor, Bell, Shield, LogOut, ChevronRight, Key, ChevronDown, ChevronUp, Smartphone, MapPin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import EkoBot from '../components/EkoBot';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [showHistory, setShowHistory] = useState(false);

  const loginHistory = [
      { id: 1, device: 'iPhone 15 Pro', ip: '192.168.1.42', location: 'Paris, FR', date: 'Aujourd\'hui, 09:41', current: true },
      { id: 2, device: 'MacBook Air', ip: '82.14.55.12', location: 'Lyon, FR', date: 'Hier, 18:30', current: false },
  ];

  return (
    <div className="w-full min-h-full bg-transparent px-4 pb-32 animate-fade-in flex flex-col">
       {/* Header Simple */}
       <header className="pt-8 pb-6 flex items-center gap-4">
            <button onClick={() => navigate('/dashboard')} className="p-2 -ml-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition">
                <ArrowLeft size={24} className="text-gray-900 dark:text-white" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Paramètres</h1>
        </header>

        <div className="space-y-6">
            
            {/* Appearance Section */}
            <section className="w-full">
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
             <section className="w-full">
                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">Sécurité</h2>
                <div className="glass-panel rounded-2xl overflow-hidden divide-y divide-gray-100 dark:divide-white/5">
                    
                    <button className="w-full p-4 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition text-left group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
                                <Key size="20" />
                            </div>
                            <div className="min-w-0">
                                <span className="text-sm font-bold text-gray-900 dark:text-white block truncate">Mot de passe</span>
                                <span className="text-[11px] text-gray-500 block truncate">Changé il y a 3 mois</span>
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
            <section className="w-full">
                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">Préférences</h2>
                <div className="glass-panel rounded-2xl overflow-hidden">
                    <button className="w-full p-4 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition text-left group">
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
            
            <div className="pt-4 pb-8">
                <button className="w-full py-4 text-red-500 font-bold text-sm bg-red-50 dark:bg-red-500/10 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-100 dark:hover:bg-red-500/20 transition active:scale-95">
                    <LogOut size="18" />
                    Déconnexion
                </button>
                <p className="text-center text-[10px] text-gray-400 mt-6">
                    Version 2.0.4 (Build 2026)
                </p>
            </div>
        </div>
    </div>
  );
};

export default Settings;