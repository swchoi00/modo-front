import { useState } from 'react';
import './AdminLogin.css';
import axiosInstance from '../../axiosInstance';
import Admin from '../Admin';

const AdminLogin = () => {

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const changeHandler = (e) => {
    setLoginData({
      [e.target.name]: e.target.value
    })
  }

  // ⭐⭐⭐ 로그인 정보 서버에 보내기
  const loginBtnHandler = () => {
    axiosInstance.post('/????????????????', loginData)
      .then((response) => {
        alert(response.data);
        // setSelectedMenu('회원관리');
      }).catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Admin />
        <div className='login-box'>
          <h1 className='title'>로그인</h1>
          <form>
            <div className='log'>
              <div className='idpw'>
                <div>아이디</div>
                <input type='text' name='username' onChange={changeHandler} />
                <div>비밀번호</div>
                <input type='password' name='password' onChange={changeHandler} />
              </div>
              <button type='submit' className='loginBtn' onClick={loginBtnHandler}>로그인 하기</button>
            </div>
          </form>
        </div>
    </>
  )
}

export default AdminLogin;