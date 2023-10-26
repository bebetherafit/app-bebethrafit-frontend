import './App.css';
import React from 'react';
import LoginPage from './pages/loginPage';
import Dashboard from './pages/dashBoard';
import ServiceIntro from './pages/serviceIntro';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignupPage from './pages/signupPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/intro" element={<ServiceIntro />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
