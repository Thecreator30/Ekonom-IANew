import React, { useState, useEffect, useCallback } from 'react';
import { Users, TrendingUp, Search, Filter, Bell, UserPlus, X, Check, Mail, User } from 'lucide-react';
import { Link } from '../context/ThemeContext';
import EkoBot from '../components/EkoBot';
import { api } from '../services/api';
import { PageSkeleton, InlineError } from '../components/Skeleton';

const Subscribers: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const colorPalette = [
    "from-blue-400 to-blue-600",
    "from-purple-400 to-pink-600",
    "from-emerald-400 to-teal-600",
    "from-orange-400 to-red-500",
  ];

  const formatDate = (dateStr: string): string => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  const getInitials = (name: string): string =>
    name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();

  // Etat initial des abonnes (charge depuis l'API)
  const [subscribers, setSubscribers] = useState<any[]>([]);

  const fetchSubscribers = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await api.get('/api/subscribers');
      if (res.success && Array.isArray(res.data)) {
        const mapped = res.data.map((sub: any, i: number) => ({
          name: sub.name,
          email: sub.email,
          date: formatDate(sub.joined_at),
          active: sub.push_enabled,
          initials: getInitials(sub.name),
          color: colorPalette[i % colorPalette.length],
        }));
        setSubscribers(mapped);
      }
    } catch (err) {
      console.error('Failed to fetch subscribers:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSubscribers(); }, [fetchSubscribers]);

  const handleAddSubscriber = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newUser.name || !newUser.email) return;

      const initials = getInitials(newUser.name);
      const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];

      const newSub = {
          name: newUser.name,
          email: newUser.email,
          date: "A l'instant",
          active: true,
          initials: initials,
          color: randomColor
      };

      // Update local state immediately for responsiveness
      setSubscribers([newSub, ...subscribers]);
      setNewUser({ name: '', email: '' });
      setIsModalOpen(false);

      // Also persist via API (fire-and-forget with error logging)
      try {
          await api.post('/api/subscribers', { name: newSub.name, email: newSub.email });
      } catch (err) {
          console.error('Failed to save subscriber to API:', err);
      }
  };

  if (loading) return <PageSkeleton />;
  if (error && subscribers.length === 0) {
    return <InlineError message="Impossible de charger les abonnes" onRetry={fetchSubscribers} />;
  }

  return (
    <div className="h-full bg-transparent pb-20 animate-fade-in relative">
        {/* Ambient background */}
        <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-indigo-900/10 to-transparent pointer-events-none"></div>

        {/* Header - px-5 */}
        <header className="px-5 pt-10 pb-6 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-400 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <Users size={20} className="text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Abonnes</h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Gestion de l'audience</p>
                </div>
            </div>
            <Link to="/notifications" className="w-10 h-10 rounded-full flex items-center justify-center glass-panel shadow-sm border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
                <Bell size={20} />
            </Link>
        </header>

        {/* Stats Card with EkoBot - px-5 */}
        <section className="px-5 mb-6 relative z-10">
            <div className="glass-panel gradient-border backdrop-blur-md border border-gray-200 dark:border-white/5 rounded-2xl p-5 relative overflow-hidden group animate-slide-up" style={{ animationDelay: '0s' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
                {/* Shimmer overlay */}
                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent bg-[length:200%_100%] pointer-events-none"></div>
                <div className="relative z-10 flex justify-between items-end">
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 font-medium">Total Abonnes</p>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{subscribers.length.toLocaleString()}</h2>
                        <div className="flex items-center mt-2 text-green-500 text-xs font-semibold bg-green-500/10 w-fit px-2 py-1 rounded-lg">
                            <TrendingUp size={14} className="mr-1" />
                            +12% cette semaine
                        </div>
                    </div>
                    <div className="flex items-end gap-3">
                        {/* Simple SVG Chart */}
                        <div className="h-12 w-24">
                            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50">
                                <defs>
                                    <linearGradient id="chartGradient" x1="0" x2="1" y1="0" y2="0">
                                        <stop offset="0%" stopColor="#3B82F6" />
                                        <stop offset="100%" stopColor="#D946EF" />
                                    </linearGradient>
                                </defs>
                                <path d="M0 40 Q 25 45, 50 20 T 100 10" fill="none" stroke="url(#chartGradient)" strokeLinecap="round" strokeWidth="3" />
                            </svg>
                        </div>
                        {/* EkoBot in stats area */}
                        <EkoBot size="sm" mood="happy" bubbleText="12 nouveaux cette semaine !" />
                    </div>
                </div>
            </div>
        </section>

        {/* Search Bar - px-5 */}
        <section className="px-5 mb-4 flex gap-3 relative z-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Rechercher un abonne..."
                    className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-black/20 border-none ring-1 ring-gray-200 dark:ring-white/10 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary transition shadow-sm backdrop-blur-sm"
                />
            </div>
            <button className="px-3.5 rounded-xl glass-panel ring-1 ring-gray-200 dark:ring-white/10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-white/40 dark:hover:bg-white/5 transition-colors shadow-sm">
                <Filter size={18} />
            </button>
        </section>

        {/* List - px-5 */}
        <section className="px-5 relative z-10 animate-slide-up" style={{ animationDelay: '0.15s' }}>
            <div className="glass-panel rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 overflow-hidden backdrop-blur-sm">
                <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50/50 dark:bg-white/5 border-b border-gray-200 dark:border-white/5 text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div className="col-span-6">Nom de l'abonne</div>
                    <div className="col-span-3 text-center">Date</div>
                    <div className="col-span-3 text-right">Statut Push</div>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-white/5">
                    {subscribers.map((user, i) => (
                        <div key={i} className="grid grid-cols-12 gap-2 px-4 py-3 items-center hover:bg-white/40 dark:hover:bg-white/5 transition-colors cursor-pointer group animate-slide-up" style={{ animationDelay: `${0.2 + i * 0.05}s` }}>
                            <div className="col-span-6 flex items-center gap-3 overflow-hidden">
                                {(user as any).img ? (
                                    <img src={(user as any).img} alt={user.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-white dark:ring-surface-dark" />
                                ) : (
                                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${user.color} flex items-center justify-center text-white text-[10px] font-bold shadow-sm`}>
                                        {user.initials}
                                    </div>
                                )}
                                <div className="overflow-hidden">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user.name}</p>
                                    <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                                </div>
                            </div>
                            <div className="col-span-3 text-center">
                                <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-2 py-1 rounded-md">
                                    {user.date}
                                </span>
                            </div>
                            <div className="col-span-3 flex justify-end">
                                <div className={`w-9 h-5 rounded-full relative transition-colors cursor-pointer ${user.active ? 'bg-secondary' : 'bg-gray-300 dark:bg-gray-700'}`}>
                                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm transition-all ${user.active ? 'right-1' : 'left-1'}`}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-4 flex justify-center">
                <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-primary transition font-medium flex items-center gap-1">
                    Voir plus d'abonnes
                </button>
            </div>
        </section>

        {/* FAB */}
        <button
            onClick={() => setIsModalOpen(true)}
            className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-purple-500/40 hover:scale-105 active:scale-95 transition-transform z-30 border-2 border-white dark:border-surface-dark"
        >
            <UserPlus size={24} />
        </button>

        {/* Add Subscriber Modal */}
        {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
                <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={() => setIsModalOpen(false)}
                ></div>
                <div className="bg-white dark:bg-[#1A1F2E] w-full max-w-sm rounded-3xl p-6 relative z-10 shadow-2xl border border-white/10 animate-slide-up gradient-border">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Ajouter un client</h3>
                        <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 transition">
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleAddSubscriber} className="space-y-4">
                        <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.05s' }}>
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Nom complet</label>
                            <div className="relative">
                                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                                    placeholder="Ex: Jean Dupont"
                                    className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-11 pr-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                                    placeholder="jean@mail.com"
                                    className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-11 pr-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-2 animate-slide-up" style={{ animationDelay: '0.15s' }}>
                            <button type="submit" className="w-full py-4 bg-primary hover:bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition active:scale-95 relative overflow-hidden group">
                                {/* Shimmer */}
                                <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent bg-[length:200%_100%] pointer-events-none"></div>
                                <Check size={18} className="relative z-10" />
                                <span className="relative z-10">Enregistrer</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </div>
  );
};

export default Subscribers;
