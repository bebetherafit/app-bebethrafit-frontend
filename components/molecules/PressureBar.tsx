import React from 'react';

interface PressureBarProps {
  label: string;
  value: number;
}

const PressureBar: React.FC<PressureBarProps> = ({ label, value }) => {
  const percentage = Math.min((value / 150) * 100, 100); // 최대값을 150으로 가정

  return (
    <div className="mb-6 max-w-sm mx-auto text-black h-2">
      <div className="flex items-center mb-3">
        <span className="bg-green-200 text-green-600 text-base font-medium mr-3 px-3 py-1 rounded-full">
          {label}
        </span>
        <span className="text-xl text-black font-bold">{value.toFixed(2)} kPa</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-8 mb-0">
        <div 
          className="bg-green-400 h-8 rounded-full relative"
          style={{ width: `${Math.min(Math.max(percentage, 0), 100)}%` }}
        >
          <div className="absolute -right-1.5 -top-1/3 transform rotate-90">
            <svg className="w-2 h-2 text-green-400" viewBox="0 0 10 10">
              <polygon points="10,5 0,0 0,10" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </div>
      <div className="flex justify-between text-base mt-2 text-gray-700 font-medium">
        <span>평균 이하</span>
        <span>평균</span>
        <span>평균 이상</span>
      </div>
    </div>
  );
};

export default PressureBar;