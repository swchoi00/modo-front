import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import Loading from "./Loading";

function NaverLogin ( {setIsAuth, setUserInfo} ) {
    
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
                const userInfo = response.data.member[0];
                sessionStorage.setItem('jwt', jwt);
                sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
                setUserInfo(response.data.member[0]);
                setIsAuth(true);
                navigate('/');
            }else{
                navigate('/signUpSocial', {state : response.data});
            }
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div>
            <Loading/>
        </div>
    )
}

export default NaverLogin;