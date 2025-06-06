import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, FolderOpen, ArrowLeft } from 'lucide-react';
import useWorkspaceStore from '../store/workspaceStore';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/WorkspaceComponents/ProjectCard';
import CreateProjectModal from '../components/WorkspaceComponents/CreateProjectModal';

const WorkspacePage: React.FC = () => {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { workspaces, currentWorkspace, setCurrentWorkspace, fetchWorkspaces } = useWorkspaceStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  useEffect(() => {
    if (workspaces.length === 0) {
      fetchWorkspaces();
    }
    
    if (workspaceId) {
      setCurrentWorkspace(workspaceId);
    }
  }, [workspaceId, workspaces.length, fetchWorkspaces, setCurrentWorkspace]);
  
  if (!currentWorkspace) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 border-r-2 border-blue-500 border-b-2 border-gray-800 border-l-2 border-gray-800"></div>
            <p className="text-gray-400 mt-2">Loading workspace...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar />
      
      <div className="flex-1 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <div className="flex items-center mb-2">
                <Link to="/dashboard" className="text-gray-400 hover:text-white mr-2">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-2xl font-bold text-white">{currentWorkspace.name}</h1>
              </div>
              <p className="text-gray-400">
                {currentWorkspace.description || 'No description provided'}
              </p>
            </div>
            
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md flex items-center transition-colors"
            >
              <Plus className="h-5 w-5 mr-1" />
              New Project
            </button>
          </div>
          
          <div className="bg-gray-850 rounded-lg border border-gray-800 p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-5">Projects</h2>
            
            {currentWorkspace.projects.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentWorkspace.projects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    workspaceId={currentWorkspace.id} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-800 rounded-lg border border-gray-700">
                <FolderOpen className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-white mb-2">No projects yet</h3>
                <p className="text-gray-400 mb-4">
                  Create your first project to start coding
                </p>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md inline-flex items-center transition-colors"
                >
                  <Plus className="h-5 w-5 mr-1" />
                  Create Project
                </button>
              </div>
            )}
          </div>
          
          <div className="bg-gray-850 rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-white mb-5">Team Members</h2>
            
            <div className="space-y-4">
              {currentWorkspace.members.map((member) => (
                <div 
                  key={member.userId} 
                  className="flex items-center justify-between bg-gray-800 p-4 rounded-lg border border-gray-700"
                >
                  <div className="flex items-center">
                    <img 
                      src={member.user.avatar} 
                      alt={member.user.name} 
                      className="h-10 w-10 rounded-full mr-3" 
                    />
                    <div>
                      <h3 className="text-white font-medium">{member.user.name}</h3>
                      <p className="text-gray-400 text-sm">{member.user.email}</p>
                    </div>
                  </div>
                  
                  <span className="bg-blue-500 bg-opacity-20 text-blue-400 py-1 px-3 rounded-full text-xs font-medium uppercase">
                    {member.role}
                  </span>
                </div>
              ))}
              
              <button className="w-full bg-gray-800 hover:bg-gray-750 border border-gray-700 border-dashed p-4 rounded-lg text-gray-400 flex items-center justify-center transition-colors">
                <Plus className="h-5 w-5 mr-1" />
                Invite Team Member
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <CreateProjectModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
};

export default WorkspacePage;