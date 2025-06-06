import React from 'react';
import useEditorStore from '../../store/editorStore';
import useAuthStore from '../../store/authStore';

const CollaboratorList: React.FC = () => {
  const { collaborators, connected } = useEditorStore();
  const { user } = useAuthStore();
  
  return (
    <div className="bg-gray-900 border-b border-gray-800 p-2">
      <div className="flex items-center space-x-1">
        <div className="flex items-center">
          <div className={`h-2 w-2 rounded-full mr-2 ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-xs text-gray-300">{connected ? 'Connected' : 'Disconnected'}</span>
        </div>
        
        <div className="w-px h-4 bg-gray-700 mx-2"></div>
        
        <div className="flex items-center space-x-1">
          <span className="text-xs text-gray-300 mr-1">Collaborators:</span>
          
          {/* Current user */}
          <div className="flex items-center bg-gray-800 rounded-full px-2 py-0.5">
            <div 
              className="h-2 w-2 rounded-full mr-1"
              style={{ backgroundColor: '#10B981' }} 
            ></div>
            <span className="text-xs text-gray-300">You</span>
          </div>
          
          {/* Other collaborators */}
          {collaborators.map((collaborator) => (
            <div 
              key={collaborator.id}
              className="flex items-center bg-gray-800 rounded-full px-2 py-0.5"
            >
              <div 
                className="h-2 w-2 rounded-full mr-1"
                style={{ backgroundColor: collaborator.color }} 
              ></div>
              <span className="text-xs text-gray-300">{collaborator.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollaboratorList;