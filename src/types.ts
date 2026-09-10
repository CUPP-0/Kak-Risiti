export type CategoryType = 'All' | 'UI/UX & Web' | 'Mobile Apps' | 'Brand Identity' | 'Design Systems';

export interface CaseStudy {
  id: string;
  title: string;
  tagline: string;
  client: string;
  year: string;
  category: 'UI/UX & Web' | 'Mobile Apps' | 'Brand Identity' | 'Design Systems';
  coverImage: string;
  accentColor: string;
  overview: string;
  role: string;
  timeline: string;
  tools: string[];
  challenge: string;
  solution: string;
  metrics: {
    label: string;
    value: string;
  }[];
  screenshots: {
    title: string;
    caption: string;
    image: string;
  }[];
  designSystem?: {
    colors: string[];
    fonts: string[];
  };
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface StickerItem {
  id: string;
  text: string;
  emoji?: string;
  color: string; // background color
  textColor: string;
  border?: string;
  defaultX: number;
  defaultY: number;
  rotation: number;
  tag?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  badge: string;
}

export interface BagItem {
  id: string;
  name: string;
  category: string;
  desc: string;
  icon: string;
  color: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  highlight: string;
  isCurrent?: boolean;
}

export type ThemePalette = 'matcha' | 'lavender' | 'bubblegum' | 'butter';
