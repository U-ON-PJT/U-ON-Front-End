import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "contexts/Login";
import { useNavigate } from "react-router-dom";
import axios from "axios";
declare global {
  interface Window {
    kakao: any;
  }
}

interface Props {
  matchList: any[];
  sidoName: string;
  gugunName: string;
}

export const MatchingMap: React.FC<Props> = ({ matchList, gugunName, sidoName }) => {
  // 맵, 마커, 인포윈도우
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [infowindows, setInfowindows] = useState<any[]>([]);
  const [userSido, setUserSido] = useState("");
  const [userGugun, setUserGugun] = useState("");

  const { commonUrl } = useContext(UserContext);
  const { userInfo } = useContext(UserContext);
  
  const navigate = useNavigate();
  
  // 마커 클릭 시 세부조회 페이지로 넘어가게
  const changeDetailPages = (activityId: number) => {
    console.log(activityId);
    navigate(`/matching/${activityId}`)
  }

  const setLocation = async () => {
    const url = `${commonUrl}/locations/names/${userInfo?.dongCode}`;
    const { data } = await axios.get(url);
    console.log(data);
    setUserSido(data.sidoName);
    setUserGugun(data.gugunName);
  }
  

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const newMap = new window.kakao.maps.Map(container, options);
    setMap(newMap);
  }, []);

  useEffect(() => {
    if (!map) return;

    const geocoder = new window.kakao.maps.services.Geocoder();
    const ps = new window.kakao.maps.services.Places();

    // 이전 마커, 인포윈도우 제거
    markers.forEach(marker => marker.setMap(null));
    infowindows.forEach(infowindow => infowindow.close());
    setMarkers([]);
    setInfowindows([]);

    // 매치리스트 주소로 좌표랑 정보 불러오기
    matchList.forEach((address) => {
      if (address && address.activityAddress) {
      // 
      geocoder.addressSearch(address.activityAddress, function (result: any, status: any) {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: coords,
          });
          console.log(result);
          // 마커 배열에 추가 
          setMarkers(prevMarkers => [...prevMarkers, marker]);
          
          // 마커 클릭 시 페이지 전환 (세부조회)
          window.kakao.maps.event.addListener(marker, "click", function () {
            changeDetailPages(address.activityId);
          });

          // 키워드(주소)로 장소에 대한 정보 가져오기
          // 매치 테이블의 주소로 좌표를 검색하고, 매치 테이블의 주소로 장소에 대한 정보를 검색
          // 카카오맵에 내장되어 있는 장소에 대한 정보
          ps.keywordSearch(address.activityAddress, (data: any, status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const content = `<div style="width:150px;text-align:center;padding:6px 0;">${data[0].place_name}</div>`;
              const markerInfowindow = new window.kakao.maps.InfoWindow({
                content: content,
              });
              setInfowindows(prevInfowindows => [...prevInfowindows, markerInfowindow]);
              markerInfowindow.open(map, marker);
            }
          });

        }
      });
    }
    });

    // 옮기는 코드를 따로 빼놓는 이유는 여러개의 매치중 첫번째꺼를 기준으로 한번만 맵을 옮기기 위함
    // 현재 지역에 matchList가 존재할 때
    if (matchList.length > 0 && matchList[0].activityAddress) {
      geocoder.addressSearch(matchList[0].activityAddress, function (result: any, status: any) {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          map.setCenter(coords);
        }
      });
    } else {
      setLocation();
      // 현재 지역에 matchList가 존재하지 않을때 => 지도 위치만 옮김
      if (userSido && userGugun) {
        geocoder.addressSearch(userSido + userGugun, function (result: any, status: any) {
          console.log(userSido)
          console.log(userGugun)
          console.log(result);
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            map.setCenter(coords);
          }
        });
      }
    }
    
  }, [map, matchList, userSido, userGugun]);

  return <div id="map" style={{ width: "350px", height: "350px" }} />;
};
