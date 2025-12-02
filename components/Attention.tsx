import React, { useState } from 'react';
import type { Scenario, PerceptionMode, AnalysisResult } from '../types';
import { Brain, ArrowRight } from 'lucide-react';

interface AttentionProps {
  isLoading: boolean;
  result: AnalysisResult | null;
  scenario: Scenario | null;
  mode: PerceptionMode;
  onReset: () => void;
}

// lobe color configs
const LOBE_CONFIG: Record<string, { hex: string; text: string; bg: string; border: string }> = {
  "Frontal Lobe": { hex: "#ec4899", text: "text-pink-700", bg: "bg-pink-50", border: "border-pink-400" },
  "Parietal Lobe": { hex: "#c026d3", text: "text-fuchsia-700", bg: "bg-fuchsia-50", border: "border-fuchsia-400" },
  "Temporal Lobe": { hex: "#fb7185", text: "text-rose-700", bg: "bg-rose-50", border: "border-rose-400" },
  "Occipital Lobe": { hex: "#dc2626", text: "text-red-700", bg: "bg-red-50", border: "border-red-400" },
  "Cerebellum": { hex: "#94a3b8", text: "text-slate-600", bg: "bg-slate-200", border: "border-slate-300" },
  "Brain Stem": { hex: "#64748b", text: "text-slate-700", bg: "bg-slate-300", border: "border-slate-400" },
};

// brain paths
const BRAIN_PATHS: Record<string, string> = {
  "Frontal Lobe": "M50,110 C50,60 90,20 150,20 C170,20 180,25 190,30 L190,110 L120,130 L50,110 Z",
  "Parietal Lobe": "M190,30 C220,35 250,50 260,90 L190,110 L190,30 Z",
  "Occipital Lobe": "M260,90 C270,120 260,150 240,160 L190,140 L190,110 L260,90 Z",
  "Temporal Lobe": "M120,130 L190,110 L190,140 L240,160 C220,180 160,180 120,150 L120,130 Z",
  "Cerebellum": "M200,160 C230,160 250,170 240,190 C220,200 200,190 200,160 Z",
  "Brain Stem": "M150,170 L150,210 L180,210 L180,170 Z"
};

const Attention: React.FC<AttentionProps> = ({ isLoading, result, scenario, mode, onReset }) => {
  const [selectedLobe, setSelectedLobe] = useState<keyof typeof LOBE_CONFIG | null>(null);
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-8 animate-pulse">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 border-t-4 border-rose-300 rounded-full animate-spin"></div>
          <div className="absolute inset-4 border-t-4 border-pink-500 rounded-full animate-spin reverse-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          <Brain className="absolute inset-0 m-auto text-slate-400 w-12 h-12" />
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-700 mb-2">Analyzing</h3>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="w-full h-full flex flex-col p-6 max-w-[1400px] mx-auto overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-4xl font-bold font-sans text-pink-600 mb-2">Stage 3: Attention</h2>
        <p className="text-slate-600 text-lg font-medium font-serif">
          Resource allocation and neural activation across the four main lobes.
        </p>
      </div>

      {/* processing flow */}
      <div className="w-full min-h-[100px] mb-8 bg-white/70 border border-pink-100 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-l backdrop-blur-md relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-100/40 to-transparent -skew-x-12 translate-x-[-100%] animate-[shimmer_3s_infinite]" />

        {/* input */}
        <div className="flex flex-col items-center text-center gap-3 z-10 w-full md:w-1/3">
          <div>
            <div className="text-xs text-pink-500 uppercase font-bold tracking-widest mb-1">INPUT</div>
            <div className="text-slate-800 font-bold font-sans text-2xl">{scenario?.modality} Data</div>
          </div>
        </div>

        {/* connector */}
        <div className="hidden md:flex flex-col items-center justify-center w-24 relative">
          <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-pink-300 w-1/2 animate-[progress_1.5s_infinite]" />
          </div>
          <ArrowRight className="text-slate-400 absolute -right-2" />
        </div>

        {/* processing */}
        <div className="flex flex-col items-center text-center gap-3 z-10 w-full md:w-1/3">
          <div>
            <div className="text-xs text-fuchsia-500 uppercase font-bold tracking-widest mb-1">FILTER</div>
            <div className="text-slate-800 font-bold font-sans text-2xl">{mode} Processing</div>
          </div>
        </div>

        {/* connector */}
        <div className="hidden md:flex flex-col items-center justify-center w-24 relative">
          <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-rose-400 w-1/2 animate-[progress_1.5s_infinite]" />
          </div>
          <ArrowRight className="text-slate-400 absolute -right-2" />
        </div>

        {/* output */}
        <div className="flex flex-col items-center text-center gap-3 z-10 w-full md:w-1/3">
          <div>
            <div className="text-xs text-rose-500 uppercase font-bold tracking-widest mb-1">OUTPUT</div>
            <div className="text-slate-800 font-bold font-sans text-2xl">Lobe Activation</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8 items-start flex-grow">
        {/* brain visualization */}
        <div className="w-full xl:w-5/12 flex flex-col items-center justify-center bg-white/50 rounded-3xl p-8 border border-white shadow-lg min-h-[500px]">
          <div className="relative w-full aspect-square max-w-[450px]">
            <div className={`absolute inset-0 bg-gradient-radial from-pink-200/40 to-transparent blur-3xl transition-opacity duration-500 ${selectedLobe ? 'opacity-20' : 'opacity-100'}`} />
            <svg viewBox="0 0 300 240" className="w-full h-full drop-shadow-xl">
              <defs>
                <filter id="glow-intense" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* cerebellum + brain stem */}
              <path d={BRAIN_PATHS["Cerebellum"]} fill={LOBE_CONFIG["Cerebellum"].hex} stroke="#cbd5e1" strokeWidth="2" className="transition-opacity duration-300" style={{ opacity: selectedLobe ? 0.2 : 1 }} />
              <path d={BRAIN_PATHS["Brain Stem"]} fill={LOBE_CONFIG["Brain Stem"].hex} stroke="#cbd5e1" strokeWidth="2" className="transition-opacity duration-300" style={{ opacity: selectedLobe ? 0.2 : 1 }} />

              {/* main lobes */}
              {Object.entries(BRAIN_PATHS).map(([key, pathData]) => {
                if (key === "Cerebellum" || key === "Brain Stem") return null;

                const regionData = result.regions.find(r => r.name === key);
                const intensity = regionData?.intensity || 0;
                const config = LOBE_CONFIG[key] || LOBE_CONFIG["Cerebellum"];

                let opacity = 0.4 + intensity / 200;
                let strokeWidth = intensity > 50 ? 2 : 1;
                let filter = intensity > 60 ? 'url(#glow-intense)' : 'none';

                if (selectedLobe) {
                  if (selectedLobe === key) {
                    opacity = 1;
                    strokeWidth = 3;
                    filter = 'url(#glow-intense)';
                  } else {
                    opacity = 0.1;
                    filter = 'none';
                  }
                }

                return (
                  <g
                    key={key}
                    className="group/lobe cursor-pointer"
                    onClick={() => setSelectedLobe(selectedLobe === key ? null : key)}
                  >
                    <path
                      d={pathData}
                      fill={config.hex}
                      stroke="white"
                      strokeWidth={strokeWidth}
                      className="transition-all duration-500 ease-in-out hover:brightness-110"
                      style={{ opacity, filter }}
                    />
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="mt-4 text-sm text-slate-500 font-medium">
            {selectedLobe ? "Click active lobe to reset view" : "Click a lobe to see detailed analysis"}
          </div>
        </div>

        {/* analysis */}
        <div className="w-full xl:w-7/12 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold font-sans text-slate-800 flex items-center gap-3">
              {selectedLobe ? "Focused Analysis" : "Lobe Overview"}
            </h3>
            <div className="flex gap-2">
              {selectedLobe && (
                <button
                  onClick={() => setSelectedLobe(null)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-600 hover:bg-pink-500 text-white text-sm font-bold font-sans shadow-lg transition-colors"
                >
                  Show Whole Brain
                </button>
              )}
              <button
                onClick={onReset}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-600 text-sm border border-slate-200 font-sans transition-colors shadow-sm"
              >
                Restart
              </button>
            </div>
          </div>

          <div className="flex-grow">
            {!selectedLobe ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                {result.regions.map((region, idx) => {
                  const config = LOBE_CONFIG[region.name] || LOBE_CONFIG["Cerebellum"];
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedLobe(region.name as keyof typeof LOBE_CONFIG)}
                      className={`bg-white/80 p-5 rounded-2xl border border-slate-200 backdrop-blur-sm flex flex-col hover:bg-white hover:scale-[1.02] cursor-pointer transition-all duration-300 relative overflow-hidden group shadow-sm`}
                    >
                      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 ${config.bg}`}></div>
                      <div className="flex justify-between items-center mb-3 relative z-10">
                        <h4 className={`font-bold font-sans text-lg ${config.text}`}>{region.name}</h4>
                        <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-500 border border-slate-200 font-bold">
                          {region.intensity}% Load
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 mb-4 relative z-10">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${region.intensity}%`, backgroundColor: config.hex }}
                        />
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed flex-grow relative z-10 line-clamp-3 font-medium font-serif">
                        {region.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              (() => {
                const region = result.regions.find(r => r.name === selectedLobe);
                if (!region) return null;
                const config = LOBE_CONFIG[region.name];
                return (
                  <div className={`h-full animate-fade-in-up bg-white/90 p-8 rounded-3xl border-2 ${config.border} backdrop-blur-md relative overflow-hidden flex flex-col shadow-xl`}>
                    <div className={`absolute -top-40 -right-40 w-96 h-96 rounded-full blur-[100px] opacity-20 ${config.bg}`}></div>
                    <div className="relative z-10 flex items-start justify-between mb-8">
                      <h4 className={`text-4xl font-black font-sans mb-2 ${config.text}`}>{region.name}</h4>
                      <div className={`text-5xl font-black ${config.text} opacity-30`}>{region.intensity}%</div>
                    </div>
                    <div className="space-y-6 relative z-10">
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-inner">
                        <div className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-bold">Role in {scenario?.title}</div>
                        <p className="text-xl text-slate-700 leading-relaxed font-medium font-serif">{region.description}</p>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2 text-slate-500 font-bold font-sans">
                          <span>Activation Intensity</span>
                          <span>{region.intensity} / 100</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                          <div className="h-full transition-all duration-1000 relative" style={{ width: `${region.intensity}%`, backgroundColor: config.hex }}>
                            <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attention;
