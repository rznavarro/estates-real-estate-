import { useState, useEffect } from 'react';
import { Phone, Menu, X, ChevronDown, Award, Globe, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onNavigate, activeSection }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCorporateDropdownOpen, setIsCorporateDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  const communitiesList = [
    { name: 'Maple Ridge', location: 'Ave Maria, FL', price: 'From $400k - $800k', active: true },
    { name: 'Estates by Turnberry', location: 'Davie, FL', price: 'From $1.7 Million', active: true },
    { name: 'Bellaterra', location: 'Plantation Acres, FL', price: 'Close-out', active: true },
    { name: 'Pine Rockland Estates', location: 'Miami, FL', price: 'Sold Out', active: false },
    { name: 'Bristol Reserve', location: 'Davie, FL', price: 'Sold Out', active: false }
  ];

  return (
    <>
      {/* SECTION 1: Main Corporate Header (CC Homes) */}
      <header className="w-full bg-[#fcfaf7] border-b border-[#e8dcd0]/55 py-2 px-4 md:px-12 z-30 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="https://www.cchomes.com" target="_blank" rel="noopener noreferrer" className="block focus:outline-none">
            <img 
              src="https://www.cchomes.com/wp-content/themes/cchomes-theme/img/cchomes-logo.svg" 
              alt="CC Homes - A Codina + Carr Company" 
              className="h-10 md:h-12 w-auto tracking-tight"
            />
          </a>

          {/* Corporate Links desktop */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-sans tracking-widest text-[#7c6358] uppercase font-semibold">
            {/* About Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsCorporateDropdownOpen(!isCorporateDropdownOpen)} 
                className="flex items-center space-x-1 hover:text-brand focus:outline-none cursor-pointer"
              >
                <span>About Us</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              <AnimatePresence>
                {isCorporateDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsCorporateDropdownOpen(false)}></div>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 mt-3 w-56 bg-white border border-[#e8eeea] shadow-xl rounded-lg overflow-hidden py-2 z-50 transform origin-top-left"
                    >
                      <a href="#about-developer" onClick={(e) => { e.preventDefault(); handleLinkClick('legacy'); setIsCorporateDropdownOpen(false); }} className="block px-4 py-3 text-[11px] text-[#55443e] hover:bg-[#f6f1ec] transition-all">
                        About CC Homes & Turnberry
                      </a>
                      <a href="#testimonials" onClick={(e) => { e.preventDefault(); alert("We are currently building Broward's premier luxury community. Book a private presentation in our design center to read client statements."); setIsCorporateDropdownOpen(false); }} className="block px-4 py-3 text-[11px] text-[#55443e] hover:bg-[#f6f1ec] transition-all">
                        Testimonials & Legacy
                      </a>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <a href="#amenities" onClick={(e) => { e.preventDefault(); handleLinkClick('amenities'); }} className="hover:text-brand transition-colors">Design Studio</a>
            
          </nav>

          {/* Quick Info Mobile */}
          <div className="lg:hidden flex items-center space-x-3">
            <a href="tel:305-424-2203" className="p-2 border border-[#66c085]/35 bg-[#66c085]/10 text-[#66c085] rounded-full hover:bg-[#66c085]/20 transition-all">
              <Phone className="w-4 h-4 fill-current text-transparent" />
            </a>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-2 text-brand border border-brand/20 bg-[#664a46]/5 rounded-full hover:bg-brand/15 transition-all focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* SECTION 2: Sticky Community Header (Estates by Turnberry) */}
      <header className={`w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'sticky top-0 bg-white shadow-md border-b border-[#e8dcd0]/50 py-3 md:py-4 px-4 md:px-12' 
          : 'bg-[#f8f5f0] border-b border-[#e8dcd0]/30 py-4 md:py-6 px-4 md:px-12'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#hero" onClick={(e) => { e.preventDefault(); handleLinkClick('hero'); }} className="block max-w-[170px] md:max-w-[210px] focus:outline-none">
            <img 
              src="https://www.cchomes.com/wp-content/uploads/2024/07/Estates-by-Turnberry-2nd-Logo-small_2.svg" 
              alt="Estates by Turnberry logo" 
              className="w-full h-auto"
            />
          </a>

          {/* Community Navigation desktop */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs font-sans tracking-widest text-brand uppercase font-medium">
            <a 
              href="#floor-plans" 
              onClick={(e) => { e.preventDefault(); handleLinkClick('floor-plans'); }}
              className={`hover:text-brand/80 relative pb-1 transition-all ${activeSection === 'floor-plans' ? 'font-bold border-b border-brand text-[#33221e]' : 'text-[#664a46]'}`}
            >
              Home Plans
            </a>
            <a 
              href="#amenities" 
              onClick={(e) => { e.preventDefault(); handleLinkClick('amenities'); }}
              className={`hover:text-brand/80 relative pb-1 transition-all ${activeSection === 'amenities' ? 'font-bold border-b border-brand text-[#33221e]' : 'text-[#664a46]'}`}
            >
              Amenities
            </a>
<a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); handleLinkClick('contact'); }}
              className={`hover:text-brand/80 relative pb-1 transition-all ${activeSection === 'contact' ? 'font-bold border-b border-brand text-[#33221e]' : 'text-[#664a46]'}`}
            >
              Contact
            </a>

          </nav>

          <div className="lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="flex items-center space-x-1.5 text-xs text-brand tracking-widest font-bold uppercase py-1 px-3.5 border border-brand/20 bg-brand/5 rounded-full focus:outline-none"
            >
              <span className="w-2 h-2 rounded-full bg-brand animate-ping inline-block"></span>
              <span>MENU</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50"
            ></motion.div>
            
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35 }}
              className="fixed top-0 right-0 h-full w-[310px] bg-[#fbf9f6] shadow-2xl border-l border-[#e8dcd0] z-50 flex flex-col p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-6 border-b border-[#e8dcd0]/50 mb-6">
                <img 
                  src="https://www.cchomes.com/wp-content/uploads/2024/07/Estates-by-Turnberry-2nd-Logo-small_2.svg" 
                  alt="Estates by Turnberry logo" 
                  className="max-h-[35px] w-auto"
                />
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 px-2 border border-brand/20 rounded-full bg-brand/10 text-brand"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation section */}
              <div className="space-y-4 mb-8">
                <p className="text-[10px] tracking-widest text-[#a89286] font-bold uppercase">Community Portal</p>
                <div className="flex flex-col space-y-3 pl-2">
                  <a href="#floor-plans" onClick={(e) => { e.preventDefault(); handleLinkClick('floor-plans'); }} className="text-sm font-sans tracking-widest uppercase font-medium text-brand hover:translate-x-1 transition-transform">
                    Home Plans Spec & AC
                  </a>
                  <a href="#amenities" onClick={(e) => { e.preventDefault(); handleLinkClick('amenities'); }} className="text-sm font-sans tracking-widest uppercase font-medium text-brand hover:translate-x-1 transition-transform">
                    Resort Clubhouse Amenities
                  </a>
                  <a href="#contact" onClick={(e) => { e.preventDefault(); handleLinkClick('contact'); }} className="text-sm font-sans tracking-widest uppercase font-semibold text-[#8b5c43] hover:translate-x-1 transition-transform">
                    Contact & Inquiry Desk
                  </a>
                </div>
              </div>

              {/* Developer Corporate Details */}
              <div className="space-y-4 mb-8 pt-6 border-t border-[#e8dcd0]/50">
                <p className="text-[10px] tracking-widest text-[#a89286] font-bold uppercase">CC Homes & Turnberry</p>
                <div className="flex flex-col space-y-3.5 pl-2 text-xs text-[#7c6358] uppercase font-bold tracking-widest">
                  <a href="#legacy" onClick={(e) => { e.preventDefault(); handleLinkClick('legacy'); }} className="hover:text-brand">About the Legacy</a>
                </div>
              </div>

              {/* Call Widget inside burger */}
              <div className="mt-auto bg-brand text-white p-4 py-5 rounded-2xl text-center space-y-3.5 shadow-xl">
                <div className="flex justify-center">
                  <span className="p-3 bg-white/10 rounded-full animate-bounce">
                    <Phone className="w-5 h-5 text-[#e8e0da]" />
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-sans tracking-widest uppercase font-bold text-[#e8e0da]">Online Sales Representative</h4>
                  <p className="text-[10px] text-[#e8e0da]/70 mt-1">Ready to book private presentation</p>
                </div>
                <a 
                  href="tel:305-424-2203" 
                  className="block bg-white text-brand text-xs font-bold font-sans py-2.5 rounded-lg uppercase tracking-wider hover:bg-brand-light transition-all"
                >
                  Call (305) 424‑2203
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
