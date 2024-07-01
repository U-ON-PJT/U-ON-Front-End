import axios from "axios";
import { Header } from "components/Header";
import { useState, useEffect, useContext, useRef } from "react";
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
    const url = `${commonUrl}/boards/detail/${boardId}`;
    const { data } = await axios.get(url);

    console.log(data);
    setBoard(data.board);
    setImgs(data.imageUrls);
  };

  const updateBoard = () => {
    navigate(`/board/modify/${boardId}`);
  };

  const deleteBoard = async () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      if (userInfo?.userId === board.userId) {
        try {
          const url = `${commonUrl}/boards/${boardId}`;
          const token = localStorage.getItem("token");
          axios.delete(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          alert("삭제하였습니다.");
          navigate("/board");
        } catch (error) {
          alert("실패했습니다.");
        }
      }
    }
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <div className="px-5 py-5 text-left">
      <div className="space-y-3">
        <p className="text-lg px-3 py-2 bg-gray-100 font-semibold">
          {board.title}
        </p>
        <p className="text-right text-gray-500">{board.createTime}</p>
        <pre><p className="border p-5">{board.content}</p></pre>
        <div>
          {imgs.map((img, index) => (
            <img key={index} src={img} alt={`img-${index}`}></img>
          ))}
        </div>
      </div>
      {userInfo && userInfo.userId === board.userId && (
        <div className="text-center my-3 space-x-3">
          <button
            className="bg-blue-300 rounded-md text-white px-3 py-2"
            onClick={updateBoard}
          >
            수정
          </button>
          <button
            className="bg-red-300 rounded-md text-white px-3 py-2"
            onClick={deleteBoard}
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};
