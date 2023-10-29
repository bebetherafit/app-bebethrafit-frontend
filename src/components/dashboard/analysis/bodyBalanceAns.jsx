import React, { useState } from 'react';
import bodyBalanceImg from '../../../assets/human-icon.png';

const BodyBalance = () => {
    const [userData, setUserData] = useState({
        leftPercentage: (-0.127 * 100).toFixed(2),
        rightPercentage: (+0.123 * 100).toFixed(2),
    });

    const unbalValue = (userData.leftPercentage - userData.rightPercentage).toFixed(2);

    if (!userData) {
        return <div>정보가 없습니다</div>;
    }

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
