'use client'
import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/organisms/AdminSidebar';
import { collection, getDocs, setDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

interface Member {
  id: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  birth: string;
}

const AdminMemberManagementPage = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [newMember, setNewMember] = useState({ username: '', email: '', password: '', isAdmin: false, birth: '' });
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        if (sessionStorage.getItem('isAdmin') !== 'true') {
          console.log('access denied to classify data');
        } else {
          console.log('access confirm to classify data');
          const querySnapshot = await getDocs(collection(db, 'users'));
          const membersData: Member[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            username: doc.data().username,
            email: doc.data().email,
            password: doc.data().password,
            isAdmin: doc.data().isAdmin,
            birth: doc.data().birth || '',
          }));
          setMembers(membersData);
        }
      } catch (error) {
        console.error("Error fetching members: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMember(prev => ({ ...prev, [name]: value }));
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMember.username && newMember.email && newMember.password) {
      setLoading(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, newMember.email, newMember.password);
        const user = userCredential.user;

        await setDoc(doc(db, 'users', user.uid), {
          username: newMember.username,
          email: newMember.email,
          password: newMember.password,
          isAdmin: newMember.isAdmin,
          birth: newMember.birth,
        });

        setMembers(prev => [...prev, { id: user.uid, ...newMember }]);
        setNewMember({ username: '', email: '', password: '', isAdmin: false, birth: '' });
      } catch (error) {
        console.error("Error adding new member: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditMember = (id: string) => {
    const member = members.find(member => member.id === id);
    if (member) {
      setEditingMember(member);
      setNewMember(member);
    }
  };

  const handleUpdateMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      setLoading(true);
      try {
        const memberRef = doc(db, 'users', editingMember.id);
        await updateDoc(memberRef, newMember);
        setMembers(prev => prev.map(member => member.id === editingMember.id ? { ...member, ...newMember } : member));
        setEditingMember(null);
        setNewMember({ username: '', email: '', password: '', isAdmin: false, birth: '' });
      } catch (error) {
        console.error("Error updating member: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteMember = async (id: string) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'users', id));
      setMembers(prev => prev.filter(member => member.id !== id));
    } catch (error) {
      console.error("Error deleting member: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDiagnostics = (memberId: string) => {
    router.push(`/admin/settings/medilist?memberId=${memberId}`);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen relative">
      {loading && (
        <div className="absolute inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div className="loader">Loading...</div>
        </div>
      )}
      <AdminSidebar />
      <main className={`flex-1 p-8 ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
        <h1 className="text-2xl font-bold mb-6 text-black">회원 관리</h1>
        
        {/* 새 회원 추가 또는 수정 폼 */}
        <form onSubmit={editingMember ? handleUpdateMember : handleAddMember} className="mb-8 bg-white p-6 rounded-lg shadow text-black">
          <h2 className="text-xl font-semibold mb-4">{editingMember ? '회원 수정' : '새 회원 추가'}</h2>
          <div className="flex gap-4">
            <input
              type="text"
              name="username"
              value={newMember.username}
              onChange={handleInputChange}
              placeholder="Username"
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
            <input
              type="email"
              name="email"
              value={newMember.email}
              onChange={handleInputChange}
              placeholder="이메일"
              className="flex-1 p-2 border rounded"
              required
            />
            <input
              type="date"
              name="birth"
              value={newMember.birth}
              onChange={handleInputChange}
              placeholder="생년월일"
              className="flex-1 p-2 border rounded"
              required
            />
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              {editingMember ? '수정' : '추가'}
            </button>
          </div>
        </form>

        {/* 회원 목록 */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">번호</th>
                <th className="py-3 px-6 text-left">이름</th>
                <th className="py-3 px-6 text-left">이메일</th>
                <th className="py-3 px-6 text-left">비밀번호</th>
                <th className="py-3 px-6 text-center">관리</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {members.map((member, index) => (
                <tr key={member.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
                  <td className="py-3 px-6 text-left">{member.username}</td>
                  <td className="py-3 px-6 text-left">{member.email}</td>
                  <td className="py-3 px-6 text-left">{member.password}</td>
                  <td className="py-3 px-6 text-center flex flex-row items-center ">
                  {/* <button className="text-blue-500 hover:underline">등록</button> */}
                <button onClick={() => handleEditMember(member.id)} className="text-blue-500 hover:underline ml-2">수정</button>
                <button onClick={() => handleDeleteMember(member.id)} className="text-red-500 hover:underline ml-2">삭제</button>
                <button onClick={() => handleOpenDiagnostics(member.id)} className="text-green-500 hover:underline ml-2">+</button>
                    {/* <button onClick={() => handleEditMember(member.id)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
                      수정
                    </button>
                    <button onClick={() => handleDeleteMember(member.id)} className="bg-red-500 text-white px-2 py-1 rounded mr-2">
                      삭제
                    </button>
                    <button onClick={() => handleOpenDiagnostics(member.id)} className="bg-green-500 text-white px-2 py-1 rounded">
                      <Plus size={16} />
                    </button> */}
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
