import { Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "contexts/Login";
import {
  faRightFromBracket,
  faRightToBracket,
  faPencil,
  faUserCircle,
  faBars,
  faMedal,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ToggleMypage = () => {
  const { userInfo } = useContext(UserContext);
  const { logout } = useContext(UserContext);

  return (
    <div className="absolute flex-row border px-5 py-3 right-0 bg-white shadow-md place-content-center">
      <div>
        {userInfo == null ? (
          <>
            <div className="flex py-2 space-x-3">
              <FontAwesomeIcon icon={faRightToBracket} />
              <Link to="/login">로그인</Link>
            </div>
          </>
        ) : (
          <>
            <div className="flex border-b py-4 space-x-3">
              <FontAwesomeIcon
                icon={faUserCircle}
                className="text-xl text-gray-500"
              />
              <div>{userInfo.name}</div>
              <div className="flex space-x-1 text-yellow-600">
                <p>레벨 {userInfo?.level}</p>
                <FontAwesomeIcon icon={faMedal} className="mt-1" />
              </div>
            </div>
            <Link
              to="/"
              onClick={logout}
              className="flex border-b py-2 space-x-3 mt-2"
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              <p>로그아웃</p>
            </Link>
            <Link to="/mypage" className="flex border-b py-2 space-x-3 mt-2">
              <FontAwesomeIcon icon={faPencil} />
              <p>정보 수정</p>
            </Link>
            <Link to="/mylist" className="flex py-2 space-x-3 mt-2">
              <FontAwesomeIcon icon={faBars} />
              <p>활동 내역</p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
