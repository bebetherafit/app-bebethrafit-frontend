// app/measurement-records/page.tsx
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import MeasurementRecordItem from '../components/molecules/MeasurementRecordItem';

const MeasurementRecordsPage = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // 이 데이터는 실제로는 API에서 가져와야 합니다
  const measurementDates = [
    '2023년 11월',
    '2023년 8월',
    '2023년 4월',
    '2022년 11월'
  ];

  const handleSelect = (date: string) => {
    setSelectedDate(date);
  };

  const handleAnalyze = () => {
    if (selectedDate) {
      // 선택된 날짜의 분석 페이지로 이동
      router.push(`/dashboard?date=${encodeURIComponent(selectedDate)}`);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="flex items-center mb-6">
        <button onClick={() => router.back()} className="mr-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-semibold">측정 기록</h1>
      </div>

      {measurementDates.map((date) => (
        <MeasurementRecordItem
          key={date}
          date={date}
          isSelected={date === selectedDate}
          onSelect={handleSelect}
        />
      ))}

      <button
        onClick={handleAnalyze}
        disabled={!selectedDate}
        className={`w-full py-3 mt-6 rounded-lg font-semibold
          ${selectedDate 
            ? 'bg-green-500 text-white hover:bg-green-600' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
      >
        분석하기
      </button>
    </div>
  );
};

export default MeasurementRecordsPage;