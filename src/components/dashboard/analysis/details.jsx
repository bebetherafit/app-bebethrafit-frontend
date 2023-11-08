import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../config.json';
import '../../../styles/FootPressDetails.css';

const BACKEND_URL = config.macBackend;
const ProgressBar = ({ value, maxValue, legend = [] }) => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        // 애니메이션을 위한 width 상태를 maxValue에 비례하게 설정합니다.
        const progressWidth = Math.min(100, Math.max(0, (value / maxValue) * 100));
        setWidth(progressWidth);
    }, [value, maxValue]);

    return (
        <div className="progress-bar-container">
            <div className="progress-bar" style={{ backgroundColor: '#e0e0de', borderRadius: '5px', height: '20px', position: 'relative' }}>
                <div className="progress-bar-filler" style={{ width: `${width}%`, backgroundColor: value > 0 ? '#F7685B' : '#2ED47A', height: '100%', borderRadius: 'inherit', transition: 'width 1s ease-out' }}>
                    <span style={{ padding: '5px', color: 'white', fontWeight: 'bold' }}>{`${value} KPa`}</span>
                </div>
                {legend.map((item, index) => (
                    <div key={index} className="legend-item" style={{ position: 'absolute', top: '100%', left: `${item.percent}%`, transform: 'translateX(-50%)' }}>
                        {item.label}
                    </div>
                ))}
                <div className="progress-bar-indicator" style={{ position: 'absolute', top: '-10px', left: `${width}%`, transform: 'translateX(-50%)', width: '0', height: '0', borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: '10px solid black' }} />
            </div>
        </div>
    );
};


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
                setLeftFootData({ total: 10});
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
                        <th>
                            <h3>왼발</h3>
                        </th>
                        <td>{leftFootData.total || 0} KPa</td>
                    </table>
                    <ProgressBar value={leftFootData.area || 0} maxValue={100} legend={[1,2,3]} backgroundColor="#F7685B" />
                </div>
                <div className="pressure-section">
                    <table className="pressure-table">
                        <th>
                            <h3>오른발</h3>
                        </th>
                        <td>{rightFootData.total || 0} KPa</td>
                    </table>
                    <ProgressBar value={rightFootData.area || 0} maxValue={100} legend={[1,2,3]} backgroundColor="#2ED47A" />
                </div>
            </div>
        </div>
    );
}

export default FootPressDetails;
