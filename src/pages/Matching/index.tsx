import React, { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "contexts/Login";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MatchingList } from "./matchingList";
import { MatchingMap } from "./matchingMap";

export const Matching = () => {
  const hobbyList = [
    "스포츠",
    "학습 및 연구",
    "야외 활동",
    "예술 및 공예",
    "기타",
  ];

  const sidoList = [
    "강원도",
    "경기도",
    "경상남도",
    "경상북도",
    "광주광역시",
    "대구광역시",
    "대전광역시",
    "부산광역시",
    "서울특별시",
    "세종특별자치시",
    "울산광역시",
    "인천광역시",
    "전라남도",
    "전라북도",
    "제주특별자치도",
    "충청남도",
    "충청북도",
  ];

  const [gugunList, setGugunList] = useState<{ gugunName: string }[]>([]);

  const user = {
    userId: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    name: useRef<HTMLInputElement>(null),
    birth: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    sidoName: useRef<HTMLSelectElement>(null),
    gugunName: useRef<HTMLSelectElement>(null),
    center: useRef<HTMLInputElement>(null),
  };

  const getGugun = async () => {
    const url = "http://localhost:80/uon/locations/guguns";

    const { data } = await axios.get(url, {
      params: {
        sidoName: user.sidoName.current?.value,
      },
    });

    console.log(data);
    setGugunList([]);
    setGugunList(data);
  };

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (id: number) => {
    setActiveTab((id + 1) % 2);
  };

  const tabs = [
    { id: 0, title: "지도로 보기", component: <MatchingList /> },
    { id: 1, title: "목록으로 보기", component: <MatchingMap /> },
  ];

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;
  const ActiveTile = tabs.find((tab) => tab.id === activeTab)?.title.toString();

  return (
    <div className="">
      <div className="px-5 flex justify-between mb-5">
        <FontAwesomeIcon icon={faAngleLeft} className="mt-1" />
        <p className="text-lg">6월 26일 수요일</p>
        <FontAwesomeIcon icon={faAngleRight} className="mt-1" />
      </div>
      <div className="flex space-x-3 mb-3 overflow-y-auto">
        <style>
          {`
          ::-webkit-scrollbar {
            display: none;
          }
        `}
        </style>
        <select
          required
          name="sidoName"
          className="border border-gray-500 rounded-full px-3 py-2"
        >
          <option hidden selected disabled value="">
            카테고리
          </option>
          {hobbyList.map((hobby) => (
            <option key={hobby} value={hobby}>
              {hobby}
            </option>
          ))}
        </select>
        <select
          required
          name="sidoName"
          ref={user.sidoName}
          onChange={getGugun}
          className="border border-gray-500 rounded-full px-3 py-2"
        >
          <option hidden selected disabled value="">
            시도 선택
          </option>
          {sidoList.map((sido) => (
            <option key={sido} value={sido}>
              {sido}
            </option>
          ))}
        </select>
        <select
          required
          name="gugunName"
          ref={user.gugunName}
          className="border border-gray-500 rounded-full px-3 py-2"
        >
          <option hidden selected disabled value="">
            구군 선택
          </option>
          {gugunList.map((gugun) => (
            <option key={gugun.gugunName} value={gugun.gugunName}>
              {gugun.gugunName}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between mb-4">
        <div
          className="flex space-x-2"
          onClick={() => handleTabClick(activeTab)}
        >
          <p className="text-gray-500">{ActiveTile}</p>
          <FontAwesomeIcon icon={faMap} className="mt-1 text-gray-500" />
        </div>
        <div className="flex space-x-2">
          <p className="text-gray-500">마감일 순</p>
          <p className="text-gray-500">최신 순</p>
        </div>
      </div>
      <div>{ActiveComponent}</div>
    </div>
  );
};
