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
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
      <div className="flex md:flex-row justify-between items-start md:items-center mb-6">
        {imageUrl && (
          <div className="w-full bg-gray-300 md:w-1/3 mb-4 md:mb-0">
            <Image src={imageUrl} alt="Foot pressure visualization" width={300} height={300} className="w-full h-auto" />
          </div>
        )}
        <div className={`w-full ${imageUrl ? 'md:w-2/3 md:pl-4' : ''}`}>
          <span className="font-normal rounded-full bg-green-400 text-green-500">{footDirection}</span>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td 
                        key={cellIndex}
                        className={`border-white p-2 ${rowIndex === 0 || cellIndex === 0 ? 'font-semibold bg-white' : ''}`}
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
    </div>
  );
};

export default FootPressureOrganism;