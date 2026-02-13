import React from 'react';
import { Link } from '../context/ThemeContext';
import { Sparkles, ArrowRight, TrendingUp, Zap } from 'lucide-react';
import Logo from '../components/Logo';

const Landing: React.FC = () => {
  return (
    <div className="h-full bg-transparent text-white font-sans flex flex-col relative overflow-hidden">
      
      {/* Header */}
      <div className="pt-8 px-6 flex justify-between items-center relative z-10 animate-fade-in">
        <Logo variant="white" />
        <Link to="/login" className="text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-white transition">Connexion</Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-6 relative z-10">
        <div className="space-y-12">
           {/* Hero Visual - Holographic Card */}
           <div className="relative h-64 w-full flex items-center justify-center perspective-[1000px] animate-float">
              {/* Eko Core */}
              <div className="relative w-40 h-40">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-[40px] opacity-60 animate-pulse-slow"></div>
                  <div className="relative w-full h-full bg-black/40 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.3)]">
                      <Sparkles size={60} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                  </div>
                  
                  {/* Orbiting Elements */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-xs font-bold flex items-center gap-2 animate-bounce">
                      <Zap size={12} className="text-yellow-400" /> Eko IA v2.0
                  </div>
              </div>
           </div>

           <div className="text-center space-y-6 animate-slide-up">
              <h1 className="text-5xl font-extrabold leading-tight tracking-tight">
                 Le Marketing <br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-shimmer bg-[length:200%_auto]">Autonome.</span>
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xs mx-auto">
                 Laissez Eko piloter vos campagnes, fidéliser vos clients et booster votre chiffre d'affaires.
              </p>
           </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 pb-12 space-y-6 relative z-10 animate-slide-up" style={{animationDelay: '0.2s'}}>
         <Link to="/login" className="w-full py-5 bg-white text-black rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 group transition-all hover:scale-[1.02] active:scale-95">
            Commencer <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
         </Link>
         
         <div className="flex justify-center gap-6 text-gray-500">
             <span className="text-xs font-medium flex items-center gap-1"><TrendingUp size={12} /> +30% Revenus</span>
             <span className="text-xs font-medium flex items-center gap-1"><Zap size={12} /> Setup 2min</span>
         </div>
      </div>
    </div>
  );
};

export default Landing;