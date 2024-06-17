import { Routes, Route, Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from 'contexts/Login';

export const Header = () => {
    const { userInfo } = useContext(UserContext);
    const { logout } = useContext(UserContext);

    return (
        <nav className="flex justify-between">
            <div className="flex">
                <Link to="/">home</Link>
                <Link to="/board">게시판</Link>
                <Link to="/matching">매칭</Link>
            </div>

            <div className="flex">
                {
                    userInfo == null ? (
                        <>
                        <Link to="/login">로그인</Link>
                        <Link to="/sign-up">회원가입</Link>
                        </>
                    ) :
                    (
                        <>
                        <span>{userInfo.userId}님 안녕하세요</span>
                        <Link to="/" onClick={logout}>로그아웃</Link>
                        </>
                    )
                }
                                
            </div>
        </nav>
    )
}