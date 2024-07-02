import React, { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "contexts/Login";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  matchList: any[];
  sidoName: string;
  gugunName: string;
}

export const MatchingList: React.FC<Props> = ({
  matchList,
  gugunName,
  sidoName,
}) => {
  const { userInfo } = useContext(UserContext);
  const hobbyList = ["스포츠", "학습, 연구", "야외 활동", "예술, 공예", "기타"];

  return (
    <div className="">
      {/* 렌더링 될 때 바로 데이터가 가져와지지 않기 때문에
      이런식으로 사용 */}
      {matchList.length > 0 ? (
        <div>
          {matchList.map((match, index) => (
            <div
              key={match.activityId}
              className="flex justify-between align-middle border-b border-gray-500 py-4"
            >
              <div>
                <p className="font-semibold">
                  {match.activityDate.split(" ")[1].substring(0, 5)}{" "}
                </p>
                <p className="text-main-color font-semibold max-w-10">
                  {hobbyList[match.type]}
                </p>
              </div>
              <div className="text-left">
                <p className="font-semibold">{match.title}</p>
                <p>{match.activityAddress}</p>
                <p>
                  인원: {match.currentParticipant} / {match.maxParticipant}
                </p>
              </div>
              {match.isDeadLine ? (
                <div className="bg-gray-500 rounded-md px-3 py-3 text-white shadow-md max-h-12">
                  신청 불가
                </div>
              ) : (
                <Link
                  to={`/matching/${match.activityId}`}
                  className="bg-main-color rounded-md px-3 py-3 text-white shadow-md max-h-12"
                >
                  신청 가능
                </Link>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>매치가 존재하지 않습니다. 지역과 날짜를 선택해주세요</div>
      )}
      <Link to={"/matching/write"}>
        <div className="bg-main-color py-5 px-6 shadow-lg rounded-full fixed left-5 bottom-5 z-10">
          <FontAwesomeIcon icon={faPencil} className="text-white" />
        </div>
      </Link>
    </div>
  );
};
