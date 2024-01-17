// import { useEffect, useState } from 'react';
// import axios from 'axios';
import './App.css';
import React, { useEffect, useState } from 'react';
import Header from './Home/Header';
import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from './Home/Footer';
import Main from './Home/Main';
import MoblieTabBar from './Home/MoblieTabBar';
import Moim from './Moim/Moim';

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



  return (
    <div className="App">
      <Header />

      <div className='App-Body'>
        <Routes>
          <Route path ='/'element={<Main />}/> 
          <Route path='/moim' element={<Moim/>}/> 
        </Routes>
      </div>
      
      <Footer/>
      <MoblieTabBar pageNow={pageNow} />

    </div>
  );
}

export default App;
