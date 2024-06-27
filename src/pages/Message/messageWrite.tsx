import React, { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "contexts/Login";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import {
  faLeaf,
  faComments,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const MessageWrite = () => {
  return (
    <div className="px-5">
      <h1 className="mt-5 mb-3 text-left text-lg font-semibold">쪽지 보내기</h1>
      <div className="px-5 mt-10">
        <div className="flex justify-between my-4">
          <div className="bg-gray-100 rounded-xl px-6 py-4 space-y-3 w-full">
            <div className="flex space-x-2">
              <FontAwesomeIcon icon={faLeaf} />
              <p className="font-semibold">유저 정보</p>
            </div>
            <div className="flex space-x-5 place-items-center">
              <FontAwesomeIcon
                icon={faUserCircle}
                className="text-3xl text-gray-500"
              />
              <div className="text-left">
                <p className="text-sm">비전 트레이닝 센터</p>
                <p>김첨지</p>
              </div>
            </div>
          </div>
        </div>
        <textarea className="space-x-5 border border-gray-500 rounded-lg px-5 py-5 h-80 w-full" />
      </div>
      <p className="my-3">개인 정보를 보내는 것은 위험할 수 있습니다.</p>
      <button
        type="submit"
        className="bg-main-color text-white font-semibold px-6 py-3 mt-3 rounded-md shadow-lg"
      >
        보내기
      </button>
    </div>
  );
};
