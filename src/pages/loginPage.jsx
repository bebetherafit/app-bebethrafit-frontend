import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/login.css';
import axios from 'axios';


function LoginPage({ onLoginSuccess }) { // onLoginSuccess prop 추가

  // kakao login
  const REDIRECT_URI = 'http://localhost:3000/oauth';
  const REST_API_KEY = 'e2b2b0b0b0b0b0b0b0b0b0b0b0b0b0b0';
  const kakaoLink =  `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const kakaoLoginHandler = () => {
    window.location.href = kakaoLink;
  };

  // naver login

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.id.value;
    const password = event.target.pw.value;
    try {
      const response = await axios.post('https://4ed5-1-223-77-28.ngrok-free.app/login', {
        email: email,
        password: password,
      });
      // JWT 토큰 저장
      if (response.data && response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
        onLoginSuccess(); // 로그인 성공 후 onLoginSuccess 함수 호출
        // is_admin 값에 따라 관리자 페이지 또는 대시보드로 이동
        const destination = response.data.is_admin ? '/admin' : '/dashboard';
        navigate(destination);
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
            <button type="button" className="submit kakao" onClick={kakaoLoginHandler}>
              카카오로 1초 로그인 / 회원가입
            </button>
            <button type="button" className="submit naver">
              네이버로 1초 로그인 / 회원가입
            </button>
          </div>
          <div className="signup">
            <div className="container">
              <Link to="/signup">회원가입</Link>
            </div>
            |
            <div className="container">
              <Link to="/findpassword">비밀번호 찾기</Link>
            </div>
            |
            <div className="container">
              <Link to="/dashboard">둘러보기</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;