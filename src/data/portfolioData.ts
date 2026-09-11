import { CaseStudy, StickerItem, TestimonialItem, BagItem, ExperienceItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Ristina Eka Salsabila',
  role: 'Programming & Designer',
  pronouns: 'she/her',
  location: 'Bogor, ID / Remote Worldwide',
  timezone: 'GMT+7',
  status: 'Available for freelance & full-time roles',
  bio: 'Hi there! Im a passionate Data Enthusiast who loves transforming raw data into actionable insights.',
  email: 'ristinaesb@gmail.com',
  avatar: 'https://res.cloudinary.com/dnzhewrrx/image/upload/v1789012862/Gemini_Generated_Image_qpefsvqpefsvqpef_hjzped.jpg',
  socials: [
    { name: 'Instagram', url: 'https://instagram.com/ristinaesb', handle: '@ristinaesb' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ristinaesb/', handle: 'Ristina-Eka' },
    { name: 'Github', url: 'https://github.com/1212-site', handle: 'Ristina' }
  ]
};

export const INITIAL_STICKERS: StickerItem[] = [
  {
    id: 's1',
    text: 'Available for work 🟢',
    color: '#DCFCE7',
    textColor: '#15803D',
    border: '#86EFAC',
    defaultX: 30,
    defaultY: 20,
    rotation: -4,
    tag: 'status'
  },
  {
    id: 's2',
    text: 'Matcha fueled 🍵',
    color: '#FEF9C3',
    textColor: '#854D0E',
    border: '#FDE047',
    defaultX: 75,
    defaultY: 15,
    rotation: 6,
    tag: 'vibe'
  },
  {
    id: 's3',
    text: 'Figma + Framer nerd ⚡️',
    color: '#EDE9FE',
    textColor: '#6D28D9',
    border: '#C4B5FD',
    defaultX: 18,
    defaultY: 70,
    rotation: -7,
    tag: 'tool'
  },
  {
    id: 's4',
    text: 'Craft over Clutter ✨',
    color: '#FCE7F3',
    textColor: '#BE185D',
    border: '#F472B6',
    defaultX: 70,
    defaultY: 75,
    rotation: 5,
    tag: 'motto'
  },
  {
    id: 's5',
    text: 'Lo-Fi Beabadoobee loop 🎧',
    color: '#E0F2FE',
    textColor: '#0369A1',
    border: '#7DD3FC',
    defaultX: 45,
    defaultY: 82,
    rotation: -3,
    tag: 'playlist'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'nudge-habits',
    title: 'Nudge — Micro-habits for Overthinkers',
    tagline: 'Gentle, pressure-free daily rituals designed for Gen Z mental wellbeing.',
    client: 'Nudge Wellness Inc.',
    year: '2025',
    category: 'Mobile Apps',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    accentColor: '#86EFAC',
    overview: 'Nudge is a mobile app rethinking habit tracking for Gen Z who feel overwhelmed by aggressive streak-counters. By swapping shame-driven notifications for gentle, tactile audio cues and customizable widget stickers, Nudge turns daily routines into grounding moments.',
    role: 'Lead Product Designer (Research, Interaction & Mobile UI)',
    timeline: '10 Weeks (V1 Launch)',
    tools: ['Figma', 'Protopie', 'Spline 3D', 'SwiftUI Prototypes'],
    challenge: 'Over 78% of Gen Z users abandon traditional habit trackers within 7 days because missed streaks create anxiety and guilt instead of positive reinforcement.',
    solution: 'Designed a "Grace Period" algorithm with playful dynamic stickers, tactile squishy haptics, and a 1-tap mood canvas that rewards consistency rather than perfection.',
    metrics: [
      { label: 'Day-30 Retention Rate', value: '44.8% (+2.4x benchmark)' },
      { label: 'App Store Rating', value: '4.9 ★ (12k ratings)' },
      { label: 'ProductHunt', value: '#1 Product of the Day' }
    ],
    screenshots: [
      {
        title: 'Tactile Home Screen & Widget Canvas',
        caption: 'Playful floating widget cards that feel like tactile stationery rather than cold data.',
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1000&auto=format&fit=crop'
      },
      {
        title: 'Micro-Reflection Journaling',
        caption: '30-second audio voice notes with auto-generated watercolor emotion gradients.',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop'
      },
      {
        title: 'Playful Sticker Reward System',
        caption: 'Unlockable virtual stickers hand-drawn in Procreate and rendered in interactive 3D.',
        image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1000&auto=format&fit=crop'
      }
    ],
    designSystem: {
      colors: ['#18181B', '#FDFBF7', '#86EFAC', '#FEF08A', '#DDD6FE'],
      fonts: ['Bricolage Grotesque', 'Plus Jakarta Sans']
    },
    testimonial: {
      quote: 'Alya brought our concept to life with infectious energy and uncanny empathy for Gen Z nuance. Our retention numbers spoke for themselves on launch day.',
      author: 'Maya Chen',
      role: 'Co-Founder & CEO, Nudge'
    }
  },
];

export const BAG_ITEMS: BagItem[] = [
  {
    id: 'b1',
    name: 'iPad Pro M4 + Apple Pencil',
    category: 'Hardware',
    desc: 'My digital sketchbook for wireframes, messy mind maps & Procreate stickers.',
    icon: 'Tablet',
    color: '#EDE9FE'
  },
  {
    id: 'b2',
    name: 'AirPods Max (Silver)',
    category: 'Audio',
    desc: 'Essential for entering deep work flow with French house & lo-fi beats.',
    icon: 'Headphones',
    color: '#E0F2FE'
  },
  {
    id: 'b3',
    name: 'Kinto Matcha Bottle 500ml',
    category: 'Fuel',
    desc: 'Filled with Ippodo ceremonial matcha shaken with oat milk & honey.',
    icon: 'Coffee',
    color: '#DCFCE7'
  },
  {
    id: 'b4',
    name: 'Ricoh GR IIIx Camera',
    category: 'Inspiration',
    desc: 'Capturing street typography, urban architecture & raw film textures.',
    icon: 'Camera',
    color: '#FEF9C3'
  },
  {
    id: 'b5',
    name: 'Rhode Peptide Lip Tint',
    category: 'Everyday',
    desc: 'Because staying glossy during Figma marathon sessions is mandatory.',
    icon: 'Sparkles',
    color: '#FCE7F3'
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    period: '2022 - 2023',
    role: 'Multimedia Team ',
    company: 'MBKM KEDAIREKA',
    location: 'Kab. Kuningan, Indonesia ',
    highlight: 'Create multimedia elements such as planned video recordings and virtual backgrounds using Figma. Work closely with other teams, to procure events that require multimedia operations.',
    isCurrent: true
  },
  {
    period: 'June - Sep 2022',
    role: 'Material Development ',
    company: 'K3 Training ',
    location: 'Bogor, Indonesia',
    highlight: 'Manage training participant administration and registration, develop and update training materials and guidelines, and monitor participant progress and feedback.',
    isCurrent: false
  },
  {
    period: 'Sep - Dec 2021',
    role: 'Computer Science Student Association ',
    company: 'ITC 2021 (Information & Technology Celebration)',
    location: 'Bogor, Indonesia',
    highlight: 'Designing and editing promotional materials and retouching images to create compelling visual communications that align with the brand identity.',
    isCurrent: false
  }
];

export const TESTIMONIALS: TestimonialItem[] = [  
  {
    id: 't1',
    quote: 'Alya has that rare superpower: she understands the chaotic soul of Gen Z aesthetics, yet delivers with the discipline of a veteran design director.',
    name: 'Claire Zhang',
    role: 'VP of Product',
    company: 'Loom & Vibe',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop',
    badge: '10/10 Collaboration'
  },
  {
    id: 't2',
    quote: 'Our mobile retention jumped 240% after Alya redesigned the onboarding flow. Her tactile micro-interactions turned a boring questionnaire into pure joy.',
    name: 'Marcus Thorne',
    role: 'Founder',
    company: 'Nudge Wellness',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    badge: 'Top Tier Designer'
  },
  {
    id: 't3',
    quote: 'Speed, aesthetic perfection, and zero ego. She shipped our entire Framer marketing site in 2 weeks, and it won an Site of the Day award.',
    name: 'Siti Rahma',
    role: 'Head of Marketing',
    company: 'SipSip Club',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop',
    badge: 'Award Winning'
  }
];

export const SERVICES = [
  {
    id: 'srv-app',
    title: 'Mobile App Design (iOS & Android)',
    description: 'End-to-end UX research, wireframes, high-fidelity prototypes, and design tokens built for real-world development.',
    deliverables: ['Interactive Prototypes', 'Figma Design Tokens', 'Developer Handoff Guide', 'App Store Screen Mockups'],
    timeline: '3 - 6 Weeks',
    badge: 'Most Popular'
  },
  {
    id: 'srv-web',
    title: 'Websites in Framer & React',
    description: 'Stunning, fluid websites with buttery scroll animations, dynamic CMS setups, and responsive design down to the pixel.',
    deliverables: ['Custom Framer/React Build', 'SEO & Speed Optimization', 'Interactive Micro-animations', 'CMS Setup'],
    timeline: '2 - 4 Weeks',
    badge: 'High Conversion'
  },
  {
    id: 'srv-brand',
    title: 'Brand Identity & Visual Universe',
    description: 'Distinctive logos, bespoke sticker packs, custom typography pairings, and complete digital brand guidelines.',
    deliverables: ['Logo Suite & Favicons', 'Color & Type System', 'Custom Digital Sticker Pack', 'Brand Guidelines PDF'],
    timeline: '2 - 3 Weeks',
    badge: 'Identity'
  },
  {
    id: 'srv-audit',
    title: 'UX & Visual Polish Sprint',
    description: '1-week intensive design audit to fix UX friction, elevate aesthetic polish, and boost conversion metrics.',
    deliverables: ['Loom Video Walkthrough', 'Figma Redesign File', 'Actionable Fix Checklist', 'Heuristic Evaluation'],
    timeline: '1 Week',
    badge: 'Fast Sprint'
  }
];
