import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from "./users/index"
import Login from './login';
import ListSubject from './listSubject/index'
import ListExam from './exam/index'
import ListExamForm from './examForm/index'
import ListTeacher from './teacher/index'
import ListRoom from './examinationRoom/index'
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import ScheduleTest from './scheduleTest/index'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Users />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list-khoi" element={<ListSubject />} />
        <Route path="/list-exam" element={<ListExam />} />
        <Route path="/exam-form" element={<ListExamForm />} />
        <Route path="/list-teacher" element={<ListTeacher />} />
        <Route path="/form-room" element={<ListRoom />} />
        <Route path="/schedule-test" element={<ScheduleTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;