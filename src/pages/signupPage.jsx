import React from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';  // axios 임포트
// import '../styles/signup.css';

function SignupPage() {
  const handleSubmit = async (event) => {   // async 키워드 추가
    event.preventDefault();

    const email = event.target.id.value;
    const password = event.target.pw.value;

    try {
      const response = await axios.post('http://localhost:8000/signup', {  // 백엔드 엔드포인트 URL
        username: email,
        password: password
      });

      if (response.data && response.data.username) {
        // 회원 가입 성공 시 처리 (예: 로그인 페이지로 리다이렉트)
        alert('회원 가입 성공');
      } else {
        // 회원 가입 실패 시 처리 (예: 알림 메시지 표시)
        alert('회원 가입 실패');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('회원 가입 중 오류 발생');
    }
  };

  return (
    <div className="inner">
      {/* // ... 회원 가입 폼 (이메일, 비밀번호 입력란, 회원 가입 버튼 등) */}
      <div className="signup-form">
        <form onSubmit={handleSubmit}>
          <input type="text" name="id" placeholder="이메일 아이디" />
          <input type="password" name="pw" placeholder="비밀번호" />
          <input type="submit" value="회원 가입" />
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
