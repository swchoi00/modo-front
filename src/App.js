import { useEffect, useState } from 'react';
import './App.css';
import axiosInstance from './axiosInstance';
import axios from 'axios';
import React from 'react';

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
      <h1>{message}</h1>
    </div>
  );
}

export default App;
