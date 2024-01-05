import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/NewbieDataForm.css';
import config from '../config.json';

const BACKEND_URL = config.macBackend;

const InfoSurvey = () => {
    const [user, setUser] = useState(null);
    const [questions, setQuestions] = useState([]); // 질문 목록을 저장할 상태
    const [answers, setAnswers] = useState({}); // 모든 답변을 저장할 상태

    // 사용자 정보 불러오기
    useEffect(() => {
        const fetchUserAndQuestions = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) {
                alert('로그인이 필요합니다.');
                return;
            }
            try {
                const user_response = await axios.get(`${BACKEND_URL}/api/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': `application/json`,
                        'ngrok-skip-browser-warning': '69420',
                    }
                });
                setUser(user_response.data);

                // 질문 목록 불러오기
                const questions_response = await axios.get(`${BACKEND_URL}/api/survey`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': `application/json`,
                        'ngrok-skip-browser-warning': '69420',
                    }
                });
                setQuestions(questions_response.data); // 상태에 질문 목록 저장
            } catch (error) {
                console.error("API 호출 중 오류 발생:", error);
            }
        };
        fetchUserAndQuestions();
    }, []);

    // 답변 저장 핸들러
    const handleInputChange = (questionId, value) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: value
        }));
    };

    // 양식 제출 핸들러
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`${BACKEND_URL}/api/submit-answers`, {
                userId: user.id, // 사용자 ID
                answers // 모든 답변
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': `application/json`,
                }
            });
            alert('답변이 제출되었습니다.');
        } catch (error) {
            console.error("답변 제출 중 오류 발생:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {questions.map(question => (
                <div key={question.id}>
                    <label htmlFor={`question-${question.id}`}>{question.text}</label>
                    <input
                        id={`question-${question.id}`}
                        type="text"
                        value={answers[question.id] || ''}
                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                    />
                </div>
            ))}
            <button type="submit">제출</button>
        </form>
    );
}

export default InfoSurvey;
