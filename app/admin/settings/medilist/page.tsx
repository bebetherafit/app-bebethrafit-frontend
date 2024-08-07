'use client'
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter, useSearchParams } from 'next/navigation';

interface DiagnosticInfo {
  id: string;
  date: string;
  info: string;
}

const MediListPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [memberId, setMemberId] = useState<string | null>(null);
  const [diagnostics, setDiagnostics] = useState<DiagnosticInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const memberIdParam = searchParams.get('memberId');
    if (memberIdParam) {
      setMemberId(memberIdParam);
      fetchDiagnostics(memberIdParam);
    } else {
      setIsLoading(false);
      setError('Member ID is missing');
    }
  }, [searchParams]);

  const fetchDiagnostics = async (memberId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const diagnosticsRef = collection(db, 'users', memberId, 'diagDate');
      const querySnapshot = await getDocs(diagnosticsRef);

      const diagnosticsData: DiagnosticInfo[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        date: doc.id,
        info: doc.data().info || ''
      }));
      
      setDiagnostics(diagnosticsData);
    } catch (error) {
      console.error("Error fetching diagnostics: ", error);
      setError('Failed to fetch diagnostics. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditDiagnostic = (diagnosticId: string) => {
    router.push(`/admin/settings/inputdiagdata?memberId=${memberId}&diagnosticId=${diagnosticId}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-8">
      <button className="mb-4 text-blue-500 hover:underline" onClick={() => router.back()}>뒤로가기</button>
      <h2 className="text-2xl font-bold mb-4">ID: {memberId}</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">NO</th>
            <th className="py-3 px-6 text-left">측정일</th>
            <th className="py-3 px-6 text-center">관리</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {diagnostics.map((diagnostic, index) => (
            <tr key={diagnostic.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{index + 1}</td>
              <td className="py-3 px-6 text-left">{diagnostic.date}</td>
              <td className="py-3 px-6 text-center">
                <button className="text-blue-500 hover:underline" onClick={() => handleEditDiagnostic(diagnostic.id)}>수정</button>
                <button className="text-blue-500 hover:underline ml-2">등록</button>
                <button className="text-red-500 hover:underline ml-2">삭제</button>
                <button className="text-green-500 hover:underline ml-2">+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MediListPage;