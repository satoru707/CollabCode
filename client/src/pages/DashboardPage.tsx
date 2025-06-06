import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, FolderOpen } from 'lucide-react';
import useWorkspaceStore from '../store/workspaceStore';
import useAuthStore from '../store/authStore';
import Navbar from '../components/Navbar';
import WorkspaceCard from '../components/WorkspaceComponents/WorkspaceCard';
import CreateWorkspaceModal from '../components/WorkspaceComponents/CreateWorkspaceModal';

const DashboardPage: React.FC = () => {
  const { workspaces, fetchWorkspaces, isLoading } = useWorkspaceStore();
  const { user } = useAuthStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  
  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar />
      
      <div className="flex-1 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-400 mt-1">
                Welcome back, {user?.name || 'User'}
              </p>
            </div>
            
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md flex items-center transition-colors"
            >
              <Plus className="h-5 w-5 mr-1" />
              New Workspace
            </button>
          </div>
          
          <div className="bg-gray-850 rounded-lg border border-gray-800 p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-5">Your Workspaces</h2>
            
            {isLoading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 border-r-2 border-blue-500 border-b-2 border-gray-800 border-l-2 border-gray-800"></div>
                <p className="text-gray-400 mt-2">Loading workspaces...</p>
              </div>
            ) : workspaces.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {workspaces.map((workspace) => (
                  <WorkspaceCard key={workspace.id} workspace={workspace} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-800 rounded-lg border border-gray-700">
                <FolderOpen className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-white mb-2">No workspaces yet</h3>
                <p className="text-gray-400 mb-4">
                  Create your first workspace to start collaborating
                </p>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md inline-flex items-center transition-colors"
                >
                  <Plus className="h-5 w-5 mr-1" />
                  Create Workspace
                </button>
              </div>
            )}
          </div>
          
          <div className="bg-gray-850 rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-semibold text-white mb-5">Recent Activity</h2>
            
            {/* In a real app, this would show recent activity from the database */}
            <div className="text-center py-8 bg-gray-800 rounded-lg border border-gray-700">
              <p className="text-gray-400">
                No recent activity to display
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <CreateWorkspaceModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
};

export default DashboardPage;