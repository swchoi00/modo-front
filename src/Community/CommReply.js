import { useEffect, useState } from 'react';
import './CommReply.css';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

const CommReply = ({ isAuth, userInfo, id }) => {

  const [reply, setReply] = useState({
    commId: id,
    content: '',
    member: userInfo.username
  });
  const navigate = useNavigate();

  const changHandler = (e) => {
    setReply(e.target.value);
  }

  useEffect(() => {
    axiosInstance.get(`/reply/${id}/list`)
      .then((response) => {
        setReply(response.data);
      }).catch((error) => {
        console.log(error);
      })
  }, [])

  console.log(reply);

  return (
    <div className='CommReply'>
      <div className='postReply'>
        <div className='replyTittle'>댓글</div>
        <div className='writeReply'>
          <textarea className='replyInput' value={reply.content} onChange={changHandler} />
          <button className='replyBtn' onClick={() => {
            if (isAuth === true) {
              axiosInstance.post(`/reply/${id}`, reply)
                .then((response) => {
                  alert(response.data);
                })
                .catch((error) => {
                  console.log(error);
                })
            } else {
              alert('로그인 후 작성가능합니다.');
              navigate('/login');
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
          <div className='aa'>
            {
              userInfo.username === reply.member ?
                <>
                  <button>수정</button>
                  <button onClick={() => {
                    axiosInstance.delete(`/reply/${reply.rno}`)
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
            <button>답글쓰기</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommReply;