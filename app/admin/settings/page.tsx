// app/admin/settings/page.tsx
'use client';
import React, { useState } from 'react';
import AdminSidebar from '@/components/organisms/AdminSidebar';

interface Member {
  id: number;
  username: string;
  password: string;
}

const AdminMemberManagementPage = () => {
  const [members, setMembers] = useState<Member[]>([
    { id: 1, username: 'user1', password: '****' },
    { id: 2, username: 'user2', password: '****' },
    // 더 많은 회원 데이터...
  ]);

  const [newMember, setNewMember] = useState({ username: '', password: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMember(prev => ({ ...prev, [name]: value }));
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMember.username && newMember.password) {
      setMembers(prev => [...prev, { id: prev.length + 1, ...newMember }]);
      setNewMember({ username: '', password: '' });
    }
  };

  const handleEditMember = (id: number) => {
    // 회원 정보 수정 로직 (예: 모달 열기)
    console.log('Edit member', id);
  };

  const handleDeleteMember = (id: number) => {
    setMembers(prev => prev.filter(member => member.id !== id));
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">회원 관리</h1>
        
        {/* 새 회원 추가 폼 */}
        <form onSubmit={handleAddMember} className="mb-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">새 회원 추가</h2>
          <div className="flex gap-4">
            <input
              type="text"
              name="username"
              value={newMember.username}
              onChange={handleInputChange}
              placeholder="아이디"
              className="flex-1 p-2 border rounded"
              required
            />
            <input
              type="password"
              name="password"
              value={newMember.password}
              onChange={handleInputChange}
              placeholder="비밀번호"
              className="flex-1 p-2 border rounded"
              required
            />
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              추가
            </button>
          </div>
        </form>

        {/* 회원 목록 */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">아이디</th>
                <th className="py-3 px-6 text-left">비밀번호</th>
                <th className="py-3 px-6 text-center">관리</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {members.map((member) => (
                <tr key={member.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{member.id}</td>
                  <td className="py-3 px-6 text-left">{member.username}</td>
                  <td className="py-3 px-6 text-left">{member.password}</td>
                  <td className="py-3 px-6 text-center">
                    <button onClick={() => handleEditMember(member.id)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                      수정
                    </button>
                    <button onClick={() => handleDeleteMember(member.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminMemberManagementPage;