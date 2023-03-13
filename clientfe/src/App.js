import React from 'react';
import { BrowserRouter, Route, Routes ,Switch } from 'react-router-dom';
import Users from "./users/index"
import Login from './login';
import ListSubject from './listSubject/index'
import ListExam from './exam/index'
import ListExamForm from './examForm/index'
import ListTeacher from './teacher/index'
import ListRoom from './examinationRoom/index'
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import ScheduleTest from './scheduleTest/index';
import StudentScore from './studentscore/index';
import ExamBlock from './examBlock/index'
import ListScoreStudent from './editScoreStudent/index';
import ScoreStatistic from './scoreStatistics/index';

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
        <Route path="/student-score" element={<StudentScore />} />
        <Route path="/exam-block" element={<ExamBlock />} />
        <Route path="/edit-score" element={<ListScoreStudent />} />
        <Route path="/tt-score-student" element={<ScoreStatistic />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;