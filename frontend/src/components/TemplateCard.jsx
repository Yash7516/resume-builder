import React from 'react';
import { Check } from 'lucide-react';

const TemplateCard = ({ thumbnailImg, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 ${
        isSelected ? 'border-violet-600' : 'border-transparent hover:border-violet-300'
      }`}
    >
      {/* Thumbnail Image */}
      <img
        src={thumbnailImg}
        alt="Resume Template"
        className="w-full h-auto object-cover"
      />

      {/* Checkmark overlay when selected */}
      {isSelected && (
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center animate-fade-in">
          <div className="bg-white rounded-full p-2 shadow-lg">
            <Check className="text-violet-600" size={24} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateCard;
