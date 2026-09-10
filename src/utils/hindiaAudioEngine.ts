// Hindia Web Audio & Real Audio Hybrid Engine
// Plays real Hindia tracks (MP3/MP4/M4A/Audio files & streams)
// with seamless fallback to warm, lo-fi melodic synthesizer when files are not yet loaded.

import { HINDIA_SONGS, HindiaSongData } from '../data/hindiaSongs';

export type HindiaAudioMode = 'real' | 'synth';

export interface HindiaPlayerState {
  isPlaying: boolean;
  currentSong: HindiaSongData;
  currentTime: number;
  duration: number;
  activeLyricIndex: number;
  volume: number;
  audioMode: HindiaAudioMode;
  isRealAudioLoaded: boolean;
  customUploadedName?: string;
}

type PlaybackListener = (state: HindiaPlayerState) => void;

// Musical Note to Frequency (Hz) Map for synth fallback
const NOTE_FREQS: Record<string, number> = {
  'C2': 65.41, 'D2': 73.42, 'E2': 82.41, 'F2': 87.31, 'F#2': 92.50, 'G2': 98.00, 'A2': 110.00, 'B2': 123.47,
  'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'D#3': 155.56, 'E3': 164.81, 'F3': 174.61, 'F#3': 185.00, 'G3': 196.00, 'G#3': 207.65, 'A3': 220.00, 'A#3': 233.08, 'B3': 246.94,
  'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
  'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77
};

// Chord note recipes
const CHORD_NOTES: Record<string, string[]> = {
  'D': ['D3', 'F#3', 'A3', 'D4'],
  'F#m': ['F#3', 'A3', 'C#4', 'F#4'],
  'G': ['G3', 'B3', 'D4', 'G4'],
  'A': ['A3', 'C#4', 'E4', 'A4'],
  'C': ['C3', 'E3', 'G3', 'C4'],
  'Am': ['A3', 'C4', 'E4', 'A4'],
  'F': ['F3', 'A3', 'C4', 'F4'],
  'Em': ['E3', 'G3', 'B3', 'E4'],
  'C#m': ['C#3', 'E3', 'G#3', 'C#4'],
  'E': ['E3', 'G#3', 'B3', 'E4']
};

class HindiaAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  public analyser: AnalyserNode | null = null;

  private audioElement: HTMLAudioElement | null = null;
  private mediaSourceConnected: boolean = false;
  private audioMode: HindiaAudioMode = 'synth';
  private customFileNames: Map<string, string> = new Map();

  private currentSongIndex: number = 0;
  private isAudioPlaying: boolean = false;
  private currentPlaybackTime: number = 0;
  private volumeLevel: number = 0.75;

  private scheduleTimer: number | null = null;
  private progressTimer: number | null = null;
  private listeners: Set<PlaybackListener> = new Set();

  private loopStep: number = 0;
  private lastChordIndex: number = 0;

  constructor() {
    // Lazy initialize on user interaction
  }

  private initAudioContext(): boolean {
    if (typeof window === 'undefined') return false;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = this.volumeLevel;

        // Warm tape / lo-fi lowpass filter for synth
        this.filterNode = this.ctx.createBiquadFilter();
        this.filterNode.type = 'lowpass';
        this.filterNode.frequency.value = 2600;
        this.filterNode.Q.value = 1.1;

        // Visualizer analyzer
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 64;
        this.analyser.smoothingTimeConstant = 0.8;

        this.filterNode.connect(this.masterGain);
        this.masterGain.connect(this.analyser);
        this.analyser.connect(this.ctx.destination);
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    this.initAudioElement();
    return !!this.ctx;
  }

  private initAudioElement() {
    if (typeof window === 'undefined') return;
    if (!this.audioElement) {
      this.audioElement = new Audio();
      this.audioElement.preload = 'auto';
      this.audioElement.volume = this.volumeLevel;

      this.audioElement.addEventListener('timeupdate', () => {
        if (this.audioMode === 'real' && this.audioElement) {
          this.currentPlaybackTime = this.audioElement.currentTime;
          this.notifyListeners();
        }
      });

      this.audioElement.addEventListener('loadedmetadata', () => {
        if (this.audioElement && this.audioElement.duration && !isNaN(this.audioElement.duration)) {
          const song = HINDIA_SONGS[this.currentSongIndex];
          if (song) {
            song.duration = Math.round(this.audioElement.duration);
          }
          this.notifyListeners();
        }
      });

      this.audioElement.addEventListener('ended', () => {
        this.next();
      });

      this.audioElement.addEventListener('error', () => {
        // If file fails to play (e.g. 404 on local /audio/*.mp3), fallback gracefully to synth
        if (this.isAudioPlaying && this.audioMode === 'real') {
          console.info('Audio file could not be played, falling back to gentle lo-fi synth mode');
          this.audioMode = 'synth';
          this.startSynth();
        }
      });

      // Connect HTMLAudioElement to Web Audio Analyser if supported
      if (this.ctx && this.analyser && !this.mediaSourceConnected) {
        try {
          const source = this.ctx.createMediaElementSource(this.audioElement);
          source.connect(this.analyser);
          this.mediaSourceConnected = true;
        } catch {
          // Already connected or not allowed
        }
      }
    }
  }

  // Upload an actual MP3/MP4/M4A/Audio file directly from user device
  public uploadAudioFile(file: File, targetSongId?: string): string {
    const objectUrl = URL.createObjectURL(file);
    const songId = targetSongId || HINDIA_SONGS[this.currentSongIndex].id;
    const song = HINDIA_SONGS.find((s) => s.id === songId);

    if (song) {
      song.audioUrl = objectUrl;
      song.isCustomAudio = true;
      this.customFileNames.set(song.id, file.name);
    }

    // If currently on this song or requested, switch & play immediately
    if (song && song.id === HINDIA_SONGS[this.currentSongIndex].id) {
      this.play(song.id);
    } else {
      this.notifyListeners();
    }

    return objectUrl;
  }

  // Set an external audio URL (e.g. cloud storage or stream)
  public setAudioUrl(songId: string, url: string) {
    const song = HINDIA_SONGS.find((s) => s.id === songId);
    if (song) {
      song.audioUrl = url;
      song.isCustomAudio = true;
      this.customFileNames.set(song.id, url.split('/').pop() || 'Remote Audio');
      if (song.id === HINDIA_SONGS[this.currentSongIndex].id && this.isAudioPlaying) {
        this.play(song.id);
      } else {
        this.notifyListeners();
      }
    }
  }

  // Synthesizer voice methods
  private playSynthNote(freq: number, startTime: number, duration: number, gainMultiplier: number = 1.0) {
    if (!this.ctx || !this.filterNode) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, startTime);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 1.002, startTime);

    const peakGain = 0.12 * gainMultiplier;
    noteGain.gain.setValueAtTime(0.001, startTime);
    noteGain.gain.linearRampToValueAtTime(peakGain, startTime + 0.02);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(this.filterNode);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration + 0.05);
    osc2.stop(startTime + duration + 0.05);
  }

  private playBassNote(freq: number, startTime: number, duration: number) {
    if (!this.ctx || !this.filterNode) return;

    const bassOsc = this.ctx.createOscillator();
    const bassGain = this.ctx.createGain();

    bassOsc.type = 'sine';
    bassOsc.frequency.setValueAtTime(freq / 2, startTime);

    bassGain.gain.setValueAtTime(0.001, startTime);
    bassGain.gain.linearRampToValueAtTime(0.18, startTime + 0.03);
    bassGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    bassOsc.connect(bassGain);
    bassGain.connect(this.filterNode);

    bassOsc.start(startTime);
    bassOsc.stop(startTime + duration + 0.05);
  }

  private playLoFiRhythm(isKick: boolean, startTime: number) {
    if (!this.ctx || !this.filterNode) return;

    if (isKick) {
      const kickOsc = this.ctx.createOscillator();
      const kickGain = this.ctx.createGain();

      kickOsc.type = 'sine';
      kickOsc.frequency.setValueAtTime(110, startTime);
      kickOsc.frequency.exponentialRampToValueAtTime(42, startTime + 0.09);

      kickGain.gain.setValueAtTime(0.16, startTime);
      kickGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);

      kickOsc.connect(kickGain);
      kickGain.connect(this.filterNode);

      kickOsc.start(startTime);
      kickOsc.stop(startTime + 0.13);
    } else {
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.04);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.value = 1800;

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.035, startTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.0005, startTime + 0.05);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.filterNode);

      noise.start(startTime);
      noise.stop(startTime + 0.06);
    }
  }

  private schedulePhrase() {
    if (!this.ctx || !this.isAudioPlaying || this.audioMode !== 'synth') return;

    const song = HINDIA_SONGS[this.currentSongIndex];
    const secondsPerBeat = 60 / song.bpm;
    const now = this.ctx.currentTime;

    const chords = song.melodicPattern.chordProgression;
    const chord = chords[this.lastChordIndex % chords.length];
    const notesInChord = CHORD_NOTES[chord] || ['C3', 'E3', 'G3', 'C4'];

    notesInChord.forEach((noteName, idx) => {
      const freq = NOTE_FREQS[noteName];
      if (freq) {
        const noteStartTime = now + idx * 0.04;
        this.playSynthNote(freq, noteStartTime, secondsPerBeat * 2.2, 0.7);
      }
    });

    const rootNoteName = notesInChord[0];
    if (NOTE_FREQS[rootNoteName]) {
      this.playBassNote(NOTE_FREQS[rootNoteName], now, secondsPerBeat * 2.5);
    }

    const leadNotes = song.melodicPattern.leadNotes;
    const currentLead = leadNotes[this.loopStep % leadNotes.length];
    if (currentLead && NOTE_FREQS[currentLead.note]) {
      this.playSynthNote(NOTE_FREQS[currentLead.note], now + 0.08, currentLead.duration * 1.5, 1.3);
    }

    this.playLoFiRhythm(this.loopStep % 2 === 0, now);
    this.playLoFiRhythm(false, now + secondsPerBeat);

    this.loopStep++;
    if (this.loopStep % 2 === 0) {
      this.lastChordIndex = (this.lastChordIndex + 1) % chords.length;
    }

    const nextPhraseTimeMs = secondsPerBeat * 1000 * 2;
    this.scheduleTimer = window.setTimeout(() => {
      this.schedulePhrase();
    }, nextPhraseTimeMs);
  }

  private startSynth() {
    if (this.scheduleTimer) clearTimeout(this.scheduleTimer);
    if (this.progressTimer) clearInterval(this.progressTimer);

    this.schedulePhrase();

    this.progressTimer = window.setInterval(() => {
      const song = HINDIA_SONGS[this.currentSongIndex];
      this.currentPlaybackTime += 0.25;

      if (this.currentPlaybackTime >= song.duration) {
        this.next();
      } else {
        this.notifyListeners();
      }
    }, 250);

    this.notifyListeners();
  }

  public play(songId?: string) {
    this.initAudioContext();

    if (songId) {
      const targetIdx = HINDIA_SONGS.findIndex((s) => s.id === songId);
      if (targetIdx !== -1 && targetIdx !== this.currentSongIndex) {
        this.currentSongIndex = targetIdx;
        this.currentPlaybackTime = 0;
        this.lastChordIndex = 0;
        this.loopStep = 0;
      }
    }

    const currentSong = HINDIA_SONGS[this.currentSongIndex];
    this.isAudioPlaying = true;

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    // Try playing real audio if URL is available
    if (currentSong.audioUrl && this.audioElement) {
      // If src changed or not set yet
      const currentSrc = this.audioElement.getAttribute('src');
      if (currentSrc !== currentSong.audioUrl) {
        this.audioElement.src = currentSong.audioUrl;
        this.audioElement.currentTime = this.currentPlaybackTime;
      }

      this.audioElement.volume = this.volumeLevel;

      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Real audio playing successfully!
            this.audioMode = 'real';
            if (this.scheduleTimer) {
              clearTimeout(this.scheduleTimer);
              this.scheduleTimer = null;
            }
            if (this.progressTimer) {
              clearInterval(this.progressTimer);
              this.progressTimer = null;
            }
            this.notifyListeners();
          })
          .catch(() => {
            // Real audio file not accessible (e.g. 404 in public folder) -> fallback to synth
            this.audioMode = 'synth';
            this.startSynth();
          });
        return;
      }
    }

    // Default to synth
    this.audioMode = 'synth';
    this.startSynth();
  }

  public pause() {
    this.isAudioPlaying = false;

    if (this.audioElement) {
      this.audioElement.pause();
    }

    if (this.scheduleTimer) {
      clearTimeout(this.scheduleTimer);
      this.scheduleTimer = null;
    }
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
      this.progressTimer = null;
    }

    this.notifyListeners();
  }

  public togglePlay() {
    if (this.isAudioPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public next() {
    this.currentSongIndex = (this.currentSongIndex + 1) % HINDIA_SONGS.length;
    this.currentPlaybackTime = 0;
    this.lastChordIndex = 0;
    this.loopStep = 0;

    if (this.isAudioPlaying) {
      this.play();
    } else {
      this.notifyListeners();
    }
  }

  public previous() {
    this.currentSongIndex = (this.currentSongIndex - 1 + HINDIA_SONGS.length) % HINDIA_SONGS.length;
    this.currentPlaybackTime = 0;
    this.lastChordIndex = 0;
    this.loopStep = 0;

    if (this.isAudioPlaying) {
      this.play();
    } else {
      this.notifyListeners();
    }
  }

  public seek(seconds: number) {
    const song = HINDIA_SONGS[this.currentSongIndex];
    this.currentPlaybackTime = Math.max(0, Math.min(seconds, song.duration));

    if (this.audioMode === 'real' && this.audioElement) {
      this.audioElement.currentTime = this.currentPlaybackTime;
    }

    this.notifyListeners();
  }

  public setVolume(val: number) {
    this.volumeLevel = Math.max(0, Math.min(val, 1));

    if (this.audioElement) {
      this.audioElement.volume = this.volumeLevel;
    }

    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volumeLevel, this.ctx.currentTime);
    }

    this.notifyListeners();
  }

  public getVisualizerData(): number[] {
    if (this.analyser && this.isAudioPlaying) {
      const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(dataArray);
      const samples: number[] = [];
      const step = Math.floor(dataArray.length / 8);
      for (let i = 0; i < 8; i++) {
        const val = dataArray[i * step] || 0;
        samples.push(Math.max(14, val));
      }
      return samples;
    }

    // Default gentle pulse if analyser empty
    return this.isAudioPlaying
      ? [30, 55, 75, 45, 65, 80, 40, 60]
      : [10, 10, 10, 10, 10, 10, 10, 10];
  }

  private getActiveLyricIndex(): number {
    const song = HINDIA_SONGS[this.currentSongIndex];
    let activeIdx = 0;
    for (let i = 0; i < song.lyrics.length; i++) {
      if (this.currentPlaybackTime >= song.lyrics[i].time) {
        activeIdx = i;
      } else {
        break;
      }
    }
    return activeIdx;
  }

  public subscribe(listener: PlaybackListener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getState(): HindiaPlayerState {
    const currentSong = HINDIA_SONGS[this.currentSongIndex];
    const customName = this.customFileNames.get(currentSong.id);
    const isRealLoaded = !!(currentSong.isCustomAudio || this.audioMode === 'real');

    return {
      isPlaying: this.isAudioPlaying,
      currentSong,
      currentTime: this.currentPlaybackTime,
      duration: currentSong.duration,
      activeLyricIndex: this.getActiveLyricIndex(),
      volume: this.volumeLevel,
      audioMode: this.audioMode,
      isRealAudioLoaded: isRealLoaded,
      customUploadedName: customName
    };
  }

  private notifyListeners() {
    const state = this.getState();
    this.listeners.forEach((listener) => {
      try {
        listener(state);
      } catch {
        // safe ignore
      }
    });
  }
}

export const hindiaPlayer = new HindiaAudioEngine();
