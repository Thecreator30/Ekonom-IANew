
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Sparkles, User, Copy, ThumbsUp, RotateCcw, Edit2, Check, X } from 'lucide-react';
import { useNavigate } from '../context/ThemeContext';
import { generatePromotionContent } from '../services/geminiService';

interface Message {
  id: string;
  role: 'user' | 'eko';
  content: string;
  type?: 'text' | 'promo-card';
  data?: any;
}

// Sub-component for the promo card to handle editing state
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
      <div className="bg-[#151515] border border-white/10 rounded-2xl overflow-hidden p-1 w-full animate-fade-in">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-4 border border-white/5 relative">
           <div className="space-y-4 relative z-10">
            <div className="space-y-1">
                <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Titre</label>
                <input 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                    value={localData.title}
                    onChange={(e) => setLocalData({...localData, title: e.target.value})}
                />
            </div>
            <div className="space-y-1">
                <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Description</label>
                <textarea 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none h-24 leading-relaxed"
                    value={localData.description}
                    onChange={(e) => setLocalData({...localData, description: e.target.value})}
                />
            </div>
            <div className="flex gap-2 pt-2">
                 <button onClick={handleCancel} className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-gray-400 border border-white/10 transition flex items-center justify-center gap-2">
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
    <div className="bg-[#151515] border border-white/10 rounded-2xl overflow-hidden p-1 w-full">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-5 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px]"></div>
            
            <h3 className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-2">{data.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">{data.description}</p>
            
            <div className="flex gap-2">
                <button 
                    onClick={() => setIsEditing(true)}
                    className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 border border-white/10 transition flex items-center justify-center"
                    title="Éditer le contenu"
                >
                    <Edit2 size="16" />
                </button>
                <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold text-gray-300 border border-white/10 transition flex items-center justify-center gap-2">
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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'eko',
      content: "Bonjour ! Je suis Eko, ton intelligence marketing. Que puis-je créer pour toi aujourd'hui ? (Post Instagram, Emailing, Promo...)",
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Simulate "Thinking" time for realism
      await new Promise(resolve => setTimeout(() => resolve(undefined), 800));
      
      const content = await generatePromotionContent(userMsg.content);
      
      const ekoMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'eko',
        content: "Voici une proposition optimisée pour ta campagne :",
        type: 'promo-card',
        data: content
      };
      
      setMessages(prev => [...prev, ekoMsg]);
    } catch (error) {
       const errorMsg: Message = { id: Date.now().toString(), role: 'eko', content: "Désolé, mes circuits surchauffent. Réessaie dans un instant." };
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

  return (
    <div className="flex flex-col h-screen bg-[#050505] text-white overflow-hidden">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between glass-panel border-b border-white/5 z-20">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-white/10 transition text-gray-300">
          <ArrowLeft size="20" />
        </button>
        <div className="flex flex-col items-center">
            <span className="text-xs font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">SYSTEME EKO</span>
            <span className="text-[10px] text-green-500 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></span> Online</span>
        </div>
        <div className="w-8 h-8 opacity-0"></div> {/* Spacer */}
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scroll-smooth pb-32">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-slide-up`}>
            
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'eko' ? 'bg-gradient-to-tr from-blue-600 to-purple-600 shadow-glow' : 'bg-gray-800'}`}>
               {msg.role === 'eko' ? <Sparkles size="14" className="text-white" /> : <User size="14" className="text-gray-400" />}
            </div>

            {/* Bubble */}
            <div className={`max-w-[85%] space-y-2`}>
               {msg.content && (
                   <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'eko' ? 'bg-[#151515] border border-white/10 text-gray-200 rounded-tl-none' : 'bg-blue-600 text-white rounded-tr-none shadow-glow'}`}>
                     {msg.content}
                   </div>
               )}

               {/* Special Promo Card Display */}
               {msg.type === 'promo-card' && msg.data && (
                  <PromoCard 
                    data={msg.data}
                    onUpdate={(newData) => updateMessageData(msg.id, newData)}
                    onUse={() => {
                        // Example use action
                        console.log("Using promo:", msg.data);
                    }}
                  />
               )}
            </div>
          </div>
        ))}
        
        {isTyping && (
           <div className="flex gap-3 animate-pulse">
               <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center">
                   <Sparkles size="14" className="text-white" />
               </div>
               <div className="bg-[#151515] px-4 py-3 rounded-2xl rounded-tl-none border border-white/10 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
               </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black to-transparent z-30 pb-8">
          <div className="glass-panel rounded-full p-1.5 flex items-center gap-2 pr-2 border-white/20 shadow-2xl">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 cursor-pointer hover:bg-white/10 transition">
                  <RotateCcw size="18" />
              </div>
              <input 
                 type="text" 
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 onKeyDown={handleKeyDown}
                 placeholder="Demander à Eko..."
                 className="flex-1 bg-transparent text-white placeholder-gray-500 text-sm focus:outline-none px-2"
                 autoFocus
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                 <Send size="18" className="ml-0.5" />
              </button>
          </div>
      </div>
    </div>
  );
};

export default Assistant;
