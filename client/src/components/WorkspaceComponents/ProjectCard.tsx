import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Code, FileCode } from 'lucide-react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  workspaceId: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, workspaceId }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/editor/${workspaceId}/${project.id}`);
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
  
  // Get language icon and color
  const getLanguageIcon = (language: string) => {
    const languageColors: Record<string, string> = {
      javascript: '#F7DF1E',
      typescript: '#3178C6',
      python: '#3776AB',
      java: '#007396',
      csharp: '#512BD4',
      cpp: '#00599C',
      go: '#00ADD8',
      rust: '#DEA584',
      html: '#E34F26',
      css: '#1572B6',
    };
    
    return (
      <div 
        className="p-2 rounded" 
        style={{ backgroundColor: `${languageColors[language] || '#3B82F6'}22` }}
      >
        <FileCode 
          size={24} 
          style={{ color: languageColors[language] || '#3B82F6' }} 
        />
      </div>
    );
  };
  
  return (
    <div 
      className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:bg-gray-750 transition-colors cursor-pointer border border-gray-700"
      onClick={handleClick}
    >
      <div className="p-5">
        <div className="flex items-start space-x-4">
          {getLanguageIcon(project.language)}
          
          <div className="flex-1">
            <h3 className="text-white text-lg font-medium">{project.name}</h3>
            <p className="text-gray-400 mt-1 text-sm">
              {project.description || 'No description provided'}
            </p>
            
            <div className="mt-3 flex items-center text-gray-400 text-xs">
              <Code size={12} className="mr-1" />
              <span className="capitalize">{project.language}</span>
              <span className="mx-2">•</span>
              <Clock size={12} className="mr-1" />
              <span>Updated {formatDate(project.updatedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;