import React from 'react';
import { Outlet, useLocation, Link } from '../context/ThemeContext';
import { Home, Wallet } from 'lucide-react';
import EkoBot from './EkoBot';

const ClientLayout: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col h-full w-full bg-transparent relative">
      {/* Client Specific Background Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-[80px] mix-blend-screen"></div>
        <div className="absolute bottom-40 -left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] mix-blend-screen"></div>
      </div>

      {/* Main Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative z-10 pb-28">
        <Outlet />
      </div>

      {/* Bottom Navigation with Eko Center */}
      <div className="absolute bottom-6 left-4 right-4 z-50 animate-slide-up">
        <nav className="glass-dock rounded-2xl px-2 py-3 flex justify-between items-center relative transition-all duration-300">

          <Link to="/client/home" className="relative group w-14 h-12 flex items-center justify-center">
            <div className={`absolute inset-0 bg-black/5 dark:bg-white/5 rounded-xl transition-all duration-300 ${isActive('/client/home') ? 'opacity-100 scale-100' : 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-90'}`}></div>
            <Home size={22} className={`relative z-10 transition-colors duration-300 ${isActive('/client/home') ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-500'}`} strokeWidth={isActive('/client/home') ? 2.5 : 2} />
            {isActive('/client/home') && <div className="absolute -bottom-1 w-1 h-1 bg-black dark:bg-white rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)] dark:shadow-[0_0_8px_white]"></div>}
          </Link>

          {/* Eko Center Button - mirrors merchant Layout */}
          <Link to="/assistant" className="relative -top-8 group flex flex-col items-center justify-center z-30 outline-none" aria-label="Ouvrir l'Assistant Eko">
            {/* Glow effect behind the character */}
            <div className="absolute top-2 w-16 h-16 bg-teal-500/40 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse-slow pointer-events-none"></div>

            {/* The Bot itself acting as the button */}
            <div className="relative z-10 transform transition-all duration-300 group-active:scale-95 group-hover:-translate-y-2">
               <EkoBot size="md" mood="happy" className="scale-125 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] filter contrast-125" />
            </div>

            <span className="absolute -bottom-8 text-[10px] font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">EKO</span>
          </Link>

          <Link to="/client/wallet" className="relative group w-14 h-12 flex items-center justify-center">
            <div className={`absolute inset-0 bg-black/5 dark:bg-white/5 rounded-xl transition-all duration-300 ${isActive('/client/wallet') ? 'opacity-100 scale-100' : 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-90'}`}></div>
            <Wallet size={22} className={`relative z-10 transition-colors duration-300 ${isActive('/client/wallet') ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-500'}`} strokeWidth={isActive('/client/wallet') ? 2.5 : 2} />
            {isActive('/client/wallet') && <div className="absolute -bottom-1 w-1 h-1 bg-black dark:bg-white rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)] dark:shadow-[0_0_8px_white]"></div>}
          </Link>

        </nav>
      </div>
    </div>
  );
};

export default ClientLayout;