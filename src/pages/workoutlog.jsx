import React, { useState, useEffect } from "react";
import BodyBalance from "../components/workoutlog/BodyBalance";
import FootType from "../components/workoutlog/FootType";
import ObesityIndex from "../components/workoutlog/ObesityIndex";
import "../styles/workoutlog.css";
import axios from "axios";
import config from "../config.json";

const BACKEND_URL = config.macBackend;
const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  // const [completedExercises, setCompletedExercises] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const fetchExercises = async () => {
          setIsLoading(true);
          try {
              const token = localStorage.getItem('access_token');
              console.log("Retrieved token:", token);
              if (!token) {
                  alert('인증시간이 만료되었습니다.');
                  return;
              }
              const response = await axios.get(BACKEND_URL + '/api/analysis/bmi', {
                  headers: {
                      Authorization: `Bearer ${token}`
                  }
              });
              localStorage.setItem('token', response.data.access_token);
              setExercises(response.data);
              console.log("오늘의 추천 운동 데이터 :", response.data);
          } catch (error) {
              console.error("API 호출 중 오류 발생:", error);
              setExercises([]);
          } finally {
              setIsLoading(false);
          }
      };
      fetchExercises();
  }, []);

  // const handleCheckboxChange = (exerciseId) => {
  //     setCompletedExercises({
  //         ...completedExercises,
  //         [exerciseId]: !completedExercises[exerciseId],
  //     });
  // };

  if (!isLoading && exercises.length === 0) {
      return <h2>오늘의 추천 운동이 없습니다</h2>;
  }

  return (
      <div>
          <h2>오늘의 운동 체크리스트</h2>
          {/* {exercises.map((exercise) => (
              <div key={exercise.id}>
                  <label>
                      <input
                          type="checkbox"
                          checked={!!completedExercises[exercise.id]}
                          onChange={() => handleCheckboxChange(exercise.id)}
                      />
                      {exercise.name}
                  </label>
              </div>
          ))} */}
      </div>
  );
};


// WorkoutLog component
function WorkoutLog () {
    return (
        <div className="dashboard-content">
            <div className="BodyGrowthAnalysisContainer">
                <h1>금쪽이 신체 성장 종합 분석</h1>
                <div className="BodyGrowthAnalysis">
                    <FootType />
                    <BodyBalance />
                    <ObesityIndex 
                        obesityValue={0}
                    />
                </div>
            </div>
            <div className="GrowthWorkOutContainer">
                <h1>올바른 성장 습관 운동 리스트</h1>
                {/* Here we include the ExerciseList component */}
                <ExerciseList />
            </div>
        </div>
      );
}

export default WorkoutLog;
