import React from 'react';

interface PressureBarProps {
  label: string;
  value: number;
}

const PressureBar: React.FC<PressureBarProps> = ({ label, value }) => {
  const percentage = Math.min((value / 150) * 100, 100); // 최대값을 150으로 가정

  return (
    <div className="mb-2">
      <div className="flex items-center mb-1">
        <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2 py-0.5 rounded-full">
          {label}
        </span>
        <span className="text-xl font-bold">{value.toFixed(2)} kPa</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
        <div 
          className="bg-green-400 h-1.5 rounded-full relative"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute -bottom-2 left-full transform -translate-x-1/2">
            <svg className="w-2 h-2 text-green-400" viewBox="0 0 10 10">
              <polygon points="0,10 5,0 10,10" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </div>
      {/* scale */}
      <div className="flex justify-between text-xs mt-1 text-gray-600">
        <span>평균 이하</span>
        <span>평균</span>
        <span>평균 이상</span>
      </div>
    </div>
  );
};

export default PressureBar;