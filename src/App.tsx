import React, { useState } from 'react';
import { type Stage, type PerceptionMode, type Scenario, type AnalysisResult } from '../types';
import Sensation from '../components/Sensation';
import Perception from '../components/Perception';
import Attention from '../components/Attention';
import { analyzeCognitiveProcess } from '../services/geminiService';
import './App.css';

const App: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<Stage>('SENSATION');
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [perceptionMode, setPerceptionMode] = useState<PerceptionMode>('Bottom-Up');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSensationComplete = () => {
    setCurrentStage('PERCEPTION');
  };

  const handleScenarioSelect = (scenario: Scenario) => {
    setSelectedScenario(scenario);
  };

  const handleModeSelect = (mode: PerceptionMode) => {
    setPerceptionMode(mode);
  };

  const handleProcess = async () => {
    if (!selectedScenario) return;

    setCurrentStage('ATTENTION');
    setLoading(true);

    try {
      const result = await analyzeCognitiveProcess(
        selectedScenario.title, 
        perceptionMode,
        selectedScenario.modality
      );
      setAnalysisResult(result);
    } catch (error) {
      console.error("Error processing:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentStage('SENSATION');
    setSelectedScenario(null);
    setAnalysisResult(null);
    setPerceptionMode('Bottom-Up');
  };

  return (
    <div className="min-h-screen w-full font-sans bg-slate-50 text-slate-900 transition-colors duration-1000 ease-in-out">
      {/* header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-slate-50/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-end">
          <div className="flex items-center gap-2 md:gap-4 mx-auto">
            {['SENSATION', 'PERCEPTION', 'ATTENTION'].map((stage, idx) => {
              const isActive = currentStage === stage;
              const isPast = 
                (currentStage === 'PERCEPTION' && stage === 'SENSATION') ||
                (currentStage === 'ATTENTION' && stage !== 'ATTENTION');
              
              let activeColor = "bg-blue-500";
              let textColor = "text-blue-600";
              if (currentStage === 'PERCEPTION') { 
                activeColor = "bg-[#f4a261]"; 
                textColor = "text-[#f4a261]"; 
              }
              if (currentStage === 'ATTENTION') { 
                activeColor = "bg-pink-500"; 
                textColor = "text-pink-600"; 
              }

              return (
                <div key={stage} className="flex items-center gap-2">
                  <div 
                    className={`
                      w-3 h-3 rounded-full transition-all duration-500
                      ${isActive ? `${activeColor} shadow-[0_0_10px_rgba(0,0,0,0.2)] scale-125` : isPast ? 'bg-slate-300' : 'bg-slate-200'}
                    `}
                  />
                  <span className={`text-xs font-bold tracking-wide hidden md:block transition-colors duration-500 ${isActive ? textColor : 'text-slate-400'}`}>
                    {stage}
                  </span>
                  {idx < 2 && <div className="w-8 h-px bg-slate-200 hidden md:block" />}
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* main content part */}
      <main className="pt-20 h-screen w-full relative">
        <div className="h-full w-full transition-opacity duration-500 ease-in-out">
          {currentStage === 'SENSATION' && (
            <Sensation onComplete={handleSensationComplete} />
          )}
          
          {currentStage === 'PERCEPTION' && (
            <div className="h-full flex flex-col pt-4 animate-fade-in">
              <Perception 
                selectedScenario={selectedScenario}
                perceptionMode={perceptionMode}
                onSelectScenario={handleScenarioSelect}
                onSelectMode={handleModeSelect}
                onProcess={handleProcess}
              />
            </div>
          )}

          {currentStage === 'ATTENTION' && (
             <div className="h-full flex flex-col pt-4 animate-fade-in">
                <Attention 
                  isLoading={loading}
                  result={analysisResult}
                  scenario={selectedScenario}
                  mode={perceptionMode}
                  onReset={handleReset}
                />
             </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;