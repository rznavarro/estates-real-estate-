import { useState } from 'react';
import { Play, Home, Calendar, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroProps {
  onLearnMoreClick: () => void;
  onHomePlansClick: () => void;
}

export default function Hero({ onLearnMoreClick, onHomePlansClick }: HeroProps) {
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <section id="hero" className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center bg-[#f7f4ee] overflow-hidden">
      {/* 1. Immersive Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center filter brightness-95 contrast-[1.01]"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
          {/* Fallback image if video is not found */}
          <img
            src="https://www.cchomes.com/wp-content/uploads/2025/10/04-Turnberry-Clubhouse-Pool-View-R01-Beige-1-1600x900.jpg"
            alt="Estates by Turnberry Clubhouse Pool rendering"
            className="w-full h-full object-cover object-center"
          />
        </video>
        {/* Soft, luxury ambient vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#261c19]/70 via-transparent to-[#261c19]/30"></div>
      </div>

      {/* 2. Headline Content Card */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="space-y-6"
        >
          {/* Subtle badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-xs tracking-widest uppercase font-semibold text-[#e8e0da] shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#e8e0da]" />
            <span>Extraordinary Living Awaits</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-light tracking-tight text-white drop-shadow-xl select-none leading-none">
            Estates by Turnberry
          </h1>

          <p className="text-[#e8e0da] font-sans text-sm sm:text-lg tracking-widest uppercase font-light max-w-2xl mx-auto drop-shadow-md">
            Extraordinary Planned Community Now Selling on Shotgun Road in West Davie, Florida
          </p>
        </motion.div>


        {/* Feature quick ribbon */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.7 }}
          className="hidden md:flex items-center space-x-12 mt-16 pt-8 border-t border-white/10 w-full text-left"
        >
          <div className="flex-1">
            <span className="block text-[10px] tracking-widest uppercase text-white/50 font-bold">Residences</span>
            <span className="block text-xl font-serif text-white mt-1 leading-tight">151 Elite Homesites</span>
            <span className="text-[11px] text-white/75 font-sans mt-0.5 block">1/2 acre to over 1 acre sprawling plots</span>
          </div>
          <div className="w-px h-8 bg-white/10"></div>
          <div className="flex-1">
            <span className="block text-[10px] tracking-widest uppercase text-white/50 font-bold">Zoning</span>
            <span className="block text-xl font-serif text-white mt-1 leading-tight">Equestrian Trail System</span>
            <span className="text-[11px] text-white/75 font-sans mt-0.5 block">Authentic sand equestrian walkways</span>
          </div>
          <div className="w-px h-8 bg-white/10"></div>
          <div className="flex-1">
            <span className="block text-[10px] tracking-widest uppercase text-white/50 font-bold">Luxury</span>
            <span className="block text-xl font-serif text-white mt-1 leading-tight">Co-Developed Excellence</span>
            <span className="text-[11px] text-white/75 font-sans mt-0.5 block">By CC Homes & Turnberry</span>
          </div>
        </motion.div>
      </div>

      {/* Floating anchor scroll down indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 hidden sm:block">
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="flex flex-col items-center cursor-pointer opacity-75 hover:opacity-100"
          onClick={onHomePlansClick}
        >
          <span className="text-[9px] tracking-widest text-[#e8e0da] uppercase font-bold">Explore Legacy</span>
          <span className="w-px h-8 bg-gradient-to-b from-[#e8e0da] to-transparent mt-2"></span>
        </motion.div>
      </div>

      {/* Cinematic Vimeo Tour Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="absolute inset-0" onClick={() => setShowVideoModal(false)}></div>
            
            <motion.div 
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-lg border border-white/10 shadow-2xl overflow-hidden z-10"
            >
              <button 
                onClick={() => setShowVideoModal(false)}
                className="absolute top-4 right-4 bg-black/70 hover:bg-black/90 text-white p-2.5 px-4 text-xs font-bold rounded-full border border-white/20 transition-all z-20 cursor-pointer"
              >
                ✕ CLOSE CINEMA
              </button>

              <iframe 
                src="https://player.vimeo.com/video/1129315478?autoplay=1&muted=0" 
                className="w-full h-full border-0 absolute inset-0"
                allow="autoplay; fullscreen; picture-in-picture" 
                allowFullScreen
                title="Estates by Turnberry Arial Video Tour"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
