import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import Loading from "./Loading";
// import { useEffect } from "react";

function GoogleLogin({ setUserInfo, isAuth, setIsAuth }) {

  const URL = window.location.href;
  const match = /access_token=([^&]+)/.exec(URL);
  const navigate = useNavigate();

  if (match) {
    const accessToken = decodeURIComponent(match[1]);

    axiosInstance.post('/oauth/google', { accessToken: accessToken })
      .then(response => {
        const jwt = response.headers.authorization;
        if (jwt) {
          if (jwt) {
            let userInfo = response.data.member[0];
            if (userInfo.memberImage !== null) {
              //프로필 이미지 받아오기
              axiosInstance.get(`/userProfilePhoto/${userInfo.id}`, {
                responseType: 'blob',
              })
                .then((response) => {
                  const imageUrl = URL.createObjectURL(response.data);
                  setUserInfo({ ...userInfo, 'memberImage': imageUrl });
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              setUserInfo({ ...userInfo, 'memberImage': 'https://raw.githubusercontent.com/Jella-o312/modo-image/main/etc/userImgNone.svg' });
            }

            // const userInfo = response.data.member[0];
            sessionStorage.setItem('jwt', jwt);
            sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
            // setUserInfo(response.data.member[0]);
            setIsAuth(true);
            navigate('/');

          }
        } else {
          // navigate('/signUpSocial', {state : response.data});
          navigate('/signUpSocial', { state: { data: response.data, accessToken: accessToken } });
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
      <Loading />
    </div>
  )
}

export default GoogleLogin;