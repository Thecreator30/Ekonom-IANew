import React from 'react';
import { Bell, Ticket, Gift, Filter, Download, Plus, Timer, Percent } from 'lucide-react';
import { Link } from '../context/ThemeContext';

const Coupons: React.FC = () => {
  return (
    <div className="w-full px-5 pt-8 pb-32 animate-fade-in text-gray-900 dark:text-white bg-transparent">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium mb-1">Fidélité</p>
          <h1 className="text-2xl font-bold">Coupons</h1>
        </div>
        <Link to="/notifications" className="w-10 h-10 rounded-full bg-white dark:bg-white/5 shadow-sm border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-gray-300 relative hover:bg-gray-50 dark:hover:bg-white/10 transition">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-background-dark rounded-full"></span>
        </Link>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 mb-8 w-full">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-500/20 text-white relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/20 rounded-full blur-2xl"></div>
          <div className="flex items-start justify-between mb-6">
            <Ticket size={20} className="text-blue-100" />
            <span className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded-lg">+12%</span>
          </div>
          <h3 className="text-3xl font-bold mb-1">24</h3>
          <p className="text-blue-100 text-xs font-medium opacity-80">Coupons Actifs</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl relative overflow-hidden flex flex-col justify-between w-full">
          <div className="flex items-start justify-between mb-4">
            <Gift size={20} className="text-purple-500" />
            <span className="text-[10px] font-bold bg-green-500/10 text-green-500 px-2 py-1 rounded-lg">High</span>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">68%</h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs font-medium">Taux d'usage</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex gap-3 mb-6 overflow-x-auto no-scrollbar pb-2 w-full">
        <button className="flex-shrink-0 flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black px-4 py-3 rounded-xl font-bold text-sm shadow-lg hover:scale-105 transition-transform">
          <Plus size={16} />
          <span>Créer</span>
        </button>
        <button className="flex-shrink-0 flex items-center gap-2 glass-panel px-4 py-3 rounded-xl font-medium text-sm text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition">
          <Filter size={16} />
          <span>Filtres</span>
        </button>
        <button className="flex-shrink-0 flex items-center gap-2 glass-panel px-4 py-3 rounded-xl font-medium text-sm text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition">
          <Download size={16} />
          <span>Export</span>
        </button>
      </div>

      {/* Coupon List */}
      <div className="space-y-4 w-full">
        {/* Active Ticket Style */}
        <div className="relative group cursor-pointer w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition"></div>
            
            <div className="relative bg-white dark:bg-[#1A1F2E] rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden flex w-full">
                <div className="w-24 bg-gradient-to-br from-purple-500 to-indigo-600 flex flex-col items-center justify-center text-white p-2 relative flex-shrink-0">
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-background-light dark:bg-background-dark rounded-full"></div>
                    <Percent size={24} className="mb-1" />
                    <span className="text-xl font-bold">-20%</span>
                    <div className="absolute right-0 top-0 bottom-0 w-[1px] border-r-2 border-dashed border-black/20"></div>
                </div>

                <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white truncate">WELCOME20</h3>
                            <p className="text-xs text-gray-500">Offre de bienvenue</p>
                        </div>
                        <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[10px] font-bold uppercase rounded-md border border-green-500/20 flex-shrink-0">Actif</span>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                            <span>Utilisation</span>
                            <span>142 / 500</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 w-[28%] rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Expired Ticket Style */}
        <div className="relative opacity-70 hover:opacity-100 transition duration-300 cursor-pointer w-full">
             <div className="relative bg-white dark:bg-[#1A1F2E] rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden flex w-full">
                <div className="w-24 bg-gray-200 dark:bg-white/5 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 p-2 relative flex-shrink-0">
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-background-light dark:bg-background-dark rounded-full"></div>
                    <Gift size={24} className="mb-1" />
                    <span className="text-xl font-bold">-50%</span>
                    <div className="absolute right-0 top-0 bottom-0 w-[1px] border-r-2 border-dashed border-gray-300 dark:border-white/10"></div>
                </div>

                <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white truncate">SUMMER50</h3>
                            <p className="text-xs text-gray-500">Soldes d'été</p>
                        </div>
                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-white/10 text-gray-400 text-[10px] font-bold uppercase rounded-md flex-shrink-0">Expiré</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                        <Timer size={14} />
                        <span>Terminé le 15 Août</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Coupons;