import React, { useRef, useEffect } from 'react';
import Editor, { Monaco, OnMount } from '@monaco-editor/react';
import { EditorPosition } from '../../types';
import useEditorStore from '../../store/editorStore';
import useAuthStore from '../../store/authStore';
import socketService from '../../services/socketService';
import CursorOverlay from './CursorOverlay';

interface MonacoEditorProps {
  readOnly?: boolean;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({ readOnly = false }) => {
  const { code, language, setCode, updateCursorPosition, collaborators } = useEditorStore();
  const { user } = useAuthStore();
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const throttleRef = useRef<number | null>(null);

  // Handle editor mount
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    
    // Add custom theme for better syntax highlighting
    monaco.editor.defineTheme('collabCodeDark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1e1e2e',
        'editor.foreground': '#f8f8f2',
        'editorCursor.foreground': '#f8f8f2',
        'editor.lineHighlightBackground': '#2a2a3c',
        'editorLineNumber.foreground': '#6272a4',
        'editor.selectionBackground': '#44475a',
        'editor.inactiveSelectionBackground': '#44475a80',
      },
    });
    
    monaco.editor.setTheme('collabCodeDark');
    
    // Set up cursor position tracking
    editor.onDidChangeCursorPosition((e) => {
      if (!user) return;
      
      // Throttle updates to avoid flooding the socket connection
      if (throttleRef.current) {
        window.clearTimeout(throttleRef.current);
      }
      
      throttleRef.current = window.setTimeout(() => {
        const position: EditorPosition = {
          lineNumber: e.position.lineNumber,
          column: e.position.column,
        };
        
        // Update local state with our cursor
        updateCursorPosition(
          user.id,
          user.name,
          position,
          '#10B981' // Default color for current user
        );
        
        // Send position to server
        socketService.sendCursorPosition(position);
      }, 50);
    });
  };

  // Handle code changes
  const handleCodeChange = (value: string | undefined) => {
    if (value === undefined) return;
    setCode(value);
    
    // Send changes to server
    socketService.sendCodeChanges(value);
  };

  // Setup editor options
  const editorOptions = {
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 14,
    fontFamily: 'JetBrains Mono, Menlo, Monaco, Consolas, "Courier New", monospace',
    fontLigatures: true,
    wordWrap: 'on',
    readOnly,
    automaticLayout: true,
    lineNumbers: 'on',
    glyphMargin: true,
    folding: true,
    lineDecorationsWidth: 10,
    lineNumbersMinChars: 3,
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Editor
        height="100%"
        width="100%"
        language={language}
        value={code}
        onChange={handleCodeChange}
        onMount={handleEditorDidMount}
        options={editorOptions}
        className="rounded-md overflow-hidden"
      />
      
      {/* Render cursors for other users */}
      <CursorOverlay 
        editor={editorRef.current} 
        monaco={monacoRef.current} 
      />
    </div>
  );
};

export default MonacoEditor;