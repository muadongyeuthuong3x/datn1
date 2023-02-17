import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from "./users/index"
import Login from './login';
import ListSubject from './listSubject/index'
import './App.css';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Users />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list-mon-hoc" element={<ListSubject />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;