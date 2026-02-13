import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, User, Copy, ThumbsUp, RotateCcw, Edit2, Check, X, Sparkles, Zap, TrendingUp, MessageSquare, Gift } from 'lucide-react';
import { useNavigate } from '../context/ThemeContext';
import { generatePromotionContent } from '../services/geminiService';
import EkoBot from '../components/EkoBot';

interface Message {
  id: string;
  role: 'user' | 'eko';
  content: string;
  type?: 'text' | 'promo-card';
  data?: any;
}

const PromoCard: React.FC<{
  data: { title: string; description: string };
  onUpdate: (newData: { title: string; description: string }) => void;
  onUse: () => void;
}> = ({ data, onUpdate, onUse }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localData, setLocalData] = useState(data);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const handleSave = () => {
    onUpdate(localData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalData(data);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-[#151515] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden p-1 w-full animate-fade-in shadow-sm">
        <div className="bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:to-black rounded-xl p-4 border border-gray-100 dark:border-white/5 relative">
           <div className="space-y-4 relative z-10">
            <div className="space-y-1">
                <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Titre</label>
                <input
                    className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                    value={localData.title}
                    onChange={(e) => setLocalData({...localData, title: e.target.value})}
                />
            </div>
            <div className="space-y-1">
                <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Description</label>
                <textarea
                    className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none h-24 leading-relaxed"
                    value={localData.description}
                    onChange={(e) => setLocalData({...localData, description: e.target.value})}
                />
            </div>
            <div className="flex gap-2 pt-2">
                 <button onClick={handleCancel} className="flex-1 py-2.5 bg-gray-200 dark:bg-white/5 hover:bg-gray-300 dark:hover:bg-white/10 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-400 border border-transparent dark:border-white/10 transition flex items-center justify-center gap-2">
                    <X size="14" /> Annuler
                 </button>
                 <button onClick={handleSave} className="flex-1 py-2.5 bg-green-600 hover:bg-green-500 rounded-xl text-xs font-bold text-white shadow-lg shadow-green-900/20 transition flex items-center justify-center gap-2">
                    <Check size="14" /> Valider
                 </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#151515] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden p-1 w-full shadow-sm">
        <div className="bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:to-black rounded-xl p-5 border border-gray-100 dark:border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px]"></div>

            <h3 className="font-bold text-lg text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-gray-400 mb-2">{data.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{data.description}</p>

            <div className="flex gap-2">
                <button
                    onClick={() => setIsEditing(true)}
                    className="px-3 py-2 bg-gray-200 dark:bg-white/5 hover:bg-gray-300 dark:hover:bg-white/10 rounded-lg text-gray-600 dark:text-gray-300 border border-transparent dark:border-white/10 transition flex items-center justify-center"
                    title="Editer le contenu"
                >
                    <Edit2 size="16" />
                </button>
                <button
                    onClick={() => { navigator.clipboard.writeText(`${data.title}\n${data.description}`); }}
                    className="flex-1 py-2 bg-gray-200 dark:bg-white/5 hover:bg-gray-300 dark:hover:bg-white/10 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-300 border border-transparent dark:border-white/10 transition flex items-center justify-center gap-2"
                >
                    <Copy size="14" /> <span className="hidden sm:inline">Copier</span>
                </button>
                <button
                    onClick={onUse}
                    className="flex-[2] py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-xs font-bold text-white shadow-lg transition hover:opacity-90 flex items-center justify-center gap-2"
                >
                    <ThumbsUp size="14" /> Utiliser
                </button>
            </div>
        </div>
    </div>
  );
};

const Assistant: React.FC = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [usedPromo, setUsedPromo] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestionChips = [
    { label: "Creer une promo", icon: Zap, prompt: "Cree une promotion flash pour ce weekend" },
    { label: "Booster mes ventes", icon: TrendingUp, prompt: "Comment booster mes ventes cette semaine ?" },
    { label: "Message clients", icon: MessageSquare, prompt: "Redige un message pour mes clients fideles" },
    { label: "Offre speciale", icon: Gift, prompt: "Propose une offre speciale pour les nouveaux abonnes" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const updateMessageData = (id: string, newData: any) => {
    setMessages(prev => prev.map(msg =>
        msg.id === id ? { ...msg, data: newData } : msg
    ));
  };

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: messageText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      await new Promise(resolve => setTimeout(() => resolve(undefined), 800));
      const content = await generatePromotionContent(userMsg.content);
      const ekoMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'eko',
        content: "Voici une proposition :",
        type: 'promo-card',
        data: content
      };
      setMessages(prev => [...prev, ekoMsg]);
    } catch (error) {
       const errorMsg: Message = { id: Date.now().toString(), role: 'eko', content: "Desole, une erreur est survenue." };
       setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isEmptyState = messages.length === 0;

  return (
    <div className="flex flex-col h-full w-full bg-gray-50 dark:bg-[#050505] relative overflow-hidden animate-fade-in">
      {/* Header Immersif */}
      <header className="px-5 py-4 flex items-center justify-between glass-panel border-b border-gray-200 dark:border-white/5 z-20 sticky top-0">
        <button onClick={() => navigate('/dashboard')} className="p-2 -ml-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition text-gray-900 dark:text-white">
          <ArrowLeft size={24} />
        </button>
        <div className="flex flex-col items-center">
            <span className="text-xs font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">EKO AI</span>
            <span className="text-[10px] text-green-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Online</span>
        </div>
        <div className="w-8 h-8 opacity-0"></div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 scroll-smooth pb-32 w-full">

        {/* Enhanced Empty State */}
        {isEmptyState && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
            {/* Glow background */}
            <div className="relative mb-6">
              <div className="absolute inset-0 w-40 h-40 bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-cyan-500/20 rounded-full blur-[60px] animate-pulse-slow -translate-x-4 -translate-y-4"></div>
              <EkoBot size="xl" mood="happy" bubbleText="Que puis-je creer pour toi ?" showBubble />
            </div>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">
              Salut ! Je suis <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Eko</span>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-[260px] mb-8 leading-relaxed">
              Ton assistant IA pour creer des promotions, messages et strategies en un instant.
            </p>

            {/* Suggestion Chips */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
              {suggestionChips.map((chip, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(chip.prompt)}
                  className="glass-panel p-4 rounded-2xl text-left group hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 animate-slide-up active:scale-95"
                  style={{ animationDelay: `${0.1 + index * 0.08}s` }}
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <chip.icon size={16} className="text-blue-500 dark:text-blue-400" />
                  </div>
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-200 leading-tight block">{chip.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-slide-up w-full`}>

            <div className="flex-shrink-0">
               {msg.role === 'eko' ? (
                   <div className="relative -top-2">
                       <EkoBot size="sm" mood="happy" />
                   </div>
               ) : (
                   <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center border border-white dark:border-white/10 shadow-sm">
                       <User size={14} className="text-gray-500 dark:text-gray-400" />
                   </div>
               )}
            </div>

            <div className={`max-w-[85%] space-y-2`}>
               {msg.content && (
                   <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                       msg.role === 'eko'
                       ? 'bg-white dark:bg-[#151515] border border-gray-100 dark:border-white/10 text-gray-700 dark:text-gray-200 rounded-tl-none'
                       : 'bg-blue-600 text-white rounded-tr-none shadow-glow'
                    }`}>
                     {msg.content}
                   </div>
               )}

               {msg.type === 'promo-card' && msg.data && (
                  <PromoCard
                    data={msg.data}
                    onUpdate={(newData) => updateMessageData(msg.id, newData)}
                    onUse={() => {
                      setUsedPromo(msg.data.title);
                      setTimeout(() => setUsedPromo(null), 2500);
                    }}
                  />
               )}
            </div>
          </div>
        ))}

        {isTyping && (
           <div className="flex gap-3 animate-pulse">
               <div className="flex-shrink-0 relative -top-2">
                   <EkoBot size="sm" mood="thinking" />
               </div>
               <div className="bg-white dark:bg-[#151515] px-4 py-3 rounded-2xl rounded-tl-none border border-gray-100 dark:border-white/10 flex items-center gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
               </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Toast notification */}
      {usedPromo && (
        <div className="absolute top-20 left-4 right-4 z-50 animate-slide-up">
          <div className="bg-green-600 text-white px-4 py-3 rounded-2xl text-sm font-bold text-center shadow-lg shadow-green-600/30 flex items-center justify-center gap-2">
            <Check size={16} /> Promotion "{usedPromo}" ajoutee a vos campagnes
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="absolute bottom-6 left-4 right-4 z-50 animate-slide-up">
          <div className="glass-panel rounded-2xl p-1.5 flex items-center gap-2 pr-2 border-gray-200 dark:border-white/20 shadow-2xl backdrop-blur-xl bg-white/90 dark:bg-black/80">
              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/20 transition">
                  <RotateCcw size="18" />
              </div>
              <input
                 type="text"
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 onKeyDown={handleKeyDown}
                 placeholder="Demander a Eko..."
                 className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 text-sm focus:outline-none px-2 font-medium"
                 autoFocus
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                 {input.trim() ? <Send size="18" className="ml-0.5" /> : <Sparkles size="18" />}
              </button>
          </div>
      </div>
    </div>
  );
};

export default Assistant;