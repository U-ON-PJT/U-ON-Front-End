import { Header } from "components/Header";
import { useRef, useContext, useState } from "react";
import { UserContext } from "contexts/Login";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import clostImg from "assets/imgs/close.png";

export const Write = () => {
  const navigate = useNavigate();

  const { userInfo } = useContext(UserContext);

  const { commonUrl } = useContext(UserContext);
  const board = {
    type: useRef<HTMLSelectElement>(null),
    title: useRef<HTMLInputElement>(null),
    content: useRef<HTMLTextAreaElement>(null),
  };

  const [imgFiles, setImageFiles] = useState<File[]>([]);

  // imgBB에 업로드
  const uploadImageToImgBB = async (file: File) => {
    const key = "25bb102de5f5e0ca0d18c71ba0286b11";
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${key}`,
        {
          method: "POST",
          body: formData,
        }
      );

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

      const url = `${commonUrl}/boards`;
      console.log(userInfo.userId);
      // try {
      const resp = await axios.post(
        url,
        {
          board: {
            userId: userInfo.userId,
            type: board.type.current?.value,
            title: board.title.current?.value,
            content: board.content.current?.value,
          },
          imageUrls: uploadedImageUrls,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(resp);
      navigate("/board");
      // } catch (error) {
      //     alert("작성에 실패했습니다.");
      // }
    } else {
      alert("로그인 해주세요");
      navigate("/login");
    }
  };

  return (
    <div className="px-5">
      <h1 className="mt-5 mb-5 text-left text-lg font-semibold">
        게시물 등록하기
      </h1>
      <form onSubmit={write}>
        <div className="text-left space-y-3">
          <div className="flex space-x-3">
            <div>
              <label htmlFor="title" className="text-sm text-gray-500">
                제목 *
              </label>
              <input
                className="border border-gray-500 rounded-lg px-5 py-2 mb-3 w-full"
                type="text"
                name="title"
                ref={board.title}
              />
            </div>
            <div>
              <label htmlFor="type" className="text-sm text-gray-500">
                유형 *
              </label>
              <br />
              <select
                required
                name="type"
                ref={board.type}
                className="border border-gray-500 rounded-lg px-3 py-2"
              >
                <option hidden selected disabled value="0">
                  유형
                </option>
                <option value="1">공지사항</option>
                <option value="2">취업</option>
                <option value="3">교육</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="content" className="text-sm text-gray-500">
              내용 *
            </label>
            <textarea
              name="content"
              ref={board.content}
              className="space-x-5 border border-gray-500 rounded-lg px-5 py-5 h-52 w-full"
            ></textarea>
          </div>
          <div className="file-add-button">
            <label className="text-sm text-gray-500">사진 선택</label>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handleFileIconClick}
                className="px-3 py-2 bg-gray-200 rounded-lg"
              >
                이미지 넣기
              </button>
              <div className="border rounded-md bg-white">
                {imgFiles.length > 0 && (
                  <div>
                    {imgFiles.map((file, index) => (
                      <div key={index} className="p-2 border rounded-md">
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
        </div>
        <button
          type="submit"
          className="bg-main-color text-white font-semibold px-6 py-3 mt-10 rounded-md shadow-lg"
        >
          등록하기
        </button>
      </form>
    </div>
  );
};
