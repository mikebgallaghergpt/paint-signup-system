// components/signup/MultiStepSignupForm.tsx
"use client";

import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { ProgressIndicator } from "./ProgressIndicator";

export default function MultiStepSignupForm() {
  // Form state
  const [currentStep, setCurrentStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Step 1: Goals
  const [goals, setGoals] = useState<string[]>([]);

  // Step 2: Experience & Interests
  const [experienceLevel, setExperienceLevel] = useState("");
  const [artForms, setArtForms] = useState<string[]>([]);

  // Step 3: Account Info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [newsletter, setNewsletter] = useState(true);

  const steps = [
    { name: 'Goals', time: '30 sec', completed: goals.length > 0 },
    { name: 'Interests', time: '45 sec', completed: experienceLevel && artForms.length > 0 },
    { name: 'Account', time: '1 min', completed: !!(firstName && lastName && email) },
  ];

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
        experience_level: experienceLevel,
        art_forms: artForms,
        newsletter_opt_in: newsletter,
      }).select();

      if (error) throw error;

      console.log('Profile created for:', email);

      try {
        await supabase.functions.invoke('send-welcome-email', {
          body: { to: email, firstName, goals, interests: artForms }
        });
        console.log('Welcome email sent');
      } catch (emailErr) {
        console.error('Email failed:', emailErr);
      }

      toast({
        title: "🎉 Welcome!",
        description: "Your account is ready! Check your email for next steps.",
      });

      // Reset form
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
      {/* Trust Badges */}
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

      {/* Progress Indicator */}
      <ProgressIndicator currentStep={currentStep} totalSteps={3} steps={steps} />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* STEP 1: GOALS */}
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
                <label
                  key={goal.value}
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    goals.includes(goal.value)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={goals.includes(goal.value)}
                    onChange={() => handleCheckboxChange(goal.value, goals, setGoals)}
                    className="mr-3 w-5 h-5"
                  />
                  <span className="text-2xl mr-3">{goal.emoji}</span>
                  <div>
                    <div className="font-semibold text-gray-800">{goal.value}</div>
                    <div className="text-sm text-gray-600">{goal.desc}</div>
                  </div>
                </label>
              ))}
            </div>

            {/* Testimonial for Step 1 */}
            {goals.includes('Build a Portfolio') && (
              <div className="bg-white rounded-lg p-4 border-l-4 border-green-500 shadow-sm mt-4">
                <p className="text-gray-600 italic mb-2">
                  "I built a portfolio here that got me into my dream art school!"
                </p>
                <p className="text-sm font-semibold text-gray-700">— Alex T., Portfolio Student</p>
              </div>
            )}

            <Button type="button" onClick={nextStep} className="w-full" size="lg">
              Continue →
            </Button>
          </div>
        )}

        {/* STEP 2: EXPERIENCE & ART FORMS */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">What interests you?</h2>
              <p className="text-gray-600">Based on your goals, here are popular choices</p>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Experience Level</label>
              <div className="space-y-2">
                {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                  <label
                    key={level}
                    className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      experienceLevel === level
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="experience"
                      value={level}
                      checked={experienceLevel === level}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="mr-3"
                    />
                    <span className="font-medium">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Art Forms */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Art Forms (select all that interest you)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: 'Painting', emoji: '🎨', count: 12 },
                  { value: 'Drawing', emoji: '✏️', count: 8 },
                  { value: 'Sculpture', emoji: '🗿', count: 5 },
                  { value: 'Digital Art', emoji: '💻', count: 6 },
                ].map((form) => (
                  <label
                    key={form.value}
                    className={`flex flex-col items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      artForms.includes(form.value)
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={artForms.includes(form.value)}
                      onChange={() => handleCheckboxChange(form.value, artForms, setArtForms)}
                      className="mb-2"
                    />
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
          </div>
        )}

        {/* STEP 3: ACCOUNT INFO */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Almost there!</h2>
              <p className="text-gray-600">Create your account to get started</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <Input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="tel"
              placeholder="Phone (optional - for class reminders)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <label className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
                className="mt-1"
              />
              <span className="text-sm text-gray-700">
                Send me class updates, art tips, and special offers (you can unsubscribe anytime)
              </span>
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
    </div>
  );
}
EOF

echo "✅ Multi-step signup form created!"