import React from 'react';
import footPressIcon from '../../../assets/foot-icon.png';
import '../../../styles/FootPressDistributeAns.css';

const FootAreaAns = ({ leftFootData, rightFootData }) => {
    if(!leftFootData || !rightFootData) {
        return <div>입력된 정보가 없습니다.</div>;
    }
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
                                <td style={{ verticalAlign: 'middle' }}>{leftFootData.total} Cell</td>
                                <td style={{ verticalAlign: 'middle' }}>{rightFootData.total} Cell</td>
                            </tr>
                            <tr>
                                <th style={{ verticalAlign: 'middle' }}>발 면적 값</th>
                                <td style={{ verticalAlign: 'middle' }}>{leftFootData.average}</td>
                                <td style={{ verticalAlign: 'middle' }}>{rightFootData.average}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FootAreaAns;
