import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, Mail, Star } from 'lucide-react';

interface SuccessViewProps {
  userName?: string;
  userGoals?: string[];
  onStartOver: () => void;
}

export default function SuccessView({ userName, userGoals, onStartOver }: SuccessViewProps) {
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
