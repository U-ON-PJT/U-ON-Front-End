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
        <div className="flex justify-between my-4 place-items-center">
          <div className="bg-gray-100 rounded-xl px-4 py-3 space-y-3">
            <div className="flex space-x-2">
              <FontAwesomeIcon icon={faLeaf} />
              <p className="font-semibold">유저 정보</p>
            </div>
            <div className="flex space-x-3 place-items-center">
              <FontAwesomeIcon
                icon={faUserCircle}
                className="text-3xl text-gray-500"
              />
              <div className="text-left">
                <p className="text-sm">비전 트레이닝 센터</p>
                <p>김첨지</p>
              </div>
              <div className="text-main-color">
                <FontAwesomeIcon icon={faComments} className="text-xl" />
                <p className="text-sm">문의하기</p>
              </div>
            </div>
          </div>
          <div className="border rounded-xl border-gray-500 px-6 py-5 place-items-center space-y-2">
            <p className="font-semibold">인원</p>
            <p className="text-lg">2 / 6</p>
          </div>
        </div>
        <div className="text-left">
          <p className="my-5 text-lg font-semibold text-gray-500">
            경험치 정보
          </p>
          <div className="flex place-content-center place-items-center space-x-5 border border-gray-500 rounded-lg px-5 py-4">
            <div className="border border-gray-500 rounded-full px-5 py-4">
              <FontAwesomeIcon
                icon={faTrophy}
                className="text-lg text-gray-500"
              />
            </div>
            <div>
              <p>참가자 전원 50p</p>
              <p>승리팀 추가 20p</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
