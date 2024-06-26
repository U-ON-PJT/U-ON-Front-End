import { Header } from "components/Header"
import { useRef, useContext, useState } from "react"
import { UserContext } from "contexts/Login"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import clostImg from 'assets/imgs/close.png'

export const Write = () => {

    const navigate = useNavigate();

    const { userInfo } = useContext(UserContext);

    const { commonUrl } = useContext(UserContext);
    const board = {
        type: useRef<HTMLSelectElement>(null),
        title: useRef<HTMLInputElement>(null),
        content: useRef<HTMLTextAreaElement>(null),
    }

  
    const [imgFiles, setImageFiles] = useState<File[]>([]);

    // imgBB에 업로드
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

    // FormEvent를 막아줘야 실패 시 초기화 안됨
    const write = async (e: React.FormEvent) => {
        e.preventDefault();

      const token = localStorage.getItem("token");
        // 토큰과 로그인 정보가 존재하는지
      if (userInfo != null && token) {
            // imgBB를 통해 이미지를 url로 만들고 배열을 생성해서 저장
            let uploadedImageUrls: string[] = [];
            for (const file of imgFiles) {
                const imageUrl = await uploadImageToImgBB(file);
                if (imageUrl) {
                  uploadedImageUrls.push(imageUrl);
                }
              }

            const url = `${commonUrl}boards`;
            console.log(userInfo.userId);
            // try {
            const resp = await axios.post(url,
                {
                    board: {
                        userId: userInfo.userId,
                        type: board.type.current?.value,
                        title: board.title.current?.value,
                        content: board.content.current?.value
                    },
                    imageUrls: 
                        uploadedImageUrls
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                },
                    
                    
                );
                console.log(resp);
                navigate("/board");
            // } catch (error) {
            //     alert("작성에 실패했습니다.");
            // }
            
        }

        else {
            alert("로그인 해주세요");
            navigate("/login")
        }
    }

    return (
        <div>
            <Header />
            <form onSubmit={write}>
                <label htmlFor="type">카테고리:</label>
                <select required name="type" ref={board.type}>
                    <option hidden selected disabled value="">카테고리 선택</option>
                    <option value="1">공지사항</option>
                    <option value="2">취업</option>
                    <option value="3">교육</option>
                </select>
                <br/>
                <label htmlFor="title">제목:</label>
                <input type="text" name="title" ref={board.title}/>
                <br/>
                <label htmlFor="userId">작성자:</label>
                <input type="text" name="userId" readOnly value={userInfo?.userId} />
                <br />
                <label htmlFor="content">내용:</label>
                <textarea name="content" ref={board.content} />
                <br />
                <button type="submit">작성</button>
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