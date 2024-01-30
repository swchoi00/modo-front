// import { useEffect, useState } from 'react';
// import axios from 'axios';
import './App.css';
import React, { useEffect, useState } from 'react';
// import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './Home/Header';
import Footer from './Home/Footer';
import Main from './Home/Main';
import MoblieTabBar from './Home/MoblieTabBar';
import Moim from './Moim/Moim';
import axiosInstance from './axiosInstance';
import axios from 'axios';
import SignUp from './SignUp/SignUp';
import Login from './Login/Login';
import KakaoLogin from './Login/KakaoLogin';
import GoogleLogin from './Login/GoogleLogin';
import NaverLogin from './Login/NaverLogin';
import TestAddMoim from './Moim/TestAddMoim';
import MyPage from './MyPage/MyPage';
import Faq from './Home/FAQ/Faq';
import Notice from './Home/FAQ/Notice';
import FaqDetails from './Home/FAQ/FaqDetails';
import NoticeDetails from './Home/FAQ/NoticeDetails';
import InquiryForm from './Home/FAQ/InquiryForm/InquiryForm';

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

  const [notice, setNotice] = useState({
    title : '',
    content : '',
    member : userInfo.username
  })

  const [isAuth, setIsAuth] = useState(false); // 로그인 상태 확인

  useEffect(() => {
    
    const storedJwt = sessionStorage.getItem('jwt');
    setIsAuth(storedJwt !== null);

  }, []);

  useEffect(() => {
    console.log("Auth바뀜 : " + isAuth);
  }, [isAuth]);

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="App">
      <Header userInfo={userInfo} isAuth={isAuth} setIsAuth={setIsAuth}/>

      <div className='App-Body'>
        <Routes>
          <Route path ='/'element={<Main />}/> 

          <Route path ='/faq' element={<Faq currentPage={currentPage} setCurrentPage={setCurrentPage}/>}/>
          <Route path ='/faqDetails/:id' element={<FaqDetails currentPage={currentPage} setCurrentPage={setCurrentPage}/>}/>

          <Route path ='/notice' element={<Notice userInfo={userInfo} currentPage={currentPage} setCurrentPage={setCurrentPage}/>}/>
          <Route path ='/noticeDetails/:id' element={<NoticeDetails notice={notice} currentPage={currentPage} setCurrentPage={setCurrentPage}/>}/>

          <Route path='/inquiryForm' element={<InquiryForm userInfo={userInfo} currentPage={currentPage} setCurrentPage={setCurrentPage}/>}/>

          <Route path='/moim' element={<Moim/>}/>
          <Route path='/testAddMoim' element={<TestAddMoim userInfo={userInfo} />}></Route>  {/* 나중에 바꿔야함 */}
          <Route path='/signUp' element={<SignUp />}></Route>
          <Route path='/login' element={<Login userInfo={userInfo} setUserInfo={setUserInfo} isAuth={isAuth} setIsAuth={setIsAuth} />}></Route>
          <Route path='/myPage' element={<MyPage userInfo={userInfo} setUserInfo={setUserInfo}></MyPage>}></Route>
          <Route path='/oauth/kakao' element={<KakaoLogin setUserInfo={setUserInfo} isAuth={isAuth} setIsAuth={setIsAuth} />}></Route>
          <Route path='/oauth/google' element={<GoogleLogin setUserInfo={setUserInfo} isAuth={isAuth} setIsAuth={setIsAuth} />}></Route>
          <Route path='/oauth/naver' element={<NaverLogin setUserInfo={setUserInfo} isAuth={isAuth} setIsAuth={setIsAuth} />}></Route>
        </Routes>
      </div>
      
      <Footer/>
      <MoblieTabBar pageNow={pageNow} />


    </div>
  );
}

export default App;
