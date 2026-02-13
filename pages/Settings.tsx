
import React, { useState } from 'react';
import { useNavigate } from '../context/ThemeContext';
import { ArrowLeft, Moon, Sun, Monitor, Bell, Shield, LogOut, ChevronRight, Key, ChevronDown, ChevronUp, Smartphone, MapPin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [showHistory, setShowHistory] = useState(false);

  const loginHistory = [
      { id: 1, device: 'iPhone 15 Pro', ip: '192.168.1.42', location: 'Paris, FR', date: 'Aujourd\'hui, 09:41', current: true },
      { id: 2, device: 'MacBook Air', ip: '82.14.55.12', location: 'Lyon, FR', date: 'Hier, 18:30', current: false },
      { id: 3, device: 'Chrome (Windows)', ip: '90.12.43.11', location: 'Marseille, FR', date: '10 Oct', current: false },
  ];

  return (
    <div className="h-full bg-transparent pb-20 animate-fade-in flex flex-col">
       {/* Header */}
       <header className="px-6 pt-10 pb-6 flex items-center gap-4 relative z-10">
            <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition">
                <ArrowLeft size="24" className="text-gray-900 dark:text-white" />
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Paramètres</h1>
        </header>

        <div className="px-6 flex-1 overflow-y-auto no-scrollbar space-y-8">
            
            {/* Appearance Section */}
            <section>
                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Apparence</h2>
                <div className="glass-panel rounded-2xl p-1 grid grid-cols-2 gap-1">
                    <button 
                        onClick={() => setTheme('light')}
                        className={`flex flex-col items-center justify-center py-4 rounded-xl transition-all ${theme === 'light' ? 'bg-white dark:bg-white/10 shadow-sm text-primary' : 'text-gray-400 hover:bg-black/5 dark:hover:bg-white/5'}`}
                    >
                        <Sun size="24" className="mb-2" />
                        <span className="text-xs font-semibold">Clair</span>
                    </button>
                    <button 
                         onClick={() => setTheme('dark')}
                         className={`flex flex-col items-center justify-center py-4 rounded-xl transition-all ${theme === 'dark' ? 'bg-white/10 shadow-sm text-white' : 'text-gray-400 hover:bg-black/5 dark:hover:bg-white/5'}`}
                    >
                        <Moon size="24" className="mb-2" />
                        <span className="text-xs font-semibold">Sombre</span>
                    </button>
                </div>
            </section>

             {/* Security Section (New) */}
             <section>
                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Sécurité</h2>
                <div className="glass-panel rounded-2xl overflow-hidden divide-y divide-gray-100 dark:divide-white/5">
                    
                    {/* Change Password */}
                    <button className="w-full p-4 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition text-left group">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                <Key size="16" />
                            </div>
                            <div>
                                <span className="text-sm font-semibold text-gray-900 dark:text-white block">Mot de passe</span>
                                <span className="text-[10px] text-gray-500 block">Dernière modification il y a 3 mois</span>
                            </div>
                        </div>
                        <ChevronRight size="16" className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* Login History */}
                    <div className="flex flex-col">
                        <button 
                            onClick={() => setShowHistory(!showHistory)}
                            className="w-full p-4 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition text-left"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                    <Shield size="16" />
                                </div>
                                <div>
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white block">Connexions</span>
                                    <span className="text-[10px] text-gray-500 block">Historique des appareils et IP</span>
                                </div>
                            </div>
                            {showHistory ? <ChevronUp size="16" className="text-gray-400" /> : <ChevronDown size="16" className="text-gray-400" />}
                        </button>

                        {/* Expanded History List */}
                        {showHistory && (
                            <div className="bg-gray-50/50 dark:bg-black/20 border-t border-gray-100 dark:border-white/5 animate-slide-up">
                                {loginHistory.map((login) => (
                                    <div key={login.id} className="p-3 px-4 flex items-center justify-between border-b border-gray-100 dark:border-white/5 last:border-0">
                                        <div className="flex items-center gap-3">
                                            <div className="text-gray-400">
                                                {login.device.toLowerCase().includes('phone') ? <Smartphone size="16" /> : <Monitor size="16" />}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-semibold text-gray-900 dark:text-white">{login.device}</span>
                                                    {login.current && <span className="text-[8px] font-bold bg-green-500 text-white px-1.5 py-0.5 rounded-full">ACTUEL</span>}
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                                    <span className="flex items-center gap-0.5"><MapPin size="10" /> {login.location}</span>
                                                    <span>•</span>
                                                    <span>{login.ip}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-gray-400">{login.date}</span>
                                    </div>
                                ))}
                                <button className="w-full py-2 text-[10px] font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition">
                                    Déconnecter les autres sessions
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Other Section */}
            <section>
                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Préférences</h2>
                <div className="glass-panel rounded-2xl overflow-hidden">
                    <div className="p-4 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition group">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                <Bell size="16" />
                            </div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</span>
                        </div>
                        <ChevronRight size="16" className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </section>
            
            <button className="w-full py-4 text-red-500 font-bold text-sm bg-red-50/50 dark:bg-red-500/10 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-100 dark:hover:bg-red-500/20 transition">
                <LogOut size="18" />
                Déconnexion
            </button>
            
            <p className="text-center text-[10px] text-gray-400 pb-8">
                Version 2.0.4 (Build 2026)
            </p>
        </div>
    </div>
  );
};

export default Settings;
