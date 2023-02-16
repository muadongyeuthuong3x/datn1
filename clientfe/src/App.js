import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashBoard from './dashboard/index';
import Login from './login';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      { console.log(process.env.REACT_APP_MY_ENVIRONMENT_VARIABLE)}
        <Routes>
          <Route path="/dashboard" element={ <DashBoard />} />
          <Route path="/login" element={ <Login />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;