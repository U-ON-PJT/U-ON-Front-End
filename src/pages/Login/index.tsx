import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import { UserContext } from "contexts/Login";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
export const Login = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const user = {
    userId: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
  };

  const loginInfo = async () => {
    const userId = user.userId.current?.value;
    const password = user.password.current?.value;

    if (userId && password) {
      login(userId, password);
    }
    navigate("/");
  };

  return (
    <div className="absolute top-1/2 -translate-y-1/2 px-10 py-4">
      <h1 className="text-left font-semibold text-lg">로그인</h1>
      <div className="space-y-5 mt-20 mb-16">
        <input
          type="text"
          name="userId"
          ref={user.userId}
          placeholder="아이디"
          className="bg-gray-100 rounded-md px-5 py-4 w-full"
        />
        <input
          type="password"
          name="password"
          ref={user.password}
          placeholder="비밀번호"
          className="bg-gray-100 rounded-md px-5 py-4 w-full"
        />
      </div>
      <button
        onClick={loginInfo}
        className="bg-main-color w-full text-white font-semibold py-5 rounded-md shadow-lg"
      >
        로그인
      </button>
      <div className="mt-5 text-gray-500">
        <a href="">비밀번호 재설정 </a>
        <span> | </span>
        <Link to="/sign-up">회원가입</Link>
      </div>
    </div>
  );
};
