import React, { useState } from 'react';
import { Ticket, QrCode, Clock, Check } from 'lucide-react';
import EkoBot from '../components/EkoBot';

interface WalletCoupon {
  id: string;
  merchant: string;
  offer: string;
  discount: string;
  expiresAt: string;
  color: string;
  used: boolean;
}

const mockCoupons: WalletCoupon[] = [
  { id: '1', merchant: 'Boulangerie du Coin', offer: '1 Baguette Offerte', discount: 'Gratuit', expiresAt: '28 Fev 2026', color: 'from-teal-500 to-emerald-600', used: false },
  { id: '2', merchant: 'Chez Mario Pizza', offer: "-10% sur l'addition", discount: '-10%', expiresAt: '15 Mar 2026', color: 'from-orange-500 to-red-500', used: false },
  { id: '3', merchant: 'Salon Beaute Zen', offer: 'Soin offert des 50€', discount: '-20€', expiresAt: '01 Mar 2026', color: 'from-pink-500 to-purple-500', used: false },
  { id: '4', merchant: 'Librairie Pages', offer: '-15% sur un roman', discount: '-15%', expiresAt: '20 Fev 2026', color: 'from-blue-500 to-indigo-600', used: true },
];

const ClientWallet: React.FC = () => {
  const [coupons, setCoupons] = useState(mockCoupons);
  const [usedToast, setUsedToast] = useState<string | null>(null);

  const activeCoupons = coupons.filter(c => !c.used);
  const primaryCoupon = activeCoupons[0];
  const otherCoupons = coupons.slice(1);

  const handleUse = (id: string) => {
    const coupon = coupons.find(c => c.id === id);
    if (!coupon || coupon.used) return;
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, used: true } : c));
    setUsedToast(coupon.merchant);
    setTimeout(() => setUsedToast(null), 2500);
  };

  return (
    <div className="px-5 pt-6 pb-6 animate-fade-in min-h-full relative">
       {/* Toast */}
       {usedToast && (
         <div className="fixed top-8 left-4 right-4 z-50 animate-slide-up">
           <div className="bg-green-600 text-white px-4 py-3 rounded-2xl text-sm font-bold text-center shadow-lg shadow-green-600/30 flex items-center justify-center gap-2 max-w-lg mx-auto">
             <Check size={16} /> Coupon utilise chez {usedToast}
           </div>
         </div>
       )}

       {/* EkoBot above wallet header */}
       <div className="flex items-center justify-center mb-4 animate-slide-up">
         <div className="relative">
           <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 rounded-full blur-xl animate-pulse-slow -translate-x-2 -translate-y-2"></div>
           <EkoBot size="md" mood="happy" bubbleText={`${activeCoupons.length} coupon${activeCoupons.length > 1 ? 's' : ''} a utiliser !`} showBubble />
         </div>
       </div>

       <header className="mb-8 animate-slide-up" style={{ animationDelay: '0.05s' }}>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mon Wallet</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Vos coupons actifs et cartes de fidelite.</p>
       </header>

       {/* Primary Coupon Card */}
       {primaryCoupon && (
       <div className={`relative w-full aspect-[1.8] rounded-3xl bg-gradient-to-br ${primaryCoupon.color} shadow-2xl shadow-teal-500/30 p-6 text-white overflow-hidden mb-8 group cursor-pointer animate-slide-up`} style={{ animationDelay: '0.1s' }}>
           <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10"></div>

           <div className="relative z-10 h-full flex flex-col justify-between">
               <div className="flex justify-between items-start">
                   <div>
                       <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold inline-block mb-2">
                           {primaryCoupon.merchant}
                       </div>
                       <h2 className="text-2xl font-bold leading-tight">{primaryCoupon.offer}</h2>
                   </div>
                   <QrCode size={40} className="opacity-80" />
               </div>

               <div className="flex justify-between items-end">
                   <div className="flex items-center gap-2">
                       <Clock size={14} className="opacity-80" />
                       <div>
                           <p className="text-xs opacity-80 mb-0.5">Expire le</p>
                           <p className="font-mono font-bold text-sm">{primaryCoupon.expiresAt}</p>
                       </div>
                   </div>
                   <button
                     onClick={() => handleUse(primaryCoupon.id)}
                     className="bg-white text-gray-900 px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg hover:scale-105 active:scale-95 transition-transform"
                   >
                       Utiliser
                   </button>
               </div>
           </div>
       </div>
       )}

       {/* List of other coupons */}
       <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 animate-slide-up" style={{ animationDelay: '0.15s' }}>
         {otherCoupons.some(c => !c.used) ? 'Autres Coupons' : 'Historique'}
       </h3>

       <div className="space-y-4">
           {otherCoupons.map((coupon, i) => (
               <div
                   key={coupon.id}
                   className={`bg-white dark:bg-[#161B28] p-4 rounded-2xl border border-gray-100 dark:border-white/5 flex gap-4 items-center shadow-sm animate-slide-up transition-colors cursor-pointer ${coupon.used ? 'opacity-50' : 'hover:bg-gray-50 dark:hover:bg-white/5'}`}
                   style={{ animationDelay: `${0.15 + (i + 1) * 0.07}s` }}
               >
                   <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${coupon.color} flex items-center justify-center text-white shadow-sm`}>
                       {coupon.used ? <Check size={24} /> : <Ticket size={24} />}
                   </div>
                   <div className="flex-1 min-w-0">
                       <h4 className="font-bold text-gray-900 dark:text-white text-sm truncate">{coupon.merchant}</h4>
                       <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{coupon.offer}</p>
                       <div className="flex items-center gap-1.5 mt-1">
                         <Clock size={10} className="text-gray-400" />
                         <span className="text-[10px] text-gray-400">{coupon.expiresAt}</span>
                         {coupon.used && <span className="text-[10px] font-bold text-gray-400 ml-2 bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded">Utilise</span>}
                       </div>
                   </div>
                   {!coupon.used && (
                     <button
                       onClick={() => handleUse(coupon.id)}
                       className="px-3 py-2 bg-gray-100 dark:bg-white/10 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-white/20 transition active:scale-95"
                     >
                       Utiliser
                     </button>
                   )}
               </div>
           ))}
       </div>
    </div>
  );
};

export default ClientWallet;
