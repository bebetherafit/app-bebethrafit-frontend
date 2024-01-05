import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./dashboard/calender.css";
import axios from "axios";
import config from "../config";

const BACKEND_URL = config.macBackend;
const Calendar = () => {
    const [date] = useState(new Date());
    // 현재 날짜를 yyyy-mm-dd 형식으로 초기화
    const currentDateFormatted = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const [diagnosisDates, setDiagnosisDates] = useState([currentDateFormatted]);
    // const [days, setDays] = useState([]);

    useEffect(() => {
        const fetchDiagnosisDates = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) {
                alert('로그인이 필요합니다.');
                return;
            }
            try {
                const response = await axios.get(`${BACKEND_URL}/api/diagnostic-data`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': `application/json`,
                        'ngrok-skip-browser-warning': '69420',
                    }
                });
                // Date 객체로 변환
                const diagnosticDate = new Date(response.data[0].diagnostic_date);
                // 날짜를 yyyy-mm-dd 형식으로 변환
                const formattedDate = `${diagnosticDate.getFullYear()}-${(diagnosticDate.getMonth() + 1).toString().padStart(2, '0')}-${diagnosticDate.getDate().toString().padStart(2, '0')}`;
                setDiagnosisDates([formattedDate]);

                console.log("날짜 데이터:", formattedDate)
            } catch (error) {
                console.error("API 호출 중 오류 발생:", error);
            }
        };
        fetchDiagnosisDates();
    }, []);
    useEffect(() => {
        const startOfWeek = getStartOfWeek(date);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        const daysArray = [];
        for (let day = new Date(startOfWeek); day <= endOfWeek; day.setDate(day.getDate() + 1)) {
            daysArray.push(new Date(day));
        }

        // setDays(daysArray);
    }, [date]);

    const getStartOfWeek = (date) => {
        const dateCopy = new Date(date);
        const diff = dateCopy.getDate() - dateCopy.getDay();
        return new Date(dateCopy.setDate(diff));
    };

    // const isDiagnosticDate = (day) => {
    //     // 현재 날짜를 yyyy-mm-dd 형식으로 포맷
    //     const currentFormattedDate = `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`;
    //     return diagnosisDates.some(diagnosisDate => {
    //         const diagnosisDateObj = new Date(diagnosisDate);
    //         return diagnosisDateObj.toDateString() === day.toDateString();
    //     }) || currentFormattedDate === `${day.getFullYear()}-${(day.getMonth() + 1).toString().padStart(2, '0')}-${day.getDate().toString().padStart(2, '0')}`;
    // };
    // const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <h2>{diagnosisDates[0] + " 측정결과"}</h2>
                <Link to='/diagnosis'>날짜 더보기</Link>
            </div>
            <table>
                {/* <thead>
                    <tr>
                        {weekdays.map((day, index) => (
                            <th key={index}>{day}</th>
                        ))}
                    </tr>
                </thead> */}
                {/* 최신날짜 표시 코드 */}
                {/* <tbody>
                    <tr>
                        {days.map((day, index) => (
                            <td
                                key={index}
                                className={`${day.toDateString() === new Date().toDateString() ? "current-day" : ""} ${isDiagnosticDate(day) ? "diagnosis-day" : ""}`}
                            >
                                {day.getDate()} ({weekdays[day.getDay()]})
                            </td>
                        ))}
                    </tr>
                </tbody> */}
            </table>
        </div>
    );
};

export default Calendar;
