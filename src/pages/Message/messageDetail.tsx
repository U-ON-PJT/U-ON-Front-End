import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "contexts/Login";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { faLeaf, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const MessageDetail = () => {
  const [message, setMessage] = useState<any>({
    receiverId: "",
    senderId: "",
    title: "",
    content: "",
  });

  const { messageId } = useParams();
  const navigate = useNavigate();
  const { commonUrl, userInfo } = useContext(UserContext);
  const [type, setType] = useState("");

  const getMessage = async () => {
    const url = `${commonUrl}/messages/detail/${messageId}`;
    // console.log(url);
    const token = localStorage.getItem("token");
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setMessage(data);
    if (userInfo?.userId == data.receiverId) {
      setType("1");
    } else setType("0");
  };

  const deleteMessage = async () => {
    if (window.confirm("삭제하시겠습니까?")) {
      const url = `${commonUrl}/messages/${messageId}`;
      const token = localStorage.getItem("token");
      // 수신함에 들어있는 쪽지이고 수신자와 로그인한 회원이 일치하거나
      // 송신함에 들어있는 쪽지인데 송신자와 로그인한 회원이 일치하는 경우
      console.log(type);
      if (
        (type == "0" && userInfo?.userId == message.senderId) ||
        (type == "1" && userInfo?.userId == message.receiverId)
      ) {
        try {
          const resp = await axios.delete(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("Delete resp:", resp);
          alert("삭제했습니다.");

          navigate("/message");
        } catch (error) {
          alert("삭제 실패");
        }
      }
      // 수신함에 들어있는 쪽지인데 수신자와 로그인한 회원이 일치하지 않는경우
      else if (type === "0" && userInfo?.userId !== message.receiverId) {
        alert("회원정보와 수신자가 일치하지 않습니다.");
      }

      // 송신에 들어있는 쪽지인데 송신자와 로그인한 회원이 일치하지 않는경우
      else if (type === "1" && userInfo?.userId === message.senderId) {
        alert("회원정보와 송신자가 일치하지 않습니다.");
      }
    }
  };

  useEffect(() => {
    getMessage();
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="px-5">
      <div className="flex space-x-3 mt-3 mb-3 text-left">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="mt-1"
          onClick={handleGoBack}
        />
        <h1 className="text-lg font-semibold">쪽지함</h1>
      </div>
      {message ? (
        <div>
          <div className="px-5 text-left mb-5">
            <div className="flex justify-between mt-4 mb-5">
              <div className="bg-gray-100 rounded-xl px-6 py-4 space-y-3 w-full">
                <div className="flex space-x-2">
                  <FontAwesomeIcon icon={faLeaf} />
                  {message.senderId === userInfo?.userId ? (
                    <p className="font-semibold">수신한 유저 정보</p>
                  ) : (
                    <p className="font-semibold">보낸 유저 정보</p>
                  )}
                </div>
                <div className="flex space-x-5 place-items-center">
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="text-3xl text-gray-500"
                  />
                  <div className="text-left">
                    <p>{message.receiverId}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-lg font-semibold py-2 mb-3 w-full">
              제목: {message.title}
            </div>
            <div className="space-x-5 border border-gray-500 rounded-lg px-5 py-5">
              {message.content}
            </div>
          </div>
          <Link to={`/message/write/${message.receiverId}`}>
          <button
            id="sendButton"
            className="bg-main-color text-white font-semibold px-6 py-3 mt-3 rounded-md shadow-lg"
          >
            답장하기
            </button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};
