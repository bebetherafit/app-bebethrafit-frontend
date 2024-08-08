import React from 'react';
import Image from 'next/image';

type TableData = Array<Array<string | number>>;

interface FootPressureOrganismProps {
  title?: string;
  imageUrl?: string;
  footDirection: string;
  tableData: TableData;
}

const FootPressureOrganism: React.FC<FootPressureOrganismProps> = ({
  title,
  imageUrl,
  footDirection,
  tableData
}) => {
  return (
    <div className="grid p-6 max-w-2xl mx-auto text-black">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 w-100">{title}</h2>
      {imageUrl && (
        <div className="w-full mb-6">
          <Image src={imageUrl} alt="Foot pressure visualization" width={300} height={300} className="w-full h-auto" />
        </div>
      )}
      <div className="w-full">
        <span className="rounded-full bg-green-200 text-green-700 mb-2 inline-block px-2 py-1 justify-center">{footDirection}</span>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td 
                      key={cellIndex}
                      className="p-2"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FootPressureOrganism;