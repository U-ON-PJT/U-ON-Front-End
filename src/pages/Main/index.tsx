import { Header } from "components/Header";
import { Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "contexts/Login";
import { useEffect } from "react";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

declare global {
  interface Window {
    kakao: any;
  }
}
export const Main = () => {
  useEffect(() => {
    let container = document.getElementById(`map`); // 지도를 담을 영역의 DOM 레퍼런스
    let options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도 중심 좌표
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };

    let map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
  }, []);
  const { userInfo } = useContext(UserContext);
  const { logout } = useContext(UserContext);
  return (
    <div>
      <Header />
      {/* 임시 버튼 */}
      <div className="px-5">
        <div className="flex">
          <Link to="/board">게시판</Link>
          <Link to="/matching">매칭</Link>

          <div className="flex">
            {userInfo == null ? (
              <>
                <Link to="/login">로그인</Link>
                <Link to="/sign-up">회원가입</Link>
              </>
            ) : (
              <>
                <span>{userInfo.userId}님 안녕하세요</span>
                <Link to="/" onClick={logout}>
                  로그아웃
                </Link>
              </>
            )}
          </div>
        </div>
        <div id="map" style={{ width: "350px", height: "350px" }} />
      </div>
    </div>
  );
};
