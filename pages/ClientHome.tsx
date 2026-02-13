import React from 'react';
import { MapPin, Search, Heart, Sparkles, Clock, Star } from 'lucide-react';

const ClientHome: React.FC = () => {
  const offers = [
    {
      id: 1,
      shop: "Le Fournil Doré",
      category: "Boulangerie",
      title: "3 Croissants achetés = 1 Offert",
      image: "https://images.unsplash.com/photo-1555507036-ab1f40388085?auto=format&fit=crop&w=300&q=80",
      distance: "200m",
      expires: "2h",
      rating: 4.8
    },
    {
      id: 2,
      shop: "Bio & Co",
      category: "Épicerie",
      title: "-20% sur tout le rayon frais",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80",
      distance: "1.2km",
      expires: "1j",
      rating: 4.5
    },
    {
      id: 3,
      shop: "Coffee Lab",
      category: "Café",
      title: "Café latte offert pour tout dessert",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=300&q=80",
      distance: "800m",
      expires: "5h",
      rating: 4.9
    }
  ];

  return (
    <div className="px-5 pt-6 pb-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium flex items-center gap-1">
             <MapPin size={12} className="text-teal-500" />
             Localisation actuelle
          </p>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-1">
             Paris, 11ème <span className="text-gray-400 text-sm font-normal">▼</span>
          </h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-white dark:bg-white/10 border border-gray-100 dark:border-white/10 flex items-center justify-center">
            <img src="https://picsum.photos/100/100?random=8" className="w-full h-full rounded-full p-0.5" alt="Profile" />
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-8">
         <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
         <input 
            type="text" 
            placeholder="Rechercher une offre, un magasin..." 
            className="w-full bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50"
         />
      </div>

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar mb-8">
        {['Tout', '🍔 Resto', '🛒 Courses', '☕ Café', '💇‍♂️ Services', '👗 Mode'].map((cat, i) => (
            <button key={i} className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${i === 0 ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30' : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-white/10'}`}>
                {cat}
            </button>
        ))}
      </div>

      {/* Featured Section */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-yellow-500 fill-current" />
            Offres Flash
        </h2>
        
        <div className="space-y-6">
            {offers.map((offer) => (
                <div key={offer.id} className="bg-white dark:bg-[#161B28] rounded-3xl p-3 shadow-sm border border-gray-100 dark:border-white/5 group active:scale-98 transition-transform">
                    <div className="relative h-40 rounded-2xl overflow-hidden mb-3">
                        <img src={offer.image} alt={offer.title} className="w-full h-full object-cover" />
                        <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1">
                            <Clock size={12} className="text-red-500" />
                            {offer.expires}
                        </div>
                        <div className="absolute top-3 left-3 bg-teal-500 text-white px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide">
                            {offer.category}
                        </div>
                        <button className="absolute bottom-3 right-3 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-colors">
                            <Heart size={16} />
                        </button>
                    </div>
                    
                    <div className="px-2 pb-1">
                        <div className="flex justify-between items-start mb-1">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-1">{offer.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{offer.shop}</p>
                            </div>
                            <div className="flex items-center gap-1 bg-gray-50 dark:bg-white/5 px-1.5 py-0.5 rounded-md">
                                <Star size={12} className="text-yellow-400 fill-current" />
                                <span className="text-xs font-bold text-gray-700 dark:text-gray-200">{offer.rating}</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3">
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                <MapPin size={12} /> {offer.distance}
                            </span>
                            <button className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black text-xs font-bold rounded-xl">
                                Voir l'offre
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ClientHome;