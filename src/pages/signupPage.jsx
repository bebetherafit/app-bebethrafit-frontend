import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // axios 임포트
import '../styles/signup.css';
import config from '../config.json';

const BACKEND_URL = config.macBackend;
function SignupPage() {
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
      event.preventDefault();

      const email = event.target.id.value;
      const name = event.target.name.value;
      const password = event.target.pw.value;

      try {
        const response = await axios.post(BACKEND_URL + '/signup', {
          email: email,  // email로 변경
          username: name,
          password: password
        });
  
        if (response.data && response.data.access_token) {  // access_token 확인
          localStorage.setItem('access_token', response.data.access_token);  // 토큰을 로컬 스토리지에 저장
          navigate('/intro');
        } else {
          alert('회원 가입 실패');
        }
      } catch (error) {
        console.error('Signup error:', error);
        alert('회원 가입 중 오류 발생');
      }
    };

  return (
    <div className="inner">
      <div className="bebemain"></div>
      {/* // ... 회원 가입 폼 (이메일, 비밀번호 입력란, 회원 가입 버튼 등) */}
      <div className='signup-page'>
      <div className="signup-form">
        <form onSubmit={handleSubmit}>
          <input type="text" name="id" placeholder="이메일 아이디" />
          <input type="text" name="name" placeholder="이름" />
          <input type="password" name="pw" placeholder="비밀번호" />
          <input type="submit" value="회원 가입" />
        </form>
      </div>
      </div>
    </div>
  );
}

export default SignupPage;
