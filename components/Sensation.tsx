import React, { useEffect, useState } from 'react';
import { Eye, Ear, Hand, Move, Zap, Waves, Activity, Hexagon } from '../node_modules/lucide-react';

interface SensationProps {
  onComplete: () => void;
}

const ICONS = [Eye, Ear, Hand, Move, Zap, Waves, Activity, Hexagon];
const COLORS = [
  'text-cyan-600',
  'text-blue-600', 
  'text-sky-700', 
  'text-indigo-600',
  'text-teal-600',
  'text-slate-500'
];

interface FloatingIcon {
  id: number;
  Icon: React.ElementType;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

const Sensation: React.FC<SensationProps> = ({ onComplete }) => {
  const [icons, setIcons] = useState<FloatingIcon[]>([]);
  const [isConverging, setIsConverging] = useState(false);

  useEffect(() => {
    const newIcons = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      Icon: ICONS[Math.floor(Math.random() * ICONS.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 15,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 5,
    }));
    setIcons(newIcons);
  }, []);

  const handleNext = () => {
    setIsConverging(true);
    setTimeout(onComplete, 1200);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-slate-50 z-0 pointer-events-none" />

      {/* title */}
      <div className={`z-10 text-center mb-8 bg-white/70 p-10 rounded-3xl backdrop-blur-xl border border-white/60 shadow-xl max-w-2xl transition-all duration-700 ${isConverging ? 'opacity-0 scale-90 translate-y-4 blur-sm' : 'opacity-100 scale-100'}`}>
        <h2 className="text-6xl font-black text-blue-600 font-sans mb-6 pb-4">
          Stage 1: Sensation
        </h2>
        <p className="text-slate-600 text-xl mb-10 leading-relaxed font-medium font-serif">
          The environment is full of chaotic, unprocessed data! 
        </p>
        <button
          onClick={handleNext}
          className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-blue-600 transition-all duration-200 bg-transparent border-2 border-blue-600 rounded-full hover:bg-blue-50 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 overflow-hidden"
        >
          <span className="relative flex items-center gap-3 font-sans">
            Gather Sensory Input
          </span>
        </button>
      </div>

      {/* floating icons part */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {icons.map((item) => (
          <div
            key={item.id}
            className={`absolute ${item.color} transition-all ease-in-out`}
            style={{
              left: isConverging ? '50%' : `${item.x}%`,
              top: isConverging ? '50%' : `${item.y}%`,
              transform: isConverging ? 'translate(-50%, -50%) scale(0.2) rotate(180deg)' : undefined,
              opacity: isConverging ? 0 : 0.6,
              filter: isConverging ? 'blur(4px)' : 'none',
              transitionDuration: isConverging ? '1.2s' : '0s',
              animation: isConverging ? 'none' : `float ${item.duration}s ease-in-out infinite`,
              animationDelay: `${item.delay}s`,
            }}
          >
            <item.Icon size={item.size} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sensation;