// app/components/molecules/MeasurementDateSelector.tsx
import React from 'react';
import Link from 'next/link';

interface MeasurementDateSelectorProps {
  currentDate: string;
  documentIds: string[];
}

const MeasurementDateSelector: React.FC<MeasurementDateSelectorProps> = ({ currentDate, documentIds }) => {
  return (
    <div className="flex items-center justify-between text-black bg-white p-4 rounded-lg shadow-sm mb-6">
      <h2 className="text-xl font-semibold">{currentDate} 분석 리포트</h2>
      <Link 
        href={{
          pathname: '/measurement-records',
          query: { ids: documentIds.join(',') },
        }}
        className="text-green-500 px-4 py-2"
      >
        측정 기록 조회 &gt;
      </Link>
    </div>
  );
};

export default MeasurementDateSelector;
