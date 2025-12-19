
import React from 'react';
import { motion } from 'framer-motion';
import { PHILOSOPHY } from '../constants';

const Philosophy: React.FC = () => {
  return (
    <section id="philosophy" className="py-24 px-6 bg-white/[0.02] border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-4 block">Our DNA</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 italic underline decoration-blue-500/50 underline-offset-8">
            The Ultra-Nano Approach
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            We don't just build websites. We create digital ecosystems that are lightweight, intelligent, and visually superior.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PHILOSOPHY.map((item, index) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm group hover:border-white/20 transition-all duration-500"
            >
              <div className="mb-6 p-4 rounded-2xl bg-white/5 inline-block group-hover:bg-white/10 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-white/60 leading-relaxed italic">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
