import React, { useState, useEffect, useCallback } from 'react';
import { Link } from '../context/ThemeContext';
import { Users, Ticket, ArrowUpRight, Plus, Activity, Bell, Sparkles } from 'lucide-react';
import EkoBot from '../components/EkoBot';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { SkeletonPulse, InlineError } from '../components/Skeleton';

interface DashboardStats {
  revenue: number;
  revenueGrowth: number;
  subscribers: number;
  newSubscribers: number;
  activeCoupons: number;
  couponExpiringSoon: number;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await api.get('/api/dashboard/stats');
      if (res.success && res.data) {
        setStats(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard stats:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  const currentHour = new Date().getHours();
  let greeting = "Bonjour";
  if (currentHour >= 18) greeting = "Bonsoir";

  const displayName = user?.company_name?.split(' ')[0] || 'Alex';

  return (
    <div className="px-5 pt-8 animate-fade-in text-gray-900 dark:text-white pb-24">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8">
        <Link to="/settings" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-black border border-black/5 dark:border-white/10 flex items-center justify-center overflow-hidden transition-transform group-active:scale-95">
             <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80" alt="Avatar" className="w-full h-full object-cover opacity-90" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">{greeting}, {displayName}</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.company_name || 'Boutique St-Honore'} &bull; <span className="text-green-500 font-medium">Ouvert</span></p>
          </div>
        </Link>
        <Link to="/notifications" className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center relative hover:bg-gray-50 dark:hover:bg-white/10 transition shadow-sm">
          <Bell size={20} className="text-gray-600 dark:text-gray-300" />
          <span className="absolute top-2.5 right-3 w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_red]"></span>
        </Link>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-2 gap-4 mb-6">

        {/* Main Stat Card - Spans 2 cols - gradient-border added */}
        <div className="col-span-2 glass-panel gradient-border rounded-[2rem] p-6 relative overflow-hidden group animate-slide-up" style={{ animationDelay: '0s' }}>
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 dark:bg-primary/20 rounded-full blur-[80px] group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition duration-700"></div>
           {/* Shimmer overlay */}
           <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent bg-[length:200%_100%] pointer-events-none"></div>
           <div className="relative z-10 flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Chiffre d'affaires (Est.)</p>
                {loading ? <SkeletonPulse className="h-10 w-40 mt-1" /> : (
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">{stats?.revenue?.toLocaleString('fr-FR')}&euro;</h2>
                )}
                <div className="flex items-center gap-2 mt-2">
                   {loading ? <SkeletonPulse className="h-5 w-20" /> : (
                     <span className="px-2 py-0.5 rounded-full bg-green-500/10 dark:bg-green-500/20 border border-green-500/20 text-green-600 dark:text-green-400 text-xs font-bold flex items-center">
                       <ArrowUpRight size={12} className="mr-1" /> +{stats?.revenueGrowth}%
                     </span>
                   )}
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
                <div key={i} className="flex-1 bg-gray-900 dark:bg-white rounded-t-sm transition-all duration-500 hover:bg-primary hover:opacity-100" style={{height: `${h}%`, animationDelay: `${i * 0.05}s`}}></div>
              ))}
           </div>
        </div>

        {/* Action Card 1: New Promo */}
        <Link to="/config-offer" className="glass-panel rounded-[2rem] p-5 relative overflow-hidden group hover:border-blue-500/20 transition-all active:scale-98 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="w-10 h-10 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3 border border-blue-500/10 dark:border-blue-500/20">
               <Plus size={20} />
            </div>
            <h3 className="font-bold text-lg leading-tight mb-1 text-gray-900 dark:text-white">Creer<br/>Offre</h3>
            <p className="text-xs text-gray-500">QR Code & Promo</p>
        </Link>

        {/* Action Card 2: Eko Insight */}
        <Link to="/assistant" className="glass-panel rounded-[2rem] p-5 relative overflow-hidden group hover:border-purple-500/20 transition-all active:scale-98 animate-slide-up" style={{ animationDelay: '0.15s' }}>
             <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>

             {/* EkoBot Integration - enlarged */}
             <div className="mb-3">
               <EkoBot size="lg" mood="happy" bubbleText="Des idees pour toi !" className="scale-75 origin-top-left" />
             </div>

            <h3 className="font-bold text-lg leading-tight mb-1 text-gray-900 dark:text-white">Demander<br/>a Eko</h3>
            <p className="text-xs text-gray-500">Assistant IA</p>
        </Link>

        {/* Stat Card: Subscribers */}
        <div className="glass-panel rounded-[2rem] p-5 flex flex-col justify-between animate-slide-up" style={{ animationDelay: '0.2s' }}>
           <div className="flex justify-between items-start">
              <Users size={20} className="text-gray-400" />
              {loading ? <SkeletonPulse className="h-4 w-8" /> : (
                <span className="text-xs text-green-500 font-bold">+{stats?.newSubscribers}</span>
              )}
           </div>
           <div>
              {loading ? <SkeletonPulse className="h-7 w-16 mb-1" /> : (
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.subscribers?.toLocaleString('fr-FR')}</h3>
              )}
              <p className="text-xs text-gray-500">Abonnes actifs</p>
           </div>
        </div>

        {/* Stat Card: Coupons */}
        <div className="glass-panel rounded-[2rem] p-5 flex flex-col justify-between animate-slide-up" style={{ animationDelay: '0.25s' }}>
           <div className="flex justify-between items-start">
              <Ticket size={20} className="text-gray-400" />
              {loading ? <SkeletonPulse className="h-4 w-12" /> : (
                <span className="text-xs text-orange-500 font-bold">Exp. {stats?.couponExpiringSoon}j</span>
              )}
           </div>
           <div>
              {loading ? <SkeletonPulse className="h-7 w-10 mb-1" /> : (
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats?.activeCoupons}</h3>
              )}
              <p className="text-xs text-gray-500">Coupons scannes</p>
           </div>
        </div>
      </div>

      {/* Eko Insight Bar - enhanced with bigger Eko */}
      <div className="glass-panel gradient-border rounded-2xl p-3 pr-4 flex items-center gap-4 mb-8 hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer border-l-4 border-l-purple-500 shadow-sm relative overflow-hidden animate-slide-up" style={{ animationDelay: '0.3s' }}>
         {/* Subtle background glow */}
         <div className="absolute right-0 top-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl"></div>
         {/* Shimmer sweep */}
         <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-purple-500/5 to-transparent bg-[length:200%_100%] pointer-events-none"></div>

         <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
            <EkoBot size="md" mood="thinking" bubbleText="J'ai une suggestion !" />
         </div>
         <div className="flex-1 relative z-10">
            <p className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-0.5 flex items-center gap-1">
              <Sparkles size={10} /> Insight Eko
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300 font-medium leading-snug">Vos ventes de cafe baissent le mardi. Lancez une offre flash ?</p>
         </div>
         <ArrowUpRight size={16} className="text-gray-400" />
      </div>

    </div>
  );
};

export default Dashboard;
