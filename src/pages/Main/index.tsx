import { Header } from "components/Header";
import { Routes, Route, Link, NavLink, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "contexts/Login";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Matching } from "pages/Matching";
import { Board } from "pages/Board";
import { Card } from "./card";

export const Main = () => {
  const { userInfo } = useContext(UserContext);
  const { logout } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (id: number) => {
    setActiveTab(id);
  };

  const tabs = [
    { id: 1, component: <Matching /> },
    { id: 2, component: <Board /> },
  ];

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;

  return (
    <div>
      {/* 임시 버튼 */}
      <div className="px-5">
        <Card />
        <div className="text-left space-x-4 text-lg my-4">
          <button
            className={
              activeTab === 1
                ? "font-semibold border-b-2 pb-1 border-b-black"
                : ""
            }
            onClick={() => handleTabClick(1)}
          >
            취미 매칭
          </button>
          <button
            className={
              activeTab === 2
                ? "font-semibold border-b-2 pb-1 border-b-black"
                : ""
            }
            onClick={() => handleTabClick(2)}
          >
            게시판
          </button>
        </div>
        <div>{ActiveComponent}</div>
      </div>
    </div>
  );
};
