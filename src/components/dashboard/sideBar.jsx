import React from 'react';
import '../../styles/sidebar.css';
import { Link } from 'react-router-dom';


const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h3>나의 분석 리포트</h3>
            </div>
            <div className="sidebar-account">
                <div>
                <img src="https://via.placeholder.com/50" alt="user avatar" />
                </div>
                <div className="sidebar-account-info">
                    <p>John Doe</p>
                    <span>Admin</span>
                </div>
            </div>
            <div className="sidebar-menus">
                <ul>
                    <li>
                        <Link to="#">분석 리포트</Link>
                    </li>
                    <li>
                        <Link to="#">맞춤 성장 운동 기록</Link>
                    </li>
                    <li>
                        <Link to="#">센터 찾기</Link>
                    </li>
                    <li>
                        <Link to="#">커뮤니티</Link>
                    </li>
                    <li>
                        <Link to="#">Menu 5</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
