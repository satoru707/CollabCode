import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Github, Code2, Loader2 } from 'lucide-react';
import useAuthStore from '../store/authStore';
import Navbar from '../components/Navbar';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleGithubLogin = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would redirect to GitHub OAuth
      // For demo purposes, we'll simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock token
      const mockToken = 'mock-jwt-token';
      await login(mockToken);
      
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to log in with GitHub. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center">
              <Code2 className="h-16 w-16 text-blue-500" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-white">
              Sign in to CollabCode
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Collaborate with your team in real-time
            </p>
          </div>
          
          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-100 p-3 rounded-md">
              {error}
            </div>
          )}
          
          <div className="mt-8 space-y-4">
            <button
              onClick={handleGithubLogin}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
              ) : (
                <Github className="h-5 w-5 mr-2" />
              )}
              Sign in with GitHub
            </button>
            
            <div className="text-center">
              <p className="text-sm text-gray-400">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-400 hover:text-blue-300">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
          
          <div className="mt-12 border-t border-gray-800 pt-6">
            <p className="text-xs text-gray-500 text-center">
              By signing in, you agree to our{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;