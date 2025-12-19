
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useVelocity } from 'framer-motion';
import { ShoppingBag, ArrowLeft, Wind, Droplets, Leaf, Shield, Heart, Info, X, Volume2, VolumeX, Sparkles, ChevronRight } from 'lucide-react';

interface AuraSkincareProps {
  onBack: () => void;
}

const GrainOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
);

// 1. Botanical Skeleton SVG Overlay
const BotanicalSkeleton = () => (
  <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-60 transition-opacity duration-1000 pointer-events-none" viewBox="0 0 100 100" fill="none">
    <motion.path 
      d="M50 90C50 90 20 60 20 40C20 20 50 10 50 10M50 90C50 90 80 60 80 40C80 20 50 10 50 10M50 90V10" 
      stroke="white" 
      strokeWidth="0.3"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{ duration: 2.5, ease: "easeInOut" }}
    />
    <circle cx="50" cy="40" r="1.5" stroke="white" strokeWidth="0.2" />
    <circle cx="35" cy="55" r="1" stroke="white" strokeWidth="0.2" />
    <circle cx="65" cy="55" r="1" stroke="white" strokeWidth="0.2" />
    <line x1="50" y1="40" x2="35" y2="55" stroke="white" strokeWidth="0.1" />
    <line x1="50" y1="40" x2="65" y2="55" stroke="white" strokeWidth="0.1" />
  </svg>
);

// 2. Liquid Cursor Component
const LiquidCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const velocityX = useVelocity(mouseX);
  const velocityY = useVelocity(mouseY);
  
  const scaleX = useSpring(useTransform(velocityX, [-3000, 3000], [1.8, 0.4]), { stiffness: 80, damping: 15 });
  const scaleY = useSpring(useTransform(velocityY, [-3000, 3000], [1.8, 0.4]), { stiffness: 80, damping: 15 });
  const rotate = useSpring(useTransform(velocityX, [-3000, 3000], [-30, 30]), { stiffness: 80, damping: 15 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-10 h-10 bg-[#E8D7D0]/30 backdrop-blur-[3px] rounded-full pointer-events-none z-[200] border border-white/40 hidden md:block mix-blend-multiply"
      style={{
        x: mouseX,
        y: mouseY,
        translateX: "-50%",
        translateY: "-50%",
        scaleX,
        scaleY,
        rotate
      }}
    />
  );
};

const AmbientAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = () => {
    if (!audioRef.current) {
      // Changed to a highly stable CDN source
      audioRef.current = new Audio('https://assets.mixkit.co/music/preview/mixkit-ambient-meditation-251.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.25;
      
      // Enhanced error handling for audio loading
      audioRef.current.onerror = () => {
        console.error("Audio failed to load from primary source. Fallback needed.");
        setIsPlaying(false);
      };
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.log("Audio play blocked: User interaction required."));
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggle}
      className="fixed bottom-10 left-10 z-[60] w-12 h-12 bg-white/80 backdrop-blur-md text-stone-800 rounded-full border border-stone-200 flex items-center justify-center transition-all shadow-xl"
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div key="on" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
            <Volume2 className="w-4 h-4 text-stone-600" />
          </motion.div>
        ) : (
          <motion.div key="off" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
            <VolumeX className="w-4 h-4 text-stone-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// 4. Membership Ritual Meditation Component
const MembershipRitualOverlay = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-[#FDFBF7]/70 backdrop-blur-[60px] flex flex-col items-center justify-center pointer-events-none"
    >
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 0.95, 1.05, 1],
          opacity: [0.6, 1, 0.7, 1, 0.8]
        }}
        transition={{ duration: 4.5, ease: "easeInOut" }}
        className="text-center"
      >
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="mb-12"
        >
            <Sparkles className="w-16 h-16 text-[#E2E8DD] mx-auto" />
        </motion.div>
        <h2 className="text-5xl font-['Cormorant_Garamond'] italic text-stone-800 tracking-tight">Breath in silence...</h2>
        <p className="text-stone-400 mt-6 text-[10px] uppercase tracking-[0.5em] font-bold">Synchronizing with Aura</p>
      </motion.div>
    </motion.div>
  );
};

const AuraSkincare: React.FC<AuraSkincareProps> = ({ onBack }) => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [isRitualActive, setIsRitualActive] = useState(false);
  const [membershipConfirmed, setMembershipConfirmed] = useState(false);
  
  const { scrollYProgress } = useScroll();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const lightX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), { stiffness: 50, damping: 20 });
  const lightY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), { stiffness: 50, damping: 20 });

  const iconY1 = useTransform(scrollYProgress, [0.5, 0.9], [0, -120]);
  const iconY2 = useTransform(scrollYProgress, [0.5, 0.9], [0, -220]);
  const iconY3 = useTransform(scrollYProgress, [0.5, 0.9], [0, -170]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX / window.innerWidth);
    mouseY.set(e.clientY / window.innerHeight);
  };

  const handleInitiate = () => {
    setIsRitualActive(true);
    setTimeout(() => {
      setIsRitualActive(false);
      setMembershipConfirmed(true);
    }, 4500);
  };

  const products = [
    {
      id: 1,
      name: "Velvet Dew Serum",
      description: "Organic Hyaluron & Cold-pressed Rosehip",
      price: "€84",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=1000",
      texture: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=1000",
      tag: "Best Seller"
    },
    {
      id: 2,
      name: "Lunar Mist",
      description: "Sage Water & Mineral Ferments",
      price: "€62",
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=1000",
      texture: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=1000",
      tag: "Hydrating"
    },
    {
      id: 3,
      name: "Petal Balm",
      description: "Wild Hibiscus & Shea Butter",
      price: "€78",
      image: "https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?auto=format&fit=crop&q=80&w=1000",
      texture: "https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?auto=format&fit=crop&q=80&w=1000",
      tag: "Nourishing"
    }
  ];

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#FDFBF7] text-[#2D3436] font-['Inter'] selection:bg-[#E8D7D0]/50 scroll-smooth overflow-x-hidden relative cursor-none"
    >
      <GrainOverlay />
      <LiquidCursor />
      <AmbientAudio />

      <AnimatePresence>
        {isRitualActive && <MembershipRitualOverlay />}
      </AnimatePresence>

      <nav className="fixed top-0 w-full z-50 px-8 py-8 flex justify-between items-center bg-[#FDFBF7]/60 backdrop-blur-sm">
        <motion.button 
          whileHover={{ x: -2 }}
          onClick={onBack}
          className="flex items-center space-x-2 text-stone-400 hover:text-stone-800 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Back to Studio</span>
        </motion.button>
        
        <div className="flex flex-col items-center">
          <span className="text-3xl font-['Cormorant_Garamond'] font-light tracking-[0.2em] italic uppercase">Aura</span>
          <span className="text-[8px] font-bold uppercase tracking-[0.5em] text-stone-400 -mt-1">Botanical Science</span>
        </div>

        <div className="flex items-center space-x-10 text-[10px] font-bold uppercase tracking-widest text-stone-400">
          <a href="#collection" className="hover:text-stone-800 transition-colors">Collection</a>
          <a href="#membership" className="hover:text-stone-800 transition-colors">Membership</a>
        </div>
      </nav>

      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20">
        <div className="text-center z-10 max-w-4xl px-8">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400 mb-6"
          >
            The New Standard in Skin Wellness
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="text-7xl md:text-9xl font-['Cormorant_Garamond'] font-light leading-none tracking-tight text-stone-800 mb-12"
          >
            Your Skin, <br /><span className="italic">Transcended.</span>
          </motion.h1>
        </div>

        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-full h-full max-w-6xl max-h-[75vh] rounded-[120px] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=1974" 
              alt="Organic Serum" 
              className="w-full h-full object-cover grayscale opacity-30"
            />
            <motion.div 
              style={{
                background: useTransform(
                  [lightX, lightY],
                  ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.35) 0%, transparent 60%)`
                )
              }}
              className="absolute inset-0 pointer-events-none"
            />
          </div>
        </div>
      </section>

      <section id="collection" className="py-32 px-8 max-w-7xl mx-auto">
        <div className="mb-24 flex items-end justify-between border-b border-stone-100 pb-12">
          <h2 className="text-5xl font-['Cormorant_Garamond'] italic">The Ritual Collection</h2>
          <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">03 Essential Formulations</span>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              onMouseEnter={() => setHoveredProduct(p.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              className="group relative flex flex-col"
            >
              <div className="relative aspect-[4/5] mb-8 overflow-hidden rounded-[40px] transition-all duration-700">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={hoveredProduct === p.id ? 'texture' : 'image'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    src={hoveredProduct === p.id ? p.texture : p.image} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  />
                </AnimatePresence>
                
                <BotanicalSkeleton />

                <div className="absolute top-6 left-6 px-4 py-2 bg-white/20 backdrop-blur-xl rounded-full text-[9px] font-black uppercase tracking-widest text-white border border-white/10">
                  {p.tag}
                </div>

                <motion.button 
                  initial={{ opacity: 0, y: 15 }}
                  whileHover={{ scale: 1.05 }}
                  animate={{ opacity: hoveredProduct === p.id ? 1 : 0, y: hoveredProduct === p.id ? 0 : 15 }}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[80%] py-4 bg-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-2xl"
                >
                  Add to Ritual — {p.price}
                </motion.button>
              </div>
              <h3 className="text-2xl font-['Cormorant_Garamond'] mb-1">{p.name}</h3>
              <p className="text-xs text-stone-400 font-light italic">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="philosophy" className="py-40 bg-stone-50 border-y border-stone-100 px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400 mb-20 block">Pure Ethos</span>
          
          <div className="grid md:grid-cols-3 gap-16">
            {[
              { icon: <Leaf className="w-10 h-10" />, title: 'Cold-Pressed', y: iconY1 },
              { icon: <Droplets className="w-10 h-10" />, title: 'Bio-Mimetic', y: iconY2 },
              { icon: <Shield className="w-10 h-10" />, title: 'Ethical Shield', y: iconY3 }
            ].map((item, i) => (
              <motion.div key={i} className="flex flex-col items-center">
                <motion.div 
                  style={{ y: item.y }}
                  className="w-28 h-28 bg-white rounded-full flex items-center justify-center mb-10 shadow-lg text-[#E2E8DD] border border-white"
                >
                  {item.icon}
                </motion.div>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-4">{item.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="membership" className="relative h-[100vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?auto=format&fit=crop&q=80&w=1974" 
          alt="Skin Texture" 
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-20"
        />
        <div className="relative z-10 text-center px-8">
          <h2 className="text-6xl md:text-8xl font-['Cormorant_Garamond'] italic mb-12 text-stone-800">The Aura Membership</h2>
          
          <AnimatePresence mode="wait">
            {!membershipConfirmed ? (
              <motion.div 
                key="ritual-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col md:flex-row justify-center gap-4"
              >
                <input 
                  type="email" 
                  placeholder="Your Email Identity" 
                  className="px-8 py-5 rounded-full bg-white border border-stone-200 text-stone-800 outline-none w-80 text-xs font-light shadow-sm"
                />
                <button 
                  onClick={handleInitiate}
                  className="px-10 py-5 bg-stone-800 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-stone-700 transition-all shadow-xl"
                >
                  Initiate Ritual
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="ritual-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="w-20 h-20 bg-[#E2E8DD]/30 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#E2E8DD]/50">
                  <Heart className="w-8 h-8 text-stone-800" />
                </div>
                <h3 className="text-3xl font-['Cormorant_Garamond'] italic text-stone-800">Welcome to the inner circle.</h3>
                <p className="text-stone-400 text-[10px] uppercase tracking-[0.4em] font-bold">Your invitation is on its way</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <footer className="bg-white py-32 px-8 border-t border-stone-100">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <span className="text-5xl font-['Cormorant_Garamond'] italic uppercase tracking-[0.3em] text-stone-800">Aura</span>
          <span className="text-[9px] font-bold uppercase tracking-[0.6em] text-stone-400 mt-24">Paris • Stockholm • Tokyo</span>
        </div>
      </footer>
    </div>
  );
};

export default AuraSkincare;
