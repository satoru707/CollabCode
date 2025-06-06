import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/authStore';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import WorkspacePage from './pages/WorkspacePage';
import EditorPage from './pages/EditorPage';

// Protected route component
const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 border-r-2 border-blue-500 border-b-2 border-gray-800 border-l-2 border-gray-800"></div>
          <p className="text-gray-400 mt-2">Loading...</p>
        </div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{element}</> : <Navigate to="/login" />;
};

function App() {
  const { fetchUser } = useAuthStore();
  
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute element={<DashboardPage />} />} 
        />
        <Route 
          path="/workspaces/:workspaceId" 
          element={<ProtectedRoute element={<WorkspacePage />} />} 
        />
        <Route 
          path="/editor/:workspaceId/:projectId" 
          element={<ProtectedRoute element={<EditorPage />} />} 
        />
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;