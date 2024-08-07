// app/components/molecules/MeasurementRecordItem.tsx
import React from 'react';

interface MeasurementRecordItemProps {
  date: string;
  isSelected: boolean;
  onSelect: (date: string) => void;
}

const MeasurementRecordItem: React.FC<MeasurementRecordItemProps> = ({ date, isSelected, onSelect }) => {
  return (
    <div 
      className={`p-4 border rounded-lg mb-3 flex justify-between items-center cursor-pointer
        ${isSelected ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
      onClick={() => onSelect(date)}
    >
      <span className={`${isSelected ? 'text-green-600 font-semibold' : 'text-gray-700'}`}>
        {date} 측정 기록
      </span>
      {isSelected && (
        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
  );
};

export default MeasurementRecordItem;