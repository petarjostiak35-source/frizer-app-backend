
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ShieldCheck, Zap, Globe, Cpu, 
  ChevronRight, Calculator, CheckCircle2, Crown, 
  Anchor, Activity, Microchip, ShieldAlert
} from 'lucide-react';

interface SecureHubProps {
  onBack: () => void;
  onStart: () => void;
}

const SecureHub: React.FC<SecureHubProps> = ({ onBack, onStart }) => {
  const [savings, setSavings] = useState(500);
  const potentialSavings = Math.round(savings * 0.35);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-['Plus_Jakarta_Sans'] selection:bg-blue-600/10 scroll-smooth overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] border-b border-slate-100 bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-8 h-20 flex justify-between items-center">
          <motion.button 
            whileHover={{ x: -2 }}
            onClick={onBack}
            className="flex items-center gap-3 group"
          >
            <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
                  <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" fill="none" stroke="#3b82f6" strokeWidth="4"/>
                  <path d="M55 30 L35 55 H48 L43 75 L63 50 H50 L55 30 Z" fill="#3b82f6"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tighter text-slate-900 uppercase leading-none">Secure<span className="text-blue-600">Hub</span></span>
                <span className="text-[7px] font-bold tracking-[0.6em] text-slate-400 uppercase mt-1">The Gold Standard</span>
              </div>
            </div>
          </motion.button>
          
          <div className="hidden md:flex gap-10 items-center">
            <a href="#usporedba" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-blue-600 transition">Ponude</a>
            <a href="#zasto" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-blue-600 transition">Inovacija</a>
            <button 
              onClick={onStart}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 shadow-[0_10px_15px_-3px_rgba(59,130,246,0.3)] transition-all"
            >
              Kreni Odmah
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-40 pb-32 bg-[radial-gradient(circle_at_top_right,_#1e3a8a_0%,_#020617_100%)] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-400">Next-Gen Insurance AI</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]"
            >
              Budućnost je <br /> <span className="text-blue-400">Digitalna.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-xl max-w-2xl mb-12 font-light leading-relaxed"
            >
              Prekinite ciklus preplaćivanja. Naš globalni algoritam pronalazi najpovoljnije police u nanosekundama, isključivo za vaše potrebe.
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={onStart}
                className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all"
              >
                Kreni Besplatno
              </button>
              <button className="border border-white/20 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/5 transition-all">Saznaj Više</button>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 relative hidden lg:block"
          >
            <div className="w-64 h-64 mx-auto bg-blue-600/20 rounded-[3rem] border border-blue-500/30 backdrop-blur-3xl flex items-center justify-center relative animate-pulse">
              <svg viewBox="0 0 100 100" className="w-32 h-32 drop-shadow-2xl">
                <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" fill="none" stroke="white" strokeWidth="4" opacity="0.8"/>
                <path d="M55 30 L35 55 H48 L43 75 L63 50 H50 L55 30 Z" fill="white"/>
              </svg>
              <div className="absolute inset-0 bg-blue-500/20 blur-[80px] -z-10"></div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Savings Calculator */}
      <section className="-mt-16 relative z-30 max-w-4xl mx-auto px-8">
        <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-blue-50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 w-full">
              <h3 className="text-xl font-black mb-2 tracking-tight">Trenutna cijena osiguranja?</h3>
              <p className="text-slate-400 text-sm mb-8 italic">Povuci klizač za procjenu uštede uz SecureHub AI.</p>
              <input 
                type="range" 
                min="100" 
                max="2000" 
                step="50"
                value={savings}
                onChange={(e) => setSavings(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span>€100</span>
                <span>€{savings}</span>
                <span>€2000</span>
              </div>
            </div>
            <div className="bg-blue-600 text-white p-8 rounded-3xl text-center min-w-[240px] shadow-xl shadow-blue-100">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">Potencijalna ušteda</p>
              <div className="text-5xl font-black tracking-tighter">€{potentialSavings}</div>
              <p className="text-[10px] mt-2 opacity-60 italic">godišnje*</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Section */}
      <section id="zasto" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-24">
            <h2 className="text-blue-600 font-bold uppercase tracking-[0.5em] text-[10px] mb-4">Inovacija</h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900">Zašto Koristiti SecureHub?</h3>
          </div>

          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-8 bg-white border border-slate-100 p-12 rounded-[3rem] relative overflow-hidden group hover:border-blue-500 transition-all duration-500 shadow-sm hover:shadow-xl">
              <div className="relative z-10 max-w-md">
                <h4 className="text-3xl font-black tracking-tighter mb-6 text-slate-900">Inteligentna AI Usporedba</h4>
                <p className="text-slate-500 leading-relaxed mb-8">Naš motor analizira preko 1500 parametara osiguravajućih kuća kako bi osigurao da nikada ne platite ni cent više nego što je potrebno.</p>
                <button 
                  onClick={onStart}
                  className="text-blue-600 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 group-hover:gap-4 transition-all"
                >
                  Saznaj više <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-50 rounded-full group-hover:scale-110 transition-transform flex items-center justify-center">
                 <Microchip className="w-24 h-24 text-blue-100" />
              </div>
            </div>

            <div className="md:col-span-4 bg-white border border-slate-100 p-10 rounded-[3rem] text-center flex flex-col items-center justify-center hover:border-blue-500 transition-all shadow-sm">
              <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black tracking-tighter mb-4">100% Sigurno</h4>
              <p className="text-slate-500 text-sm">Podaci su kriptirani po bankovnim standardima.</p>
            </div>

            <div className="md:col-span-4 bg-white border border-slate-100 p-10 rounded-[3rem] text-center flex flex-col items-center justify-center hover:border-blue-500 transition-all shadow-sm">
              <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-600 mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-black tracking-tighter mb-4">U 60 Sekundi</h4>
              <p className="text-slate-500 text-sm">Od unosa podataka do gotove police u inboxu.</p>
            </div>

            <div className="md:col-span-8 bg-white border border-slate-100 p-12 rounded-[3rem] flex flex-col md:flex-row items-center gap-12 group hover:border-blue-500 transition-all shadow-sm">
              <div className="flex-1">
                <h4 className="text-3xl font-black tracking-tighter mb-6 text-slate-900">Globalna Dostupnost</h4>
                <p className="text-slate-500 leading-relaxed">Usporedite ponude domaćih i stranih osiguravatelja na jednom mjestu, bez nepotrebnih poziva.</p>
              </div>
              <div className="w-32 h-32 flex-shrink-0 flex items-center justify-center bg-slate-50 rounded-full border border-slate-100 group-hover:rotate-12 transition-transform">
                <Globe className="w-16 h-16 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section id="usporedba" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-24">
            <h3 className="text-4xl font-black tracking-tighter text-slate-900">Aktualne Elite Ponude</h3>
            <p className="text-slate-400 text-sm mt-4 uppercase tracking-widest italic">Ažurirano prije 5 minuta</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Offer 1 */}
            <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border-2 border-blue-600 relative scale-105 z-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-1.5 rounded-full text-[9px] font-bold tracking-widest uppercase">Best Choice</div>
              <div className="flex items-center gap-4 mb-16">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <span className="text-xl font-black italic">A</span>
                </div>
                <span className="text-2xl font-black tracking-tighter text-slate-900 italic uppercase">Allianz</span>
              </div>
              <div className="mb-12">
                <p className="text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-2">Godišnja premija</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-6xl font-black text-slate-900 tracking-tighter">€350</span>
                  <span className="text-slate-300 line-through text-lg">€470</span>
                </div>
              </div>
              <button 
                onClick={onStart}
                className="w-full py-5 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20"
              >
                Secure This Deal
              </button>
            </div>

            {/* Offer 2 */}
            <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-16">
                <div className="w-14 h-14 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-600">
                  <Crown className="w-6 h-6" />
                </div>
                <span className="text-2xl font-black tracking-tighter text-slate-900 italic uppercase">Croatia</span>
              </div>
              <div className="mb-12">
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">Godišnja premija</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-6xl font-black text-slate-900 tracking-tighter">€400</span>
                  <span className="text-slate-200 line-through text-lg">€510</span>
                </div>
              </div>
              <button 
                onClick={onStart}
                className="w-full py-5 border-2 border-slate-900 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all"
              >
                Select Plan
              </button>
            </div>

            {/* Offer 3 */}
            <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-16">
                <div className="w-14 h-14 bg-red-700/10 rounded-2xl flex items-center justify-center text-red-700">
                  <Anchor className="w-6 h-6" />
                </div>
                <span className="text-2xl font-black tracking-tighter text-slate-900 italic uppercase">Generali</span>
              </div>
              <div className="mb-12">
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">Godišnja premija</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-6xl font-black text-slate-900 tracking-tighter">€300</span>
                  <span className="text-slate-200 line-through text-lg">€430</span>
                </div>
              </div>
              <button 
                onClick={onStart}
                className="w-full py-5 border-2 border-slate-900 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all"
              >
                Select Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-8 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M50 5 L89 27.5 L89 72.5 L50 95 L11 72.5 L11 27.5 Z" fill="#3b82f6"/>
                <path d="M55 30 L35 55 H48 L43 75 L63 50 H50 L55 30 Z" fill="white"/>
              </svg>
            </div>
            <span className="text-slate-900 font-extrabold text-2xl tracking-tighter uppercase italic">Secure<span className="text-blue-600">Hub</span></span>
          </div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.5em] mb-8 text-center">
            PAMETNO OSIGURANJE ZA DIGITALNO DOBA
          </p>
          <div className="w-16 h-[2px] bg-blue-600/10 mb-8"></div>
          <p className="text-slate-400 text-[9px] font-medium uppercase tracking-[0.3em] text-center">
            © 2025 SECUREHUB TECHNOLOGIES | REGULATED BY <span className="text-slate-900 font-bold tracking-normal">HANFA</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SecureHub;
