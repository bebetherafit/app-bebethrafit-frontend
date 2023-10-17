import React from 'react';

const FootPressDistributeAns = ({ leftFootPress, rightFootPress }) => {
    leftFootPress = { total: 100, average: 100, area: 100 };
    rightFootPress = { total: 100, average: 100, area: 100 };

    return (
        <div className='footPressValues'>
            <h4>발 압력 분포 분석</h4>
            <div className='footPressGraphic'>
                <img src="/path/to/foot-image.png" alt="Foot" />
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>왼발</th>
                            <th>오른발</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{leftFootPress.total}</td>
                            <td>{rightFootPress.total}</td>
                        </tr>
                        <tr>
                            <td>{leftFootPress.average}</td>
                            <td>{rightFootPress.average}</td>
                        </tr>
                        <tr>
                            <td>{leftFootPress.area}</td>
                            <td>{rightFootPress.area}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FootPressDistributeAns;
