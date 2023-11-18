import React, { useState, useEffect } from 'react';
import '../../../styles/FootPressDetails.css';

const ProgressBar = ({ value, maxValue }) => {
    const [width, setWidth] = useState(0);
    useEffect(() => {
        const progressWidth = Math.min(100, Math.max(0, (value / maxValue) * 100));
        setWidth(progressWidth);
    }, [value, maxValue]);
    return (
        <div className="progress-bar-container">
            <div className="progress-bar" style={{ backgroundColor: '#e0e0de', borderRadius: '5px', height: '20px', position: 'relative' }}>
                <div className="progress-bar-filler" style={{ width: `${width}%`, backgroundColor: value > 0 ? '#FFD700' : '#e0e0de', height: '100%', borderRadius: 'inherit', transition: 'width 1s ease-out' }}>
                    <span style={{ padding: '5px', color: 'white', fontWeight: 'bold', fontSize: "1em" }}>{`${value}`}</span>
                </div>
                <div className="progress-bar-indicator" style={{ left: `${width}%` }} />
            </div>
        </div>
    );
};
const FootPressDetails = ({ title, leftFootData, rightFootData }) => {
    console.log(title, "왼쪽 데이터 : ", leftFootData, "오른쪽 데이터 :", rightFootData);
    return (
        <div className="details-container">
            <h4>{title}</h4>
            <div className="pressure-container">
                <div className="pressure-section">
                    <table className="pressure-table">
                        <thead>
                            <tr>
                                <th>왼발</th> {/* Left foot title */}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{leftFootData} KPa</td>
                            </tr>
                        </tbody>
                    </table>
                    <ProgressBar value={leftFootData} maxValue={500} />
                </div>
                <div className="pressure-section">
                    <table className="pressure-table right-foot-table">
                        <thead>
                            <tr>
                                <th>오른발</th> {/* Right foot title */}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{rightFootData} KPa</td>
                            </tr>
                        </tbody>
                    </table>
                    <ProgressBar value={rightFootData} maxValue={500} />
                </div>
            </div>
        </div>
    );
}
export default FootPressDetails;
