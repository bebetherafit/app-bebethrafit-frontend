// app/components/organisms/Sidebar.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white h-screen p-5 flex flex-col">
      <div className="mb-10">
        <Image src="/logo.svg" alt="베베테라핏" width={150} height={40} />
      </div>
      <div className="flex items-center mb-8">
        <Image src="/avatar.jpg" alt="사용자 이미지" width={40} height={40} className="rounded-full mr-3" />
        <div>
          <p className="font-bold">김서우</p>
          <p className="text-sm text-gray-500">bebetherapfit@gmail.com</p>
        </div>
      </div>
      <nav className="flex-grow">
        <Link href="/dashboard" 
              className={`flex items-center py-2 px-4 rounded-md mb-2 ${
                pathname === '/dashboard' ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:bg-gray-100'
              }`}>
          <span className="mr-2">📊</span> 분석 리포트
        </Link>
        <Link href="/analysis" 
              className={`flex items-center py-2 px-4 rounded-md ${
                pathname === '/analysis' ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:bg-gray-100'
              }`}>
          <span className="mr-2">📈</span> 시각화 분석
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;