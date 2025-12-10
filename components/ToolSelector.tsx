import React from 'react';
import { TargetTool } from '../types';
import { Box, Code2, Zap } from 'lucide-react';

interface ToolSelectorProps {
  selectedTool: TargetTool;
  onSelect: (tool: TargetTool) => void;
}

const tools = [
  { 
    id: TargetTool.TRAE, 
    icon: Code2, 
    label: 'Trae', 
    desc: 'Foco em código limpo e estrutura modular.' 
  },
  { 
    id: TargetTool.LOVABLE, 
    icon: Zap, 
    label: 'Lovable', 
    desc: 'Foco em UI/UX visual e integrações rápidas.' 
  },
  { 
    id: TargetTool.ANTGRAVITY, 
    icon: Box, 
    label: 'AntGravity', 
    desc: 'Foco em escalabilidade e padrões enterprise.' 
  },
];

const ToolSelector: React.FC<ToolSelectorProps> = ({ selectedTool, onSelect }) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-slate-300 uppercase tracking-wider">Destino do Prompt</label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isSelected = selectedTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => onSelect(tool.id)}
              className={`
                relative flex flex-col items-start p-4 rounded-xl border transition-all duration-200 text-left
                ${isSelected 
                  ? 'bg-brand-900/20 border-brand-500 ring-1 ring-brand-500' 
                  : 'bg-slate-800/50 border-slate-700 hover:border-slate-600 hover:bg-slate-800'}
              `}
            >
              <div className={`p-2 rounded-lg mb-3 ${isSelected ? 'bg-brand-600 text-white' : 'bg-slate-700 text-slate-400'}`}>
                <Icon size={20} />
              </div>
              <div className="font-semibold text-white">{tool.label}</div>
              <div className="text-xs text-slate-400 mt-1">{tool.desc}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ToolSelector;