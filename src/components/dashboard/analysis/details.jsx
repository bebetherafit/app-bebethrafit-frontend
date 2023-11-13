import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../config.json';
import '../../../styles/FootPressDetails.css';

const BACKEND_URL = config.macBackend;
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
                    <span style={{ padding: '5px', color: 'white', fontWeight: 'bold' }}>{`${value} KPa`}</span>
                </div>
                <div className="progress-bar-indicator" style={{ left: `${width}%` }} />
            </div>
        </div>
    );
};

// export default ProgressBar;


const FootPressDetails = ({title, }) => {
    const [leftFootData, setLeftFootData] = useState({ total: 0 });
    const [rightFootData, setRightFootData] = useState({ total: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/user/foot-pressure`);
                if (response.data) {
                    setLeftFootData(response.data.left || { total: 0});
                    setRightFootData(response.data.right || { total: 0});
                }
            } catch (error) {
                console.error("API 호출 중 오류 발생:", error);
                // 에러 발생 시 데이터를 0으로 설정
                setLeftFootData({ total: 0});
                setRightFootData({ total: 0});
            }
        };

        fetchData();
    }, []);

    return (
        <div className="details-container">
            <h4>{title}</h4>
            <div className="pressure-container">
            <div className="pressure-section">
                <table className="pressure-table">
                    <tr>
                        <th>왼발</th> {/* Left foot title */}
                    </tr>
                    <tr>
                        <td>{leftFootData.total || 0} KPa</td>
                    </tr>
                </table>
                <ProgressBar value={leftFootData.area || 0} maxValue={100} legend={[{percent: 20, label: '저'}, {percent: 50, label: '중'}, {percent: 80, label: '고'}]} />
            </div>
            <div className="pressure-section">
                <table className="pressure-table right-foot-table">
                    <tr>
                        <th>오른발</th> {/* Right foot title */}
                    </tr>
                    <tr>
                        <td>{rightFootData.total || 0} KPa</td>
                    </tr>
                </table>
                <ProgressBar value={rightFootData.area || 0} maxValue={100} legend={[{percent: 20, label: '저'}, {percent: 50, label: '중'}, {percent: 80, label: '고'}]} />
            </div>


            </div>
        </div>
    );
}

export default FootPressDetails;
