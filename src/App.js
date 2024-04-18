import { useEffect, useState } from 'react';
import './App.css';
import axiosInstance from './axiosInstance';
import axios from 'axios';
import React from 'react';

function App() {

  // 모바일 하단 탭바 사용을 위한 현재 웹화면 경로 추적 코드
  const location = useLocation();
  const [pageNow, setPageNow] = useState(location.pathname);

  // 지울거임
  const [test, setTest] = useState();

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
  }, []);

  

  const [userInfo, setUserInfo] = useState({
    username : '',
    nickname : ''
  });


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

  const [message, setMessage] = useState('');


  useEffect(() => {
    axios.get('http://localhost:8888/test')
    .then(response => {
      console.log(response);
      setMessage(response.data);
    }).catch(error => {
      console.log(error);
    })
  }, [])

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
}

export default App;
