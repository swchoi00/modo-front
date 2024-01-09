import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

function KakaoLogin() {

    const URL = window.location.href;
    const match = /code=([^&]+)/.exec(URL);
    const navigate = useNavigate();

    if(match) {
        const code = decodeURIComponent(match[1]);
        
        axiosInstance.post('/oauth/kakao', {code:code})
          .then(response => {
            const jwt = response.headers.authorization;
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

export default KakaoLogin;