// app/measurement-records/page.tsx
'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import MeasurementRecordItem from '@/components/molecules/MeasurementRecordItem';

const MeasurementRecordsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const documentIds = searchParams.get('ids')?.split(',') || [];
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // 최신 날짜 순으로 정렬
  const sortedDocumentIds = documentIds.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  const handleSelect = (date: string) => {
    setSelectedDate(date);
  };

  const handleAnalyze = () => {
    if (selectedDate) {
      router.push(`/dashboard?date=${encodeURIComponent(selectedDate)}`);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-white">
      <div className="p-6 max-w-md w-full bg-white">
        <div className="flex items-center mb-6">
          <button onClick={() => router.back()} className="mr-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">측정 기록</h1>
        </div>

        {sortedDocumentIds.map((date) => (
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
    </div>
  );
};

export default MeasurementRecordsPage;
