import { create } from 'zustand';
import { CursorPosition, EditorPosition, ChatMessage } from '../types';

interface EditorState {
  code: string;
  language: string;
  cursorPositions: CursorPosition[];
  sessionId: string | null;
  projectId: string | null;
  chatMessages: ChatMessage[];
  connected: boolean;
  collaborators: { id: string; name: string; color: string }[];
  
  // Actions
  setCode: (code: string) => void;
  setLanguage: (language: string) => void;
  updateCursorPosition: (userId: string, username: string, position: EditorPosition, color: string) => void;
  removeCursorPosition: (userId: string) => void;
  setSessionId: (sessionId: string) => void;
  setProjectId: (projectId: string) => void;
  addChatMessage: (message: ChatMessage) => void;
  setConnected: (connected: boolean) => void;
  addCollaborator: (id: string, name: string, color: string) => void;
  removeCollaborator: (id: string) => void;
}

const useEditorStore = create<EditorState>((set) => ({
  code: '// Start coding here\n\nfunction helloWorld() {\n  console.log("Hello, CollabCode!");\n}\n\nhelloWorld();',
  language: 'javascript',
  cursorPositions: [],
  sessionId: null,
  projectId: null,
  chatMessages: [],
  connected: false,
  collaborators: [],
  
  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language }),
  
  updateCursorPosition: (userId, username, position, color) => 
    set((state) => {
      const existingIndex = state.cursorPositions.findIndex(c => c.userId === userId);
      const newCursorPosition = { userId, username, position, color };
      
      if (existingIndex >= 0) {
        const updatedPositions = [...state.cursorPositions];
        updatedPositions[existingIndex] = newCursorPosition;
        return { cursorPositions: updatedPositions };
      }
      
      return { cursorPositions: [...state.cursorPositions, newCursorPosition] };
    }),
    
  removeCursorPosition: (userId) => 
    set((state) => ({
      cursorPositions: state.cursorPositions.filter(c => c.userId !== userId)
    })),
    
  setSessionId: (sessionId) => set({ sessionId }),
  setProjectId: (projectId) => set({ projectId }),
  
  addChatMessage: (message) => 
    set((state) => ({
      chatMessages: [...state.chatMessages, message]
    })),
    
  setConnected: (connected) => set({ connected }),
  
  addCollaborator: (id, name, color) => 
    set((state) => ({
      collaborators: [...state.collaborators.filter(c => c.id !== id), { id, name, color }]
    })),
    
  removeCollaborator: (id) => 
    set((state) => ({
      collaborators: state.collaborators.filter(c => c.id !== id)
    })),
}));

export default useEditorStore;