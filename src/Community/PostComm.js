import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './PostComm.css';
import axiosInstance from '../axiosInstance';
import QuillEditor from './QuillEditor';
import { useNavigate } from 'react-router-dom';

const PostComm = ({ userInfo }) => {
  const navigate = useNavigate();
  const category = ['자유', '질문·고민', '홍보', '후기'];
  const [commInfo, setCommInfo] = useState({
    author: userInfo.username,
    postname: '',
    categories: '',
    content: ''
  });

  const changeHandler = (e) => {
    setCommInfo({
      ...commInfo,
      [e.target.name]: e.target.value
    })
  }

  

  const handleSubmit = () => {
    if (commInfo.postname === '' || commInfo.categories === '' || commInfo.content === '') {
      alert('제목, 카테고리, 내용은 필수 입력 항목입니다.');
      return;
    }
    axiosInstance.post('/comm_insert', commInfo)
      .then((response) => {
        alert(response.data);
        navigate('/Community');
      }).catch(error => {
        console.error(error);
      });
  };

  console.log(commInfo);

  return (
    <div className="PostComm">
      <h3 className='title'>글쓰기</h3>
      <div className='post'>
        <div className='category-postName'>
          <select
            name='categories'
            onChange={changeHandler}
            style={{ color: commInfo.categories ? '#000000' : '#666' }}>
            <option value='' hidden>카테고리</option>
            {category.map((data, i) => (
              <option key={i} value={data}>{data}</option>
            ))}
          </select>
          <input
            name='postname'
            value={commInfo.postname}
            placeholder='제목을 입력해주세요'
            onChange={changeHandler}
          />
        </div>
        <div className='quill'>
          <QuillEditor commInfo={commInfo} setCommInfo={setCommInfo}/>
        </div>
      </div>
      <button className='submit-comm-btn' onClick={handleSubmit}>게시글 등록</button>
    </div>
  );
};

export default PostComm;
