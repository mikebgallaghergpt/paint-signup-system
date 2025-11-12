import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { ProgressIndicator } from "./ProgressIndicator";
import { autoSave } from "@/lib/utils/autoSave";
import { WelcomeBackBanner } from "./WelcomeBackBanner";
import { SavedProgressIndicator } from "./SavedProgressIndicator";

export default function MultiStepSignupForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [goals, setGoals] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState("");
  const [artForms, setArtForms] = useState<string[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [newsletter, setNewsletter] = useState(true);
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);
  const [savedTime, setSavedTime] = useState("");

  const steps = [
    { name: 'Goals', time: '30 sec', completed: goals.length > 0 },
    { name: 'Interests', time: '45 sec', completed: experienceLevel && artForms.length > 0 },
    { name: 'Account', time: '1 min', completed: !!(firstName && lastName && email) },
  ];

  // Load saved progress on mount
  useEffect(() => {
    const savedProgress = autoSave.load();
    if (savedProgress) {
      console.log('📂 Found saved progress:', savedProgress);
      setShowWelcomeBack(true);
      setSavedTime(autoSave.getTimeSince());
    }
  }, []);

  // Auto-save whenever form data changes
  useEffect(() => {
    if (!showWelcomeBack) {
      autoSave.save({
        goals,
        experienceLevel,
        artForms,
        firstName,
        lastName,
        email,
        phone,
        newsletter,
        currentStep,
      });
    }
  }, [goals, experienceLevel, artForms, firstName, lastName, email, phone, newsletter, currentStep, showWelcomeBack]);

  // Handle OAuth callback
  useEffect(() => {
    const handleOAuthCallback = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        console.log('✅ User authenticated:', session.user.email);
        const user = session.user;
        
        const storedGoals = JSON.parse(sessionStorage.getItem('signup_goals') || '[]');
        const storedArtForms = JSON.parse(sessionStorage.getItem('signup_art_forms') || '[]');

        try {
          const nameParts = user.user_metadata?.full_name?.split(' ') || [];
          const firstName = nameParts[0] || '';
          const lastName = nameParts.slice(1).join(' ') || '';

          const { error } = await supabase.from('profiles').insert({
            id: user.id,
            email: user.email,
            first_name: firstName,
            last_name: lastName,
            goals: storedGoals,
            interests: storedArtForms,
          });

          if (error && error.code !== '23505') {
            throw error;
          }

          try {
            await supabase.functions.invoke('send-welcome-email', {
              body: { to: user.email, firstName, goals: storedGoals, interests: storedArtForms }
            });
          } catch (emailErr) {
            console.error('Email failed:', emailErr);
          }

          sessionStorage.removeItem('signup_goals');
          sessionStorage.removeItem('signup_experience');
          sessionStorage.removeItem('signup_art_forms');
          autoSave.clear();

          toast({ title: "🎉 Welcome!", description: "Your account is ready! Check your email." });
          
          setCurrentStep(0);
          setGoals([]);
          setExperienceLevel('');
          setArtForms([]);
        } catch (err) {
          console.error('Profile creation error:', err);
          toast({ variant: "destructive", title: "Account created but profile failed" });
        }
      }
    };

    handleOAuthCallback();
  }, []);

  const handleCheckboxChange = (value: string, values: string[], setter: (val: string[]) => void) => {
    setter(values.includes(value) ? values.filter((v) => v !== value) : [...values, value]);
  };

  const nextStep = () => {
    if (currentStep === 0 && goals.length === 0) {
      toast({ variant: "destructive", title: "Please select at least one goal" });
      return;
    }
    if (currentStep === 1 && (!experienceLevel || artForms.length === 0)) {
      toast({ variant: "destructive", title: "Please select experience level and at least one art form" });
      return;
    }
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleGoogleSignIn = async () => {
    try {
      sessionStorage.setItem('signup_goals', JSON.stringify(goals));
      sessionStorage.setItem('signup_experience', experienceLevel);
      sessionStorage.setItem('signup_art_forms', JSON.stringify(artForms));

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) {
        toast({ variant: "destructive", title: "Google sign-in failed", description: error.message });
      }
    } catch (err) {
      console.error('Google OAuth error:', err);
      toast({ variant: "destructive", title: "Something went wrong" });
    }
  };

  const handleContinueSaved = () => {
    const savedProgress = autoSave.load();
    if (savedProgress) {
      if (savedProgress.goals) setGoals(savedProgress.goals);
      if (savedProgress.experienceLevel) setExperienceLevel(savedProgress.experienceLevel);
      if (savedProgress.artForms) setArtForms(savedProgress.artForms);
      if (savedProgress.firstName) setFirstName(savedProgress.firstName);
      if (savedProgress.lastName) setLastName(savedProgress.lastName);
      if (savedProgress.email) setEmail(savedProgress.email);
      if (savedProgress.phone) setPhone(savedProgress.phone);
      if (savedProgress.newsletter !== undefined) setNewsletter(savedProgress.newsletter);
      if (savedProgress.currentStep !== undefined) setCurrentStep(savedProgress.currentStep);
    }
    setShowWelcomeBack(false);
  };

  const handleStartOver = () => {
    autoSave.clear();
    setGoals([]);
    setExperienceLevel('');
    setArtForms([]);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setNewsletter(true);
    setCurrentStep(0);
    setShowWelcomeBack(false);
  };

  const handleContinueLater = () => {
    toast({
      title: "💾 Progress Saved!",
      description: "Come back anytime to finish your signup.",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstName || !lastName) {
      toast({ variant: "destructive", title: "Please fill in all required fields" });
      return;
    }
    setSubmitting(true);
    try {
      const { data, error } = await supabase.from("profiles").insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone: phone || null,
        goals,
        interests: artForms,
      }).select();
      if (error) throw error;
      
      try {
        await supabase.functions.invoke('send-welcome-email', {
          body: { to: email, firstName, goals, interests: artForms }
        });
      } catch (emailErr) {
        console.error('Email failed:', emailErr);
      }
      
      toast({ title: "🎉 Welcome!", description: "Your account is ready! Check your email." });
      
      autoSave.clear();
      
      setCurrentStep(0);
      setGoals([]);
      setExperienceLevel("");
      setArtForms([]);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setNewsletter(true);
    } catch (err) {
      console.error(err);
      toast({ variant: "destructive", title: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 p-4 max-w-lg mx-auto">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
        <div className="flex items-center justify-center gap-6 flex-wrap text-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏛️</span>
            <span className="font-semibold text-gray-700">Locally owned since 1998</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <span className="font-semibold text-gray-700">500+ students taught</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📰</span>
            <span className="font-semibold text-gray-700">Featured in LA Times</span>
          </div>
        </div>
      </div>

      {showWelcomeBack && (
        <WelcomeBackBanner
          timeSince={savedTime}
          onContinue={handleContinueSaved}
          onStartOver={handleStartOver}
        />
      )}

      {!showWelcomeBack && (
        <>
          <ProgressIndicator currentStep={currentStep} totalSteps={3} steps={steps} />

          <SavedProgressIndicator
            timeSince={autoSave.getTimeSince()}
            itemsSaved={[
              goals.length > 0 && `${goals.length} goal${goals.length > 1 ? 's' : ''} selected`,
              experienceLevel && 'Experience level chosen',
              artForms.length > 0 && `${artForms.length} art form${artForms.length > 1 ? 's' : ''} selected`,
              (firstName || lastName || email) && 'Account details entered',
            ].filter(Boolean) as string[]}
          />

          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 0 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">What brings you here?</h2>
                  <p className="text-gray-600">Choose all that apply—we'll personalize your experience</p>
                </div>
                <div className="space-y-3">
                  {[
                    { value: 'Build a Portfolio', emoji: '📁', desc: 'Create work for college or career' },
                    { value: 'Learn to Paint', emoji: '🎨', desc: 'Master techniques and color theory' },
                    { value: 'Prepare for Contest', emoji: '🏆', desc: 'Get competition-ready guidance' },
                    { value: 'Creative Hobby', emoji: '✨', desc: 'Explore art for personal enjoyment' },
                  ].map((goal) => (
                    <label key={goal.value} className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${goals.includes(goal.value) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input type="checkbox" checked={goals.includes(goal.value)} onChange={() => handleCheckboxChange(goal.value, goals, setGoals)} className="mr-3 w-5 h-5" />
                      <span className="text-2xl mr-3">{goal.emoji}</span>
                      <div>
                        <div className="font-semibold text-gray-800">{goal.value}</div>
                        <div className="text-sm text-gray-600">{goal.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {goals.includes('Build a Portfolio') && (
                  <div className="bg-white rounded-lg p-4 border-l-4 border-green-500 shadow-sm mt-4">
                    <p className="text-gray-600 italic mb-2">"I built a portfolio here that got me into my dream art school!"</p>
                    <p className="text-sm font-semibold text-gray-700">— Alex T., Portfolio Student</p>
                  </div>
                )}
                <Button type="button" onClick={nextStep} className="w-full" size="lg">
                  Continue →
                </Button>
                <Button type="button" onClick={handleContinueLater} variant="ghost" className="w-full text-sm text-gray-500 hover:text-gray-700">
                  💾 Save & Continue Later
                </Button>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">What interests you?</h2>
                  <p className="text-gray-600">Based on your goals, here are popular choices</p>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Experience Level</label>
                  <div className="space-y-2">
                    {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                      <label key={level} className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${experienceLevel === level ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input type="radio" name="experience" value={level} checked={experienceLevel === level} onChange={(e) => setExperienceLevel(e.target.value)} className="mr-3" />
                        <span className="font-medium">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Art Forms (select all that interest you)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'Painting', emoji: '🎨', count: 12 },
                      { value: 'Drawing', emoji: '✏️', count: 8 },
                      { value: 'Sculpture', emoji: '🗿', count: 5 },
                      { value: 'Digital Art', emoji: '💻', count: 6 },
                    ].map((form) => (
                      <label key={form.value} className={`flex flex-col items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${artForms.includes(form.value) ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input type="checkbox" checked={artForms.includes(form.value)} onChange={() => handleCheckboxChange(form.value, artForms, setArtForms)} className="mb-2" />
                        <span className="text-3xl mb-1">{form.emoji}</span>
                        <span className="font-medium text-sm">{form.value}</span>
                        <span className="text-xs text-gray-500">{form.count} active classes</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="button" onClick={prevStep} variant="outline" className="flex-1">
                    ← Back
                  </Button>
                  <Button type="button" onClick={nextStep} className="flex-1">
                    Continue →
                  </Button>
                </div>
                <Button type="button" onClick={handleContinueLater} variant="ghost" className="w-full text-sm text-gray-500 hover:text-gray-700">
                  💾 Save & Continue Later
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Almost there!</h2>
                  <p className="text-gray-600">Create your account to get started</p>
                </div>

                <Button type="button" onClick={handleGoogleSignIn} variant="outline" className="w-full flex items-center justify-center gap-3 h-12 text-base font-medium border-2 hover:bg-gray-50">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">or sign up with email</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                  <Input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
                <Input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <Input type="tel" placeholder="Phone (optional - for class reminders)" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <label className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                  <input type="checkbox" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} className="mt-1" />
                  <span className="text-sm text-gray-700">Send me class updates, art tips, and special offers (you can unsubscribe anytime)</span>
                </label>
                <div className="flex gap-2">
                  <Button type="button" onClick={prevStep} variant="outline" className="flex-1">
                    ← Back
                  </Button>
                  <Button type="submit" disabled={submitting} className="flex-1" size="lg">
                    {submitting ? "Creating..." : "Create Account 🎉"}
                  </Button>
                </div>
                <div className="text-center text-xs text-gray-500">
                  🔒 Your information is secure and will never be shared
                </div>
              </div>
            )}
          </form>
        </>
      )}
    </div>
  );
}