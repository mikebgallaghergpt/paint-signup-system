// components/signup/ProgressIndicator.tsx
import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: Array<{ name: string; time: string; completed: boolean }>;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  currentStep, 
  totalSteps, 
  steps 
}) => {
  const progressPercentage = ((currentStep) / totalSteps) * 100;
  
  // Calculate time remaining
  const timeRemaining = steps
    .slice(currentStep)
    .reduce((acc, step) => {
      const minutes = parseInt(step.time);
      return acc + (isNaN(minutes) ? 0 : minutes);
    }, 0);

  return (
    <div className="w-full bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-semibold text-gray-700">
          Step {currentStep + 1} of {totalSteps}
        </div>
        <div className="text-sm text-gray-500 flex items-center gap-1">
          <span>⏱️</span>
          <span>~{timeRemaining} min remaining</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Step Labels */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            {/* Step Circle */}
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-2
              transition-all duration-300
              ${index < currentStep 
                ? 'bg-green-500 text-white' 
                : index === currentStep 
                  ? 'bg-blue-500 text-white ring-4 ring-blue-200' 
                  : 'bg-gray-200 text-gray-400'
              }
            `}>
              {index < currentStep ? '✓' : index + 1}
            </div>
            
            {/* Step Name */}
            <div className={`
              text-xs font-medium text-center
              ${index <= currentStep ? 'text-gray-700' : 'text-gray-400'}
            `}>
              {step.name}
            </div>
            
            {/* Time Estimate */}
            <div className="text-xs text-gray-400 mt-1">
              {step.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
