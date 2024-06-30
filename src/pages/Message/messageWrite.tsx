import React, { useState, useRef, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "contexts/Login";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import {
  faLeaf,
  faComments,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const MessageWrite = () => {
  const { userInfo } = useContext(UserContext);
  const { commonUrl } = useContext(UserContext);
  const navigate = useNavigate();
  const [receiverId, setReceiverId] = useState("user3");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const changeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setContent(value);
  };
  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTitle(value);
  };

  const sendMessage = async () => {
    if (window.confirm("보내시겠습니까?")) {
      const token = localStorage.getItem("token");
      if (receiverId != "") {
        if (userInfo != null && token) {
          const url = `${commonUrl}/messages`;
          console.log(receiverId);
          try {
            await axios.post(
              url,
              {
                receiverId: receiverId,
                title: title,
                content: content,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            navigate("/message");
          } catch (error) {
            if (axios.isAxiosError(error)) {
              if (error.response?.status == 400) {
                alert("아이디가 존재하지 않습니다.");
              }
              
            }
          }
        }
      } else {
        alert("받는 사람 아이디가 존재하지 않습니다.");
      }
    }
  };
  return (
    <div className="px-5">
      <h1 className="mt-5 mb-3 text-left text-lg font-semibold">쪽지 보내기</h1>
      <div className="px-5 mt-10">
        <div className="flex justify-between my-4">
          <div className="bg-gray-100 rounded-xl px-6 py-4 space-y-3 w-full">
            <div className="flex space-x-2">
              <FontAwesomeIcon icon={faLeaf} />
              <p className="font-semibold">유저 정보</p>
            </div>
            <div className="flex space-x-5 place-items-center">
              <FontAwesomeIcon
                icon={faUserCircle}
                className="text-3xl text-gray-500"
              />
              <div className="text-left">
                <p className="text-sm">비전 트레이닝 센터</p>
                <p>{receiverId}</p>
              </div>
            </div>
          </div>
        </div>
        <input
          className="border border-gray-500 rounded-lg px-5 py-2 mb-3 w-full"
          type="text"
          name="title"
          placeholder="제목"
          onChange={changeTitle}
        />
        <textarea
          onChange={changeContent}
          className="space-x-5 border border-gray-500 rounded-lg px-5 py-5 h-80 w-full"
        >
          {content}
        </textarea>
      </div>
      <p className="my-3">개인 정보를 보내는 것은 위험할 수 있습니다.</p>
      <button
        id="sendButton"
        onClick={sendMessage}
        className="bg-main-color text-white font-semibold px-6 py-3 mt-3 rounded-md shadow-lg"
      >
        보내기
      </button>
    </div>
  );
};
