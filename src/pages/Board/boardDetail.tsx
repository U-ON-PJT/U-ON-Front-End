import axios from "axios";
import { Header } from "components/Header"
import { useState, useEffect, useContext, useRef } from "react"
import { useParams } from "react-router-dom";
import { UserContext } from "contexts/Login";
import { useNavigate } from "react-router-dom";

export const BoardDetail = () => {
    const [board, setBoard] = useState<any>({});
    const [imgs, setImgs] = useState<string[]>([]);
    const { userInfo } = useContext(UserContext);
    const { boardId } = useParams(); 
    const { commonUrl } = useContext(UserContext);
    const navigate = useNavigate();

    const getBoard = async () => {
        const url = `${commonUrl}/boards/detail/${boardId}`
        const { data } = await axios.get(url);

        console.log(data);
        setBoard(data.board);
        setImgs(data.imageUrls);
    }

    const updateBoard = () => {
        navigate(`/board/modify/${boardId}`);
    }

    const deleteBoard = async () => {
        if (window.confirm("삭제 하시겠습니까?")) {
            if (userInfo?.userId === board.userId) {
                try {
                    const url = `${commonUrl}/boards/${boardId}`
                    const token = localStorage.getItem("token");
                    axios.delete(url,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
                    alert("삭제하였습니다.");
                    navigate("/board");
                } catch (error) {
                    alert("실패했습니다.");
                }
                
            }

        }
    }

    useEffect(() => {
        
        getBoard();
    
      }, []);
    
    
    return (
        <div>
            <Header />
            {userInfo && userInfo.userId === board.userId && (
                <div>
                    <button className="mr-5" onClick={updateBoard}>수정</button>
                    <button onClick={deleteBoard}>삭제</button>
                </div>
            )}
            <br/>
            <p>제목: {board.title}</p>
            <p>작성시간: {board.createTime}</p>
            <p>내용: {board.content}</p>
            <div>
                {imgs.map((img, index) => (
                    <img key={index} src={img} alt={`img-${index}`}></img>
                ))}
            </div>
        </div>
    )
}