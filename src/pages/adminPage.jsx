import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // JWT 토큰을 로컬 스토리지에서 가져옵니다.
        const token = localStorage.getItem('access_token');

        // 사용자 목록을 가져오는 함수
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/users', {
                    headers: {
                        'Authorization': `Bearer ${token}`  // 토큰을 사용하여 인증
                    }
                });
                setUsers(response.data);  // 상태를 업데이트하여 사용자 목록을 저장
            } catch (error) {
                console.error('사용자 목록을 가져오는 중 오류가 발생했습니다.', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>사용자 목록</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.username} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPage;
