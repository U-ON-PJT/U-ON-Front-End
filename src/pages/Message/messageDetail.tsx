import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom";
import { UserContext } from "contexts/Login";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const MessageDetail = () => {
    
    const [message, setMessage] = useState<any>({
        receiverId: "",
        senderId: "",
        title: "",
        content: ""
    });

    const { messageId } = useParams();
    const navigate = useNavigate();
    const { commonUrl, userInfo } = useContext(UserContext);
    const [type, setType] = useState("");

    const getMessage = async () => {
        const url = `${commonUrl}/messages/detail/${messageId}`;
        // console.log(url);
        const token = localStorage.getItem("token");
        const { data } = await axios.get(url,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setMessage(data);
        if (userInfo?.userId == message.receiverId) {
            setType("0");
        }
        else setType("1");
    }

    const deleteMessage = async () => {
        if (window.confirm("삭제하시겠습니까?")) {
            const url = `${commonUrl}/messages/${messageId}`;
            const token = localStorage.getItem("token");
            // 수신함에 들어있는 쪽지이고 수신자와 로그인한 회원이 일치하거나
            // 송신함에 들어있는 쪽지인데 송신자와 로그인한 회원이 일치하는 경우
            if ((type === "0" && userInfo?.userId === message.receiverId)
                || (type === "1" && userInfo?.userId === message.senderId)) {
                try {
                    await axios.delete(url, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    alert("삭제했습니다.");
                    navigate("/message");
                } catch (error) {
                    alert("삭제 실패");
                }
            }
            // 수신함에 들어있는 쪽지인데 수신자와 로그인한 회원이 일치하지 않는경우
            else if (type === "0" && userInfo?.userId !== message.receiverId) {
                alert("회원정보와 수신자가 일치하지 않습니다.")
            }
            
            // 송신에 들어있는 쪽지인데 송신자와 로그인한 회원이 일치하지 않는경우
            else if (type === "1" && userInfo?.userId === message.senderId) {
                alert("회원정보와 송신자가 일치하지 않습니다.")
            }
            
        }
    }

    useEffect(() => {
        getMessage();
    }, [messageId])
    
    return (
        <div>
            {message ? (
                <div>
                    <div className="border">
                        <p>유저 정보</p>
                        {userInfo?.userId == message.receiverId?
                            <div className="flex justify-center">
                                <p>보낸 사람</p>
                                <p>{message.senderId}</p>
                            </div>
                            :
                            <div className="flex justify-center">
                                <p>받는 사람</p>
                                <p>{message.receiverId}</p>
                            </div>
                        }
                    </div>
                    <br/>
                    <h1 className="border">{message.content}</h1>

                </div>
            ) : (
                null
            )}
            <button onClick={deleteMessage}>삭제</button>
        </div>
    )
}