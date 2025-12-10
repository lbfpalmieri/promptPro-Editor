import { GoogleGenAI } from "@google/genai";
import { TargetTool, GenerationRequest } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getSystemInstruction = (tool: TargetTool, language: 'pt' | 'en'): string => {
  const langInstruction = language === 'pt' 
    ? "Generate the final prompt in Portuguese (Brazil)." 
    : "Generate the final prompt in English.";

  const commonRules = `
    You are PromptPro AI, a Senior Software Architect and Prompt Engineer.
    Your goal is to take a vague or simple user idea and transform it into a highly detailed, technical, and bug-resistant prompt designed specifically for AI coding agents like ${tool}.
    
    The prompt you generate must instruct the AI agent to:
    1. Follow strict file structure and separation of concerns.
    2. Use React 18+, TypeScript, and Tailwind CSS (unless specified otherwise).
    3. Avoid common pitfalls like "infinite loops in useEffect", "undefined imports", or "hallucinated libraries".
    4. Implement robust error handling and loading states.
    5. Prioritize UX/UI with accessible contrast and responsive design (Mobile First).
    
    ${langInstruction}
  `;

  const specificToolInstructions: Record<TargetTool, string> = {
    [TargetTool.TRAE]: `
      Specifics for Trae:
      - Emphasize modular file structure.
      - Explicitly ask to generate 'metadata.json' if required by the environment.
      - Focus on clean state management (Zustand or Context API).
      - Ask to strictly follow TypeScript strict mode.
    `,
    [TargetTool.LOVABLE]: `
      Specifics for Lovable:
      - Emphasize visual aesthetics and "wow" factor.
      - Suggest using Lucide React for icons.
      - Suggest using shadcn/ui or similar component patterns if compatible, otherwise pure Tailwind.
      - Focus on database integration patterns (Supabase is often preferred with Lovable).
    `,
    [TargetTool.ANTGRAVITY]: `
      Specifics for AntGravity:
      - Focus on enterprise-grade scalability.
      - Emphasize strict typing and interfaces.
      - Ensure components are reusable and atomic.
      - Ask for comprehensive comments in complex logic areas.
    `
  };

  return `${commonRules}\n${specificToolInstructions[tool]}`;
};

export const generateOptimizedPrompt = async (request: GenerationRequest): Promise<string> => {
  try {
    const systemInstruction = getSystemInstruction(request.tool, request.language);
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `User Idea: "${request.idea}"\n\nCreate the perfect prompt for ${request.tool}.`,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7, // Creative but structured
      }
    });

    return response.text || "Erro ao gerar o prompt. Tente novamente.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Falha na comunicação com a IA.");
  }
};