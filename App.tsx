import React, { useState } from 'react';
import Header from './components/Header';
import ToolSelector from './components/ToolSelector';
import PromptDisplay from './components/PromptDisplay';
import { generateOptimizedPrompt } from './services/geminiService';
import { TargetTool } from './types';
import { Wand2, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [idea, setIdea] = useState('');
  const [selectedTool, setSelectedTool] = useState<TargetTool>(TargetTool.LOVABLE);
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!idea.trim()) {
      setError("Por favor, descreva sua ideia primeiro.");
      return;
    }

    setLoading(true);
    setError(null);
    setGeneratedPrompt('');

    try {
      const result = await generateOptimizedPrompt({
        idea,
        tool: selectedTool,
        language
      });
      setGeneratedPrompt(result);
    } catch (err) {
      setError("Ocorreu um erro ao conectar com a IA. Verifique sua chave de API ou tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          
          {/* Left Column: Input and Configuration */}
          <div className="space-y-8 flex flex-col">
            
            {/* Intro Text */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h2 className="text-2xl font-bold text-white mb-2">Editor de Requisitos</h2>
              <p className="text-slate-400 leading-relaxed">
                Descreva sua ideia de software abaixo. Nossa IA irá reescrever sua descrição seguindo 
                rigorosamente a documentação técnica do <strong>{selectedTool}</strong> para evitar bugs e garantir a melhor arquitetura.
              </p>
            </div>

            {/* Tool Selection */}
            <ToolSelector selectedTool={selectedTool} onSelect={setSelectedTool} />

            {/* Idea Input */}
            <div className="flex-1 flex flex-col space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-sm font-medium text-slate-300 uppercase tracking-wider">
                  Sua Ideia (Rascunho)
                </label>
                <div className="flex bg-slate-800 p-1 rounded-lg">
                    <button 
                        onClick={() => setLanguage('pt')} 
                        className={`px-3 py-1 text-xs font-semibold rounded ${language === 'pt' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                        PT-BR
                    </button>
                    <button 
                        onClick={() => setLanguage('en')} 
                        className={`px-3 py-1 text-xs font-semibold rounded ${language === 'en' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                        EN
                    </button>
                </div>
              </div>
              
              <textarea
                value={idea}
                onChange={(e) => {
                    setIdea(e.target.value);
                    if (error) setError(null);
                }}
                placeholder="Ex: Quero um app de tarefas onde eu possa arrastar os cards (kanban), com modo escuro e login via Google..."
                className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all resize-none min-h-[200px]"
              />
              
              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 p-3 rounded-lg border border-red-900/50">
                    <AlertCircle size={16} />
                    {error}
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={loading || !idea.trim()}
                className={`
                    w-full py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg
                    ${loading || !idea.trim() 
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-500 hover:to-blue-500 text-white shadow-brand-500/20'}
                `}
              >
                {loading ? (
                    <span className="animate-pulse">Otimizando Prompt...</span>
                ) : (
                    <>
                        <Wand2 className="w-6 h-6" />
                        Gerar Prompt Otimizado
                    </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Output */}
          <div className="h-full min-h-[500px] lg:min-h-auto">
            <PromptDisplay markdownContent={generatedPrompt} isLoading={loading} />
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;