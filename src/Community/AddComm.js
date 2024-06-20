import React, { useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import './AddComm.css';
import axiosInstance from '../axiosInstance';
import QuillEditor from '../quill/QuillEditor';
import { useNavigate } from 'react-router-dom';

const AddComm = ({ userInfo }) => {
  const navigate = useNavigate();
  const categoryRef = useRef(null);
  const postnameRef = useRef(null);
  const contentRef = useRef(null);
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

  const isContentEmpty = (content) => {
    // HTML 태그를 모두 제거한 후 공백을 제거하여 내용이 있는지 확인
    const text = content.replace(/<\/?[^>]+(>|$)/g, '').trim();
    return text === '';
  };

  const handleSubmit = async () => {
    if (commInfo.categories === '') {
      alert('카테고리는 필수 입력 항목입니다.');
      categoryRef.current.focus();
      return;
    }
    if (commInfo.postname === '') {
      alert('제목은 필수 입력 항목입니다.');
      postnameRef.current.focus();
      return;
    }
    if (isContentEmpty(commInfo.content)) {
      alert('내용은 필수 입력 항목입니다. (이미지만 삽입할 수 없습니다.)');
      contentRef.current.focus();
      return;
    }

    try {
      // 이미지 URL 목록과 게시글 정보를 함께 서버로 전송
      await axiosInstance.post('/comm_insert', {
        commInfo: JSON.stringify(commInfo),
      });

      alert('게시글 작성 완료!');
      navigate('/community');
    } catch (error) {
      console.error('Failed to insert post:', error);
      alert('게시글 작성에 실패했습니다.');
    }
  };

  console.log(commInfo);

  return (
    <div className="AddComm">
      <h3 className='title'>글쓰기</h3>
      <div className='post'>
        <div className='category-postName'>
          <select
            name='categories'
            value={commInfo.categories} // 카테고리 선택 값 반영
            onChange={changeHandler}
            style={{ color: commInfo.categories ? '#000000' : '#666' }}
            ref={categoryRef}>
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
            ref={postnameRef}
          />
        </div>
        <div className='quill'>
          <QuillEditor commInfo={commInfo} setCommInfo={setCommInfo} setUploadedImages={setUploadedImages} contentRef={contentRef}/>
        </div>
      </div>
      <button className='submit-comm-btn' onClick={handleSubmit}>게시글 등록</button>
    </div>
  );
};

export default AddComm;
