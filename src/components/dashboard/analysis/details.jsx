import React, {useState, useEffect} from 'react';
import axios from  'axios';


const ProgressBar = ({ progress }) => {
    const containerStyles = {
        height: 30,
        width: '100%',
        backgroundColor: "#e0e0de",
        borderRadius: 5,
        margin: 50
    }

    const fillerStyles = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: "#00adb5",
        borderRadius: 'inherit',
        textAlign: 'right'
    }

    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    }

    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                <span style={labelStyles}>{`${progress}%`}</span>
            </div>
        </div>
    );
}

const FootPressDetails = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 여기에 실제 API 엔드포인트 URL을 입력하세요.
                const response = await axios.get('/api/user/foot-pressure', {
                    headers: {
                        'Authorization': `Bearer YOUR_USER_TOKEN` // 인증 토큰을 추가하세요.
                    }
                });
                setUserData(response.data);
            } catch (error) {
                console.error("API 호출 중 오류 발생:", error);
            }
        };

        fetchData();
    }, []);

    if (!userData) {
        return <div>정보가 없습니다.</div>; // 데이터 로딩 중일 때의 표시
    }

    if (!userData.Authorization) {
        return <div>로그인이 필요합니다.</div>; // 로그인하지 않았을 때의 표시
    }

    return (
        <div className="Details-container">
            <div className="TotalPressure">
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <h3>총 압력 값</h3>
                <p style={{weight: 'bold'}}>(Total Pressure)</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <ProgressBar progress={60} />
                <ProgressBar progress={60} />
            </div>
            </div>
            <div className="AveragePressure">
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <h3>압력 평균 값</h3>
                    <p style={{weight: 'bold'}}>(Average Pressure)</p>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <ProgressBar progress={50} />
                    <ProgressBar progress={60} />
                </div>
            </div>
            <div className="AreaNums">
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <h3>면적 수</h3>
                    <p style={{weight: 'bold'}}>(N/10)</p>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <ProgressBar progress={60} />
                    <ProgressBar progress={60} />
                </div>
            </div>
            <div className="ArchAreas">
                <h3>발 아치 면적</h3>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <ProgressBar progress={60} />
                    <ProgressBar progress={60} />
                </div>
            </div>
        </div>
    );
}


export default FootPressDetails;
