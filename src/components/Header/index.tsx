import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "contexts/Login";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToggleMypage } from "./toggleMypage";

export const Header = () => {
  const { userInfo } = useContext(UserContext);
  const { logout } = useContext(UserContext);
  const [mypageOpen, setMypage] = useState(false);
  const outside = useRef<HTMLDivElement>(null);
  const location = useLocation(); // 경로 이동 시 닫기 위함

  const toggleMypage = () => {
    setMypage((mypageOpen) => !mypageOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (outside.current && !outside.current.contains(event.target as Node)) {
      setMypage(false);
    }
  };

  useEffect(() => {
    if (mypageOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mypageOpen]);

  // Close menu on route change
  useEffect(() => {
    setMypage(false);
  }, [location]);

  return (
    <div>
      <nav className="flex justify-between px-5 py-4 mt-2">
        <FontAwesomeIcon icon={faBars} className="" />
        <Link to="/">
          <img alt="logo" src="/logo.png" width="25%" />
        </Link>
        <div className="space-x-4">
          <FontAwesomeIcon icon={faSearch} />
          <Link to="/message">
            <FontAwesomeIcon icon={faEnvelope} />
          </Link>
          <button onClick={() => toggleMypage()}>
            <FontAwesomeIcon icon={faUser} />
          </button>
        </div>
      </nav>
      {mypageOpen && (
        <div className="z-10" ref={outside}>
          <ToggleMypage />
        </div>
      )}
    </div>
  );
};
