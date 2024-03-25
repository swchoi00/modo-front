import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

function KakaoLogin( {setUserInfo, setIsAuth} ) {

  const URL = window.location.href;
  const match = /code=([^&]+)/.exec(URL);
  const navigate = useNavigate();

  if (match) {
    const code = decodeURIComponent(match[1]);

    axiosInstance.post('/oauth/kakao', { code: code })
      .then(response => {
        const jwt = response.headers.authorization;
        console.log(response.data.member[0]);
        if (jwt) {
          sessionStorage.setItem('jwt', jwt);
          setUserInfo(response.data.member[0]);
          setIsAuth(true);
          navigate('/');
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