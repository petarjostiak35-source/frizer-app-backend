
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`group relative w-full h-full overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] transition-all duration-500 hover:border-white/30 hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Background Image with Blur Transition */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale blur-2xl scale-125 transition-all duration-1000 ease-out group-hover:opacity-70 group-hover:grayscale-0 group-hover:blur-none group-hover:scale-105"
        />
      </div>

      {/* Content Overlay */}
      <div 
        style={{ transform: "translateZ(75px)" }}
        className="absolute inset-0 z-10 p-8 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-3 font-bold">{project.category}</span>
        <h3 className="text-3xl font-bold mb-2 tracking-tight group-hover:text-white transition-colors duration-500">{project.title}</h3>
        <p className="text-sm text-white/60 leading-relaxed max-w-[90%] transition-all duration-700 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
          {project.description}
        </p>
      </div>
      
      {/* Corner Glow Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
    </motion.div>
  );
};

export default ProjectCard;
