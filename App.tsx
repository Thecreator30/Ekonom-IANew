import React from 'react';
import { HashRouter, Routes, Route, Navigate } from './context/ThemeContext';
import { useAuth } from './context/AuthContext';
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

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <HashRouter>
        <div className="max-w-lg mx-auto h-[100dvh] md:h-[85vh] md:max-h-[900px] relative shadow-2xl overflow-hidden flex flex-col font-sans ring-1 ring-black/5 dark:ring-white/10 transition-colors duration-500 bg-gray-50 dark:bg-[#050505] text-gray-900 dark:text-white md:rounded-[2.5rem] border-0 md:border md:border-white/5">

          {/* === FOND ANIME AURORA v3.0 === */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 dark:to-black/30"></div>

              {/* Aurora Mesh Gradients */}
              <div className="absolute top-[-20%] left-[-15%] w-[600px] h-[600px] bg-blue-600/15 dark:bg-blue-600/25 rounded-full blur-[120px] animate-aurora mix-blend-multiply dark:mix-blend-screen"></div>
              <div className="absolute top-[10%] right-[-25%] w-[500px] h-[500px] bg-purple-600/15 dark:bg-purple-600/20 rounded-full blur-[100px] animate-aurora-2 mix-blend-multiply dark:mix-blend-screen"></div>
              <div className="absolute bottom-[-15%] left-[10%] w-[700px] h-[700px] bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-[140px] animate-aurora-3 mix-blend-multiply dark:mix-blend-screen"></div>
              <div className="absolute top-[50%] right-[10%] w-[300px] h-[300px] bg-pink-500/10 dark:bg-pink-500/10 rounded-full blur-[80px] animate-blob mix-blend-multiply dark:mix-blend-screen"></div>

              {/* Floating Particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white/20 dark:bg-white/10 rounded-full animate-particle"
                    style={{
                      left: `${15 + i * 15}%`,
                      animationDelay: `${i * 3}s`,
                      animationDuration: `${15 + i * 5}s`,
                    }}
                  />
                ))}
              </div>

              {/* Reflection sweep */}
              <div className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none">
                  <div className="absolute top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-reflection"></div>
              </div>

              {/* Grain Noise */}
              <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
          </div>

          {/* === CONTENU === */}
          <div className="relative z-10 flex-1 h-full overflow-hidden flex flex-col bg-transparent">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />

              <Route path="/assistant" element={<ProtectedRoute><Assistant /></ProtectedRoute>} />

              <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/coupons" element={<Coupons />} />
                <Route path="/promotions" element={<Promotions />} />
                <Route path="/promotions/:id" element={<PromotionDetails />} />
                <Route path="/subscribers" element={<Subscribers />} />
                <Route path="/config-offer" element={<QrConfig />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/notifications" element={<Notifications />} />
              </Route>

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
