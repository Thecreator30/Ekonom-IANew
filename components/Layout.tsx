import React from 'react';
import { Outlet, useLocation, Link } from '../context/ThemeContext';
import { Home, Ticket, Megaphone, Users, Sparkles } from 'lucide-react';

const Layout: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col h-full w-full bg-transparent relative overflow-hidden">
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar relative z-10 pb-28">
        <Outlet />
      </div>

      {/* Floating Dynamic Dock */}
      <div className="absolute bottom-6 left-4 right-4 z-50 animate-slide-up">
        <nav className="glass-dock rounded-2xl px-2 py-3 flex justify-between items-center relative transition-all duration-300">
          
          <Link to="/dashboard" className="relative group w-14 h-12 flex items-center justify-center">
            <div className={`absolute inset-0 bg-black/5 dark:bg-white/5 rounded-xl transition-all duration-300 ${isActive('/dashboard') ? 'opacity-100 scale-100' : 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-90'}`}></div>
            <Home size={22} className={`relative z-10 transition-colors duration-300 ${isActive('/dashboard') ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-500'}`} strokeWidth={isActive('/dashboard') ? 2.5 : 2} />
            {isActive('/dashboard') && <div className="absolute -bottom-1 w-1 h-1 bg-black dark:bg-white rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)] dark:shadow-[0_0_8px_white]"></div>}
          </Link>
          
          <Link to="/coupons" className="relative group w-14 h-12 flex items-center justify-center">
            <div className={`absolute inset-0 bg-black/5 dark:bg-white/5 rounded-xl transition-all duration-300 ${isActive('/coupons') ? 'opacity-100 scale-100' : 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-90'}`}></div>
            <Ticket size={22} className={`relative z-10 transition-colors duration-300 ${isActive('/coupons') ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-500'}`} strokeWidth={isActive('/coupons') ? 2.5 : 2} />
            {isActive('/coupons') && <div className="absolute -bottom-1 w-1 h-1 bg-black dark:bg-white rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)] dark:shadow-[0_0_8px_white]"></div>}
          </Link>

          {/* Eko Button (Center) */}
          <Link to="/assistant" className="relative -top-6 group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse-slow"></div>
            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-[#0F0F0F] border border-gray-100 dark:border-white/10 relative flex items-center justify-center shadow-2xl transform transition-transform duration-300 group-active:scale-95 group-hover:-translate-y-1">
               <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <Sparkles size={28} className="text-gray-900 dark:text-white fill-gray-900/10 dark:fill-white/20" />
            </div>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">EKO</span>
          </Link>

          <Link to="/subscribers" className="relative group w-14 h-12 flex items-center justify-center">
            <div className={`absolute inset-0 bg-black/5 dark:bg-white/5 rounded-xl transition-all duration-300 ${isActive('/subscribers') ? 'opacity-100 scale-100' : 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-90'}`}></div>
            <Users size={22} className={`relative z-10 transition-colors duration-300 ${isActive('/subscribers') ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-500'}`} strokeWidth={isActive('/subscribers') ? 2.5 : 2} />
             {isActive('/subscribers') && <div className="absolute -bottom-1 w-1 h-1 bg-black dark:bg-white rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)] dark:shadow-[0_0_8px_white]"></div>}
          </Link>

          <Link to="/promotions" className="relative group w-14 h-12 flex items-center justify-center">
             <div className={`absolute inset-0 bg-black/5 dark:bg-white/5 rounded-xl transition-all duration-300 ${isActive('/promotions') ? 'opacity-100 scale-100' : 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-90'}`}></div>
            <Megaphone size={22} className={`relative z-10 transition-colors duration-300 ${isActive('/promotions') ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-500'}`} strokeWidth={isActive('/promotions') ? 2.5 : 2} />
             {isActive('/promotions') && <div className="absolute -bottom-1 w-1 h-1 bg-black dark:bg-white rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)] dark:shadow-[0_0_8px_white]"></div>}
          </Link>

        </nav>
      </div>
    </div>
  );
};

export default Layout;