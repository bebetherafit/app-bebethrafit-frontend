import React from 'react';
import Image from 'next/image';
import Button from '../atoms/Button';
import Table from '../atoms/Table';

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
            <th key={index} className="border border-white px-4 py-2 rounded-full bg-green-200 text-green-700">
              {item.side}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {indexLabels.map((label, rowIndex) => (
          <tr key={rowIndex}>
            <td className="border border-white px-4 py-2 font-medium ">{label}</td>
            {data.map((item, colIndex) => (
              <td key={colIndex} className="border border-white px-4 py-2 text-center ">
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

const BalanceTable: React.FC<{ data: BodyBalanceData, indexLabels: string[] }> = ({ data, indexLabels }) => {
  return (
    <table className="w-50 border-collapse border border-white mt-4">
      <thead>
        <tr>
          {indexLabels.map((label, rowIndex) => (
            <th key={rowIndex} className="border border-white px-4 py-2 rounded-full bg-green-200 text-green-700 text-center">{label}</th>
        ))}
        </tr>
      </thead>
      <tbody>
        {indexLabels.map((label, rowIndex) => (
          <td key={rowIndex} className="border border-white px-4 py-2 text-center">
            {rowIndex === 0 ? data.left :
              data.right
            }
          </td>
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
      <div className='grid grid-cols-2 place-items-center text-sm my-auto '>
      {image && (
        <div className="text-center mb-0">
          <Image src={image} alt={title} width={200} height={200} className="mx-auto" />
        </div>
      )}
      {footPressureDistribution && (
        <FootPressureTable data={footPressureDistribution} indexLabels={indexLabels} />
      )}
      {bodyBalance && (
        <div className="mb-0">
          <BalanceTable data={bodyBalance} indexLabels={indexLabels} />
          <Button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            {bodyBalance.balance} ({bodyBalance.direction} {bodyBalance.rate}%)
          </Button>
        </div>
      )}
      </div>
    </div>
  );
};

export default DataCard;