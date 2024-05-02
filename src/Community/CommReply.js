import { useEffect, useState } from 'react';
import './CommReply.css';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import LoginPzModal from '../Login/LoginPzModalComponent/LoginPzModal';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CommReply = ({ isAuth, userInfo, id }) => {
  const [like, setLike] = useState(1);
  const [recomm, setRecomm] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [postReply, setPostReply] = useState({
    content: '',
    member: { username: userInfo.username }
  });
  const [getReply, setGetReply] = useState([]);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setPostReply({
      ...postReply,
      content: e.target.value
    });
  }

  const recommChangeHandler = () => {
    setRecomm(true);
  }

  useEffect(() => {
    axiosInstance.get(`/commReply/${id}/list`)
      .then((response) => {
        setGetReply(response.data);
      }).catch((error) => {
        console.log(error);
      })
  }, [id])

  const addNewReply = (reply) => {
    setGetReply([...getReply, reply]);
  }

  const fetchNewReply = () => {
    axiosInstance.get(`/commReply/${id}/list`)
      .then((response) => {
        setGetReply(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className='CommReply'>
      <div className='postReply'>
        <div className='replyTittle'>댓글</div>
        <div className='writeReply'>
          <textarea className='replyInput' value={postReply.content} onChange={changeHandler} />
          <button className='replyBtn' onClick={() => {
            if (isAuth === true) {
              axiosInstance.post(`/commReply/${id}`, postReply)
                .then((response) => {
                  alert(response.data);
                  fetchNewReply(); // 댓글이 추가된 후에 새로운 댓글을 가져옴
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
          {
            getReply.map((reply, i) => {
              return (
                <div key={i}>
                  <div className='nickName-date'>
                    <img src="/static/media/face.786407e39b657bdecd13bdabee73e67b.svg" />
                    <div className='nickName'>닉네임 : {reply.member && reply.member.nickname}</div>
                    <div className='date'>|  날짜: {reply.createDate}</div>
                  </div>
                  <div className='Content'>내용 : {reply.content}</div>
                  <div className='reply-update-delete'>
                    <button className='update'>수정</button>
                    <button className='delete' onClick={() => {
                      axiosInstance.delete(`/commReply/${reply.rno}`)
                        .then((response) => {
                          alert(response.data);
                          setGetReply(getReply.filter(item => item.rno !== reply.rno));
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }}>삭제</button>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faThumbsUp} size="2xl" style={{ color: recomm === true ? '#8F7BE0' : 'gray' }} onClick={recommChangeHandler} />
                    <div className='likeCnt'>{recomm === true ? like + 1 : like}</div>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
      <LoginPzModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />
    </div>
  )
}

export default CommReply;
