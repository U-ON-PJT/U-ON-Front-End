import { Routes, Route, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "contexts/Login";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToggleMypage } from "./toggleMypage";

export const Header = () => {
  const { userInfo } = useContext(UserContext);
  const { logout } = useContext(UserContext);
  const [mypageOpen, setMypage] = useState(false);

  const toggleMypage = () => {
    setMypage((mypageOpen) => !mypageOpen);
  };

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
      <div>{mypageOpen ? <ToggleMypage /> : ""}</div>
    </div>
  );
};
