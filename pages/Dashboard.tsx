import React from 'react';
import { Link } from '../context/ThemeContext';
import { Users, Ticket, ArrowUpRight, Plus, Activity, Bell, Sparkles } from 'lucide-react';
import EkoBot from '../components/EkoBot';

const Dashboard: React.FC = () => {
  const currentHour = new Date().getHours();
  let greeting = "Bonjour";
  if (currentHour >= 18) greeting = "Bonsoir";

  return (
    <div className="px-5 pt-8 animate-fade-in text-gray-900 dark:text-white pb-24">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8">
        <Link to="/settings" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-black border border-black/5 dark:border-white/10 flex items-center justify-center overflow-hidden transition-transform group-active:scale-95">
             <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80" alt="Avatar" className="w-full h-full object-cover opacity-90" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">{greeting}, Alex</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Boutique St-Honoré • <span className="text-green-500 font-medium">Ouvert</span></p>
          </div>
        </Link>
        <Link to="/notifications" className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center relative hover:bg-gray-50 dark:hover:bg-white/10 transition shadow-sm">
          <Bell size={20} className="text-gray-600 dark:text-gray-300" />
          <span className="absolute top-2.5 right-3 w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_red]"></span>
        </Link>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        
        {/* Main Stat Card - Spans 2 cols */}
        <div className="col-span-2 glass-panel rounded-[2rem] p-6 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 dark:bg-primary/20 rounded-full blur-[80px] group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition duration-700"></div>
           <div className="relative z-10 flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Chiffre d'affaires (Est.)</p>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">12,450€</h2>
                <div className="flex items-center gap-2 mt-2">
                   <span className="px-2 py-0.5 rounded-full bg-green-500/10 dark:bg-green-500/20 border border-green-500/20 text-green-600 dark:text-green-400 text-xs font-bold flex items-center">
                     <ArrowUpRight size={12} className="mr-1" /> +14%
                   </span>
                   <span className="text-xs text-gray-500">vs mois dernier</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center border border-primary/10 dark:border-primary/20 text-primary">
                 <Activity size={24} />
              </div>
           </div>
           {/* Micro Chart */}
           <div className="mt-6 h-12 w-full flex items-end gap-1 opacity-50">
              {[40, 65, 50, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                <div key={i} className="flex-1 bg-gray-900 dark:bg-white rounded-t-sm transition-all duration-500 hover:bg-primary hover:opacity-100" style={{height: `${h}%`}}></div>
              ))}
           </div>
        </div>

        {/* Action Card 1: New Promo */}
        <Link to="/config-offer" className="glass-panel rounded-[2rem] p-5 relative overflow-hidden group hover:border-blue-500/20 transition-all active:scale-98">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="w-10 h-10 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3 border border-blue-500/10 dark:border-blue-500/20">
               <Plus size={20} />
            </div>
            <h3 className="font-bold text-lg leading-tight mb-1 text-gray-900 dark:text-white">Créer<br/>Offre</h3>
            <p className="text-xs text-gray-500">QR Code & Promo</p>
        </Link>

        {/* Action Card 2: Eko Insight */}
        <Link to="/assistant" className="glass-panel rounded-[2rem] p-5 relative overflow-hidden group hover:border-purple-500/20 transition-all active:scale-98">
             <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
             
             {/* EkoBot Integration */}
             <div className="mb-3">
               <EkoBot size="md" mood="happy" className="scale-75 origin-top-left" />
             </div>

            <h3 className="font-bold text-lg leading-tight mb-1 text-gray-900 dark:text-white">Demander<br/>à Eko</h3>
            <p className="text-xs text-gray-500">Assistant IA</p>
        </Link>

        {/* Stat Card: Subscribers */}
        <div className="glass-panel rounded-[2rem] p-5 flex flex-col justify-between">
           <div className="flex justify-between items-start">
              <Users size={20} className="text-gray-400" />
              <span className="text-xs text-green-500 font-bold">+12</span>
           </div>
           <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">1,248</h3>
              <p className="text-xs text-gray-500">Abonnés actifs</p>
           </div>
        </div>

        {/* Stat Card: Coupons */}
        <div className="glass-panel rounded-[2rem] p-5 flex flex-col justify-between">
           <div className="flex justify-between items-start">
              <Ticket size={20} className="text-gray-400" />
              <span className="text-xs text-orange-500 font-bold">Exp. 2j</span>
           </div>
           <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">85</h3>
              <p className="text-xs text-gray-500">Coupons scannés</p>
           </div>
        </div>
      </div>

      {/* Eko Insight Bar */}
      <div className="glass-panel rounded-2xl p-2 pr-4 flex items-center gap-3 mb-8 hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer border-l-4 border-l-purple-500 shadow-sm relative overflow-hidden">
         {/* Subtle background glow */}
         <div className="absolute right-0 top-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl"></div>
         
         <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
            <EkoBot size="sm" mood="thinking" />
         </div>
         <div className="flex-1 relative z-10">
            <p className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-0.5">Insight Eko</p>
            <p className="text-xs text-gray-600 dark:text-gray-300 font-medium leading-snug">Vos ventes de café baissent le mardi. Lancez une offre flash ?</p>
         </div>
         <ArrowUpRight size={16} className="text-gray-400" />
      </div>

    </div>
  );
};

export default Dashboard;