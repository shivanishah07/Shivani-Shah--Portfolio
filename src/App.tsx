/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Background from './components/Background';
import ProjectDetail from './components/ProjectDetail';
import React, { useEffect, useState, CSSProperties, createContext, useContext } from 'react';

const PROJECT_THEMES: Record<string, { color: string; rgb: string }> = {
  'photography': { color: 'var(--color-tag-photo)', rgb: 'var(--color-tag-photo-rgb)' },
  'ai-projects': { color: 'var(--color-tag-ai)', rgb: 'var(--color-tag-ai-rgb)' },
  'graphic-design': { color: 'var(--color-tag-design)', rgb: 'var(--color-tag-design-rgb)' },
};

interface ThemeContextType {
  isContentFocused: boolean;
  setIsContentFocused: (focused: boolean) => void;
  themeColor: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

function ThemeManager({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [isContentFocused, setIsContentFocused] = useState(false);
  const [theme, setTheme] = useState({ 
    color: 'var(--theme-color)', 
    rgb: 'var(--theme-color-rgb)' 
  });

  useEffect(() => {
    const slug = location.pathname.split('/project/')[1];
    if (slug && PROJECT_THEMES[slug]) {
      setTheme(PROJECT_THEMES[slug]);
      setIsContentFocused(true);
    } else {
      setTheme({ color: 'var(--theme-color)', rgb: 'var(--theme-color-rgb)' });
      setIsContentFocused(false);
    }
  }, [location.pathname]);

  const style = {
    '--theme-color': theme.color,
    '--theme-color-rgb': theme.rgb,
  } as CSSProperties;

  return (
    <ThemeContext.Provider value={{ isContentFocused, setIsContentFocused, themeColor: theme.color }}>
      <div style={style}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export default function App() {
  return (
    <Router>
      <ThemeManager>
        <SmoothScroll>
          <div className="relative min-h-screen">
            <Background />
            <CustomCursor />
            <Navbar />
            
            <main className="relative z-10">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project/:slug" element={<ProjectDetail />} />
              </Routes>
            </main>
          </div>
        </SmoothScroll>
      </ThemeManager>
    </Router>
  );
}

function Home() {
  return (
    <>
      <Hero />
    </>
  );
}
