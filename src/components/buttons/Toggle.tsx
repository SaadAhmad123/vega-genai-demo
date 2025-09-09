import React from 'react';

type ToggleSwitchProps = {
  isToggled: boolean;
  onToggle: () => void;
  label: string;
  className?: string;
};

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isToggled, onToggle, label, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 mb-2 ${className}`}>
      <span className='text-sm font-medium transition-colors duration-200 ease-in-out'>{label}</span>
      <button
        type='button'
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:scale-105 active:scale-95 ${
          isToggled ? 'bg-blue-600 shadow-md' : 'bg-gray-300 hover:bg-gray-400'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
            isToggled ? 'translate-x-6 scale-110' : 'translate-x-1 scale-100'
          }`}
        />
        <span
          className={`absolute inset-0 rounded-full transition-opacity duration-300 ease-in-out ${
            isToggled ? 'opacity-20 bg-blue-400 animate-pulse' : 'opacity-0'
          }`}
        />
      </button>
    </div>
  );
};
