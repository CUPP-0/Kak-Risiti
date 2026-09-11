import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, Copy, Check, Sparkles, MapPin, Clock, FileText, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO, INITIAL_STICKERS } from '../data/portfolioData';
import { DraggableStickers } from './DraggableStickers';
import { sound } from '../utils/audio';

interface HeroProps {
  accentColor: string;
  onExploreWork: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  accentColor,
  onExploreWork,
  onOpenContact
}) => {
  const [copied, setCopied] = useState(false);
  const [stickers, setStickers] = useState(INITIAL_STICKERS);
  const [currentTime, setCurrentTime] = useState('');
  const heroContainerRef = useRef<HTMLDivElement>(null);

  // Update time for Jakarta (GMT+7)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    sound.playSparkle();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#86EFAC', '#C4B5FD', '#FDE047', '#F472B6']
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const resetStickers = () => {
    setStickers([...INITIAL_STICKERS]);
  };

  return (
    <section
      id="hero"
      ref={heroContainerRef}
      className="relative min-h-[90vh] pt-28 pb-16 px-4 sm:px-6 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Background Soft Glow & Grid */}
      <div
        className="absolute inset-0 bg-dot-pattern opacity-60 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] sm:w-[700px] sm:h-[450px] rounded-full blur-3xl opacity-30 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: accentColor }}
        aria-hidden="true"
      />

      {/* Interactive Draggable Stickers Layer */}
      <DraggableStickers
        stickers={stickers}
        containerRef={heroContainerRef}
        showReset={true}
        onReset={resetStickers}
      />

      {/* Main Hero Card & Typography */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Status Pills */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-6"
        >
          {/* Availability Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-neutral-900/90 border border-neutral-200/90 dark:border-neutral-800 shadow-xs text-xs font-semibold text-neutral-800 dark:text-neutral-200 backdrop-blur-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for Q2/Q3 Projects</span>
          </div>

          {/* Time & Location Pill */}
          <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800 text-xs font-medium text-neutral-600 dark:text-neutral-400 backdrop-blur-xs">
            <MapPin className="w-3 h-3 text-neutral-400" />
            <span>Bogor, ID</span>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <Clock className="w-3 h-3 text-neutral-400" />
            <span>{currentTime || '10:30 AM'} (GMT+7)</span>
          </div>
        </motion.div>

        {/* Persona Avatar Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
          className="relative mb-5"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl p-1 bg-white dark:bg-neutral-900 shadow-lg border-2 border-neutral-100 dark:border-neutral-800 rotate-2 hover:rotate-0 transition-transform duration-300 overflow-hidden group">
            <img
              src={PERSONAL_INFO.avatar}
              alt={PERSONAL_INFO.name}
              className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-yellow-300 text-neutral-900 text-[11px] font-extrabold px-2 py-0.5 rounded-full shadow-sm border border-neutral-800 rotate-6">
            QUEEN ✦
          </div>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-neutral-950 dark:text-white leading-[1.08] mb-6 max-w-3xl"
        >
          Hey, I&apos;m <span className="underline decoration-wavy decoration-[#86EFAC]/80 underline-offset-4">Yayau</span>.{' '}
          <span className="block text-neutral-800 dark:text-neutral-200 font-semibold text-3xl sm:text-5xl md:text-6xl mt-2">
            she codes & she reads & she clutches.
          </span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl font-normal leading-relaxed mb-8"
        >
          {PERSONAL_INFO.bio}
        </motion.p>

        {/* Hero CTA Action Group */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {/* Primary CTA: Explore Work */}
          <button
            id="hero-explore-work-btn"
            onClick={() => {
              sound.playPop();
              onExploreWork();
            }}
            className="group flex items-center gap-2 px-6 py-3.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 rounded-full text-sm sm:text-base font-semibold shadow-md hover:bg-neutral-800 dark:hover:bg-neutral-100 hover:shadow-xl active:scale-95 transition-all"
          >
            <span>Explore Works</span>
            <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </button>

          {/* Copy Email Button with confetti */}
          <button
            id="hero-copy-email-btn"
            onClick={handleCopyEmail}
            className="flex items-center gap-2 px-5 py-3.5 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 rounded-full text-sm sm:text-base font-semibold shadow-xs hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-800 active:scale-95 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">Email Copied! ✨</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                <span>ristinaesb@gmail.com</span>
              </>
            )}
          </button>

          {/* Let's Talk CTA */}
          <button
            id="hero-contact-btn"
            onClick={() => {
              sound.playPop();
              onOpenContact();
            }}
            className="flex items-center gap-1.5 px-5 py-3.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-full text-sm sm:text-base font-semibold transition-colors"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Send Inquiry</span>
          </button>
        </motion.div>

        {/* Hint banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex items-center gap-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 bg-white/70 dark:bg-neutral-900/70 px-4 py-1.5 rounded-full border border-neutral-200/60 dark:border-neutral-800 shadow-2xs backdrop-blur-xs"
        >
          <span className="animate-bounce inline-block">✨</span>
          <span>Tip: The stickers floating around are draggable! Throw them around for fun.</span>
        </motion.div>
      </div>
    </section>
  );
};
