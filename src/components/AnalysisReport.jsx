import React from 'react';
import FootPressDistributeAns from '../components/dashboard/analysis/footPressDistributeAns';
import Details from '../components/dashboard/analysis/details';
import BodyBalance from '../components/dashboard/analysis/bodyBalanceAns';
import PeakPress from '../components/dashboard/analysis/PeakPressure';
import './dashboard/analysisreport.css';

const AnalysisReport = () => {
    return (
        <div className="dashboard-contents">
            <div className="dashboard-pressure-balance">
                <FootPressDistributeAns />
                <BodyBalance />
            </div>
            <div>
            <Details title={'총 압력값'}/>
            <Details title={'압력 평균 값'}/>
            </div>
            <div>
            <PeakPress />
            </div>
        </div>
    );
}
export default AnalysisReport;
