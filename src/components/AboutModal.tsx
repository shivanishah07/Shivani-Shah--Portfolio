import { motion, AnimatePresence } from 'motion/react';
import { X, Linkedin, Mail } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 overflow-hidden"
        >
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />

          {/* Content */}
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-4xl bg-zinc-900/50 border border-white/10 rounded-3xl p-8 md:p-16 shadow-2xl overflow-y-auto max-h-[90vh]"
            style={{ color: 'var(--theme-color)' }}
          >
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 p-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
                className="flex flex-col gap-8"
              >
                <span className="font-mono text-xs uppercase tracking-[0.3em] opacity-50">About Me</span>
                <h2 className="font-serif text-5xl md:text-7xl tracking-tighter leading-none italic">
                  Shivani Shah
                </h2>
                <p className="font-sans text-xl leading-relaxed opacity-80">
                  A multi-disciplinary creative exploring the boundaries of visual storytelling. Based at the intersection of traditional mediums and emerging technologies.
                </p>
                <p className="font-sans text-lg leading-relaxed opacity-60">
                  I believe that the most powerful experiences are born where technology meets human intuition. My work spans from experimental photography to neural-network-driven cinematic experiments.
                </p>
              </motion.div>

              <div className="flex flex-col gap-12">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0, clipPath: 'inset(10% 10% 10% 10%)' }}
                  whileInView={{ scale: 1, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
                  className="aspect-[4/5] w-full bg-zinc-800 rounded-2xl overflow-hidden border border-white/5 shadow-2xl"
                >
                  <img 
                    src="https://raw.githubusercontent.com/shivanishah07/Shivani-Shah--Portfolio/209d3f059f4bfa971ae5238e7229da7ca702db3e/IMG_0167.JPG" 
                    alt="Shivani Shah" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale opacity-60 hover:opacity-100 transition-all duration-1000"
                  />
                </motion.div>

                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
                  className="flex flex-col gap-8"
                >
                  <div className="flex flex-col gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest opacity-40">Contact / Collaboration</span>
                    <div className="flex flex-col gap-4 font-serif text-2xl md:text-3xl tracking-tight">
                      <a href="mailto:shivanishah1310@gmail.com" className="hover:opacity-60 transition-opacity flex items-center gap-4">
                        <Mail size={20} className="opacity-50" />
                        Email
                      </a>
                      <a href="https://www.linkedin.com/in/shivani-shah07/" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity flex items-center gap-4">
                        <Linkedin size={20} className="opacity-50" />
                        LinkedIn
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest opacity-40">Location</span>
                    <span className="font-serif text-2xl tracking-tight italic">India</span>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="mt-24 pt-8 border-t border-white/10 flex justify-between items-center opacity-40">
              <span className="font-mono text-[10px] uppercase tracking-widest">© 2026 Shivani Shah</span>
              <span className="font-mono text-[10px] uppercase tracking-widest italic">All rights reserved</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
