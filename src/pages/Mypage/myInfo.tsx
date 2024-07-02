import React, { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "contexts/Login";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import { faUserCircle, faMedal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const MyInfo = () => {
  const { commonUrl } = useContext(UserContext);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  return (
    <div className="mb-10">
      <div className="bg-main-color bg-opacity-20 rounded-xl p-5 space-y-3">
        <div className="flex space-x-10 place-items-center">
          <div className="space-y-3 text-gray-500">
            <FontAwesomeIcon icon={faUserCircle} className="text-4xl " />
            <p className="text-xl">{userInfo?.name}</p>
          </div>
          <div className="text-left space-y-2">
            <div className="flex space-x-3 text-lg text-yellow-600">
              <p>레벨 {userInfo?.level}</p>
              <FontAwesomeIcon icon={faMedal} className="mt-1" />
            </div>
            <div>
              <div className="flex space-x-3">
                <p className="font-semibold">경험치</p>
                <p>{userInfo?.experience}</p>
              </div>
              <div className="flex space-x-3">
                <p className="font-semibold">포인트</p>
                <p>{userInfo?.point}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
