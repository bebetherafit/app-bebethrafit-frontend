import React from "react";
import ImageComponent4 from '../../assets/phone4.png';
import ImageComponent5 from '../../assets/phone5.png';
import ImageComponent6 from '../../assets/phone6.png';
function LandingPage() {
    return (
      <div className="landing-container">
        <div className="text-section">
          <h1 className='MainCopy'>아이 성장기동안 발 분석 모니터링 <br /> 신체 불균형 정보를 객관적으로 확인하세요</h1>
        </div>
        <div className="image-section">
          <img src={ImageComponent4} alt="베베테라핏"/>
          <img src={ImageComponent5} alt="베베테라핏"/>
          <img src={ImageComponent6} alt="베베테라핏"/>
        </div>
      </div>
    );
  }
  
  export default LandingPage;
  