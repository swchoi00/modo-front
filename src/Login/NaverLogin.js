import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

function NaverLogin () {
    
    const URL = window.location.href;
    const match = /code=([^&]+)&state=([^&]+)/.exec(URL);
    const navigate = useNavigate();
    
    if(match) {
        
        const code = decodeURIComponent(match[1]);
        const state = decodeURIComponent(match[2]);

        axiosInstance.post('/oauth/naver', {code:code, state:state})
        .then(response => {
            const jwt = response.headers.authorization;
            sessionStorage.getItem(jwt);
            console.log(response.data);
            if(jwt) {
                sessionStorage.setItem('jwt', jwt);
                navigate('/signUp');
            }
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div>
            로그인 처리중
        </div>
    )
}

export default NaverLogin;