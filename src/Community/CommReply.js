import { useEffect, useState } from 'react';
import './CommReply.css';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

const CommReply = ({ isAuth, userInfo, id }) => {

  const [reply, setReply] = useState({
    content: '',
    member: { username: userInfo.username } // 서버에서 요구하는 형식에 맞추어 객체로 전달
  });
  const navigate = useNavigate();

  const [replyList, setReplyList] = useState([]);

  const changeHandler = (e) => {
    setReply({ ...reply, content: e.target.value }); // content 필드만 업데이트
  }

  // useEffect(() => {
  //   axiosInstance.get(`/commReply/${id}/list`)
  //     .then((response) => {
  //       setReply(response.data);
  //     }).catch((error) => {
  //       console.log(error);
  //     })
  // }, [])

  console.log(reply);
  console.log("id : " + id);
  console.log("댓글 목록" + reply)

  return (
    <div className='CommReply'>
      <div className='postReply'>
        <div className='replyTitle'>댓글</div>
        <div className='writeReply'>
          <textarea className='replyInput' value={reply.content} onChange={changeHandler} />
          <button className='replyBtn' onClick={() => {
            if (isAuth === true) {
              axiosInstance.post(`/commReply/${id}`, reply)
                .then((response) => {
                  alert(response.data);
                })
                .catch((error) => {
                  console.log(error);
                })
            } else {
              alert('로그인 후 작성 가능합니다.');
              navigate('/login');
            }
          }}>등록</button>
        </div>
        {/* 아래는 예시이므로 필요에 따라 수정하셔야 합니다 */}
        <div className='getReply'>
          <div className='nickName-date'>
            <img src="/static/media/face.786407e39b657bdecd13bdabee73e67b.svg" alt="face icon" />
            <div className='nickName'>{userInfo.username}</div>
            <div className='date'>| 2024-04-15</div>
          </div>
          <div className='Content'>내용</div>
          <div className='aa'>
            {
              userInfo.username === reply.member.username ?
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