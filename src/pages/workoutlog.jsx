import React, { useState, useEffect } from "react";
import BodyBalance from "../components/workoutlog/BodyBalance";
import FootType from "../components/workoutlog/FootType";
import ObesityIndex from "../components/workoutlog/ObesityIndex";
import "../styles/workoutlog.css";

const ExerciseList = () => {
    const [exercises, setExercises] = useState([]);
    const [completedExercises, setCompletedExercises] = useState({});
    const [isLoading, setIsLoading] = useState(true); // State to track loading status
  
    useEffect(() => {
      setIsLoading(true); // Set loading to true before fetching data
      // Replace with your actual endpoint
      fetch('https://your-server.com/exercises')
        .then((response) => response.json())
        .then((data) => {
          setExercises(data);
          setIsLoading(false); // Set loading to false after fetching data
        })
        .catch((error) => {
          console.error('Error fetching exercises:', error);
          setIsLoading(false); // Ensure loading is set to false even if there is an error
        });
    }, []);
  
    const handleCheckboxChange = (exerciseId) => {
      setCompletedExercises({
        ...completedExercises,
        [exerciseId]: !completedExercises[exerciseId],
      });
    };
  
    // Display message if exercises are empty and not loading
    if (!isLoading && exercises.length === 0) {
      return <h2>오늘의 추천 운동이 없습니다</h2>;
    }
  
    return (
      <div>
        <h2>오늘의 운동 체크리스트</h2>
        {exercises.map((exercise) => (
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
        ))}
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
                    <ObesityIndex />
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
