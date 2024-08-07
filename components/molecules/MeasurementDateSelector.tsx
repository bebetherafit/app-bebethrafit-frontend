// app/components/molecules/MeasurementDateSelector.tsx
import React from 'react';
import { useRouter } from 'next/navigation';

interface MeasurementDateSelectorProps {
  currentDate: string;
}

const MeasurementDateSelector: React.FC<MeasurementDateSelectorProps> = ({ currentDate }) => {
  const router = useRouter();

  const handleRecordSelect = () => {
    router.push('/measurement-records');
  };

  return (
    <div className="flex items-center justify-between text-black bg-white p-4 rounded-lg shadow-sm mb-6">
      <h2 className="text-xl font-semibold">{currentDate} 분석 리포트</h2>
      <button 
        onClick={handleRecordSelect}
        className="text-green-500 px-4 py-2 "
      >
        측정 기록 조회 &gt;
      </button>
    </div>
  );
};

export default MeasurementDateSelector;