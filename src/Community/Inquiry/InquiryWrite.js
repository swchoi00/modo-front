import { useState } from 'react';
import './InquiryWrite.css';
import axiosInstance from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';

const InquiryWrite = ({ userInfo }) => {
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState({
    writerName: userInfo.username,
    title: '',
    category: '',
    content: ''
  });
  const category = ['모임', '커뮤니티', '계정/로그인', '기타'];

  const changeHandler = (e) => {
    setInquiry({
      ...inquiry,
      [e.target.name]: e.target.value
    })
  }

  

  const handleSubmit = () => {
    if (inquiry.title === '' || inquiry.category === '' || inquiry.content === '') {
      alert('제목, 카테고리, 내용은 필수 입력 항목입니다.');
      return;
    }
    axiosInstance.post('/inquiryForm_insert', inquiry)
      .then((response) => {
        alert(response.data);
        navigate('/inquiry');
      }).catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="InquiryWrite">
      <h3 className='title'>1:1 문의하기</h3>
      <div className='post'>
        <div className='category-postName'>
          <select
            name='categories'
            onChange={changeHandler}
            style={{ color: inquiry.category ? '#000000' : '#666' }}>
            <option value='' hidden>카테고리</option>
            {category.map((data, i) => (
              <option key={i} value={data}>{data}</option>
            ))}
          </select>
          <input
            name='postname'
            value={inquiry.title}
            placeholder='제목을 입력해주세요 (20자 이내)'
            onChange={changeHandler}
          />
        </div>
        <div className='quill'>
          <textarea 
          className='content'
          placeholder='문의내용을 입력해주세요 

          Ex) 모임 생성을 하는데 자꾸 오류가 떠요'></textarea>
        </div>
      </div>
      <button className='submit-comm-btn' onClick={handleSubmit}>문의하기</button>
    </div>
  )
}

export default InquiryWrite;