import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/login.css';

function LoginPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <div className="inner">
      <div className="bebemain"></div>
      <div className="login">
        <form onSubmit={handleSubmit}>
          <input type="text" name="id" placeholder="이메일 아이디" className="idpw" />
          <input type="password" name="pw" placeholder="비밀번호" className="idpw" />
          <Link to={'/dashboard'}>
          <div className="submits">
            <input type="submit" value="로그인" className="submit" />
            <button type="button" onClick={() => alert('카카오로 1초 로그인 / 회원가입')} className="submit kakao">
              카카오로 1초 로그인 / 회원가입
            </button>
            <button type="button" onClick={() => alert('네이버로 1초 로그인 / 회원가입')} className="submit naver">
              네이버로 1초 로그인 / 회원가입
            </button>
          </div>
          </Link>
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