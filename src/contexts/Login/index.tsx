import { Children, createContext, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

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
}

interface Context {
    userInfo: UserInfo | null;
    login: (user: string, password: string) => void;
    logout: () => void;
}

// 초기 Context 값 설정
const initialContext: Context = {
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

    const login = async (userId: string, password: string) => {
        const resp = await axios.post(
            "http://localhost:80/uon/users/login",
            {
                userId,
                password
            }
        )

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
            }
            setUserInfo(user);
        }
    }

    const logout = () => {
        setUserInfo(null);
        localStorage.removeItem('token');
    }

    return (
        <UserContext.Provider value={{ userInfo, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider };