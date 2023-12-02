import React from "react";
import './landing.css';
import ImageComponent10 from '../../assets/phone10.png';
import { useNavigate } from "react-router-dom";


function LandingPage() {
  // redirect if click button 
  const navigate = useNavigate();
  const handleClick = () => {
    if (localStorage.getItem('access_token')) {
      navigate('/newbie');
    } else {
      navigate('/login');
    }
  }


    return (
        <div>
      <div className="landing-container">
        <div className="text-section">
          <h1 className='MainCopy'>클릭 한번에 센터 연결까지<br />소중한 내아이를 위해 꼼꼼하게<br />검증된 운동센터를 추천해드립니다</h1>
        </div>
        <div className="image-section">
          <img src={ImageComponent10} alt="베베테라핏" />
          
        </div>
      </div>
    <div className="button-container" onClick={handleClick}>
      <button className="BtnStart">베베테라핏 사용하기</button>
    </div>
  </div>
    );
  }

export default LandingPage;