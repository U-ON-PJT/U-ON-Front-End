import { useState, useContext } from "react"
import { UserContext } from "contexts/Login";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const MessageWrite = () => {

    const { userInfo } = useContext(UserContext);
    const { commonUrl } = useContext(UserContext);
    const navigate = useNavigate();
    const [receiverId, setReceiverId] = useState("user1");

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const changeContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setContent(value);
    }
    const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setTitle(value);
    }

    const sendMessage = () => {
        if (window.confirm("보내시겠습니까?")) {
            const token = localStorage.getItem("token");
            if (receiverId != "") {
                if (userInfo != null && token) {
                    const url = `${commonUrl}/messages`;
                    console.log(receiverId);
                    try {
                        axios.post(url,
                            {
                                receiverId: receiverId,
                                title: title,
                                content: content
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        )
                        navigate("/message");
                    } catch (error) {
                    }
                }
            }
            else {
                alert("받는 사람 아이디가 존재하지 않습니다.");
            }
        }
    }

    return (
        <div>
            <h1>쪽지 보내기</h1>
            <br />
            
            <div>
                <p>유저 정보</p>
                <p>{receiverId}</p>
            </div>
            
            <br />
            <label htmlFor="title">제목:</label>
            <input className="border" type="text" name="title" onChange={changeTitle}/>
            <div>
                <textarea className="border p-5" rows={15} cols={40} onChange={changeContent}>{content}</textarea>
            </div>  

            <button id="sendButton" onClick={sendMessage}>보내기</button>
        </div>
    )
}