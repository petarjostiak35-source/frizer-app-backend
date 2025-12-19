
import React from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex justify-center"
    >
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-8 py-3 flex items-center space-x-8 max-w-2xl">
        <a href="#" className="text-sm font-medium hover:text-white/60 transition-colors">Home</a>
        <a href="#work" className="text-sm font-medium hover:text-white/60 transition-colors">Work</a>
        <div className="w-1 h-1 bg-white/20 rounded-full" />
        <span className="text-sm font-bold tracking-tighter uppercase italic">ArchiTech</span>
        <div className="w-1 h-1 bg-white/20 rounded-full" />
        <a href="#philosophy" className="text-sm font-medium hover:text-white/60 transition-colors">Method</a>
        <a href="#contact" className="text-sm font-medium hover:text-white/60 transition-colors">Contact</a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
