import React from 'react';
import { ArrowUp, Heart, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playPop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-950 py-14 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 font-display font-black text-xl sm:text-2xl tracking-tight text-neutral-900 dark:text-white">
              <span>Ristina Eka</span>
              <span className="text-[#86EFAC]">✦</span>
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                Creatie &amp; Nudge Edition
              </span>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm mt-1">
              Gen Z Digital Portfolio • Crafted with tactile physics, interactive stickers &amp; Web Audio.
            </p>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-200 transition-all shadow-2xs"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Big Decorative Marquee / Branding text */}
        <div className="py-6 border-y border-neutral-100 dark:border-neutral-800 flex items-center justify-between overflow-hidden text-neutral-200 dark:text-neutral-800 font-display font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-tighter select-none">
          <span>NUDGE</span>
          <span className="text-neutral-300 dark:text-neutral-700">✦</span>
          <span>CREATIE</span>
          <span className="text-neutral-300 dark:text-neutral-700">✦</span>
          <span>PLAYFUL</span>
          <span className="text-neutral-300 dark:text-neutral-700 hidden sm:inline">✦</span>
          <span className="hidden sm:inline">TACTILE</span>
        </div>

        {/* Bottom Credits & Inspiration Note */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 dark:text-neutral-500">
          <div>
            © {new Date().getFullYear()} Alya Kirana. All rights reserved.
          </div>

          <div className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
            <span>Designed in the aesthetic of Framer</span>
            <a
              href="https://www.framer.com/marketplace/templates/creatie/"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-800 dark:text-neutral-200 font-bold underline hover:text-neutral-950 dark:hover:text-white ml-1"
            >
              Creatie &amp; Nudge
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
