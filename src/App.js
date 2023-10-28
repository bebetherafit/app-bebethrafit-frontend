import './App.css';
import React, { useState } from 'react'; // useState 추가
import LoginPage from './pages/loginPage';
import Dashboard from './pages/dashBoard';
import ServiceIntro from './pages/serviceIntro';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignupPage from './pages/signupPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // 상태와 상태 설정 함수
  // 로그인에 성공했을 때 호출되는 함수
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);  
  };

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      alert('로그인이 필요합니다.');
      return <Navigate to="/login" />;
    }
    return children;
  }

  return (
    <Router basename="">
      <Routes>
      {/* // 로그인 성공 함수 전달 */}
        <Route path="login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />  
        <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="" element={<Navigate to="login" />} />
        <Route path="intro" element={<ServiceIntro />} />
        <Route path="signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
