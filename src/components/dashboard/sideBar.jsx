import React, { useState, useEffect } from 'react';
import '../../styles/sidebar.css';
import profilePic from '../../assets/bebeimg.png';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [clinic, setClinic] = useState('');

    useEffect(() => {
        fetch('/api/user')
            .then(response => response.json())
            .then(data => {
                setName(data.name);
                setEmail(data.email);
                setClinic(data.clinic);
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
                        <p>{name} | {clinic}</p>
                        <p>{email}</p>
                    </div>
                </div>
            </div>
            <div className="sidebarMenus">
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
                        <Link to="#">고객센터</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;