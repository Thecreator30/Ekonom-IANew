import React, { useState, useEffect } from 'react';

interface EkoBotProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  mood?: 'happy' | 'thinking' | 'neutral';
  showBubble?: boolean;
}

const EkoBot: React.FC<EkoBotProps> = ({ 
  size = 'md', 
  className = "", 
  mood = 'neutral',
  showBubble = false
}) => {
  const [blink, setBlink] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Cycle de clignement des yeux
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.7) { // Clignement aléatoire
        setBlink(true);
        setTimeout(() => setBlink(false), 150);
      }
    }, 3000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Dimensions basées sur la props size
  const dimensions = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32"
  };

  const headSize = {
    sm: "w-6 h-5",
    md: "w-12 h-10",
    lg: "w-20 h-16",
    xl: "w-24 h-20"
  };

  return (
    <div 
      className={`relative ${dimensions[size]} ${className} group cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Container Flottant */}
      <div className="w-full h-full animate-float flex flex-col items-center justify-center relative">
        
        {/* HALO / ANTENNE */}
        <div className={`absolute -top-1 md:-top-2 w-full flex justify-center transition-all duration-300 ${isHovered ? '-translate-y-1' : ''}`}>
           <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
        </div>

        {/* TÊTE (Glassmorphism) */}
        <div className={`relative z-20 ${headSize[size]} bg-white/10 backdrop-blur-md border border-white/20 rounded-[1rem] shadow-lg flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105`}>
          
          {/* Reflet écran */}
          <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>

          {/* VISAGE (Écran noir) */}
          <div className="w-[90%] h-[85%] bg-[#050505] rounded-[0.8rem] relative flex items-center justify-center gap-[15%] shadow-inner">
            
            {/* OEIL GAUCHE (Bleu) */}
            <div className={`transition-all duration-150 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]
              ${size === 'sm' ? 'w-1 h-1.5' : 'w-2 h-3 md:w-3 md:h-4'}
              ${blink ? 'h-[1px] scale-x-110' : ''}
            `}></div>

            {/* OEIL DROIT (Violet) */}
            <div className={`transition-all duration-150 bg-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]
               ${size === 'sm' ? 'w-1 h-1.5' : 'w-2 h-3 md:w-3 md:h-4'}
               ${blink ? 'h-[1px] scale-x-110' : ''}
            `}></div>

            {/* BOUCHE (Dynamique) */}
            {mood === 'happy' || isHovered ? (
               <div className={`absolute bottom-[20%] w-[20%] h-[10%] border-b-2 border-white/80 rounded-full transition-all duration-300`}></div>
            ) : (
               <div className={`absolute bottom-[20%] w-[10%] h-[2px] bg-white/50 rounded-full transition-all duration-300`}></div>
            )}
            
          </div>
        </div>

        {/* CORPS */}
        {size !== 'sm' && (
            <div className="relative -mt-1 z-10 w-[60%] h-[30%] bg-gradient-to-b from-gray-700 to-black rounded-b-[1rem] flex items-center justify-center shadow-xl">
                 <div className="w-[40%] h-[40%] bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse-slow blur-[1px]"></div>
            </div>
        )}

        {/* BRAS (Uniquement LG et XL) */}
        {(size === 'lg' || size === 'xl') && (
            <>
                <div className="absolute top-[60%] -left-2 w-3 h-8 bg-gray-600 rounded-full -rotate-12 border-l border-white/10 group-hover:-rotate-[25deg] transition-transform origin-top"></div>
                <div className="absolute top-[60%] -right-2 w-3 h-8 bg-gray-600 rounded-full rotate-12 border-r border-white/10 group-hover:rotate-[25deg] transition-transform origin-top"></div>
            </>
        )}

        {/* BULLE DE DIALOGUE */}
        {(showBubble || isHovered) && size !== 'sm' && (
          <div className="absolute -right-24 -top-8 bg-white dark:bg-gray-800 text-black dark:text-white text-[10px] font-bold py-1.5 px-3 rounded-xl rounded-bl-none shadow-xl z-50 animate-fade-in w-24 text-center border border-gray-100 dark:border-white/10">
             Je gère tout ! 🚀
          </div>
        )}
      </div>
    </div>
  );
};

export default EkoBot;