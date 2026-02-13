import React from 'react';
import { Link } from '../context/ThemeContext';
import { ArrowRight, TrendingUp, Zap, Sparkles } from 'lucide-react';
import Logo from '../components/Logo';
import EkoBot from '../components/EkoBot';

const Landing: React.FC = () => {
  return (
    <div className="h-full bg-gray-900/80 dark:bg-transparent text-white font-sans flex flex-col relative overflow-hidden">

      {/* Aurora background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-30" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse opacity-20" style={{ animationDelay: '1.2s' }}></div>
        <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-25" style={{ animationDelay: '0.8s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse opacity-20" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-purple-300 rounded-full animate-pulse opacity-30" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Header */}
      <div className="pt-8 px-5 flex justify-between items-center relative z-10 animate-fade-in">
        <Logo variant="white" />
        <Link to="/login" className="text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-white transition-colors duration-300">Connexion</Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-5 relative z-10">
        <div className="space-y-12">
           {/* Hero Visual - EkoBot 3D Integration */}
           <div className="relative h-64 w-full flex items-center justify-center perspective-[1000px]">
              {/* Eko Core Aura - enhanced with aurora layers */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-56 h-56 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full blur-[80px] opacity-30 animate-pulse-slow"></div>
                  <div className="absolute w-40 h-40 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-full blur-[60px] opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
              </div>

              {/* Le Personnage EKO */}
              <div className="relative z-20">
                 <EkoBot
                   size="xl"
                   mood="happy"
                   bubbleText="Bienvenue dans le futur du marketing !"
                   showBubble
                   className="drop-shadow-[0_0_40px_rgba(59,130,246,0.6)]"
                 />

                 {/* Orbiting Badge - v3.0 */}
                 <div className="absolute top-0 right-[-44px] gradient-border bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-[10px] font-bold flex items-center gap-1.5 animate-bounce shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                      <Sparkles size={10} className="text-cyan-400" />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-extrabold">v3.0</span>
                  </div>

                 {/* Shimmer ring around Eko */}
                 <div className="absolute inset-[-12px] rounded-full border border-white/10 animate-spin" style={{ animationDuration: '8s' }}>
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full blur-[2px]"></div>
                 </div>
              </div>
           </div>

           <div className="text-center space-y-6 animate-slide-up">
              <h1 className="text-5xl font-extrabold leading-tight tracking-tight">
                 Le Marketing <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 animate-shimmer bg-[length:200%_auto]">Autonome.</span>
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xs mx-auto">
                 Laissez <strong className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Eko</strong>, votre IA dediee, piloter vos campagnes et fideliser vos clients automatiquement.
              </p>
           </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 pb-12 space-y-6 relative z-10 animate-slide-up" style={{animationDelay: '0.2s'}}>
         <Link to="/login" className="w-full py-5 bg-white text-black rounded-2xl font-bold text-lg shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 group transition-all duration-300 hover:scale-[1.02] active:scale-95 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="relative z-10">Commencer</span>
            <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
         </Link>

         <div className="flex justify-center gap-6 text-gray-500">
             <span className="text-xs font-medium flex items-center gap-1 animate-slide-up" style={{ animationDelay: '0.3s' }}>
               <TrendingUp size={12} className="text-green-400" /> +30% Revenus
             </span>
             <span className="text-xs font-medium flex items-center gap-1 animate-slide-up" style={{ animationDelay: '0.4s' }}>
               <Zap size={12} className="text-yellow-400" /> Setup 2min
             </span>
         </div>
      </div>
    </div>
  );
};

export default Landing;
