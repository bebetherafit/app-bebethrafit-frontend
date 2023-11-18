import React from 'react';
import bodyBalanceImg from '../../../assets/human-icon.png';
import '../../../styles/BodyBalance.css';

const BodyBalance = ({ leftBalance, rightBalance }) => {
    const left = leftBalance || { left: 0 };
    const right = rightBalance || { right: 0 };

    const balancePercentage = {
        left: (left.left * 100).toFixed(2),
        right: (right.right * 100).toFixed(2),
    };
    console.log('leftBalance:', leftBalance);
    console.log('rightBalance:', rightBalance);
    const imbalance = balancePercentage.left - balancePercentage.right;
    const balanceStatus = imbalance === 0 ? '균형' : (imbalance > 0 ? '왼쪽 \n 불균형' : '오른쪽 \n 불균형');
    const balanceColor = imbalance === 0 ? 'green' : 'red';
    return (
        <div className='bodyBalanceContainer'>
            <h4>신체 균형 분석</h4>
            <div className='bodyBalanceContent'>
                <img src={bodyBalanceImg} alt="Body Balance" className='bodyBalanceGraphic' />
                <table className='balanceTable'>
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: '#F7685B', borderRadius: '5px', color: '#ffffff', verticalAlign: 'middle' }}>왼발</th>
                            <th style={{ backgroundColor: '#2ED47A', borderRadius: '5px', color: '#ffffff', verticalAlign: 'middle' }}>오른발</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{balancePercentage.left}%</td>
                            <td>{balancePercentage.right}%</td>
                        </tr>
                        <tr style={{borderColor : '#fff', height:'80px'}}>
                            <td className={`balanceStatus ${balanceColor}`}>{balanceStatus}</td>
                            <td colSpan="2" style={{borderColor : '#fff'}}>{imbalance}%</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default BodyBalance;
