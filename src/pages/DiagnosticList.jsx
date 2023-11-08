import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DiagnosisList.css'; // 가정: 해당 CSS 파일이 존재하고 올바르게 임포트됨

const DiagnosisListPage = () => {
  const [diagnoses] = useState([
    // 예시 데이터 추가
    { date: new Date().toISOString(), id: 1 }
  ]);
  const navigate = useNavigate();
  const handleCalendarRedirect = () => {
    // navigate 함수를 사용하여 캘린더 페이지로 리디렉트
    navigate('/monthly-schedule');
  };
  useEffect(() => {
    // 서버로부터 데이터를 가져오는 로직 (생략)
    // 가져오기 실패 시 예시 데이터로 유지
  }, []);

  const handleDiagnosisClick = (diagnosisId) => {
    // navigate 함수를 사용하여 dashboard 페이지로 데이터를 보내는 로직
    // navigate('/dashboard', { state: { diagnosisId } });
    console.log(`Navigating to dashboard with diagnosis ID: ${diagnosisId}`);
  };

  return (
    <div className="container">
      {diagnoses.map((diagnosis) => (
        <div
          key={diagnosis.id}
          className="diagnosis-item"
          onClick={() => handleDiagnosisClick(diagnosis.id)}
        >
          <input type="checkbox" id={`diagnosis-${diagnosis.id}`} name="diagnosis" />
          <label htmlFor={`diagnosis-${diagnosis.id}`}>
            {new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(diagnosis.date))} 진단기록
          </label>
        </div>
      ))}

      <div className="view-calendar-button" onClick={handleCalendarRedirect}>
            측정일 조회하기
      </div>
    </div>
  );
};

export default DiagnosisListPage;
