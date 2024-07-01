import React, { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "contexts/Login";
import { useNavigate } from "react-router-dom";
import { Header } from "components/Header";

export const Mypage = () => {
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
  const { commonUrl } = useContext(UserContext);
  const [gugunName, setGugunName] = useState("");
  const [sidoName, setSidoName] = useState("");

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

  const [idCheck, setIdCheck] = useState(0);
  const [gugunList, setGugunList] = useState<{ gugunName: string }[]>([]);

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

  const updateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const url = `${commonUrl}/users/my-page`;
    console.log(user.name.current?.value);
    const userData = {
      userId: userInfo?.userId,
      name: user.name.current?.value,
      birth: user.birth.current?.value,
      phone: user.phone.current?.value,
      sidoName: user.sidoName.current?.value,
      gugunName: user.gugunName.current?.value,
      center: user.center.current?.value,
    };
    const { data } = await axios.put(url,userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

    console.log(data);
  };

  const getGugun = async (selectedSido: string) => {
    const url = `${commonUrl}/locations/guguns`;
    const { data } = await axios.get(url, {
      params: {
        sidoName: selectedSido,
      },
    });
    setGugunList(data);
  };

  const getLocation = async () => {
    const url = `${commonUrl}/locations/names/${userInfo?.dongCode}`;
    const { data } = await axios.get(url);
    setSidoName(data.sidoName);
    setGugunName(data.gugunName);
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (sidoName && user.sidoName.current) {
      user.sidoName.current.value = sidoName;
      getGugun(sidoName); // 시도 선택에 따른 구군 리스트 불러오기
    }
  }, [sidoName]);

  useEffect(() => {
    if (gugunName && user.gugunName.current) {
      user.gugunName.current.value = gugunName;
    }
  }, [gugunName]);

  return (
    <div className="px-10 py-20">
      <h1 className="text-left font-semibold text-lg">내 정보 수정</h1>
      <form onSubmit={updateUser}>
        <div className="space-y-6 mt-10 text-left">
          <div>
            <label htmlFor="name" className="text-sm text-gray-500">
              이름 *
            </label>
            <input
              required
              type="text"
              name="name"
              ref={user.name}
              defaultValue={userInfo?.name}
              className="bg-gray-100 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="birth" className="text-sm text-gray-500">
              생년월일 *
            </label>
            <input
              required
              type="date"
              name="birth"
              ref={user.birth}
              defaultValue={userInfo?.birth}
              className="bg-gray-100 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="phone" className="text-sm text-gray-500">
              전화번호 *
            </label>
            <input
              required
              type="text"
              name="phone"
              ref={user.phone}
              defaultValue={userInfo?.phone}
              className="bg-gray-100 rounded-md px-3 py-2 w-full"
            />
          </div>
          <div>
            <p className="text-sm text-gray-500">활동 지역 *</p>
            <div className="space-x-3">
              <select
                required
                name="sidoName"
                ref={user.sidoName}
                onChange={(e) => getGugun(e.target.value)}
                defaultValue={sidoName}
                className="bg-gray-100 rounded-md px-3 py-2"
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
                value={gugunName}
                onChange={(e) => setGugunName(e.target.value)}
                className="bg-gray-100 rounded-md px-3 py-2"
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
          </div>
          <div>
            <label htmlFor="center" className="text-sm text-gray-500">
              소속센터
            </label>
            <input
              type="text"
              name="center"
              ref={user.center}
              className="bg-gray-100 rounded-md px-3 py-2 w-full"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-main-color text-white font-semibold px-6 py-3 mt-10 rounded-md shadow-lg"
        >
          수정하기
        </button>
      </form>
    </div>
  );
};
