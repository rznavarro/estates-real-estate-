import { motion } from 'motion/react';
import { Play, Volume2, Shield } from 'lucide-react';

export default function VideoTour() {
  return (
    <section id="cinema-tour" className="bg-[#faf8f5] border-b border-[#e8dcd0]/50">
      {/* Section Heading */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10 text-center space-y-4">
        <span className="text-[#a5897e] font-sans text-xs tracking-widest uppercase font-semibold block">
          Vuelo de Presentación
        </span>
        <h2 className="text-3xl md:text-5xl font-serif text-[#33221e] tracking-tight font-light">
          Cinematic Aerial Showcase
        </h2>
        <div className="w-16 h-0.5 bg-[#664a46]/20 mx-auto mt-4"></div>
        <p className="text-[#5c4942] font-sans text-sm max-w-xl mx-auto font-light leading-relaxed">
          Experience the stunning scale and equestrian grandeur of Estates by Turnberry in Davie, Florida directly below.
        </p>
      </div>

      {/* Full-width Video */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative w-full aspect-video bg-black overflow-hidden"
      >
        <iframe
          src="https://player.vimeo.com/video/1129315478?autoplay=0&muted=0&byline=0&portrait=0&title=0"
          className="absolute inset-0 w-full h-full border-0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Estates by Turnberry Aerial Video Tour"
        ></iframe>
      </motion.div>

      {/* Bottom micro-info */}
      <div className="py-4 flex items-center justify-center space-x-2 text-stone-500 font-sans text-[11px] uppercase tracking-wider">
        <Play className="w-3.5 h-3.5 text-[#664a46]" />
        <span>Haga clic en reproducir para iniciar la experiencia virtual de alta definición</span>
      </div>
    </section>
  );
}
