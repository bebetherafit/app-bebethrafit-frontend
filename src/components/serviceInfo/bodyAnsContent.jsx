import React from 'react';
import FirstImageComponent from '../../assets/phone1.png';
import SecondImageComponent from '../../assets/phone2.png';
import ThirdImageComponent from '../../assets/phone3.png';
import './landing.css';

function LandingPage() {
  return (
    <div className="landing-container">
      <div className="text-section">
        <h1 className='MainCopy'>소중한 내 아이의 신체 성장 관리 <br /> '베베테라핏'으로 시작해보세요</h1>
        <h2 className='SubCopy'>아이 맞춤 신체 분석, 일상 운동 습관부터 <br /> 센터 추천까지 모든 과정을 담았습니다.</h2>
      </div>
      <div className="image-section">
        <img src={FirstImageComponent} alt="베베테라핏" />
        <img src={SecondImageComponent} alt="베베테라핏" />
        <img src={ThirdImageComponent} alt="베베테라핏" />
      </div>
    </div>
  );
}

export default LandingPage;
