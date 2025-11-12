import React from 'react';
import { Button } from '@/components/ui/button';

interface WelcomeBackBannerProps {
  timeSince: string;
  onContinue: () => void;
  onStartOver: () => void;
}

export const WelcomeBackBanner: React.FC<WelcomeBackBannerProps> = ({ timeSince, onContinue, onStartOver }) => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-400 rounded-lg p-6 mb-6 shadow-lg animate-fadeIn">
      <div className="flex items-start gap-4">
        <div className="text-4xl">👋</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Welcome back!</h3>
          <p className="text-gray-600 mb-4">You were working on your signup {timeSince}. Ready to finish where you left off?</p>
          <div className="flex gap-3 flex-wrap">
            <Button onClick={onContinue} size="lg" className="bg-green-600 hover:bg-green-700">Continue Signup →</Button>
            <Button onClick={onStartOver} variant="outline" size="lg">Start Over</Button>
          </div>
        </div>
      </div>
    </div>
  );
};