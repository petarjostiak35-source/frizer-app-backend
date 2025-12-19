
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Download, Smartphone, Mail, ArrowRight, Share2, Wallet } from 'lucide-react';

interface SecureHubSuccessProps {
  offer: { name: string; totalPrice: number };
  onFinish: () => void;
}

const SecureHubSuccess: React.FC<SecureHubSuccessProps> = ({ offer, onFinish }) => {
  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background celebration effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[150px] rounded-full animate-pulse" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] p-12 text-center relative z-10 shadow-2xl"
      >
        <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(59,130,246,0.5)]">
          <CheckCircle2 className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic mb-4">Polica je Aktivna!</h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed mb-12 italic">
          Čestitamo! Vaš status Elite klijenta je potvrđen. Polica osiguranja je generirana i pravno valjana od ovog trenutka.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <button className="flex items-center justify-center gap-3 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
            <Download className="w-5 h-5 text-blue-500 group-hover:translate-y-1 transition-transform" />
            <div className="text-left">
              <span className="text-[10px] font-black text-white uppercase block">Preuzmi Policu</span>
              <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">PDF format • 1.2 MB</span>
            </div>
          </button>
          <button className="flex items-center justify-center gap-3 p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
            <Wallet className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <span className="text-[10px] font-black text-white uppercase block">Apple / Google Wallet</span>
              <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Spremi digitalnu karticu</span>
            </div>
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 mb-12 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 text-slate-400">
            <Mail className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Poslano na: IVAN@HORVAT.HR</span>
          </div>
          <div className="h-px w-20 bg-white/10" />
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em]">Broj police: SH-2025-004291-ELT</p>
        </div>

        <button 
          onClick={onFinish}
          className="group flex items-center justify-center gap-3 text-blue-500 font-black text-xs uppercase tracking-[0.4em] hover:text-white transition-all"
        >
          Povratak na nadzornu ploču
          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
        </button>
      </motion.div>

      {/* Floating share element */}
      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-10 right-10 w-14 h-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center group hover:bg-blue-600 transition-all duration-500 shadow-2xl"
      >
        <Share2 className="w-5 h-5 text-white" />
        <span className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest text-white whitespace-nowrap border border-white/10 pointer-events-none">
          Pohvali se osiguranjem
        </span>
      </motion.button>
    </div>
  );
};

export default SecureHubSuccess;
