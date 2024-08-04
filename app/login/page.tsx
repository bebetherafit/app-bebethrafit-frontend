import React from 'react';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          {/* 로고 이미지 컴포넌트는 여기에 들어갑니다 */}
          <h1 className="text-2xl font-bold text-green-500">베베테라핏</h1>
        </div>
        <form>
          <Input
            type="text"
            placeholder="아이디 (이메일)"
            className="mb-4"
          />
          <Input
            type="password"
            placeholder="비밀번호"
            className="mb-6"
          />
          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            로그인
          </Button>
        </form>
        
        <div className="text-center mt-4">
          <span className='text-sm text-black'>
            아직 회원이 아니신가요?
            </span>
          <a href="#" className="text-sm text-green-500 hover:underline">
            서비스 둘러보기
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;