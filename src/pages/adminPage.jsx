import React, { useMemo, useEffect, useState } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import axios from 'axios';
import "../styles/admin.css";
import config from '../config.json';

const BACKEND_URL = config.macBackend;

const UserDetailsComponent = ({ user, onClose, diagnosticData }) => {
  // 여기서 diagnosticData를 사용하여 표시
  // 유저 상세 정보 및 수정 로직 구현
  // 예시로, 단순히 정보를 보여주고 닫기 버튼을 포함합니다.
  return (
    <div>
      <h3>User Details</h3>
      <p>ID: {user.id}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

const AdminPage = () => {
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [diagnosticData, setDiagnosticData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(BACKEND_URL + '/api/users', {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420'
          }
        });
        if (Array.isArray(result.data)) {
          setData(result.data);
        } else {
          console.error('Fetched data is not an array:', result.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleRowClick = async (user) => {
    setSelectedUser(user);
    try {
      const diagnosticDataResponse = await axios.get(`${BACKEND_URL}/api/diagnostic-data`, { params: { userId: user.id } });
      // 다른 데이터도 필요하다면 여기서 추가적으로 호출
      // 예: const balanceDataResponse = await axios.get(`${BACKEND_URL}/api/balance`);
      setDiagnosticData(diagnosticDataResponse.data);
      // 다른 데이터 상태도 여기서 설정
    } catch (error) {
      console.error('Error fetching additional data:', error);
    }
  };

  const handleCloseUserDetails = () => {
    setSelectedUser(null);
  };

  const columns = useMemo(() => [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Username', accessor: 'username' },
    { Header: 'Email', accessor: 'email' },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
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
      {selectedUser ? (
        <UserDetailsComponent user={selectedUser} onClose={handleCloseUserDetails} diagnosticData={diagnosticData} />

      ) : (
        <div>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} onClick={() => handleRowClick(row.original)}>
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
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
      )}
    </div>
  );
};

export default AdminPage;
