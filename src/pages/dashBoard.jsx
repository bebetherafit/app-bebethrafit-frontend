import React from 'react';
// import { Link } from 'react-router-dom';
import Sidebar from '../components/dashboard/sideBar';
import DashBoardHeader from '../components/dashboard/dashBoardHeader';
import FootPressDistributeAns from '../components/dashboard/analysis/footPressDistributeAns';
import Details from '../components/dashboard/analysis/details';
import BodyBalance from '../components/dashboard/analysis/bodyBalanceAns';
import '../styles/dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="dashboard-content">
                <DashBoardHeader />
                <div className="dashboard-pressure-balance">
                <FootPressDistributeAns />
                <BodyBalance />
                </div>
                <Details title={'총 압력값'}/>
                <Details title={'압력 평균 값'}/>
            </div>
        </div>
    );
};

export default Dashboard;
