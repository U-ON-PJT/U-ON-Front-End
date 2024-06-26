import { Header } from "components/Header";
import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "contexts/Login";

export const Board = () => {
  const [boardList, setBoardList] = useState<any[]>([]);

  const [currentType, setCurrentType] = useState(0);

  const { userInfo } = useContext(UserContext);

  const { commonUrl } = useContext(UserContext);

  const getBoardList = async () => {
    const url = `${commonUrl}boards/${currentType}`;
    const { data } = await axios.get(url);

    // console.log(data);

    setBoardList([]);
    setBoardList(data.boardList);
  };

  const changeType = (type: number) => {
    setCurrentType(type);
  };

  useEffect(() => {
    getBoardList();
    console.log("boardList:", boardList);
  }, [currentType]);

  return (
    <div>
      <div className="space-x-3">
        <button
          className={
            currentType == 0
              ? "px-3 py-2 border border-main-color bg-main-color text-white rounded-full"
              : "px-3 py-2 border border-gray-500 rounded-full"
          }
          onClick={() => changeType(0)}
        >
          전체
        </button>
        <button
          className={
            currentType == 1
              ? "px-3 py-2 border border-main-color bg-main-color text-white rounded-full"
              : "px-3 py-2 border border-gray-500 rounded-full"
          }
          onClick={() => changeType(1)}
        >
          공지
        </button>
        <button
          className={
            currentType == 2
              ? "px-3 py-2 border border-main-color bg-main-color text-white rounded-full"
              : "px-3 py-2 border border-gray-500 rounded-full"
          }
          onClick={() => changeType(2)}
        >
          취업
        </button>
        <button
          className={
            currentType == 3
              ? "px-3 py-2 border border-main-color bg-main-color text-white rounded-full"
              : "px-3 py-2 border border-gray-500 rounded-full"
          }
          onClick={() => changeType(3)}
        >
          교육
        </button>
      </div>
      <ul>
        {boardList.map((board) => (
          <li key={board.boardId}>
            <Link to={`/board/${board.boardId}`}>{board.title}</Link>
          </li>
        ))}
      </ul>
      {userInfo != null && userInfo.role == "1" ? (
        <Link to="/board/write">글쓰기</Link>
      ) : null}
    </div>
  );
};
