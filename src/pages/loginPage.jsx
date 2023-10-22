import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import axios from 'axios';

function LoginPage() {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.id.value;
    const password = event.target.pw.value;
    try {
      const response = await axios.post('http://localhost:8000/login', {
        username: email,
        password: password
      });
      // JWT 토큰 저장
      if (response.data && response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
        navigate('/dashboard');
      }
      else {
        alert('로그인 정보가 올바르지 않습니다.');
      }
    }
    catch (error) {
      console.error('Login error:', error);
      alert('로그인 중 오류 발생');
    }
  }

  return (
    <div className="inner">
      <div className="bebemain"></div>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <input type="text" name="id" placeholder="이메일 아이디" className="idpw" />
          <input type="password" name="pw" placeholder="비밀번호" className="idpw" />
          <div className="submits">
            <input type="submit" value="로그인" className="submit" />
            <button type="button" className="submit kakao">
              카카오로 1초 로그인 / 회원가입
            </button>
            <button type="button" className="submit naver">
              네이버로 1초 로그인 / 회원가입
            </button>
          </div>
          <div className="signup">
            <div className="container">
              <a href="/signup" onClick={(event) => alert('회원가입')}>
                회원가입
              </a>
            </div>
            |
            <div className="container">
              <a href="/findpassword" onClick={(event) => alert('비밀번호 찾기')}>
                비밀번호 찾기
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;