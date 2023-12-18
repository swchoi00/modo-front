import { useEffect, useState } from 'react';
import './App.css';
import axiosInstance from './axiosInstance';
import axios from 'axios';
import React from 'react';
import Header from './MainComponent/Header';
import { Route, Routes } from 'react-router-dom';

function App() {

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
      <Header/>

      <div className='AppBody'>
        <Routes>
          <Route/>
        </Routes>

      </div>
      {/* <h1>{message}</h1> */}
      <div className="dd">안녕하세요안녕하세요안녕하세요</div>
      
    </div>
  );
}

export default App;
