import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../App';
import { useState } from 'react';
import AboutModal from './AboutModal';

export default function Navbar() {
  useLocation();
  const { isContentFocused } = useTheme();
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50 mix-blend-difference"
      >
        <div className="font-serif text-xl tracking-tight" style={{ color: 'var(--theme-color)' }}>
          <AnimatePresence>
            {!isContentFocused && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <a href="/" className="hover:opacity-50 transition-all duration-500">Shivani Shah</a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div className="flex gap-8 font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--theme-color)' }}>
          <AnimatePresence>
            {!isContentFocused && (
              <motion.button 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                onClick={() => setIsAboutOpen(true)}
                className="hover:opacity-50 transition-all duration-500 hover:scale-105"
                data-cursor="Info"
              >
                About Me
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      <AboutModal 
        isOpen={isAboutOpen} 
        onClose={() => setIsAboutOpen(false)} 
      />
    </>
  );
}
