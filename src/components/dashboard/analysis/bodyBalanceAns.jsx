import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bodyBalanceImg from '../../../assets/human-icon.png';
import config from '../../../config.json';
import '../../../styles/BodyBalance.css'; // CSS 모듈 임포트

const BACKEND_URL = config.macBackend;

const BodyBalance = () => {
    const [balanceData, setBalanceData] = useState({ left: 0, right: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`${BACKEND_URL}/api/balance`);
                setBalanceData(result.data || { left: 0, right: 0 });
            } catch (error) {
                console.error('Error fetching balance data:', error);
            }
        };

        fetchData();
    }, []);

    const balancePercentage = {
        left: (balanceData.left * 100).toFixed(2),
        right: (balanceData.right * 100).toFixed(2),
    };
    const imbalance = balancePercentage.left - balancePercentage.right;
    const balanceStatus = imbalance === 0 ? '균형' : (imbalance > 0 ? '왼쪽 불균형' : '오른쪽 불균형');
    const balanceColor = imbalance === 0 ? 'green' : 'red';

    return (
        <div className='bodyBalanceContainer'>
            <h4>신체 균형 분석</h4>
            <div className='bodyBalanceContent'>
                <img src={bodyBalanceImg} alt="Body Balance" className='bodyBalanceGraphic' />
                <table className='balanceTable'>
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: '#F7685B', borderRadius: '5px', color: '#ffffff', verticalAlign: 'middle' }}>왼발</th>
                            <th style={{ backgroundColor: '#2ED47A', borderRadius: '5px', color: '#ffffff', verticalAlign: 'middle' }}>오른발</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td>{balancePercentage.left}%</td>
                            <td>{balancePercentage.right}%</td>
                        </tr>
                    </tbody>
                    <tr style={{borderColor : '#fff', height:'80px'}}>
                        <td className={`balanceStatus ${balanceColor}`}>{balanceStatus}</td>
                        <td colSpan="2" style={{borderColor : '#fff'}}> L 5 %</td>
                    </tr>
                </table>
            </div>
        </div>
    );
};

export default BodyBalance;
