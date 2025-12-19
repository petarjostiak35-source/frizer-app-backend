
import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../constants';
import { Quote } from 'lucide-react';

const SocialProof: React.FC = () => {
  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-2 block">Voices</span>
        <h2 className="text-4xl font-bold">Trusted by Visionaries</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {TESTIMONIALS.map((testimonial) => (
          <div key={testimonial.id} className="relative p-10 rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
            <Quote className="absolute top-6 right-8 w-16 h-16 text-white/5 -rotate-12" />
            <p className="text-xl italic text-white/80 mb-8 leading-relaxed relative z-10">
              "{testimonial.content}"
            </p>
            <div className="flex items-center space-x-4">
              <img src={testimonial.avatarUrl} alt={testimonial.author} className="w-12 h-12 rounded-full grayscale border border-white/10" />
              <div>
                <h4 className="font-bold text-white">{testimonial.author}</h4>
                <p className="text-sm text-white/40">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-30 grayscale contrast-125">
         <span className="text-2xl font-black tracking-tighter uppercase">Linear</span>
         <span className="text-2xl font-black tracking-tighter uppercase">Apple</span>
         <span className="text-2xl font-black tracking-tighter uppercase">Stripe</span>
         <span className="text-2xl font-black tracking-tighter uppercase">SpaceX</span>
      </div>
    </section>
  );
};

export default SocialProof;
