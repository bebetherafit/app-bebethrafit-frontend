import React, { useState, useEffect } from 'react';
import axios from 'axios';
import footPressIcon from '../../../assets/foot-icon.png';
import '../../../styles/FootPressDistributeAns.css';

const FootPressDistributeAns = () => {
    const [leftFootPress, setLeftFootPress] = useState({ total: 0, average: 0, area: 0 });
    const [rightFootPress, setRightFootPress] = useState({ total: 0, average: 0, area: 0 });

    useEffect(() => {
        // 가정: 외부 DB에서 발 압력 데이터를 가져오는 API 엔드포인트
        const fetchFootPressData = async () => {
            try {
                const response = await axios.get('외부_DB_엔드포인트_URL');
                // 데이터를 구조분해할당을 통해 추출하고, 데이터가 없을 경우 0을 기본값으로 설정합니다.
                setLeftFootPress({
                    total: response.data.leftFootPress.total || 0,
                    average: response.data.leftFootPress.average || 0,
                    area: response.data.leftFootPress.area || 0,
                });
                setRightFootPress({
                    total: response.data.rightFootPress.total || 0,
                    average: response.data.rightFootPress.average || 0,
                    area: response.data.rightFootPress.area || 0,
                });
            } catch (error) {
                console.error('발 압력 데이터를 가져오는데 실패했습니다:', error);
            }
        };

        fetchFootPressData();
    }, []);

    return (
        <div className='footPressContainer'>
            <h4>발 압력 분포 분석</h4>
            <div className='footPressData' style={{ display: 'flex', flexDirection: 'row' }}>
                <div className='footPressGraphic'>
                    <img src={footPressIcon} width={'40%'} alt="Foot" />
                </div>
                <div className='footPressInfo'>
                    <table style={{ width: '100%', textAlign: 'center', borderSpacing: '10px' }}>
                        <colgroup>
                            <col style={{ width: '50%' }} />
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
                                <th style={{ verticalAlign: 'middle' }}>총 압력 값 (kPa)</th>
                                <td style={{ verticalAlign: 'middle' }}>{leftFootPress.total}</td>
                                <td style={{ verticalAlign: 'middle' }}>{rightFootPress.total}</td>
                            </tr>
                            <tr>
                                <th style={{ verticalAlign: 'middle' }}>압력 평균 값 (kPa)</th>
                                <td style={{ verticalAlign: 'middle' }}>{leftFootPress.average}</td>
                                <td style={{ verticalAlign: 'middle' }}>{rightFootPress.average}</td>
                            </tr>
                            <tr>
                                <th style={{ verticalAlign: 'middle' }}>면적 수 (㎠)</th>
                                <td style={{ verticalAlign: 'middle' }}>{leftFootPress.area}</td>
                                <td style={{ verticalAlign: 'middle' }}>{rightFootPress.area}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FootPressDistributeAns;


