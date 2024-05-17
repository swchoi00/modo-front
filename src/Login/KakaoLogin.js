import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { useEffect } from "react";

function KakaoLogin( {setUserInfo, setIsAuth} ) {

  const URL = window.location.href;
  const match = /code=([^&]+)/.exec(URL);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = sessionStorage.getItem('jwt');
    if(jwt) {
        setIsAuth(true);
    }
})

  if (match) {
    const code = decodeURIComponent(match[1]);

    axiosInstance.post('/oauth/kakao', { code: code })
      .then(response => {
        const jwt = response.headers.authorization;
        console.log(response.data.member[0]);
        if (jwt) {
          const userInfo = response.data.member[0];
          sessionStorage.setItem('jwt', jwt);
          sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
          setUserInfo(response.data.member[0]);
          setIsAuth(true);
          navigate('/');
          // navigate(-2);
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