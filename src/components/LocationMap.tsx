import { useState } from 'react';
import { MapPin, Compass, Car, GraduationCap, Store, HeartPulse, Sparkles, Map } from 'lucide-react';
import { motion } from 'motion/react';

interface Landmark {
  name: string;
  category: 'recreation' | 'school' | 'shopping' | 'medical';
  distanceMinutes: number;
  description: string;
  coords: { x: number; y: number }; // Relative percentage coordinates for our custom map
}

export default function LocationMap() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'recreation' | 'school' | 'shopping' | 'medical'>('all');
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);

  const landmarks: Landmark[] = [
    {
      name: 'Estates by Turnberry Site',
      category: 'recreation',
      distanceMinutes: 0,
      description: 'Your tranquil private sanctuary on Shotgun Road, Davie, FL.',
      coords: { x: 50, y: 50 }
    },
    {
      name: 'Weston Hills Country Club',
      category: 'recreation',
      distanceMinutes: 8,
      description: 'Championship 36-hole golf course, state-of-the-art tennis courts, and high-end dining clubhouse.',
      coords: { x: 25, y: 35 }
    },
    {
      name: 'Flamingo Gardens & Sanctuary',
      category: 'recreation',
      distanceMinutes: 6,
      description: 'Historic Florida botanical gardens and wildlife sanctuary featuring pristine nature walkways.',
      coords: { x: 45, y: 20 }
    },
    {
      name: 'Cleveland Clinic Florida',
      category: 'medical',
      distanceMinutes: 9,
      description: 'World-renowned medical facility offering top-tier regional emergency care and specialties.',
      coords: { x: 75, y: 40 }
    },
    {
      name: 'Nova Southeastern University',
      category: 'school',
      distanceMinutes: 12,
      description: 'Premier private research university showcasing a vast master university campus.',
      coords: { x: 80, y: 15 }
    },
    {
      name: 'Weston Town Center',
      category: 'shopping',
      distanceMinutes: 10,
      description: 'Open-air village shopping center filled with gourmet cafes, Italian dining, and boutiques.',
      coords: { x: 20, y: 55 }
    },
    {
      name: 'Sawgrass Mills & Colonnade Outlets',
      category: 'shopping',
      distanceMinutes: 14,
      description: 'World-class luxury designer shopping featuring Gucci, Prada, Saint Laurent, and more.',
      coords: { x: 30, y: 10 }
    },
    {
      name: 'Markham Park & Equestrian Trails',
      category: 'recreation',
      distanceMinutes: 11,
      description: 'Expansive outdoor park offering mountain bike paths, firing range, and premium equestrian walkways.',
      coords: { x: 40, y: 75 }
    }
  ];

  const filteredLandmarks = landmarks.filter(l => {
    if (activeCategory === 'all') return true;
    return l.category === activeCategory;
  });

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'recreation': return 'bg-[#66c085]';
      case 'school': return 'bg-[#3b82f6]';
      case 'shopping': return 'bg-[#f59e0b]';
      case 'medical': return 'bg-[#ef4444]';
      default: return 'bg-[#664a46]';
    }
  };

  return (
    <section id="location" className="py-20 bg-white scroll-mt-20 border-t border-[#e8dcd0]/50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-[#a5897e] font-sans text-xs tracking-widest uppercase font-semibold block">
              Neighborhood Context
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-brand-dark tracking-tight font-light leading-tight">
              Rooted in Place, Seamlessly Connected
            </h2>
            <p className="text-stone-500 font-sans text-xs sm:text-sm leading-relaxed max-w-3xl font-light">
              Western Davie is celebrated for its peaceful ranches, outstanding safety score, and pristine natural beauty. Residents combine the rural tranquility of equestrian culture with rapid expressway access to Broward County’s top schools and premier luxury hubs.
            </p>
          </div>
          
          <div className="lg:col-span-4 bg-[#fbf9f6] border border-brand/10 rounded-xl p-5 shadow-sm text-center">
            <div className="inline-flex p-3 bg-brand/10 text-brand rounded-full mb-3">
              <Compass className="w-5 h-5 text-brand" />
            </div>
            <h4 className="text-xs font-sans tracking-widest uppercase font-bold text-brand-dark">Consultation Hub</h4>
            <p className="text-stone-500 text-[10px] font-sans mt-1">Visit our master showroom today</p>
            <a href="tel:305-424-2203" className="block text-brand text-sm font-black font-sans mt-2 hover:underline">(305) 424‑2203</a>
          </div>
        </div>

        {/* Core Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: Simulated visual topological map */}
          <div className="lg:col-span-7 bg-[#f7f4ee] rounded-xl border border-[#e8dcd0] p-6 relative flex flex-col justify-between min-h-[350px] sm:min-h-[480px] overflow-hidden group shadow-inner">
            
            {/* Background Map lines / layout simulation */}
            <div className="absolute inset-0 bg-radial-[circle_at_center,_var(--tw-gradient-stops)] from-[#dfd7cc]/30 to-transparent pointer-events-none opacity-40"></div>
            
            {/* Virtual Expressway grid overlays */}
            <div className="absolute top-1/4 left-0 w-full h-[60px] bg-white/20 border-y border-[#dfd7cc]/35 -rotate-6 pointer-events-none flex items-center justify-center text-[9px] text-[#8c786a] tracking-widest uppercase font-bold select-none opacity-60">
              Interstate 75 Express / Royal Palm Blvd
            </div>
            <div className="absolute left-3/4 top-0 w-[45px] h-full bg-white/10 border-x border-[#dfd7cc]/35 rotate-15 pointer-events-none flex items-center justify-center text-[9px] text-[#8c786a] tracking-widest uppercase font-bold select-none [writing-mode:vertical-lr] opacity-60">
              Shotgun Road / Davie Perimeter
            </div>

            {/* Map center indicator representing Estates site */}
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
              <span className="absolute inline-flex h-14 w-14 rounded-full bg-brand/10 border border-brand/20 animate-ping z-0"></span>
              <div 
                onClick={() => setSelectedLandmark(landmarks[0])}
                className="relative bg-brand text-white p-3 py-2.5 rounded-xl shadow-2xl border border-white/20 flex flex-col items-center cursor-pointer hover:scale-105 transition-all w-36 hover:bg-[#33221e]"
              >
                <MapPin className="w-4 h-4 text-white fill-white mb-0.5 animate-bounce" />
                <span className="block text-[8px] tracking-widest font-bold uppercase text-center text-[#e8e0da]">CC Homes</span>
                <span className="block text-[10px] font-serif uppercase tracking-tight text-center font-bold">Estates Site</span>
              </div>
            </div>

            {/* Render landmarks on map dynamically */}
            {filteredLandmarks.map((lm, idx) => {
              if (lm.distanceMinutes === 0) return null; // skip center as it is rendered separately
              const isSelected = selectedLandmark?.name === lm.name;
              return (
                <div 
                  key={idx}
                  style={{ top: `${lm.coords.y}%`, left: `${lm.coords.x}%` }}
                  className="absolute z-10"
                >
                  <button
                    onClick={() => setSelectedLandmark(lm)}
                    className={`p-2.5 rounded-full shadow-lg border transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group/marker cursor-pointer ${
                      isSelected 
                        ? 'bg-[#33221e] border-white text-white scale-110 shadow-stone-800/35' 
                        : `${getCategoryColor(lm.category)} text-white border-white/60 hover:scale-110`
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 fill-current" />
                    
                    {/* Hover tooltip label */}
                    <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-stone-900 text-white font-sans text-[9px] font-bold tracking-wider uppercase py-1 px-2.5 rounded-sm whitespace-nowrap shadow-xl opacity-0 group-hover/marker:opacity-100 transition-opacity duration-300 pointer-events-none">
                      {lm.name} ({lm.distanceMinutes} Min)
                    </span>
                  </button>
                </div>
              );
            })}

            {/* Map compass overlay decoration */}
            <div className="absolute bottom-4 left-4 bg-white/70 backdrop-blur-md p-2.5 rounded-lg border border-[#e8dcd0]/60 flex items-center space-x-2 text-brand font-sans text-[10px] font-bold tracking-wider uppercase">
              <Map className="w-3.5 h-3.5 text-brand" />
              <span>Davie, Broward County GPS</span>
            </div>

          </div>

          {/* Right panel: Categorized index and active landmark details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Category selection */}
            <div className="space-y-4">
              <h4 className="text-[10px] tracking-widest text-[#a89286] font-bold uppercase">Explore Destinations</h4>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => { setActiveCategory('all'); setSelectedLandmark(null); }}
                  className={`p-3 rounded-md border text-left text-xs font-sans tracking-wide transition-all uppercase font-semibold cursor-pointer select-none ${
                    activeCategory === 'all' 
                      ? 'bg-[#664a46] text-white border-brand shadow-sm' 
                      : 'bg-[#fcfaf7] text-stone-600 border-stone-200 hover:bg-[#f5f1ec]'
                  }`}
                >
                  🗺️ All Highlights
                </button>
                <button 
                  onClick={() => { setActiveCategory('recreation'); setSelectedLandmark(null); }}
                  className={`p-3 rounded-md border text-left text-xs font-sans tracking-wide transition-all uppercase font-semibold cursor-pointer select-none ${
                    activeCategory === 'recreation' 
                      ? 'bg-[#66c085] text-white border-[#66c085] shadow-sm' 
                      : 'bg-[#fcfaf7] text-[#33503d] border-stone-200 hover:bg-[#66c085]/5'
                  }`}
                >
                  🌳 Recreation & Golf
                </button>
                <button 
                  onClick={() => { setActiveCategory('school'); setSelectedLandmark(null); }}
                  className={`p-3 rounded-md border text-left text-xs font-sans tracking-wide transition-all uppercase font-semibold cursor-pointer select-none ${
                    activeCategory === 'school' 
                      ? 'bg-blue-600 text-white border-blue-600' 
                      : 'bg-[#fcfaf7] text-blue-700 border-stone-200 hover:bg-blue-50'
                  }`}
                >
                  🎓 Top Academies
                </button>
                <button 
                  onClick={() => { setActiveCategory('shopping'); setSelectedLandmark(null); }}
                  className={`p-3 rounded-md border text-left text-xs font-sans tracking-wide transition-all uppercase font-semibold cursor-pointer select-none ${
                    activeCategory === 'shopping' 
                      ? 'bg-amber-500 text-white border-amber-500' 
                      : 'bg-[#fcfaf7] text-amber-700 border-stone-200 hover:bg-amber-50'
                  }`}
                >
                  🛍️ Designer Retail
                </button>
              </div>
            </div>

            {/* Selected Landmark Detail Card */}
            <div className="bg-[#fcfaf7] border border-[#e8dcd0] p-6 rounded-xl space-y-4 shadow-md flex-grow flex flex-col justify-center min-h-[160px]">
              {selectedLandmark ? (
                <div className="space-y-3.5">
                  <div className="flex items-center space-x-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${getCategoryColor(selectedLandmark.category)}`}></span>
                    <span className="text-[10px] tracking-widest uppercase font-bold text-stone-400">
                      {selectedLandmark.category} Target
                    </span>
                  </div>
                  
                  <h4 className="text-xl sm:text-2xl font-serif text-brand-dark font-light leading-snug">
                    {selectedLandmark.name}
                  </h4>
                  
                  <p className="text-stone-500 font-sans text-xs md:text-sm leading-relaxed font-light">
                    {selectedLandmark.description}
                  </p>

                  <div className="flex items-center space-x-2 text-brand font-sans text-xs font-bold pt-2 border-t border-[#e8dcd0]/40">
                    <Car className="w-4 h-4 text-brand" />
                    <span>Estimated Travel:</span>
                    <span className="text-[#66c085] font-black">{selectedLandmark.distanceMinutes === 0 ? 'Located Onsite' : `${selectedLandmark.distanceMinutes} Min Drive`}</span>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-3 text-stone-400 py-6">
                  <MapPin className="w-10 h-10 text-brand/35 mx-auto stroke-[1.5]" />
                  <div>
                    <h5 className="font-sans text-xs tracking-widest uppercase font-bold text-brand-dark">Topological Neighborhood Map</h5>
                    <p className="text-[11px] text-stone-500 font-sans leading-relaxed max-w-sm mx-auto mt-1 p-1">
                      Click any category filter or tap on any map pins to view travel times, distance notes, and descriptions.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer location notes */}
            <div className="bg-[#fbf9f6] p-4 rounded-lg border border-stone-200/50 text-[10px] font-sans text-stone-400 text-center leading-normal">
              *Estimated driving commute times are calculated during standard off-peak traffic flowing along Shotgun Road, I-75, and state expressway grids.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
