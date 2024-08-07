'use client';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import { auth } from '@/lib/firebase'; // 초기화된 auth를 가져옴
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../context/AuthProvider';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth(); // useAuth를 통해 사용자 정보를 가져옴
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (!res.user) {
        throw new Error('Failed to authenticate');
      }
      else {
        const docRef = doc(db, 'users', res.user.uid); // 로그인 후 user.uid를 사용하여 docRef를 설정
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          if (docSnap.data()?.isAdmin === true) {
            console.log("access confirm to admin page");
            sessionStorage.setItem('uid', res.user.uid);
            sessionStorage.setItem('isAdmin', 'true');
            router.push('/admin/settings'); // isAdmin이 true인 경우 admin/settings page로 이동
          } else {
            console.log("access to dashboard page");
            router.push('/dashboard'); // isAdmin이 false인 경우 dashboard로 이동
          }
        } 
      }
    } catch (error) {
      console.error('Error logging in:', error);
      if (error instanceof Error) {
        setError(`로그인에 실패했습니다: ${error.message}`);
      } else {
        setError('로그인에 실패 했습니다. 이메일과 비밀번호를 확인해주세요.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
      <div className="flex justify-center mb-8">
      <Image src="/images/logo-kor.png" alt="logo" width={200} height={200} />
    </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            {/* <label htmlFor="email" className="block text-sm font-medium text-gray-700">아이디 (이메일)</label> */}
            <Input
              id="email"
              type="email"
              placeholder="아이디 (이메일)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
              required
            />
          </div>
          <div className="mb-6">
            {/* <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호</label> */}
            <Input
              id="password"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? '로그인 중...' : '로그인'}
          </Button>
        </form>
        
        <div className="text-center mt-4">
          <span className='text-sm text-black'>
            아직 회원이 아니신가요?
          </span>
          {' '}
          <Link href="/signup" className="text-sm text-green-500 hover:underline">
            서비스 둘러보기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
