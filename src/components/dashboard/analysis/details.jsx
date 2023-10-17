import React from 'react';

const ProgressBar = ({ progress }) => {
    const containerStyles = {
        height: 10,
        width: '100%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: 50
    }

    const fillerStyles = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: "#00adb5",
        borderRadius: 'inherit',
        textAlign: 'right'
    }

    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    }

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                <span style={labelStyles}>{`${progress}%`}</span>
            </div>
        </div>
    );
}

const FootPressDetails = () => {
    return (
        <div className="Details-container">
            <div className="TotalPressure">
                <h3>총 압력 값</h3>
                <ProgressBar progress={60} />
            </div>
            <div className="AveragePressure">
                <h3>압력 평균 값</h3>
                <ProgressBar progress={50} />
            </div>
            <div className="AreaNums">
                <h3>면적 수</h3>
                <ProgressBar progress={40} />
            </div>
            <div className="ArchAreas">
                <h3>발 아치 면적</h3>
                <ProgressBar progress={20} />
            </div>
        </div>
    );
}


export default FootPressDetails;
