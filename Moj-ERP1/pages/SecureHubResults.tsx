
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, CheckCircle2, Shield, Plus, Minus, 
  Car, Home, Zap, ShieldCheck, Crown, Activity,
  Info, ChevronRight, Loader2, Star
} from 'lucide-react';

interface OfferAddon {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface InsuranceOffer {
  id: string;
  name: string;
  logo: React.ReactNode;
  basePrice: number;
  color: string;
  inclusions: string[];
  addons: OfferAddon[];
}

interface SecureHubResultsProps {
  onBack: () => void;
  onSelect: (offer: { name: string; totalPrice: number }) => void;
}

const SecureHubResults: React.FC<SecureHubResultsProps> = ({ onBack, onSelect }) => {
  const [loading, setLoading] = useState(true);
  const [selectedAddons, setSelectedAddons] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const rawOffers: InsuranceOffer[] = [
    {
      id: 'allianz',
      name: 'Allianz Elite',
      logo: <Shield className="w-8 h-8" />,
      basePrice: 350,
      color: 'blue',
      inclusions: ['Osnovno osiguranje', 'Pravna zaštita', 'EU pokrivenost'],
      addons: [
        { id: 'asistencija', name: 'Pomoć na cesti', price: 45, description: '24/7 asistencija bilo gdje u EU.' },
        { id: 'stakla', name: 'Lom stakla', price: 60, description: 'Pokriće za sva stakla bez franšize.' },
        { id: 'bonus', name: 'Zaštita bonusa', price: 30, description: 'Zadržite 50% bonusa nakon prve štete.' }
      ]
    },
    {
      id: 'croatia',
      name: 'Croatia Sigurnost',
      logo: <Crown className="w-8 h-8" />,
      basePrice: 410,
      color: 'red',
      inclusions: ['Osnovno osiguranje', 'Domaća asistencija', 'Lom stakla uključeno'],
      addons: [
        { id: 'kradja', name: 'Osiguranje od krađe', price: 80, description: 'Potpuna naknada u slučaju otuđenja.' },
        { id: 'tuča', name: 'Zaštita od tuče', price: 55, description: 'Pokriće šteta od elementarnih nepogoda.' },
        { id: 'putno', name: 'Ino-putno osiguranje', price: 25, description: 'Zdravstvena zaštita izvan HR.' }
      ]
    },
    {
      id: 'generali',
      name: 'Generali Smart',
      logo: <Activity className="w-8 h-8" />,
      basePrice: 320,
      color: 'red',
      inclusions: ['Osnovno osiguranje', 'Popust na siguran dom', 'Mobilna aplikacija'],
      addons: [
        { id: 'zamjensko', name: 'Zamjensko vozilo', price: 40, description: 'Vozilo na raspolaganju do 5 dana.' },
        { id: 'gume', name: 'Osiguranje guma', price: 20, description: 'Popravak ili zamjena oštećenih pneumatika.' },
        { id: 'nalet', name: 'Nalet na životinju', price: 50, description: 'Pokriće šteta od divljači i domaćih životinja.' }
      ]
    },
    {
      id: 'wiener',
      name: 'Wiener VIG',
      logo: <Zap className="w-8 h-8" />,
      basePrice: 380,
      color: 'blue',
      inclusions: ['Osnovno osiguranje', 'Eko-bonus', 'Hibrid popust'],
      addons: [
        { id: 'putnici', name: 'Osiguranje putnika', price: 15, description: 'Povećane svote za nezgode putnika.' },
        { id: 'potres', name: 'Zaštita od potresa', price: 70, description: 'Specifično za stambene objekte.' },
        { id: 'provala', name: 'Osiguranje od provale', price: 40, description: 'Vrijedne stvari unutar objekta.' }
      ]
    }
  ];

  // Sortiranje po osnovnoj cijeni - najpovoljnija prva
  const offers = [...rawOffers].sort((a, b) => a.basePrice - b.basePrice);

  const toggleAddon = (offerId: string, addonId: string) => {
    setSelectedAddons(prev => {
      const current = prev[offerId] || [];
      if (current.includes(addonId)) {
        return { ...prev, [offerId]: current.filter(id => id !== addonId) };
      }
      return { ...prev, [offerId]: [...current, addonId] };
    });
  };

  const calculateTotal = (offer: InsuranceOffer) => {
    const selected = selectedAddons[offer.id] || [];
    const addonsPrice = offer.addons
      .filter(a => selected.includes(a.id))
      .reduce((sum, a) => sum + a.price, 0);
    return offer.basePrice + addonsPrice;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 text-white">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 mb-8"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            <path d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" fill="none" stroke="#3b82f6" strokeWidth="2"/>
            <path d="M55 30 L35 55 H48 L43 75 L63 50 H50 L55 30 Z" fill="#3b82f6"/>
          </svg>
        </motion.div>
        <h2 className="text-2xl font-black uppercase tracking-[0.3em] mb-4">Analiziram tržište...</h2>
        <div className="flex gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">Kalkuliram uštede u realnom vremenu</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 selection:bg-blue-600/20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest">Povratak na podatke</span>
          </motion.button>
          <div className="text-right">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-2 block">Rezultati AI Analize</span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">Aktualne <span className="text-blue-500">Elite</span> Ponude</h1>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {offers.map((offer, idx) => {
            const isBestValue = idx === 0;
            return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative bg-white/5 backdrop-blur-3xl border rounded-[3.5rem] p-10 flex flex-col transition-all group ${
                  isBestValue 
                    ? 'border-blue-500 shadow-[0_0_50px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/50' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Best Value Badge */}
                {isBestValue && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-full flex items-center gap-2 shadow-xl shadow-blue-500/20 z-20">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Najbolja Ponuda</span>
                  </div>
                )}

                {/* Card Header */}
                <div className="flex justify-between items-start mb-10">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 text-white shadow-xl`}>
                      {offer.logo}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black tracking-tighter uppercase italic">{offer.name}</h3>
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">A+ Rating Ponuđač</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">Godišnja premija</span>
                    <div className="flex items-baseline gap-2 justify-end">
                      <span className="text-4xl font-black tracking-tighter text-white">€{calculateTotal(offer)}</span>
                      <span className="text-slate-600 line-through text-sm">€{offer.basePrice + 120}</span>
                    </div>
                  </div>
                </div>

                {/* Inclusions */}
                <div className="mb-10">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3 text-green-500" /> Standardni paket uključuje:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {offer.inclusions.map((inc, i) => (
                      <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-full text-[9px] font-bold text-slate-300 uppercase tracking-wider">
                        {inc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Addons (Puzzle/Slaganje) */}
                <div className="mb-10 flex-1">
                  <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Plus className="w-3 h-3" /> Složi svoj elite paket:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {offer.addons.map((addon) => {
                      const isSelected = selectedAddons[offer.id]?.includes(addon.id);
                      return (
                        <button
                          key={addon.id}
                          onClick={() => toggleAddon(offer.id, addon.id)}
                          className={`p-4 rounded-2xl border transition-all text-left flex flex-col gap-1 relative overflow-hidden group/btn ${
                            isSelected 
                              ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' 
                              : 'bg-white/5 border-white/5 hover:border-white/10 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] font-black uppercase tracking-widest">{addon.name}</span>
                            <span className={`text-[9px] font-black ${isSelected ? 'text-blue-200' : 'text-slate-500'}`}>+€{addon.price}</span>
                          </div>
                          <p className={`text-[8px] leading-relaxed uppercase opacity-60 font-bold ${isSelected ? 'text-white' : ''}`}>
                            {addon.description}
                          </p>
                          {isSelected && (
                            <motion.div 
                              layoutId={`${offer.id}-${addon.id}-check`}
                              className="absolute right-2 bottom-2"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                            </motion.div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Select CTA */}
                <button 
                  onClick={() => onSelect({ name: offer.name, totalPrice: calculateTotal(offer) })}
                  className={`w-full py-5 rounded-3xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 group/cta ${
                    isBestValue 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-500/30' 
                      : 'bg-white text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  Aktiviraj Elite Policu
                  <ChevronRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="mt-20 p-10 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center gap-8 italic">
          <div className="w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center flex-shrink-0 text-blue-500">
            <Info className="w-6 h-6" />
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Sve prikazane cijene su konačne i uključuju sve poreze i doprinose. Promjenom opcija ("Slaganjem") cijena se ažurira automatski pomoću našeg live AI engine-a. Odabirom police prelazite na sigurnu naplatu i digitalno potpisivanje dokumenata.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecureHubResults;
