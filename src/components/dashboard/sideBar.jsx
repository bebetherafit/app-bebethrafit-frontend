import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/sidebar.css';
import profilePic from '../../assets/bebeimg.png';
import { ReactComponent as CommunityIcon} from '../../assets/icons/chat.svg';
import { ReactComponent as CustomerServiceIcon } from '../../assets/icons/contacts.svg';
import { ReactComponent as FindClinicIcon } from '../../assets/icons/email.svg';
import { ReactComponent as FitnessLogIcon } from '../../assets/icons/tasks.svg';
import { ReactComponent as AnalysisReportIcon } from '../../assets/icons/dashboard-active.svg';


const Sidebar = () => {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    // const [clinic, setClinic] = useState('');

    // useEffect(() => {
    //     fetch('/api/user')
    //         .then(response => response.json())
    //         .then(data => {
    //             setName(data.name);
    //             setEmail(data.email);
    //             setClinic(data.clinic);
    //         })
    //         .catch(error => console.error(error));
    // }, []);

    useEffect(() => {
        // Bearer 토큰을 헤더에 포함시켜 사용자 정보 요청
        const token = localStorage.getItem('access_token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.get('http://localhost:8000/api/user', config)
            .then(response => {
                setName(response.data.username);  // 백엔드에서 반환하는 필드명에 맞게 수정해야 합니다.
                setEmail(response.data.email);
                // setClinic(response.data.clinic);
                // setEmail, setClinic 등 필요한 데이터 설정
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebarHeader">
                <h2>나의 분석 리포트</h2>
            </div>
            <div className="sidebarAccount">
                <div className="sidebarAccountInfo">
                    <img src={profilePic} width={50} alt="user avatar" />
                    <div className='userInfo'>
                        <p>{username} | 베베센터</p>
                        <p>{email}</p>
                    </div>
                </div>
            </div>
            <div className="sidebarMenus">
    <ul>
        <li>
            <Link to="" className='sideMenuList'>
                <AnalysisReportIcon width={20} height={20} alt="analysis report" />
                분석 리포트
            </Link>
        </li>
        <li>
            <Link to="" className='sideMenuList'>
                <FitnessLogIcon width={20} height={20} alt='fitness log' />
                맞춤 성장 운동 기록
            </Link>
        </li>
        <li>
            <Link to="" className='sideMenuList'>
                <FindClinicIcon width={20} height={20} alt='find clinic' />
                센터 찾기
            </Link>
        </li>
        <li>
            <Link to="" className='sideMenuList'>
                <CustomerServiceIcon width={20} height={20} alt='customer service' />
                고객센터
            </Link>
        </li>
        <li>
            <Link to="" className='sideMenuList'>
                <CommunityIcon width={20} height={20} alt='community' />
                커뮤니티
            </Link>
        </li>
    </ul>
</div>
        </div>
    );
};

export default Sidebar;