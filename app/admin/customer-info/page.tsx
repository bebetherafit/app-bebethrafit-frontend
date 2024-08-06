'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import AdminSidebar from '@/components/organisms/AdminSidebar';

interface Customer {
  id: number;
  profileImage: string;
  username: string;
  birthdate: string;
  email: string;
  password: string;
}

const CustomerInfoPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    { id: 1, profileImage: '/profile1.jpg', username: '김서우', birthdate: '20200000', email: 'bebetherapfit@gmail.com', password: 'bebe123' },
    { id: 2, profileImage: '/default-profile.jpg', username: '김서우', birthdate: '20200000', email: 'bebetherapfit@gmail.com', password: 'bebe123' },
    { id: 3, profileImage: '/default-profile.jpg', username: '김서우', birthdate: '20200000', email: 'bebetherapfit@gmail.com', password: 'bebe123' },
    { id: 4, profileImage: '/default-profile.jpg', username: '김서우', birthdate: '20200000', email: 'bebetherapfit@gmail.com', password: 'bebe123' },
    { id: 5, profileImage: '/default-profile.jpg', username: '김서우', birthdate: '20200000', email: 'bebetherapfit@gmail.com', password: 'bebe123' },
    // ... 더 많은 고객 데이터
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 5;

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(customers.length / customersPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleEdit = (id: number) => {
    // 수정 로직 구현
    console.log('Edit customer', id);
  };

  const handleBlock = (id: number) => {
    // 차단 로직 구현
    console.log('Block customer', id);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">고객 정보 조회</h1>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">id</th>
                <th className="py-3 px-6 text-left">대표이미지</th>
                <th className="py-3 px-6 text-left">username</th>
                <th className="py-3 px-6 text-left">생년월일</th>
                <th className="py-3 px-6 text-left">가입계정</th>
                <th className="py-3 px-6 text-left">비밀번호</th>
                <th className="py-3 px-6 text-center">관리</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {currentCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{customer.id}</td>
                  <td className="py-3 px-6 text-left">
                    <Image src={customer.profileImage} alt={customer.username} width={40} height={40} className="rounded-full" />
                  </td>
                  <td className="py-3 px-6 text-left">{customer.username}</td>
                  <td className="py-3 px-6 text-left">{customer.birthdate}</td>
                  <td className="py-3 px-6 text-left">{customer.email}</td>
                  <td className="py-3 px-6 text-left">{customer.password}</td>
                  <td className="py-3 px-6 text-center">
                    <button onClick={() => handleEdit(customer.id)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">수정</button>
                    <button onClick={() => handleBlock(customer.id)} className="bg-gray-500 text-white px-2 py-1 rounded">동록</button>
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

export default CustomerInfoPage;