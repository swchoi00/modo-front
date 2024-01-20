import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { useEffect } from "react";

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
                sessionStorage.setItem('jwt', jwt);
                setUserInfo(response.data.member[0]);
                setIsAuth(true);
                navigate('/')
              
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