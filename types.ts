export type Stage = 'SENSATION' | 'PERCEPTION' | 'ATTENTION';

export type PerceptionMode = 'Bottom-Up' | 'Top-Down';

export type SensoryModality = 'Visual' | 'Auditory' | 'Tactile' | 'Olfactory' | 'Gustatory' | 'Multisensory';

export interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: string;
  modality: SensoryModality;
}

export interface BrainRegion {
  name: string;
  intensity: number;
  description: string;
}

export interface AnalysisResult {
  explanation: string;
  regions: BrainRegion[];
}