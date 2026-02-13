
import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Bell, Tag, Clock, Share2, Download, Link as LinkIcon, Copy, Palette, Layout, Save, RefreshCw, ShieldCheck, Scan, Ticket, CheckCircle } from 'lucide-react';
import { useNavigate } from '../context/ThemeContext';
import { api } from '../services/api';

const QrConfig: React.FC = () => {
  const navigate = useNavigate();
  const [qrColor, setQrColor] = useState('3B82F6'); // Default Blue
  const [selectedFrame, setSelectedFrame] = useState('gradient');
  
  // Data State - Conservation de la logique Antigravity
  const [isLoading, setIsLoading] = useState(false);
  const [discountValue, setDiscountValue] = useState(10);
  const [discountType, setDiscountType] = useState('percent');
  const [duration, setDuration] = useState('30_days');
  const [signedToken, setSignedToken] = useState<string | null>(null);
  const [stats, setStats] = useState({ scans: 0, generated: 0, redeemed: 0 });

  const colors = [
    { hex: '000000', tw: 'bg-black' },
    { hex: '3B82F6', tw: 'bg-blue-500' },
    { hex: '8B5CF6', tw: 'bg-violet-500' },
    { hex: 'EC4899', tw: 'bg-pink-500' },
    { hex: '10B981', tw: 'bg-emerald-500' },
  ];

  const frames = [
      { id: 'simple', label: 'Minimal' },
      { id: 'gradient', label: 'Neon' },
      { id: 'glass', label: 'Glass' },
  ];

  const fetchConfig = useCallback(async () => {
      try {
          setIsLoading(true);
          const configRes = await api.get('/api/welcome-offer');
          if (configRes.success && configRes.data) {
              setDiscountValue(configRes.data.discount_value);
              setDiscountType(configRes.data.discount_type);
              setStats({
                scans: configRes.data.scans_count || 0,
                generated: configRes.data.coupons_generated || 0,
                redeemed: configRes.data.coupons_redeemed || 0
              });
          }
          
          const qrRes = await api.get('/api/welcome-offer/qr');
          if (qrRes.success && qrRes.token) {
              setSignedToken(qrRes.token);
          }
      } catch (error) {
          console.error("Failed to fetch offer data", error);
      } finally {
          setIsLoading(false);
      }
  }, []);

  useEffect(() => {
      fetchConfig();
  }, [fetchConfig]);

  const handleSave = async () => {
      try {
          setIsLoading(true);
          await api.put('/api/welcome-offer', {
              discountValue,
              discountType,
              isActive: true
          });
          await fetchConfig();
      } catch (error) {
          console.error("Failed to save", error);
      } finally {
          setIsLoading(false);
      }
  };

  // Construct the secure URL
  const targetUrl = `https://ekonom-ia.app/claim?t=${signedToken || 'loading'}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(targetUrl)}&color=${qrColor}`;

  return (
    <div className="h-full bg-transparent pb-6 animate-fade-in relative overflow-hidden flex flex-col">
        {/* Glow Effects */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>
        </div>

        {/* Header */}
        <header className="px-6 pt-10 pb-6 flex items-center justify-between relative z-10 flex-shrink-0">
            <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition">
                <ArrowLeft size="24" className="text-gray-700 dark:text-gray-200" />
            </button>
            <h1 className="text-base font-bold tracking-wide text-gray-900 dark:text-white">Offre de Bienvenue</h1>
            <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition relative">
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background-light dark:border-background-dark"></span>
                <Bell size="24" className="text-gray-700 dark:text-gray-200" />
            </button>
        </header>

        <main className="px-6 relative z-10 flex-1 overflow-y-auto no-scrollbar pb-24">
            <div className="mb-6 text-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-[10px] font-bold uppercase tracking-wide mb-4 border border-blue-200 dark:border-blue-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                    Boostez vos abonnés
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 leading-tight">
                    Configurez votre <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">QR Code Magique</span>
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                    Personnalisez le code pour votre marque.
                </p>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="glass-panel p-3 rounded-2xl flex flex-col items-center justify-center border border-white/10">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-2">
                        <Scan size="16" />
                    </div>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{stats.scans}</span>
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Scans</span>
                </div>
                <div className="glass-panel p-3 rounded-2xl flex flex-col items-center justify-center border border-white/10">
                    <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 mb-2">
                        <Ticket size="16" />
                    </div>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{stats.generated}</span>
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Générés</span>
                </div>
                <div className="glass-panel p-3 rounded-2xl flex flex-col items-center justify-center border border-white/10">
                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-2">
                        <CheckCircle size="16" />
                    </div>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{stats.redeemed}</span>
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Utilisés</span>
                </div>
            </div>

            {/* Config Form */}
            <div className="glass-panel backdrop-blur-xl rounded-3xl p-6 mb-8 shadow-xl border border-white/50 dark:border-white/5 relative">
                 {/* Security Badge */}
                 <div className="absolute -top-3 right-6 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-lg flex items-center gap-1">
                    <ShieldCheck size="12" /> SECURED HMAC
                 </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Pourcentage de réduction
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Tag size="20" className="text-gray-400" />
                            </div>
                            <input 
                                type="number" 
                                value={discountValue}
                                onChange={(e) => setDiscountValue(Number(e.target.value))}
                                className="block w-full pl-10 pr-12 py-3 bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-gray-900 dark:text-white placeholder-gray-400 text-lg font-bold transition-colors" 
                            />
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                <span className="text-gray-500 dark:text-gray-400 font-bold">%</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Durée de validité
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Clock size="20" className="text-gray-400" />
                            </div>
                            <select 
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="block w-full pl-10 pr-10 py-3 bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary text-gray-900 dark:text-white text-base font-medium transition-colors appearance-none cursor-pointer"
                            >
                                <option value="24_hours">24 heures</option>
                                <option value="48_hours">48 heures</option>
                                <option value="1_week">1 semaine</option>
                                <option value="30_days">30 jours</option>
                                <option value="unlimited">Illimité</option>
                            </select>
                        </div>
                    </div>

                    {/* QR Customization */}
                    <div className="pt-4 border-t border-gray-100 dark:border-white/5">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                            <Palette size="16" /> Couleur
                        </label>
                        <div className="flex gap-3">
                            {colors.map((c) => (
                                <button
                                    key={c.hex}
                                    onClick={() => setQrColor(c.hex)}
                                    className={`w-10 h-10 rounded-full ${c.tw} shadow-sm transition-transform hover:scale-110 flex items-center justify-center ${qrColor === c.hex ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-offset-gray-900 scale-110' : ''}`}
                                >
                                    {qrColor === c.hex && <div className="w-2.5 h-2.5 bg-white rounded-full shadow-sm" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                            <Layout size="16" /> Style du Cadre
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {frames.map((f) => (
                                <button
                                    key={f.id}
                                    onClick={() => setSelectedFrame(f.id)}
                                    className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${selectedFrame === f.id ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30' : 'bg-white/20 dark:bg-white/5 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:bg-white/40 dark:hover:bg-white/10'}`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleSave}
                        className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:opacity-90 transition flex items-center justify-center gap-2"
                    >
                        {isLoading ? <RefreshCw className="animate-spin" size="18" /> : <Save size="18" />}
                        Sauvegarder la configuration
                    </button>
                </div>
            </div>

            {/* QR Preview */}
            <div className="flex flex-col items-center justify-center mb-8 min-h-[260px]">
                {selectedFrame === 'gradient' && (
                     <div className="relative p-0.5 rounded-[1.6rem] bg-gradient-to-br from-blue-500 to-purple-500 shadow-2xl shadow-purple-500/20 mb-6 transition-all duration-500 animate-fade-in">
                        <div className="bg-white p-4 rounded-[1.5rem]">
                             <img 
                                src={qrUrl}
                                alt="QR Code" 
                                className="w-48 h-48 rounded-lg mix-blend-multiply opacity-90"
                             />
                        </div>
                    </div>
                )}
                {selectedFrame === 'simple' && (
                     <div className="relative p-4 rounded-[1.6rem] bg-white border-4 border-gray-100 dark:border-white/10 shadow-lg mb-6 transition-all duration-500 animate-fade-in">
                         <img 
                            src={qrUrl}
                            alt="QR Code" 
                            className="w-48 h-48 rounded-lg"
                         />
                    </div>
                )}
                 {selectedFrame === 'glass' && (
                     <div className="relative p-6 rounded-[1.6rem] bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl mb-6 transition-all duration-500 animate-fade-in">
                         <div className="bg-white/90 p-2 rounded-xl">
                            <img 
                                src={qrUrl}
                                alt="QR Code" 
                                className="w-48 h-48 rounded-lg mix-blend-multiply"
                            />
                         </div>
                    </div>
                )}
                
                <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center space-x-3 max-w-full">
                    <LinkIcon size="14" className="text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-500 dark:text-gray-400 truncate font-mono">
                        {signedToken ? `...${signedToken.substring(0, 20)}...` : 'Generating token...'}
                    </span>
                    <button className="text-primary hover:text-blue-400 transition ml-auto">
                        <Copy size="14" />
                    </button>
                </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-4 pb-8">
                <button className="flex items-center justify-center px-4 py-3.5 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-200 font-semibold hover:bg-white/40 dark:hover:bg-white/5 transition-colors glass-panel shadow-sm">
                    <Share2 size="20" className="mr-2" />
                    Partager
                </button>
                <button className="flex items-center justify-center px-4 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg shadow-purple-500/30 hover:opacity-90 active:scale-95 transition-all">
                    <Download size="20" className="mr-2" />
                    Télécharger
                </button>
            </div>
        </main>
    </div>
  );
};

export default QrConfig;
