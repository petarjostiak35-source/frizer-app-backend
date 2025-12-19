
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock, Loader2 } from 'lucide-react';

interface RegistrationProps {
  onBack: () => void;
  onSuccess: () => void;
}

const Registration: React.FC<RegistrationProps> = ({ onBack, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_#1e3a8a_0%,_#020617_100%)] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

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
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-12 shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-12">
          <div className="w-14 h-14 mb-4">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
              <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" fill="none" stroke="#3b82f6" strokeWidth="4"/>
              <path d="M55 30 L35 55 H48 L43 75 L63 50 H50 L55 30 Z" fill="#3b82f6"/>
            </svg>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Započni <span className="text-blue-500">Štednju</span></h1>
          <p className="text-slate-400 text-xs mt-2 font-bold uppercase tracking-widest">Osiguraj budućnost u 60 sekundi</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full bg-white text-slate-900 h-14 rounded-2xl flex items-center justify-center gap-4 font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all disabled:opacity-50 group"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            )}
            <span>Prijavi se putem Google-a</span>
          </button>

          <div className="flex items-center gap-4 my-8">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">ili</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="email" 
                placeholder="EMAIL ADRESA" 
                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-14 text-xs font-bold text-white placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors uppercase tracking-widest"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="password" 
                placeholder="LOZINKA" 
                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-14 text-xs font-bold text-white placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors uppercase tracking-widest"
              />
            </div>
            <button 
              onClick={() => onSuccess()}
              className="w-full h-14 bg-blue-600 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-white hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/10"
            >
              Nastavi
            </button>
          </div>
        </div>

        <p className="mt-10 text-[9px] text-slate-500 text-center font-bold uppercase tracking-[0.2em] leading-relaxed">
          Pritiskom na nastavi prihvaćate naše <span className="text-white">uvjete korištenja</span> i <span className="text-white">pravila o privatnosti</span>.
        </p>
      </motion.div>
    </div>
  );
};

export default Registration;
