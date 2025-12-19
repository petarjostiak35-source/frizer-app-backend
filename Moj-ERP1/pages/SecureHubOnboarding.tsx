
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Car, Home, ChevronRight, CheckCircle2, MapPin, Fingerprint, Info } from 'lucide-react';

interface SecureHubOnboardingProps {
  onBack: () => void;
  onFinish: () => void;
}

type OnboardingStep = 'selection' | 'common' | 'details' | 'history';
type InsuranceType = 'vehicle' | 'apartment' | null;

const SecureHubOnboarding: React.FC<SecureHubOnboardingProps> = ({ onBack, onFinish }) => {
  const [step, setStep] = useState<OnboardingStep>('selection');
  const [type, setType] = useState<InsuranceType>(null);

  const renderStep = () => {
    switch (step) {
      case 'selection':
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase mb-4 italic">Što osiguravamo?</h2>
              <p className="text-slate-400 text-sm">Odaberite kategoriju za personaliziranu AI analizu.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button 
                onClick={() => { setType('vehicle'); setStep('common'); }}
                className="group p-10 bg-white/5 border border-white/10 rounded-[2.5rem] hover:border-blue-500 transition-all text-left"
              >
                <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Car className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-white tracking-tight uppercase">Osiguranje Vozila</h3>
                <p className="text-slate-500 text-xs mt-2 italic leading-relaxed">Kasko, obvezno i asistencija na cesti uz AI procjenu bonusa.</p>
              </button>
              <button 
                onClick={() => { setType('apartment'); setStep('common'); }}
                className="group p-10 bg-white/5 border border-white/10 rounded-[2.5rem] hover:border-blue-500 transition-all text-left"
              >
                <div className="w-16 h-16 bg-purple-600/10 rounded-2xl flex items-center justify-center text-purple-500 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Home className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-white tracking-tight uppercase">Osiguranje Stana</h3>
                <p className="text-slate-500 text-xs mt-2 italic leading-relaxed">Vaša oaza mira zaštićena od poplava, požara i provala.</p>
              </button>
            </div>
          </div>
        );

      case 'common':
        return (
          <div className="space-y-8">
            <div className="mb-12">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-4 block">Faza 02: Zakonski Okvir</span>
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Podaci za ponudu</h2>
            </div>
            <div className="space-y-6">
              <div className="relative">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block ml-1">OIB</label>
                <div className="relative">
                  <Fingerprint className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input type="text" placeholder="XXXXXXXXXXX" className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-14 text-xs font-bold text-white outline-none focus:border-blue-500 transition-colors uppercase" />
                </div>
              </div>
              <div className="relative">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block ml-1">Adresa prebivališta</label>
                <div className="relative">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input type="text" placeholder="ULICA I KUĆNI BROJ, GRAD" className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-14 text-xs font-bold text-white outline-none focus:border-blue-500 transition-colors uppercase" />
                </div>
              </div>
            </div>
            <button onClick={() => setStep('details')} className="w-full h-16 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest mt-8 flex items-center justify-center gap-2 group">
              Sljedeći korak <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        );

      case 'details':
        return (
          <div className="space-y-8">
            <div className="mb-12">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-4 block">Faza 03: Predmet</span>
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Podaci o {type === 'vehicle' ? 'vozilu' : 'nekretnini'}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {type === 'vehicle' ? (
                <>
                  <input type="text" placeholder="BROJ ŠASIJE" className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-8 text-xs font-bold text-white outline-none focus:border-blue-500 transition-colors uppercase" />
                  <input type="text" placeholder="REGISTRACIJA" className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-8 text-xs font-bold text-white outline-none focus:border-blue-500 transition-colors uppercase" />
                  <input type="text" placeholder="GODINA PROIZVODNJE" className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-8 text-xs font-bold text-white outline-none focus:border-blue-500 transition-colors uppercase" />
                  <input type="text" placeholder="SNAGA MOTORA (KW)" className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-8 text-xs font-bold text-white outline-none focus:border-blue-500 transition-colors uppercase" />
                </>
              ) : (
                <>
                  <input type="text" placeholder="KVADRATURA (M2)" className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-8 text-xs font-bold text-white outline-none focus:border-blue-500 transition-colors uppercase" />
                  <input type="text" placeholder="GODINA IZGRADNJE" className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-8 text-xs font-bold text-white outline-none focus:border-blue-500 transition-colors uppercase" />
                  <input type="text" placeholder="VRIJEDNOST STVARI (€)" className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-8 text-xs font-bold text-white outline-none focus:border-blue-500 transition-colors uppercase" />
                  <div className="flex items-center gap-3 px-6 bg-white/5 rounded-2xl border border-white/10 italic text-[10px] text-slate-500">
                    <Info className="w-4 h-4" /> Procjena na temelju tržišne vrijednosti lokacije.
                  </div>
                </>
              )}
            </div>
            <button onClick={() => setStep('history')} className="w-full h-16 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest mt-8 flex items-center justify-center gap-2 group">
              Provjeri povijest <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        );

      case 'history':
        return (
          <div className="space-y-8">
            <div className="mb-12">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-4 block">Faza 04: Povjerenje</span>
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase">Povijest osiguranja</h2>
            </div>
            <div className="space-y-6">
              {type === 'vehicle' ? (
                <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10">
                  <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6">Vaš bonus</h4>
                  <div className="flex gap-4">
                    {['0%', '10%', '20%', '30%', '40%', '50%'].map(b => (
                      <button key={b} className="flex-1 h-12 rounded-xl border border-white/10 hover:border-blue-500 text-[10px] font-black text-slate-400 hover:text-white transition-all uppercase">{b}</button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10">
                  <h4 className="text-sm font-black text-white uppercase tracking-widest mb-4">Prethodne štete?</h4>
                  <div className="flex gap-4">
                    <button className="flex-1 py-4 rounded-xl border border-white/10 hover:border-purple-500 text-[10px] font-black text-slate-400 hover:text-white transition-all uppercase">Nikada</button>
                    <button className="flex-1 py-4 rounded-xl border border-white/10 hover:border-purple-500 text-[10px] font-black text-slate-400 hover:text-white transition-all uppercase">Jednom (manja)</button>
                    <button className="flex-1 py-4 rounded-xl border border-white/10 hover:border-purple-500 text-[10px] font-black text-slate-400 hover:text-white transition-all uppercase">Više puta</button>
                  </div>
                </div>
              )}
            </div>
            <button 
              onClick={onFinish}
              className="w-full h-16 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest mt-8 flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(59,130,246,0.3)] animate-bounce-subtle"
            >
              <CheckCircle2 className="w-5 h-5" />
              Generiraj Elite Ponudu
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/5 blur-[150px] rounded-full" />

      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => {
          if (step === 'selection') onBack();
          else if (step === 'common') setStep('selection');
          else if (step === 'details') setStep('common');
          else if (step === 'history') setStep('details');
        }}
        className="absolute top-10 left-10 flex items-center gap-2 text-slate-500 hover:text-white transition-colors group z-50"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-widest">Natrag</span>
      </motion.button>

      <motion.div 
        key={step}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 shadow-2xl relative z-10"
      >
        {renderStep()}
        
        {/* Progress Dots */}
        {step !== 'selection' && (
          <div className="flex justify-center gap-3 mt-12">
            {(['common', 'details', 'history'] as OnboardingStep[]).map((s) => (
              <div 
                key={s} 
                className={`w-2 h-2 rounded-full transition-all duration-500 ${step === s ? 'bg-blue-500 w-6' : 'bg-white/10'}`} 
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SecureHubOnboarding;
