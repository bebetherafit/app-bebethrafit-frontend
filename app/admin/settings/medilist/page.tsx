import React from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';

interface DiagnosticInfo {
  id: string;
  date: string;
  info: string;
}

async function fetchDiagnostics(memberId: string): Promise<DiagnosticInfo[]> {
  const diagnosticsRef = collection(db, 'users', memberId, 'diagDate');
  const querySnapshot = await getDocs(diagnosticsRef);

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    date: doc.id,
    info: doc.data().info || ''
  }));
}

export default async function MediListPage({ 
  searchParams 
}: { 
  searchParams: { memberId: string } 
}) {
  const memberId = searchParams.memberId;

  if (!memberId) {
    return <div>Error: Member ID is missing</div>;
  }

  let diagnostics: DiagnosticInfo[];
  try {
    diagnostics = await fetchDiagnostics(memberId);
  } catch (error) {
    console.error("Error fetching diagnostics: ", error);
    return <div>Error: Failed to fetch diagnostics. Please try again.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-8">
      <Link href="/admin/settings" className="mb-4 text-blue-500 hover:underline">뒤로가기</Link>
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
                <Link href={`/admin/settings/inputdiagdata?memberId=${memberId}&diagnosticId=${diagnostic.id}`} className="text-blue-500 hover:underline">수정</Link>
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
}