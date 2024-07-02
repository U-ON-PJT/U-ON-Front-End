import React, { useState, useRef, useContext, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { UserContext } from "contexts/Login";
import { useNavigate, useParams } from "react-router-dom";
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

export const MatchingDetail: React.FC = () => {
  const [matching, setMatching] = useState<any>(null);
  const [leader, setLeader] = useState<any>(null);
  const { commonUrl } = useContext(UserContext);
  const { userInfo } = useContext(UserContext);
  const { activityId } = useParams();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const getMatching = async () => {
    const url = `${commonUrl}/activities/detail/${activityId}`;
    const { data } = await axios.get(url);

    const regex = /[^\u3131-\u3163\uac00-\ud7a3\s-]+/g;
    const koreanPart = data.activityAddress
      .replace(regex, "")
      .replace(/-/g, "");
    setMatching(data);
    console.log(data);
  };

  const getUserInfo = async () => {
    const userId = matching.userId;
    const url = `${commonUrl}/users/others/${userId}`;
    const token = localStorage.getItem("token");
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setLeader(data);
    console.log(data);
    console.log(userInfo?.userId);
  };

  useEffect(() => {
    getMatching();
  }, []);

  useEffect(() => {
    if (matching) {
      getUserInfo();
    }
  }, [matching]);

  useEffect(() => {
    if (mapRef.current && window.kakao) {
      const container = mapRef.current;
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도 중심 좌표
        level: 3, // 지도의 레벨(확대, 축소 정도)
      };

      const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
      const geocoder = new window.kakao.maps.services.Geocoder();
      const ps = new window.kakao.maps.services.Places();

      geocoder.addressSearch(
        matching.activityAddress,
        function (result: any, status: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(
              result[0].y,
              result[0].x
            );
            const marker = new window.kakao.maps.Marker({
              map: map,
              position: coords,
            });

            marker.setMap(map);

            map.setCenter(coords);
          }
        }
      );
    }
  }, [matching]);

  const applyMatching = async () => {
    if (window.confirm("신청하시겠습니까?")) {
      const url = `${commonUrl}/activities/participants/${activityId}`;
      const token = localStorage.getItem("token");
      try {
        const resp = await axios.post(
          url,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(resp);
        alert("신청되었습니다.");
      } catch (error: any) {
        if (error.response && error.response.status) {
          console.log(error.response);
        }
      }
    }
  };

  const deleteMatching = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      const url = `${commonUrl}/activities/${activityId}`;
      const token = localStorage.getItem("token");
      try {
        axios.delete(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("삭제했습니다.");
        navigate("/");
      } catch (error) {}
    }
  };

  const completeMatching = () => {
    if (window.confirm("활동 완료?")) {
      const activityDate = new Date(matching.activityDate);
      const currentDate = new Date();
      if (currentDate < activityDate) {
        alert("활동 시간이 이전입니다.");
      } else {
        const url = `${commonUrl}/activities/complete/${activityId}`;
        const token = localStorage.getItem("token");
        try {
          axios.put(
            url,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          alert("활동을 완료했습니다.");
          navigate(`/matching/${activityId}`);
        } catch (error) {}
      }
    }
  };

  const divStyle = {
    backgroundImage: 'url("/cardImg1.jpg")',
    backgroundSize: "cover", // 배경 이미지 크기를 맞춤
    backgroundPosition: "center", // 배경 이미지의 위치를 중심으로
    height: "18vh", // div의 높이를 설정
  };

  const hobbyList = ["스포츠", "학습, 연구", "야외 활동", "예술, 공예", "기타"];

  return (
    <div>
      {matching ? (
        <div className="mb-20">
          <div style={divStyle}></div>
          <div className="px-5">
            <h1 className="mt-5 mb-3 text-left text-lg font-semibold text-gray-500">
              {matching.activityDate}
            </h1>
            <div className="flex justify-between space-x-3">
              <p className="text-main-color text-lg ">
                {hobbyList[matching.type]}
              </p>
              <h1 className="text-left text-lg font-semibold">
                {matching.title}
              </h1>
              {matching.isCompleted == 0 ? (
                matching.isDeadline == 1 ? (
                  <div className="bg-gray-500 rounded-md px-3 py-3 text-white shadow-md max-h-12">
                    신청 불가
                  </div>
                ) : (
                  <button
                    onClick={applyMatching}
                    className="bg-main-color rounded-md px-3 py-3 text-white shadow-md max-h-12"
                  >
                    신청하기
                  </button>
                )
              ) : (
                <div className="bg-blue-900 rounded-md px-3 py-3 text-white shadow-md max-h-12">
                  활동완료
                </div>
              )}
            </div>
            <div className="text-left py-4">
              <p>주소 : {matching.activityAddress}</p>
            </div>
            <div ref={mapRef} style={{ height: "150px" }} />
            <div className="flex justify-between my-4 place-items-center">
              <div className="bg-gray-100 rounded-xl px-4 py-3 space-y-3">
                <div className="flex space-x-2">
                  <FontAwesomeIcon icon={faLeaf} />
                  <p className="font-semibold">유저 정보</p>
                </div>
                <div className="flex space-x-5 place-items-center">
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="text-3xl text-gray-500"
                  />
                  {leader ? (
                    <div className="text-left">
                      <p className="text-sm">{leader.center}</p>
                      <p>{leader.name}</p>
                    </div>
                  ) : null}
                  <Link to={`/message/write/${matching.userId}`}>
                    <div className="text-main-color">
                      <FontAwesomeIcon icon={faComments} className="text-xl" />
                      <p className="text-sm">문의하기</p>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="border rounded-xl border-gray-500 px-6 py-5 place-items-center space-y-2">
                <p className="font-semibold">인원</p>
                <p className="text-lg">
                  {matching.currentParticipant} / {matching.maxParticipant}
                </p>
              </div>
            </div>
            <div className="text-left">
              <p className="my-5 text-lg font-semibold text-gray-500">
                활동 내용
              </p>
              <div className="flex place-content-center place-items-center space-x-5 border border-gray-500 rounded-lg px-5 py-4">
                <p>{matching.content}</p>
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
              {userInfo && userInfo.userId == matching.userId ? (
                <div className="text-center mt-8">
                  <button
                    onClick={deleteMatching}
                    className="bg-red-500 rounded-md px-3 py-3 text-white shadow-md max-h-12 mr-3"
                  >
                    삭제하기
                  </button>
                  {matching.isCompleted == 0 ? (
                    <button
                      onClick={completeMatching}
                      className="bg-main-color rounded-md px-3 py-3 text-white shadow-md max-h-12"
                    >
                      활동종료
                    </button>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
