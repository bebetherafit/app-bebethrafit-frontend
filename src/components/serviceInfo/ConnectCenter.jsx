import React from "react";

function LandingPage() {
    return (
        <div>
      <div className="landing-container">
        <div className="text-section">
          <h1 className='MainCopy'>클릭 한번에 센터 연결까지<br />소중한 내아이를 위해 꼼꼼하게<br />검증된 운동센터를 추천해드립니다</h1>
          {/* <h2 className='SubCopy'>아이 맞춤 신체 분석, 일상 운동 습관부터 <br /> 센터 추천까지 모든 과정을 담았습니다.</h2> */}
        </div>
        <div className="image-section">
          {/* <img src={FirstImageComponent} alt="베베테라핏" />
          <img src={SecondImageComponent} alt="베베테라핏" />
          <img src={ThirdImageComponent} alt="베베테라핏" /> */}
        </div>
      </div>
    <div className="button-container">
      <button className="BtnStart">베베테라핏 사용하기</button>
    </div>
  </div>
    );
  }

export default LandingPage;