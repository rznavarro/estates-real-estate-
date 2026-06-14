import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Banner from './components/Banner';
import VideoTour from './components/VideoTour';
import ShowcaseRows from './components/ShowcaseRows';
import FloorPlans from './components/FloorPlans';
import Amenities from './components/Amenities';
import ContactForm from './components/ContactForm';
import { GENERAL_FAQ } from './data';
import { ChevronDown, Plus, Minus, MessageSquare, Send, CheckCircle2, Award, ShieldAlert, FileText, Info, Maximize, Minimize, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [prefilledPlan, setPrefilledPlan] = useState<{ name: string; upgrades: string[]; price: number } | null>(null);

  // FAQ states
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Fullscreen state and handlers
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn(`Fullscreen request failed: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch((err) => {
          console.warn(`Exit fullscreen failed: ${err.message}`);
        });
      }
    }
  };

  // Keyboard shortcut listener for '1' key to toggle fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.getAttribute('contenteditable') === 'true') {
        return;
      }
      if (e.key === '1') {
        e.preventDefault();
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Guided tour state
  const [isTourActive, setIsTourActive] = useState(false);

  const startGuidedTour = () => {
    if (isTourActive) return;
    setIsTourActive(true);

    // 11 seconds across 5 stops
    const stops: { id: string; delay: number }[] = [
      { id: 'hero',         delay: 0 },
      { id: 'floor-plans',  delay: 2200 },
      { id: 'amenities',    delay: 4400 },
      { id: 'cinema-tour',  delay: 6600 },
      { id: 'contact',      delay: 8800 },
    ];

    stops.forEach(({ id, delay }) => {
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, delay);
    });

    setTimeout(() => setIsTourActive(false), 11000);
  };

  // Keyboard shortcut '2' to start guided tour
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.getAttribute('contenteditable') === 'true') return;
      if (e.key === '2') {
        e.preventDefault();
        startGuidedTour();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTourActive]);

  // Chat Concierge states
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ sender: 'advisor' | 'user'; text: string; time: string }[]>([
    { sender: 'advisor', text: 'Welcome to Estates by Turnberry Online Concierge. I’m Susan, your Sales Advisor. How can I help you customize your dream Davie estate today?', time: '11:15 AM' }
  ]);
  const [isMessageSending, setIsMessageSending] = useState(false);

  // Setup intersection observer to highlight navbar links on scroll
  useEffect(() => {
    const sections = ['hero', 'floor-plans', 'amenities', 'contact'];
    const handleScroll = () => {
      let currentSection = 'hero';
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = sectionId;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuoteRequested = (planName: string, selectedUpgrades: string[], calculatedPrice: number) => {
    setPrefilledPlan({
      name: planName,
      upgrades: selectedUpgrades,
      price: calculatedPrice
    });
    // Smoothly scroll down to the contact form
    handleScrollToSection('contact');
  };

  const handleClearPrefills = () => {
    setPrefilledPlan(null);
  };

  // Submit dynamic message to our simulated chat concierge
  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMsg = chatMessage;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setChatHistory(prev => [...prev, { sender: 'user', text: userMsg, time: now }]);
    setChatMessage('');
    setIsMessageSending(true);

    // AI automated pre-construction response
    setTimeout(() => {
      setIsMessageSending(false);
      let reply = 'Thank you for your message! Our Davie showroom team is on hand. Would you like us to schedule a direct callback or email you the full PDF architectural plans catalog?';
      
      const lower = userMsg.toLowerCase();
      if (lower.includes('price') || lower.includes('cost') || lower.includes('million')) {
        reply = 'Estates in Western Davie start from $1.7 Million for our 4-bedroom model Cypress up to $2.4 Million for our massive multi-generational Banyan model. Which square-footage range fits your family’s target?';
      } else if (lower.includes('acre') || lower.includes('lot') || lower.includes('size')) {
        reply = 'Excellent question. Davie guidelines protect oversized half-acre minimum parcels (over 21,700 sqft) up to equestrian over-acre plots. This leaves enormous lawn space for a custom summer kitchen and wrap-around pool!';
      } else if (lower.includes('school') || lower.includes('academy') || lower.includes('park')) {
        reply = 'Davie features many of South Florida’s most sought-after preparatory programs, including American Heritage (just minutes away), NSU University School, and elite state high schools. Shall we send catalog maps?';
      }

      setChatHistory(prev => [...prev, { sender: 'advisor', text: reply, time: now }]);
    }, 1300);
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-brand-dark flex flex-col font-sans select-none selection:bg-brand selection:text-white">
      
      {/* 2-Tier Header Navbar */}
      <Header 
        activeSection={activeSection} 
        onNavigate={handleScrollToSection} 
      />

      <main className="flex-1">
        
        {/* HERO SECTION */}
        <Hero 
          onLearnMoreClick={() => handleScrollToSection('legacy')} 
          onHomePlansClick={() => handleScrollToSection('floor-plans')} 
        />

        {/* PRE-CONSTRUCTION SALES TRIGGER BANNER */}
        <Banner 
          onInquireClick={() => handleScrollToSection('contact')} 
        />

        {/* INLINE CINEMATIC VIDEO TOUR */}
        <VideoTour />

        {/* SHOWCASE ALIGNING ROWS */}
        <ShowcaseRows 
          onHomePlansClick={() => handleScrollToSection('floor-plans')}
          onAmenitiesClick={() => handleScrollToSection('amenities')}
          onLocationClick={() => handleScrollToSection('location')}
        />

        {/* HOME FLOOR PLANS SELECTOR */}
        <FloorPlans 
          onQuoteRequested={handleQuoteRequested} 
        />

        {/* AMENITIES SPOTLIGHT SLIDER */}
        <Amenities />

{/* ACCORDION FAQ SECTION */}
        <section className="py-20 bg-white border-t border-[#e8dcd0]/50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center space-y-4 mb-16">
              <span className="text-[#a5897e] font-sans text-xs tracking-widest uppercase font-semibold block">
                INFORMATION BULLETIN
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-brand-dark font-light tracking-tight">
                Frequently Asked Bulletins
              </h2>
              <div className="w-12 h-0.5 bg-brand/35 mx-auto mt-4"></div>
            </div>

            <div className="space-y-4">
              {GENERAL_FAQ.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div 
                    key={idx}
                    className="border border-[#e8dcd0]/60 rounded-xl overflow-hidden bg-[#fdfbf9] transition-all"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full text-left p-5 flex justify-between items-center text-brand-dark hover:text-brand transition-colors cursor-pointer focus:outline-none select-none font-serif"
                    >
                      <span className="text-base sm:text-lg font-medium pr-4">{faq.q}</span>
                      <span className="p-1 px-2 border border-brand/10 bg-brand/5 text-brand rounded-sm font-sans flex items-center justify-center font-bold">
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </span>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-[#e8dcd0]/35 text-[#5c4942] font-sans text-xs sm:text-sm p-6 bg-white leading-relaxed font-light"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FULL CONTACT FORM SECTION */}
        <ContactForm 
          prefilledPlan={prefilledPlan} 
          onClearPrefills={handleClearPrefills} 
        />

      </main>

      {/* FOOTER */}
      <footer className="bg-brand-dark text-[#e8e0da] py-16 border-t border-[#f8f5f0]/10 font-sans relative overflow-hidden">
        
        {/* Subtle background texture overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://www.cchomes.com/wp-content/uploads/2024/07/TurnberryBrown.jpg" 
            alt="textured footer" 
            className="w-full h-full object-cover opacity-5"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 text-left">
          
          {/* Col 1: Developer branding logo credits */}
          <div className="md:col-span-4 space-y-6">
            <a href="https://www.cchomes.com" target="_blank" rel="noopener noreferrer" className="block outline-none max-w-[140px]">
              <img 
                src="https://www.cchomes.com/wp-content/themes/cchomes-theme/img/cchomes-logo.svg" 
                alt="CC Homes logo" 
                className="w-full h-auto filter brightness-150 contrast-125"
              />
            </a>
            <p className="text-xs text-[#e8e0da]/60 leading-relaxed font-light max-w-sm">
              CC Homes is co-founded by Armando Codina and Jim Carr, creating award-winning residential communities throughout Florida featuring high-end materials, sophisticated technology, and customer-first design.
            </p>
            <div className="flex items-center space-x-2 text-[#e8e0da]/45 text-[10px] font-bold uppercase tracking-widest pt-2">
              <Award className="w-4 h-4 text-brand" />
              <span>Co-Partnered Celebration with Turnberry</span>
            </div>
          </div>

          {/* Col 2: Inquiries phone directory */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#a89286]">Davie Showroom Center</h4>
            <div className="space-y-2 text-xs text-[#e8e0da]/80 font-light leading-relaxed">
              <p>Estates by Turnberry Consultation Office</p>
              <p>Davie, Broward County, Florida</p>
              <p className="pt-2">
                <strong>Tel:</strong> <a href="tel:305-424-2203" className="hover:underline font-bold text-white">(305) 424‑2203</a>
              </p>
              <p><strong>Hours:</strong> Daily 10:00 AM - 6:00 PM</p>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#a89286]">Quick Directory</h4>
            <ul className="space-y-2 text-xs text-[#e8e0da]/70 font-medium">
              <li><button onClick={() => handleScrollToSection('floor-plans')} className="hover:text-white cursor-pointer hover:underline text-left">Home Floor Plans</button></li>
              <li><button onClick={() => handleScrollToSection('site-plan')} className="hover:text-white cursor-pointer hover:underline text-left">Master Site Plan</button></li>
              <li><button onClick={() => handleScrollToSection('amenities')} className="hover:text-white cursor-pointer hover:underline text-left font-bold text-brand-light">Resort Amenities</button></li>
              <li><button onClick={() => handleScrollToSection('contact')} className="hover:text-white cursor-pointer hover:underline text-left">Register Bookings Slot</button></li>
            </ul>
          </div>


        </div>

        {/* Global legal bar */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-[#f8f5f0]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#e8e0da]/45 text-center sm:text-left font-serif leading-relaxed">
          <p>© 2026 CC Homes LLC. A Codina + Carr Company. co-developed with Turnberry. All rights reserved.</p>
          <div className="flex space-x-4">
            <span className="hover:text-white cursor-pointer">Privacy Statement</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Accessibility Options</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer text-[#e8e0da]/75 font-semibold">Web Clone Portal</span>
          </div>
        </div>

      </footer>

      {/* FLOAT CHAT CONCIERGE BUBBLE (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        
        <AnimatePresence>
          {isChatOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.92 }}
              transition={{ type: 'spring', damping: 20 }}
              className="bg-white rounded-2xl shadow-2xl border border-brand/20 w-[320px] sm:w-[350px] overflow-hidden flex flex-col h-[380px] sm:h-[420px] mb-4 origin-bottom-right"
            >
              {/* Chat head */}
              <div className="bg-brand text-white p-4 flex items-center justify-between select-none">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <span className="w-3 h-3 rounded-full bg-[#66c085] absolute bottom-0 right-0 border-2 border-brand"></span>
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-serif font-black text-white text-md">
                      CC
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-sans tracking-widest uppercase font-bold text-white">Susan Diaz</h4>
                    <p className="text-[9px] text-[#e8e0da]/70 font-sans mt-0.5">Online Sales Concierge Advisor</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="text-[#e8e0da] hover:text-white text-xs font-bold bg-white/10 p-1.5 px-2.5 rounded-full cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Chat body containing history */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#fcfbf9]">
                {chatHistory.map((msg, index) => {
                  const isAdvisor = msg.sender === 'advisor';
                  return (
                    <div 
                      key={index}
                      className={`flex flex-col max-w-[85%] ${isAdvisor ? 'mr-auto items-start' : 'ml-auto items-end'}`}
                    >
                      <div className={`p-3 rounded-xl text-xs leading-normal font-sans ${
                        isAdvisor 
                          ? 'bg-stone-100 text-stone-700 rounded-tl-none' 
                          : 'bg-brand text-white rounded-tr-none'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[8px] text-stone-400 mt-1 pl-1 pr-1 font-mono">{msg.time}</span>
                    </div>
                  );
                })}

                {isMessageSending && (
                  <div className="flex flex-col max-w-[85%] mr-auto items-start">
                    <div className="bg-stone-50 text-stone-400 p-3 rounded-xl rounded-tl-none text-xs flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce delay-150"></span>
                      <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce delay-300"></span>
                      <span className="text-[10px] pl-1 font-light italic">Advisor typing...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat footer send interface */}
              <form onSubmit={handleSendChatMessage} className="p-3 border-t border-[#e8dcd0]/50 bg-white flex items-center space-x-2">
                <input 
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Ask and learn about lot availability..."
                  className="flex-grow bg-[#fbf9f6] text-xs font-sans px-3.5 py-2.5 rounded-md border border-stone-200 focus:outline-none focus:border-brand"
                />
                <button 
                  type="submit"
                  disabled={!chatMessage.trim() || isMessageSending}
                  className={`bg-[#664a46] hover:bg-[#33221e] text-white p-2.5 rounded-md shadow-xs flex items-center justify-center transition-all cursor-pointer ${
                    !chatMessage.trim() || isMessageSending ? 'opacity-55 cursor-not-allowed' : ''
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Toggle Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-[#66c085] hover:bg-[#52ad71] text-white p-3.5 rounded-full shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 relative group cursor-pointer"
          title="Online Advisor"
        >
          {isChatOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <div className="relative">
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border border-white"></span>
              <MessageSquare className="w-5 h-5 text-white fill-current" />
            </div>
          )}
        </button>

      </div>


    </div>
  );
}
