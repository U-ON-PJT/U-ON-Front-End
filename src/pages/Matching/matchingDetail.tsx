import React, { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "contexts/Login";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

declare global {
  interface Window {
    kakao: any;
  }
}

export const MatchingDetail = () => {
  useEffect(() => {
    let container = document.getElementById(`map`); // 지도를 담을 영역의 DOM 레퍼런스
    let options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도 중심 좌표
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };

    let map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
  }, []);

  const divStyle = {
    backgroundImage: 'url("/cardImg1.jpg")',
    backgroundSize: "cover", // 배경 이미지 크기를 맞춤
    backgroundPosition: "center", // 배경 이미지의 위치를 중심으로
    height: "18vh", // div의 높이를 설정
  };

  return (
    <div>
      <div style={divStyle}></div>
      <div className="px-5">
        <h1 className="mt-5 mb-3 text-left text-lg font-semibold">
          6월 26일 수요일 17:00
        </h1>
        <div className="flex justify-between align-middle place-items-center px-2 py-4">
          <p className="text-main-color font-semibold">풋살</p>
          <div className="text-left">
            <p>대전광역시 유성구 봉명동</p>
          </div>
          <button className="bg-main-color rounded-md px-3 py-3 text-white shadow-md">
            신청하기
          </button>
        </div>
        <div id="map" style={{ height: "150px" }} />
      </div>
    </div>
  );
};
