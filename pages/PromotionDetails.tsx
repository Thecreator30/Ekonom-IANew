import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from '../context/ThemeContext';
import { ArrowLeft, Share2, Download, Copy, Calendar, BarChart, ExternalLink, ShieldCheck, Loader2 } from 'lucide-react';
import { api } from '../services/api';

const PromotionDetails: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [promo, setPromo] = useState<any>(null);
    const [qrToken, setQrToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch Promo Details - Logique Antigravity
                const promoRes = await api.get(`/api/promotions/${id}`);
                if (promoRes.success) {
                    setPromo(promoRes.data);
                }
                
                // Fetch Signed QR Token - Logique Antigravity
                const qrRes = await api.get(`/api/promotions/${id}/qr`);
                if (qrRes.success) {
                    setQrToken(qrRes.token);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchData();
    }, [id]);

    const targetUrl = `https://ekonom-ia.app/promo/${id}?t=${qrToken || ''}`;
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(targetUrl)}&color=000000&bgcolor=ffffff&format=svg`;

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center bg-transparent">
                <Loader2 className="animate-spin text-primary" size="32" />
            </div>
        );
    }

    if (!promo) return <div className="p-6 text-center text-gray-500">Promotion introuvable.</div>;

    return (
        <div className="h-full bg-transparent pb-6 animate-fade-in relative flex flex-col">
             {/* Header */}
            <header className="px-5 pt-10 pb-6 flex items-center justify-between relative z-10">
                <button onClick={() => navigate('/promotions')} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition">
                    <ArrowLeft size="24" className="text-gray-900 dark:text-white" />
                </button>
                <h1 className="text-base font-bold text-gray-900 dark:text-white">Détails Promotion</h1>
                <div className="w-10"></div> {/* Spacer */}
            </header>

            <main className="px-5 flex-1 overflow-y-auto no-scrollbar pb-24 space-y-6">
                
                {/* Promo Info Card - Glassmorphism UI */}
                <div className="glass-panel p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                    
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 mb-3 border border-green-200 dark:border-green-500/20">
                        {promo.status === 'active' ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                    
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">{promo.title}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{promo.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500 font-medium pt-4 border-t border-gray-100 dark:border-white/5">
                        <span className="flex items-center gap-1.5">
                            <Calendar size="14" /> 
                            {new Date(promo.end_date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <BarChart size="14" /> 
                            {promo.stats?.clicks || 0} Vues
                        </span>
                    </div>
                </div>

                {/* Specific QR Code Section */}
                <div className="flex flex-col items-center">
                    <div className="bg-white p-4 rounded-[2rem] shadow-xl shadow-blue-500/10 border-4 border-white dark:border-white/10 relative group transition-all duration-500 hover:scale-[1.02]">
                         {/* HMAC Badge */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-black text-[9px] font-bold px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1 z-10 ring-2 ring-white dark:ring-black">
                            <ShieldCheck size="10" /> HMAC SIGNED
                        </div>

                        <div className="relative overflow-hidden rounded-2xl">
                            <img src={qrImageUrl} alt="QR Promotion" className="w-56 h-56 mix-blend-multiply opacity-90" />
                            {/* Scanning Line Animation */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.6)] animate-scan"></div>
                        </div>
                    </div>
                    
                    <p className="mt-4 text-xs text-gray-400 text-center max-w-[200px]">
                        Ce QR Code est unique à cette promotion et sécurisé par signature cryptographique.
                    </p>
                </div>

                {/* Link Box */}
                <div className="glass-panel rounded-xl p-3 flex items-center gap-3 border border-gray-200 dark:border-white/5">
                    <div className="p-2 bg-white/50 dark:bg-white/10 rounded-lg text-gray-500">
                        <ExternalLink size="16" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Lien Direct</p>
                        <p className="text-xs text-gray-900 dark:text-white truncate font-mono">{targetUrl}</p>
                    </div>
                    <button className="text-primary hover:bg-white/10 p-2 rounded-lg transition">
                        <Copy size="16" />
                    </button>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center py-3.5 glass-panel border border-gray-200 dark:border-white/10 rounded-xl text-sm font-bold text-gray-700 dark:text-white shadow-sm hover:bg-white/40 dark:hover:bg-white/5 transition">
                        <Share2 size="18" className="mr-2" />
                        Partager
                    </button>
                    <button className="flex items-center justify-center py-3.5 bg-black dark:bg-white text-white dark:text-black rounded-xl text-sm font-bold shadow-lg hover:opacity-90 transition">
                        <Download size="18" className="mr-2" />
                        Sauvegarder
                    </button>
                </div>

            </main>
        </div>
    );
};

export default PromotionDetails;