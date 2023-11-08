import React from 'react';
import FootPressDistributeAns from '../components/dashboard/analysis/footPressDistributeAns';
import Details from '../components/dashboard/analysis/details';
import BodyBalance from '../components/dashboard/analysis/bodyBalanceAns';
import './dashboard/analysisreport.css';

const AnalysisReport = () => {
    return (
        <div className="dashboard-contents">
            <div className="dashboard-pressure-balance">
                <FootPressDistributeAns />
                <BodyBalance />
            </div>
            <Details title={'총 압력값'}/>
            <Details title={'압력 평균 값'}/>
        </div>
    );
}
export default AnalysisReport;
