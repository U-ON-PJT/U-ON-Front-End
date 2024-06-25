import { Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "contexts/Login";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faBell, faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Header = () => {
  const { userInfo } = useContext(UserContext);
  const { logout } = useContext(UserContext);

  return (
    <nav className="flex justify-between px-4 py-4 mt-2">
      <FontAwesomeIcon icon={faBars} className="" />
      <Link to="/">
        <img alt="logo" src="logo.png" width="25%" />
      </Link>
      <div className="space-x-4">
        <FontAwesomeIcon icon={faSearch} />
        <FontAwesomeIcon icon={faBell} />
        <FontAwesomeIcon icon={faUser} />
      </div>
    </nav>
  );
};
