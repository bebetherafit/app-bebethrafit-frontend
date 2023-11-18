import React from 'react';
import footPressIcon from '../../../assets/foot-icon.png';
import '../../../styles/FootPressDistributeAns.css';

const FootPressDistributeAns = ({ leftFootPeak, rightFootPeak }) => {
    if(!leftFootPeak || !rightFootPeak) {
        return <div> 발 최대 압력에 대한 입력된 정보가 없습니다.</div>;
    }
    return (
        <div className='footPressContainer'>
            <h4>발 최고 압력</h4>
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
                                <th style={{ verticalAlign: 'middle' }}>발 최고 압력값 (kPa)</th>
                                <td style={{ verticalAlign: 'middle' }}>{leftFootPeak.value}</td>
                                <td style={{ verticalAlign: 'middle' }}>{rightFootPeak.value}</td>
                            </tr>
                            <tr>
                                <th style={{ verticalAlign: 'middle' }}>발 최고 압력 위치</th>
                                <td style={{ verticalAlign: 'middle' }}>{leftFootPeak.location}</td>
                                <td style={{ verticalAlign: 'middle' }}>{rightFootPeak.location}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FootPressDistributeAns;
