
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Camera, ShieldCheck, Search, Loader2, CheckCircle2, FileText, AlertCircle } from 'lucide-react';

interface SecureHubCheckoutProps {
  offer: { name: string; totalPrice: number };
  onBack: () => void;
  onComplete: () => void;
}

const SecureHubCheckout: React.FC<SecureHubCheckoutProps> = ({ offer, onBack, onComplete }) => {
  const [stage, setStage] = useState<'review' | 'kyc' | 'verifying'>('review');
  const [huoStatus, setHuoStatus] = useState<'idle' | 'scanning' | 'matched'>('idle');

  useEffect(() => {
    if (stage === 'verifying') {
      const timer = setTimeout(() => {
        setHuoStatus('scanning');
        setTimeout(() => setHuoStatus('matched'), 2500);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const renderStage = () => {
    switch (stage) {
      case 'review':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="mb-10">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-2 block">Finalna Provjera</span>
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Detalji Elite Paketa</h2>
              <p className="text-slate-400 text-sm mt-2 italic">Potvrdite dodatne pogodnosti uključene u {offer.name}.</p>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Kasko osiguranje', value: 'Uključeno (Puni kasko)' },
                { label: 'Zaštita bonusa', value: 'Aktivna (1 šteta bez gubitka)' },
                { label: 'Asistencija', value: 'Elite EU Asistencija 24/7' },
                { label: 'Lom stakla', value: 'Pokriće bez franšize' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-5 bg-white/5 rounded-2xl border border-white/10">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
                  <span className="text-xs font-black text-white uppercase">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="p-6 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex gap-4 items-center">
              <AlertCircle className="w-6 h-6 text-blue-500 flex-shrink-0" />
              <p className="text-[10px] font-medium text-blue-200 leading-relaxed uppercase tracking-wider">
                Elite ponuda uključuje izravni kanal podrške i prioritetno rješavanje odštetnih zahtjeva u roku od 48 sati.
              </p>
            </div>

            <button 
              onClick={() => setStage('kyc')}
              className="w-full h-16 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all shadow-xl"
            >
              Nastavi na verifikaciju dokumenata
            </button>
          </motion.div>
        );

      case 'kyc':
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="mb-10">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-2 block">Identitet & Vlasništvo</span>
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Digitalna Verifikacija</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-white/5 border border-white/10 rounded-[2rem] border-dashed flex flex-col items-center justify-center text-center group hover:border-blue-500 transition-all cursor-pointer">
                <div className="w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform">
                  <Camera className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Osobna Iskaznica</span>
                <span className="text-[9px] text-slate-500 uppercase font-bold italic">Slikajte prednju i zadnju stranu</span>
              </div>
              <div className="p-8 bg-white/5 border border-white/10 rounded-[2rem] border-dashed flex flex-col items-center justify-center text-center group hover:border-blue-500 transition-all cursor-pointer">
                <div className="w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Prometna Dozvola</span>
                <span className="text-[9px] text-slate-500 uppercase font-bold italic">Slikajte stranice s tehničkim podacima</span>
              </div>
            </div>

            <button 
              onClick={() => setStage('verifying')}
              className="w-full h-16 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20"
            >
              Potvrdi i pokreni provjeru bonusa
            </button>
          </motion.div>
        );

      case 'verifying':
        return (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-12 text-center">
            <div className="relative mb-10">
              <div className="w-24 h-24 bg-blue-600/20 rounded-full flex items-center justify-center">
                {huoStatus === 'matched' ? (
                  <CheckCircle2 className="w-12 h-12 text-blue-500 animate-in zoom-in duration-500" />
                ) : (
                  <Search className="w-12 h-12 text-blue-500 animate-pulse" />
                )}
              </div>
              {huoStatus === 'scanning' && (
                <motion.div 
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-transparent border-t-blue-500 rounded-full"
                />
              )}
            </div>

            <h2 className="text-2xl font-black text-white tracking-tighter uppercase mb-4 italic">
              {huoStatus === 'idle' && "Povezivanje s HUO sustavom..."}
              {huoStatus === 'scanning' && "Provjera povijesti šteta..."}
              {huoStatus === 'matched' && "Bonus Verificiran!"}
            </h2>

            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest max-w-sm leading-relaxed">
              {huoStatus === 'matched' 
                ? "Sustav je potvrdio 50% bonusa. Vaša Elite ponuda je spremna za izdavanje."
                : "SecureHub AI pretražuje službenu bazu Hrvatskog ureda za osiguranje u realnom vremenu."
              }
            </p>

            {huoStatus === 'matched' && (
              <motion.button 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={onComplete}
                className="w-full h-16 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest mt-12 hover:bg-slate-200 transition-all"
              >
                Idi na plaćanje
              </motion.button>
            )}
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full" />
      
      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onBack}
        className="absolute top-10 left-10 flex items-center gap-2 text-slate-500 hover:text-white transition-colors group z-50"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-widest">Natrag</span>
      </motion.button>

      <motion.div 
        className="w-full max-w-2xl bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 shadow-2xl relative z-10"
      >
        {/* Fixed typo from renderStep() to renderStage() */}
        {renderStage()}
      </motion.div>
    </div>
  );
};

export default SecureHubCheckout;
