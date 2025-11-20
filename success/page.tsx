import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, Mail, Star } from 'lucide-react';

export default function SuccessPage() {
  const [userGoals, setUserGoals] = useState<string[]>([]);
  const [userName, setUserName] = useState<string>('');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('gallagher_signup_success');
      if (savedData) {
        try {
          const data = JSON.parse(savedData);
          setUserGoals(data.goals || []);
          setUserName(data.firstName || '');
          localStorage.removeItem('gallagher_signup_success');
        } catch (e) {
          console.error('Error parsing saved data:', e);
        }
      }
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
            Your account is ready! Check your email for personalized recommendations.
          </p>
        </div>

        {/* Credentials */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              📚 Yale MFA Graduate • 30+ Years Experience
            </h2>
            <div className="flex justify-center items-center gap-8 flex-wrap">
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

        {/* Programs */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🎯 Recommended for Your Goals
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            
            {isPortfolioFocused && (
              <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50 relative">
                <div className="absolute -top-3 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  Perfect Match!
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3 mt-4">
                  🎓 Portfolio Preparation
                </h3>
                <p className="text-blue-800 mb-4">
                  12-month program for college-bound students. RISD, Parsons, Art Center.
                </p>
                <div className="text-sm text-blue-700 mb-4">
                  <div>💰 <strong>$4,800</strong> (30 sessions)</div>
                  <div>🏆 <strong>95% acceptance</strong> to top programs</div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Schedule Consultation →
                </Button>
              </div>
            )}

            <div className="border-2 border-green-200 rounded-lg p-6 bg-green-50">
              <h3 className="text-xl font-bold text-green-900 mb-3">
                ✨ Skills Development
              </h3>
              <p className="text-green-800 mb-4">
                Classical oil painting & drawing. Perfect for serious hobbyists.
              </p>
              <div className="text-sm text-green-700 mb-4">
                <div>💰 <strong>$2,400</strong> (16 sessions over 6 months)</div>
                <div>🎨 <strong>Focus:</strong> Classical techniques & composition</div>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Start Skills Program →
              </Button>
            </div>

          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gray-50 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🚀 What's Next?</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <Mail className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Check Email</h3>
              <p className="text-sm text-gray-600">Personalized recommendations sent</p>
            </div>
            <div>
              <Phone className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Free Consultation</h3>
              <p className="text-sm text-gray-600">30-minute program discussion</p>
            </div>
            <div>
              <Star className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold mb-2">Begin Journey</h3>
              <p className="text-sm text-gray-600">Start your artistic development</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start?
            </h2>
            <p className="text-gray-600 mb-6">
              Limited availability - small roster for quality instruction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 px-8 py-4"
                onClick={() => window.open('tel:+13102345678')}
              >
                <Phone className="mr-2 h-5 w-5" />
                Call: (310) 234-5678
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="px-8 py-4"
                onClick={() => window.open('https://gallagherartschool.com')}
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
EOF