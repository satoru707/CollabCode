import React, { useState, useRef, useEffect } from 'react';
import { Send, X } from 'lucide-react';
import useEditorStore from '../../store/editorStore';
import useAuthStore from '../../store/authStore';
import socketService from '../../services/socketService';

interface ChatPanelProps {
  onClose: () => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ onClose }) => {
  const { chatMessages, collaborators } = useEditorStore();
  const { user } = useAuthStore();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user) return;
    
    socketService.sendChatMessage(message);
    setMessage('');
  };
  
  const getMessageTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const getUserColor = (userId: string) => {
    const collaborator = collaborators.find(c => c.id === userId);
    return collaborator?.color || '#3B82F6';
  };

  return (
    <div className="flex flex-col h-full bg-gray-800 border-l border-gray-700 w-72">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <h3 className="text-white font-medium">Team Chat</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {chatMessages.length === 0 ? (
          <div className="text-gray-500 text-center py-4">
            No messages yet. Start the conversation!
          </div>
        ) : (
          chatMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.userId === user?.id ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-xs rounded-lg px-3 py-2 ${
                  msg.userId === user?.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-white'
                }`}
                style={{
                  backgroundColor: msg.userId !== user?.id ? getUserColor(msg.userId) + '33' : undefined,
                  borderLeft: msg.userId !== user?.id ? `3px solid ${getUserColor(msg.userId)}` : undefined
                }}
              >
                {msg.userId !== user?.id && (
                  <div className="text-xs font-medium mb-1\" style={{ color: getUserColor(msg.userId) }}>
                    {msg.username}
                  </div>
                )}
                <p className="text-sm">{msg.content}</p>
                <div className="text-xs text-gray-300 mt-1 text-right">
                  {getMessageTime(msg.timestamp)}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-700">
        <div className="flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-700 text-white rounded-l-md py-2 px-3 focus:outline-none text-sm"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white rounded-r-md p-2 transition-colors"
            disabled={!message.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatPanel;