
import { ReactNode } from 'react';

export interface Project {
  id: string;
  title: string;
  category: 'SaaS/Fintech' | 'Luxury/Beauty' | 'High-Tech Hardware';
  description: string;
  imageUrl: string;
  gridSpan: 'col-span-1' | 'col-span-2' | 'row-span-1' | 'row-span-2';
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
  avatarUrl: string;
}

export interface PhilosophyItem {
  title: string;
  description: string;
  icon: ReactNode;
}
