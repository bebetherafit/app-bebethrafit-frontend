import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import '../../styles/sidebar.css';
import profilePic from '../../assets/bebeimg.png';
import { ReactComponent as CommunityIcon } from '../../assets/icons/chat.svg';
import { ReactComponent as CustomerServiceIcon } from '../../assets/icons/contacts.svg';
import { ReactComponent as FindClinicIcon } from '../../assets/icons/email.svg';
import { ReactComponent as FitnessLogIcon } from '../../assets/icons/tasks.svg';
import { ReactComponent as AnalysisReportIcon } from '../../assets/icons/dashboard-active.svg';
import Tooltip from '../Tooltips';


const Sidebar = ({onMenuClick}) => {
    const { user } = useContext(UserContext);

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 768);
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`sidebar ${isMobile ? 'mobile' : ''}`}>
            <div className="sidebarHeader">
                <h2 className="sidebarHeaderTitle">나의 분석 리포트</h2>
            </div>
            <div className="sidebarAccount">
                <div className="sidebarAccountInfo">
                    <img src={profilePic} width={50} alt="user avatar" />
                    <div className='userInfo'>
                        <p>{user.username}</p>
                        <p>{user.email}</p>
                    </div>
                </div>
            </div>
            <div className="sidebarMenus">
                <ul>
                    <li>
                        <Link to="/dashboard" className='sideMenuList' onClick={() => onMenuClick('report')}>
                            <AnalysisReportIcon width={20} height={20} alt="analysis report" />
                            분석 리포트
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard" className='sideMenuList'onClick={() => onMenuClick('workout')}>
                            <FitnessLogIcon width={20} height={20} alt='fitness log' />
                            맞춤 성장 운동 기록
                        </Link>
                    </li>
                    <li>
                    <Tooltip text='준비중입니다.'>
                        <Link to="" className='sideMenuList'>
                            <FindClinicIcon width={20} height={20} alt='find clinic' />
                            센터 찾기
                        </Link>
                    </Tooltip>
                    </li>
                    <li>
                        <Tooltip text='준비중입니다.'>
                        <Link to="" className='sideMenuList'>
                            <CustomerServiceIcon width={20} height={20} alt='customer service' />
                            고객센터
                        </Link>
                        </Tooltip>
                    </li>
                    <li>
                        <Tooltip text='준비중입니다.'>
                        <Link to="" className='sideMenuList'>
                            <CommunityIcon width={20} height={20} alt='community' />
                            커뮤니티
                        </Link>
                        </Tooltip>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
