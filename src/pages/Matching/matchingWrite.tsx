import { useEffect, useRef, useState, useContext } from "react";
import { UserContext } from "contexts/Login";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";

declare global {
  interface Window {
    kakao: any;
  }
}

export const MatchingWrite = () => {
  const keyWord = useRef<HTMLInputElement>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [map, setMap] = useState<any>(null);

  const { userInfo } = useContext(UserContext);
  const { commonUrl } = useContext(UserContext);

  const [sidoName, setSidoName] = useState("");
  const [gugunName, setGugunName] = useState("");

  let ps = new window.kakao.maps.services.Places();

  let infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

  const matching = {
    title: useRef<HTMLInputElement>(null),
    content: useRef<HTMLInputElement>(null),
    activity_address: useRef<HTMLInputElement>(null),
    activity_date: useRef<HTMLInputElement>(null),
    min_participant: useRef<HTMLInputElement>(null),
    max_participant: useRef<HTMLInputElement>(null),
    type: useRef<HTMLSelectElement>(null),
  };

  const writeMatching = async () => {};

  const searchPlaces = () => {
    if (!keyWord.current?.value.replace(/^\s+|\s+$/g, "")) {
      alert("키워드를 입력해주세요!");
      return false;
    }
    console.log("click");
    console.log(keyWord);
    ps.keywordSearch(keyWord.current?.value, placesSearchCB);
  };

  const placesSearchCB = (data: any, status: any, pagination: any) => {
    if (status === window.kakao.maps.services.Status.OK) {
      console.log("status", status);
      console.log(data);
      setSearchResults(data);
      setIsModalOpen(true);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getDongCode = async () => {
    if (!userInfo) return;
    console.log(userInfo?.dongCode);
    const url = `${commonUrl}/locations/names/${userInfo?.dongCode}`;
    const { data } = await axios.get(url);
    setSidoName(data.sidoName);
    setGugunName(data.gugunName);
  };

  useEffect(() => {
    if (userInfo) {
      getDongCode();
    }
  }, [userInfo]);

  useEffect(() => {
    if (sidoName && gugunName) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(
        `${sidoName} ${gugunName}`,
        function (result: any, status: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            let container = document.getElementById("map");
            let coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            let options = {
              center: coords,
              level: 3,
            };
            let newMap = new window.kakao.maps.Map(container, options);
            setMap(newMap);
          }
        }
      );
    }
  }, [gugunName, sidoName]);

  const hobbyList = ["스포츠", "학습, 연구", "야외 활동", "예술, 공예", "기타"];

  return (
    <div className="px-5">
      <h1 className="mt-5 mb-5 text-left text-lg font-semibold">
        취미 등록하기
      </h1>
      <div className="text-left space-y-3">
        <div className="flex space-x-3">
          <div>
            <label htmlFor="title" className="text-sm text-gray-500">
              제목 *
            </label>
            <input
              className="border border-gray-500 rounded-lg px-5 py-2 mb-3 w-full"
              type="text"
              name="title"
            />
          </div>
          <div>
            <label htmlFor="category" className="text-sm text-gray-500">
              유형 *
            </label>
            <br />
            <select
              required
              name="category"
              className="border border-gray-500 rounded-lg px-3 py-2"
            >
              <option hidden selected disabled value="0">
                유형
              </option>
              {hobbyList.map((hobby, index) => (
                <option key={hobby} value={index + 1}>
                  {hobby}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex space-x-3">
          <div>
            <label htmlFor="title" className="text-sm text-gray-500">
              모임 시간 *
            </label>
            <input
              className="border border-gray-500 rounded-lg px-5 py-2 mb-3 w-full"
              type="datetime-local"
              name="title"
            />
          </div>
          <div>
            <label htmlFor="title" className="text-sm text-gray-500">
              참여 인원 *
            </label>
            <input
              className="border border-gray-500 rounded-lg px-5 py-2 mb-3 w-full"
              type="text"
              name="title"
            />
          </div>
        </div>
        <div>
          <label htmlFor="title" className="text-sm text-gray-500">
            모임 장소 *
          </label>
          <div className="flex space-x-5">
            <input
              className="border border-gray-500 rounded-lg px-5 py-2 mb-3 w-full"
              type="text"
              name="title"
              ref={keyWord}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="text-lg mt-2"
              onClick={searchPlaces}
            />
          </div>
        </div>
        <div>
          <label htmlFor="title" className="text-sm text-gray-500">
            내용 *
          </label>
          <textarea className="space-x-5 border border-gray-500 rounded-lg px-5 py-5 h-52 w-full"></textarea>
        </div>
      </div>
      <button
        id="sendButton"
        className="bg-main-color text-white font-semibold px-6 py-3 mt-3 rounded-md shadow-lg"
      >
        등록하기
      </button>
    </div>
  );
};
