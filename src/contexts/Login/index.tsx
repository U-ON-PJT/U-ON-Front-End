import { Children, createContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface UserInfo {
    userId: string,
    name: string,
    birth: string,
    role: string,
    dongCode: string,
    center: string,
    experience: string,
    level: string,
    point: string,
    phone: string
}

interface Context {
  commonUrl: string;
  userInfo: UserInfo | null;
  login: (user: string, password: string) => void;
  logout: () => void;
}

// 초기 Context 값 설정
const initialContext: Context = {
  commonUrl: "http://localhost:80/uon/",
  userInfo: null,
  login: () => {},
  logout: () => {},
};

// Context 생성
const UserContext = createContext<Context>(initialContext);

interface Props {
  children: JSX.Element | JSX.Element[];
}

const UserContextProvider = ({ children }: Props) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const navigate = useNavigate();
  const [commonUrl, setCommonUrl] = useState<string>(
    "http://localhost:80/uon/"
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodeToken: any = jwtDecode(token);

        const currentTime = Date.now() / 1000;
        if (decodeToken.exp < currentTime) {
          setUserInfo(null);
          localStorage.clear();
        } else {
          const user: UserInfo = {
            userId: decodeToken.id,
            name: decodeToken.name,
            birth: decodeToken.birth,
            role: decodeToken.role,
            dongCode: decodeToken.dongCode,
            center: decodeToken.center,
            experience: decodeToken.experience,
            level: decodeToken.level,
            point: decodeToken.point,
            phone: decodeToken.phone
          };
          setUserInfo(user);
        }
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const login = async (userId: string, password: string) => {
    try {
      const resp = await axios.post(`${commonUrl}users/login`, {
        userId,
        password,
      });
  
      const token = resp.data;
      if (token != null) {
        localStorage.setItem("token", resp.data);
        const decodeToken: any = jwtDecode(token);
        // console.log(decodeToken.name);
        const user: UserInfo = {
          userId: decodeToken.id,
          name: decodeToken.name,
          birth: decodeToken.birth,
          role: decodeToken.role,
          dongCode: decodeToken.dongCode,
          center: decodeToken.center,
          experience: decodeToken.experience,
          level: decodeToken.level,
          point: decodeToken.point,
          phone: decodeToken.phone
        };
        setUserInfo(user);
      }
      navigate("/")
    } catch (error) {
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  const logout = () => {
    setUserInfo(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ commonUrl, userInfo, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
