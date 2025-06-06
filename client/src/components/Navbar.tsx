import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Github, Menu, X } from 'lucide-react';
import useAuthStore from '../store/authStore';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Code2 className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold">CollabCode</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link to="/workspaces" className="hover:text-blue-400 transition-colors px-3 py-2">
                Workspaces
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="hover:text-blue-400 transition-colors px-3 py-2">
                    Dashboard
                  </Link>
                  <div className="flex items-center">
                    <img 
                      src={user?.avatar || 'https://i.pravatar.cc/150?u=anonymous'} 
                      alt={user?.name || 'User'} 
                      className="h-8 w-8 rounded-full mr-2" 
                    />
                    <span className="text-sm font-medium mr-4">{user?.name}</span>
                    <button 
                      onClick={handleLogout}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-md text-sm transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-md text-sm transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-md text-sm transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/workspaces" 
              className="block px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Workspaces
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="block px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <div className="px-3 py-2 flex items-center">
                  <img 
                    src={user?.avatar || 'https://i.pravatar.cc/150?u=anonymous'} 
                    alt={user?.name || 'User'} 
                    className="h-8 w-8 rounded-full mr-2" 
                  />
                  <span className="text-sm font-medium">{user?.name}</span>
                </div>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium bg-gray-700 hover:bg-gray-600 text-white rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 text-base font-medium bg-gray-700 hover:bg-gray-600 text-white rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block px-3 py-2 text-base font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-md mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;