// app/components/organisms/AdminSidebar.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white h-screen p-5 flex flex-col">
      <div className="mb-10">
        <Image src="/logo.svg" alt="베베테라핏" width={150} height={40} />
        <p className="text-lg font-semibold mt-2">관리자</p>
      </div>
      <nav className="flex-grow">
        <Link href="/admin/settings" className={`flex items-center py-2 px-4 rounded-md mb-2 ${
          pathname === '/admin/settings' ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:bg-gray-100'
        }`}>
          <span className="mr-2">⚙️</span> 설정
        </Link>
        <Link href="/admin/customer-info" className={`flex items-center py-2 px-4 rounded-md ${
          pathname === '/admin/customer-info' ? 'bg-gray-100 text-gray-800' : 'text-gray-600 hover:bg-gray-100'
        }`}>
          <span className="mr-2">👥</span> 고객 정보 조회
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;