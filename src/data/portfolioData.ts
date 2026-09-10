import { CaseStudy, StickerItem, TestimonialItem, BagItem, ExperienceItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Alya Kirana',
  role: 'Product & Visual Designer',
  pronouns: 'she/her',
  location: 'Jakarta, ID / Remote Worldwide',
  timezone: 'GMT+7',
  status: 'Available for freelance & full-time roles',
  bio: 'A 22-year-old Gen Z designer bridging human emotion with tactile, interactive digital products. Formerly crafting interfaces at Studio Nudge and experimenting with creative tools at Creatie Lab.',
  email: 'hello@alyakirana.design',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
  socials: [
    { name: 'Instagram', url: 'https://instagram.com', handle: '@alyakirana.design' },
    { name: 'Twitter / X', url: 'https://twitter.com', handle: '@alyakirana' },
    { name: 'Dribbble', url: 'https://dribbble.com', handle: 'alyakirana' },
    { name: 'LinkedIn', url: 'https://linkedin.com', handle: 'alya-kirana' },
    { name: 'Read.cv', url: 'https://read.cv', handle: 'alyak' }
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
  {
    id: 'creatie-studio',
    title: 'Creatie — AI Design Companion for Creators',
    tagline: 'Interactive web platform turning creative briefs into tactile visual moodboards.',
    client: 'Creatie Technologies',
    year: '2025',
    category: 'UI/UX & Web',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    accentColor: '#C4B5FD',
    overview: 'Creatie is an intuitive visual studio canvas for graphic designers, art directors, and creative coders. We designed an interface inspired by vintage physical drafting tables infused with fluid web interactions.',
    role: 'Product Designer & Design Systems Lead',
    timeline: '12 Weeks',
    tools: ['Figma', 'Framer', 'React', 'Tailwind CSS'],
    challenge: 'Existing design tools are cluttered with 300+ menu bars and tiny icon toolbars, alienating young independent creators who prefer visual, direct-manipulation gestures.',
    solution: 'Engineered a floating command dock, customizable sticker tools, and magnetic canvas grids that feel fluid and enjoyable to use for hours.',
    metrics: [
      { label: 'Weekly Active Designers', value: '85,000+' },
      { label: 'Task Completion Speed', value: '+35% faster' },
      { label: 'Design System Adoption', value: '100% across 4 teams' }
    ],
    screenshots: [
      {
        title: 'Infinite Canvas with Floating Controls',
        caption: 'Minimalist floating glass dock that collapses contextually based on canvas zoom.',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop'
      },
      {
        title: 'Real-time Multiplayer Cursors with Emoji Reactions',
        caption: 'Playful cursor trails and instant reaction popups for remote creative jams.',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop'
      }
    ],
    designSystem: {
      colors: ['#09090B', '#F4F4F5', '#A78BFA', '#F472B6', '#38BDF8'],
      fonts: ['Syne', 'Plus Jakarta Sans']
    },
    testimonial: {
      quote: 'Working with Alya felt effortless. She bridges visual flair with rigorous design system thinking.',
      author: 'Leo Vance',
      role: 'Head of Product, Creatie'
    }
  },
  {
    id: 'sipsip-matcha',
    title: 'SipSip — Artisanal Ceremonial Matcha Club',
    tagline: 'E-commerce and brand identity for a modern Kyoto-to-Jakarta beverage brand.',
    client: 'SipSip Collective',
    year: '2024',
    category: 'Brand Identity',
    coverImage: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1200&auto=format&fit=crop',
    accentColor: '#FDE047',
    overview: 'Complete brand narrative, packaging design, customized Shopify store, and digital sticker campaign for SipSip, an artisanal ceremonial grade matcha brand targeting aesthetic coffee/tea enthusiasts.',
    role: 'Creative Director & Digital Designer',
    timeline: '6 Weeks',
    tools: ['Illustrator', 'Photoshop', 'Framer', 'Blender 3D'],
    challenge: 'Traditional ceremonial matcha brands either feel overly medicinal or sterile, missing the playful social media culture of Gen Z beverage rituals.',
    solution: 'Crafted a pastel matcha-green brand universe with cheeky mascot stickers, a bespoke Quiz to Match Your Mood, and a high-converting frictionless checkout.',
    metrics: [
      { label: 'First Month Sales', value: '$42,000 (Sold Out)' },
      { label: 'Conversion Rate', value: '4.8% (Industry avg: 1.9%)' },
      { label: 'UGC Video Reach', value: '1.2M+ TikTok impressions' }
    ],
    screenshots: [
      {
        title: 'Custom Packaging & Unboxing Kit',
        caption: 'Matte aluminum canisters with tactile embossed holographic foil stickers.',
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1000&auto=format&fit=crop'
      },
      {
        title: 'Interactive Sip Mood Selector',
        caption: 'Interactive quiz matching roast profiles and sweetness levels to daily energy.',
        image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=1000&auto=format&fit=crop'
      }
    ],
    designSystem: {
      colors: ['#2E4828', '#EFFDF0', '#FDE047', '#FBBF24'],
      fonts: ['Cabinet Grotesque', 'General Sans']
    },
    testimonial: {
      quote: 'Alya captured the exact soul of our brand before we even had the words for it. Our customers constantly rave about the unboxing and web experience.',
      author: 'Tara Widjaja',
      role: 'Founder, SipSip Collective'
    }
  },
  {
    id: 'aura-banking',
    title: 'Aura — Neo-banking for Young Creatives',
    tagline: 'Split bills, earn interest on freelance gigs, and visualize budgets without spreadsheets.',
    client: 'Aura Financial Ltd.',
    year: '2024',
    category: 'Mobile Apps',
    coverImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop',
    accentColor: '#F472B6',
    overview: 'Aura is a digital banking app crafted for freelance creators and creators under 25. Featuring dynamic spending circles, automatic tax stashing, and instant peer-to-peer bill splitting with memes.',
    role: 'Senior UI/UX Designer',
    timeline: '8 Weeks',
    tools: ['Figma', 'Principle', 'Design Tokens', 'Storybook'],
    challenge: 'Traditional banking interfaces are anxiety-inducing with red alert badges and cold tabular spreadsheets, making young freelancers avoid checking their finances.',
    solution: 'Designed fluid pastel financial charts, gamified savings buckets, and positive celebration haptics for staying within monthly budget goals.',
    metrics: [
      { label: 'App Installs in Q1', value: '120,000+' },
      { label: 'Daily Active Logins', value: '62%' },
      { label: 'Net Promoter Score', value: '+74' }
    ],
    screenshots: [
      {
        title: 'Gamified Spending Bubbles',
        caption: 'Visual bubbles that expand and contract smoothly based on budget health.',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop'
      },
      {
        title: 'Custom Gradient Card Builder',
        caption: 'Users can personalize their physical and Apple Pay cards with iridescent metallic shaders.',
        image: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?q=80&w=1000&auto=format&fit=crop'
      }
    ],
    designSystem: {
      colors: ['#111827', '#F9FAFB', '#F472B6', '#38BDF8', '#FCD34D'],
      fonts: ['Plus Jakarta Sans']
    }
  },
  {
    id: 'kin-widget',
    title: 'Kin — Lockscreen Widgets for Close Friends',
    tagline: 'Spontaneous photo & doodle pings between besties.',
    client: 'Kin Social Labs',
    year: '2024',
    category: 'Design Systems',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
    accentColor: '#38BDF8',
    overview: 'A comprehensive iOS 17 & 18 widget design system featuring real-time photo streaming, live hand-doodles, and battery/song sync between inner circle friends.',
    role: 'Product & System Designer',
    timeline: '5 Weeks',
    tools: ['Figma Tokens', 'iOS Human Interface Guidelines', 'After Effects'],
    challenge: 'Designing micro-interfaces that remain readable and expressive at tiny widget scale (small, medium, lock screen).',
    solution: 'Developed a 4-pt grid system with adaptive high-contrast color tokens and ultra-crisp micro-typography.',
    metrics: [
      { label: 'Widgets Added to Lockscreen', value: '1.4M+' },
      { label: 'Average Daily Interactions', value: '8.3 pings/user' },
      { label: 'App Store Feature', value: 'App of the Day (Global)' }
    ],
    screenshots: [
      {
        title: 'Live Lockscreen Doodle Engine',
        caption: 'Instant pressure-sensitive canvas synced between paired phones.',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop'
      }
    ],
    designSystem: {
      colors: ['#020617', '#F8FAFC', '#38BDF8', '#FB7185'],
      fonts: ['Bricolage Grotesque']
    }
  }
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
    period: '2024 — Present',
    role: 'Lead UI/UX Designer',
    company: 'Studio Nudge',
    location: 'Remote / Jakarta',
    highlight: 'Spearheading product design for mobile health apps, creating design systems used by over 350k Gen Z monthly active users.',
    isCurrent: true
  },
  {
    period: '2023 — 2024',
    role: 'Product Designer',
    company: 'Creatie Labs',
    location: 'Singapore / Remote',
    highlight: 'Designed AI-assisted canvas tools, prototyping micro-interactions, and shipped 6 major product releases with high NPS.',
    isCurrent: false
  },
  {
    period: '2022 — 2023',
    role: 'Visual & Brand Designer',
    company: 'Monochrome Digital Agency',
    location: 'Jakarta, ID',
    highlight: 'Crafted web experiences, 3D assets, and interactive Framer sites for global venture-backed startups and lifestyle brands.',
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
