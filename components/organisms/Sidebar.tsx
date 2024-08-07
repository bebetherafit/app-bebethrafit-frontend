// app/components/organisms/Sidebar.tsx
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@/lib/firebase';
import { usePathname } from 'next/navigation';


const Sidebar = () => {
  const pathname = usePathname();
  const [user, loading, error] = useAuthState(auth);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  
  useEffect(() => {
    if (user) {
      setDisplayName(sessionStorage.getItem('username') || 'Anonymous');
      setEmail(sessionStorage.getItem('email')|| 'Anonymous');
      setPhotoURL(user.photoURL || '/avatar.png');
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-64 bg-white p-5 flex flex-col rounded-tr-3xl max-h-screen drop-shadow-md">
      <div className="mb-10">
        <Image src="/images/bebe-logo-eng.png" alt="베베테라핏" width={150} height={40} />
      </div>
      <div className="flex-5 items-start mb-6">
        <Image src="/images/avatar.png" alt="사용자 이미지" width={40} height={40} className="rounded-full mr-3" />
        <div>
          <p className="font-bold text-black">{displayName}</p>
          <p className="text-sm text-gray-500">{email}</p>
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