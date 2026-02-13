import React from 'react';
import { ArrowLeft, Check, Bell, User, Tag, AlertTriangle } from 'lucide-react';
import { useNavigate } from '../context/ThemeContext';

const Notifications: React.FC = () => {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      type: 'subscriber',
      title: 'Nouvel abonné',
      message: 'Sophie Martin vient de rejoindre votre programme de fidélité.',
      time: 'Il y a 5 min',
      read: false,
      icon: User,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      type: 'promo',
      title: 'Campagne terminée',
      message: 'La campagne "Soldes d\'Été" est terminée. Voir les résultats.',
      time: 'Il y a 2h',
      read: false,
      icon: Tag,
      color: 'bg-purple-500'
    },
    {
      id: 3,
      type: 'system',
      title: 'Mise à jour réussie',
      message: 'Votre application a été mise à jour vers la version 2.0.4.',
      time: 'Hier',
      read: true,
      icon: Check,
      color: 'bg-green-500'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Stock faible',
      message: 'Attention, le stock de "Sac en toile" est inférieur à 10.',
      time: 'Hier',
      read: true,
      icon: AlertTriangle,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="w-full min-h-full bg-transparent px-5 pb-20 animate-fade-in flex flex-col">
       <header className="pt-8 pb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate('/dashboard')} className="p-2 -ml-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition">
                    <ArrowLeft size={24} className="text-gray-900 dark:text-white" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
            </div>
            <button className="text-xs font-bold text-blue-500 hover:text-blue-400 transition">
                Tout lire
            </button>
        </header>

        <div className="space-y-4">
            {notifications.map((notif) => (
                <div key={notif.id} className={`glass-panel p-4 rounded-2xl flex gap-4 items-start transition-all hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer ${!notif.read ? 'border-l-4 border-l-blue-500' : ''}`}>
                    <div className={`w-10 h-10 rounded-full ${notif.read ? 'bg-gray-100 dark:bg-white/5 text-gray-400' : `${notif.color}/10 ${notif.color.replace('bg-', 'text-')}`} flex items-center justify-center flex-shrink-0`}>
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
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                    )}
                </div>
            ))}
        </div>
        
        <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">Vous avez vu toutes vos notifications récentes.</p>
        </div>
    </div>
  );
};

export default Notifications;