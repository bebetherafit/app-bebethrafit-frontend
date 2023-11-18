import React from 'react';
import footPressIcon from '../../../assets/foot-icon.png';
import '../../../styles/FootPressDistributeAns.css';

const FootAreaAns = ({ leftFootCell, rightFootCell, leftFootArea, rightFootArea }) => {
    console.log('하위 면적 컴포넌트에서 받는 값:', leftFootCell, rightFootCell, leftFootArea, rightFootArea);
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
                                <td style={{ verticalAlign: 'middle' }}>{leftFootCell} Cell</td>
                                <td style={{ verticalAlign: 'middle' }}>{rightFootCell} Cell</td>
                            </tr>
                            <tr>
                                <th style={{ verticalAlign: 'middle' }}>발 면적</th>
                                <td style={{ verticalAlign: 'middle' }}>{leftFootArea}㎠</td>
                                <td style={{ verticalAlign: 'middle' }}>{rightFootArea}㎠</td>
                            </tr>
                            {/* <tr>
                                <th style={{ verticalAlign: 'middle' }}>발 아치</th>
                                <td style={{ verticalAlign: 'middle' }}>{leftFootData.average}</td>
                                <td style={{ verticalAlign: 'middle' }}>{rightFootData.average}</td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FootAreaAns;
