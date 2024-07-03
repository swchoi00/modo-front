import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { useEffect } from "react";
import Loading from "./Loading";

function KakaoLogin({ setUserInfo, setIsAuth }) {
  const URL = window.location.href;
  const match = /code=([^&]+)/.exec(URL);
  const navigate = useNavigate();

  useEffect(() => {
    if (match) {
      const code = decodeURIComponent(match[1]);

      axiosInstance
        .post("/oauth/kakao", { code: code })
        .then((response) => {
          const jwt = response.headers.authorization;
          console.log(response.data);
          // console.log(response.data.member[0]);
          if (jwt) {
            const userInfo = response.data;
            sessionStorage.setItem("jwt", jwt);
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
            setUserInfo(response.data.member[0]);
            setIsAuth(true);
            navigate("/");
          } else {
            navigate("/signUpSocial", {
              state: { data: response.data, code: code },
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [setUserInfo, setIsAuth]);

  return (
    <div>
      <Loading />
    </div>
  );
}

export default KakaoLogin;
