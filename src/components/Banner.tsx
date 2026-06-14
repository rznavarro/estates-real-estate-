import { CornerDownRight, ShieldCheck, Mail } from 'lucide-react';
import { motion } from 'motion/react';

interface BannerProps {
  onInquireClick: () => void;
}

export default function Banner({ onInquireClick }: BannerProps) {
  return (
    <div className="relative overflow-hidden bg-brand border-y border-[#f8f5f0]/10">
      {/* Background Texture Image from Original */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://www.cchomes.com/wp-content/uploads/2024/07/TurnberryBrown.jpg" 
          alt="Luxury textured brown backdrop" 
          className="w-full h-full object-cover opacity-35 filter contrast-125"
        />
        <div className="absolute inset-0 bg-[#664a46]/85 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Block */}
          <div className="lg:col-span-3 text-center lg:text-left space-y-1">
            <h4 className="text-white/60 font-sans text-[10px] tracking-widest uppercase font-bold">Find Your Estate</h4>
            <p className="text-[#e8e0da] text-lg font-serif italic tracking-wide">Book Consultation Today</p>
          </div>

          {/* Divider Line on Desktop */}
          <div className="hidden lg:block lg:col-span-1 justify-self-center">
            <div className="w-px h-16 bg-[#e8e0da]/20"></div>
          </div>

          {/* Middle Core Statement */}
          <div className="lg:col-span-5 text-center space-y-1.5">
            <span className="block text-[#e8e0da] font-sans text-xs tracking-widest uppercase font-semibold">Luxury Homes in West Davie</span>
            <h2 className="text-white font-serif text-3xl md:text-4xl tracking-tight leading-tight select-none">
              Pre-Construction Sales Underway
            </h2>
          </div>

          {/* Divider Line on Desktop */}
          <div className="hidden lg:block lg:col-span-1 justify-self-center">
            <div className="w-px h-16 bg-[#e8e0da]/20"></div>
          </div>

          {/* Right Action Button */}
          <div className="lg:col-span-2 flex justify-center lg:justify-end">
            <button 
              onClick={onInquireClick}
              className="w-full sm:w-auto bg-[#e8e0da] hover:bg-white text-brand font-bold text-xs tracking-widest uppercase px-10 py-4 rounded-sm shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <Mail className="w-4 h-4 text-brand group-hover:scale-110 transition-transform" />
              <span>Inquire</span>
            </button>
          </div>

        </div>

        {/* Dynamic bottom status bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4 text-white/70 text-[11px] font-sans tracking-wide uppercase font-medium">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#66c085]" />
            <span>Off-Market First Phase Pricing Extended</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>Consultation Office:</span>
            <a href="tel:305-424-2203" className="text-white hover:underline font-bold text-xs decoration-[#e8e0da]/40">(305) 424‑2203</a>
          </div>
        </div>
      </div>
    </div>
  );
}
