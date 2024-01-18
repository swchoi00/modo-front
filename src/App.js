import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './Home/Header';
import Footer from './Home/Footer';
import Main from './Home/Main';
import MoblieTabBar from './Home/MoblieTabBar';
import Moim from './Moim/Moim';
// import axiosInstance from './axiosInstance';
// import axios from 'axios';
import SignUp from './SignUp/SignUp';
import Login from './Login/Login';
import KakaoLogin from './Login/KakaoLogin';
import GoogleLogin from './Login/GoogleLogin';
import NaverLogin from './Login/NaverLogin';
import AddMoim from './Moim/MoimComponent/AddMoim';

function App() {

  // const [message, setMessage] = useState('');

  // useEffect(() => {
  //   axios.get('http://localhost:8888/test')
  //   .then(response => {
  //     console.log(response);
  //     setMessage(response.data);
  //   }).catch(error => {
  //     console.log(error);
  //   })
  // }, [])

  // 모바일 하단 탭바 사용을 위한 현재 웹화면 경로 추적 코드
  const location = useLocation();
  const [pageNow, setPageNow] = useState(location.pathname);


  useEffect(() => {
    setPageNow(location.pathname);  
  }, [location.pathname]);

  const [userInfo, setUserInfo] = useState({
    username : '',
    nickname : '',
  });

console.log(userInfo.username);
  return (
    <div className="App">
      <Header />

      <div className='App-Body'>
        <Routes>
          <Route path ='/'element={<Main />}/> 
          <Route path='/moim' element={<Moim/>}/> 
          <Route path='/addMoim' element={<AddMoim/>}/> 
          <Route path='/signUp' element={<SignUp />}></Route>
          <Route path='/login' element={<Login userInfo={userInfo} setUserInfo={setUserInfo} />}></Route>
          <Route path='/oauth/kakao' element={<KakaoLogin />}></Route>
          <Route path='/oauth/google' element={<GoogleLogin />}></Route>
          <Route path='/oauth/naver' element={<NaverLogin />}></Route>
          
        </Routes>
      </div>
      
      <Footer/>
      <MoblieTabBar pageNow={pageNow} />


    </div>
  );
}

export default App;
