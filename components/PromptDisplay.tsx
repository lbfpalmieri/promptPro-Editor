import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, Terminal } from 'lucide-react';

interface PromptDisplayProps {
  markdownContent: string;
  isLoading: boolean;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({ markdownContent, isLoading }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-900 rounded-xl border border-slate-700 animate-pulse">
        <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-brand-400 font-medium">A IA está arquitetando seu software...</p>
        <p className="text-slate-500 text-sm mt-2">Analisando requisitos e melhores práticas.</p>
      </div>
    );
  }

  if (!markdownContent) {
    return (
      <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-800/30 rounded-xl border border-dashed border-slate-700 text-slate-500">
        <Terminal className="w-12 h-12 mb-4 opacity-50" />
        <p>Seu prompt otimizado aparecerá aqui.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-xl border border-slate-700 overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 border-b border-slate-700">
        <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          Prompt Gerado
        </span>
        <button
          onClick={handleCopy}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
            ${copied 
              ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
              : 'bg-slate-700 hover:bg-slate-600 text-white border border-slate-600'}
          `}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>
      <div className="flex-1 overflow-auto p-6 custom-markdown">
        <ReactMarkdown
          components={{
            h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-white mb-4 border-b border-slate-700 pb-2" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-xl font-semibold text-brand-300 mt-6 mb-3" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-lg font-semibold text-white mt-4 mb-2" {...props} />,
            p: ({node, ...props}) => <p className="text-slate-300 leading-relaxed mb-4" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc list-inside text-slate-300 mb-4 space-y-1" {...props} />,
            li: ({node, ...props}) => <li className="text-slate-300" {...props} />,
            code: ({node, ...props}) => (
                <code className="bg-slate-800 text-brand-200 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
            ),
            pre: ({node, ...props}) => (
              <pre className="bg-slate-950 p-4 rounded-lg overflow-x-auto border border-slate-800 mb-4 text-sm text-slate-300" {...props} />
            ),
          }}
        >
          {markdownContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default PromptDisplay;