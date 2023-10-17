import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calenderMetric.css";

const MetricDateCalendarModule = () => {
    const [date, setDate] = useState(new Date());

    const onChange = (date) => {
        setDate(date);
    };

    return (
        <div className="calendar-container">
            <h2>Metric Date Calendar Module</h2>
            <Calendar onChange={onChange} value={date} />
        </div>
    );
};

export default MetricDateCalendarModule;
