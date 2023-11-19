import React, { useState, useEffect, useRef } from 'react';
import footPressIcon from '../../../assets/foot-icon.png';
import { ReactComponent as Coordinate } from '../../../assets/coordinate.svg';

const WeightBalance = () => {
    // const [gradientLevel, setGradientLevel] = useState(50);
    const [gradientLevel] = useState(1);
    const svgRef = useRef(null);

    useEffect(() => {
        if (!svgRef.current) return;
        // 그라데이션 적용
        const applyGradient = (id, color, opacity) => {
            const element = svgRef.current.getElementById(id);
            if (element) {
                element.style.fill = `rgba(${color}, ${opacity})`;
            }
        };
        // 각 사분면에 대한 그라데이션 적용
        const opacityLevel = gradientLevel / 100;
        applyGradient('quadrant1', '0, 0, 255', opacityLevel); // 파란색
        applyGradient('quadrant3', '0, 0, 255', opacityLevel);
        applyGradient('quadrant2', '255, 0, 0', opacityLevel); // 빨간색
        applyGradient('quadrant4', '255, 0, 0', opacityLevel);
    }, [gradientLevel]);
    return (
        <div className='weightbalance-container'>
            <h4>체중 밸런스 분석</h4>
            <div className='footPressGraphic' style={{ position: 'relative' }}>
                <img src={footPressIcon} alt="Foot" style={{ position: 'absolute', width: '40%', zIndex: 1 }} />
                <Coordinate style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 2 }} />
            </div>
        </div>
    );
};

export default WeightBalance;
