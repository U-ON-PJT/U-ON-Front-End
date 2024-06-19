
import { Header } from "components/Header"
import { useState, useEffect, useRef } from "react"
import axios from "axios";
import { Link } from "react-router-dom";

export const Board = () => {

    const [boardList, setBoardList] = useState<any[]>([]);

    const [currentType, setCurrentType] = useState(0);

    const getBoardList = async () => {
        const url = `http://localhost:80/uon/boards/${currentType}`;
        const { data } = await axios.get(url);

        // console.log(data);

        setBoardList([]);
        setBoardList(data.boardList);
        
    }
    
    const changeType = (type: number) => {
        setCurrentType(type);
    }
    
    useEffect(() => {
        getBoardList();
        console.log("boardList:", boardList);
    }, [currentType])

    return (
        <div>
            <Header />
            <h1>공지사항</h1>
            <button onClick={() => changeType(0)}>전체</button>
            <button onClick={() => changeType(1)}>공지</button>
            <button onClick={() => changeType(2)}>취업</button>
            <button onClick={() => changeType(3)}>교육</button>
            <ul>
                {
                    boardList.map((board) => (
                        <li key={board.boardId}>
                           <Link to={`/board/${board.boardId}`}>{board.title}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}