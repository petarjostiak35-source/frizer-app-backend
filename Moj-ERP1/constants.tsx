
import React from 'react';
import { Zap, Brain, Palette, Briefcase, Cpu, ShieldCheck } from 'lucide-react';
import { Project, Testimonial, PhilosophyItem } from './types';

export const PROJECTS: Project[] = [
  {
    id: '6',
    title: 'SecureHub AI Ultra Nano',
    category: 'SaaS/Fintech',
    description: 'The Gold Standard of protection. Next-gen AI platform for smart insurance comparison and activation in under 60 seconds.',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop',
    gridSpan: 'col-span-2'
  },
  {
    id: '1',
    title: 'Neon Vault',
    category: 'SaaS/Fintech',
    description: 'A revolutionary crypto-asset management platform with military-grade security.',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop',
    gridSpan: 'col-span-1'
  },
  {
    id: '2',
    title: 'Aura Skincare',
    category: 'Luxury/Beauty',
    description: 'Digital flagship store for high-end organic skincare featuring botanical skeletons and liquid interactions.',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1974&auto=format&fit=crop',
    gridSpan: 'col-span-1'
  },
  {
    id: '3',
    title: 'Titan-X Drone',
    category: 'High-Tech Hardware',
    description: 'Control interface for the world\'s fastest autonomous racing drone.',
    imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=2070&auto=format&fit=crop',
    gridSpan: 'row-span-2'
  },
  {
    id: '4',
    title: 'Lumina Analytics',
    category: 'SaaS/Fintech',
    description: 'Real-time data visualization for global enterprise logistics.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bbbda5366392?q=80&w=2070&auto=format&fit=crop',
    gridSpan: 'col-span-1'
  },
  {
    id: '5',
    title: 'Ether Watch',
    category: 'High-Tech Hardware',
    description: 'Companion app for the first mechanical-smart hybrid timepiece.',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop',
    gridSpan: 'col-span-1'
  }
];

export const PHILOSOPHY: PhilosophyItem[] = [
  {
    title: 'Speed',
    description: 'Performance isn\'t a feature; it\'s the foundation. We optimize every millisecond to ensure seamless interaction.',
    icon: <Zap className="w-6 h-6 text-blue-400" />
  },
  {
    title: 'Psychology',
    description: 'User behavior guides our design decisions. We build interfaces that feel intuitive and anticipate needs.',
    icon: <Brain className="w-6 h-6 text-purple-400" />
  },
  {
    title: 'Aesthetics',
    description: 'Beauty is functional. We create visually arresting experiences that build trust and command authority.',
    icon: <Palette className="w-6 h-6 text-pink-400" />
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author: 'Elena Vance',
    role: 'CEO, NeonVault',
    content: 'The "Ultra-Nano" approach completely transformed our conversion rates. Design that actually delivers results.',
    avatarUrl: 'https://i.pravatar.cc/150?u=elena'
  },
  {
    id: '2',
    author: 'Marcus Thorne',
    role: 'Product Lead, Titan Dynamics',
    content: 'Sophistication meets technical excellence. I\'ve never seen a team bridge the gap between beauty and code so well.',
    avatarUrl: 'https://i.pravatar.cc/150?u=marcus'
  }
];
