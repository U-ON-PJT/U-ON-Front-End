import React, { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "contexts/Login";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "components/Header";

export const Password = () => {

  const user = {
    oldPassword: useRef<HTMLInputElement>(null),
    newPassword: useRef<HTMLInputElement>(null)
  }
  const navigate = useNavigate();
  const { commonUrl } = useContext(UserContext);

  const updatePassword = () => {
    if (window.confirm("비밀번호를 바꾸시겠습니까?")) {
      const url = `${commonUrl}/users/password`;
      const token = localStorage.getItem("token");
      try {
        axios.put(url, {
            password: user.oldPassword.current?.value,
            newPassword: user.newPassword.current?.value,
        },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        localStorage.removeItem("token");
        navigate("/login");
      } catch (error) {
        alert("비밀번호 변경에 실패했습니다.")
      }
    }
  }      
    
  return (
    <div className="px-10 py-20">
      <h1 className="text-left font-semibold text-lg">내 정보 수정</h1>
      <form onSubmit={updatePassword}>
        <div className="space-y-6 mt-10 text-left">
          <div>
            <label htmlFor="oldPassword" className="text-sm text-gray-500">
              기존 비밀번호 *
            </label>
            <input
              required
              type="password"
              name="oldPassword"
              ref={user.oldPassword}
              className="bg-gray-100 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="text-sm text-gray-500">
              새로운 비밀번호 *
            </label>
            <input
              required
              type="password"
              name="name"
              ref={user.newPassword}
              className="bg-gray-100 rounded-md px-3 py-2 w-full"
            />
          </div>
          
        <button
          type="submit"
          className="bg-main-color text-white font-semibold px-6 py-3 mt-10 rounded-md shadow-lg"
        >
          수정하기
          </button>
          </div>
      </form>
    </div>
  );
};
