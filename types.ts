export enum TargetTool {
  TRAE = 'Trae',
  LOVABLE = 'Lovable',
  ANTGRAVITY = 'AntGravity'
}

export interface GenerationRequest {
  idea: string;
  tool: TargetTool;
  language: 'pt' | 'en';
}

export interface PromptResponse {
  markdown: string;
}

export interface ToolConfig {
  id: TargetTool;
  name: string;
  description: string;
  icon: string;
}