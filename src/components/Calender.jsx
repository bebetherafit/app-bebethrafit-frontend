import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./dashboard/calender.css";
import axios from "axios";
import config from "../config";

const BACKEND_URL = config.macBackend;
const Calendar = () => {
    const [date] = useState(new Date());
    const [diagnosisDates, setDiagnosisDates] = useState([]);
    const [days, setDays] = useState([]);

    useEffect(() => {
        const fetchDiagnosisDates = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) {
                alert('로그인이 필요합니다.');
                return;
            }
            try {
                const response = await axios.get(`${BACKEND_URL}/api/diagnostic-data`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setDiagnosisDates(response.data.map(item => new Date(item.diagnostic_date)));
                console.log("날짜 데이터:", response.data)
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

        setDays(daysArray);
    }, [date]);

    const getStartOfWeek = (date) => {
        const dateCopy = new Date(date);
        const diff = dateCopy.getDate() - dateCopy.getDay();
        return new Date(dateCopy.setDate(diff));
    };

    const isDiagnosticDate = (day) => {
        return diagnosisDates.some(diagnosisDate => {
            // Check if diagnosisDate is a Date object
            if (diagnosisDate instanceof Date) {
                return diagnosisDate.toDateString() === day.toDateString();
            }
            return false;
        });
    };
    

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <h4>{new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long' }).format(date) + " 측정일"}</h4>
                <Link to='/diagnosis'>날짜 더보기</Link>
            </div>
            <table>
                <thead>
                    <tr>
                        {weekdays.map((day, index) => (
                            <th key={index}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
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
                </tbody>
            </table>
        </div>
    );
};

export default Calendar;
