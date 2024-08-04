// app/components/molecules/FootImage.tsx
import React from 'react';
import Image from 'next/image';

interface FootImageProps {
  side: 'left' | 'right';
  imageUrl: string;
  data: {
    label: string;
    value: string | number;
  }[];
}

const FootImage: React.FC<FootImageProps> = ({ side, imageUrl, data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <Image src={imageUrl} alt={`${side} foot`} width={200} height={300} />
      <div className="mt-3">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between items-center mb-1">
            <span className="text-gray-600">{item.label}</span>
            <span className="font-semibold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FootImage;