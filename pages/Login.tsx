import React, { useState } from 'react';
import { useNavigate } from '../context/ThemeContext';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowLeft, Store, User, Sparkles, ShieldCheck } from 'lucide-react';
import Logo from '../components/Logo';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'merchant' | 'client'>('merchant');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('token', 'demo-token-123');
      if (userType === 'merchant') {
        navigate('/dashboard');
      } else {
        navigate('/client/home');
      }
    }, 1000);
  };

  return (
    <div className="h-full bg-transparent flex flex-col relative overflow-hidden">
      
      {/* Header */}
      <div className="px-5 pt-10 pb-4 relative z-10 flex justify-between items-center animate-fade-in">
        <button onClick={() => navigate('/')} className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-600 dark:text-gray-300 transition hover:bg-black/5 dark:hover:bg-white/10 group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </button>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 backdrop-blur-md">
            <ShieldCheck size={12} className="text-green-500" />
            <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Secured</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-5 flex flex-col justify-center pb-10 relative z-10">
         <div className="mb-10 flex flex-col items-center text-center animate-slide-up">
            <div className="relative mb-6 animate-float">
                 <div className="absolute inset-0 bg-blue-500/30 blur-2xl rounded-full"></div>
                 <Logo size="xl" className="relative z-10" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
                {userType === 'merchant' ? 'Espace Pro' : 'Espace Client'}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-[260px]">
                Connectez-vous à l'OS marketing le plus avancé du marché.
            </p>
         </div>

         {/* Glass Card Container */}
         <div className="glass-panel p-1 rounded-3xl animate-slide-up" style={{animationDelay: '0.1s'}}>
             <div className="bg-white/50 dark:bg-black/40 backdrop-blur-xl rounded-[1.25rem] p-6 border border-white/20 dark:border-white/5 shadow-2xl">
                 
                 {/* Role Switcher */}
                 <div className="flex p-1 bg-gray-100/50 dark:bg-white/5 rounded-xl mb-6 relative">
                    <button 
                        onClick={() => setUserType('merchant')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 relative z-10 ${userType === 'merchant' ? 'bg-white dark:bg-[#1A1F2E] text-blue-600 dark:text-blue-400 shadow-sm ring-1 ring-black/5 dark:ring-white/10' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                    >
                        <Store size={16} />
                        Marchand
                    </button>
                    <button 
                        onClick={() => setUserType('client')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 relative z-10 ${userType === 'client' ? 'bg-white dark:bg-[#1A1F2E] text-purple-600 dark:text-purple-400 shadow-sm ring-1 ring-black/5 dark:ring-white/10' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                    >
                        <User size={16} />
                        Client
                    </button>
                 </div>

                 <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-1.5">
                       <label className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-1 uppercase tracking-wide">Email</label>
                       <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                             <Mail size={18} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                          </div>
                          <input 
                            type="email" 
                            placeholder={userType === 'merchant' ? "boutique@example.com" : "client@example.com"}
                            className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-[#111]/50 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm font-medium"
                            required
                          />
                       </div>
                    </div>

                    <div className="space-y-1.5">
                       <div className="flex justify-between items-center ml-1">
                          <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Mot de passe</label>
                          <a href="#" className="text-[10px] font-bold text-blue-500 hover:text-blue-400 transition">Oublié ?</a>
                       </div>
                       <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                             <Lock size={18} className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                          </div>
                          <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••" 
                            className="block w-full pl-11 pr-12 py-3.5 bg-gray-50 dark:bg-[#111]/50 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400/70 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm font-medium"
                            required
                          />
                          <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                       </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className={`w-full py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all mt-6 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden ${
                          userType === 'merchant' 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-blue-600/30' 
                          : 'bg-gradient-to-r from-emerald-500 to-teal-600 shadow-emerald-600/30'
                      }`}
                    >
                       <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                       {isLoading ? <Loader2 size={20} className="animate-spin" /> : (
                           <>
                            <span>Se connecter</span>
                            <Sparkles size={16} className="opacity-70 group-hover:rotate-12 transition-transform" />
                           </>
                       )}
                    </button>
                 </form>
             </div>
         </div>

         <div className="mt-8 text-center animate-fade-in">
            <p className="text-gray-500 dark:text-gray-400 text-xs font-medium">
               Pas encore de compte ? <a href="#" className={`font-bold hover:underline ${userType === 'merchant' ? 'text-blue-500' : 'text-emerald-500'}`}>Créer un compte</a>
            </p>
         </div>
      </div>
    </div>
  );
};

export default Login;