import React from 'react';
import footPressIcon from '../../../assets/foot-icon.png';
import '../../../styles/FootPressDistributeAns.css';

const FootPressDistributeAns = ({ leftFootPress, rightFootPress }) => {
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
