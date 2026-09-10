import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Plus, RefreshCw, Music, Zap, Smile, Coffee, Wand2 } from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { StickerItem } from '../types';

export const PlaygroundSection: React.FC = () => {
  const [activeMood, setActiveMood] = useState('🍵 Matcha Flow');
  const [customText, setCustomText] = useState('');
  const [playgroundStickers, setPlaygroundStickers] = useState<StickerItem[]>([
    {
      id: 'p1',
      text: 'Design with Intention ✦',
      color: '#FEF08A',
      textColor: '#854D0E',
      border: '#FACC15',
      defaultX: 20,
      defaultY: 25,
      rotation: -6
    },
    {
      id: 'p2',
      text: 'Gen Z Aesthetic 🌸',
      color: '#FCE7F3',
      textColor: '#BE185D',
      border: '#F472B6',
      defaultX: 65,
      defaultY: 30,
      rotation: 8
    },
    {
      id: 'p3',
      text: 'No Boring Layouts 🚫',
      color: '#DCFCE7',
      textColor: '#15803D',
      border: '#86EFAC',
      defaultX: 35,
      defaultY: 70,
      rotation: -3
    },
    {
      id: 'p4',
      text: 'Sound On 🎵',
      color: '#EDE9FE',
      textColor: '#6D28D9',
      border: '#C4B5FD',
      defaultX: 75,
      defaultY: 65,
      rotation: 5
    }
  ]);

  const canvasRef = useRef<HTMLDivElement>(null);

  const moods = [
    { label: '🍵 Matcha Flow', desc: 'Sipping iced ceremonial matcha, deeply locked in Figma.', color: '#DCFCE7' },
    { label: '🎧 Lo-Fi Chill', desc: 'Beabadoobee & Frank Ocean on repeat, drawing stickers.', color: '#E0F2FE' },
    { label: '⚡️ 3 AM Inspiration', desc: 'Sudden burst of UI interaction ideas before bed.', color: '#FEF08A' },
    { label: '💅 Pixel Perfection', desc: 'Nudging typography by 0.5px and perfecting auto-layout.', color: '#FCE7F3' }
  ];

  const handleAddCustomSticker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim()) return;

    sound.playSparkle();
    const colors = [
      { bg: '#FEF08A', text: '#854D0E', border: '#FACC15' },
      { bg: '#FCE7F3', text: '#BE185D', border: '#F472B6' },
      { bg: '#DCFCE7', text: '#15803D', border: '#86EFAC' },
      { bg: '#EDE9FE', text: '#6D28D9', border: '#C4B5FD' },
      { bg: '#E0F2FE', text: '#0369A1', border: '#7DD3FC' }
    ];
    const picked = colors[Math.floor(Math.random() * colors.length)];

    const newSticker: StickerItem = {
      id: `custom-${Date.now()}`,
      text: `${customText.trim()} ✨`,
      color: picked.bg,
      textColor: picked.text,
      border: picked.border,
      defaultX: Math.floor(Math.random() * 60) + 15,
      defaultY: Math.floor(Math.random() * 50) + 25,
      rotation: Math.floor(Math.random() * 24) - 12
    };

    setPlaygroundStickers((prev) => [...prev, newSticker]);
    setCustomText('');

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.8 },
      colors: [picked.bg, picked.border]
    });
  };

  const handleResetPlayground = () => {
    sound.playPop();
    setPlaygroundStickers([
      {
        id: 'p1',
        text: 'Design with Intention ✦',
        color: '#FEF08A',
        textColor: '#854D0E',
        border: '#FACC15',
        defaultX: 20,
        defaultY: 25,
        rotation: -6
      },
      {
        id: 'p2',
        text: 'Gen Z Aesthetic 🌸',
        color: '#FCE7F3',
        textColor: '#BE185D',
        border: '#F472B6',
        defaultX: 65,
        defaultY: 30,
        rotation: 8
      },
      {
        id: 'p3',
        text: 'No Boring Layouts 🚫',
        color: '#DCFCE7',
        textColor: '#15803D',
        border: '#86EFAC',
        defaultX: 35,
        defaultY: 70,
        rotation: -3
      },
      {
        id: 'p4',
        text: 'Sound On 🎵',
        color: '#EDE9FE',
        textColor: '#6D28D9',
        border: '#C4B5FD',
        defaultX: 75,
        defaultY: 65,
        rotation: 5
      }
    ]);
  };

  return (
    <section id="playground" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE9FE] dark:bg-purple-950/80 text-[#6D28D9] dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-3 border border-purple-300/60 dark:border-purple-800">
          <Wand2 className="w-3.5 h-3.5" />
          The Creatie Playground
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-neutral-950 dark:text-white tracking-tight">
          Interactive Vibe &amp; Sticker Canvas
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2 text-base sm:text-lg">
          Inspired by Framer Creatie&apos;s playful spirit: drag elements, spawn your own stickers, and toggle live mood states.
        </p>
      </div>

      {/* Main Sandbox Box */}
      <div className="bg-white dark:bg-neutral-900 border-2 border-neutral-900 dark:border-neutral-700 rounded-3xl shadow-[6px_6px_0px_#18181B] dark:shadow-[6px_6px_0px_#3f3f46] overflow-hidden flex flex-col">
        {/* Sandbox Toolbar */}
        <div className="p-4 sm:px-6 bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-400 border border-rose-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-400 border border-emerald-500 inline-block" />
            <span className="text-xs font-mono font-bold text-neutral-600 dark:text-neutral-300 ml-2">
              creatie-sandbox.canvas
            </span>
          </div>

          {/* Controls: Reset + Spawn Sticker */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleResetPlayground}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 text-xs font-semibold border border-neutral-300 dark:border-neutral-700 shadow-2xs transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              Reset Board
            </button>
          </div>
        </div>

        {/* Interactive Sticker Canvas */}
        <div
          ref={canvasRef}
          className="relative min-h-[380px] sm:min-h-[440px] bg-[#FAF8F5] dark:bg-neutral-950 bg-grid-pattern overflow-hidden select-none"
        >
          {/* Draggable Playground Stickers */}
          {playgroundStickers.map((st) => (
            <motion.div
              key={st.id}
              drag
              dragConstraints={canvasRef}
              dragElastic={0.15}
              whileHover={{ scale: 1.1, rotate: st.rotation * 1.5, cursor: 'grab' }}
              whileDrag={{ scale: 1.18, cursor: 'grabbing', zIndex: 40 }}
              onDragStart={() => sound.playPop(440)}
              onDragEnd={() => sound.playPop(560)}
              onClick={() => sound.playSparkle()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: st.rotation }}
              style={{
                left: `${st.defaultX}%`,
                top: `${st.defaultY}%`,
                backgroundColor: st.color,
                color: st.textColor,
                borderColor: st.border
              }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold shadow-md border-2 cursor-grab transition-shadow active:shadow-xl backdrop-blur-xs flex items-center gap-2"
            >
              <span>{st.text}</span>
            </motion.div>
          ))}

          {/* Centered Canvas Prompt */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
            <div className="text-center">
              <span className="text-4xl block mb-1">✨</span>
              <p className="font-display font-bold text-neutral-400 dark:text-neutral-500 text-lg">
                Drag any sticker across the canvas
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Bar: Add Sticker + Mood Check */}
        <div className="p-4 sm:p-6 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Add custom sticker form */}
          <form onSubmit={handleAddCustomSticker} className="flex items-center gap-2">
            <input
              type="text"
              id="custom-sticker-input"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Type your own sticker text (e.g. Dream Big ✨)..."
              maxLength={28}
              className="flex-1 px-4 py-2.5 rounded-full text-xs sm:text-sm border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
            />
            <button
              type="submit"
              id="spawn-sticker-btn"
              className="px-4 py-2.5 rounded-full bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs sm:text-sm font-bold hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Drop Sticker</span>
            </button>
          </form>

          {/* Vibe Selector */}
          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase mr-1">
              Current Vibe:
            </span>
            {moods.map((m) => (
              <button
                key={m.label}
                onClick={() => {
                  sound.playPop();
                  setActiveMood(m.label);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold text-neutral-900 transition-all ${
                  activeMood === m.label
                    ? 'ring-2 ring-neutral-900 dark:ring-white shadow-xs scale-105'
                    : 'opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: m.color }}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
