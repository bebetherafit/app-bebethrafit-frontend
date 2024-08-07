'use client';
import React, { useState } from 'react';
import AdminSidebar from '../components/organisms/AdminSidebar';

interface User {
  id: number;
  username: string;
  birthdate: string;
  email: string;
  password: string;
}

const AdminPage = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, username: '김서우', birthdate: '19930328', email: 'abcdef@gmail.com', password: '1234' },
    { id: 2, username: '김서우', birthdate: '19930328', email: 'abcdef@gmail.com', password: '1234' },
    { id: 3, username: '김서우', birthdate: '19930328', email: 'abcdef@g', password: '' },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  const handleEdit = (id: number) => {
    // 수정 로직 구현
    console.log('Edit user', id);
  };

  const handleDelete = (id: number) => {
    // 삭제 로직 구현
    console.log('Delete user', id);
  };

  const handleAdd = () => {
    // 사용자 추가 로직 구현
    console.log('Add new user');
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">설정</h1>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">id</th>
                <th className="py-3 px-6 text-left">username</th>
                <th className="py-3 px-6 text-left">생년월일</th>
                <th className="py-3 px-6 text-left">가입계정</th>
                <th className="py-3 px-6 text-left">비밀번호</th>
                <th className="py-3 px-6 text-center">관리</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {currentUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{user.id}</td>
                  <td className="py-3 px-6 text-left">{user.username}</td>
                  <td className="py-3 px-6 text-left">{user.birthdate}</td>
                  <td className="py-3 px-6 text-left">{user.email}</td>
                  <td className="py-3 px-6 text-left">{user.password}</td>
                  <td className="py-3 px-6 text-center">
                    <button onClick={() => handleEdit(user.id)} className="text-blue-500 mr-2">수정</button>
                    <button onClick={() => handleDelete(user.id)} className="text-red-500 mr-2">삭제</button>
                    <button onClick={handleAdd} className="text-green-500">+</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`mx-1 px-3 py-1 rounded ${currentPage === number ? 'bg-green-500 text-white' : 'bg-white'}`}
            >
              {number}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;