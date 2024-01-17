import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import axiosInstance from '../axiosInstance';
import { useState } from 'react';

function Login( {userInfo, setUserInfo, setIsAuth} ) {

    const navigate = useNavigate();

    const appleLoginHandler = () => {
        alert('서비스 준비중입니다!');
    }

    const [loginData, setLoginData] = useState({
        username : '',
        password : ''
    });

    const idPwHandler = (e) => {
        const {id , value} = e.target;
        setLoginData({
            ...loginData,
            [id] : value,
        })

        console.log(loginData);
    }

    const LoginBtnHandler = (e) => {
        e.preventDefault();

        axiosInstance.post('/login', loginData)
        .then((response => {
            
            const jwt = response.headers.authorization;
            alert('로그인 완료!')
            console.log(response.data.member[0]);
            sessionStorage.setItem('jwt', jwt);
            setUserInfo(response.data.member[0]);
            setIsAuth(true);
            navigate('/');

            
        }))
        .catch((error => {
            console.error(error);
            alert('아이디 비밀번호를 확인하세요')
        }));

        
    }

    return (
        <div className="Login">
            <h3>로그인</h3>

            <div className="loginForm">
                <br></br>
                <br></br>

                <div className='inputWrapper'>아이디 (이메일)</div>
                <div className='listContainer'>
                    <input type='text' id='username' className='inputText' placeholder='이메일을 입력해주세요' onChange={idPwHandler} value={loginData.username}></input>
                </div>

                <div className='inputWrapper'>비밀번호</div>
                <div className='listContainer'>
                    <input type='password' id='password' className='inputText' placeholder='영문, 숫자, 특수문자 조합 8자 이상 입력해주세요' onChange={idPwHandler} value={loginData.password}></input>
                </div>
                <br></br>

                <div className='loginBtnWrapper'>
                    <button className='loginBtn' onClick={LoginBtnHandler}>로그인하기</button>
                </div>

                <div className='findIdPwWrapper'>
                    <div className='findIdPw'>
                        <Link className='findId' to={"/"}>아이디 찾기</Link>
                        <div className='divider'>│</div>
                        <Link className='findPw' to={"/"}>비밀번호 찾기</Link>
                        <div className='divider'>│</div>
                        <Link className='signUp' to={"/signUp"}>회원가입</Link>
                    </div>
                </div>

                <div className='socialLoginBar' style={{width : '80%', borderBottom : '1px solid #c2c2c2'}}></div>

                <div className='socialLogin'>
                    <div className='naverLogin'>
                        <button className='naverLoginBtn' 
                        onClick={() => {
                            window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&state=${process.env.REACT_APP_NAVER_STATE}&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}`;
                        }}>
                            <img className='naverLoginImg' src="https://d2v80xjmx68n4w.cloudfront.net/assets/icon/icon_naver.png" alt="sns아이콘" />
                        </button>
                    </div>


                    <div className='kakaoLogin'>
                        <button className='kakaoLoginBtn'
                        onClick={() => {
                            window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`;
                        }}>
                            <img className='kakaoLoginImg' src="https://d2v80xjmx68n4w.cloudfront.net/assets/icon/icon_kakao.png" alt="sns아이콘"></img>
                        </button>
                    </div>

                    <div className='googleLogin'>
                        <button className='googleLoginBtn'
                        onClick={() => {
                            window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=token&scope=openid%20email%20profile`;
                        }}>
                            <img className='googleLoginImg' src="https://d2v80xjmx68n4w.cloudfront.net/assets/icon/icon_google.png" alt="sns아이콘" />
                        </button>
                    </div>

                    <div className='appleLogin'>
                        <button className='appleLoginBtn' onClick={appleLoginHandler}>
                            <img className='appleLoginImg' src="https://d2v80xjmx68n4w.cloudfront.net/assets/icon/icon_apple.png" alt="sns아이콘" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login;