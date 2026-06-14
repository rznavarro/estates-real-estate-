import { useState, useMemo } from 'react';
import { FLOOR_PLANS } from '../data';
import { FloorPlan } from '../types';
import { Layers, Bed, Bath, Car, Maximize, CheckCircle2, ArrowRight, DollarSign, PenTool } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FloorPlansProps {
  onQuoteRequested: (planName: string, selectedUpgrades: string[], calculatedPrice: number) => void;
}

export default function FloorPlans({ onQuoteRequested }: FloorPlansProps) {
  const [activeTab, setActiveTab] = useState<'all' | '1-story' | '2-story'>('all');
  const [selectedPlan, setSelectedPlan] = useState<FloorPlan | null>(null);

  // Customizer state
  const [upgrades, setUpgrades] = useState<{ id: string; name: string; price: number; selected: boolean }[]>([
    { id: 'summer_kitchen', name: 'Deluxe Lanai Summer Kitchen (Professional Built-In Grill & Stone Counter)', price: 28500, selected: false },
    { id: 'smart_luxury', name: 'Savant Ultra Whole-Home Automation & Integrated Invisible Audio', price: 19000, selected: false },
    { id: 'solar_power', name: 'Dual Tesla Powerwalls & High-Efficiency Solar Roof System', price: 48000, selected: false },
    { id: 'spa_pool', name: 'Custom Heated Jet-Spa & Oversized Zero-Edge Saltwater Pool Expansion', price: 95000, selected: false },
    { id: 'guest_suite', name: 'Detached Executive Poolside Guest Casita / Wellness Studio', price: 125000, selected: false }
  ]);

  const filteredPlans = useMemo(() => {
    return FLOOR_PLANS.filter((plan) => {
      if (activeTab === '1-story') return plan.stories === 1;
      if (activeTab === '2-story') return plan.stories === 2;
      return true;
    });
  }, [activeTab]);

  const calculateCustomPrice = (basePriceString: string) => {
    const numericBase = parseInt(basePriceString.replace(/[^0-9]/g, ''), 10);
    const upgradesSum = upgrades
      .filter((u) => u.selected)
      .reduce((sum, u) => sum + u.price, 0);
    return numericBase + upgradesSum;
  };

  const handleToggleUpgrade = (id: string) => {
    setUpgrades(
      upgrades.map((u) => (u.id === id ? { ...u, selected: !u.selected } : u))
    );
  };

  const handleOpenCustomizer = (plan: FloorPlan) => {
    setSelectedPlan(plan);
    // Reset upgrades on open
    setUpgrades(upgrades.map((u) => ({ ...u, selected: false })));
  };

  const handleRequestQuote = () => {
    if (!selectedPlan) return;
    const finalPrice = calculateCustomPrice(selectedPlan.price);
    const selectedNames = upgrades.filter((u) => u.selected).map((u) => u.name);
    onQuoteRequested(selectedPlan.name, selectedNames, finalPrice);
    setSelectedPlan(null);
  };

  return (
    <section id="floor-plans" className="py-20 bg-[#f4efea] border-y border-[#e8dcd0]/50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
          <span className="text-[#a5897e] font-sans text-xs tracking-widest uppercase font-semibold block">
            The Collections Selection
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-brand-dark font-light tracking-tight">
            Curated Architectural Masterpieces
          </h2>
          <p className="text-brand font-sans text-xs sm:text-sm tracking-wider uppercase font-semibold">
            One & Two-Story Bespoke Residences. Starting from $1.7 Million
          </p>
          <div className="w-12 h-0.5 bg-brand/35 mx-auto mt-4"></div>
        </div>

        {/* Filters and Search Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/80 p-1.5 rounded-full border border-brand/10 shadow-lg flex items-center space-x-1 font-sans text-xs tracking-widest uppercase font-bold text-brand">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-6 py-2.5 rounded-full transition-all cursor-pointer ${activeTab === 'all' ? 'bg-brand text-white shadow-md' : 'hover:bg-[#f6f1ec]'}`}
            >
              All Residences
            </button>
            <button 
              onClick={() => setActiveTab('1-story')}
              className={`px-6 py-2.5 rounded-full transition-all cursor-pointer ${activeTab === '1-story' ? 'bg-brand text-white shadow-md' : 'hover:bg-[#f6f1ec]'}`}
            >
              Single-Story
            </button>
            <button 
              onClick={() => setActiveTab('2-story')}
              className={`px-6 py-2.5 rounded-full transition-all cursor-pointer ${activeTab === '2-story' ? 'bg-brand text-white shadow-md' : 'hover:bg-[#f6f1ec]'}`}
            >
              Two-Story
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <AnimatePresence mode="popLayout">
            {filteredPlans.map((plan) => (
              <motion.div
                key={plan.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg overflow-hidden border border-[#e8dcd0]/35 shadow-xl shadow-brand/5 hover:shadow-2xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Aspect ratio box */}
                <div className="relative aspect-video w-full overflow-hidden bg-stone-100">
                  <img 
                    src={plan.exteriorImageUrl} 
                    alt={plan.name} 
                    className="w-full h-full object-cover group-hover:scale-105 duration-700 transition"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-brand px-3.5 py-1.5 text-[10px] tracking-widest font-extrabold uppercase rounded-sm shadow-md border border-brand/10">
                    {plan.stories} {plan.stories === 1 ? 'Story' : 'Stories'}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-brand text-white px-4 py-1.5 text-xs tracking-widest font-bold uppercase rounded-sm shadow-md">
                    RESERVE ESTIMATE: {plan.price}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 md:p-8 flex-1 flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-serif text-brand-dark group-hover:text-brand transition-colors font-light">
                      {plan.name}
                    </h3>
                    <span className="text-xs font-sans tracking-wide text-stone-400">Davie, Florida</span>
                  </div>

                  <p className="text-stone-500 font-sans text-xs md:text-sm line-clamp-3 leading-relaxed font-light">
                    {plan.description}
                  </p>

                  {/* Specs Pill container */}
                  <div className="grid grid-cols-4 gap-2 bg-[#fdfbf9] border border-[#e8dcd0]/30 p-4 rounded-md text-center py-5">
                    <div className="space-y-1">
                      <Bed className="w-4 h-4 text-brand mx-auto opacity-80" />
                      <span className="block text-stone-400 text-[9px] uppercase font-bold tracking-wider">Bedrooms</span>
                      <span className="block text-brand text-xs font-extrabold">{plan.bedrooms} Beds</span>
                    </div>
                    <div className="space-y-1">
                      <Bath className="w-4 h-4 text-brand mx-auto opacity-80" />
                      <span className="block text-stone-400 text-[9px] uppercase font-bold tracking-wider">Bathrooms</span>
                      <span className="block text-brand text-xs font-extrabold">{plan.bathrooms} Baths</span>
                    </div>
                    <div className="space-y-1">
                      <Car className="w-4 h-4 text-brand mx-auto opacity-80" />
                      <span className="block text-stone-400 text-[9px] uppercase font-bold tracking-wider">Bay Garage</span>
                      <span className="block text-brand text-xs font-extrabold">{plan.garage} Car</span>
                    </div>
                    <div className="space-y-1">
                      <Maximize className="w-4 h-4 text-brand mx-auto opacity-80" />
                      <span className="block text-stone-400 text-[9px] uppercase font-bold tracking-wider">A/C Space</span>
                      <span className="block text-brand text-xs font-extrabold">{plan.sqftAcore.toLocaleString()} SF</span>
                    </div>
                  </div>

                  {/* Action group */}
                  <div className="pt-4 mt-auto border-t border-[#e8dcd0]/20 flex items-center justify-between">
                    <div className="text-[10px] text-stone-400 font-sans uppercase tracking-wider font-semibold">
                      Total Area: <strong className="text-brand-dark">{plan.sqftActual.toLocaleString()} SF</strong>
                    </div>
                    <button 
                      onClick={() => handleOpenCustomizer(plan)}
                      className="text-xs font-sans tracking-widest text-[#664a46] hover:text-[#33221e] uppercase font-bold transition-all flex items-center space-x-1.5 cursor-pointer hover:underline"
                    >
                      <PenTool className="w-3.5 h-3.5 text-brand" />
                      <span>Configure Estate</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Interactive Spec Customizer Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#261c19]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="absolute inset-0" onClick={() => setSelectedPlan(null)}></div>

            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-[#fcfaf7] w-full max-w-4xl rounded-xl shadow-2xl border border-brand/20 overflow-hidden relative z-10 my-8"
            >
              {/* Header */}
              <div className="bg-brand text-white p-6 flex justify-between items-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-15">
                  <img src="https://www.cchomes.com/wp-content/uploads/2024/07/TurnberryBrown.jpg" alt="pattern" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10">
                  <h4 className="text-[10px] tracking-widest text-[#e8e0da] uppercase font-bold">Interactive Estate Customizer</h4>
                  <h3 className="text-2xl sm:text-3xl font-serif text-white font-light">{selectedPlan.name} Specs & Upgrades</h3>
                </div>
                <button 
                  onClick={() => setSelectedPlan(null)}
                  className="relative z-10 text-[#e8e0da] bg-white/10 hover:bg-white/20 p-2 text-xs font-semibold rounded-full border border-white/20 transition-all cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>

              {/* Grid content */}
              <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 max-h-[70vh] overflow-y-auto">
                
                {/* Left Side: Standard details */}
                <div className="lg:col-span-5 space-y-6">
                  <img 
                    src={selectedPlan.exteriorImageUrl} 
                    alt={selectedPlan.name} 
                    className="w-full aspect-[4/3] object-cover rounded-lg shadow-md border border-[#e8dcd0]"
                  />
                  
                  <div className="space-y-2">
                    <h5 className="text-[10px] tracking-widest uppercase font-bold text-stone-400">Included Premium Accents</h5>
                    <ul className="text-xs text-stone-600 font-sans space-y-2">
                      {selectedPlan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#66c085] mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Side: Interactive upgrades listing */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h5 className="text-[11px] tracking-widest uppercase font-bold text-brand-dark mb-1">Tailor Your Footprint</h5>
                    <p className="text-xs text-stone-500 font-sans font-light">Select structural upgrades. The total estimated price updates in real-time.</p>
                  </div>

                  <div className="space-y-3.5">
                    {upgrades.map((upgrade) => (
                      <label 
                        key={upgrade.id}
                        className={`flex items-center justify-between p-3.5 rounded-lg border transition-all cursor-pointer select-none font-sans ${
                          upgrade.selected 
                            ? 'bg-white border-brand shadow-md' 
                            : 'bg-stone-50 hover:bg-stone-100/50 border-[#e8dcd0]/60'
                        }`}
                      >
                        <div className="flex items-start space-x-3 pr-4">
                          <input 
                            type="checkbox"
                            checked={upgrade.selected}
                            onChange={() => handleToggleUpgrade(upgrade.id)}
                            className="mt-0.5 accent-brand w-4 h-4 cursor-pointer"
                          />
                          <div className="space-y-0.5">
                            <span className="block text-xs font-bold text-brand-dark text-left leading-normal">{upgrade.name}</span>
                            <span className="block text-[10px] text-stone-400 tracking-wider">Custom Built-In</span>
                          </div>
                        </div>
                        <span className="text-xs font-black text-brand shrink-0">
                          +${upgrade.price.toLocaleString()}
                        </span>
                      </label>
                    ))}
                  </div>

                  {/* Calculations card */}
                  <div className="bg-brand/[0.04] p-5 rounded-lg border border-brand/10 space-y-3">
                    <div className="flex justify-between text-xs text-stone-500 font-sans">
                      <span>Base Reservation Price:</span>
                      <span className="font-bold">{selectedPlan.price}</span>
                    </div>
                    <div className="flex justify-between text-xs text-stone-500 font-sans">
                      <span>In-Home Upgrades Sum:</span>
                      <span className="font-bold text-brand">
                        +${upgrades.filter(u => u.selected).reduce((sum, u) => sum + u.price, 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="h-px bg-brand/10 my-2"></div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-[#33221e] text-xs font-bold font-sans uppercase tracking-widest">Calculated Custom Estimate</span>
                      <span className="text-brand font-serif text-2xl font-bold">
                        ${calculateCustomPrice(selectedPlan.price).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Submit Quote Pre-fill */}
                  <button 
                    onClick={handleRequestQuote}
                    className="w-full bg-[#664a46] hover:bg-[#33221e] text-white font-sans text-xs tracking-widest uppercase py-4 rounded-md shadow-lg transition-all flex items-center justify-center space-x-2 font-bold cursor-pointer"
                  >
                    <span>Request Custom Reservation Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
