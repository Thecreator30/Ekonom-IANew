import React from 'react';
import { Outlet, useLocation, Link } from '../context/ThemeContext';
import { Home, Ticket, Megaphone, Users } from 'lucide-react';
import EkoBot from './EkoBot';
import PageTransition from './PageTransition';
import ErrorBoundary from './ErrorBoundary';

const Layout: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Accueil' },
    { path: '/coupons', icon: Ticket, label: 'Coupons' },
    null, // Eko center placeholder
    { path: '/subscribers', icon: Users, label: 'Clients' },
    { path: '/promotions', icon: Megaphone, label: 'Promos' },
  ];

  return (
    <div className="flex flex-col h-full w-full bg-transparent relative overflow-hidden">

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar custom-scrollbar relative z-10 pb-28 w-full">
        <ErrorBoundary>
          <PageTransition>
            <Outlet />
          </PageTransition>
        </ErrorBoundary>
      </div>

      {/* Floating Dynamic Dock v3.0 */}
      <div className="absolute bottom-5 left-4 right-4 z-50 animate-slide-up">
        <nav className="glass-dock rounded-2xl px-2 py-2.5 flex justify-between items-center relative transition-all duration-300">

          {navItems.map((item, index) => {
            if (!item) {
              // Eko Center Button
              return (
                <Link key="eko" to="/assistant" className="relative -top-7 group flex flex-col items-center justify-center z-30 outline-none" aria-label="Ouvrir Eko">
                  {/* Glow */}
                  <div className="absolute top-2 w-14 h-14 bg-gradient-to-r from-blue-500/40 to-purple-500/40 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse-slow pointer-events-none"></div>

                  <div className="relative z-10 transform transition-all duration-300 group-active:scale-95 group-hover:-translate-y-2">
                     <EkoBot size="md" mood="happy" bubbleText="Besoin de moi ?" className="scale-125 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] filter contrast-125" />
                  </div>

                  <span className="absolute -bottom-7 text-[9px] font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">EKO</span>
                </Link>
              );
            }

            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link key={item.path} to={item.path} className="relative group w-14 h-12 flex flex-col items-center justify-center">
                {/* Active background */}
                <div className={`absolute inset-1 rounded-xl transition-all duration-300 ${active ? 'bg-primary/10 dark:bg-white/[0.08] shadow-inner-glow' : 'opacity-0 group-hover:opacity-100 bg-black/5 dark:bg-white/5'}`}></div>

                {/* Active glow under icon */}
                {active && (
                  <div className="absolute -bottom-1 w-6 h-3 bg-primary/40 rounded-full blur-md"></div>
                )}

                <Icon
                  size={21}
                  className={`relative z-10 transition-all duration-300 ${active ? 'text-primary dark:text-white drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'}`}
                  strokeWidth={active ? 2.5 : 1.8}
                />

                {/* Active dot */}
                {active && (
                  <div className="absolute -bottom-0.5 w-1 h-1 bg-primary rounded-full shadow-[0_0_6px_rgba(59,130,246,0.8)]"></div>
                )}
              </Link>
            );
          })}

        </nav>
      </div>
    </div>
  );
};

export default Layout;
