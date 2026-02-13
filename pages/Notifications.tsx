import React, { useState } from 'react';
import { ArrowLeft, Check, Bell, User, Tag, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useNavigate } from '../context/ThemeContext';
import EkoBot from '../components/EkoBot';

const Notifications: React.FC = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'subscriber',
      title: 'Nouvel abonne',
      message: 'Sophie Martin vient de rejoindre votre programme de fidelite.',
      time: 'Il y a 5 min',
      read: false,
      icon: User,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      type: 'promo',
      title: 'Campagne terminee',
      message: 'La campagne "Soldes d\'Ete" est terminee. Voir les resultats.',
      time: 'Il y a 2h',
      read: false,
      icon: Tag,
      color: 'bg-purple-500'
    },
    {
      id: 3,
      type: 'system',
      title: 'Mise a jour reussie',
      message: 'Votre application a ete mise a jour vers la version 2.0.4.',
      time: 'Hier',
      read: true,
      icon: Check,
      color: 'bg-green-500'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Stock faible',
      message: 'Attention, le stock de "Sac en toile" est inferieur a 10.',
      time: 'Hier',
      read: true,
      icon: AlertTriangle,
      color: 'bg-orange-500'
    }
  ]);

  const allRead = notifications.every(n => n.read);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="w-full min-h-full bg-transparent px-5 pb-20 animate-fade-in flex flex-col">
       <header className="pt-8 pb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate('/dashboard')} className="p-2 -ml-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition">
                    <ArrowLeft size={24} className="text-gray-900 dark:text-white" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
            </div>
            <button
                onClick={markAllRead}
                className="text-xs font-bold text-blue-500 hover:text-blue-400 transition"
            >
                Tout lire
            </button>
        </header>

        {/* All-read empty state */}
        {allRead && (
            <div className="flex flex-col items-center justify-center py-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="relative mb-4">
                    <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse-slow"></div>
                    <EkoBot size="lg" mood="happy" bubbleText="Tout est sous controle !" showBubble />
                </div>
                <div className="glass-panel rounded-2xl p-6 text-center max-w-xs mt-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400/20 to-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                        <CheckCircle2 size={24} className="text-green-500" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">Tout est lu !</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Aucune notification en attente. Eko veille sur tout.</p>
                </div>
            </div>
        )}

        <div className="space-y-4">
            {notifications.map((notif, index) => (
                <div
                    key={notif.id}
                    className={`glass-panel p-4 rounded-2xl flex gap-4 items-start transition-all hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer animate-slide-up ${!notif.read ? 'border-l-4 border-l-blue-500' : ''}`}
                    style={{ animationDelay: `${index * 0.07}s` }}
                >
                    <div className={`w-10 h-10 rounded-full ${notif.read ? 'bg-gray-100 dark:bg-white/5 text-gray-400' : `${notif.color}/10 ${notif.color.replace('bg-', 'text-')}`} flex items-center justify-center flex-shrink-0 transition-colors duration-300`}>
                        <notif.icon size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                            <h3 className={`text-sm font-bold ${notif.read ? 'text-gray-600 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>{notif.title}</h3>
                            <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{notif.time}</span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{notif.message}</p>
                    </div>
                    {!notif.read && (
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 animate-pulse"></div>
                    )}
                </div>
            ))}
        </div>

        {/* Footer with EkoBot */}
        <div className="mt-8 flex flex-col items-center gap-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {!allRead && (
                <EkoBot size="sm" mood="happy" bubbleText="Tout est sous controle !" />
            )}
            <p className="text-xs text-gray-400">Vous avez vu toutes vos notifications recentes.</p>
        </div>
    </div>
  );
};

export default Notifications;