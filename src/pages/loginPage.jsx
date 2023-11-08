import React, {useContext} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import '../styles/login.css';
import axios from 'axios';
import config from '../config.json';

const BACKEND_URL = config.macBackend;

function LoginPage({ onLoginSuccess }) { // onLoginSuccess prop 추가

  // kakao login
  const REDIRECT_URI = 'http://localhost:3000/oauth';
  const REST_API_KEY = 'e2b2b0b0b0b0b0b0b0b0b0b0b0b0b0b0';
  const kakaoLink =  `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const kakaoLoginHandler = () => {
    window.location.href = kakaoLink;
  };

  // naver login


  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.id.value;
    const password = event.target.pw.value;
    try {
      const response = await axios.post(BACKEND_URL+ '/login', {
        email: email,
        password: password,
      });
      // JWT 토큰 저장
      if (response.data && response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
        setUser(response.data.user_info); // 로그인한 사용자 정보 저장
        onLoginSuccess();
        const destination = response.data.user_info.is_admin ? '/admin' : '/dashboard'; // 관리자인 경우 /admin으로 이동
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
            <div className="login-menu-set">
              <Link to="/signup">회원가입</Link>
            </div>
            |
            <div className="login-menu-set">
              <Link to="/findpassword">비밀번호 찾기</Link>
            </div>
            |
            <div className="login-menu-set">
              <Link to="/intro">둘러보기</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;