import React from 'react';
import PressureBar from '../molecules/PressureBar';

interface FootPressure {
  side: 'left' | 'right';
  total: number;
  mean: number;
  cell: number;
}

interface PressureChartProps {
  data: FootPressure[];
  title: string;
  type: 'total' | 'mean';
}

const PressureChart: React.FC<PressureChartProps> = ({ data, title, type }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">{title}</h2>
      <div className="flex justify-between space-x-4">
        {data.map((item, index) => (
          <div key={index} className="flex-1">
            <PressureBar 
              label={item.side === 'left' ? '왼발' : '오른발'} 
              value={type === 'total' ? item.total : item.mean} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PressureChart;