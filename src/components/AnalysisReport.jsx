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
                setLeftFootPress({
                    total: response.data.leftFootPress.total || 0,
                    average: response.data.leftFootPress.average || 0,
                    area: response.data.leftFootPress.area || 0,
                });
                setRightFootPress({
                    total: response.data.rightFootPress.total || 0,
                    average: response.data.rightFootPress.average || 0,
                    area: response.data.rightFootPress.area || 0,
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
