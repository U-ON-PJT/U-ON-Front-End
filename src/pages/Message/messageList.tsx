import axios from "axios"
import { useState, useContext, useEffect } from "react"
import { UserContext } from "contexts/Login"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

interface Message{
    messageId: number,
    senderId: string,
    receiverId: string,
    title: string,
    content: string,
    sendTime: string,
    isRead: number
}

export const MessageList = () => {
    
    const { commonUrl } = useContext(UserContext);
    
    const [type, setType] = useState(1);

    const navigate = useNavigate();


    const [messageList, setMessageList] = useState<Message[]>([]);

    const getMessageList = async () => {
        const token = localStorage.getItem("token");

        if (token) {
            const url = `${commonUrl}/messages/${type}`;

            const {data} = await axios.get(url,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(data);
            setMessageList(data.messageList);
        }
        else {
            alert("로그인 해주세요");
            navigate("/login");
        }

    }

    const changeTypeReceiver = () => {
        setType(1);
    }

    const changeTypeSender = () => {
        setType(0);
    }
    
    useEffect(() => {
        
        getMessageList();
    
      }, [type]);

    return (
        <div>
            <div>
                <button onClick={changeTypeReceiver}>수신함</button>
                <button onClick={changeTypeSender}>송신함</button>
                <Link to="/message/write" className="ml-10">쪽지 쓰기</Link>
            </div>
            <ul className="flex justify-center">
                {
                    type == 1 ?
                        <li>보낸 사람</li>
                        :
                        <li>받은 사람</li>
                }
                    <li>제목</li>
                    <li>날짜</li>
            </ul>
            {
                messageList.length > 0 ? (
                    messageList.map((message) => (
                        <Link to={`/message/${message.messageId}`}>
                        <ul className="flex justify-center" key={message.messageId}>
                            {
                                type == 1 ?
                                <li>{message.senderId}</li>
                                :
                                <li>{message.receiverId}</li>

                            }
                            <li>{message.title}</li>
                            <li>{message.sendTime}</li>
                        </ul>
                        </Link>
                ))) :
                null
            }
            <br />
            
        </div>

    )
}