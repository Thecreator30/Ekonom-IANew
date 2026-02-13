import React, { useState, useEffect, useCallback } from 'react';
import { Bell, Ticket, Gift, Filter, Download, Plus, Timer, Percent, X, Check, Hash, FileText, Users } from 'lucide-react';
import { Link } from '../context/ThemeContext';
import EkoBot from '../components/EkoBot';
import { api } from '../services/api';
import { PageSkeleton, InlineError } from '../components/Skeleton';

interface Coupon {
  id: string;
  code: string;
  description: string;
  discount_value: number;
  status: string;
  used_count: number;
  max_uses: number;
}

const Coupons: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterActive, setFilterActive] = useState<'all' | 'ACTIVE' | 'EXPIRED'>('all');
  const [newCoupon, setNewCoupon] = useState({ code: '', description: '', discount_value: 10, max_uses: 100 });

  const fetchCoupons = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await api.get('/api/coupons');
      if (res.success && res.data) {
        setCoupons(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch coupons:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCoupons(); }, [fetchCoupons]);

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    const created: Coupon = {
      id: Date.now().toString(),
      code: newCoupon.code.toUpperCase(),
      description: newCoupon.description,
      discount_value: newCoupon.discount_value,
      status: 'ACTIVE',
      used_count: 0,
      max_uses: newCoupon.max_uses,
    };
    setCoupons(prev => [created, ...prev]);
    setShowCreateModal(false);
    setNewCoupon({ code: '', description: '', discount_value: 10, max_uses: 100 });
    try {
      await api.post('/api/coupons', newCoupon);
    } catch (err) {
      console.error('Failed to save coupon:', err);
    }
  };

  const handleExport = () => {
    const headers = 'Code,Description,Reduction,Statut,Utilises,Max\n';
    const rows = coupons.map(c => `${c.code},${c.description},${c.discount_value}%,${c.status},${c.used_count},${c.max_uses}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'coupons-export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredCoupons = filterActive === 'all' ? coupons : coupons.filter(c => c.status === filterActive);
  const activeCoupons = coupons.filter(c => c.status === 'ACTIVE');
  const totalUsed = coupons.reduce((sum, c) => sum + c.used_count, 0);
  const totalMax = coupons.reduce((sum, c) => sum + c.max_uses, 0);
  const usageRate = totalMax > 0 ? Math.round((totalUsed / totalMax) * 100) : 0;

  if (loading) return <PageSkeleton />;
  if (error && coupons.length === 0) {
    return <InlineError message="Impossible de charger les coupons" onRetry={fetchCoupons} />;
  }

  return (
    <div className="w-full px-5 pt-8 pb-32 animate-fade-in text-gray-900 dark:text-white bg-transparent relative">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium mb-1">Fidelite</p>
          <h1 className="text-2xl font-bold">Coupons</h1>
        </div>
        <Link to="/notifications" className="w-10 h-10 rounded-full bg-white dark:bg-white/5 shadow-sm border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-gray-300 relative hover:bg-gray-50 dark:hover:bg-white/10 transition">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-background-dark rounded-full"></span>
        </Link>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 mb-8 w-full">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-500/20 text-white relative overflow-hidden animate-slide-up" style={{ animationDelay: '0s' }}>
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/20 rounded-full blur-2xl"></div>
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent bg-[length:200%_100%] pointer-events-none"></div>
          <div className="flex items-start justify-between mb-6 relative z-10">
            <Ticket size={20} className="text-blue-100" />
            <span className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded-lg">+12%</span>
          </div>
          <h3 className="text-3xl font-bold mb-1 relative z-10">{activeCoupons.length}</h3>
          <p className="text-blue-100 text-xs font-medium opacity-80 relative z-10">Coupons Actifs</p>
        </div>

        <div className="glass-panel p-4 rounded-2xl relative overflow-hidden flex flex-col justify-between w-full animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-start justify-between mb-4">
            <Gift size={20} className="text-purple-500" />
            <span className="text-[10px] font-bold bg-green-500/10 text-green-500 px-2 py-1 rounded-lg">High</span>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{usageRate}%</h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs font-medium">Taux d'usage</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex gap-3 mb-6 overflow-x-auto no-scrollbar pb-2 w-full animate-slide-up" style={{ animationDelay: '0.15s' }}>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex-shrink-0 flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black px-4 py-3 rounded-xl font-bold text-sm shadow-lg hover:scale-105 transition-transform"
        >
          <Plus size={16} />
          <span>Creer</span>
        </button>
        <button
          onClick={() => setFilterActive(prev => prev === 'all' ? 'ACTIVE' : prev === 'ACTIVE' ? 'EXPIRED' : 'all')}
          className={`flex-shrink-0 flex items-center gap-2 glass-panel px-4 py-3 rounded-xl font-medium text-sm transition ${filterActive !== 'all' ? 'ring-2 ring-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5'}`}
        >
          <Filter size={16} />
          <span>{filterActive === 'all' ? 'Filtres' : filterActive === 'ACTIVE' ? 'Actifs' : 'Expires'}</span>
        </button>
        <button
          onClick={handleExport}
          className="flex-shrink-0 flex items-center gap-2 glass-panel px-4 py-3 rounded-xl font-medium text-sm text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition"
        >
          <Download size={16} />
          <span>Export</span>
        </button>
      </div>

      {/* Coupon List */}
      <div className="space-y-4 w-full">
        {filteredCoupons.map((coupon, index) => {
          const isActive = coupon.status === 'ACTIVE';
          const progressPercent = coupon.max_uses > 0 ? Math.round((coupon.used_count / coupon.max_uses) * 100) : 0;

          if (isActive) {
            return (
              <div key={coupon.id} className="relative group cursor-pointer w-full animate-slide-up" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition"></div>

                <div className="relative bg-white dark:bg-[#1A1F2E] rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden flex w-full gradient-border">
                  <div className="w-24 bg-gradient-to-br from-purple-500 to-indigo-600 flex flex-col items-center justify-center text-white p-2 relative flex-shrink-0">
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-background-light dark:bg-background-dark rounded-full"></div>
                    <Percent size={24} className="mb-1" />
                    <span className="text-xl font-bold">-{coupon.discount_value}%</span>
                    <div className="absolute right-0 top-0 bottom-0 w-[1px] border-r-2 border-dashed border-black/20"></div>
                  </div>

                  <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white truncate">{coupon.code}</h3>
                        <p className="text-xs text-gray-500">{coupon.description}</p>
                      </div>
                      <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[10px] font-bold uppercase rounded-md border border-green-500/20 flex-shrink-0">Actif</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                        <span>Utilisation</span>
                        <span>{coupon.used_count} / {coupon.max_uses}</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full transition-all duration-700" style={{ width: `${progressPercent}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // Expired coupon style
          return (
            <div key={coupon.id} className="relative opacity-70 hover:opacity-100 transition duration-300 cursor-pointer w-full animate-slide-up" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
              <div className="relative bg-white dark:bg-[#1A1F2E] rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden flex w-full">
                <div className="w-24 bg-gray-200 dark:bg-white/5 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 p-2 relative flex-shrink-0">
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-background-light dark:bg-background-dark rounded-full"></div>
                  <Gift size={24} className="mb-1" />
                  <span className="text-xl font-bold">-{coupon.discount_value}%</span>
                  <div className="absolute right-0 top-0 bottom-0 w-[1px] border-r-2 border-dashed border-gray-300 dark:border-white/10"></div>
                </div>

                <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white truncate">{coupon.code}</h3>
                      <p className="text-xs text-gray-500">{coupon.description}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-gray-100 dark:bg-white/10 text-gray-400 text-[10px] font-bold uppercase rounded-md flex-shrink-0">Expire</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                    <Timer size={14} />
                    <span>{coupon.used_count} / {coupon.max_uses} utilises</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* EkoBot */}
      <div className="fixed bottom-28 right-6 z-30 animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <EkoBot
          size="md"
          mood="thinking"
          bubbleText="Un coupon expire bientot !"
          showBubble
          className="drop-shadow-[0_0_20px_rgba(139,92,246,0.4)]"
        />
      </div>

      {/* Create Coupon Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCreateModal(false)}></div>
          <div className="bg-white dark:bg-[#1A1F2E] w-full max-w-sm rounded-3xl p-6 relative z-10 shadow-2xl border border-white/10 animate-slide-up gradient-border">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Nouveau Coupon</h3>
              <button onClick={() => setShowCreateModal(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 transition">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Code</label>
                <div className="relative">
                  <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={newCoupon.code}
                    onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                    placeholder="Ex: SUMMER25"
                    className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-11 pr-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary uppercase"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Description</label>
                <div className="relative">
                  <FileText size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={newCoupon.description}
                    onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
                    placeholder="Ex: Offre speciale ete"
                    className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-11 pr-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Reduction %</label>
                  <div className="relative">
                    <Percent size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={newCoupon.discount_value}
                      onChange={(e) => setNewCoupon({ ...newCoupon, discount_value: Number(e.target.value) })}
                      className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-11 pr-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase ml-1">Limite</label>
                  <div className="relative">
                    <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      min={1}
                      value={newCoupon.max_uses}
                      onChange={(e) => setNewCoupon({ ...newCoupon, max_uses: Number(e.target.value) })}
                      className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-11 pr-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 transition active:scale-95 relative overflow-hidden">
                  <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent bg-[length:200%_100%] pointer-events-none"></div>
                  <Check size={18} className="relative z-10" />
                  <span className="relative z-10">Creer le coupon</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Coupons;
