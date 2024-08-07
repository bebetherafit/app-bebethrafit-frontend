'use client';
import React from 'react';
import Image from 'next/image';
import Sidebar from '@/components/organisms/Sidebar';

const VisualizationAnalysisPage = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen text-black">
      <Sidebar />
      <div className="flex-1 p-5">
        <div className="flex justify-between bg-white p-4">
          <h1 className="text-2xl font-bold">발 타입 시각화 (Visualization)</h1>
          <button className="text-green-500 flex items-center">
            데이터 불러오기 <span className="ml-1">↓</span>
          </button>
        </div>

        <div className="bg-white p-4 mb-8">
          <div className="bg-gray-100 h-64 flex items-center justify-center">
            {/* 실제 시각화 컴포넌트가 들어갈 자리 */}
            <p>발 타입 시각화 그래프가 이 곳에 표시됩니다.</p>
          </div>
        </div>

        <div className="bg-white p-4 mb-8">
          <h2 className="text-xl font-semibold mb-4">발 타임 초당 시각화 (Visualization per second)</h2>
          <div className="bg-gray-100 h-64 flex items-center justify-center">
            {/* 실제 시각화 컴포넌트가 들어갈 자리 */}
            <p>발 타임 초당 시각화 그래프가 이 곳에 표시됩니다.</p>
          </div>
        </div>

        <div className="bg-white p-4">
          <div className='flex'>
          <h2 className="text-xl font-semibold mb-4">발 타입 지수 (Center of Pressure Index)</h2>
          <p className="text-gray-500 text-sm mt-2"> * 발 타입 지수는 COPI 지수로 분석합니다 </p>
          </div>
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-4 rounded-lg w-1/2 mr-2">
              <p className="text-center mb-2">왼발</p>
              <p className="text-center text-3xl font-bold">0.3</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg w-1/2 ml-2">
              <p className="text-center mb-2">오른발</p>
              <p className="text-center text-3xl font-bold">0.3</p>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between">
              <p>이름</p>
              <p>김서우</p>
            </div>
            <div className="flex justify-between mt-2">
              <p>생년월일</p>
              <p>2010-07-17 만 13세</p>
            </div>
          </div>
      </div>
      </div>
    </div>
  );
};

export default VisualizationAnalysisPage;