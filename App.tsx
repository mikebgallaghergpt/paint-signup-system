// App.tsx
import { Toaster } from "@/components/ui/toaster";
import React, { useState, useEffect, Suspense } from 'react';
import { supabase } from './supabaseClient';
import type { Session } from '@supabase/supabase-js';
import { EnhancedImageCarousel } from './components/EnhancedImageCarousel';
import { SimpleSignupForm } from './components/SimpleSignupForm';
import MultiStepSignupForm from './components/signup/MultiStepSignupForm';
import { ExitIntentPopup } from './components/ExitIntentPopup';

export default function App() {
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

  // DISABLED: Don't redirect to admin dashboard for OAuth users
  // OAuth users should see the signup form with success message
  
  // MultiStepSignupForm Form rendering
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
                <MultiStepSignupForm />
              </div>
            </div>
          </div>
        </Suspense>
      )}
      <Toaster />
      <ExitIntentPopup />
    </>
  );
}