import React, { useState } from 'react';
import { Code, UserCircle as LoaderCircle, Zap } from 'lucide-react';
import { getCodeExplanation, getDebuggingHelp, getCodeImprovements } from '../../services/aiService';
import useEditorStore from '../../store/editorStore';

interface AIAssistantProps {
  onClose: () => void;
}

type AssistantMode = 'explain' | 'debug' | 'improve';

const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  const { code, language } = useEditorStore();
  const [mode, setMode] = useState<AssistantMode>('explain');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    explanation: string;
    suggestions?: string[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleGetHelp = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      
      switch (mode) {
        case 'explain':
          response = await getCodeExplanation(code, language);
          break;
        case 'debug':
          response = await getDebuggingHelp(code, language, 'Syntax error');
          break;
        case 'improve':
          response = await getCodeImprovements(code, language);
          break;
      }
      
      setResult({
        explanation: response.explanation,
        suggestions: response.suggestions,
      });
    } catch (err) {
      setError('Failed to get AI assistance. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col h-full bg-gray-800 border-l border-gray-700 w-80">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <div className="flex items-center">
          <Zap className="text-purple-500 mr-2" size={18} />
          <h3 className="text-white font-medium">AI Assistant</h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          &times;
        </button>
      </div>
      
      <div className="p-4 border-b border-gray-700">
        <div className="flex space-x-2 mb-4">
          <button
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              mode === 'explain'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setMode('explain')}
          >
            Explain
          </button>
          <button
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              mode === 'debug'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setMode('debug')}
          >
            Debug
          </button>
          <button
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              mode === 'improve'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            onClick={() => setMode('improve')}
          >
            Improve
          </button>
        </div>
        
        <div className="text-sm text-gray-300 mb-4">
          {mode === 'explain' && "Get an explanation of what your code does"}
          {mode === 'debug' && "Get help finding and fixing bugs in your code"}
          {mode === 'improve' && "Get suggestions for improving your code quality"}
        </div>
        
        <button
          className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-md transition-colors flex items-center justify-center"
          onClick={handleGetHelp}
          disabled={loading}
        >
          {loading ? (
            <>
              <LoaderCircle className="animate-spin mr-2\" size={16} />
              Analyzing...
            </>
          ) : (
            <>
              <Code className="mr-2" size={16} />
              Analyze Code
            </>
          )}
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {error && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-100 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        {result && (
          <div className="space-y-4">
            <div>
              <h4 className="text-white font-medium mb-2">Analysis</h4>
              <div className="bg-gray-700 rounded-md p-3 text-sm text-gray-200">
                {result.explanation}
              </div>
            </div>
            
            {result.suggestions && result.suggestions.length > 0 && (
              <div>
                <h4 className="text-white font-medium mb-2">Suggestions</h4>
                <ul className="bg-gray-700 rounded-md p-3 text-sm text-gray-200 space-y-2">
                  {result.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        
        {!result && !loading && !error && (
          <div className="text-center text-gray-500 py-8">
            Click "Analyze Code" to get AI assistance
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;