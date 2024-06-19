import axios from "axios";
import { Header } from "components/Header"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";


export const BoardDetail = () => {
    const [board, setBoard] = useState <any>({});
    const { boardId } = useParams(); 
    const getBoard = async () => {
        const url = `http://localhost:80/uon/boards/detail/${boardId}`
        const { data } = await axios.get(url);

        console.log(data);
        setBoard(data.board);
    }

    useEffect(() => {
        getBoard();
      }, []);
    
    return (
        <div>
            <Header />
            <h1>게시글조회</h1>
            <p>{board.title}</p>
            <p>{board.createTime}</p>
            <p>{board.content}</p>
        </div>
    )
}