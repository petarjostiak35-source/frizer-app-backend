
import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform, animate, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Zap, BarChart3, ChevronRight, Globe, Cpu, ArrowLeft, CheckCircle2, Star, Quote, Info, X, Terminal } from 'lucide-react';

interface NeonVaultProps {
  onBack: () => void;
}

const CountUp = ({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        onUpdate: (latest) => setDisplayValue(latest),
        ease: "easeOut"
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}{displayValue.toFixed(displayValue > 10 ? 1 : 0)}{suffix}
    </span>
  );
};

const DataBreakingAnimation = () => {
  return (
    <div className="relative w-full h-12 flex items-center justify-center overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, (i % 2 === 0 ? 1 : -1) * 30, 0],
            y: [0, (i < 3 ? 1 : -1) * 20, 0],
            rotate: [0, 90, 0],
            opacity: [1, 0.4, 1],
            scale: [1, 0.5, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
          className="absolute w-2 h-2 bg-cyan-400 rounded-sm"
          style={{
            left: `${40 + (i % 3) * 10}%`,
            top: `${40 + Math.floor(i / 3) * 10}%`
          }}
        />
      ))}
      <motion.div 
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-cyan-500/5 blur-xl rounded-full"
      />
    </div>
  );
};

const CaseStudyPanel = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] cursor-pointer"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[70] shadow-2xl p-8 overflow-y-auto font-mono"
          >
            <div className="flex justify-between items-center mb-10 pb-4 border-b border-white/5">
              <div className="flex items-center space-x-2 text-cyan-500">
                <Terminal className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">System Documentation</span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X className="w-5 h-5 text-white/40" />
              </button>
            </div>

            <div className="space-y-8 text-sm">
              <div>
                <h2 className="text-cyan-400 text-lg font-bold mb-4 leading-tight">
                  High-End Crypto Asset Management Interface (Military Grade)
                </h2>
                <p className="text-slate-400 leading-relaxed">
                  <span className="text-cyan-600 mr-2">The Strategy:</span> For NeonVault, I didn't just build a landing page; I engineered a digital fortress. The goal was to attract the 0.1% of elite asset managers who demand mathematical certainty and architectural rigor.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-white text-xs font-bold uppercase tracking-widest bg-white/5 inline-block px-2 py-1">Key Architectural Decisions</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-cyan-500 font-bold mb-1">01_Active Defense Visualization</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">Implemented a central "Vault Core" with scanning line animations and real-time system indicators to symbolize active encryption.</p>
                  </div>
                  <div>
                    <h4 className="text-cyan-500 font-bold mb-1">02_Cognitive Authority</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">Used a strategic mix of deep-space dark modes for authority and high-contrast light sections for transparent financial reporting.</p>
                  </div>
                  <div>
                    <h4 className="text-cyan-500 font-bold mb-1">03_Zero-Latency Interactions</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">Leveraged Framer Motion for hardware-grade interface responses, ensuring the user feels the "weight" and speed of the platform.</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-cyan-500/5 border border-cyan-500/20 rounded-xl">
                <p className="text-slate-400 text-xs leading-relaxed italic">
                  <span className="text-cyan-500 font-bold not-italic block mb-1">The Result:</span> A conversion-optimized asset that positions the client as a global leader in secure finance, ready for SOC2 and ISO 27001 environments.
                </p>
              </div>
            </div>

            <div className="mt-20 pt-8 border-t border-white/5 text-[10px] text-slate-600">
              <p>STATUS: ARCHITECT_VERIFIED</p>
              <p>REVISION: 4.2.0-STABLE</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const CentralVisual = () => {
  return (
    <div className="relative w-full max-w-4xl h-[500px] mx-auto flex items-center justify-center">
      {/* Background Glows */}
      <div className="absolute inset-0 bg-cyan-500/10 blur-[100px] rounded-full scale-150 animate-pulse" />
      
      {/* Rotating Rings */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute w-[400px] h-[400px] border border-cyan-500/20 rounded-full border-dashed"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute w-[300px] h-[300px] border border-blue-500/30 rounded-full border-dotted"
      />

      {/* The Vault Core */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 w-64 h-64 bg-slate-900 rounded-[40px] border border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.3)] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent" />
        <div className="relative z-20 flex flex-col items-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Shield className="w-24 h-24 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
          </motion.div>
          <div className="mt-4 flex items-center space-x-2">
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-ping" />
            <span className="text-[10px] font-black tracking-widest text-cyan-500 uppercase">System Active</span>
          </div>
        </div>
        
        {/* Scanning Line */}
        <motion.div 
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-30 opacity-50"
        />
      </motion.div>

      {/* Floating Data Nodes */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0]
          }}
          transition={{ 
            duration: 3 + i, 
            repeat: Infinity,
            delay: i * 0.5
          }}
          className={`absolute p-4 rounded-2xl bg-slate-800/80 border border-white/10 backdrop-blur-md shadow-xl z-20
            ${i === 0 ? 'top-10 left-10' : ''}
            ${i === 1 ? 'top-20 right-10' : ''}
            ${i === 2 ? 'bottom-10 left-20' : ''}
            ${i === 3 ? 'bottom-20 right-20' : ''}
          `}
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              {i % 2 === 0 ? <Lock className="w-4 h-4 text-cyan-400" /> : <Zap className="w-4 h-4 text-blue-400" />}
            </div>
            <div>
              <div className="h-2 w-16 bg-white/10 rounded mb-1" />
              <div className="h-1.5 w-10 bg-white/5 rounded" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const NeonVault: React.FC<NeonVaultProps> = ({ onBack }) => {
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-cyan-500/30 font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center backdrop-blur-md border-b border-white/5">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium tracking-tight">Portfolio</span>
        </button>
        
        <div className="flex items-center space-x-3">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-10 h-10 bg-slate-900 rounded-lg border border-white/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">NEON <span className="text-cyan-500">VAULT</span></span>
        </div>

        <button className="px-6 py-2 bg-white text-slate-900 text-sm font-black rounded-full hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all">
          Launch App
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8"
          >
            <div className="flex -space-x-1">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-5 h-5 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center">
                   <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                </div>
              ))}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Verified by SOC2 & ISO 27001</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black tracking-tighter text-white mb-8 leading-[0.85]"
          >
            THE BANK OF <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              PURE SECURITY.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-slate-400 text-lg md:text-2xl leading-relaxed mb-12"
          >
            Engineered for elite asset managers. We provide hardware-grade isolation for your digital wealth with sub-second execution speeds.
          </motion.p>

          <CentralVisual />
        </div>
      </section>

      {/* LIGHT SECTION: Features */}
      <section className="py-32 px-6 bg-white text-slate-900 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-600 mb-4 block">Capabilities</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Built for the 0.1%</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              While others talk about security, we define it through architectural rigor and mathematical certainty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Atomic Storage", desc: "Data fragmented across global cold-storage nodes.", icon: <Cpu />, animation: <DataBreakingAnimation /> },
              { title: "Quantum Shield", desc: "Lattice-based cryptography for post-quantum safety.", icon: <Shield /> },
              { title: "Instant Audit", desc: "Verifiable proof-of-reserves on every block.", icon: <BarChart3 /> },
              { title: "Global Mesh", desc: "Low-latency access from any point on earth.", icon: <Globe /> }
            ].map((f, i) => (
              <div key={i} className="p-10 rounded-[32px] bg-slate-50 border border-slate-100 hover:shadow-2xl hover:shadow-cyan-500/5 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-cyan-600 mb-8 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{f.desc}</p>
                {f.animation && (
                  <div className="mt-4 border-t border-slate-200 pt-4">
                    {f.animation}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DARK SECTION: Stats & Security */}
      <section className="py-32 px-6 bg-slate-900 border-y border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-8">
              Zero compromises. <br />
              <span className="text-slate-500 text-3xl md:text-5xl">Ever.</span>
            </h2>
            <div className="space-y-6">
              {[
                "256-bit AES Hardware Encryption",
                "Biometric Multi-Sig Authorization",
                "Automated Threat Detection AI",
                "24/7 Global Surveillance Response"
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                  </div>
                  <span className="text-lg font-medium text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "Assets", val: 4.2, prefix: "$", suffix: "B" },
              { label: "Uptime", val: 100, suffix: "%" },
              { label: "Nodes", val: 1.4, suffix: "k" },
              { label: "Audits", val: 1, suffix: " / Day" }
            ].map((s, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center">
                <div className="text-4xl font-black text-cyan-400 mb-1">
                  <CountUp value={s.val} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHT SECTION: Testimonials */}
      <section className="py-32 px-6 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
             <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-600 mb-4 block">Testimonials</span>
             <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900">Voices of Trust</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alexander Reed",
                role: "Founding Partner, Reed Capital",
                content: "Neon Vault isn't just a platform; it's a paradigm shift. We sleep better knowing our LP assets are in the Vault.",
                avatar: "https://i.pravatar.cc/150?u=alex"
              },
              {
                name: "Sarah Chen",
                role: "CTO, BitHorizon",
                content: "The level of cryptographic sophistication is unparalleled. They've solved the speed vs security trade-off perfectly.",
                avatar: "https://i.pravatar.cc/150?u=sarah"
              },
              {
                name: "David Vane",
                role: "Hedge Fund Manager",
                content: "Sophistication meets technical excellence. I've never seen a team bridge the gap between beauty and code so well.",
                avatar: "https://i.pravatar.cc/150?u=david"
              }
            ].map((t, i) => (
              <div key={i} className="p-10 rounded-[40px] bg-white border border-slate-200 shadow-xl shadow-slate-200/50 relative">
                <Quote className="absolute top-10 right-10 w-12 h-12 text-slate-100" />
                <div className="flex mb-6">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />)}
                </div>
                <p className="text-slate-600 text-lg italic mb-10 relative z-10 leading-relaxed">"{t.content}"</p>
                <div className="flex items-center space-x-4">
                  <img src={t.avatar} className="w-12 h-12 rounded-full border border-slate-100 grayscale" alt={t.name} />
                  <div>
                    <h4 className="font-bold text-slate-900">{t.name}</h4>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-6 text-center bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent opacity-50" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-10 leading-[0.9]">
            READY TO <br />
            <span className="text-cyan-500">GO NEON?</span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="px-12 py-5 bg-cyan-500 text-slate-900 font-black rounded-2xl hover:bg-cyan-400 transition-all shadow-[0_0_40px_rgba(6,182,212,0.4)] text-lg">
              Open My Vault
            </button>
            <button className="px-12 py-5 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all text-lg">
              Talk to Sales
            </button>
          </div>
          <p className="mt-12 text-slate-500 font-bold uppercase tracking-[0.3em] text-xs">Zero setup fees • 24h onboarding • No limits</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 bg-slate-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <div className="flex items-center space-x-3 mb-6 md:mb-0">
             <Shield className="w-5 h-5 text-cyan-500" />
             <span className="font-black text-white">NEON VAULT</span>
          </div>
          <div className="flex space-x-10 mb-6 md:mb-0">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Documentation</a>
            <a href="#" className="hover:text-white transition-colors">Status</a>
          </div>
          <p>© 2024 Neon Vault Technologies. Encrypted by ArchiTech.</p>
        </div>
      </footer>

      {/* Fixed Case Study Trigger */}
      <button 
        onClick={() => setIsCaseStudyOpen(true)}
        className="fixed bottom-10 right-10 z-[55] w-14 h-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center group hover:bg-cyan-500 transition-all duration-500 shadow-2xl"
      >
        <span className="absolute -left-28 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest text-white whitespace-nowrap border border-white/10 pointer-events-none">
          View Case Study
        </span>
        <Info className="w-6 h-6 text-white group-hover:text-slate-900" />
      </button>

      {/* Case Study Panel */}
      <CaseStudyPanel isOpen={isCaseStudyOpen} onClose={() => setIsCaseStudyOpen(false)} />
    </div>
  );
};

export default NeonVault;
