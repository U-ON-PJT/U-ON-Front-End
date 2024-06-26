import axios from "axios";
import { Header } from "components/Header"
import { UserContext } from "contexts/Login";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clostImg from "assets/imgs/close.png"

export const BoardUpdate = () => {
    const navigate = useNavigate();
    const { userInfo } = useContext(UserContext);

    const { commonUrl } = useContext(UserContext);
    const { boardId } = useParams<{ boardId: string }>();
    
    // 새로운 이미지 파일
    const [imgFiles, setImageFiles] = useState<File[]>([]);
    // 기존 이미지 파일
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const [board, setBoard] = useState({
        boardId: '',
        userId: '',
        type: '',
        title: '',
        content: ''
    });


    const getBoard = async () => {
        const url = `${commonUrl}/boards/detail/${boardId}`;
        const {data} = await axios.get(url);
        console.log(data);

        setBoard({
            boardId: boardId || '',
            userId: data.board.userId,
            type: data.board.type,
            title: data.board.title,
            content: data.board.content
        });
        setImageUrls(data.imageUrls);
    }

    const uploadImageToImgBB = async (file: File) => {
        const key = "25bb102de5f5e0ca0d18c71ba0286b11";
        try {
          const formData = new FormData();
          formData.append("image", file);
    
          const response = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
            method: "POST",
            body: formData,
          });
    
          if (response.ok) {
            const data = await response.json();
            return data.data.url;
          } else {
            console.error("이미지 업로드 실패:", response.status);
            return null;
          }
        } catch (error) {
          console.error("이미지 업로드 오류:", error);
          return null;
        }
    };
    
    const handleFileIconClick = () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.multiple = true;
        fileInput.onchange = async (event: Event) => {
          const target = event.target as HTMLInputElement;
          const files = target.files;
          if (files) {
            setImageFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
          }
        };
        fileInput.click();
    };
    
    const removeFile = (index: number) => {
        setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };
    
    const removeImageUrl = (index: number) => {
        setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    };

    const update = async (event: React.FormEvent) => {
        event.preventDefault();

        if (window.confirm("수정하시겠습니까?")) {
            // 새로운 이미지 파일을 url로 교체 후 배열에 넣기
            const newImageUrls = await Promise.all(imgFiles.map(uploadImageToImgBB));
            const allImageUrls = [...imageUrls, ...newImageUrls];

            const token = localStorage.getItem("token");
        
            // 유저 정보와 토큰이 존재하고, 유저 정보와 글쓴 사람의 정보가 맞으면 수행
            if (userInfo != null && token && userInfo.userId == board.userId) {
                const url = `${commonUrl}/boards`;
                axios.put(url,
                    {
                        board: {
                            boardId: board.boardId,
                            type: board.type,
                            title: board.title,
                            content: board.content
                        },
                        imageUrls:
                            allImageUrls
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                navigate("/board");
            }
        }
    }

    // useState의 상태변화는 onChange함수로 바꿔줘야함
    const typeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        console.log(value);
        setBoard((prevBoard) => ({
            ...prevBoard,
            type: value,
        }));
    }
    const titleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        console.log(value);
        setBoard((prevBoard) => ({
            ...prevBoard,
            title: value,
        }));
    }
    const contentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        console.log(value);
        setBoard((prevBoard) => ({
            ...prevBoard,
            content: value,
        }));
    }

   
        
    
    

    useEffect(() => {
        
        getBoard();
    
      }, []);

    return (
        <div>
            <Header />
            <form onSubmit={update}>
                <label htmlFor="type">카테고리:</label>
                <select required name="type" value={board.type} onChange={typeChange}>
                    <option hidden selected disabled value="">카테고리 선택</option>
                    <option value="1">공지사항</option>
                    <option value="2">취업</option>
                    <option value="3">교육</option>
                </select>
                <br/>
                <label htmlFor="title">제목:</label>
                <input type="text" name="title" value={board.title} onChange={titleChange}/>
                <br/>
                <label htmlFor="userId">작성자:</label>
                <input type="text" name="userId" readOnly value={board.userId} />
                <br />
                <label htmlFor="content">내용:</label>
                <textarea name="content" value={board.content} onChange={contentChange}/>
                <br />
                <button type="submit">수정</button>
            </form>

 

        <div className="file-add-button flex flex-row w-full justify-center gap-6">
          <label>사진 선택</label>

          <button
            type="button"
            onClick={handleFileIconClick}
            className="w-24 bg-green3 text-black rounded-md"
          >
            이미지 넣기
          </button>
            <div className="border rounded-md w-1/3 h-11 bg-white">
            {imageUrls.length > 0 && (
                        <div>
                            {imageUrls.map((url, index) => (
                                <div
                                    key={index}
                                    className="flex flex-row justify-between items-center p-2 border rounded-md"
                                >
                                    <p>{url}</p>
                                    <img
                                        src={clostImg}
                                        className="w-5 h-5"
                                        onClick={() => removeImageUrl(index)}
                                        alt="close icon"
                                    />
                                </div>
                            ))}
                        </div>
                    )}        

            {imgFiles.length > 0 && (
              <div>
                {imgFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex flex-row justify-between items-center p-2 border rounded-md"
                  >
                    <p>{file.name}</p>
                    <img
                      src={clostImg}
                      className="w-5 h-5"
                      onClick={() => removeFile(index)}
                      alt="close icon"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        </div>
    )
}