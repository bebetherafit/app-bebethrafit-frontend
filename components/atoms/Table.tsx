import React from 'react';

interface TableProps {
  rows: number;
  columns: number;
  data?: (string | number)[][];
  headerData?: (string | number)[];
}

const Table: React.FC<TableProps> = ({ rows, columns, data, headerData }) => {
  // 빈 셀을 생성하는 함수
  const createEmptyCell = (rowIndex: number, colIndex: number) => (
    <td key={`cell-${rowIndex}-${colIndex}`} className="border px-4 py-2">
      {data && data[rowIndex] && data[rowIndex][colIndex] !== undefined
        ? data[rowIndex][colIndex]
        : ''}
    </td>
  );

  // 헤더 행을 생성하는 함수
  const createHeaderRow = () => (
    <tr>
      {Array.from({ length: columns }, (_, index) => (
        <th key={`header-${index}`} className="border px-4 py-2 bg-gray-200">
          {headerData && headerData[index] !== undefined ? headerData[index] : `Column ${index + 1}`}
        </th>
      ))}
    </tr>
  );

  // 데이터 행을 생성하는 함수
  const createDataRows = () =>
    Array.from({ length: rows }, (_, rowIndex) => (
      <tr key={`row-${rowIndex}`}>
        {Array.from({ length: columns }, (_, colIndex) => createEmptyCell(rowIndex, colIndex))}
      </tr>
    ));

  return (
    <table className="border-collapse border w-full">
      <thead>{createHeaderRow()}</thead>
      <tbody>{createDataRows()}</tbody>
    </table>
  );
};

export default Table;