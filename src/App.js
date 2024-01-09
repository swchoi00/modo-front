import { useEffect, useState } from 'react';
import './App.css';
import axiosInstance from './axiosInstance';
import axios from 'axios';
import React from 'react';
import Header from './header/Header';
import SignUp from './SignUp/SignUp';
import Login from './Login/Login';
import { Route, Routes } from 'react-router-dom';
import KakaoLogin from './Login/KakaoLogin';
import GoogleLogin from './Login/GoogleLogin';
import NaverLogin from './Login/NaverLogin';

function App() {

  const [message, setMessage] = useState('');

  const [userInfo, setUserInfo] = useState({
    username : '',
    nickname : '',
  });
  

  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/signUp' element={<SignUp />}></Route>
        <Route path='/login' element={<Login userInfo={userInfo} setUserInfo={setUserInfo} />}></Route>
        <Route path='/oauth/kakao' element={<KakaoLogin />}></Route>
        <Route path='/oauth/google' element={<GoogleLogin />}></Route>
        <Route path='/oauth/naver' element={<NaverLogin />}></Route>
      </Routes>
    </div>
  );
}

export default App;
