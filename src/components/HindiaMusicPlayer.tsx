import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Music,
  ListMusic,
  ChevronDown,
  ChevronUp,
  Disc,
  Sparkles,
  Minimize2,
  Upload,
  FileAudio,
  CheckCircle2,
  FolderArchive,
  Link2,
  Sparkle
} from 'lucide-react';
import { hindiaPlayer } from '../utils/hindiaAudioEngine';
import { HINDIA_SONGS, HindiaSongData } from '../data/hindiaSongs';
import { sound } from '../utils/audio';

type PlayerTab = 'player' | 'playlist' | 'lyrics' | 'source';

export const HindiaMusicPlayer: React.FC = () => {
  const [playerState, setPlayerState] = useState(hindiaPlayer.getState());
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<PlayerTab>('player');
  const [visualizerBars, setVisualizerBars] = useState<number[]>([20, 45, 70, 35, 60, 80, 30, 50]);
  const [isDragging, setIsDragging] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = hindiaPlayer.subscribe((state) => {
      setPlayerState(state);
    });

    let animFrame: number;
    const updateVisualizer = () => {
      if (hindiaPlayer.getState().isPlaying) {
        setVisualizerBars(hindiaPlayer.getVisualizerData());
      }
      animFrame = requestAnimationFrame(updateVisualizer);
    };
    animFrame = requestAnimationFrame(updateVisualizer);

    return () => {
      unsubscribe();
      cancelAnimationFrame(animFrame);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleTogglePlay = () => {
    sound.playPop();
    hindiaPlayer.togglePlay();
  };

  const handleNext = () => {
    sound.playClick();
    hindiaPlayer.next();
  };

  const handlePrev = () => {
    sound.playClick();
    hindiaPlayer.previous();
  };

  const handleSelectSong = (song: HindiaSongData) => {
    sound.playSparkle();
    hindiaPlayer.play(song.id);
    setActiveTab('player');
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    hindiaPlayer.seek(val);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    hindiaPlayer.setVolume(val);
  };

  const triggerFileUpload = () => {
    sound.playClick();
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processAudioFile(file);
    }
  };

  const processAudioFile = (file: File) => {
    sound.playSparkle();
    hindiaPlayer.uploadAudioFile(file, currentSong.id);
    setToastMessage(`Audio asli dimuat: ${file.name} 🎵`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type.startsWith('audio/') || file.type.includes('mp4') || file.name.endsWith('.mp3'))) {
      processAudioFile(file);
    }
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrlInput.trim()) return;
    sound.playSparkle();
    hindiaPlayer.setAudioUrl(currentSong.id, customUrlInput.trim());
    setToastMessage('Link audio berhasil diterapkan! 🎶');
    setCustomUrlInput('');
    setTimeout(() => setToastMessage(null), 4000);
  };

  const { isPlaying, currentSong, currentTime, duration, activeLyricIndex, volume, audioMode, customUploadedName } = playerState;
  const isRealAudio = audioMode === 'real' || !!currentSong.isCustomAudio;

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-40 max-w-sm sm:max-w-md w-full pointer-events-none">
      {/* Hidden File Input for MP3 / MP4 */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="audio/*,video/mp4,.mp3,.mp4,.m4a,.wav"
        className="hidden"
      />

      <div className="pointer-events-auto flex flex-col items-end">
        {/* Toast alert */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="mb-2 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-2xl shadow-xl flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanded Player / Modal Drawer */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`w-full mb-3 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border ${
                isDragging
                  ? 'border-emerald-500 ring-4 ring-emerald-500/20'
                  : 'border-neutral-200/90 dark:border-neutral-800'
              } rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.18)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-neutral-900 dark:text-white transition-all`}
            >
              {/* Header Bar with Navigation Tabs */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800 mb-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 relative">
                    {isPlaying && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    )}
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    Hindia Lounge
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {/* Now Playing Tab Button */}
                  <button
                    onClick={() => {
                      sound.playClick();
                      setActiveTab('player');
                    }}
                    className={`p-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors ${
                      activeTab === 'player'
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                    title="Now Playing"
                  >
                    <Disc className="w-4 h-4" />
                  </button>

                  {/* Playlist Tab Button */}
                  <button
                    onClick={() => {
                      sound.playClick();
                      setActiveTab('playlist');
                    }}
                    className={`p-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors ${
                      activeTab === 'playlist'
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                    title="Daftar Lagu Hindia"
                  >
                    <ListMusic className="w-4 h-4" />
                  </button>

                  {/* Lyrics Tab Button */}
                  <button
                    onClick={() => {
                      sound.playClick();
                      setActiveTab('lyrics');
                    }}
                    className={`p-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors ${
                      activeTab === 'lyrics'
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                    title="Lirik Lagu"
                  >
                    <Sparkles className="w-4 h-4" />
                  </button>

                  {/* Audio File & Upload Tab Button */}
                  <button
                    onClick={() => {
                      sound.playClick();
                      setActiveTab('source');
                    }}
                    className={`px-2 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-colors ${
                      activeTab === 'source'
                        ? 'bg-emerald-600 text-white'
                        : isRealAudio
                        ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100'
                        : 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100'
                    }`}
                    title="Upload File MP3 / Pengaturan Audio"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isRealAudio ? 'Audio Asli' : 'Upload MP3'}</span>
                  </button>

                  {/* Minimize Button */}
                  <button
                    onClick={() => {
                      sound.playClick();
                      setIsExpanded(false);
                    }}
                    className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ml-1"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Tab 1: Playlist View */}
              {activeTab === 'playlist' ? (
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                      Pilih Lagu Hindia:
                    </p>
                    <button
                      onClick={triggerFileUpload}
                      className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <Upload className="w-3 h-3" />
                      Upload MP3 Sendiri
                    </button>
                  </div>
                  {HINDIA_SONGS.map((song) => {
                    const isSelected = song.id === currentSong.id;
                    return (
                      <button
                        key={song.id}
                        onClick={() => handleSelectSong(song)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left transition-all ${
                          isSelected
                            ? 'bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-900 dark:border-white shadow-sm'
                            : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/60 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={song.coverUrl}
                            alt={song.title}
                            className="w-10 h-10 rounded-xl object-cover shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-bold truncate">{song.title}</p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                              {song.album} • {song.year}
                            </p>
                          </div>
                        </div>
                        <div className="shrink-0 ml-2 text-right">
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-neutral-200/70 dark:bg-neutral-700 font-medium">
                            {formatTime(song.duration)}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : activeTab === 'lyrics' ? (
                /* Tab 2: Lyrics Display */
                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-2 text-center py-2">
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                    Lirik • {currentSong.title}
                  </p>
                  {currentSong.lyrics.map((line, idx) => {
                    const isActive = idx === activeLyricIndex;
                    return (
                      <div
                        key={idx}
                        className={`text-sm transition-all duration-300 py-1.5 px-3 rounded-xl ${
                          isActive
                            ? 'font-extrabold text-neutral-950 dark:text-white bg-[#DCFCE7] dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 scale-105 shadow-sm'
                            : 'text-neutral-500 dark:text-neutral-400 font-medium opacity-60'
                        }`}
                      >
                        {line.text}
                      </div>
                    );
                  })}
                </div>
              ) : activeTab === 'source' ? (
                /* Tab 3: Audio Source & MP3 Upload Settings */
                <div className="space-y-4 max-h-64 overflow-y-auto pr-1">
                  {/* Status Indicator */}
                  <div className={`p-3 rounded-2xl border text-xs leading-relaxed ${
                    isRealAudio
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                      : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                  }`}>
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      {isRealAudio ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span>Status: Audio Asli Aktif</span>
                        </>
                      ) : (
                        <>
                          <Sparkle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                          <span>Status: Mode Sintesis Melodi Lo-Fi</span>
                        </>
                      )}
                    </div>
                    <p className="text-[11px] opacity-90">
                      {isRealAudio
                        ? `Memutar audio rekaman: ${customUploadedName || currentSong.audioUrl || currentSong.title}`
                        : 'Karena file rekaman vokal Hindia asli berhak cipta, saat ini sistem memainkan melodi lo-fi sintetis. Kamu bisa memutar vokal asli Hindia dengan mengupload file MP3/MP4 di bawah!'}
                    </p>
                  </div>

                  {/* Drag & Drop / Click Upload Button */}
                  <div
                    onClick={triggerFileUpload}
                    className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-emerald-500 dark:hover:border-emerald-400 p-4 rounded-2xl text-center cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors group"
                  >
                    <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FileAudio className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-xs text-neutral-900 dark:text-white">
                      Pilih / Drop File Lagu Hindia (.mp3, .mp4, .m4a)
                    </h5>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
                      Klik untuk memilih dari komputermu, suara vokal asli akan langsung berputar!
                    </p>
                  </div>

                  {/* Direct URL Input */}
                  <form onSubmit={handleApplyUrl} className="space-y-1.5">
                    <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1">
                      <Link2 className="w-3 h-3" />
                      Atau Tempelkan Direct URL Audio:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://.../lagu-hindia.mp3"
                        value={customUrlInput}
                        onChange={(e) => setCustomUrlInput(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-bold rounded-xl hover:opacity-90 transition-opacity"
                      >
                        Pasang
                      </button>
                    </div>
                  </form>

                  {/* Permanent Code Guide */}
                  <div className="p-3 bg-neutral-100 dark:bg-neutral-800/80 rounded-2xl text-[11px] text-neutral-600 dark:text-neutral-300 space-y-1">
                    <p className="font-bold flex items-center gap-1 text-neutral-900 dark:text-white">
                      <FolderArchive className="w-3.5 h-3.5 text-emerald-500" />
                      Cara Permanen Tanpa Perlu Upload:
                    </p>
                    <p>Taruh file MP3 ke dalam folder proyek:</p>
                    <code className="block p-1.5 bg-white dark:bg-neutral-900 rounded-lg text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                      public/audio/rumah-ke-rumah.mp3<br />
                      public/audio/secukupnya.mp3<br />
                      public/audio/evaluasi.mp3
                    </code>
                  </div>
                </div>
              ) : (
                /* Tab 4: Main Vinyl Disc + Now Playing View */
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    {/* Vinyl Record Visual */}
                    <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                      <div
                        className={`w-24 h-24 rounded-full bg-neutral-950 dark:bg-black border-4 border-neutral-800 dark:border-neutral-700 shadow-lg flex items-center justify-center ${
                          isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
                        }`}
                      >
                        {/* Vinyl Rings */}
                        <div className="w-18 h-18 rounded-full border border-neutral-700/60 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full border border-neutral-600/60 flex items-center justify-center overflow-hidden">
                            <img
                              src={currentSong.coverUrl}
                              alt={currentSong.title}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>
                        {/* Center Spindle Hole */}
                        <div className="absolute w-3 h-3 rounded-full bg-white dark:bg-neutral-300 shadow-inner" />
                      </div>

                      {!isPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
                          <Disc className="w-8 h-8 text-white/80" />
                        </div>
                      )}
                    </div>

                    {/* Metadata & Equalizer */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap mb-1">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF08A] text-neutral-900">
                          Hindia Band
                        </span>

                        {/* Audio Mode Badge with Clickable Upload trigger */}
                        <button
                          onClick={() => setActiveTab('source')}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold transition-all ${
                            isRealAudio
                              ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                              : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 hover:underline'
                          }`}
                        >
                          {isRealAudio ? '✦ Audio Asli' : '♫ Lo-Fi Synth • Ganti ke MP3'}
                        </button>
                      </div>

                      <h4 className="font-extrabold text-base text-neutral-950 dark:text-white font-display truncate">
                        {currentSong.title}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                        {currentSong.album} ({currentSong.year})
                      </p>

                      {/* Equalizer Frequency Bars */}
                      <div className="flex items-end gap-1 h-6 mt-2">
                        {visualizerBars.map((val, i) => (
                          <div
                            key={i}
                            className="w-1.5 rounded-full transition-all duration-75"
                            style={{
                              height: isPlaying ? `${Math.min(100, Math.max(15, (val / 255) * 100))}%` : '20%',
                              backgroundColor: isPlaying ? currentSong.color : '#A1A1AA'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Active Lyric Pill Preview */}
                  {currentSong.lyrics[activeLyricIndex] && (
                    <div className="p-2.5 rounded-2xl bg-neutral-100/80 dark:bg-neutral-800/80 text-center">
                      <p className="text-xs text-neutral-800 dark:text-neutral-200 font-medium italic truncate">
                        &quot;{currentSong.lyrics[activeLyricIndex].text}&quot;
                      </p>
                    </div>
                  )}

                  {/* Progress Slider */}
                  <div className="space-y-1">
                    <input
                      type="range"
                      min={0}
                      max={duration || 100}
                      step={0.5}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-neutral-950 dark:accent-white"
                    />
                    <div className="flex justify-between text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Controls & Volume */}
                  <div className="flex items-center justify-between pt-1">
                    {/* Volume Slider */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => hindiaPlayer.setVolume(volume > 0 ? 0 : 0.75)}
                        className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                      >
                        {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-16 h-1 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
                      />
                    </div>

                    {/* Main Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePrev}
                        className="p-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                        title="Previous track"
                      >
                        <SkipBack className="w-4 h-4" />
                      </button>

                      <button
                        onClick={handleTogglePlay}
                        className="w-11 h-11 rounded-full bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md"
                        title={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5 fill-current" />
                        ) : (
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        )}
                      </button>

                      <button
                        onClick={handleNext}
                        className="p-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                        title="Next track"
                      >
                        <SkipForward className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Compact Floating Pill Player (Always visible / dockable) */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2.5 px-3 sm:px-4 py-2 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-neutral-200/90 dark:border-neutral-800 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all">
            {/* Spinning Mini Disc */}
            <button
              onClick={() => {
                sound.playClick();
                setIsExpanded(!isExpanded);
              }}
              className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 group"
              title={isExpanded ? 'Minimize' : 'Expand player'}
            >
              <div
                className={`w-full h-full rounded-full bg-neutral-900 flex items-center justify-center ${
                  isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
                }`}
              >
                <img
                  src={currentSong.coverUrl}
                  alt={currentSong.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </button>

            {/* Song title info */}
            <div
              onClick={() => {
                sound.playClick();
                setIsExpanded(!isExpanded);
              }}
              className="cursor-pointer max-w-[110px] sm:max-w-[150px]"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <Music className="w-2.5 h-2.5" />
                  Hindia
                </span>
                {isRealAudio && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Audio Asli Aktif" />
                )}
              </div>
              <p className="text-xs font-bold text-neutral-900 dark:text-white truncate font-display">
                {currentSong.title}
              </p>
            </div>

            {/* Live Visualizer Mini Waves */}
            <div
              onClick={() => setIsExpanded(!isExpanded)}
              className="hidden xs:flex items-end gap-0.5 h-4 cursor-pointer px-1"
            >
              <div
                className={`w-1 rounded-full bg-emerald-500 transition-all ${
                  isPlaying ? 'animate-pulse h-3' : 'h-1'
                }`}
              />
              <div
                className={`w-1 rounded-full bg-emerald-500 transition-all ${
                  isPlaying ? 'animate-bounce h-4' : 'h-1.5'
                }`}
              />
              <div
                className={`w-1 rounded-full bg-emerald-500 transition-all ${
                  isPlaying ? 'animate-pulse h-2' : 'h-1'
                }`}
              />
            </div>

            {/* Quick Upload Button on Floating Pill */}
            <button
              onClick={triggerFileUpload}
              className="p-1.5 text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
              title="Upload file MP3/MP4 lagu Hindia asli"
            >
              <Upload className="w-3.5 h-3.5" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={handleTogglePlay}
              className="w-8 h-8 rounded-full bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shrink-0"
              title={isPlaying ? 'Pause' : 'Play Hindia song'}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              )}
            </button>

            {/* Expand / Minimize Chevron */}
            <button
              onClick={() => {
                sound.playClick();
                setIsExpanded(!isExpanded);
              }}
              className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white p-0.5 rounded-full"
              title={isExpanded ? 'Collapse' : 'Expand music controls'}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
