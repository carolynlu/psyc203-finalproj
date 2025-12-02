import { GoogleGenAI, Type } from "@google/genai";
import { type AnalysisResult } from "../types";

const apiKey = import.meta.env.VITE_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const analyzeCognitiveProcess = async (
  scenarioTitle: string,
  mode: string,
  modality: string
): Promise<AnalysisResult> => {
  if (!apiKey) {
    // mock data for no api key
    console.warn("No API Key found. Returning mock data.");
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                explanation: `The brain integrates ${modality} inputs through a ${mode} filter.`,
                regions: [
                    { name: "Frontal Lobe", intensity: 75, description: "Directing conscious attention and making decisions based on the sensory data." },
                    { name: "Parietal Lobe", intensity: 45, description: "Integrating spatial awareness and locating the source of the stimulus." },
                    { name: "Occipital Lobe", intensity: 90, description: "Heavily active in processing the raw visual features and patterns." },
                    { name: "Temporal Lobe", intensity: 60, description: "Connecting the visual input to memory and object recognition." }
                ]
            });
        }, 1500);
    });
  }

  const prompt = `
    Analyze the cognitive journey of a human brain experiencing the scenario: "${scenarioTitle}".
    
    Context:
    1. Sensory Input: ${modality}
    2. Perception Strategy: ${mode}
    
    Your goal is to explain how the 4 MAIN LOBES of the brain are involved in this specific task.
    
    Return a JSON object with:
    1. "explanation": A 1-sentence summary of the overall flow.
    2. "regions": An array of EXACTLY 4 objects, one for each of these lobes: "Frontal Lobe", "Parietal Lobe", "Temporal Lobe", "Occipital Lobe".
       - "name": The lobe name (e.g., "Frontal Lobe").
       - "intensity": 0-100 based on how active it is for this specific task.
       - "description": A specific explanation (1-2 sentences) of EXACTLY what this lobe is doing in this scenario (e.g., "The Temporal Lobe is identifying the face based on memory" or "The Frontal Lobe is focusing attention on the specific text").
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            explanation: { type: Type.STRING },
            regions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  intensity: { type: Type.NUMBER },
                  description: { type: Type.STRING },
                },
                required: ["name", "intensity", "description"],
              },
            },
          },
          required: ["explanation", "regions"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response text");
    return JSON.parse(text) as AnalysisResult;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to analyze cognitive process.");
  }
};