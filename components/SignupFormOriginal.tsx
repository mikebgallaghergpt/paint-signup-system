// SignupFormOriginal.tsx
"use client";

import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export default function SignupFormOriginal() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const handleCheckboxChange = (value: string, setFn: React.Dispatch<React.SetStateAction<string[]>>, values: string[]) => {
    setFn(values.includes(value) ? values.filter((v) => v !== value) : [...values, value]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !firstName || !lastName || goals.length === 0 || interests.length === 0) {
      toast({
        variant: "destructive",
        title: "Missing fields",
        description: "Please fill in all fields and select at least one goal and interest.",
      });
      return;
    }

    setSubmitting(true);

    try {
      const { data, error } = await supabase.from("profiles").insert({
        first_name: firstName,
        last_name: lastName,
        email,
        goals,
        interests,
      }).select();

      if (error) throw error;

      console.log('Profile created for:', email);

      try {
        const { data: emailData, error: emailError } = await supabase.functions.invoke('send-welcome-email', {
          body: { to: email, firstName: firstName, goals: goals, interests: interests }
        });

        if (emailError) {
          console.error('Email error:', emailError);
        } else {
          console.log('Welcome email sent to:', email);
        }
      } catch (emailErr) {
        console.error('Email failed:', emailErr);
      }

      toast({
        title: "Welcome!",
        description: "Your signup was successful! Check your email!",
      });

      setFirstName("");
      setLastName("");
      setEmail("");
      setGoals([]);
      setInterests([]);
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setSubmitting(false);
    }
  };

return (
  <div className="space-y-6 p-4 max-w-lg mx-auto">
    {/* Trust Badges Section - NEW! */}
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

    {/* Student Testimonial - NEW! */}
    <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500 shadow-sm">
      <p className="text-gray-600 italic mb-2">
        "I came in nervous about my drawing skills and left with confidence and a portfolio I'm proud of. The instructors are incredible!"
      </p>
      <p className="text-sm font-semibold text-gray-700">— Sarah M., Portfolio Prep Graduate</p>
    </div>

    {/* Original Form */}
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <div>
        <p className="font-medium">Art Goals (select at least one):</p>
        {['Build a Portfolio', 'Learn to Paint', 'Prepare for Contest'].map((goal) => (
          <label key={goal} className="block">
            <input
              type="checkbox"
              checked={goals.includes(goal)}
              onChange={() => handleCheckboxChange(goal, setGoals, goals)}
            />{' '}
            {goal}
          </label>
        ))}
      </div>

      <div>
        <p className="font-medium">What brought you here? (select at least one):</p>
        {['Referral', 'Online Search', 'Social Media', 'Gift Certificate'].map((reason) => (
          <label key={reason} className="block">
            <input
              type="checkbox"
              checked={interests.includes(reason)}
              onChange={() => handleCheckboxChange(reason, setInterests, interests)}
            />{' '}
            {reason}
          </label>
        ))}
      </div>

      <Button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Sign Up"}
      </Button>
    </form>

    {/* Trust Footer - NEW! */}
    <div className="text-center text-sm text-gray-500 pt-4 border-t">
      <p>🔒 Your information is secure and will never be shared</p>
    </div>
  </div>
);
}
