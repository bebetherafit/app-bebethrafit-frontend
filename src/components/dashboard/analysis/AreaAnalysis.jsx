import React, { useState, useEffect } from 'react';
import axios from 'axios';
import footPressIcon from '../../../assets/foot-icon.png';
import '../../../styles/FootPressDistributeAns.css';

const FootAreaAns = () => {
    const [leftFootPress, setLeftFootPress] = useState({ total: 0, average: 0, area: [] });
    const [rightFootPress, setRightFootPress] = useState({ total: 0, average: 0, area: [] });

    useEffect(() => {
        const fetchFootPressData = async () => {
            try {
                const response = await axios.get('외부_DB_엔드포인트_URL');
                setLeftFootPress({
                    ...leftFootPress, // spread operator를 사용하여 기존의 데이터형태 유지
                    total: response.data.leftFootPress.total || 0,
                    average: response.data.leftFootPress.average || 0,
                    area: response.data.leftFootPress.area || [],
                });
                setRightFootPress({
                    ...rightFootPress,
                    total: response.data.rightFootPress.total || 0,
                    average: response.data.rightFootPress.average || 0,
                    area: response.data.rightFootPress.area || [],
                });
            } catch (error) {
                console.error('발 압력 데이터를 가져오는데 실패했습니다:', error);
            }
        };

        fetchFootPressData();
    });

    return (
        <div className='footPressContainer'>
            <h4>발 면적 분석</h4>
            <div className='footPressData' style={{ display: 'flex', flexDirection: 'row' }}>
                <div className='footPressGraphic'>
                <img src={footPressIcon} width={'40%'} alt="Foot" />
                </div>
                <div className='footPressInfo'>
                    <table style={{ width: '100%', textAlign: 'center', borderSpacing: '10px' }}>
                        <colgroup>
                            <col style={{ width: '25%' }} />
                            <col style={{ width: '25%' }} />
                            <col style={{ width: '25%' }} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th style={{ verticalAlign: 'middle' }}></th>
                                <th style={{ backgroundColor: '#F7685B', borderRadius: '5px', color: '#ffffff', verticalAlign: 'middle' }}>왼발</th>
                                <th style={{ backgroundColor: '#2ED47A', borderRadius: '5px', color: '#ffffff', verticalAlign: 'middle' }}>오른발</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th style={{ verticalAlign: 'middle' }}>발 면적 수</th>
                                <td style={{ verticalAlign: 'middle' }}>{leftFootPress.total} Cell</td>
                                <td style={{ verticalAlign: 'middle' }}>{rightFootPress.total} Cell</td>
                            </tr>
                            <tr>
                                <th style={{ verticalAlign: 'middle' }}>발 면적 값</th>
                                <td style={{ verticalAlign: 'middle' }}>{leftFootPress.average}</td>
                                <td style={{ verticalAlign: 'middle' }}>{rightFootPress.average}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FootAreaAns;
