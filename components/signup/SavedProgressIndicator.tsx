import React from 'react';

interface SavedProgressIndicatorProps {
  timeSince: string;
  itemsSaved: string[];
}

export const SavedProgressIndicator: React.FC<SavedProgressIndicatorProps> = ({ timeSince, itemsSaved }) => {
  if (itemsSaved.length === 0) return null;
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-sm">
      <div className="flex items-center gap-2 text-blue-800 font-semibold mb-2">
        <span>💾</span>
        <span>Progress Saved ({timeSince})</span>
      </div>
      <div className="space-y-1">
        {itemsSaved.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-blue-700">
            <span className="text-green-600">✓</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};