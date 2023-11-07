import React, { useMemo, useEffect, useState } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import axios from 'axios';
import "../styles/admin.css";
import config from '../config.json';

const BACKEND_URL = config.macBackend;
const AdminPage = () => {
  const [data, setData] = useState([]);

  // 관리자인 경우에만 사용자 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(BACKEND_URL + '/api/users',
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning' : '69420'
          }
        }
        );
        // Check if result.data is an array before setting it to state.
        if (Array.isArray(result.data)) {
          setData(result.data);
        } else {
          // Handle the case where result.data is not an array.
          console.error('Fetched data is not an array:', result.data);
        }
      } catch (error) {
        // Handle any errors in fetching data here.
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // 컬럼 정의
  const columns = useMemo(() => [
    {
      Header: 'ID',
      accessor: 'id', // 데이터의 key와 일치해야 함
    },
    {
      Header: 'Username',
      accessor: 'username',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    // 필요하다면 더 많은 컬럼 추가
  ], []);

  // react-table 인스턴스 사용
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // 대신 rows를 사용하면 페이지네이션이 없는 전체 데이터를 표시
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({ columns, data }, useSortBy, usePagination);

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* 페이지네이션 */}
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AdminPage;
