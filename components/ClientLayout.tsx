import React from 'react';
import { Outlet, useLocation, Link } from '../context/ThemeContext';
import { Home, Wallet, User, ScanLine } from 'lucide-react';

const ClientLayout: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col h-full w-full bg-transparent relative">
      {/* Client Specific Background Accents - Optional, can remove if you want pure global BG */}
      {/* Kept subtle to differentiate client mode but allows global BG to bleed through */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-[80px] mix-blend-screen"></div>
        <div className="absolute bottom-40 -left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] mix-blend-screen"></div>
      </div>

      {/* Main Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative z-10 pb-24">
        <Outlet />
      </div>

      {/* Bottom Navigation for Client */}
      <nav className="absolute bottom-0 left-0 right-0 z-50 glass-dock backdrop-blur-lg border-t border-gray-200 dark:border-white/5 pb-safe pt-2 px-6">
        <div className="flex justify-between items-center h-16">
          <Link to="/client/home" className={`flex flex-col items-center justify-center w-12 transition-all duration-300 ${isActive('/client/home') ? 'text-teal-600 dark:text-teal-400 scale-110' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}>
            <Home size={24} strokeWidth={isActive('/client/home') ? 2.5 : 2} />
            <span className="text-[10px] font-medium mt-1">Explorer</span>
          </Link>
          
          {/* Scan Center Button */}
          <button className="relative -top-6 group">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 text-white shadow-xl shadow-teal-500/40 flex items-center justify-center transform transition-all group-active:scale-95 border-[6px] border-white dark:border-[#050505]">
               <ScanLine size={28} className="stroke-[2.5]" />
            </div>
          </button>

          <Link to="/client/wallet" className={`flex flex-col items-center justify-center w-12 transition-all duration-300 ${isActive('/client/wallet') ? 'text-teal-600 dark:text-teal-400 scale-110' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}>
            <Wallet size={24} strokeWidth={isActive('/client/wallet') ? 2.5 : 2} />
            <span className="text-[10px] font-medium mt-1">Wallet</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default ClientLayout;