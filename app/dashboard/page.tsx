'use client';
import React, { useState } from 'react';
import Sidebar from '../components/organisms/Sidebar';
import DataCard from '../components/molecules/DataCard';
import FootImage from '../components/molecules/FootImage';
import MeasurementDateSelector from '../components/molecules/MeasurementDateSelector';

const DashboardPage = () => {
  const [currentDate, setCurrentDate] = useState('2023-11-18');

  const handleDateChange = (newDate: string) => {
    setCurrentDate(newDate);
    // Here you would typically fetch new data based on the selected date
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <MeasurementDateSelector 
          currentDate={currentDate}
        //   onDateChange={handleDateChange}
        />
        
        <div className="grid grid-cols-2 gap-6">
          <DataCard 
            title="발 압력 분포 분석"
            leftData={{ label: "왼발", value: "99.99" }}
            rightData={{ label: "오른발", value: "99.99" }}
          />
          <DataCard 
            title="신체 균형 분석"
            leftData={{ label: "왼쪽", value: "-0.0222" }}
            rightData={{ label: "오른쪽", value: "0.333" }}
          />
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">발 총 압력 (Total Pressure)</h2>
          <div className="grid grid-cols-2 gap-6">
            <DataCard 
              title="왼발"
              leftData={{ label: "압력", value: "96.12 kPa" }}
              rightData={{ label: "", value: "" }}
            />
            <DataCard 
              title="오른발"
              leftData={{ label: "압력", value: "96.12 kPa" }}
              rightData={{ label: "", value: "" }}
            />
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">발 최고 압력 (Peak Pressure)</h2>
          <div className="grid grid-cols-2 gap-6">
            <FootImage 
              side="left"
              imageUrl="/left-foot.svg"
              data={[
                { label: "발 최고 압력값 (kPa)", value: "66.44" },
                { label: "발 최고 압력 위치", value: "발 안쪽" }
              ]}
            />
            <FootImage 
              side="right"
              imageUrl="/right-foot.svg"
              data={[
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