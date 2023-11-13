import React, { useEffect } from 'react';

import footPressIcon from '../../../assets/foot-icon.png';
import '../../../styles/WeightBalance.css';

const WeightBalance = () => {
    
    useEffect(() => {
        // 가정: 외부 DB에서 발 압력 데이터를 가져오는 API 엔드포인트
        const fetchWeightBalanceData = async () => {};

        fetchWeightBalanceData();
    }, []);

    return (
        <div className='weightbalance-container'>
            <h4>체중 밸런스 분석</h4>
                <div className='footPressGraphic'>
                    <img src={footPressIcon} width={'40%'} alt="Foot" />
                </div>
        </div>
    );
};

export default WeightBalance;


