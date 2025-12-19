
import React from 'react';
import { Github, Twitter, Linkedin, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="py-20 px-6 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
            Let's build <br />
            <span className="text-white/30">the next big thing.</span>
          </h2>
          <div className="flex space-x-6">
            <a href="#" className="p-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors"><Github className="w-5 h-5" /></a>
            <a href="#" className="p-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="p-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-10">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6">Navigation</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Home</a></li>
                <li><a href="#work" className="text-white/60 hover:text-white transition-colors">Selected Works</a></li>
                <li><a href="#philosophy" className="text-white/60 hover:text-white transition-colors">Philosophy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-6">Contact</h4>
              <ul className="space-y-4">
                <li><a href="mailto:hello@architech.io" className="text-white/60 hover:text-white transition-colors flex items-center space-x-1"><span>Email</span> <ArrowUpRight className="w-3 h-3" /></a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors flex items-center space-x-1"><span>LinkedIn</span> <ArrowUpRight className="w-3 h-3" /></a></li>
              </ul>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-white/5 flex justify-between text-xs font-bold text-white/20 uppercase tracking-[0.3em]">
            <span>© 2024 ArchiTech Studio</span>
            <span>Based in Neo-Tokyo</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
