'use client';
import React, { useState, useEffect } from 'react';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import { auth, db } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';



const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("User data:", userData);
        console.log("Redirecting to dashboard...");
        
        // 서버 사이드 리다이렉션 요청
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user.uid }),
        });
        if (response.ok) {
          console.log('redirect...',router);
          router.push('/dashboard');
        } else {
          throw new Error('Failed to authenticate');
        }
      } else {
        console.log("User document does not exist");
        setError("사용자 정보를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      if (error instanceof Error) {
        setError(`로그인에 실패했습니다: ${error.message}`);
      } else {
        setError("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-green-500">베베테라핏</h1>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">아이디 (이메일)</label>
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호</label>
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
            onClick={handleLogin}
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