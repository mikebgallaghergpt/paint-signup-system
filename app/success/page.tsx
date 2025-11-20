'use client';

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar, Phone, Mail, Star } from 'lucide-react';

export default function SuccessPage() {
  const [userGoals, setUserGoals] = useState<string[]>([]);
  const [userName, setUserName] = useState<string>('');
  
  useEffect(() => {
    // Get user data for personalization
    const savedData = localStorage.getItem('gallagher_signup_success');
    if (savedData) {
      const data = JSON.parse(savedData);
      setUserGoals(data.goals || []);
      setUserName(data.firstName || '');
      
      // Clear the data after use
      localStorage.removeItem('gallagher_signup_success');
    }
  }, []);

  const isPortfolioFocused = userGoals.includes('portfolio');
  const isContestFocused = userGoals.includes('contest');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎨 Welcome{userName ? ` ${userName}` : ''} to Gallagher Art School!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your account is ready! Check your email for personalized recommendations based on your goals.
          </p>
        </div>

        {/* Instructor Credentials */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              📚 Learn from a Yale MFA Graduate
            </h2>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">30+</div>
                <div className="text-sm text-gray-600">Years Teaching</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-600">Students Taught</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">95%</div>
                <div className="text-sm text-gray-600">College Acceptance</div>
              </div>
            </div>
          </div>
        </div>

        {/* Personalized Recommendations */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🎯 Recommended Programs for Your Goals
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Portfolio Program */}
            {isPortfolioFocused && (
              <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50 relative">
                <div className="absolute -top-3 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Perfect Match!
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3 mt-4">
                  🎓 College Portfolio Preparation
                </h3>
                <p className="text-blue-800 mb-4">
                  Comprehensive 12-month program for serious college-bound students. 
                  Develop 15-20 portfolio pieces for top art schools.
                </p>
                <div className="text-sm text-blue-700 mb-4 space-y-1">
                  <div>📅 <strong>Duration:</strong> 12 months (30 sessions)</div>
                  <div>💰 <strong>Investment:</strong> $4,800</div>
                  <div>🎨 <strong>Includes:</strong> Portfolio review, college guidance</div>
                  <div>🏆 <strong>Success Rate:</strong> 95% acceptance to top programs</div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Schedule Portfolio Consultation →
                </Button>
              </div>
            )}

            {/* Competition Program */}
            {isContestFocused && (
              <div className="border-2 border-purple-200 rounded-lg p-6 bg-purple-50 relative">
                <div className="absolute -top-3 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Great Choice!
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-3 mt-4">
                  🏆 Competition Preparation
                </h3>
                <p className="text-purple-800 mb-4">
                  Specialized coaching for art competitions and exhibitions. 
                  Technical excellence + creative vision.
                </p>
                <div className="text-sm text-purple-700 mb-4 space-y-1">
                  <div>📅 <strong>Duration:</strong> 6 months (16 sessions)</div>
                  <div>💰 <strong>Investment:</strong> $2,400</div>
                  <div>🎨 <strong>Focus:</strong> Competition strategy, submissions</div>
                  <div>🏆 <strong>Track Record:</strong> Regional & national awards</div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Explore Competition Training →
                </Button>
              </div>
            )}

            {/* Skills Development - Always show */}
            <div className="border-2 border-green-200 rounded-lg p-6 bg-green-50">
              <h3 className="text-xl font-bold text-green-900 mb-3">
                ✨ Skills Development Program
              </h3>
              <p className="text-green-800 mb-4">
                Master classical oil painting and drawing techniques. 
                Perfect for serious hobbyists and long-term skill building.
              </p>
              <div className="text-sm text-green-700 mb-4 space-y-1">
                <div>📅 <strong>Duration:</strong> 6 months (16 sessions)</div>
                <div>💰 <strong>Investment:</strong> $2,400</div>
                <div>🎨 <strong>Focus:</strong> Classical techniques, composition</div>
                <div>📚 <strong>Includes:</strong> Materials guidance, progress tracking</div>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Start Skills Development →
              </Button>
            </div>

            {/* Elementary Program */}
            <div className="border-2 border-orange-200 rounded-lg p-6 bg-orange-50">
              <h3 className="text-xl font-bold text-orange-900 mb-3">
                🌟 Foundation Building (Ages 6-12)
              </h3>
              <p className="text-orange-800 mb-4">
                Age-appropriate art education. Many students continue for 5+ years.
              </p>
              <div className="text-sm text-orange-700 mb-4 space-y-1">
                <div>📅 <strong>Duration:</strong> Ongoing monthly packages</div>
                <div>💰 <strong>Investment:</strong> $380/month (4 sessions)</div>
                <div>🎨 <strong>Focus:</strong> Creativity, fundamentals, confidence</div>
                <div>👨‍🏫 <strong>Approach:</strong> Patient, encouraging, age-appropriate</div>
              </div>
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                Learn About Youth Programs →
              </Button>
            </div>

          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gray-50 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🚀 Your Next Steps
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">1. Check Your Email</h3>
              <p className="text-gray-600 text-sm">
                Personalized recommendations sent to your inbox.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">2. Free Consultation</h3>
              <p className="text-gray-600 text-sm">
                30-minute discussion about your goals and best program fit.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">3. Begin Journey</h3>
              <p className="text-gray-600 text-sm">
                Start developing your unique artistic voice.
              </p>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="bg-blue-50 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            ⭐ Student Success Stories
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6">
              <div className="flex mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-gray-700 mb-4">
                "Michael helped me get into RISD with a scholarship. 
                His Yale background made all the difference."
              </p>
              <div className="text-sm text-gray-500">
                — Sarah Chen, RISD Graduate
              </div>
            </div>

            <div className="bg-white rounded-lg p-6">
              <div className="flex mb-4">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-gray-700 mb-4">
                "Four years with Michael transformed my daughter 
                from beginner to confident artist."
              </p>
              <div className="text-sm text-gray-500">
                — Linda Wang, Parent
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Artistic Journey?
            </h2>
            <p className="text-gray-600 mb-6">
              Limited availability - I maintain a small roster for quality instruction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
                onClick={() => window.open('tel:+13102345678')}
              >
                <Phone className="mr-2 h-5 w-5" />
                Call: (310) 234-5678
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg"
                onClick={() => window.open('https://gallagherartschool.com', '_blank')}
              >
                Visit Website →
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
