import React, { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "contexts/Login";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import { faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const FAQList = () => {
  const [isOpen, setOpenList] = useState(0);

  const toggleList = (idx: number) => {
    if (idx === isOpen) setOpenList((isOpen) => (isOpen = 0));
    else setOpenList((isOpen) => (isOpen = idx));
  };
  return (
    <div className="px-5">
      <h1 className="mt-5 mb-3 text-left text-lg font-semibold">
        자주 묻는 질문
      </h1>
      <div className="mt-10">
        <div
          className="flex text-left space-x-5 bg-gray-100 px-5 py-3"
          onClick={() => toggleList(1)}
        >
          {isOpen === 1 ? (
            <FontAwesomeIcon icon={faCaretDown} className="mt-1" />
          ) : (
            <FontAwesomeIcon icon={faCaretRight} className="mt-1" />
          )}
          <p>U:ON 서비스란 무엇인가요?</p>
        </div>
        {isOpen === 1 ? (
          <div className="border p-5 text-left">
            <p>
              간편하게 원하는 취미를 다른 사람들과 함께할 수 있도록 돕는
              서비스입니다.
            </p>
          </div>
        ) : (
          ""
        )}
        <div
          className="flex text-left space-x-5 px-5 py-3"
          onClick={() => toggleList(2)}
        >
          {isOpen === 2 ? (
            <FontAwesomeIcon icon={faCaretDown} className="mt-1" />
          ) : (
            <FontAwesomeIcon icon={faCaretRight} className="mt-1" />
          )}
          <p>U:ON 서비스는 어떻게 사용하나요?</p>
        </div>
        {isOpen === 2 ? (
          <div className="border p-5 text-left">
            <p>
              U:ON 서비스는 사용자들의 취미 등록으로 시작됩니다. 각자 함께하고
              싶은 취미를 등록하고, 정해진 인원을 모아 취미를 함께 즐겨보세요!
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
