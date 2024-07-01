import React, { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "contexts/Login";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ApplyList = () => {
  const { commonUrl } = useContext(UserContext);
  const { userInfo } = useContext(UserContext);
  const [makeList, setMakeList] = useState<any[]>();
  const [applyList, setApplyList] = useState<any[]>();
  const hobbyList = ["스포츠", "학습, 연구", "야외 활동", "예술, 공예", "기타"];
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const getMyList = async () => {
    if (token) {
      getMakeList();
      getApplyList();
    } else {
      alert("로그인 해주세요");
      navigate("/login");
    }
  };

  const getMakeList = async () => {
    const url = `${commonUrl}/activities/my-matching-room`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("생성 리스트: " + data);
    setMakeList(data);
  };

  const getApplyList = async () => {
    const url = `${commonUrl}/activities/my-enter-matching-room`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("참가 리스트: " + data);
    setApplyList(data);
  };

  useEffect(() => {
    getMyList();
  }, []);

  return (
    <div className="px-10 my-10">
      <div className="mb-10">
        <h1 className="mb-5 text-left text-lg font-semibold">
          내가 등록한 매칭
        </h1>
        {makeList
          ? makeList.map((list, index) => (
              <div
                key={list.activityId}
                className={`flex text-left space-x-5 px-5 py-3 ${
                  index % 2 === 0 ? "bg-gray-100" : ""
                }`}
              >
                <Link to={`/matching/${list.activityId}`}>{list.title}</Link>
              </div>
            ))
          : null}
      </div>
      <div>
        <h1 className="mb-5 text-left text-lg font-semibold">
          내가 신청한 매칭
        </h1>
        {applyList
          ? applyList.map((list, index) => (
              <div
                key={list.activityId}
                className={`flex text-left space-x-5 px-5 py-3 ${
                  index % 2 === 0 ? "bg-gray-100" : ""
                }`}
              >
                <Link to={`/matching/${list.activityId}`}>{list.title}</Link>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
