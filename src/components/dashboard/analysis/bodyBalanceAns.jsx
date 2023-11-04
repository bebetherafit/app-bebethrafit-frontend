import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bodyBalanceImg from '../../../assets/human-icon.png';
import config from '../../../config.json';

const BACKEND_URL = config.macBackend;
const BodyBalance = () => {
    const [userData, setUserData] = useState(null); // 초기 상태를 null로 설정
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(BACKEND_URL + '/api/user',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning' : '69420'
                    }
                });
                console.log(result.data);
                if (Array.isArray(result.data)) {
                    setUserData(result.data);
                }
                else {
                    console.error('Fetched data is not an array:', result.data);
                }
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData().then(data => {
            if (data) {
                // 데이터가 있는 경우, 상태를 업데이트합니다.
                setUserData({
                    leftPercentage: (data.left * 100).toFixed(2),
                    rightPercentage: (data.right * 100).toFixed(2),
                });
            } else {
                // 데이터가 없는 경우, userData 상태를 null로 유지합니다.
                setUserData(null);
            }
        });
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.

    if (!userData) {
        return <div>정보가 없습니다</div>; // userData가 null이면 메시지 출력
    }

    // userData가 유효한 경우에 대한 나머지 컴포넌트 렌더링
    const unbalValue = (userData.leftPercentage - userData.rightPercentage).toFixed(2);

    return (
        <div className='bodyBalanceContainter'>
            <h4>신체 불균형</h4>
            <div className='bodyBalnceData' style={{ display: 'flex', flexDirection: 'row'}}>
                <div className='bodyBalanceGraphic'>
                    <img src={bodyBalanceImg} width={'40%'} alt="bodyBalance" />
                </div>
                <div style={{ width: '80%' }}>
                    <table className='BalanceData' style={{ width: '55%', textAlign: 'center', borderSpacing: '10px' }}>
                        <colgroup>
                            <col style={{ width: '10%' }} />
                            <col style={{ width: '40%' }} />
                            <col style={{ width: '40%' }} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: 'transparent', verticalAlign: 'middle' }}></th>
                                <th style={{ backgroundColor: '#F7685B', borderRadius: '5px', color: '#ffffff', verticalAlign: 'middle' }}>왼발</th>
                                <th style={{ backgroundColor: '#2ED47A', borderRadius: '5px', color: '#ffffff', verticalAlign: 'middle' }}>오른발</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ verticalAlign: 'middle' }}></td> {/* 빈 열 추가 */}
                                <td style={{ verticalAlign: 'middle' }}>{userData.leftPercentage}%</td>
                                <td style={{ verticalAlign: 'middle' }}>{userData.rightPercentage}%</td>
                            </tr>
                            <tr>
                                <td></td>
                                <th style={{ verticalAlign: 'middle' }}>불균형</th>
                                <td style={{ verticalAlign: 'middle' }}>{unbalValue}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BodyBalance;
