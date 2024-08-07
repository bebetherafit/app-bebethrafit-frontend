'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import Sidebar from '@/components/organisms/Sidebar';
import DataCard from '@/components/molecules/DataCard';
import FootImage from '@/components/molecules/FootImage';
import MeasurementDateSelector from '@/components/molecules/MeasurementDateSelector';
import { useAuth } from '../context/AuthProvider';
import { useAuthState } from 'react-firebase-hooks/auth';

const DashboardPage = () => {
  const [currentDate, setCurrentDate] = useState('2023-11-18');
  const { user } = useAuth();  // useAuth를 통해 사용자 정보를 가져옴
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window!=='undefined') {
      const userSession = sessionStorage.getItem('user');
    }
    setLoading(false);
  },[]);
  
  const handleDateChange = (newDate: string) => {
    setCurrentDate(newDate);
    // Here you would typically fetch new data based on the selected date
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
      <MeasurementDateSelector
        currentDate={currentDate}
        // onDateChange={handleDateChange}
      />
      <div className="grid grid-cols-2 gap-6">
        <DataCard
          title="발 압력 분포 분석"
          image=""
          footPressureDistribution={[
            { side: 'left', total: 99.99, mean: 50, cell: 20 },
            { side: 'right', total: 99.99, mean: 50, cell: 20 },
          ]}
        />
        <DataCard
          title="신체 균형 분석"
          image=""
          bodyBalance={{ left: -0.0222, right: 0.333 }}
        />
      </div>

      <div className="mt-6">
        <div className="grid gap-6">
          <DataCard
            title="발 총 압력 (Total Pressure)"
            image=""
            footPressureDistribution={[
              { side: 'left', total: 96.12, mean: 0, cell: 0 },
            ]}
          />
          <DataCard
            title="발 평균압력 (Average Pressure)"
            image=""
            footPressureDistribution={[
              { side: 'left', total: 0, mean: 96.12, cell: 0 },
            ]}
          />
        </div>
      </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">발 최고 압력 (Peak Pressure)</h2>
          <div className="grid grid-cols-2 gap-6">
            <FootImage 
              title='발 최고 압력 (Peak Pressure)'
              side="left"
              imageUrl="/left-foot.svg"
              PressureData={[
                { label: "발 최고 압력값 (kPa)", value: "66.44" },
                { label: "발 최고 압력 위치", value: "발 안쪽" }
              ]}

            />
            <FootImage 
              side="right"
              imageUrl="/right-foot.svg"
              PressureData={[
                { label: "발 최고 압력값 (kPa)", value: "66.44" },
                { label: "발 최고 압력 위치", value: "발 중간" }
              ]}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
