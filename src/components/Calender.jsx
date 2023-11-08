import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


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

    // const handlePrevWeek = () => {
    //     setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7));
    // };

    // const handleNextWeek = () => {
    //     setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7));
    // };

    return (
        <div>
            <div>
                {/* <button onClick={handlePrevWeek}>Prev Week</button> */}
                <span>{new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'long' }).format(date) + " 측정일"}</span>
                {/* <button onClick={handleNextWeek}>Next Week</button> */}
                <Link to='/diagnosis'>날짜 더보기</Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Sun</th>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {days.map((day, index) => (
                            <td
                                key={index}
                                style={{
                                    backgroundColor: day.toDateString() === new Date().toDateString() ? "yellow" : "transparent",
                                }}
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
