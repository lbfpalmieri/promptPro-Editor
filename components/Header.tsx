import React from 'react';
import { Sparkles, Terminal } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-brand-600 p-2 rounded-lg">
            <Terminal className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">PromptPro <span className="text-brand-400">Editor</span></h1>
            <p className="text-xs text-slate-400">Otimizador para Trae, Lovable & AntGravity</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="hidden sm:inline">Powered by Gemini 2.5</span>
        </div>
      </div>
    </header>
  );
};

export default Header;