import React from 'react';
import { Volume2, VolumeX, Sparkles, Send, Sun, Moon } from 'lucide-react';
import { sound } from '../utils/audio';
import { ThemePalette } from '../types';

interface NavbarProps {
  currentTheme: ThemePalette;
  onThemeChange: (theme: ThemePalette) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenContact: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTheme,
  onThemeChange,
  soundEnabled,
  onToggleSound,
  onOpenContact,
  darkMode,
  onToggleDarkMode
}) => {
  const navItems = [
    { label: 'Work', href: '#projects' },
    { label: 'Playground', href: '#playground' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' }
  ];

  const themeOptions: { key: ThemePalette; label: string; color: string }[] = [
    { key: 'matcha', label: 'Matcha', color: '#86EFAC' },
    { key: 'lavender', label: 'Lavender', color: '#C4B5FD' },
    { key: 'bubblegum', label: 'Blush', color: '#F472B6' },
    { key: 'butter', label: 'Butter', color: '#FDE047' }
  ];

  const handleNavClick = (href: string) => {
    sound.playClick();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        id="main-navigation"
        className="pointer-events-auto flex items-center justify-between gap-2.5 sm:gap-5 px-3 sm:px-5 py-2.5 bg-white/85 dark:bg-neutral-900/85 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.1)]"
      >
        {/* Brand / Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#hero');
          }}
          className="flex items-center gap-2 pr-1 group"
        >
          <div className="w-8 h-8 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center font-bold text-sm tracking-tight transition-transform group-hover:scale-105">
            A<span className="text-[#86EFAC] text-xs">✦</span>
          </div>
          <span className="font-bold text-sm tracking-tight hidden md:inline text-neutral-900 dark:text-white font-display">
            Alya Kirana
          </span>
        </a>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {navItems.map((item) => (
            <button
              key={item.label}
              id={`nav-link-${item.label.toLowerCase()}`}
              onClick={() => handleNavClick(item.href)}
              className="px-2.5 sm:px-3 py-1 text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 rounded-full transition-colors whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Theme & Sound & Dark Mode & CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2 pl-1 border-l border-neutral-200/80 dark:border-neutral-800">
          {/* Theme Palette Dots */}
          <div className="hidden sm:flex items-center gap-1 bg-neutral-100/70 dark:bg-neutral-800/80 p-1 rounded-full">
            {themeOptions.map((t) => (
              <button
                key={t.key}
                id={`theme-btn-${t.key}`}
                onClick={() => {
                  sound.playPop();
                  onThemeChange(t.key);
                }}
                title={`Theme: ${t.label}`}
                className={`w-4 h-4 rounded-full transition-all ${
                  currentTheme === t.key
                    ? 'scale-125 ring-2 ring-neutral-900 dark:ring-white shadow-sm'
                    : 'opacity-60 hover:opacity-100'
                }`}
                style={{ backgroundColor: t.color }}
              />
            ))}
          </div>

          {/* Dark Mode Toggle */}
          <button
            id="dark-mode-toggle-btn"
            onClick={() => {
              sound.playPop();
              onToggleDarkMode();
            }}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="w-7 h-7 flex items-center justify-center rounded-full text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            {darkMode ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-neutral-700" />
            )}
          </button>

          {/* Sound Toggle */}
          <button
            id="sound-toggle-btn"
            onClick={() => {
              onToggleSound();
              if (!soundEnabled) {
                sound.enabled = true;
                sound.playSparkle();
              }
            }}
            title={soundEnabled ? 'Mute sound effects' : 'Enable playful sound effects'}
            className="w-7 h-7 flex items-center justify-center rounded-full text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-neutral-800 dark:text-neutral-200" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
            )}
          </button>

          {/* Let's Talk Button */}
          <button
            id="nav-chat-btn"
            onClick={() => {
              sound.playPop();
              onOpenContact();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 rounded-full text-xs sm:text-sm font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-100 active:scale-95 transition-all shadow-sm"
          >
            <Sparkles className="w-3 h-3 text-[#FDE047] dark:text-amber-500 hidden xs:inline" />
            <span>Let&apos;s Talk</span>
            <Send className="w-3 h-3 ml-0.5" />
          </button>
        </div>
      </nav>
    </header>
  );
};

