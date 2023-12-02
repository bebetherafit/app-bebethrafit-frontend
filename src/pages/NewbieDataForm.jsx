import React, { useState } from 'react';
import axios from 'axios';
import '../styles/NewbieDataForm.css';
import config from '../config.json';
const BACKEND_URL = config.macBackend;
const UserInfoInputPage = () => {
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    birthDate: '',
    height: '',
    weight: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // 백엔드로 데이터 전송
      const response = await axios.post(`${BACKEND_URL}/api/user-info`, userInfo);
      // 응답 처리
      console.log(response.data);
      // 여기에 BMI 계산 결과 페이지로 리디렉션하는 로직을 추가할 수 있습니다.
    } catch (error) {
      console.error("회원 정보 전송 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="user-info-input-page">
      <h1 className='title'>아이에 대해서 알려주세요</h1>
      <p>맞춤 신체 분석을 추천해드립니다.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>이름(별명)</label>
          <input
            type="text"
            name="nickname"
            value={userInfo.nickname}
            onChange={handleInputChange}
          />
        </div> 
        <div>
          <label>생년월일</label>
          <input
            type="date"
            name="birthDate"
            value={userInfo.birthDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>키(cm)</label>
          <input
            type="number"
            name="height"
            value={userInfo.height}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>몸무게(kg)</label>
          <input
            type="number"
            name="weight"
            value={userInfo.weight}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">신체 정보 시작하기</button>
      </form>
    </div>
  );
};

export default UserInfoInputPage;
