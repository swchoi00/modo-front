import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
// import { useEffect } from "react";

function GoogleLogin ( {setUserInfo, isAuth, setIsAuth}) {

    const URL = window.location.href;
    const match = /access_token=([^&]+)/.exec(URL);
    const navigate = useNavigate();

    if(match) {
        const accessToken = decodeURIComponent(match[1]);

        axiosInstance.post('/oauth/google', {accessToken : accessToken})
        .then(response => {
            const jwt = response.headers.authorization;
            if(jwt) {
                const userInfo = response.data.member[0];
                sessionStorage.setItem('jwt', jwt);
                sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
                setUserInfo(response.data.member[0]);
                setIsAuth(true);
                // navigate(-3);
                navigate('/');
              
            }
        }).catch(error => {
            alert('로그인 실패')
            console.log(error);
        })
    } else {
        console.log('액세스토큰 오류');
    }

    return (
        <div>
            로그인 처리중
        </div>
    )
}

export default GoogleLogin;