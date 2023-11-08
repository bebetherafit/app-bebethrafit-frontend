import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./dashboard/calender.css";


const Calendar = () => {
    // const [date, setDate] = useState(new Date());
    const [date] = useState(new Date());

    const [days, setDays] = useState([]);

    useEffect(() => {
        const startOfWeek = getStartOfWeek(date);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        const daysArray = [];
        for (let day = startOfWeek; day <= endOfWeek; day.setDate(day.getDate() + 1)) {
            daysArray.push(new Date(day));
        }

        setDays(daysArray);
    }, [date]);

    const getStartOfWeek = (date) => {
        const dateCopy = new Date(date);
        const day = dateCopy.getDay();
        const diff = dateCopy.getDate() - day + (day === 0 ? - 6 : 0); // Adjust when week starts on Sunday
        return new Date(dateCopy.setDate(diff));
    };
    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <span>
                    <h4>
                        {new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long' }).format(date) + " 측정일"}
                    </h4>
                    </span>
                <Link to='/diagnosis'>날짜 더보기</Link>
            </div>
            <table>
                <thead>
                <tr>
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                        <th key={index} className={index === new Date().getDay() ? "current-day" : ""}>
                            {day}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                    <tr>
                    {days.map((day, index) => (
                        <td
                            key={index}
                            className={day.toDateString() === new Date().toDateString() ? "current-day" : ""}
                        >
                            {day.getDate()}
                        </td>
                    ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Calendar;
