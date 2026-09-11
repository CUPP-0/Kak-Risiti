import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  User,
  Heart,
  Briefcase,
  Layers,
  Sparkles,
  Headphones,
  Play,
  Pause,
  Volume2,
  Calendar,
  Compass,
  ArrowUpRight,
  Tablet,
  Coffee,
  Camera,
  Music,
  Radio,
  Upload
} from 'lucide-react';
import { BAG_ITEMS, EXPERIENCES, PERSONAL_INFO } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { hindiaPlayer } from '../utils/hindiaAudioEngine';

export const AboutSection: React.FC = () => {
  const [playerState, setPlayerState] = useState(hindiaPlayer.getState());
  const [selectedBagItem, setSelectedBagItem] = useState(BAG_ITEMS[0]);
  const [visualizerBars, setVisualizerBars] = useState<number[]>([25, 45, 65, 40, 70, 85, 30, 50]);

  useEffect(() => {
    const unsub = hindiaPlayer.subscribe((state) => {
      setPlayerState(state);
    });

    let animId: number;
    const tick = () => {
      if (hindiaPlayer.getState().isPlaying) {
        setVisualizerBars(hindiaPlayer.getVisualizerData());
      }
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    return () => {
      unsub();
      cancelAnimationFrame(animId);
    };
  }, []);

  const toggleMusic = () => {
    sound.playPop();
    hindiaPlayer.togglePlay();
  };

  const getBagIcon = (iconName: string) => {
    switch (iconName) {
      case 'Tablet':
        return <Tablet className="w-5 h-5" />;
      case 'Headphones':
        return <Headphones className="w-5 h-5" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5" />;
      case 'Camera':
        return <Camera className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const skills = [
    { name: 'Canva & Graphic Design', level: 'Expert', color: '#EDE9FE', darkColor: '#581C87' },
    { name: 'Java Script & Interactive Web', level: 'Advanced', color: '#DCFCE7', darkColor: '#14532D' },
    { name: 'Python & Data Analys', level: 'Advanced', color: '#FEF08A', darkColor: '#713F12' },
    { name: 'PHP & Full Stack Developer', level: 'Proficient', color: '#FCE7F3', darkColor: '#831843' },
  ];

  const { isPlaying, currentSong, activeLyricIndex } = playerState;

  return (
    <section id="about" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Tag */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DCFCE7] dark:bg-emerald-950/80 text-[#15803D] dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-300/60 dark:border-emerald-800">
          <User className="w-3.5 h-3.5" />
          Behind the Pixels
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-neutral-950 dark:text-white tracking-tight">
          Obsessed with micro-details &amp; emotional design.
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mt-2 text-base sm:text-lg">
          Bridging genuine human warmth with polished, high-performance digital products.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Bio + Hindia Spotify Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Bio Card */}
          <div className="p-7 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={PERSONAL_INFO.avatar}
                alt={PERSONAL_INFO.name}
                className="w-14 h-14 rounded-2xl object-cover border border-neutral-200 dark:border-neutral-700"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="font-bold text-lg text-neutral-950 dark:text-white font-display">
                  {PERSONAL_INFO.name}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                  {PERSONAL_INFO.role} ({PERSONAL_INFO.pronouns})
                </p>
              </div>
            </div>

            <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
              Possesses a keen eye for detail and a strong interest in web development, data analysis, and graphic design. Experienced in building responsive websites and applications through academic projects and internships, with proficiency in front-end technologies and graphic design tools.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-neutral-600 dark:text-neutral-300">
              <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full">📍 Bogor, Indonesia</span>
              <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full">🍵 Coffe</span>
              <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full">📸 Design Graphic</span>
            </div>
          </div>

          {/* Hindia Spotify Card (Gen Z signature element) */}
          <div className="p-5 rounded-3xl bg-neutral-950 dark:bg-black text-white border border-neutral-800 dark:border-neutral-800/80 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Album Art with spinning indicator */}
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-neutral-800 border border-neutral-700 shrink-0">
                  <img
                    src={currentSong.coverUrl}
                    alt={currentSong.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isPlaying ? 'scale-110 rotate-3' : 'scale-100'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                  {isPlaying && (
                    <div className="absolute inset-0 bg-emerald-500/25 flex items-center justify-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#86EFAC] uppercase tracking-wider">
                    <Radio className="w-3 h-3 animate-pulse" />
                    <span>Hindia On Heavy Repeat</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 ml-1">
                      {playerState.audioMode === 'real' || currentSong.isCustomAudio ? '✦ Audio Asli' : '♫ Lo-Fi'}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-neutral-100 font-display truncate">
                    {currentSong.title}
                  </h4>
                  <p className="text-xs text-neutral-400 truncate">
                    {currentSong.artist} • {currentSong.album}
                  </p>
                </div>
              </div>

              {/* Play/Pause Button */}
              <button
                onClick={toggleMusic}
                className="w-10 h-10 rounded-full bg-white text-neutral-950 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shrink-0 ml-2 shadow-sm"
                title={isPlaying ? 'Pause Hindia' : 'Play Hindia track'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>
            </div>

            {/* Visualizer and lyric line */}
            <div className="mt-3 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
              <div className="flex items-center gap-1">
                {visualizerBars.slice(0, 6).map((b, i) => (
                  <span
                    key={i}
                    className="w-1 rounded-full bg-emerald-400 transition-all duration-100 inline-block"
                    style={{
                      height: isPlaying ? `${Math.max(6, (b / 255) * 16)}px` : '4px'
                    }}
                  />
                ))}
                <span className="text-[11px] text-neutral-300 font-medium ml-1.5 truncate max-w-[200px]">
                  {currentSong.lyrics[activeLyricIndex]?.text || 'Lo-Fi Chill & Synthesizer'}
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider">
                {isPlaying ? 'Playing' : 'Paused'}
              </span>
            </div>
          </div>

          {/* Interactive Bag: What's in my bag */}
          <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-neutral-900 dark:text-white font-display flex items-center gap-2">
                <span>🎒</span> Inside My Everyday Bag
              </h3>
              <span className="text-xs font-semibold text-neutral-400">Tap to inspect</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {BAG_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedBagItem(item);
                  }}
                  style={{ backgroundColor: item.color }}
                  className={`p-3 rounded-2xl flex items-center justify-center transition-all ${
                    selectedBagItem.id === item.id
                      ? 'ring-2 ring-neutral-900 dark:ring-white shadow-md scale-105'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  title={item.name}
                >
                  {getBagIcon(item.icon)}
                </button>
              ))}
            </div>

            {/* Selected Bag Item Detail */}
            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200/80 dark:border-neutral-700 text-xs sm:text-sm">
              <span className="font-bold text-neutral-900 dark:text-white block">{selectedBagItem.name}</span>
              <span className="text-neutral-500 dark:text-neutral-400 text-xs block mt-0.5">{selectedBagItem.category}</span>
              <p className="text-neutral-700 dark:text-neutral-300 mt-1.5 leading-relaxed">{selectedBagItem.desc}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Skills & Experience Timeline (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Experience Timeline */}
          <div className="p-7 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 shadow-sm space-y-6">
            <h3 className="font-bold text-xl text-neutral-950 dark:text-white font-display flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />
              Experience &amp; Leadership
            </h3>

            <div className="space-y-6">
              {EXPERIENCES.map((exp, index) => (
                <div
                  key={index}
                  className="relative pl-6 pb-6 border-l-2 border-neutral-200 dark:border-neutral-800 last:border-0 last:pb-0"
                >
                  {/* Timeline Dot */}
                  <span
                    className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white dark:border-neutral-900 ${
                      exp.isCurrent ? 'bg-emerald-500 ring-4 ring-emerald-100 dark:ring-emerald-950' : 'bg-neutral-400 dark:bg-neutral-600'
                    }`}
                  />

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-bold text-base text-neutral-900 dark:text-white font-display">
                      {exp.role} <span className="text-neutral-400 font-normal">@</span> {exp.company}
                    </h4>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1.5 leading-relaxed">
                    {exp.highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills & Superpowers */}
          <div className="p-7 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 shadow-sm space-y-5">
            <h3 className="font-bold text-xl text-neutral-950 dark:text-white font-display flex items-center gap-2">
              <Layers className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />
              Toolkit &amp; Superpowers
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {skills.map((s) => (
                <div
                  key={s.name}
                  className="p-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-between shadow-2xs hover:shadow-xs transition-shadow"
                  style={{ backgroundColor: `${s.color}35` }}
                >
                  <span className="font-bold text-sm text-neutral-900 dark:text-neutral-100">{s.name}</span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/90 dark:bg-neutral-800/90 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                    {s.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

