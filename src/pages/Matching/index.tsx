import React, { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "contexts/Login";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import {
  faAngleLeft,
  faAngleRight,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MatchingList } from "./matchingList";
import { MatchingMap } from "./matchingMap";

export const Matching = () => {
  const hobbyList = ["스포츠", "학습, 연구", "야외 활동", "예술, 공예", "기타"];

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
  const { commonUrl } = useContext(UserContext);
  const { userInfo } = useContext(UserContext);
  const [gugunList, setGugunList] = useState<{ gugunName: string }[]>([]);
  const [matchList, setMatchList] = useState<any[]>([]);
  const [userSidoName, setUserSidoName] = useState(""); 
  const [userGugunName, setUserGugunName] = useState(""); 

  // 카테고리 => type
  // 0은 카테고리 없이 전체 호출
  // 나머지는 select에 넣어있는 순서대로 1, 2, 3, 4, 5
  const category = useRef<HTMLSelectElement>(null);
  const gugun = useRef<HTMLSelectElement>(null);
  const [order, setOrder] = useState(1);

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

  const cDate = useRef<HTMLParagraphElement>(null);
  const [parsingDate, setParsingDate] = useState("");
  const [parsingDongCode, setParsingDongCode] = useState();
  
  const [today, setToday] = useState(new Date());
  // const today = new Date();
  const weekday = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
  const formatDate = (dateString: any) => {
    // 입력된 dateString에서 월과 일을 추출하기 위한 정규식
    // 6월 30일 일요일 => 06-30, db에는 2024-06-30 이런식으로 저장되어 있음
    const regex = /(\d{1,2})월 (\d{1,2})일/;
    // 정규식을 이용하여 월과 일을 추출
    const match = regex.exec(dateString);

    if (!match) {
      throw new Error("Invalid date format");
    }

    // 추출된 월과 일을 변수에 담기
    const month = match[1].padStart(2, "0");
    const day = match[2].padStart(2, "0");

    // 원하는 형식으로 조합하여 반환
    return `${month}-${day}`;
  };

  const getGugun = async () => {
    const url = `${commonUrl}/locations/guguns`;

    const { data } = await axios.get(url, {
      params: {
        sidoName: user.sidoName.current?.value,
      },
    });

    setGugunList([]);
    setGugunList(data);
  };

  const getLocation = async () => {
    const url = `${commonUrl}/locations/names/${userInfo?.dongCode}`;
    const { data } = await axios.get(url);
    setUserSidoName(data.sidoName);
    setUserGugunName(data.gugunName);
    console.log("getLocation", data.sidoName)
  }
  // getLocation();

  // 카테고리 혹은 구군 선택(수정) 시 매칭 정보 불러오기
  const getMatchingList = async () => {
    // 먼저 선택한 시도와 구군으로 동코드 불러오기
    const dUrl = `${commonUrl}/locations/dongCodes`;
    const resp = await axios.get(dUrl, {
      params: {
        sidoName: user.sidoName.current?.value,
        gugunName: gugun.current?.value,
      },
    });
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const formattedDate = `${month}-${day}`;
    // 카테고리, 날짜, 동코드(선택한 시도, 구군)로 매칭데이터 불러오기
    const url = `${commonUrl}/activities/allSelect`;
    const { data } = await axios.get(url, {
      params: {
        type: category.current?.value,
        selectDate: "2024-" + formattedDate,
        parsingDongCode: resp.data,
        algo: order
      },
    });
    setMatchList(data);
  };

  // 맨 처음 화면 렌더링 시 매칭 데이터를 불러오기 위함
  // 기준은 회원가입 시 설정한 주소(동코드)
  const getFirstList = async () => {
    const url = `${commonUrl}/activities/allSelect`;
    // const today = new Date();
    const month =
      today.getMonth() + 1 < 10
        ? `0${today.getMonth() + 1}`
        : `${today.getMonth() + 1}`;
    const day = today.getDate();
    const formatedDay = day.toString().padStart(2, '0');

    const { data } = await axios.get(url, {
      params: {
        type: 0,
        selectDate: `2024-${month}-${formatedDay}`,
        parsingDongCode: userInfo?.dongCode.substring(0, 5),
        algo: order
      },
    });
    setMatchList(data);
    console.log("firstList", data);
  };
  // getFirstList();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (id: number) => {
    setActiveTab((id + 1) % 2);
  };

  // 시도 구군 매칭에 관한 데이터를 여기서 얻었기 때문에
  // props로 뿌림
  const tabs = [
    {
      id: 0,
      title: "지도로 보기",
      component: (
        <MatchingList
          matchList={matchList}
          sidoName={user.sidoName.current?.value as string}
          gugunName={gugun.current?.value as string}
        />
      ),
    },
    {
      id: 1,
      title: "목록으로 보기",
      component: (
        <MatchingMap
          matchList={matchList}
          sidoName={user.sidoName.current?.value as string}
          gugunName={gugun.current?.value as string}
        />
      ),
    },
  ];

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;
  const ActiveTile = tabs.find((tab) => tab.id === activeTab)?.title.toString();

  const prevDate = () => {
    const prevDay = new Date(today);
    prevDay.setDate(prevDay.getDate() - 1);
    setToday(prevDay);
  };

  const nextDate = () => {
    const nextDay = new Date(today);
    nextDay.setDate(nextDay.getDate() + 1);
    setToday(nextDay);
  };

  const orderZero = () => {
    setOrder(0);
    // getMatchingList();
  }
  const orderOne = () => {
    setOrder(1);
    // getMatchingList();
  }
  
  useEffect(() => {
    if (userInfo) {
      getFirstList();
    }
  }, [userInfo]);

  useEffect(() => {
    if (today || order)
      getMatchingList();
  }, [today, order])
  
  useEffect(() => {
    if (cDate.current) {
      setParsingDate(formatDate(cDate.current.textContent));
    }
  }, [cDate]);

  

  return (
    <div className="">
      <div className="px-5 flex justify-between mb-5">
        <FontAwesomeIcon onClick={prevDate} icon={faAngleLeft} className="mt-1" />
        <p className="text-lg" ref={cDate}>
          {today.getMonth()+1}월 {today.getDate()}일 {weekday[today.getDay()]}
        </p>
        <FontAwesomeIcon onClick={nextDate} icon={faAngleRight} className="mt-1" />
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
          ref={category}
          onChange={getMatchingList}
        >
          <option hidden selected disabled value="0">
            카테고리
          </option>
          {hobbyList.map((hobby, index) => (
            <option key={hobby} value={index + 1}>
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
          ref={gugun}
          className="border border-gray-500 rounded-full px-3 py-2"
          onChange={getMatchingList}
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
          {activeTab === 1 ? (
            <FontAwesomeIcon icon={faList} className="mt-1 text-gray-500" />
          ) : (
            <FontAwesomeIcon icon={faMap} className="mt-1 text-gray-500" />
          )}
        </div>
        <div className="flex space-x-2">
          <button onClick={orderZero}><p className="text-gray-500">마감일 순</p></button>
          <button onClick={orderOne}><p className="text-gray-500">최신 순</p></button>
        </div>
      </div>
      <div>{ActiveComponent}</div>
    </div>
  );
};
