import { useState } from 'react';
import { AMENITIES } from '../data';
import { Sparkles, Compass, ShieldCheck, Waves, Trees, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Amenities() {
  const [activeAmenityIndex, setActiveAmenityIndex] = useState(0);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Waves': return <Waves className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      default: return <Trees className="w-5 h-5" />;
    }
  };

  const activeAmenity = AMENITIES[activeAmenityIndex];

  return (
    <section id="amenities" className="py-20 bg-[#fbf9f6] scroll-mt-20 border-t border-[#e8dcd0]/50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <span className="text-[#a5897e] font-sans text-xs tracking-widest uppercase font-semibold block">
            The Living Standard
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-brand-dark font-light tracking-tight">
            Resort Comforts, Grounded in Heritage
          </h2>
          <div className="w-12 h-0.5 bg-brand/35 mx-auto mt-4"></div>
        </div>

        {/* Dynamic Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-stretch">
          
          {/* Left panel: List of Amenity buttons */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
            <h4 className="text-[10px] tracking-widest text-[#a89286] font-bold uppercase mb-2 pl-1">Amenities Directory</h4>
            
            {AMENITIES.map((amenity, index) => {
              const isActive = index === activeAmenityIndex;
              return (
                <button
                  key={amenity.id}
                  onClick={() => setActiveAmenityIndex(index)}
                  className={`w-full text-left p-4.5 rounded-lg border transition-all duration-300 flex items-center justify-between group cursor-pointer select-none ${
                    isActive 
                      ? 'bg-white border-brand shadow-lg ' 
                      : 'bg-[#fcfaf7] hover:bg-white border-[#e8dcd0]/55 hover:border-brand/35'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <span className={`p-2.5 rounded-full transition-all ${isActive ? 'bg-brand text-white' : 'bg-brand/10 text-brand'}`}>
                      {getIcon(amenity.iconName)}
                    </span>
                    <div>
                      <span className={`block text-[9px] font-sans tracking-widest uppercase font-bold ${isActive ? 'text-brand/50' : 'text-stone-400'}`}>
                        {amenity.subtitle}
                      </span>
                      <span className={`block text-md font-serif ${isActive ? 'text-brand-dark font-semibold' : 'text-stone-600'}`}>
                        {amenity.title}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'text-brand translate-x-1' : 'text-stone-400 group-hover:translate-x-0.5'}`} />
                </button>
              );
            })}
          </div>

          {/* Right panel: Active Amenity immersive view card */}
          <div className="lg:col-span-7 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAmenity.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl overflow-hidden shadow-2xl border border-[#e8dcd0]/50 flex flex-col h-full"
              >
                {/* Image layout */}
                <div className="relative aspect-[16/10] w-full bg-stone-100 overflow-hidden">
                  <img 
                    src={activeAmenity.imageUrl} 
                    alt={activeAmenity.title} 
                    className="w-full h-full object-cover filter contrast-[1.02] hover:scale-103 duration-700 transition"
                  />
                  <div className="absolute top-4 left-4 bg-brand text-white px-4 py-1 text-[10px] tracking-widest font-black uppercase rounded-sm border border-white/10 shadow-lg">
                    Turnberry Resort Life
                  </div>
                </div>

                {/* Info layout */}
                <div className="p-6 md:p-10 flex-grow space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="text-[#a5897e] font-sans text-xs tracking-widest uppercase font-semibold">
                      {activeAmenity.subtitle}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif text-brand-dark tracking-tight font-light font-black">
                      {activeAmenity.title}
                    </h3>
                    <p className="text-stone-500 font-sans text-xs md:text-sm leading-relaxed font-light">
                      {activeAmenity.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[#e8dcd0]/30 flex items-center justify-between text-[11px] font-sans tracking-wider text-brand uppercase font-bold">
                    <span>*Available exclusively to contract holders</span>
                    <span className="text-stone-400">Section Lot 104</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
