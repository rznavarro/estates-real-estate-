import { ArrowRight, Compass, Shield, Waves, Hammer } from 'lucide-react';
import { motion } from 'motion/react';

interface ShowcaseRowsProps {
  onHomePlansClick: () => void;
  onAmenitiesClick: () => void;
  onLocationClick: () => void;
}

export default function ShowcaseRows({
  onHomePlansClick,
  onAmenitiesClick,
  onLocationClick
}: ShowcaseRowsProps) {
  
  return (
    <div id="legacy" className="bg-[#fdfbf9] py-16 md:py-24 space-y-16 md:space-y-28">
      
      {/* Introduction: CC HOMES & TURNBERRY - A Legacy of Luxury */}
      <div className="max-w-4xl mx-auto text-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <span className="text-[#a5897e] font-sans text-xs tracking-widest uppercase font-semibold block">
            CC Homes & Turnberry
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#33221e] leading-tight select-none">
            A Legacy of Luxury
          </h2>
          <div className="w-16 h-0.5 bg-brand/30 mx-auto my-6"></div>
          <p className="text-[#5c4942] font-sans text-sm sm:text-base leading-relaxed tracking-wide font-light max-w-2xl mx-auto">
            Estates by Turnberry is brought to you by two community-rooted developers, CC Homes and Turnberry; one of the nation’s top luxury single-family homebuilders and one of the world’s most celebrated placemakers. Together, they unite local expertise with global vision to deliver a luxury living experience unlike any other.
          </p>
        </motion.div>
      </div>

      {/* Row collection container */}
      <div className="max-w-7xl mx-auto px-6 space-y-20 md:space-y-28">
        
        {/* Row 1: Craftsmanship in Every Detail (Text Left, Image Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-4 md:space-y-6 order-2 lg:order-1"
          >
            <div className="flex items-center space-x-2 text-[#a5897e]">
              <Hammer className="w-4 h-4 text-brand" />
              <span className="text-[10px] tracking-widest uppercase font-bold">Custom Architecture</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-serif text-[#33221e] leading-tight font-light">
              Craftsmanship in Every Detail
            </h3>
            <p className="text-[#5c4942] font-sans text-sm leading-relaxed tracking-wide font-light">
              With one- and two-story designs, Estates offers a variety of floor plans to suit your lifestyle. Tailor your home with upgraded finishes, gourmet kitchens, guest suites, and more to make it distinctly yours. Learn more in our interactive designs presentation.
            </p>
            <div>
              <button 
                onClick={onHomePlansClick}
                className="inline-flex items-center space-x-3 bg-white hover:bg-[#664a46] text-[#664a46] hover:text-white border border-[#664a46]/30 px-6 py-3 rounded-xs text-xs tracking-widest uppercase font-bold transition-all shadow-sm hover:shadow-lg cursor-pointer"
              >
                <span>Home Plans</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 order-1 lg:order-2 rounded-lg overflow-hidden shadow-2xl shadow-brand/10 border border-[#e8dcd0]/20"
          >
            <img 
              src="https://www.cchomes.com/wp-content/uploads/2025/10/Kinship-Kitchen-Preliminary-1-768x512.jpg" 
              alt="Bespoke gourmet kitchen rendering" 
              className="w-full h-auto object-cover hover:scale-105 duration-700 transition" 
            />
          </motion.div>
        </div>


        {/* Row 2: Etched in Heritage (Image Left, Text Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 rounded-lg overflow-hidden shadow-2xl shadow-brand/10 border border-[#e8dcd0]/20"
          >
            <img 
              src="https://www.cchomes.com/wp-content/uploads/2025/10/Grand-entrance-768x431.jpg" 
              alt="Security gates aerial entrance" 
              className="w-full h-auto object-cover hover:scale-105 duration-700 transition" 
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-4 md:space-y-6"
          >
            <div className="flex items-center space-x-2 text-[#a5897e]">
              <Shield className="w-4 h-4 text-brand" />
              <span className="text-[10px] tracking-widest uppercase font-bold">Secure Sanctuary</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-serif text-[#33221e] leading-tight font-light">
              Etched in Heritage
            </h3>
            <p className="text-[#5c4942] font-sans text-sm leading-relaxed tracking-wide font-light">
              Welcome to Estates by Turnberry, an exclusive gated community inspired by Davie's equestrian roots and designed for modern living. With 151 homes on sprawling, lush homesites, the residences offer an abundance of bespoke accommodations and present privacy on the west side of Broward County.
            </p>
          </motion.div>
        </div>


        {/* Row 3: Everyday Escape (Text Left, Image Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-4 md:space-y-6 order-2 lg:order-1"
          >
            <div className="flex items-center space-x-2 text-[#a5897e]">
              <Waves className="w-4 h-4 text-brand" />
              <span className="text-[10px] tracking-widest uppercase font-bold">Clubhouse & Recreation</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-serif text-[#33221e] leading-tight font-light">
              Everyday Escape
            </h3>
            <p className="text-[#5c4942] font-sans text-sm leading-relaxed tracking-wide font-light">
              At the heart of the community, the clubhouse with its resort-style pool, fitness center and lounge rooms, serve as a modern gathering place, while horse trails, scenic gazebos, and lush walkways create a lifestyle of leisure that feels timeless, grounded, and truly one of a kind.
            </p>
            <div>
              <button 
                onClick={onAmenitiesClick}
                className="inline-flex items-center space-x-3 bg-white hover:bg-[#664a46] text-[#664a46] hover:text-white border border-[#664a46]/30 px-6 py-3 rounded-xs text-xs tracking-widest uppercase font-bold transition-all shadow-sm hover:shadow-lg cursor-pointer"
              >
                <span>Amenities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 order-1 lg:order-2 rounded-lg overflow-hidden shadow-2xl shadow-brand/10 border border-[#e8dcd0]/20"
          >
            <img 
              src="https://www.cchomes.com/wp-content/uploads/2025/10/6-1-768x511.jpg" 
              alt="Clubhouse patio pool lounge view" 
              className="w-full h-auto object-cover hover:scale-105 duration-700 transition" 
            />
          </motion.div>
        </div>


        {/* Row 4: Rooted in Place (Image Left, Text Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 rounded-lg overflow-hidden shadow-2xl shadow-brand/10 border border-[#e8dcd0]/20"
          >
            <img 
              src="https://www.cchomes.com/wp-content/uploads/2025/10/Gatehouse-Entrance-Road-768x431.jpg" 
              alt="Gatehouse entry road tree canopy rendering" 
              className="w-full h-auto object-cover hover:scale-105 duration-700 transition" 
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-4 md:space-y-6"
          >
            <div className="flex items-center space-x-2 text-[#a5897e]">
              <Compass className="w-4 h-4 text-brand" />
              <span className="text-[10px] tracking-widest uppercase font-bold">Western Davie Location</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-serif text-[#33221e] leading-tight font-light">
              Rooted in Place
            </h3>
            <p className="text-[#5c4942] font-sans text-sm leading-relaxed tracking-wide font-light">
              Life at the Estates feels peaceful yet effortlessly connected—surrounded by lush landscapes, serene trails, and refined natural beauty, while just moments from premier shopping, fine dining, and South Florida’s most coveted destinations.
            </p>
            <div>
              <button 
                onClick={onLocationClick}
                className="inline-flex items-center space-x-3 bg-white hover:bg-[#664a46] text-[#664a46] hover:text-white border border-[#664a46]/30 px-6 py-3 rounded-xs text-xs tracking-widest uppercase font-bold transition-all shadow-sm hover:shadow-lg cursor-pointer"
              >
                <span>Location</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
