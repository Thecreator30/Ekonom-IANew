import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from '../context/ThemeContext';
import { Search, Plus, Calendar, BarChart3, Clock, ArrowRight, MoreHorizontal, Sparkles } from 'lucide-react';
import EkoBot from '../components/EkoBot';
import { api } from '../services/api';
import { PageSkeleton, InlineError } from '../components/Skeleton';

const FALLBACK_IMAGES: Record<string, string> = {
  'sales-v1': "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80",
  'flash-rentree': "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80",
  'noel-2023': "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=400&q=80",
};
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=400&q=80";

const Promotions: React.FC = () => {
  const navigate = useNavigate();

  const [promotions, setPromotions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPromotions = useCallback(() => {
    setLoading(true);
    setError(false);
    api.get('/api/promotions').then((res) => {
      if (res.success && Array.isArray(res.data)) {
        setPromotions(res.data);
      }
    }).catch(() => setError(true)).finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchPromotions(); }, [fetchPromotions]);

  const activePromo = promotions.find((p) => p.status === 'PUBLISHED') || null;
  const historyPromos = promotions.filter((p) => p.status !== 'PUBLISHED');

  if (loading) return <PageSkeleton />;
  if (error && promotions.length === 0) {
    return <InlineError message="Impossible de charger les campagnes" onRetry={fetchPromotions} />;
  }

  return (
    <div className="w-full px-5 pt-8 pb-32 animate-fade-in text-gray-900 dark:text-white bg-transparent">

        {/* Header */}
        <header className="flex justify-between items-center mb-8 relative z-10 w-full">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Campagnes</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Gerez vos temps forts</p>
            </div>
            <div className="flex gap-3">
                <button onClick={() => navigate('/assistant')} className="w-10 h-10 rounded-full bg-black dark:bg-white text-white dark:text-black shadow-lg shadow-purple-500/20 flex items-center justify-center hover:scale-105 transition-transform">
                    <Plus size={24} />
                </button>
            </div>
        </header>

        {/* Active Campaign Spotlight (Hero Card) */}
        {activePromo && (
        <div className="mb-10 relative group cursor-pointer w-full animate-slide-up" style={{ animationDelay: '0s' }} onClick={() => navigate(`/promotions/${activePromo.id}`)}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] blur opacity-20 group-hover:opacity-30 transition duration-500"></div>

            <div className="relative h-64 w-full rounded-[2rem] overflow-hidden shadow-2xl gradient-border">
                {/* Background Image with Overlay */}
                <img src={FALLBACK_IMAGES[activePromo.id] || DEFAULT_IMAGE} alt="Campaign" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80"></div>
                {/* Shimmer sweep */}
                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent bg-[length:200%_100%] pointer-events-none"></div>

                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> En cours
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10">
                            <MoreHorizontal size={16} />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-2 text-blue-300 text-xs font-bold uppercase tracking-widest">
                            <Clock size={12} /> {activePromo.description || `-${activePromo.discount_value}%`}
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2 leading-tight">{activePromo.title}</h2>

                        {/* Stats Row */}
                        <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                                    <BarChart3 size={14} />
                                </div>
                                <div>
                                    <span className="text-lg font-bold text-white block leading-none">{activePromo.stats.clicks}</span>
                                    <span className="text-[10px] text-gray-400">Clics</span>
                                </div>
                            </div>
                            <div className="w-px h-8 bg-white/10"></div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                                    <Sparkles size={14} />
                                </div>
                                <div>
                                    <span className="text-lg font-bold text-white block leading-none">{activePromo.stats.clicks > 0 ? (activePromo.stats.conversions / activePromo.stats.clicks * 100).toFixed(0) : 0}%</span>
                                    <span className="text-[10px] text-gray-400">Conv.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )}

        {/* History / Drafts Grid */}
        <div className="w-full">
            <div className="flex justify-between items-center mb-5 px-1 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Historique</h3>
                    {/* EkoBot in history header */}
                    <EkoBot size="sm" mood="happy" bubbleText="Belle performance !" />
                </div>
                <button className="text-xs text-blue-500 hover:text-blue-400 transition font-medium flex items-center gap-1">
                    Voir tout <ArrowRight size={12} />
                </button>
            </div>

            <div className="space-y-4 w-full">
                {historyPromos.map((promo, index) => (
                    <div
                        key={promo.id}
                        onClick={() => navigate(`/promotions/${promo.id}`)}
                        className="glass-panel p-2 rounded-2xl flex items-center gap-4 hover:bg-black/5 dark:hover:bg-white/5 transition group active:scale-[0.98] cursor-pointer pr-4 overflow-hidden w-full animate-slide-up"
                        style={{ animationDelay: `${0.15 + index * 0.1}s` }}
                    >
                        {/* Mini Image Thumbnail */}
                        <div className="w-20 h-20 rounded-xl overflow-hidden relative flex-shrink-0">
                            <img src={FALLBACK_IMAGES[promo.id] || DEFAULT_IMAGE} alt={promo.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/20"></div>
                        </div>

                        <div className="flex-1 min-w-0 py-1">
                            <h4 className="font-bold text-base text-gray-900 dark:text-white truncate mb-1">{promo.title}</h4>
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 font-medium">
                                    {promo.status === 'ARCHIVED' ? 'Archivee' : promo.status === 'DRAFT' ? 'Brouillon' : promo.status}
                                </span>
                                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                    <Calendar size={10} /> {promo.created_at ? new Date(promo.created_at).getFullYear() : ''}
                                </span>
                            </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                            <span className="block text-sm font-bold text-gray-900 dark:text-white">{promo.stats.clicks > 0 ? (promo.stats.conversions / promo.stats.clicks * 100).toFixed(0) : 0}%</span>
                            <span className="text-[10px] text-gray-500">Conv.</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default Promotions;
