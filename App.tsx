import React from 'react';
import { HashRouter, Routes, Route, Navigate } from './context/ThemeContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Coupons from './pages/Coupons';
import Promotions from './pages/Promotions';
import PromotionDetails from './pages/PromotionDetails';
import Subscribers from './pages/Subscribers';
import Assistant from './pages/Assistant';
import QrConfig from './pages/QrConfig';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import Layout from './components/Layout';
import ClientLayout from './components/ClientLayout';
import ClientHome from './pages/ClientHome';
import ClientWallet from './pages/ClientWallet';

const App: React.FC = () => {
  return (
    <HashRouter>
      {/* 
        Container Principal 
        Mise à jour : Passage à max-w-lg (512px) pour élargir l'application
        Hauteur adaptée sur desktop (md:h-[85vh] md:max-h-[900px])
        et ajout de md:rounded-[2.5rem] pour le look "device".
      */}
      <div className="max-w-lg mx-auto h-[100dvh] md:h-[85vh] md:max-h-[900px] relative shadow-2xl overflow-hidden flex flex-col font-sans ring-1 ring-black/5 dark:ring-white/10 transition-colors duration-500 bg-gray-50 dark:bg-[#050505] text-gray-900 dark:text-white md:rounded-[2.5rem] border-0 md:border md:border-white/5">
        
        {/* --- FOND D'ÉCRAN ANIMÉ (Couche Arrière-Plan) --- */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {/* Dégradé léger adapté au mode clair/sombre */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 dark:to-black/20"></div>
            
            {/* Blobs Animés */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 dark:bg-blue-600/30 rounded-full blur-[100px] animate-blob mix-blend-multiply dark:mix-blend-screen"></div>
            <div className="absolute top-[20%] right-[-20%] w-[400px] h-[400px] bg-purple-600/20 dark:bg-purple-600/30 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen"></div>
            <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-emerald-500/20 dark:bg-emerald-500/20 rounded-full blur-[120px] animate-blob animation-delay-4000 mix-blend-multiply dark:mix-blend-screen"></div>
            
            {/* REFLETS ANIMÉS (Nouveau) */}
            <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none">
                <div className="absolute top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-reflection"></div>
            </div>
            
            {/* Grain Noise - Opacité réduite */}
            <div className="absolute inset-0 opacity-10 dark:opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
        </div>

        {/* --- COUCHE DE CONTENU (Premier Plan) --- */}
        <div className="relative z-10 flex-1 h-full overflow-hidden flex flex-col bg-transparent">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            
            {/* Route Assistant déplacée hors du Layout */}
            <Route path="/assistant" element={<Assistant />} />

            {/* Merchant Interface */}
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/coupons" element={<Coupons />} />
              <Route path="/promotions" element={<Promotions />} />
              <Route path="/promotions/:id" element={<PromotionDetails />} />
              <Route path="/subscribers" element={<Subscribers />} />
              <Route path="/config-offer" element={<QrConfig />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/notifications" element={<Notifications />} />
            </Route>

            {/* Client Interface */}
            <Route path="/client" element={<ClientLayout />}>
               <Route path="home" element={<ClientHome />} />
               <Route path="wallet" element={<ClientWallet />} />
               <Route index element={<Navigate to="home" replace />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
};

export default App;