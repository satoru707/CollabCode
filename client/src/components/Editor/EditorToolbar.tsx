import React, { useState } from 'react';
import { 
  Copy, Download, Play, MessageSquare, Share2, Users, Settings, 
  BrainCircuit, Save, ChevronDown
} from 'lucide-react';
import useEditorStore from '../../store/editorStore';
import useWorkspaceStore from '../../store/workspaceStore';

interface EditorToolbarProps {
  onToggleChat: () => void;
  onToggleAI: () => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ 
  onToggleChat, 
  onToggleAI 
}) => {
  const { language, setLanguage } = useEditorStore();
  const { currentProject } = useWorkspaceStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const languages = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'typescript', name: 'TypeScript' },
    { id: 'python', name: 'Python' },
    { id: 'java', name: 'Java' },
    { id: 'csharp', name: 'C#' },
    { id: 'cpp', name: 'C++' },
    { id: 'go', name: 'Go' },
    { id: 'rust', name: 'Rust' },
    { id: 'html', name: 'HTML' },
    { id: 'css', name: 'CSS' },
  ];
  
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setDropdownOpen(false);
  };
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(useEditorStore.getState().code);
    // TODO: Show toast notification
  };
  
  const handleDownloadCode = () => {
    const { code } = useEditorStore.getState();
    const extension = language === 'javascript' ? 'js' : 
                     language === 'typescript' ? 'ts' :
                     language === 'python' ? 'py' :
                     language === 'java' ? 'java' :
                     language === 'csharp' ? 'cs' :
                     language === 'cpp' ? 'cpp' :
                     language === 'go' ? 'go' :
                     language === 'rust' ? 'rs' :
                     language === 'html' ? 'html' :
                     language === 'css' ? 'css' : 'txt';
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const handleShareSession = () => {
    const sessionUrl = window.location.href;
    navigator.clipboard.writeText(sessionUrl);
    // TODO: Show toast notification
  };
  
  return (
    <div className="bg-gray-900 border-b border-gray-800 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center">
        <div className="mr-4">
          <h3 className="text-white font-medium">
            {currentProject?.name || 'Untitled Project'}
          </h3>
        </div>
        
        <div className="relative">
          <button
            className="flex items-center bg-gray-800 hover:bg-gray-700 text-gray-300 rounded px-2 py-1 text-sm"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span>{languages.find(l => l.id === language)?.name || language}</span>
            <ChevronDown size={14} className="ml-1" />
          </button>
          
          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-40 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
              <ul className="py-1">
                {languages.map(lang => (
                  <li key={lang.id}>
                    <button
                      className={`w-full text-left px-3 py-1 text-sm ${
                        language === lang.id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                      }`}
                      onClick={() => handleLanguageChange(lang.id)}
                    >
                      {lang.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex space-x-1">
        <button 
          className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
          title="Save"
        >
          <Save size={18} />
        </button>
        <button 
          className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
          title="Copy code"
          onClick={handleCopyCode}
        >
          <Copy size={18} />
        </button>
        <button 
          className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
          title="Download code"
          onClick={handleDownloadCode}
        >
          <Download size={18} />
        </button>
        <button 
          className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
          title="Run code"
        >
          <Play size={18} />
        </button>
        
        <div className="border-l border-gray-700 mx-1"></div>
        
        <button 
          className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
          title="Chat"
          onClick={onToggleChat}
        >
          <MessageSquare size={18} />
        </button>
        <button 
          className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
          title="Share session"
          onClick={handleShareSession}
        >
          <Share2 size={18} />
        </button>
        <button 
          className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
          title="Manage collaborators"
        >
          <Users size={18} />
        </button>
        <button 
          className="p-1.5 text-gray-400 hover:text-white hover:bg-purple-700 rounded transition-colors"
          title="AI Assistant"
          onClick={onToggleAI}
        >
          <BrainCircuit size={18} className="text-purple-500 hover:text-purple-300" />
        </button>
        <button 
          className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
          title="Settings"
        >
          <Settings size={18} />
        </button>
      </div>
    </div>
  );
};

export default EditorToolbar;