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
import Layout from './components/Layout';
import ClientLayout from './components/ClientLayout';
import ClientHome from './pages/ClientHome';
import ClientWallet from './pages/ClientWallet';

const App: React.FC = () => {
  return (
    <HashRouter>
      {/* 
        Container Principal 
        bg-[#050505] sert de base, mais on doit s'assurer que les enfants ne le recouvrent pas
      */}
      <div className="max-w-md mx-auto h-[100dvh] relative shadow-2xl overflow-hidden flex flex-col font-sans ring-1 ring-black/5 dark:ring-white/10 transition-colors duration-500 bg-[#050505]">
        
        {/* --- FOND D'ÉCRAN ANIMÉ (Couche Arrière-Plan) --- */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {/* Dégradé léger */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
            
            {/* Blobs Animés (Augmentation de l'opacité pour la visibilité) */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[100px] animate-blob mix-blend-screen"></div>
            <div className="absolute top-[20%] right-[-20%] w-[400px] h-[400px] bg-purple-600/30 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-screen"></div>
            <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px] animate-blob animation-delay-4000 mix-blend-screen"></div>
            
            {/* Grain Noise */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
        </div>

        {/* --- COUCHE DE CONTENU (Premier Plan) --- */}
        {/* z-10 et bg-transparent sont cruciaux ici */}
        <div className="relative z-10 flex-1 h-full overflow-hidden flex flex-col bg-transparent">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            
            {/* Merchant Interface */}
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/coupons" element={<Coupons />} />
              <Route path="/promotions" element={<Promotions />} />
              <Route path="/promotions/:id" element={<PromotionDetails />} />
              <Route path="/subscribers" element={<Subscribers />} />
              <Route path="/assistant" element={<Assistant />} />
              <Route path="/config-offer" element={<QrConfig />} />
              <Route path="/settings" element={<Settings />} />
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