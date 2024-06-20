import './InquiryWrite.css';
import { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';


const InquiryWrite = ({ userInfo, setClickedTypeBtn }) => {
  const [inquiry, setInquiry] = useState({
    writerName: userInfo.username,
    title: '',
    category: '',
    content: ''
  });
  const [countTitle, setCountTitle] = useState(0);
  const titleMaxLength = 20;

  const category = ['모임', '커뮤니티', '회원정보', '기타'];

  const changeHandler = (e) => {
    const { name, value } = e.target;
    
    // 제목 길이 체크
    if (name === 'title' && value.length > titleMaxLength) {
      return;
    }
  
    setInquiry({
      ...inquiry,
      [name]: value
    });
  };

  useEffect(() => {
    if(inquiry.title === '' || inquiry.title.length === 0) {
      setCountTitle(0);
    } else {
      setCountTitle(inquiry.title.length);
    }
  }, [inquiry.title.length])

  const handleSubmit = () => {
    if (inquiry.title === '' || inquiry.category === '' || inquiry.content === '') {
      alert('제목, 카테고리, 내용은 필수 입력 항목입니다.');
      return;
    }
    axiosInstance.post('/inquiryForm_insert', inquiry)
      .then((response) => {
        alert(response.data);
        setClickedTypeBtn('문의내역확인');
      }).catch(error => {
        console.error(error);
      });
  };

  console.log(inquiry);

  return (
    <div className="InquiryWrite">
      <div className='post'>
        <div className='category'>
          <select
            name='category'
            onChange={changeHandler}
            style={{ color: inquiry.category ? '#000000' : '#666' }}>
            <option value='' hidden>카테고리</option>
            {category.map((data, i) => (
              <option
                key={i}
                value={data}
              >{data}</option>
            ))}
          </select>
        </div>

        <div>
          <div className='title'>
            <input
              name='title'
              value={inquiry.title}
              placeholder={`제목을 입력해주세요 (${titleMaxLength}자 이내)`}
              onChange={changeHandler}
              maxLength={titleMaxLength}
            />
            <div>{countTitle}/{titleMaxLength}</div>
            
          </div>


          <textarea
            className='content'
            name='content'
            value={inquiry.content}
            onChange={changeHandler}
            placeholder='문의내용을 입력해주세요 &#13;&#10;Ex) 모임 생성을 하는데 자꾸 오류가 떠요
                    '></textarea>
        </div>
      </div>
      <button className='submit-comm-btn' onClick={handleSubmit}>문의하기</button>
    </div>
  )
}

export default InquiryWrite;