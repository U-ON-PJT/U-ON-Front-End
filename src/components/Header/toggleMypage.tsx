import { Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "contexts/Login";
import {
  faRightFromBracket,
  faRightToBracket,
  faPencil,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ToggleMypage = () => {
  const { userInfo } = useContext(UserContext);
  const { logout } = useContext(UserContext);

  return (
    <div className="flex-row border px-5 py-3 float-right bg-white place-content-center">
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
              <div>{userInfo.userId}</div>
            </div>
            <Link
              to="/"
              onClick={logout}
              className="flex border-b py-2 space-x-3 mt-2"
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              <p>로그아웃</p>
            </Link>
            <div className="flex py-2 space-x-3 mt-2">
              <FontAwesomeIcon icon={faPencil} />
              <p>내 정보 수정</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
