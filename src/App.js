import { useEffect, useState } from 'react';
import './App.css';
import axiosInstance from './axiosInstance';
import axios from 'axios';
import React from 'react';
import Header from './header/Header';

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
      <Header></Header>
    </div>
  );
}

export default App;
