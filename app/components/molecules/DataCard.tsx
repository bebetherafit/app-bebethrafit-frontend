// app/components/molecules/DataCard.tsx
import React from 'react';

interface DataCardProps {
  title: string;
  leftData: {
    label: string;
    value: string | number;
  };
  rightData: {
    label: string;
    value: string | number;
  };
}

const DataCard: React.FC<DataCardProps> = ({ title, leftData, rightData }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="flex justify-between">
        <div>
          <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm">{leftData.label}</span>
          <p className="text-2xl font-bold mt-2">{leftData.value}</p>
        </div>
        <div>
          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm">{rightData.label}</span>
          <p className="text-2xl font-bold mt-2">{rightData.value}</p>
        </div>
      </div>
    </div>
  );
};

export default DataCard;