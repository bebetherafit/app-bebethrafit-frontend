import React, { useState, useEffect } from "react";
import ObesityIndex from "../components/workoutlog/ObesityIndex";
import BodyBalance from "../components/workoutlog/BodyBalance";
import FootType from "../components/workoutlog/FootType";
import axios from "axios";
import config from "../config.json";
import "../styles/workoutlog.css";

const BACKEND_URL = config.macBackend;

// WorkoutLog 컴포넌트
function WorkoutLog() {
    const [bmi, setBmi] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBmi = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    alert('인증시간이 만료되었습니다.');
                    return;
                }
                const response = await axios.get(BACKEND_URL + '/api/analysis/bmi', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': '69420'
                    }
                });
                setBmi(response.data);
            } catch (error) {
                console.error("BMI 데이터 호출 중 오류 발생:", error);
                setBmi(0);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBmi();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isLoading && bmi === 0) {
        return <h2>오늘의 추천 운동이 없습니다</h2>;
    }

    return ( 
        <div className="dashboard-content">
            <div className="BodyGrowthAnalysisContainer">
                <h1>금쪽이 신체 성장 종합 분석</h1>
                <div className="BodyGrowthAnalysis">
                    <ObesityIndex obesityValue={bmi} />
                    <FootType />
                    <BodyBalance />
                </div>
            </div>
        </div>
    );
}

export default WorkoutLog;
