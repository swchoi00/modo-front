import { useNavigate } from 'react-router-dom';
import './NoticeWrite.css';
import { useState } from 'react';
import axiosInstance from '../../axiosInstance';

const NoticeWrite = ( {userInfo} ) => {
  console.log('공지사항 작성 유저정보 : ', userInfo);
    
  const navigate = useNavigate();

  const [notice, setNotice] = useState({
    adminName : userInfo.username,
    title : '',
    content : '',
});

const noticeDataHandler = (e) => {
    setNotice({
        ...notice,
        [e.target.name]: e.target.value
    })
}

  const insertNoticeHandler = (e) => {
    e.preventDefault();

    if(userInfo.role === 'ADMIN') {
        axiosInstance.post('/notice_insert', notice)
        .then((response) => {
            alert(response.data);
            navigate('/notice');
        }).catch((error) => {
            console.log(error);
        })
    } else {
        alert('공지사항 작성은 관리자만 가능합니다');
        navigate('/notice');
    }
}

console.log('공지사항 작성 : ', notice);
  return (
    <div className="NoticeWrite">
      <h3 className='title'>글쓰기</h3>
      <div className='post'>
        <div className='notice-title'>
          <input
            name="title"
            value={notice.title}
            placeholder='공지사항 제목을 입력해주세요.'
            onChange={noticeDataHandler}
          />
        </div>
        <div className='notice-content'>
          <textarea 
          name="content"
          placeholder='내용을 입력해주세요.'
          onChange={noticeDataHandler}
          value={notice.content}></textarea>
        </div>
      </div>
      <button className='submit-btn' onClick={insertNoticeHandler}>등록</button>
      <button className='back-btn' onClick={()=>navigate('/addCommTest')}>뒤로가기</button>
    </div>
  )
}

export default NoticeWrite;