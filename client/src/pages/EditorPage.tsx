import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useEditorStore from '../store/editorStore';
import useWorkspaceStore from '../store/workspaceStore';
import useAuthStore from '../store/authStore';
import socketService from '../services/socketService';
import MonacoEditor from '../components/Editor/MonacoEditor';
import EditorToolbar from '../components/Editor/EditorToolbar';
import ChatPanel from '../components/Editor/ChatPanel';
import CollaboratorList from '../components/Editor/CollaboratorList';
import AIAssistant from '../components/Editor/AIAssistant';

const EditorPage: React.FC = () => {
  const { workspaceId, projectId } = useParams<{ workspaceId: string; projectId: string }>();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const { setCurrentWorkspace, setCurrentProject } = useWorkspaceStore();
  const { isAuthenticated } = useAuthStore();
  
  useEffect(() => {
    if (!isAuthenticated) return;
    
    // Set current workspace and project
    if (workspaceId) {
      setCurrentWorkspace(workspaceId);
    }
    
    if (projectId) {
      setCurrentProject(projectId);
    }
    
    // Initialize socket connection
    socketService.init();
    socketService.connect();
    
    // Join the session
    if (workspaceId && projectId) {
      const sessionId = `session_${projectId}`;
      socketService.joinSession(sessionId, projectId);
    }
    
    // Cleanup on unmount
    return () => {
      socketService.leaveSession();
      socketService.disconnect();
    };
  }, [workspaceId, projectId, isAuthenticated, setCurrentWorkspace, setCurrentProject]);
  
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (isChatOpen) {
      setIsAIOpen(false);
    }
  };
  
  const toggleAI = () => {
    setIsAIOpen(!isAIOpen);
    if (isAIOpen) {
      setIsChatOpen(false);
    }
  };
  
  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      <EditorToolbar 
        onToggleChat={toggleChat}
        onToggleAI={toggleAI}
      />
      
      <CollaboratorList />
      
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 relative">
          <MonacoEditor />
        </div>
        
        {isChatOpen && (
          <ChatPanel onClose={() => setIsChatOpen(false)} />
        )}
        
        {isAIOpen && (
          <AIAssistant onClose={() => setIsAIOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default EditorPage;