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
import MyPage from './MyPage/MyPage';
import Faq from './Home/FAQ/Faq';
import Notice from './Home/FAQ/Notice';
import FaqDetails from './Home/FAQ/FaqDetails';
import NoticeDetails from './Home/FAQ/NoticeDetails';
import InquiryForm from './Home/FAQ/InquiryForm/InquiryForm';
import InquiryForm_write from './Home/FAQ/InquiryForm/InquiryForm_write';
import Notice_write from './Home/FAQ/Notice_write';
import Faq_write from './Home/FAQ/Faq_write';
import InquiryFormDetail from './Home/FAQ/InquiryForm/InquiryFormDetail';
import Community from './Community/Community';
import AddComm from './Community/AddComm';
import CommDetail from './Community/CommDetail';
import AddComm2 from './Community/Notice/AddComm2';
// import MoimDetailBoardCommComponent from './Moim/MoimDetailComponent/MoimDetailInnerComponent/MoimDetail-BoardCommComponent';

import MoimBoard from './Moim/MoimDetail/Moim-board';
import MoimGallery from './Moim/MoimDetail/Moim-gallery';
import MoimChat from './Moim/MoimDetail/Moim-chat';
import MoimHome from './Moim/MoimDetail/Moim-home';
import MoimDetailBoardCommComponent from './Moim/MoimDetailInnerComponent/MoimDetail-BoardCommComponent';
import MoimDetailBoardScheduleDetail from './Moim/MoimDetailInnerComponent/MoimDetail-BoardSchdule-Detail';
import MoimDetailBoardScheduleDetailMember from './Moim/MoimDetailInnerComponent/MoimDetail-BoardSchedule-Detail-Member';
import MoimDetailBoardCommDetail from './Moim/MoimDetailInnerComponent/MoimDetail-BoardComm-Detail';
import NoticeWrite from './Community/Notice/NoticeWrite';
import Inquiry from './Community/Inquiry/Inquiry';
import InquiryWrite from './Community/Inquiry/InquiryWrite';


function App() {

  // 모바일 하단 탭바 사용을 위한 현재 웹화면 경로 추적 코드
  const location = useLocation();
  const [pageNow, setPageNow] = useState(location.pathname);


  useEffect(() => {
    setPageNow(location.pathname);  
  }, [location.pathname]);

  useEffect(() => {
    const storedUserInfo = sessionStorage.getItem('userInfo');
    if (storedUserInfo) {
      const userInfoObject = JSON.parse(storedUserInfo); // 문자열을 객체로 변환
      setUserInfo(userInfoObject);
      setIsAuth(true);
    }

    console.log(`%c
    💜 Welcome 💜
    
    ███╗   ███╗ ██████╗ ██████╗  ██████╗ 
    ████╗ ████║██╔═══██╗██╔══██╗██╔═══██╗
    ██╔████╔██║██║   ██║██║  ██║██║   ██║
    ██║╚██╔╝██║██║   ██║██║  ██║██║   ██║
    ██║ ╚═╝ ██║╚██████╔╝██████╔╝╚██████╔╝
    ╚═╝     ╚═╝ ╚═════╝ ╚═════╝  ╚═════╝ 
                                                       
    `, 'color: #a472ff');
  }, []);

  

  const [userInfo, setUserInfo] = useState({
    username : '',
    nickname : ''
  });

  const [moimInfo, setMoimInfo] = useState({});


  const [notice, setNotice] = useState({
    title : '',
    content : '',
    member : userInfo.username
  });

  const [inquiryForm, setInquiryForm] = useState({
    title : '',
    content : '',
    member : userInfo.username
  });

  const [isAuth, setIsAuth] = useState(false); // 로그인 상태 확인

  useEffect(() => {
    
    const storedJwt = sessionStorage.getItem('jwt');
    setIsAuth(storedJwt !== null);

  }, []);

  useEffect(() => {
    console.log("Auth바뀜 : " + isAuth);
  }, [isAuth]);

  // 게시글 리스트 페이지네이션 용 
  const [currentPage, setCurrentPage] = useState(1);




  return (
    <div className="App" style={{scrollBehavior: 'unset'}}>
      <Header userInfo={userInfo} isAuth={isAuth} setIsAuth={setIsAuth} setUserInfo= {setUserInfo}/>

      <div className='App-Body'>
        <Routes>
          <Route path ='/'element={<Main />}/> 
          <Route path='/moim' element={<Moim isAuth={isAuth} userInfo={userInfo} setUserInfo={setUserInfo}/>}/>
          {/* ↓ 모임상세페이지 URL값 , 나중에 유저정보 보내줘야함*/}
          <Route path = '/moim/:id/home' element={<MoimHome isAuth={isAuth} userInfo={userInfo} setUserInfo={setUserInfo} 
                                                         moimInfo={moimInfo} setMoimInfo={setMoimInfo} />}/>
          <Route path= '/moim/:id/board' element={<MoimBoard isAuth={isAuth} userInfo={userInfo} moimInfo={moimInfo} setMoimInfo={setMoimInfo}
                                                              currentPage={currentPage} setCurrentPage={setCurrentPage}
                                                  />}/>                
          <Route path= '/moim/:id/gallery' element={<MoimGallery isAuth={isAuth} userInfo={userInfo} moimInfo={moimInfo} 
                                                                 setMoimInfo={setMoimInfo} currentPage={currentPage} 
                                                                 setCurrentPage={setCurrentPage}/>}/>   
          <Route path= '/moim/:id/chat' element={<MoimChat isAuth={isAuth} userInfo={userInfo} moimInfo={moimInfo} 
                                                                 setMoimInfo={setMoimInfo} currentPage={currentPage} 
                                                                 setCurrentPage={setCurrentPage}/>}/>                           

          <Route path = '/moim/:id/write' element={<MoimDetailBoardCommComponent isAuth={isAuth} userInfo={userInfo}/>}/>
          <Route path = '/moim/:id/comm/:no' element={<MoimDetailBoardCommDetail isAuth={isAuth} userInfo={userInfo}/>}/>                                                                 
          <Route path='/moim/:id/schedule/:no' element={<MoimDetailBoardScheduleDetail isAuth={isAuth} userInfo={userInfo} moimInfo={moimInfo} 
                                                                 setMoimInfo={setMoimInfo}/>}/>   
          <Route path='/moim/:id/schedule/:no/member' element={<MoimDetailBoardScheduleDetailMember/>}/>                                                                                                 
          <Route path='/addMoim' element={<AddMoim userInfo={userInfo}/>}/> 

          <Route path ='/faq' element={<Faq userInfo={userInfo} currentPage={currentPage} setCurrentPage={setCurrentPage}/>}/>
          <Route path ='/faqDetail/:id' element={<FaqDetails currentPage={currentPage} setCurrentPage={setCurrentPage}/>}/>
          <Route path ='/faq_write' element={<Faq_write userInfo={userInfo} />} />

          {/* <Route path ='/notice' element={<Notice userInfo={userInfo} currentPage={currentPage} setCurrentPage={setCurrentPage}/>}/> */}
          <Route path ='/noticeDetail/:id' element={<NoticeDetails notice={notice} currentPage={currentPage} setCurrentPage={setCurrentPage}/>}/>
          <Route path ='/notice_write' element={<Notice_write userInfo={userInfo}/>} />

          <Route path='/inquiryForm' element={<InquiryForm userInfo={userInfo} currentPage={currentPage} setCurrentPage={setCurrentPage}/>}/>
          <Route path='/inquiryFormDetail/:id' element={<InquiryFormDetail userInfo={userInfo} currentPage={currentPage} setCurrentPage={setCurrentPage} />} />
          <Route path='/inquiryForm_write' element={<InquiryForm_write userInfo={userInfo} />}/>

          <Route path='/signUp' element={<SignUp />}></Route>
          <Route path='/login' element={<Login userInfo={userInfo} setUserInfo={setUserInfo} isAuth={isAuth} setIsAuth={setIsAuth} />}></Route>
          <Route path='/myPage' element={<MyPage userInfo={userInfo} setUserInfo={setUserInfo}></MyPage>}></Route>
          <Route path='/oauth/kakao' element={<KakaoLogin setUserInfo={setUserInfo} isAuth={isAuth} setIsAuth={setIsAuth} />}></Route>
          <Route path='/oauth/google' element={<GoogleLogin setUserInfo={setUserInfo} isAuth={isAuth} setIsAuth={setIsAuth} />}></Route>
          <Route path='/oauth/naver' element={<NaverLogin setUserInfo={setUserInfo} isAuth={isAuth} setIsAuth={setIsAuth} />}></Route>
        
          <Route path='/community' element={<Community currentPage={currentPage} setCurrentPage={setCurrentPage} isAuth={isAuth}/>}/>
          <Route path='/addComm' element={<AddComm userInfo={userInfo}/>} />
          <Route path='/comm/:id' element={<CommDetail isAuth={isAuth} userInfo={userInfo}/>} />

                {/* Notice 로 바꿔야함 */}
          <Route path='/notice' element={<AddComm2 currentPage={currentPage} setCurrentPage={setCurrentPage} userInfo={userInfo}/>} />
          <Route path='/noticeWrite' element={<NoticeWrite userInfo={userInfo}/>} />

          <Route path='/inquiry' element={<Inquiry userInfo={userInfo}/>} />
          <Route path='/inquiryWrite' element={<InquiryWrite userInfo={userInfo}/>} />
        </Routes>
      </div>
      
      <Footer/>
      <MoblieTabBar pageNow={pageNow} />


    </div>
  );
}

export default App;
