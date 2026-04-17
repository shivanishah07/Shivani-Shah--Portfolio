import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect } from 'react';

export default function Background() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / 20;
      const y = (clientY - innerHeight / 2) / 20;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-black">
      {/* Texture Layer */}
      <div className="grain absolute inset-0 z-10" />

      {/* Atmospheric Effects */}
      <div className="absolute inset-0 z-0 opacity-60">
        {/* Fixed subtle aura */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full blur-[120px] transition-colors duration-1000" 
          style={{ backgroundColor: 'var(--theme-color)', opacity: 0.05 }}
        />
        
        {/* Interactive spotlight */}
        <motion.div 
          style={{ x: springX, y: springY }}
          className="absolute top-[40%] left-[40%] w-[40vw] h-[40vw] rounded-full bg-white/5 blur-[100px]"
        />

        {/* Floating dust/particles */}
        <motion.div 
          animate={{ x: [0, 100, -50, 0], y: [0, -80, 40, 0], scale: [1, 1.2, 0.9, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] rounded-full blur-[150px] transition-colors duration-1000"
          style={{ backgroundColor: 'var(--theme-color)', opacity: 0.1 }}
        />
        
        <motion.div 
          animate={{ x: [0, -120, 60, 0], y: [0, 100, -30, 0], scale: [1.2, 0.8, 1.1, 1.2] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] rounded-full bg-white/5 blur-[180px]"
        />
      </div>
    </div>
  );
}
