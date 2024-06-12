import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import './AddComm.css';
import axiosInstance from '../axiosInstance';
import QuillEditor from './QuillEditor';
import { useNavigate } from 'react-router-dom';

const AddComm = ({ userInfo }) => {
  const navigate = useNavigate();
  const category = ['자유', '질문·고민', '홍보', '후기'];
  const [commInfo, setCommInfo] = useState({
    author: userInfo.username,
    postname: '',
    categories: '',
    content: ''
  });
  // 업로드된 이미지 URL을 저장할 상태
  const [uploadedImages, setUploadedImages] = useState([]);

  const changeHandler = (e) => {
    setCommInfo({
      ...commInfo,
      [e.target.name]: e.target.value
    })
  }

  // const handleSubmit = () => {
  //   if (commInfo.postname === '' || commInfo.categories === '' || commInfo.content === '') {
  //     alert('제목, 카테고리, 내용은 필수 입력 항목입니다.');
  //     return;
  //   }

  //   axiosInstance.post('/comm_insert', commInfo)
  //     .then((response) => {
  //       alert(response.data);
  //       navigate('/Community');
  //     }).catch(error => {
  //       console.error(error);
  //     });
  // };

  const handleSubmit = async () => {
    if (commInfo.postname === '' || commInfo.categories === '' || commInfo.content === '') {
      alert('제목, 카테고리, 내용은 필수 입력 항목입니다.');
      return;
    }

    try {
      // 이미지 URL 목록과 게시글 정보를 함께 서버로 전송
      await axiosInstance.post('/comm_insert', {
        commInfo: JSON.stringify(commInfo),
        // images: uploadedImages
      });

      alert('게시글 작성 완료!');
      navigate('/');
    } catch (error) {
      console.error('Failed to insert post:', error);
      alert('게시글 작성에 실패했습니다.');
    }
  };

  console.log(commInfo);
  console.log(uploadedImages);
  return (
    <div className="AddComm">
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
          <QuillEditor commInfo={commInfo} setCommInfo={setCommInfo} setUploadedImages={setUploadedImages} />
        </div>
      </div>
      <button className='submit-comm-btn' onClick={handleSubmit}>게시글 등록</button>
    </div>
  );
};

export default AddComm;
