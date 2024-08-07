'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import Sidebar from '@/components/organisms/Sidebar';
import DataCard from '@/components/molecules/DataCard';
import FootImage from '@/components/molecules/FootImage';
import PressureChart from '@/components/organisms/PressureChart';
import MeasurementDateSelector from '@/components/molecules/MeasurementDateSelector';
import { useAuth } from '../context/AuthProvider';
import { useAuthState } from 'react-firebase-hooks/auth';

interface FootPressure {
  side: 'left' | 'right';
  total: number;
  mean: number;
  cell: number;
}

interface FootData {
  side: 'left' | 'right';
  peakPressure: number;
  peakPressurePosition: string;
  cellCount: number;
  area: number;
}

interface FootAnalysisProps {
  data: FootData[];
}

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
  const footPressureData: FootPressure[] = [
    { side: 'left', total: 96.12, mean: 96.12, cell: 0 },
    { side: 'right', total: 96.12, mean: 96.12, cell: 0 },
  ];
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

        <div className="mt-7 bg-white rounded-md">
          <div className="space-y-8">
            <PressureChart 
              title="발 총 압력 (Total Pressure)" 
              data={footPressureData} 
              type="total"
            />
            <PressureChart 
              title="발 평균 압력 (Average Pressure)" 
              data={footPressureData} 
              type="mean"
            />
          </div>
      </div>

      {/* <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">발 최고 압력 (Peak Pressure)</h2>
        <div className="grid grid-cols-2 gap-4">
          {data.map((foot, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg">
              <div className="text-center mb-2">{foot.side === 'left' ? '왼발' : '오른발'}</div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>발 최고 압력값 (kPa)</span>
                  <span className="font-bold">{foot.peakPressure.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>발 최고 압력 위치</span>
                  <span className="font-bold">{foot.peakPressurePosition}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* <div>
        <h2 className="text-xl font-semibold mb-4">발 면적 분석 (Area Analysis)</h2>
        <div className="grid grid-cols-2 gap-4">
          {data.map((foot, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg">
              <div className="text-center mb-2">{foot.side === 'left' ? '왼발' : '오른발'}</div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>발 면적 수 (N/10 cell)</span>
                  <span className="font-bold">{foot.cellCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>발 면적 (cm2)</span>
                  <span className="font-bold">{foot.area.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-green-400 h-2.5 rounded-full" 
                    style={{ width: `${(foot.area / 20) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>평균 이하</span>
                  <span>평균</span>
                  <span>평균 이상</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div> */}



        {/* <div className="mt-6">
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
        </div> */}
      </main>
    </div>
  );
};

export default DashboardPage;
