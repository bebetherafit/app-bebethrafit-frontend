import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/MonthlySchedule.css';
// 이 함수는 특정 월의 일 수를 반환합니다.
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

// 이 함수는 특정 월의 첫 날이 무슨 요일인지 반환합니다. (0: 일요일, 6: 토요일)
const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

const MonthlySchedule = () => {
  // const [currentDate, setCurrentDate] = useState(new Date());
  // const [diagnosisDates, setDiagnosisDates] = useState([]); // 데이터베이스에서 가져온 진단 날짜들
  const [currentDate] = useState(new Date());
  const [diagnosisDates] = useState([]); // 데이터베이스에서 가져온 진단 날짜들
  const navigate = useNavigate();

  useEffect(() => {
    // 데이터베이스에서 진단 기록이 있는 날짜들을 가져오는 로직을 구현해야 합니다.
    // fetchDiagnosisDates().then(data => setDiagnosisDates(data));
  }, []);

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

  // 날짜 클릭 핸들러
  const handleDateClick = (date) => {
    // navigate 함수를 사용하여 특정 날짜의 진단 데이터 페이지로 이동
    navigate('/dashboard', { state: { date } });
  };
  const days = [];
  // 월의 첫 요일 전까지 빈 셀을 삽입합니다.
  for (let i = 0; i < firstDay; i++) {
    days.push(<div className="empty-cell" key={`empty-${i}`}></div>);
  }

  return (
    <div>
      <h2>{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월 측정기록</h2>
      {/* 캘린더 UI 구성 */}
      <div className="calendar">
        {/* 날짜 셀을 생성하는 로직 */}
        {[...Array(daysInMonth).keys()].map(day => {
          // const dayIndex = day + firstDay; // 요일 인덱스 조정
          const dayOfMonth = day + 1;
          const isDiagnosisDate = diagnosisDates.includes(dayOfMonth); // 진단 기록이 있는지 확인
          return (
            <div
              key={day}
              className={`day-cell ${isDiagnosisDate ? 'diagnosis' : ''}`}
              onClick={() => handleDateClick(dayOfMonth)}
            >
              {dayOfMonth}
            </div>
          );
        })}
      </div>
      <Link to='/diagnosis'>
        <div className="view-calendar-button">
          날짜 더보기
        </div>
      </Link>
    </div>
  );
};

export default MonthlySchedule;
