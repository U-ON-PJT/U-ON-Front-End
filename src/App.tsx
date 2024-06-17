import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Login } from "pages/Login";
import { useNavigate } from "react-router-dom";
import { Header } from 'components/Header';
import { Signup } from "pages/Signup"

function App() {

  return (
    
    <div className="App">
        <Routes>
          <Route path='/'
            element={
                <Header />
              }
            ></Route>
          <Route path='/login'
          element={
              <Login />
            }
        ></Route>
          <Route path='/sign-up'
          element={
              <Signup />
            }
        ></Route>
      </Routes>
      
    </div>
  );
}

export default App;
