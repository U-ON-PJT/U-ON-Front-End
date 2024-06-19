import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import { UserContext } from "contexts/Login";
import { useNavigate } from "react-router-dom";
import { Header } from "components/Header";
export const Login = () => {
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const user = {
        userId: useRef<HTMLInputElement>(null),
        password: useRef<HTMLInputElement>(null),
    }


    const loginInfo = async () => {
        const userId = user.userId.current?.value;
        const password = user.password.current?.value;
        
        if(userId && password){
            login(userId, password);
        }
        navigate("/");
    }

    return (
        <div>
            <Header />
            
            <label htmlFor="userId">아이디:</label>
            <input type="text" name="userId" ref={user.userId} />
            <br />
            <label htmlFor="password">비밀번호:</label>
            <input type="password" name="password" ref={user.password} />
            <br />
            <button onClick={loginInfo}>제출</button>
        </div>
    )
}