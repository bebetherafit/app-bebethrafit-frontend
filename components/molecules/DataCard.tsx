import React from 'react';
import Image from 'next/image';
import Button from '../atoms/Button';

interface DataCardProps {
  title: string;
  image?: string;
  footPressureDistribution?: {
    side: 'left' | 'right';
    total: number;
    mean: number;
    cell: number;
  }[];
  bodyBalance?: {
    left: number;
    right: number;
    balance: string;
    direction: string;
    rate: number;
  };
}

const DataCard: React.FC<DataCardProps> = ({ title, image, footPressureDistribution, bodyBalance }) => {
  const leftFootData = footPressureDistribution?.find(data => data.side === 'left');
  const rightFootData = footPressureDistribution?.find(data => data.side === 'right');

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      {image && (
        <div className="text-center mb-4">
          <Image src={image} alt={title} width={300} height={300} className="mx-auto" />
        </div>
      )}
      <h3 className="text-lg font-semibold mb-3 text-black">{title}</h3>
      {footPressureDistribution && (
        <div className="mt-4 text-gray-500">
          <h4 className="text-md font-semibold mb-2">Foot Pressure Distribution</h4>
          <div className="flex justify-between">
            {leftFootData && (
              <div>
                <h5 className="text-sm font-semibold">Left</h5>
                <p>Total: {leftFootData.total}</p>
                <p>Mean: {leftFootData.mean}</p>
                <p>Cell: {leftFootData.cell}</p>
              </div>
            )}
            {rightFootData && (
              <div>
                <h5 className="text-sm font-semibold">Right</h5>
                <p>Total: {rightFootData.total}</p>
                <p>Mean: {rightFootData.mean}</p>
                <p>Cell: {rightFootData.cell}</p>
              </div>
            )}
          </div>
        </div>
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
  );
};

export default DataCard;
