import React, { useEffect, useState } from 'react';
import { Scenario, PerceptionMode, SensoryModality } from '../../types';
import { Eye, BookOpen, Coffee, Search, ArrowUpCircle, ArrowDownCircle, Ear, Hand, Activity, Zap, Radio, Utensils, Music, Wind, Fingerprint, Sparkles, Pencil } from 'lucide-react';

interface PerceptionProps {
  selectedScenario: Scenario | null;
  perceptionMode: PerceptionMode;
  onSelectScenario: (s: Scenario) => void;
  onSelectMode: (m: PerceptionMode) => void;
  onProcess: () => void;
}

const SCENARIOS: Scenario[] = [
  { id: '1', title: 'Finding a Face', description: 'Scanning a crowded train station for a friend.', icon: 'Search', modality: 'Visual' },
  { id: '2', title: 'Jazz Improvisation', description: 'Isolating the saxophone line in a busy ensemble.', icon: 'Music', modality: 'Auditory' },
  { id: '3', title: 'Fresh Coffee', description: 'Identifying the roast of beans by scent alone.', icon: 'Coffee', modality: 'Olfactory' },
  { id: '4', title: 'Reading Braille', description: 'Decoding text patterns through finger sensitivity.', icon: 'Fingerprint', modality: 'Tactile' },
  { id: '5', title: 'Spicy Challenge', description: 'Analyzing the flavors and heat level of a new dish.', icon: 'Utensils', modality: 'Gustatory' },
];

// Helper to render scenario icon
const ScenarioIcon = ({ name, className }: { name: string; className?: string }) => {
  switch (name) {
    case 'BookOpen': return <BookOpen className={className} />;
    case 'Search': return <Search className={className} />;
    case 'Music': return <Music className={className} />;
    case 'Coffee': return <Coffee className={className} />;
    case 'Fingerprint': return <Fingerprint className={className} />;
    case 'Utensils': return <Utensils className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    default: return <Eye className={className} />;
  }
};

const MODALITY_ICONS: Record<SensoryModality, React.ElementType> = {
  Visual: Eye,
  Auditory: Ear,
  Olfactory: Coffee,
  Tactile: Hand,
  Gustatory: Utensils,
  Multisensory: Activity
};

// Background decoration types
interface BgIcon {
  id: number;
  Icon: React.ElementType;
  x: number;
  y: number;
  modality: SensoryModality;
  size: number;
  rotation: number;
}

const Perception: React.FC<PerceptionProps> = ({
  selectedScenario,
  perceptionMode,
  onSelectScenario,
  onSelectMode,
  onProcess,
}) => {
  const [bgIcons, setBgIcons] = useState<BgIcon[]>([]);
  
  // Custom Scenario State
  const [customTitle, setCustomTitle] = useState('');
  const [customModality, setCustomModality] = useState<SensoryModality>('Visual');

  // Initialize background icons
  useEffect(() => {
    const generated: BgIcon[] = [];
    const types: {type: SensoryModality, icon: any}[] = [
      { type: 'Visual', icon: Eye },
      { type: 'Visual', icon: Search },
      { type: 'Auditory', icon: Ear },
      { type: 'Auditory', icon: Radio },
      { type: 'Tactile', icon: Hand },
      { type: 'Olfactory', icon: Coffee }, 
      { type: 'Olfactory', icon: Wind },
      { type: 'Gustatory', icon: Utensils },
      { type: 'Multisensory', icon: Activity },
    ];
    
    for (let i = 0; i < 60; i++) {
      const t = types[Math.floor(Math.random() * types.length)];
      generated.push({
        id: i,
        Icon: t.icon,
        x: Math.random() * 100,
        y: Math.random() * 100,
        modality: t.type,
        size: Math.random() * 24 + 12,
        rotation: Math.random() * 360
      });
    }
    setBgIcons(generated);
  }, []);

  const handleCustomScenarioUpdate = (title: string, modality: SensoryModality) => {
    setCustomTitle(title);
    setCustomModality(modality);
    onSelectScenario({
      id: 'custom',
      title: title,
      description: 'User generated custom scenario',
      icon: 'Sparkles',
      modality: modality
    });
  };

  const isCustomSelected = selectedScenario?.id === 'custom';
  const isProcessDisabled = !selectedScenario || (isCustomSelected && !customTitle.trim());

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 max-w-6xl mx-auto overflow-hidden">
      
      {/* Background Layer - Showing Filtering Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {bgIcons.map((item) => {
          const isRelevant = selectedScenario?.modality === item.modality;
          const isSelected = !!selectedScenario;
          
          let opacity = 0.1; 
          let color = "text-slate-300"; // Light gray by default in light mode
          let scale = 1;
          let blur = "blur-[1px]";

          if (isSelected) {
            if (isRelevant) {
              opacity = 0.6;
              color = "text-purple-600"; // Highlight with purple
              scale = 1.3;
              blur = "blur-none";
            } else {
              opacity = 0.05;
              color = "text-slate-200"; // Fade out others
              scale = 0.8;
              blur = "blur-sm";
            }
          }

          return (
             <div 
              key={item.id}
              className={`absolute transition-all duration-1000 ease-in-out ${color} ${blur}`}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                opacity: opacity,
                transform: `scale(${scale}) rotate(${item.rotation}deg)`,
              }}
             >
               <item.Icon size={item.size} />
             </div>
          );
        })}
      </div>

      {/* Connection Header */}
      <div className="w-full mb-6 text-center z-10 transition-all">
         <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full mb-4 text-sm font-bold tracking-wide border transition-colors duration-500 shadow-sm ${selectedScenario ? 'bg-purple-100 border-purple-200 text-purple-700' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
            <Zap size={14} className={selectedScenario ? "animate-pulse text-yellow-500" : ""} /> 
            {selectedScenario ? "Sensory Stream Filtered" : "Awaiting Sensory Filter"}
         </div>
         <h2 className="text-4xl font-bold text-purple-600 mb-2">
          Stage 2: Perception
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto h-12 font-medium">
          {selectedScenario 
            ? <span>Applying <span className="text-purple-600 font-bold">{selectedScenario.modality}</span> filter. Organizing raw chaos into the <span className="text-purple-600 font-bold">"{selectedScenario.title || '...'}"</span> pattern.</span>
            : "The brain receives chaotic data. Select a real-world scenario to apply a perceptual filter."
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full h-full min-h-[400px] z-10">
        {/* Left Column: Scenarios (The Filter) */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-700 border-b border-purple-200 pb-2 mb-4 flex items-center gap-2">
            <span>1. Select Scenario (The Filter)</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {SCENARIOS.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => onSelectScenario(scenario)}
                className={`p-4 rounded-2xl text-left transition-all duration-300 border relative overflow-hidden group shadow-sm ${
                  selectedScenario?.id === scenario.id
                    ? 'bg-purple-50 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)] scale-[1.02]'
                    : 'bg-white/80 border-slate-200 hover:bg-white hover:border-purple-300'
                }`}
              >
                <div className={`mb-3 p-2 rounded-xl inline-block transition-colors ${selectedScenario?.id === scenario.id ? 'bg-purple-500 text-white shadow-md' : 'bg-slate-100 text-slate-600 group-hover:bg-purple-100 group-hover:text-purple-600'}`}>
                  <ScenarioIcon name={scenario.icon} className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-800 mb-1">{scenario.title}</h4>
                <div className="text-xs font-bold font-mono text-purple-600 mb-1 uppercase tracking-wider">{scenario.modality} Input</div>
                <p className="text-sm text-slate-500 leading-tight">{scenario.description}</p>
              </button>
            ))}

            {/* Custom Scenario Card */}
            <div
              onClick={() => {
                if (!isCustomSelected) handleCustomScenarioUpdate(customTitle, customModality);
              }}
              className={`p-4 rounded-2xl text-left transition-all duration-300 border relative overflow-hidden group cursor-pointer shadow-sm ${
                isCustomSelected
                  ? 'bg-purple-50 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)] scale-[1.02] col-span-1 sm:col-span-2'
                  : 'bg-white/80 border-slate-200 hover:bg-white hover:border-purple-300'
              }`}
            >
               {!isCustomSelected ? (
                 <>
                    <div className="mb-3 p-2 rounded-xl inline-block bg-slate-100 text-slate-600 group-hover:bg-purple-100 group-hover:text-purple-600 transition-colors">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-slate-800 mb-1">Create Your Own</h4>
                    <div className="text-xs font-bold font-mono text-purple-600 mb-1 uppercase tracking-wider">Custom Input</div>
                    <p className="text-sm text-slate-500 leading-tight">Type any scenario and the AI will analyze the perceptual process.</p>
                 </>
               ) : (
                 <div className="flex flex-col gap-3 animate-fade-in">
                    <div className="flex items-center gap-2 text-purple-700 font-bold border-b border-purple-200 pb-2">
                       <Pencil className="w-4 h-4" /> Custom Scenario
                    </div>
                    
                    <div>
                      <label className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1 block">What is happening?</label>
                      <input 
                        type="text" 
                        value={customTitle}
                        onChange={(e) => handleCustomScenarioUpdate(e.target.value, customModality)}
                        placeholder="e.g. Eating a sour lemon..."
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 placeholder-slate-400"
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>

                    <div>
                       <label className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-2 block">Primary Sense</label>
                       <div className="flex gap-2 flex-wrap">
                          {(Object.keys(MODALITY_ICONS) as SensoryModality[]).map((m) => {
                             const Icon = MODALITY_ICONS[m];
                             const isActive = customModality === m;
                             return (
                               <button
                                 key={m}
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   handleCustomScenarioUpdate(customTitle, m);
                                 }}
                                 className={`p-2 rounded-lg border transition-all ${isActive ? 'bg-purple-500 border-purple-600 text-white shadow-md' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-white hover:text-purple-600'}`}
                                 title={m}
                               >
                                 <Icon className="w-5 h-5" />
                               </button>
                             )
                          })}
                       </div>
                    </div>
                 </div>
               )}
            </div>

          </div>
        </div>

        {/* Right Column: Mode Selection & Action */}
        <div className="flex flex-col space-y-6">
           <h3 className="text-xl font-bold text-slate-700 border-b border-purple-200 pb-2 mb-4">
            2. Choose Processing Strategy
          </h3>
          
          <div className="flex gap-4">
            <button
              onClick={() => onSelectMode(PerceptionMode.BOTTOM_UP)}
              className={`flex-1 p-6 rounded-2xl border flex flex-col items-center justify-center gap-3 transition-all backdrop-blur-sm shadow-sm ${
                perceptionMode === PerceptionMode.BOTTOM_UP
                  ? 'bg-purple-50 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)] ring-1 ring-purple-300'
                  : 'bg-white/60 border-slate-200 hover:bg-white hover:border-purple-300'
              }`}
            >
              <div className="text-center">
                <span className="block font-bold text-lg text-slate-800">Bottom-Up</span>
                <span className="text-xs text-slate-500 mt-1 block">Data-Driven</span>
              </div>
            </button>

            <button
              onClick={() => onSelectMode(PerceptionMode.TOP_DOWN)}
              className={`flex-1 p-6 rounded-2xl border flex flex-col items-center justify-center gap-3 transition-all backdrop-blur-sm shadow-sm ${
                perceptionMode === PerceptionMode.TOP_DOWN
                  ? 'bg-purple-50 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)] ring-1 ring-purple-300'
                  : 'bg-white/60 border-slate-200 hover:bg-white hover:border-purple-300'
              }`}
            >
              <div className="text-center">
                <span className="block font-bold text-lg text-slate-800">Top-Down</span>
                <span className="text-xs text-slate-500 mt-1 block">Concept-Driven</span>
              </div>
            </button>
          </div>

          <div className="flex-grow flex items-end justify-center pt-8">
            <button
              onClick={onProcess}
              disabled={isProcessDisabled}
              className={`w-full py-4 rounded-2xl font-bold text-xl transition-all shadow-lg flex items-center justify-center gap-3 relative overflow-hidden ${
                !isProcessDisabled
                  ? 'bg-purple-600 hover:bg-purple-500 text-white cursor-pointer transform hover:scale-[1.02] shadow-purple-500/30'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
               <span className="relative z-10">Direct Attention</span>
               {!isProcessDisabled && (
                 <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
               )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perception;