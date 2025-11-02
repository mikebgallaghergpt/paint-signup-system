// App.tsx (with Logout)
import { Toaster } from "@/components/ui/toaster";
import React, { useState, useEffect, Suspense } from 'react';
import { Button } from './components/ui/button';
import { Settings, ArrowLeft, LogOut } from 'lucide-react';
import { supabase } from './supabaseClient';
import type { Session } from '@supabase/supabase-js';
import SuccessPage from './components/SuccessPage';

// Import components
import { EnhancedImageCarousel } from './components/EnhancedImageCarousel';
import { SimpleSignupForm } from './components/SimpleSignupForm';
const SignupFormOriginal = React.lazy(() => import('./components/SignupFormOriginal'));
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard').then((module) => ({ default: module.AdminDashboard })));

export default function App() {
  const [currentView, setCurrentView] = useState<'signup' | 'admin'>('signup');
  const [useSimpleForm, setUseSimpleForm] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setCurrentView('signup');
  };

  // If logged in, show admin dashboard
  if (session) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-between p-4 bg-white border-b">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 mx-auto border-red-500 text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </Button>
        </div>
        
        <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
          <AdminDashboard />
        </Suspense>

        <Toaster />
      </div>
    );
  }

  // Original Form rendering (if not logged in)
  return (
    <>
      {useSimpleForm ? (
        <SimpleSignupForm />
      ) : (
        <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} min-h-screen`}>
            {/* Left side - Carousel */}
            <div className={`${isMobile ? 'w-full h-[40vh]' : 'w-1/2'} bg-gray-100`}>
              <EnhancedImageCarousel />
            </div>

            {/* Right side - Signup Form */}
            <div className={`${isMobile ? 'w-full' : 'w-1/2'} flex items-center justify-center p-4 bg-white`}>
              <div className="w-full max-w-md">
                <SignupFormOriginal />
              </div>
            </div>
          </div>
        </Suspense>
      )}

      <Toaster />
    </>
  );
}