import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Folder, ChevronLeft, Play, LayoutGrid } from 'lucide-react';
import { useTheme } from '../App';

const PROJECT_DATA: Record<string, any> = {
  'photography': {
    title: 'Photography',
    category: 'Visual Arts',
    color: 'var(--tag-photo)',
    colorRgb: '240, 243, 162',
    description: 'Capturing moments through a lens of experimental lighting and composition.',
    image: 'https://picsum.photos/seed/photo/1200/800',
    gallery: [1, 2, 3]
  },
  'ai-projects': {
    title: 'AI Projects',
    category: 'Generative',
    color: 'var(--tag-ai)',
    colorRgb: '35, 35, 255',
    description: 'Exploring the intersection of artificial intelligence and creative expression.',
    items: [
      { 
        label: 'AI Short Film', 
        type: 'folder',
        description: 'A cinematic journey through latent space, directed by neural networks.',
        content: [
          { type: 'image', url: 'https://picsum.photos/seed/film1/1200/800', caption: 'Atmospheric Scene' },
          { type: 'image', url: 'https://picsum.photos/seed/film2/1200/800', caption: 'Neural Landscapes' },
          { type: 'image', url: 'https://picsum.photos/seed/film3/1200/800', caption: 'Character Study' },
        ]
      },
      { 
        label: 'Brand Campaign', 
        type: 'folder',
        description: 'AI-assisted brand identity and visual storytelling for a futuristic concept.',
        content: [
          { type: 'image', url: 'https://picsum.photos/seed/brand1/1200/800', caption: 'Primary Identity' },
          { type: 'image', url: 'https://picsum.photos/seed/brand2/1200/800', caption: 'Digital Touchpoints' },
          { type: 'image', url: 'https://picsum.photos/seed/brand3/1200/800', caption: 'Out-of-Home Simulation' },
        ]
      },
    ]
  },
  'graphic-design': {
    title: 'Graphic Design',
    category: 'Branding',
    color: 'var(--tag-design)',
    colorRgb: '255, 70, 162',
    description: 'Crafting unique visual identities and communication systems for modern brands.',
    image: 'https://picsum.photos/seed/graphic-design/1200/800',
    gallery: [1, 2, 3]
  },
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const project = slug ? PROJECT_DATA[slug] : null;
  const [selectedFolder, setSelectedFolder] = useState<any | null>(null);
  const { setIsContentFocused } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedFolder]);

  useEffect(() => {
    // We are focused if we have a slug (on a project page)
    // and specifically when viewing a folder's content
    if (slug) {
      setIsContentFocused(true);
    }
    
    return () => {
      // Only unset if we are actually navigating away from the project scope
      if (!window.location.pathname.includes('/project/')) {
        setIsContentFocused(false);
      }
    };
  }, [slug, setIsContentFocused, location.pathname]);

  if (!project) return <div className="h-screen flex items-center justify-center">Project not found</div>;

  const handleBack = () => {
    if (selectedFolder) {
      setSelectedFolder(null);
    } else {
      navigate('/');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-8 md:p-24"
      style={{ color: 'var(--theme-color)' }}
    >
      <button 
        onClick={handleBack}
        className="mb-12 font-mono text-xs uppercase tracking-widest transition-all duration-500 flex items-center gap-2 opacity-100 hover:brightness-125"
        data-cursor="Back"
      >
        <ChevronLeft size={16} />
        {selectedFolder ? `Back to ${project.title}` : 'Back to home'}
      </button>

      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {!selectedFolder ? (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={`grid grid-cols-1 ${project.image ? 'md:grid-cols-2' : ''} gap-24 items-start`}>
                <div className="flex flex-col gap-8">
                  <motion.span 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="font-mono text-xs uppercase tracking-[0.3em] opacity-80"
                  >
                    {project.category}
                  </motion.span>
                  <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="font-serif text-6xl md:text-8xl tracking-tighter"
                  >
                    {project.title}
                  </motion.h1>
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="font-sans text-xl leading-relaxed max-w-md opacity-70"
                  >
                    {project.description}
                  </motion.p>
                </div>

                {project.image && (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="aspect-video bg-zinc-900/20 shadow-2xl rounded-sm overflow-hidden border border-white/5"
                  >
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
              </div>

              {/* Gallery or Items */}
              <div className="mt-32">
                {project.items ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {project.items.map((item: any, i: number) => (
                      <motion.div
                        key={item.label}
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -5 }}
                        onClick={() => setSelectedFolder(item)}
                        className="group relative h-48 bg-white/5 border border-white/5 rounded-2xl p-8 flex flex-col justify-between cursor-pointer hover:bg-white/10 transition-all shadow-xl"
                        style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                        data-cursor="Open"
                      >
                        <div className="flex justify-between items-start">
                          <div 
                            className="p-3 rounded-xl transition-colors"
                            style={{ backgroundColor: `rgba(var(--theme-color-rgb), 0.1)`, color: 'var(--theme-color)' }}
                          >
                            <Folder size={24} />
                          </div>
                          <div 
                            className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors"
                            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                          >
                            <div 
                              className="w-1.5 h-1.5 rounded-full transition-all"
                              style={{ backgroundColor: 'var(--theme-color)' }}
                            />
                          </div>
                        </div>
                        <div>
                          <span className="font-mono text-[10px] uppercase opacity-40 mb-2 block tracking-widest">Directory / {i + 1}</span>
                          <h3 className="font-serif text-2xl tracking-tight">{item.label}</h3>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {project.gallery?.map((i: number) => (
                      <motion.div 
                        key={i}
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="aspect-[4/5] bg-zinc-900 rounded-sm overflow-hidden shadow-2xl border border-white/5"
                      >
                        <img 
                          src={`https://picsum.photos/seed/project-${slug}-${i}/800/1000`} 
                          alt="" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-700"
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="folder-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-16"
            >
              <div className="flex flex-col gap-6 max-w-2xl">
                <div className="flex items-center gap-4" style={{ color: 'var(--theme-color)' }}>
                  {selectedFolder.label.includes('Film') ? <Play size={24} /> : <LayoutGrid size={24} />}
                  <span className="font-mono text-sm uppercase tracking-widest">{selectedFolder.label}</span>
                </div>
                <h2 className="font-serif text-5xl md:text-7xl tracking-tighter italic">
                  {selectedFolder.label}
                </h2>
                <p className="font-sans text-xl leading-relaxed opacity-70">
                  {selectedFolder.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-12">
                {selectedFolder.content.map((item: any, i: number) => (
                  <motion.div 
                    key={i}
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group flex flex-col gap-6"
                  >
                    <div className="aspect-video bg-zinc-900/40 rounded-2xl overflow-hidden relative border border-white/5 shadow-2xl">
                      <img 
                        src={item.url} 
                        alt={item.caption} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <div className="flex justify-between items-end px-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-[10px] uppercase opacity-40">Asset 0{i + 1}</span>
                        <h4 className="font-serif text-2xl tracking-tighter">{item.caption}</h4>
                      </div>
                      <div 
                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-all group-hover:scale-110"
                        style={{ backgroundColor: 'transparent', borderColor: 'var(--theme-color)', color: 'var(--theme-color)' }}
                      >
                        <Play size={16} fill="currentColor" stroke="none" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
