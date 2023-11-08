import React from "react";
import BodyBalance from "../components/workoutlog/BodyBalance";
import FootType from "../components/workoutlog/FootType";
import ObesityIndex from "../components/workoutlog/ObesityIndex";

function WorkoutLog () {
    return (
        <div>
            <div>
                <h1>금쪽이 신체 성장 종합 분석</h1>
                <div>
                    <BodyBalance />
                    <FootType />
                    <ObesityIndex />
                </div>
            </div>
            <div>
                <h1>올바른 성장 습관 운동 리스트</h1>
            </div>
        </div>
      );
    }
export default WorkoutLog;

