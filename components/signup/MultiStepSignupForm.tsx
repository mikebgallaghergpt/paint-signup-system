import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '../../supabaseClient';
import { ArrowLeft, ArrowRight, Mail, User, CheckCircle, Phone, Star } from 'lucide-react';

// Auto-save utility
const autoSave = {
  save: (data: any) => {
    try {
      localStorage.setItem('gallagher_signup_progress', JSON.stringify({
        ...data,
        timestamp: Date.now()
      }));
      console.log('🔵 AUTO-SAVE: Saving data', data);
    } catch (err) {
      console.error('❌ AUTO-SAVE: Failed to save', err);
    }
  },
  
  load: () => {
    try {
      const saved = localStorage.getItem('gallagher_signup_progress');
      if (saved) {
        const data = JSON.parse(saved);
        console.log('✅ AUTO-SAVE: Loaded', data);
        return data;
      }
      console.log('⚠️ AUTO-SAVE: No data found');
      return null;
    } catch (err) {
      console.error('❌ AUTO-SAVE: Failed to load', err);
      return null;
    }
  },
  
  clear: () => {
    try {
      localStorage.removeItem('gallagher_signup_progress');
      sessionStorage.removeItem('signup_goals');
      sessionStorage.removeItem('signup_experience');
      sessionStorage.removeItem('signup_art_forms');
      console.log('🗑️ AUTO-SAVE: Clearing');
    } catch (err) {
      console.error('❌ AUTO-SAVE: Failed to clear', err);
    }
  }
};

// Success View Component
interface SuccessViewProps {
  userName?: string;
  userGoals?: string[];
  onStartOver: () => void;
}

function SuccessView({ userName, userGoals, onStartOver }: SuccessViewProps) {
  const isPortfolioFocused = userGoals?.includes('portfolio');
  const isContestFocused = userGoals?.includes('contest');

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 space-y-6">
      
      {/* Success Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          🎨 Welcome{userName ? ` ${userName}` : ''} to Gallagher Art School!
        </h2>
        <p className="text-lg text-gray-600">
          Your account is ready! Check your email for personalized recommendations.
        </p>
      </div>

      {/* Credentials */}
      <div className="bg-blue-50 rounded-xl p-6 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          📚 Yale MFA Graduate • 30+ Years Experience
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-2xl font-bold text-blue-600">500+</div>
            <div className="text-sm text-gray-600">Students Taught</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">95%</div>
            <div className="text-sm text-gray-600">College Acceptance</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">30+</div>
            <div className="text-sm text-gray-600">Years Teaching</div>
          </div>
        </div>
      </div>

      {/* Personalized Recommendations */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">🎯 Recommended for Your Goals</h3>
        
        {isPortfolioFocused && (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 relative">
            <div className="absolute -top-2 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
              Perfect Match!
            </div>
            <h4 className="font-bold text-blue-900 mb-2 mt-2">🎓 Portfolio Preparation Program</h4>
            <p className="text-blue-800 text-sm mb-3">
              12-month comprehensive program for college-bound students. RISD, Parsons, Art Center preparation.
            </p>
            <div className="text-xs text-blue-700 space-y-1">
              <div>💰 <strong>$4,800</strong> (30 sessions over 12 months)</div>
              <div>🏆 <strong>95% acceptance rate</strong> to top art programs</div>
            </div>
          </div>
        )}

        {isContestFocused && (
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
            <h4 className="font-bold text-purple-900 mb-2">🏆 Competition Preparation</h4>
            <p className="text-purple-800 text-sm mb-3">
              Specialized coaching for art competitions and exhibitions.
            </p>
            <div className="text-xs text-purple-700 space-y-1">
              <div>💰 <strong>$2,400</strong> (16 sessions over 6 months)</div>
              <div>🏆 <strong>Award-winning</strong> student track record</div>
            </div>
          </div>
        )}

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-bold text-green-900 mb-2">✨ Skills Development Program</h4>
          <p className="text-green-800 text-sm mb-3">
            Classical oil painting & drawing techniques. Perfect for serious hobbyists.
          </p>
          <div className="text-xs text-green-700 space-y-1">
            <div>💰 <strong>$2,400</strong> (16 sessions over 6 months)</div>
            <div>🎨 <strong>Focus:</strong> Classical techniques & composition</div>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h4 className="font-bold text-orange-900 mb-2">🌟 Foundation Building (Ages 6-12)</h4>
          <p className="text-orange-800 text-sm mb-3">
            Age-appropriate art education. Many students continue for 5+ years.
          </p>
          <div className="text-xs text-orange-700 space-y-1">
            <div>💰 <strong>$380/month</strong> (4 sessions monthly)</div>
            <div>🎨 <strong>Focus:</strong> Creativity, fundamentals, confidence</div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-bold text-gray-900 mb-3">🚀 What's Next?</h3>
        <div className="grid md:grid-cols-3 gap-4 text-center text-sm">
          <div>
            <Mail className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="font-medium">Check Email</div>
            <div className="text-gray-600">Detailed recommendations</div>
          </div>
          <div>
            <Phone className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="font-medium">Free Consultation</div>
            <div className="text-gray-600">30-minute discussion</div>
          </div>
          <div>
            <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="font-medium">Begin Journey</div>
            <div className="text-gray-600">Start creating</div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="space-y-3">
        <Button 
          size="lg" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
          onClick={() => window.open('tel:+13102345678')}
        >
          <Phone className="mr-2 h-5 w-5" />
          Call Now: (310) 234-5678
        </Button>
        
        <div className="flex gap-3">
          <Button 
            variant="outline"
            className="flex-1"
            onClick={() => window.open('https://gallagherartschool.com', '_blank')}
          >
            Visit Website →
          </Button>
          <Button 
            variant="outline"
            className="flex-1"
            onClick={onStartOver}
          >
            Help Someone Else →
          </Button>
        </div>
      </div>

    </div>
  );
}

// Main Component
export default function MultiStepSignupForm() {
  const { toast } = useToast();
  
  // Form state
  const [currentStep, setCurrentStep] = useState(0);
  const [goals, setGoals] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState('');
  const [artForms, setArtForms] = useState<string[]>([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [newsletter, setNewsletter] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showWelcomeBack, setShowWelcomeBack] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState<{userName?: string, userGoals?: string[]}>({});

  // Goal options
  const goalOptions = [
    { id: 'portfolio', label: 'Build a Portfolio', icon: '🎨' },
    { id: 'technique', label: 'Improve Technique', icon: '✏️' },
    { id: 'contest', label: 'Prepare for Contest', icon: '🏆' },
    { id: 'hobby', label: 'Creative Hobby', icon: '✨' },
  ];

  // Experience level options
  const experienceOptions = [
    { value: 'beginner', label: 'Beginner', description: 'New to art or just starting' },
    { value: 'intermediate', label: 'Intermediate', description: 'Some experience, want to improve' },
    { value: 'advanced', label: 'Advanced', description: 'Experienced, seeking mastery' },
  ];

  // Art form options
  const artFormOptions = [
    { id: 'painting', label: 'Painting', icon: '🎨' },
    { id: 'drawing', label: 'Drawing', icon: '✏️' },
    { id: 'sculpture', label: 'Sculpture', icon: '🗿' },
    { id: 'mixed-media', label: 'Mixed Media', icon: '🖼️' },
  ];

  // Handle OAuth callback
  useEffect(() => {
    const checkOAuthSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        console.log('✅ User authenticated:', session.user.email);
        const user = session.user;
        
        // Retrieve stored data from sessionStorage
        const storedGoals = JSON.parse(sessionStorage.getItem('signup_goals') || '[]');
        const storedArtForms = JSON.parse(sessionStorage.getItem('signup_art_forms') || '[]');
        const storedExperience = sessionStorage.getItem('signup_experience') || '';

        console.log('📊 Retrieved goals from sessionStorage:', storedGoals);
        console.log('📊 Retrieved art forms from sessionStorage:', storedArtForms);

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
            experience_level: storedExperience,
          });

          if (error && error.code !== '23505') {
            throw error;
          }

          // Send welcome email with retrieved data
          try {
            console.log('📧 Sending OAuth welcome email with data:', {
              to: user.email,
              firstName,
              goals: storedGoals,
              interests: storedArtForms
            });

            await supabase.functions.invoke('send-welcome-email', {
              body: { 
                to: user.email, 
                firstName, 
                goals: storedGoals,
                interests: storedArtForms
              }
            });
            
            console.log('✅ OAuth welcome email sent');
          } catch (emailErr) {
            console.error('❌ OAuth email failed:', emailErr);
          }

          // Clear storage and show success
          autoSave.clear();
          setShowWelcomeBack(false);
          await supabase.auth.signOut();
          
          setSuccessData({ userName: firstName, userGoals: storedGoals });
          setShowSuccess(true);
          
        } catch (err) {
          console.error('❌ OAuth profile creation error:', err);
          toast({ 
            variant: "destructive", 
            title: "Account created but setup incomplete",
            duration: 3000
          });
        }
      }
    };

    checkOAuthSession();
  }, []);

  // Load saved progress on mount
  useEffect(() => {
    console.log('🔍 AUTO-SAVE: Loading...');
    const savedData = autoSave.load();
    
    if (savedData) {
      // Check if data is recent (within 24 hours)
      const isRecent = (Date.now() - savedData.timestamp) < (24 * 60 * 60 * 1000);
      
      if (isRecent) {
        console.log('📂 Found saved progress:', savedData);
        setGoals(savedData.goals || []);
        setExperienceLevel(savedData.experienceLevel || '');
        setArtForms(savedData.artForms || []);
        setFirstName(savedData.firstName || '');
        setLastName(savedData.lastName || '');
        setEmail(savedData.email || '');
        setPhone(savedData.phone || '');
        setCurrentStep(savedData.currentStep || 0);
        setShowWelcomeBack(true);
      } else {
        console.log('📅 Saved data is old, clearing...');
        autoSave.clear();
      }
    }
  }, []);

  // Auto-save when form data changes
  useEffect(() => {
    if (goals.length > 0 || experienceLevel || artForms.length > 0 || firstName || lastName || email) {
      const formData = {
        currentStep,
        goals,
        experienceLevel,
        artForms,
        firstName,
        lastName,
        email,
        phone,
      };
      autoSave.save(formData);

      // Also save to sessionStorage for OAuth callback
      sessionStorage.setItem('signup_goals', JSON.stringify(goals));
      sessionStorage.setItem('signup_experience', experienceLevel);
      sessionStorage.setItem('signup_art_forms', JSON.stringify(artForms));
    }
  }, [currentStep, goals, experienceLevel, artForms, firstName, lastName, email, phone]);

  const handleGoalToggle = (goalId: string) => {
    setGoals(prev => 
      prev.includes(goalId)
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleArtFormToggle = (artFormId: string) => {
    setArtForms(prev => 
      prev.includes(artFormId)
        ? prev.filter(id => id !== artFormId)
        : [...prev, artFormId]
    );
  };

  const canProceedFromStep1 = goals.length > 0;
  const canProceedFromStep2 = experienceLevel && artForms.length > 0;

  const handleNextStep = () => {
    if (currentStep === 0 && !canProceedFromStep1) {
      toast({ variant: "destructive", title: "Please select at least one goal" });
      return;
    }
    if (currentStep === 1 && !canProceedFromStep2) {
      toast({ variant: "destructive", title: "Please select your experience level and at least one art form" });
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 2));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleGoogleSignIn = async () => {
    if (!canProceedFromStep1 || !canProceedFromStep2) {
      toast({ 
        variant: "destructive", 
        title: "Please complete steps 1 and 2 first" 
      });
      return;
    }

    try {
      // Save current form data to sessionStorage before OAuth redirect
      sessionStorage.setItem('signup_goals', JSON.stringify(goals));
      sessionStorage.setItem('signup_experience', experienceLevel);
      sessionStorage.setItem('signup_art_forms', JSON.stringify(artForms));
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'https://signup.gallagherartschool.com'
        }
      });

      if (error) throw error;
    } catch (error: any) {
      console.error('OAuth error:', error);
      toast({ 
        variant: "destructive", 
        title: "Authentication failed", 
        description: error.message 
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('📧 FORM SUBMIT: Starting with data:', {
      firstName,
      lastName,
      email,
      goals,
      artForms
    });
    
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
        experience_level: experienceLevel,
      }).select();
      
      if (error) {
        if (error.code === '23505') {
          toast({ 
            variant: "destructive", 
            title: "Email already registered", 
            description: "This email is already in use. Please use a different email.",
            duration: 3000
          });
          return;
        }
        throw error;
      }
      
      // Send welcome email
      try {
        console.log('📧 Sending welcome email with:', {
          to: email,
          firstName,
          goals,
          interests: artForms
        });

        await supabase.functions.invoke('send-welcome-email', {
          body: { 
            to: email, 
            firstName, 
            goals,
            interests: artForms
          }
        });
        
        console.log('✅ Welcome email sent');
      } catch (emailErr) {
        console.error('⚠️ Email failed (non-critical):', emailErr);
      }
      
      toast({ 
        title: "🎉 Success!", 
        description: "Redirecting to your personalized recommendations...",
        duration: 2000
      });
      
      autoSave.clear();
      
      // Reset form state
      setCurrentStep(0);
      setGoals([]);
      setExperienceLevel("");
      setArtForms([]);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setNewsletter(true);
      setShowWelcomeBack(false);

      // Show success view after brief delay
      setTimeout(() => {
        setSuccessData({ userName: firstName, userGoals: goals });
        setShowSuccess(true);
      }, 2000);
      
    } catch (err: any) {
      console.error('❌ Form submit error:', err);
      toast({ 
        variant: "destructive", 
        title: "Something went wrong", 
        description: err.message || "Please try again.",
        duration: 3000
      });
    } finally {
      setSubmitting(false);
    }
  };

  const dismissWelcomeBack = () => {
    setShowWelcomeBack(false);
  };

  const startOver = () => {
    autoSave.clear();
    setCurrentStep(0);
    setGoals([]);
    setExperienceLevel('');
    setArtForms([]);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setShowWelcomeBack(false);
  };

  // Show success view
  if (showSuccess) {
    return (
      <SuccessView 
        userName={successData.userName}
        userGoals={successData.userGoals}
        onStartOver={() => {
          setShowSuccess(false);
          setSuccessData({});
          autoSave.clear();
          setCurrentStep(0);
          setGoals([]);
          setExperienceLevel('');
          setArtForms([]);
          setFirstName('');
          setLastName('');
          setEmail('');
          setPhone('');
          setShowWelcomeBack(false);
        }}
      />
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 space-y-6">
      {/* Welcome Back Banner */}
      {showWelcomeBack && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-3">
            <span className="text-2xl">👋</span>
            <div className="flex-1">
              <h3 className="font-medium text-green-800">Welcome back!</h3>
              <p className="text-sm text-green-600 mt-1">
                You were working on your signup just now. Ready to finish where you left off?
              </p>
              <div className="mt-3 flex gap-2">
                <Button 
                  onClick={() => setShowWelcomeBack(false)}
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700"
                >
                  Continue Signup →
                </Button>
                <Button 
                  onClick={startOver}
                  variant="outline" 
                  size="sm"
                  className="border-green-300 text-green-700 hover:bg-green-50"
                >
                  Start Over
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Step {currentStep + 1} of 3
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((currentStep + 1) / 3) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${((currentStep + 1) / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Step 1: Goals */}
      {currentStep === 0 && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">What are your artistic goals?</h2>
            <p className="text-gray-600">Select all that apply to help us personalize your experience</p>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {goalOptions.map((goal) => (
              <label
                key={goal.id}
                className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  goals.includes(goal.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Checkbox
                  checked={goals.includes(goal.id)}
                  onCheckedChange={() => handleGoalToggle(goal.id)}
                  className="mr-3"
                />
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{goal.icon}</span>
                  <span className="font-medium text-gray-900">{goal.label}</span>
                </div>
              </label>
            ))}
          </div>

          <Button
            onClick={handleNextStep}
            disabled={!canProceedFromStep1}
            className="w-full"
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Step 2: Experience & Art Forms */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about yourself</h2>
            <p className="text-gray-600">Help us understand your background and interests</p>
          </div>

          {/* Experience Level */}
          <div>
            <Label className="text-sm font-medium text-gray-900 mb-3 block">
              What's your experience level?
            </Label>
            <div className="space-y-3">
              {experienceOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <input
                    type="radio"
                    id={option.value}
                    name="experienceLevel"
                    value={option.value}
                    checked={experienceLevel === option.value}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <label htmlFor={option.value} className="font-medium cursor-pointer">
                      {option.label}
                    </label>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Art Forms */}
          <div>
            <Label className="text-sm font-medium text-gray-900 mb-3 block">
              Which art forms interest you? (Select all that apply)
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {artFormOptions.map((artForm) => (
                <label
                  key={artForm.id}
                  className={`relative flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    artForms.includes(artForm.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Checkbox
                    checked={artForms.includes(artForm.id)}
                    onCheckedChange={() => handleArtFormToggle(artForm.id)}
                    className="absolute top-2 right-2"
                  />
                  <span className="text-3xl mb-2">{artForm.icon}</span>
                  <span className="font-medium text-gray-900 text-sm text-center">{artForm.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={handlePrevStep} className="flex-1">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={handleNextStep}
              disabled={!canProceedFromStep2}
              className="flex-1"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Contact Information */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Almost done!</h2>
            <p className="text-gray-600">Let's get your contact information</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="newsletter"
                checked={newsletter}
                onCheckedChange={(checked) => setNewsletter(checked as boolean)}
              />
              <Label htmlFor="newsletter" className="text-sm">
                I'd like to receive updates about classes and events
              </Label>
            </div>

            <div className="pt-4 space-y-3">
              <Button
                type="submit"
                disabled={submitting}
                className="w-full"
              >
                <Mail className="mr-2 h-4 w-4" />
                {submitting ? 'Creating Account...' : 'Complete Signup'}
              </Button>

              <div className="text-center text-gray-500">
                <span className="text-sm">or</span>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={submitting}
                className="w-full"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={handlePrevStep} className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={() => {
                  autoSave.clear();
                  window.location.reload();
                }}
                variant="ghost"
                className="flex-1 text-gray-500"
              >
                Save & Continue Later
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}