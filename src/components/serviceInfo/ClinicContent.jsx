import React from "react";
import './landing.css';
import ImageComponent7 from '../../assets/phone7.png';
import ImageComponent8 from '../../assets/phone8.png';
import ImageComponent9 from '../../assets/phone9.png';
function LandingPage() {
    return (
      <div className="landing-container">
        <div className="text-section">
          <h1 className='MainCopy'>아이의 성장 정보를 전문가가 분석하여<br /> 매일 제공하는 일상 운동 습관 리스트로 <br /> 올바른 신체 성장 습관을 기록해보세요</h1>
        </div>
        <div className="image-section">
          <img src={ImageComponent7} alt="베베테라핏" />
          <img src={ImageComponent8} alt="베베테라핏" />
          <img src={ImageComponent9} alt="베베테라핏" />
        </div>
      </div>
    );
  }
  
  export default LandingPage;
  