import React from 'react';
import Logo from '../assets/bebeimg.png'
import '../styles/Loading.css';

const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <img src={Logo} alt="로고" className="loading-logo" />
      <div className="loading-bar">
        <div className="loading-progress"></div>
      </div>
      <p className="loading-text">로딩 중 입니다. 잠시만 기다려주세요.</p>
    </div>
  );
};

export default LoadingScreen;
