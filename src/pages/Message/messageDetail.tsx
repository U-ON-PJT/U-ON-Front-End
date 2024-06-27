import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom";
import { UserContext } from "contexts/Login";
import axios from "axios";
export const MessageDetail = () => {
    
    const [message, setMessage] = useState<any>();
    const { messageId } = useParams();

    const { commonUrl } = useContext(UserContext);
    const { userInfo } = useContext(UserContext);

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

        console.log(data);
        setMessage(data);
    }

    useEffect(() => {
        getMessage();
        console.log(message);
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
        </div>
    )
}