import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
    return (
        <div className="Login">
            <h3>로그인</h3>

            <div className="loginForm">
                <br></br>
                <br></br>

                <div className='inputWrapper'>아이디 (이메일)</div>
                <div className='listContainer'>
                    <input type='text' className='inputText' placeholder='이메일을 입력해주세요'></input>
                </div>

                <div className='inputWrapper'>비밀번호</div>
                <div className='listContainer'>
                    <input type='text' className='inputText' placeholder='영문, 숫자, 특수문자 조합 8자 이상 입력해주세요'></input>
                </div>
                <br></br>

                <div className='loginBtnWrapper'>
                    <button className='loginBtn'>로그인하기</button>
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
                        <button className='naverLoginBtn' onClick={() => { alert('🙏준비중입니다') }}>
                            <img className='naverLoginImg' src="https://d2v80xjmx68n4w.cloudfront.net/assets/icon/icon_naver.png" alt="sns아이콘" />
                        </button>
                    </div>


                    <div className='naverLogin'>
                        <button className='kakaoLoginBtn'>
                            <img className='kakaoLoginImg' src="https://d2v80xjmx68n4w.cloudfront.net/assets/icon/icon_kakao.png" alt="sns아이콘"></img>
                        </button>
                    </div>

                    <div className='naverLogin'>
                        <button className='googleLoginBtn'>
                            <img className='googleLoginImg' src="https://d2v80xjmx68n4w.cloudfront.net/assets/icon/icon_google.png" alt="sns아이콘" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login;