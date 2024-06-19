import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Login } from "pages/Login";
import { useNavigate } from "react-router-dom";
import { Header } from 'components/Header';
import { Signup } from "pages/Signup"
import { Main } from 'pages/Main';
import { Board } from 'pages/Board';
import { BoardDetail } from 'pages/Board/boardDetail';

function App() {

  return (
    
    <div className="App">
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/sign-up' element={<Signup />}></Route>
          <Route path='/board' element={<Board />}></Route>
          <Route path='/board/:boardId' element={<BoardDetail />}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
