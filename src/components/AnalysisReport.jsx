import React, {useState, useEffect} from 'react';
import FootPressDistributeAns from '../components/dashboard/analysis/footPressDistributeAns';
import DetailsPrs from '../components/dashboard/analysis/details';
import DetailsAvg from '../components/dashboard/analysis/details';
import BodyBalance from '../components/dashboard/analysis/bodyBalanceAns';
import PeakPress from '../components/dashboard/analysis/PeakPressure';
import FootAreaAns from '../components/dashboard/analysis/AreaAnalysis';
// import WeightBalance from '../components/dashboard/analysis/WeightBalance';
import './dashboard/analysisreport.css';
import config from '../config.json';
import axios from 'axios';

const BACKEND_URL = config.macBackend;
const AnalysisReport = () => {
    const [leftFoot, setLeftFoot] = useState({ total: 0, average: 0, area: 0, imbalance: 0, cell: 0, peak: 0, peak_loc: null });
    const [rightFoot, setRightFoot] = useState({ total: 0, average: 0, area: 0, imbalance: 0, cell: 0, peak: 0, peak_loc: null });
    // 데이터 형식변환
    const safeToFixed = (value, digits) => {
        if (typeof value === 'number') {
          return value.toFixed(digits);
        }
        // 숫자가 아닐 경우 함수를 호출하지 않고, 원래의 값을 그대로 반환하거나, 
        // 여기서 다른 처리를 할 수 있습니다 (예: null 반환, 에러 로깅 등).
        return value; 
      };
    console.log("데이터 초기값 확인 :", leftFoot, rightFoot);
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
                        Authorization: `Bearer ${token}`,
                        'Content-Type': `application/json`,
                        'ngrok-skip-browser-warning': '69420',
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
                console.log("왼발 균형 값 :", response.data[0].left_body_balance);
                console.log("오른발 균형 값 :", response.data[0].right_body_balance);
                setLeftFoot({
                    total: safeToFixed(response.data[0].left_foot_total_pressure, 2),
                    average: safeToFixed(response.data[0].left_foot_average_pressure, 2),
                    area: safeToFixed(response.data[0].left_foot_area, 2),
                    imbalance: safeToFixed(response.data[0].left_body_balance, 2),
                    peak : safeToFixed(response.data[0].left_foot_peak_pressure, 2),
                    peak_loc : response.data[0].left_foot_peak_location,
                    cell : response.data[0].left_foot_cell_count,

                });
                setRightFoot({
                    total: safeToFixed(response.data[0].right_foot_total_pressure, 2),
                    average: safeToFixed(response.data[0].right_foot_average_pressure, 2),
                    area: safeToFixed(response.data[0].right_foot_area, 2),
                    imbalance: safeToFixed(response.data[0].right_body_balance, 2),
                    peak : safeToFixed(response.data[0].right_foot_peak_pressure, 2),
                    peak_loc : response.data[0].right_foot_peak_location,
                    cell : response.data[0].right_foot_cell_count,
                });
            } catch (error) {
                console.error('발 압력 데이터를 가져오는데 실패했습니다:', error);
            }
        };
        fetchFootPressData();
    }
    , []);
    console.log("After Imbalance :", leftFoot.imbalance, rightFoot.imbalance);
    console.log("After cell :", leftFoot.cell, rightFoot.cell); 
    return (
        <div className="dashboard-contents">
            <div className="dashboard-pressure-balance">
                <FootPressDistributeAns
                    leftFootPress={leftFoot.total}
                    leftFootAverage={leftFoot.average}
                    leftFootArea={leftFoot.area}
                    rightFootPress={rightFoot.total}
                    rightFootAverage={rightFoot.average}
                    rightFootArea={rightFoot.area}
                />
                <BodyBalance
                    leftbalance={leftFoot.imbalance} // 값이 출력되지 않음
                    rightbalance={rightFoot.imbalance}
                />
            </div>
            <div>
                <DetailsPrs
                title={'총 압력값'}
                leftFootData={leftFoot.total}
                rightFootData={rightFoot.total}
                />
                <DetailsAvg
                title={'압력 평균 값'}
                leftFootData={leftFoot.average}
                rightFootData={rightFoot.average}
                />
            </div>
            <div>
                <PeakPress
                leftFootPeak={leftFoot.peak}
                rightFootPeak={rightFoot.peak}
                leftFootPeakLoc={leftFoot.peak_loc}
                rightFootPeakLoc={rightFoot.peak_loc}  

                />
                <FootAreaAns
                leftFootArea={leftFoot.area}
                rightFootArea={rightFoot.area}
                leftFootCell={leftFoot.cell}
                rightFootCell={rightFoot.cell}

                />
                {/* <WeightBalance /> */}
            </div>
        </div>
    );
}
export default AnalysisReport;
