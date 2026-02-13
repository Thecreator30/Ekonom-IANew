import React from 'react';
import { Ticket, QrCode, MoreVertical } from 'lucide-react';

const ClientWallet: React.FC = () => {
  return (
    <div className="px-5 pt-6 pb-6 animate-fade-in min-h-full">
       <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mon Wallet</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Vos coupons actifs et cartes de fidélité.</p>
       </header>

       {/* Active Coupon Card */}
       <div className="relative w-full aspect-[1.8] rounded-3xl bg-gradient-to-br from-teal-500 to-emerald-600 shadow-2xl shadow-teal-500/30 p-6 text-white overflow-hidden mb-8 group cursor-pointer">
           <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10"></div>
           
           <div className="relative z-10 h-full flex flex-col justify-between">
               <div className="flex justify-between items-start">
                   <div>
                       <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold inline-block mb-2">
                           Boulangerie du Coin
                       </div>
                       <h2 className="text-2xl font-bold leading-tight">1 Baguette<br/>Offerte</h2>
                   </div>
                   <QrCode size={40} className="opacity-80" />
               </div>
               
               <div className="flex justify-between items-end">
                   <div>
                       <p className="text-xs opacity-80 mb-1">Expire le</p>
                       <p className="font-mono font-bold">12 OCT 2024</p>
                   </div>
                   <button className="bg-white text-teal-600 px-4 py-2 rounded-xl text-xs font-bold shadow-lg">
                       Utiliser
                   </button>
               </div>
           </div>
       </div>

       {/* List of other coupons */}
       <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Autres Coupons</h3>
       
       <div className="space-y-4">
           {[1, 2, 3].map((i) => (
               <div key={i} className="bg-white dark:bg-[#161B28] p-4 rounded-2xl border border-gray-100 dark:border-white/5 flex gap-4 items-center shadow-sm">
                   <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-400">
                       <Ticket size={24} />
                   </div>
                   <div className="flex-1">
                       <h4 className="font-bold text-gray-900 dark:text-white text-sm">Chez Mario Pizza</h4>
                       <p className="text-xs text-gray-500 dark:text-gray-400">-10% sur l'addition</p>
                   </div>
                   <button className="text-gray-400">
                       <MoreVertical size={20} />
                   </button>
               </div>
           ))}
       </div>
    </div>
  );
};

export default ClientWallet;