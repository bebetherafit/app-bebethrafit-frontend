import React, {useState} from 'react';
// import { Link } from 'react-router-dom';
import Sidebar from '../components/dashboard/sideBar';
import DashBoardHeader from '../components/dashboard/dashBoardHeader';
import '../styles/dashboard.css';
import Calendar from '../components/Calender';
import AnalysisReport from '../components/AnalysisReport';
import WorkoutLog from './workoutlog';

const Dashboard = () => {
    const [activeContent, setActiveContent] = useState('workout');
    // 사이드바 메뉴 항목에 따라 활성화된 컨텐츠를 변경하는 함수
    const handleMenuClick = (content) => {
        setActiveContent(content);
    };
    return (
        <div className="dashboard-container">
            {/* Sidebar 컴포넌트에 handleMenuClick 함수를 전달합니다 */}
            <Sidebar onMenuClick={handleMenuClick} />
            <div className="dashboard-content">
                <DashBoardHeader />
                <Calendar />
                {activeContent === 'report' && <AnalysisReport />}
                {activeContent === 'workout' && <WorkoutLog />}
            </div>
        </div>
    );
};

export default Dashboard;
