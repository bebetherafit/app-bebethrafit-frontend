import React from "react";
import './styles/ObesityIndex.css';
import './styles/commons.css';

function ObesityIndex({ obesityValue }) {
    const obesityScale = (obesityValue) => {
        if (obesityValue < 18.5) {
            return "저체중";
        } else if (obesityValue >= 18.5 && obesityValue < 23) {
            return "정상";
        } else if (obesityValue >= 23 && obesityValue < 25) {
            return "과체중";
        } else if (obesityValue >= 25 && obesityValue < 30) {
            return "경도비만";
        } else if (obesityValue >= 30 && obesityValue < 35) {
            return "중등도비만";
        } else if (obesityValue >= 35) {
            return "고도비만";
        } else if (obesityValue === 0) {
            return "정보 없음";
        }
    }
    console.log(
        "Value : ", obesityValue,
        "Scale : ",obesityScale(obesityValue));

    return (
        <div className="bmi-container container">
            <h3 className="bmi-title header">비만도 지수</h3>
            <h3 className="bmi-value value">{obesityValue}</h3>
        </div>
    );
}

export default ObesityIndex;
