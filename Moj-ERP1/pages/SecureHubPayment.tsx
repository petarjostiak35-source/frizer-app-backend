
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Calendar, ShieldCheck, ChevronRight, Lock, Loader2 } from 'lucide-react';

interface SecureHubPaymentProps {
  offer: { name: string; totalPrice: number };
  onBack: () => void;
  onSuccess: () => void;
}

const SecureHubPayment: React.FC<SecureHubPaymentProps> = ({ offer, onBack, onSuccess }) => {
  const [method, setMethod] = useState<'full' | 'installments'>('full');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 3000);
  };

  const monthlyPrice = Math.round(offer.totalPrice / 12);

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e1b4b_0%,_#020617_100%)] opacity-50" />
      
      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onBack}
        className="absolute top-10 left-10 flex items-center gap-2 text-slate-500 hover:text-white transition-colors group z-50"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-widest">Povratak na pregled</span>
      </motion.button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-5 gap-10 relative z-10"
      >
        {/* Payment Options */}
        <div className="lg:col-span-3 space-y-8">
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 shadow-2xl">
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase mb-8 italic">Način plaćanja</h2>
            
            <div className="space-y-4">
              <button 
                onClick={() => setMethod('full')}
                className={`w-full p-8 rounded-[2rem] border transition-all text-left flex items-center justify-between group ${
                  method === 'full' 
                    ? 'bg-blue-600 border-blue-500 text-white' 
                    : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                }`}
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 block">Opcija A</span>
                  <h3 className="text-xl font-black uppercase">Jednokratno</h3>
                  <p className={`text-xs mt-1 ${method === 'full' ? 'text-blue-100' : 'text-slate-500'}`}>Platite puni iznos i budite mirni godinu dana.</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black tracking-tighter">€{offer.totalPrice}</span>
                </div>
              </button>

              <button 
                onClick={() => setMethod('installments')}
                className={`w-full p-8 rounded-[2rem] border transition-all text-left flex items-center justify-between group ${
                  method === 'installments' 
                    ? 'bg-blue-600 border-blue-500 text-white' 
                    : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                }`}
              >
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 block">Opcija B</span>
                  <h3 className="text-xl font-black uppercase">Na rate</h3>
                  <p className={`text-xs mt-1 ${method === 'installments' ? 'text-blue-100' : 'text-slate-500'}`}>12 rata bez kamata za Elite klijente.</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black tracking-tighter">€{monthlyPrice}</span>
                  <span className="text-[9px] block uppercase font-bold opacity-60">/mjesečno</span>
                </div>
              </button>
            </div>

            <div className="mt-12 space-y-4">
              <div className="relative">
                <CreditCard className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input type="text" placeholder="BROJ KARTICE" className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-16 text-xs font-bold text-white outline-none focus:border-blue-500 transition-colors uppercase" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input type="text" placeholder="MM/YY" className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-16 text-xs font-bold text-white outline-none focus:border-blue-500 transition-colors uppercase" />
                </div>
                <div className="relative">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input type="text" placeholder="CVV" className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-16 text-xs font-bold text-white outline-none focus:border-blue-500 transition-colors uppercase" />
                </div>
              </div>
            </div>

            <button 
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full h-20 bg-white text-slate-900 rounded-[2rem] font-black text-sm uppercase tracking-[0.3em] mt-10 hover:bg-slate-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Obrađujem...
                </>
              ) : (
                <>
                  Aktiviraj odmah
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Summary Sticky Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 sticky top-10">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Sažetak transakcije</h4>
            <div className="space-y-6">
              <div className="flex justify-between border-b border-white/5 pb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Proizvod</span>
                <span className="text-[10px] font-black text-white uppercase">{offer.name}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Osiguranje</span>
                <span className="text-[10px] font-black text-white uppercase">Vozilo (Kasko Elite)</span>
              </div>
              <div className="pt-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Ukupno za platiti</span>
                  <span className="text-3xl font-black text-blue-500">€{method === 'full' ? offer.totalPrice : monthlyPrice}</span>
                </div>
                {method === 'installments' && (
                  <p className="text-[9px] text-slate-500 mt-2 italic">Preostalih 11 rata od po €{monthlyPrice} naplaćuje se automatski svakog 1. u mjesecu.</p>
                )}
              </div>
            </div>
            
            <div className="mt-12 flex flex-col items-center gap-4 text-center">
              <ShieldCheck className="w-10 h-10 text-blue-500" />
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                Sigurna veza putem CorvusPay platforme. Vaši podaci su kriptirani AES-256 standardom.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SecureHubPayment;
