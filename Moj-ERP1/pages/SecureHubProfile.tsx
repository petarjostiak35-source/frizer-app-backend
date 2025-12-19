
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Phone, Lock, ChevronRight } from 'lucide-react';

interface SecureHubProfileProps {
  onBack: () => void;
  onComplete: () => void;
}

const SecureHubProfile: React.FC<SecureHubProfileProps> = ({ onBack, onComplete }) => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_bottom_left,_#1e3a8a_0%,_#020617_100%)] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
      
      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="absolute top-10 left-10 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group z-50"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white">Povratak</span>
      </motion.button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 shadow-2xl relative z-10"
      >
        <div className="mb-12">
          <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-4 block">Faza 01: Identitet</span>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">Vaš Profil</h1>
          <p className="text-slate-400 text-sm italic">Postavite temelje svoje digitalne zaštite.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6 md:col-span-2">
            <div className="relative">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block ml-1">Ime i prezime (kao u osobnoj)</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="IVAN HORVAT" 
                  className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-14 text-xs font-bold text-white placeholder:text-slate-700 outline-none focus:border-blue-500 transition-colors uppercase tracking-widest"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block ml-1">E-mail adresa (za police)</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="email" 
                  placeholder="IVAN@HORVAT.HR" 
                  className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-14 text-xs font-bold text-white placeholder:text-slate-700 outline-none focus:border-blue-500 transition-colors uppercase tracking-widest"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block ml-1">Broj mobitela</label>
              <div className="relative">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="tel" 
                  placeholder="+385 9X XXX XXXX" 
                  className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-14 text-xs font-bold text-white placeholder:text-slate-700 outline-none focus:border-blue-500 transition-colors uppercase tracking-widest"
                />
              </div>
            </div>

            <div className="relative">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block ml-1">Lozinka</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="password" 
                  placeholder="••••••••••••" 
                  className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-14 text-xs font-bold text-white placeholder:text-slate-700 outline-none focus:border-blue-500 transition-colors uppercase tracking-widest"
                />
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={onComplete}
          className="w-full h-16 bg-blue-600 text-white rounded-2xl mt-12 font-black text-xs uppercase tracking-[0.3em] hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 group"
        >
          Nastavi
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
};

export default SecureHubProfile;
