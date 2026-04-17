import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useRef, useState, MouseEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TAGS = [
  { id: 1, label: 'Photography', slug: 'photography', color: 'bg-tag-photo', textColor: 'text-black', rotate: -5 },
  { id: 2, label: 'AI Projects', slug: 'ai-projects', color: 'bg-tag-ai', textColor: 'text-white', rotate: 10 },
  { id: 3, label: 'Graphic Design', slug: 'graphic-design', color: 'bg-tag-design', textColor: 'text-white', rotate: -2 },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Interactive Object (Keychain) - Centered in remaining space */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-12 md:py-16">
        <div className="flex-1 flex items-center justify-center w-full pt-20 md:pt-12">
          <Keychain isHovered={isHovered} setIsHovered={setIsHovered} />
        </div>
        
        {/* Caption text - Anchored to bottom, moves slightly on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            y: isHovered ? 0 : -20 
          }}
          transition={{
            type: 'spring',
            damping: 30,
            stiffness: 100,
          }}
          className="pointer-events-none select-none text-center"
        >
          <span className="font-pixel text-lg md:text-2xl uppercase tracking-[0.2em] text-white/40">
            a collection of visual works
          </span>
        </motion.div>
      </div>
    </section>
  );
}

function Keychain({ isHovered, setIsHovered }: { isHovered: boolean, setIsHovered: (v: boolean) => void }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  return (
    <div 
      className="relative w-full h-[60vh] flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(!isHovered)}
    >
      {/* The "Ring" or anchor - The origin point */}
      <motion.div 
        animate={{ scale: isHovered ? (isMobile ? 1.1 : 1.2) : 1 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-10 md:w-12 h-10 md:h-12 rounded-full border-2 md:border-4 border-zinc-700 z-50 shadow-lg flex items-center justify-center bg-black"
      >
        <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-zinc-600" />
      </motion.div>
      
      {/* The Tags */}
      {TAGS.map((tag, index) => (
        <Tag 
          key={tag.id} 
          tag={tag} 
          index={index} 
          isHovered={isHovered}
          isMobile={isMobile}
          isTablet={isTablet}
        />
      ))}
    </div>
  );
}

function Tag({ tag, index, isHovered, isMobile, isTablet }: any) {
  const navigate = useNavigate();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Physics-based return to center
  const xSpring = useSpring(x, { damping: 12, stiffness: 100 });
  const ySpring = useSpring(y, { damping: 12, stiffness: 100 });

  // Resting positions (dangling)
  const dangleRotate = (index - 1) * (isMobile ? 12 : 15);
  const dangleY = isMobile ? 10 : 20;

  // Branch out positions based on screen size
  let branchX = (index - 1) * 440;
  let branchY = 280;
  let branchRotate = (index - 1) * 10;

  if (isMobile) {
    branchX = 0; // Vertical stack on mobile
    branchY = 80 + index * 120;
    branchRotate = (index - 1) * 5;
  } else if (isTablet) {
    branchX = (index - 1) * 220; // Narrower spread on tablet
    branchY = 180;
    branchRotate = (index - 1) * 8;
  }

  // Width and Margins
  const tagWidth = isMobile ? 'w-64' : isTablet ? 'w-80' : 'w-96';
  const tagHeight = isMobile ? 'h-24' : isTablet ? 'h-32' : 'h-40';
  const marginLeft = isMobile ? '-8rem' : isTablet ? '-10rem' : '-12rem';

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.6}
      onClick={() => navigate(`/project/${tag.slug}`)}
      animate={{
        x: isHovered ? branchX : 0,
        y: isHovered ? branchY : dangleY,
        rotate: isHovered ? branchRotate : dangleRotate,
        scale: isHovered ? (isMobile ? 1.05 : 1.1) : 1,
      }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 150,
      }}
      style={{
        translateX: xSpring,
        translateY: ySpring,
        zIndex: isHovered ? 50 + index : 40 - index,
        left: '50%',
        marginLeft: marginLeft,
        transformOrigin: '50% 0%',
      }}
      whileHover={{ scale: isMobile ? 1.05 : 1.1, zIndex: 100 }}
      whileTap={{ scale: 0.95, cursor: 'grabbing' }}
      className={`absolute ${tagWidth} ${tagHeight} ${tag.color} ${tag.textColor} rounded-2xl md:rounded-[2rem] shadow-2xl flex items-center justify-center p-6 md:p-10 cursor-pointer select-none border border-black/10`}
      data-cursor="Open"
    >
      <div className="flex flex-col items-start w-full pointer-events-none">
        <span className="font-mono text-[10px] md:text-xs uppercase opacity-50 mb-1 md:mb-2 tracking-widest">0{tag.id}</span>
        <span className="font-serif text-2xl md:text-4xl lg:text-5xl font-medium tracking-tighter leading-none">{tag.label}</span>
      </div>
      
      {/* Hole */}
      <div className="absolute top-2 md:top-4 left-1/2 -translate-x-1/2 w-3 md:w-4 h-3 md:h-4 rounded-full bg-black border border-white/10 shadow-inner" />
      
      {/* Connector */}
      <div className="absolute -top-4 md:-top-6 left-1/2 -translate-x-1/2 w-[2px] md:w-[3px] h-6 md:h-10 bg-zinc-700/50" />
    </motion.div>
  );
}
