import React from 'react';

const BodyBalance = ({ leftPercentage, rightPercentage}) => {
    leftPercentage = -0.127;
    rightPercentage = +0.123; 
    const unbalValue = leftPercentage - rightPercentage;
    
    return (
        <div className='bodyBalanceContainter' style={{}}>
            <h4>신체 불균형</h4>
            <div className='bodyBalnceData' style={{display: 'flex', flexDirection: 'row'}}>
                <div className='bodyBalanceGraphic'>
                    <img src="/path/to/body_balance.png" alt="bodyBalance" />
                </div>
                <table className='BalanceData'>
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: '#F7685B', borderRadius: '5px', color: '#ffffff', width: '15px' }}>왼발</th>
                            <th style={{ backgroundColor: '#2ED47A', borderRadius: '5px', color: '#ffffff', width: '15px' }}>오른발</th>
                        </tr>
                        <tr>
                            <td>{leftPercentage}%</td>
                            <td>{rightPercentage}%</td>
                        </tr>
                        <tr>
                            <td><h3>불균형</h3></td>
                            <td>{unbalValue}</td>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    );
};

export default BodyBalance;
