import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Code, FolderOpen, Users } from 'lucide-react';
import { Workspace } from '../../types';

interface WorkspaceCardProps {
  workspace: Workspace;
}

const WorkspaceCard: React.FC<WorkspaceCardProps> = ({ workspace }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/workspaces/${workspace.id}`);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  return (
    <div 
      className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:bg-gray-750 transition-colors cursor-pointer border border-gray-700"
      onClick={handleClick}
    >
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-white text-lg font-medium">{workspace.name}</h3>
          <div className="flex items-center text-gray-400 text-sm">
            <Users size={14} className="mr-1" />
            <span>{workspace.members.length}</span>
          </div>
        </div>
        
        <p className="text-gray-400 mt-2 text-sm">
          {workspace.description || 'No description provided'}
        </p>
        
        <div className="mt-4 flex items-center text-gray-400 text-sm">
          <FolderOpen size={14} className="mr-1" />
          <span>{workspace.projects.length} Project{workspace.projects.length !== 1 ? 's' : ''}</span>
        </div>
      </div>
      
      <div className="px-5 py-3 bg-gray-900 border-t border-gray-700 flex justify-between items-center">
        <div className="flex items-center text-gray-400 text-xs">
          <Clock size={12} className="mr-1" />
          <span>Updated {formatDate(workspace.updatedAt)}</span>
        </div>
        
        <div className="flex -space-x-2">
          {workspace.members.slice(0, 3).map((member) => (
            <img
              key={member.userId}
              src={member.user.avatar}
              alt={member.user.name}
              className="h-6 w-6 rounded-full border border-gray-800"
              title={member.user.name}
            />
          ))}
          
          {workspace.members.length > 3 && (
            <div className="h-6 w-6 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white border border-gray-800">
              +{workspace.members.length - 3}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceCard;