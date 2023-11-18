import React, {useState, useEffect} from 'react';
import FootPressDistributeAns from '../components/dashboard/analysis/footPressDistributeAns';
import Details from '../components/dashboard/analysis/details';
import BodyBalance from '../components/dashboard/analysis/bodyBalanceAns';
import PeakPress from '../components/dashboard/analysis/PeakPressure';
import FootAreaAns from '../components/dashboard/analysis/AreaAnalysis';
import WeightBalance from '../components/dashboard/analysis/WeightBalance';
import './dashboard/analysisreport.css';
import config from '../config.json';
import axios from 'axios';

const BACKEND_URL = config.macBackend;
const AnalysisReport = () => {
    const [leftFootPress, setLeftFootPress] = useState({ total: 0, average: 0, area: 0 });
    const [rightFootPress, setRightFootPress] = useState({ total: 0, average: 0, area: 0 });
    const [leftFootArea] = useState([]);
    const [rightFootArea] = useState([]);
    const [leftFootPeak] = useState([]);
    const [rightFootPeak] = useState([]);

    useEffect(() => {
        const fetchFootPressData = async () => {
            try {
                const token = localStorage.getItem('access_token');
                console.log("Retrieved token:", token);
                if (!token) {
                    alert('로그인이 필요합니다.');
                    return;
                }
                const response = await axios.get(BACKEND_URL + '/api/diagnostic-data', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // 데이터 로드 확인
                console.log("id :",response.data[0].id);
                console.log("왼발 총압력값 :",response.data[0].left_foot_total_pressure);
                console.log("왼발 평균압력값 :",response.data[0].left_foot_average_pressure);
                console.log("왼발 면적 :",response.data[0].left_foot_area);
                console.log("오른발 총압력값 :",response.data[0].right_foot_total_pressure);
                console.log("오른발 평균압력값 :",response.data[0].right_foot_average_pressure);
                console.log("오른발 면적 :",response.data[0].right_foot_area);
                console.log("왼발 최대압력값 :",response.data[0].left_foot_peak_pressure);
                console.log("오른발 최대압력값 :",response.data[0].right_foot_peak_pressure);

                setLeftFootPress({
                    total: response.data[0].left_foot_total_pressure || 0,
                    average: response.data[0].left_foot_average_pressure || 0,
                    area: response.data[0].left_foot_area || 0,
                });
                setRightFootPress({
                    total: response.data[0].right_foot_total_pressure || 0,
                    average: response.data[0].right_foot_average_pressure || 0,
                    area: response.data[0].right_foot_area || 0,
                });
            } catch (error) {
                console.error('발 압력 데이터를 가져오는데 실패했습니다:', error);
            }
        };
        fetchFootPressData();
    }
    , []);


    return (
        <div className="dashboard-contents">
            <div className="dashboard-pressure-balance">
                <FootPressDistributeAns 
                    leftFootPress={leftFootPress || {}} 
                    rightFootPress={rightFootPress || {}} 
                />
                <BodyBalance />
            </div>
            <div>
                <Details title={'총 압력값'}/>
                <Details title={'압력 평균 값'}/>
            </div>
            <div>
                <PeakPress
                leftFootPeak={leftFootPeak || {}} 
                rightFootPeak={rightFootPeak || {}}
                />
                <FootAreaAns
                leftFootArea={leftFootArea || {}}
                rightFootArea={rightFootArea || {}} 
                />
                <WeightBalance />
            </div>
        </div>
    );
}
export default AnalysisReport;
