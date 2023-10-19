import React from 'react';

const FootPressDistributeAns = ({ leftFootPress, rightFootPress }) => {
    leftFootPress = { total: 307, average: 291, area: 7 };
    rightFootPress = { total: 381, average: 294, area: 7 };

    return (
        <div className='footPressContainer'>
            <h4>발 압력 분포 분석</h4>
            <div className='footPressData' style={{display: 'flex', flexDirection: 'row'}}>
                <div className='footPressGraphic'>
                    <img src="/path/to/foot-image.png" alt="Foot" />
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th style={{backgroundColor: '#F7685B', borderRadius: '5px', color: '#ffffff'}}>왼발</th>
                                <th style={{backgroundColor: '#2ED47A', borderRadius: '5px', color: '#ffffff'}}>오른발</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>총 압력 값</th>
                                <td>{leftFootPress.total}</td>
                                <td>{rightFootPress.total}</td>
                            </tr>
                            <tr>
                                <th>압력 평균 값</th>
                                <td>{leftFootPress.average}</td>
                                <td>{rightFootPress.average}</td>
                            </tr>
                            <tr>
                                <th>면적 수</th>
                                <td>{leftFootPress.area}</td>
                                <td>{rightFootPress.area}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FootPressDistributeAns;
