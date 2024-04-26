import { useEffect, useState } from 'react';
import './CommReply.css';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import LoginPzModal from '../Login/LoginPzModalComponent/LoginPzModal';

const CommReply = ({ isAuth, userInfo, id }) => {

  const [showLoginModal, setShowLoginModal] = useState(false); // 로그인 안했을때 모달창 띄움
  const [postReply, setPostReply] = useState({
    commId: id,
    content: '',
    member: userInfo.username
  });
  const [getReply, setGetReply] = useState([]);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setPostReply(e.target.value);
  }

  useEffect(() => {
    axiosInstance.get(`/reply/${id}/list`)
      .then((response) => {
        setGetReply(response.data);
      }).catch((error) => {
        console.log(error);
      })
  }, [])

  console.log(postReply);

  return (
    <div className='CommReply'>
      <div className='postReply'>
        <div className='replyTittle'>댓글</div>
        <div className='writeReply'>
          <textarea className='replyInput' value={postReply.content} onChange={changeHandler} />
          <button className='replyBtn' onClick={() => {
            if (isAuth === true) {
              axiosInstance.post(`/reply/${id}`, postReply)
                .then((response) => {
                  alert(response.data);
                })
                .catch((error) => {
                  console.log(error);
                })
            } else {
              setShowLoginModal(true);
            }
          }}>등록</button>
        </div>
        <div className='getReply'>
          <div className='nickName-date'>
            <img src="/static/media/face.786407e39b657bdecd13bdabee73e67b.svg" />
            <div className='nickName'>닉네임</div>
            <div className='date'>|  2024-04-15</div>
          </div>
          <div className='Content'>내용</div>
          <div className='reply-update-delete'>
            {
              userInfo.username === getReply.member ?
                <>
                  <button className='update'>수정</button>
                  <button className='delete' onClick={() => {
                    axiosInstance.delete(`/reply/${getReply.rno}`)
                      .then((response) => {
                        alert(response.data);
                      })
                      .error((error) => {
                        console.log(error);
                      })
                  }}>삭제</button>
                </>
                : ''
            }
          </div>
        </div>
      </div>
      <LoginPzModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal}/>
    </div>
  )
}

export default CommReply;