import React from 'react';
import Image from 'next/image';
import Button from '../atoms/Button';

interface FootPressureData {
  side: '왼발' | '오른발';
  total: number;
  mean: number;
  cell: number;
}

interface BodyBalanceData {
  left: number;
  right: number;
  balance: string;
  direction: string;
  rate: number;
}

interface DataCardProps {
  title: string;
  image?: string;
  footPressureDistribution?: FootPressureData[];
  bodyBalance?: BodyBalanceData;
  indexLabels?: string[];
}

const FootPressureTable: React.FC<{ data: FootPressureData[], indexLabels: string[] }> = ({ data, indexLabels }) => {
  return (
    <table className="w-50 border-collapse border border-white mt-4">
      <thead>
        <tr>
          <th className="border border-white px-4 py-2 bg-white"></th>
          {data.map((item, index) => (
            <th key={index} className="border border-white px-4 py-2 bg-white">
              {item.side}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {indexLabels.map((label, rowIndex) => (
          <tr key={rowIndex}>
            <td className="border border-white px-4 py-2 font-medium">{label}</td>
            {data.map((item, colIndex) => (
              <td key={colIndex} className="border border-white px-4 py-2 text-center">
                {rowIndex === 0 ? item.total :
                 rowIndex === 1 ? item.mean :
                 item.cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const DataCard: React.FC<DataCardProps> = ({
  title,
  image,
  footPressureDistribution,
  bodyBalance,
  indexLabels = ['Index1', 'index2', 'indexN']  // 기본값 제공
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4 text-black">
      <div className="text-md font-semibold mb-3 text-black">{title}</div>
      <div className='grid grid-cols-2 place-items-center text-sm'>
      {image && (
        <div className="text-center mb-0">
          <Image src={image} alt={title} width={100} height={100} className="mx-auto" />
        </div>
      )}
      {footPressureDistribution && (
        <FootPressureTable data={footPressureDistribution} indexLabels={indexLabels} />
      )}
      {bodyBalance && (
        <div className="mt-4 text-gray-500">
          <h4 className="text-md font-semibold mb-2">Body Balance</h4>
          <p>Left: {bodyBalance.left}</p>
          <p>Right: {bodyBalance.right}</p>
          <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            {bodyBalance.balance} {bodyBalance.direction} {bodyBalance.rate}
          </Button>
        </div>
      )}
      </div>
    </div>
  );
};

export default DataCard;