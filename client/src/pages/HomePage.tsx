import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code2, Users, Zap, Clock, Share2, BrainCircuit, ArrowRight 
} from 'lucide-react';
import Navbar from '../components/Navbar';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-16 pb-24 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Collaborative Coding in <span className="text-blue-500">Real-Time</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
              CollabCode lets you and your team code together in real-time, 
              with live cursor tracking, AI-powered assistance, and seamless collaboration.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link 
                to="/signup" 
                className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-8 rounded-md font-medium text-lg transition-colors"
              >
                Get Started Free
              </Link>
              <Link 
                to="/login" 
                className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-8 rounded-md font-medium text-lg transition-colors"
              >
                Log In
              </Link>
            </div>
          </div>
          
          {/* Preview Image */}
          <div className="relative mx-auto max-w-5xl rounded-lg overflow-hidden shadow-2xl border border-gray-800 bg-gray-800">
            <div className="bg-gray-900 px-4 py-2 flex items-center border-b border-gray-800">
              <div className="flex space-x-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-gray-400 text-sm">CollabCode Editor</div>
            </div>
            <div className="h-96 bg-gray-850 relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                <p className="text-lg">Editor Preview Image</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-850 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Why Teams Love CollabCode
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="bg-blue-500 bg-opacity-10 p-3 rounded-lg inline-block mb-4">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Real-Time Collaboration</h3>
              <p className="text-gray-400">
                Code together with your team members in real-time. See each other's cursor positions and edits instantly.
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="bg-purple-500 bg-opacity-10 p-3 rounded-lg inline-block mb-4">
                <BrainCircuit className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Assistance</h3>
              <p className="text-gray-400">
                Get intelligent suggestions, code explanations, and debugging help powered by advanced AI.
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="bg-green-500 bg-opacity-10 p-3 rounded-lg inline-block mb-4">
                <Share2 className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Easy Sharing</h3>
              <p className="text-gray-400">
                Share your workspace with anyone using a simple link. No complicated setup required.
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="bg-amber-500 bg-opacity-10 p-3 rounded-lg inline-block mb-4">
                <Clock className="h-6 w-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Session Replay</h3>
              <p className="text-gray-400">
                Playback previous coding sessions to review changes and understand the development process.
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="bg-red-500 bg-opacity-10 p-3 rounded-lg inline-block mb-4">
                <Code2 className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Powerful Editor</h3>
              <p className="text-gray-400">
                Enjoy a fully-featured code editor with syntax highlighting, auto-completion, and more.
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="bg-teal-500 bg-opacity-10 p-3 rounded-lg inline-block mb-4">
                <Zap className="h-6 w-6 text-teal-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Instant Communication</h3>
              <p className="text-gray-400">
                Chat with your team members right inside the editor to discuss code changes in context.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 md:p-12 shadow-lg text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Collaborating Today
          </h2>
          <p className="text-lg text-white text-opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already using CollabCode to build amazing projects together.
          </p>
          <Link 
            to="/signup" 
            className="inline-flex items-center bg-white text-blue-600 py-3 px-8 rounded-md font-medium text-lg hover:bg-gray-100 transition-colors"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Code2 className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-white">CollabCode</span>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                About
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Features
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Blog
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} CollabCode. All rights reserved.
            </p>
            
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;