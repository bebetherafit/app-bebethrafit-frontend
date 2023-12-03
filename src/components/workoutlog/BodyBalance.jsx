import React from "react";
import './styles/BodyBalance.css';
import './styles/commons.css';

function BodyBalance ({BodyBalanceValue}) {
    const BodyBalanceScale = (BodyBalanceValue) => {
        if (BodyBalanceValue < 0) {
            return "오른쪽으로 치우침";
        } else if (BodyBalanceValue > 0) {
            return "왼쪽으로 치우침";
        } else if (BodyBalanceValue === 0) {
            return "균형 잡힘";
        }
    }
    return (
        <div className="bodybalance-container container">

            <h3 className="bodybalance-header header">신체 균형도</h3> 
            <h3 className="bodybalance-value value">{BodyBalanceScale(BodyBalanceValue)}</h3>
        </div>
      );
    }

export default BodyBalance;
