
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import ProjectCard from './ProjectCard';

interface BentoGridProps {
  onProjectClick?: (id: string) => void;
}

const BentoGrid: React.FC<BentoGridProps> = ({ onProjectClick }) => {
  const [filter, setFilter] = useState('All');

  const filters = [
    { label: 'All', value: 'All' },
    { label: 'SaaS', value: 'SaaS/Fintech' },
    { label: 'Luxury', value: 'Luxury/Beauty' },
    { label: 'Hardware', value: 'High-Tech Hardware' },
  ];

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(project => project.category === filter);

  return (
    <section id="work" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-8 md:space-y-0">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-2 block">Selected Works</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">The Gallery</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {filters.map((f) => (
            <button
              key={f.label}
              onClick={() => setFilter(f.value)}
              className={`px-6 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
                filter === f.value 
                  ? 'bg-white text-black border-white' 
                  : 'bg-white/5 text-white/60 border-white/5 hover:border-white/20 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={project.gridSpan}
            >
              <ProjectCard 
                project={project} 
                onClick={() => onProjectClick?.(project.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {filteredProjects.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-white/40 italic">No projects found in this category.</p>
        </div>
      )}
    </section>
  );
};

export default BentoGrid;
