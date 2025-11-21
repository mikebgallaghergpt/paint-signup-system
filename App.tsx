import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import HomePage from './components/HomePage';
import MultiStepSignupForm from './components/signup/MultiStepSignupForm';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'signup'>('signup');

  // Check URL to determine initial view
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/' || path === '/home') {
      setCurrentView('home');
    } else {
      setCurrentView('signup');
    }
  }, []);

  const navigateToSignup = () => {
    setCurrentView('signup');
    window.history.pushState({}, '', '/signup');
  };

  const navigateToHome = () => {
    setCurrentView('home');
    window.history.pushState({}, '', '/');
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/' || path === '/home') {
        setCurrentView('home');
      } else {
        setCurrentView('signup');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <>
      {currentView === 'home' ? (
        <div>
          {/* Navigation Bar */}
          <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-gray-900">🎨 Gallagher Art School</h1>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={navigateToSignup}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
                  >
                    Get Started →
                  </button>
                  <a 
                    href="tel:+13102345678"
                    className="text-gray-600 hover:text-gray-800 font-medium"
                  >
                    (310) 234-5678
                  </a>
                </div>
              </div>
            </div>
          </nav>

          {/* Homepage Component */}
          <HomePage />
        </div>
      ) : (
        <div>
          {/* Signup Navigation */}
          <nav className="bg-white shadow-sm border-b">
            <div className="max-w-md mx-auto px-6 py-4">
              <div className="flex justify-between items-center">
                <button
                  onClick={navigateToHome}
                  className="text-gray-600 hover:text-gray-800 font-medium"
                >
                  ← Back to Home
                </button>
                <h1 className="text-lg font-bold text-gray-900">Sign Up</h1>
                <div></div> {/* Spacer for centering */}
              </div>
            </div>
          </nav>

          {/* Signup Form */}
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8">
            <MultiStepSignupForm />
          </div>
        </div>
      )}

      <Toaster />
    </>
  );
}

export default App;