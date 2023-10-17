import React from 'react';

const BodyBalance = ({ leftPercentage, rightPercentage}) => {
    leftPercentage = -0.127;
    rightPercentage = +0.123; 
    const unbalValue = leftPercentage - rightPercentage;
    
    return (
        <div >
            <h3>신체 불균형</h3>
            <img src="/path/to/body_balance.png" alt="bodyBalance" />
            <table>
                <thead>
                    <tr>
                        <th>왼발</th>
                        <th>오른발</th>
                    </tr>
                    <tr>
                        <td>{leftPercentage}%</td>
                        <td>{rightPercentage}%</td>
                    </tr>
                    <tr>
                        <td><h5>불균형</h5></td>
                        <td>{unbalValue}</td>
                    </tr>

                </thead>
            </table>
    
        </div>
    );
};

export default BodyBalance;
