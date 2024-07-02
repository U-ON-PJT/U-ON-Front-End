import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "contexts/Login";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { faCircleLeft, faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Message {
  messageId: number;
  senderId: string;
  receiverId: string;
  title: string;
  content: string;
  sendTime: string;
  isRead: number;
}

export const MessageList = () => {
  const { commonUrl } = useContext(UserContext);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const [messageList, setMessageList] = useState<Message[]>([]);

  const getMessageList = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      const url = `${commonUrl}/messages`;

      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(data);
      setMessageList(data.messageList);
    } else {
      alert("로그인 해주세요");
      navigate("/login");
    }
  };

  useEffect(() => {
    getMessageList();
  }, []);

  return (
    <div className="px-5 mb-10">
      <h1 className="mt-5 mb-5 text-left text-lg font-semibold">쪽지함</h1>
      <div className="space-y-5">
        {messageList.length > 0
          ? messageList.map((message) => (
              <Link to={`/message/${message.messageId}`}>
                <div
                  className={
                    "flex space-x-3 px-3 py-2 my-1 " +
                    (message.senderId === userInfo?.userId ? "bg-gray-100" : "")
                  }
                >
                  {message.senderId === userInfo?.userId ? (
                    <div className="text-center w-8">
                      <FontAwesomeIcon
                        icon={faCircleRight}
                        className="text-xl"
                      />
                      <p className="text-sm">발신</p>
                    </div>
                  ) : (
                    <div className="text-center w-8 text-main-color">
                      <FontAwesomeIcon
                        icon={faCircleLeft}
                        className="text-xl"
                      />
                      <p className="text-sm">수신</p>
                    </div>
                  )}
                  <div className="text-left w-full">
                    {message.senderId === userInfo?.userId ? (
                      <div className="flex justify-between">
                        <div className="space-x-3">
                          <span>받는 사람</span>
                          <span>{message.receiverId}</span>
                        </div>
                        <span>{message.sendTime}</span>
                      </div>
                    ) : (
                      <div className="flex justify-between">
                        <div className="space-x-3">
                          <span className="text-main-color">보낸 사람</span>
                          <span>{message.senderId}</span>
                        </div>
                        <span>{message.sendTime}</span>
                      </div>
                    )}
                    <p className="text-lg font-semibold">{message.title}</p>
                  </div>
                </div>
              </Link>
            ))
          : null}
      </div>
    </div>
  );
};
