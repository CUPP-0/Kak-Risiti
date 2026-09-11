import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { CaseStudyModal } from './components/CaseStudyModal';
import { PlaygroundSection } from './components/PlaygroundSection';
import { AboutSection } from './components/AboutSection';
import { ServicesEstimator } from './components/ServicesEstimator';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { HindiaMusicPlayer } from './components/HindiaMusicPlayer';
import { CaseStudy, ThemePalette } from './types';
import { sound } from './utils/audio';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState<ThemePalette>('matcha');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [prefilledService, setPrefilledService] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme_dark_mode');
      if (saved !== null) {
        return saved === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme_dark_mode', 'false');
    }
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    sound.playPop();
    setIsDarkMode((prev) => !prev);
  };

  const themeColors: Record<ThemePalette, string> = {
    matcha: '#86EFAC',
    lavender: '#C4B5FD',
    bubblegum: '#F472B6',
    butter: '#FDE047'
  };

  const handleToggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    sound.enabled = newState;
  };

  const handleOpenContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreWork = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookService = (serviceTitle: string) => {
    setPrefilledService(serviceTitle);
    handleOpenContact();
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-neutral-950 text-[#18181B] dark:text-neutral-100 selection:bg-[#FEF08A] selection:text-neutral-900 font-sans relative transition-colors duration-300">
      {/* Floating Pill Navbar */}
      <Navbar
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenContact={handleOpenContact}
        darkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Hero Section */}
      <Hero
        accentColor={themeColors[currentTheme]}
        onExploreWork={handleExploreWork}
        onOpenContact={handleOpenContact}
      />

      {/* Featured Projects & Case Studies */}
      <ProjectsSection onSelectCaseStudy={setSelectedCaseStudy} />

      {/* Playground / Creatie Lab */}
      <PlaygroundSection />

      {/* About Me / Behind the Pixels with Hindia Player embed */}
      <AboutSection />

      {/* Contact Section */}
      <ContactSection prefilledService={prefilledService} />

      {/* Footer */}
      <Footer />

      {/* Floating Hindia Lo-Fi Music Player (Interactive with audio synth + lyrics + playlist) */}
      <HindiaMusicPlayer />

      {/* Case Study Deep-dive Modal */}
      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onSelectAnother={(cs) => setSelectedCaseStudy(cs)}
      />
    </div>
  );
}
