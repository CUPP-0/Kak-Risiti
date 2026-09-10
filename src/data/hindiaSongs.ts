export interface HindiaLyricLine {
  time: number; // in seconds
  text: string;
}

export interface HindiaSongData {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: string;
  coverUrl: string;
  bpm: number;
  duration: number; // seconds
  vibe: string;
  color: string;
  audioUrl?: string; // Real audio file path (e.g. /audio/secukupnya.mp3 or blob URL)
  isCustomAudio?: boolean; // Indicates if user uploaded their own audio file
  lyrics: HindiaLyricLine[];
  melodicPattern: {
    rootNote: string;
    chordProgression: string[];
    leadNotes: { note: string; duration: number; time: number }[];
  };
}

export const HINDIA_SONGS: HindiaSongData[] = [
  {
    id: 'rumah-ke-rumah',
    title: 'Rumah ke Rumah',
    artist: 'Hindia',
    album: 'Menari dengan Bayangan',
    year: '2019',
    coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=600&auto=format&fit=crop',
    bpm: 96,
    duration: 165,
    vibe: 'Nostalgic, Heartfelt, Melancholic',
    color: '#86EFAC',
    audioUrl: '/audio/rumah-ke-rumah.mp3',
    lyrics: [
      { time: 0, text: '♫ [Intro piano yang hangat & syahdu] ♫' },
      { time: 5, text: 'Menyesal, tak pernah benar-benar paham' },
      { time: 12, text: 'Pindah berkala, satu atap ke atap lainnya' },
      { time: 19, text: 'Mencari rumah yang tak kunjung menyala' },
      { time: 27, text: 'Terima kasih telah singgah di hidupku' },
      { time: 35, text: 'Jika ada yang buatmu tersenyum lagi' },
      { time: 42, text: 'Kuharap kau tak lupa namaku selamanya' },
      { time: 50, text: '♫ [Melodi gitar Hindia mengalun lembut] ♫' },
      { time: 58, text: 'Dan jika nanti kau temukan tempat pulang' },
      { time: 66, text: 'Kudoakan tenang selalu menyertaimu' },
      { time: 75, text: 'Pindah berkala, satu atap ke atap lainnya...' },
      { time: 88, text: '♫ [Outro: Terima kasih telah menjadi rumah sementara] ♫' }
    ],
    melodicPattern: {
      rootNote: 'D',
      chordProgression: ['D', 'F#m', 'G', 'A'],
      leadNotes: [
        { note: 'F#4', duration: 0.4, time: 0.0 },
        { note: 'A4', duration: 0.4, time: 0.5 },
        { note: 'B4', duration: 0.6, time: 1.0 },
        { note: 'A4', duration: 0.5, time: 1.8 },
        { note: 'F#4', duration: 0.4, time: 2.5 },
        { note: 'E4', duration: 0.4, time: 3.0 },
        { note: 'D4', duration: 0.8, time: 3.5 },
        { note: 'F#4', duration: 0.5, time: 4.5 },
        { note: 'G4', duration: 0.4, time: 5.2 },
        { note: 'F#4', duration: 0.4, time: 5.8 },
        { note: 'E4', duration: 0.7, time: 6.4 },
        { note: 'D4', duration: 0.9, time: 7.2 }
      ]
    }
  },
  {
    id: 'evaluasi',
    title: 'Evaluasi',
    artist: 'Hindia',
    album: 'Menari dengan Bayangan',
    year: '2019',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop',
    bpm: 104,
    duration: 172,
    vibe: 'Comforting, Healing, Uplifting',
    color: '#FEF08A',
    audioUrl: '/audio/evaluasi.mp3',
    lyrics: [
      { time: 0, text: '♫ [Petikan chord akustik & synth lo-fi] ♫' },
      { time: 6, text: 'Yang kau takutkan takkan terjadi' },
      { time: 13, text: 'Yang kau cari takkan kemana-mana' },
      { time: 20, text: 'Masalah yang mengeruh, bersedihlah semaumu' },
      { time: 28, text: 'Menangis bila perlu, jangan dipendam melulu' },
      { time: 36, text: 'Bilas muka, gosok gigi, evaluasi...' },
      { time: 44, text: 'Tidur sejenak, esok hari kita coba lagi' },
      { time: 52, text: '♫ [Arpeggio hangat penyemangat malam] ♫' },
      { time: 62, text: 'Perjalanan masih panjang, jangan terburu-buru' },
      { time: 72, text: 'Semua orang punya porsi dan waktunya sendiri' },
      { time: 82, text: 'Bilas muka, gosok gigi, evaluasi...' }
    ],
    melodicPattern: {
      rootNote: 'C',
      chordProgression: ['C', 'G', 'Am', 'F'],
      leadNotes: [
        { note: 'E4', duration: 0.4, time: 0.0 },
        { note: 'G4', duration: 0.4, time: 0.5 },
        { note: 'A4', duration: 0.6, time: 1.0 },
        { note: 'G4', duration: 0.5, time: 1.7 },
        { note: 'E4', duration: 0.4, time: 2.3 },
        { note: 'D4', duration: 0.4, time: 2.8 },
        { note: 'C4', duration: 0.8, time: 3.3 },
        { note: 'D4', duration: 0.4, time: 4.2 },
        { note: 'E4', duration: 0.5, time: 4.8 },
        { note: 'D4', duration: 0.4, time: 5.5 },
        { note: 'C4', duration: 0.9, time: 6.1 }
      ]
    }
  },
  {
    id: 'secukupnya',
    title: 'Secukupnya',
    artist: 'Hindia',
    album: 'Menari dengan Bayangan / NKCTHI',
    year: '2019',
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop',
    bpm: 122,
    duration: 180,
    vibe: 'Dynamic, Indie Rock, Reflective',
    color: '#C4B5FD',
    audioUrl: '/audio/secukupnya.mp3',
    lyrics: [
      { time: 0, text: '♫ [Bassline groovy & ketukan drum retro] ♫' },
      { time: 6, text: 'Kapan terakhir kali kamu dapat tertidur tenang?' },
      { time: 13, text: 'Tak dikejar waktu, tak ditikam sepi...' },
      { time: 20, text: 'Semua yang sia-sia, terjadi biar terjadi' },
      { time: 27, text: 'Tersenyum secukupnya, menangis seperlunya' },
      { time: 35, text: 'Kita hanyalah manusia, tak perlu serba bisa' },
      { time: 43, text: '♫ [Synthesizer lead & energetic pulse] ♫' },
      { time: 52, text: 'Semua yang hilang akan digantikan yang lebih baik' },
      { time: 61, text: 'Jalani harimu, jangan biarkan lelah menang' },
      { time: 70, text: 'Tersenyum secukupnya... Menangis seperlunya...' }
    ],
    melodicPattern: {
      rootNote: 'Em',
      chordProgression: ['Em', 'C', 'G', 'D'],
      leadNotes: [
        { note: 'B4', duration: 0.3, time: 0.0 },
        { note: 'B4', duration: 0.3, time: 0.4 },
        { note: 'A4', duration: 0.3, time: 0.8 },
        { note: 'G4', duration: 0.5, time: 1.2 },
        { note: 'E4', duration: 0.4, time: 1.8 },
        { note: 'G4', duration: 0.3, time: 2.3 },
        { note: 'A4', duration: 0.4, time: 2.8 },
        { note: 'G4', duration: 0.5, time: 3.4 },
        { note: 'E4', duration: 0.8, time: 4.1 },
        { note: 'D4', duration: 0.4, time: 5.0 },
        { note: 'E4', duration: 0.7, time: 5.6 }
      ]
    }
  },
  {
    id: 'cincin',
    title: 'Cincin',
    artist: 'Hindia',
    album: 'Lagipula Hidup Akan Berakhir',
    year: '2023',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop',
    bpm: 92,
    duration: 170,
    vibe: 'Dreamy, Bedroom Pop, Gentle Romance',
    color: '#F472B6',
    audioUrl: '/audio/cincin.mp3',
    lyrics: [
      { time: 0, text: '♫ [Rhodes keyboard mellow & lo-fi reverb] ♫' },
      { time: 6, text: 'Kau bukan yang terbaik, ku pun sama' },
      { time: 13, text: 'Banyak cela yang kita sembunyikan' },
      { time: 20, text: 'Tapi jika kau bersedia, jalani ini bersama' },
      { time: 28, text: 'Semoga kita tahan banting hadapi dunia' },
      { time: 36, text: 'Kelingking bertaut, janji tak saling melepas' },
      { time: 45, text: '♫ [Alunan melodi romantis & tenang] ♫' },
      { time: 55, text: 'Bila badai datang, kita hadapi berdua' },
      { time: 65, text: 'Kau bukan yang terbaik, tapi yang paling ku cinta...' }
    ],
    melodicPattern: {
      rootNote: 'A',
      chordProgression: ['A', 'C#m', 'D', 'E'],
      leadNotes: [
        { note: 'C#5', duration: 0.4, time: 0.0 },
        { note: 'B4', duration: 0.3, time: 0.5 },
        { note: 'A4', duration: 0.5, time: 1.0 },
        { note: 'F#4', duration: 0.4, time: 1.6 },
        { note: 'A4', duration: 0.4, time: 2.2 },
        { note: 'B4', duration: 0.4, time: 2.8 },
        { note: 'C#5', duration: 0.6, time: 3.4 },
        { note: 'A4', duration: 0.8, time: 4.2 }
      ]
    }
  },
  {
    id: 'membasuh',
    title: 'Membasuh (feat. Rara Sekar)',
    artist: 'Hindia, Rara Sekar',
    album: 'Menari dengan Bayangan',
    year: '2019',
    coverUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=600&auto=format&fit=crop',
    bpm: 84,
    duration: 160,
    vibe: 'Peaceful, Folk Acoustic, Cathartic',
    color: '#6EE7B7',
    audioUrl: '/audio/membasuh.mp3',
    lyrics: [
      { time: 0, text: '♫ [Petikan senar akustik yang syahdu & hening] ♫' },
      { time: 6, text: 'Bisakah kita tetap membasuh' },
      { time: 13, text: 'Jika kita sendiri yang kering?' },
      { time: 20, text: 'Kelana sampai ujung samudra' },
      { time: 28, text: 'Mencari mata air yang tak pernah sirna' },
      { time: 36, text: 'Semoga ada yang tersisa untuk dirimu pulang' },
      { time: 45, text: '♫ [Harmoni vokal yang menyejukkan hati] ♫' },
      { time: 56, text: 'Segala luka akan mengering pada waktunya' },
      { time: 67, text: 'Bisakah kita tetap membasuh...' }
    ],
    melodicPattern: {
      rootNote: 'G',
      chordProgression: ['G', 'C', 'Em', 'D'],
      leadNotes: [
        { note: 'G4', duration: 0.4, time: 0.0 },
        { note: 'A4', duration: 0.4, time: 0.5 },
        { note: 'B4', duration: 0.6, time: 1.0 },
        { note: 'D5', duration: 0.7, time: 1.8 },
        { note: 'B4', duration: 0.4, time: 2.7 },
        { note: 'A4', duration: 0.4, time: 3.3 },
        { note: 'G4', duration: 0.8, time: 3.9 },
        { note: 'E4', duration: 0.6, time: 4.9 },
        { note: 'G4', duration: 0.9, time: 5.7 }
      ]
    }
  }
];
