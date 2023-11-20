import React, {useState, useEffect} from 'react';
import footPressIcon from '../../../assets/foot-icon.png';
import '../../../styles/FootPressDistributeAns.css';

const FootPressDistributeAns = ({ leftFootPeak, rightFootPeak, leftFootPeakLoc, rightFootPeakLoc }) => {
    // 상태 변수 추가
    const [leftFootStatus, setLeftFootStatus] = useState('');
    const [rightFootStatus, setRightFootStatus] = useState('');

    useEffect(() => {
        let leftStatus = '';
        let rightStatus = '';
        // 입력 값 검증과 기본값 설정
        const validLeftFootPeakLoc = leftFootPeakLoc || [];
        const validRightFootPeakLoc = rightFootPeakLoc || [];
        console.log(validLeftFootPeakLoc, validRightFootPeakLoc)
        if (['C7', 'C8', 'C9', 'C10'].some(val => validLeftFootPeakLoc.includes(val))) {            
            leftStatus = "발 안쪽";
        } else if (['C4', 'C5', 'C6'].some(val => validLeftFootPeakLoc.includes(val))) {
            leftStatus = "발 중간";
        } else if (['C1', 'C2', 'C3'].some(val => validLeftFootPeakLoc.includes(val))) {
            leftStatus = "발 바깥쪽";
        };
        if (['C1', 'C2', 'C3', 'C4'].some(val => validRightFootPeakLoc.includes(val))) {
            rightStatus = "발 안쪽";
        } else if (['C5', 'C6', 'C7'].some(val => validRightFootPeakLoc.includes(val))) {
            rightStatus = "발 중간";
        } else if (['C8', 'C9', 'C10'].some(val => validRightFootPeakLoc.includes(val))) {
            rightStatus = "발 바깥쪽";
        };

        setLeftFootStatus(leftStatus);
        setRightFootStatus(rightStatus);

    }, [leftFootPeakLoc, rightFootPeakLoc]);

    console.log(leftFootStatus, rightFootStatus)

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
                                <td style={{ verticalAlign: 'middle' }}>{leftFootPeak} kPa</td>
                                <td style={{ verticalAlign: 'middle' }}>{rightFootPeak} kPa</td>
                            </tr>
                            <tr>
                                <th style={{ verticalAlign: 'middle' }}>발 최고 압력 위치</th>
                                <td style={{ verticalAlign: 'middle' }}>{leftFootStatus}</td>
                                <td style={{ verticalAlign: 'middle' }}>{rightFootStatus}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FootPressDistributeAns;
