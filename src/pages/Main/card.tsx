import { Header } from "components/Header";
import { Routes, Route, Link, NavLink, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "contexts/Login";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Matching } from "pages/Matching";
import detailLogo2 from 'assets/imgs/detailLogo2.jpg'; 

export const Card = () => {
  const divStyle = {
    backgroundImage: `url(${detailLogo2})`,
    backgroundSize: "cover", // 배경 이미지 크기를 맞춤
    backgroundPosition: "center", // 배경 이미지의 위치를 중심으로
    height: "20vh", // div의 높이를 설정
  };

  return (
    <div>
      <div style={divStyle} className="rounded-xl"></div>
    </div>
  );
};
