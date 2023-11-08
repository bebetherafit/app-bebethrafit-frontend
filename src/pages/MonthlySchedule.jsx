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
  const [currentDate, setCurrentDate] = useState(new Date());
  // const [diagnosisDates, setDiagnosisDates] = useState([]); // fetched from the database
  const [diagnosisDates] = useState([]); // fetched from the database

  const navigate = useNavigate();

  useEffect(() => {
    // 데이터베이스에서 진단 기록이 있는 날짜들을 가져오는 로직을 구현해야 합니다.
    // fetchDiagnosisDates().then(data => setDiagnosisDates(data));
  }, []);
  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

  // Navigate to the previous month
  const handlePrevMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(newDate);
  };

  // Navigate to the next month
  const handleNextMonth = () => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(newDate);
  };
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
      <div className="month-navigation">
        <button onClick={handlePrevMonth}>&lt; Prev</button>
        <h2>{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월 측정기록</h2>
        <button onClick={handleNextMonth}>Next &gt;</button>
      </div>

      {/* 캘린더 UI 구성 */}
      <div className="calendar">
      <div className="weekday-header">Sun</div>
      <div className="weekday-header">Mon</div>
      <div className="weekday-header">Tue</div>
      <div className="weekday-header">Wed</div>
      <div className="weekday-header">Thu</div>
      <div className="weekday-header">Fri</div>
      <div className="weekday-header">Sat</div>
        
        {/* Empty cells for days before the first of the month */}
        {Array.from({ length: firstDay }, (_, i) => (
          <div className="empty-cell" key={i}></div>
        ))}
        
        {/* Day cells for each day of the month */}
        {Array.from({ length: daysInMonth }, (_, day) => {
          const dayOfMonth = day + 1;
          const isDiagnosisDate = diagnosisDates.includes(dayOfMonth);
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

        <div className="view-calendar-button">
          <Link to='/diagnosis'>
            클릭한 날짜로 기록 확인하기
          </Link>
        </div>
    </div>
  );
};

export default MonthlySchedule;
