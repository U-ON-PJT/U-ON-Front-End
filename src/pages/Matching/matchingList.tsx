import React, { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "contexts/Login";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  matchList: any[];
  sidoName: string;
  gugunName: string;
}

export const MatchingList: React.FC<Props> = ({ matchList, gugunName, sidoName }) => {
  const { userInfo } = useContext(UserContext);

  
  return (
    <div className="">
      {matchList.length > 0 ? 
        <div>{matchList[0].activityId}</div> :
        null
      }
      <div className="flex justify-between align-middle border-b border-gray-500 py-4">
        <p className="font-semibold">17:00</p>
        <p className="text-main-color font-semibold">풋살</p>
        <div className="text-left">
          <p>대전광역시 유성구 봉명동</p>
          <p>인원: 2 / 6</p>
        </div>
        <Link
          to="/matching"
          className="bg-main-color rounded-md px-3 py-3 text-white shadow-md"
        >
          신청 가능
        </Link>
      </div>
      <div className="flex justify-between align-middle border-b border-gray-500 py-4">
        <p className="font-semibold">17:00</p>
        <p className="text-main-color font-semibold">풋살</p>
        <div className="text-left">
          <p>대전광역시 유성구 봉명동</p>
          <p>인원: 6 / 6</p>
        </div>
        <Link
          to="/matching"
          className="bg-gray-500 rounded-md px-3 py-3 text-white shadow-md"
        >
          신청 불가
        </Link>
      </div>
    </div>
  );
};
