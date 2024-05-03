import { useEffect, useState } from 'react';
import './CommReply.css';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import LoginPzModal from '../Login/LoginPzModalComponent/LoginPzModal';
// import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CommReply = ({ isAuth, userInfo, id }) => {
  const [liked, setLiked] = useState(1);
  const [like, setLike] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [postReply, setPostReply] = useState({
    content: '',
    member: { username: userInfo.username }
  });
  const [getReply, setGetReply] = useState([]);
  const [updateReply, setUpdateReply] = useState([]); // 댓글은 update가 랜더링 될때마다 get으로 가져오면 될듯? 없어도될듯 만약 안되면 있어야함
  const [update, setUpdate] = useState(false);
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

  console.log(postReply);
  console.log(like);
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
          <div className='getReply-leftBox'>
            <div className='nickName-date'>
              <img src="/static/media/face.786407e39b657bdecd13bdabee73e67b.svg" />
              <div className='nickName'>닉네임</div>
              <div className='date'>|  날짜</div>
            </div>
            {
              update === true ?
                <textarea className='Content' style={{width: "100%", outlineColor: "#8F7BE0"}}>내용</textarea>
                :
                <div className='Content'>내용</div>
            }
            <div className='reply-update-delete'>
              {
                // userInfo.username === getReply.member ?
                  update === true ?
                    <>
                      <button className='delete' onClick={() => {
                        // 댓글 수정
                        axiosInstance.put(`/commReply_update/${reply.rno}`, updateReply)
                          .then((response) => {
                            alert(response.data);
                          })
                          .catch((error) => {
                            console.log(error);
                          })
                      }}>수정완료</button>
                      <button className='update' onClick={() => setUpdate(false)}>취소</button>
                    </>
                    :
                    <>
                      <button className='update' onClick={() => setUpdate(true)}>수정</button>
                      <button className='delete' onClick={() => {
                        // 댓글 삭제
                        axiosInstance.delete(`/commReply/${reply.rno}`)
                        .then((response) => {
                          alert(response.data);
                          setGetReply(getReply.filter(item => item.rno !== reply.rno));
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                      }}>삭제</button>
                    </>
                  // : ''
              }
            </div>
          </div>
          <div>
            <div>
              {/* <FontAwesomeIcon icon={faThumbsUp} size="2xl" style={{ color: '#8F7BE0' }} /> */}
            </div>
            <FontAwesomeIcon icon={faThumbsUp} size="2xl" style={{ color: like === true ? '#8F7BE0' : 'gray' }} onClick={() => setLike(!like)} />
            <div className='likeCnt'>{like === true ? liked + 1 : liked}</div>
          </div>
          {
            getReply &&
            getReply.map((reply, i) => {
              return (
                <>
                  <div key={i}>
                    <div className='nickName-date'>
                      <img src="/static/media/face.786407e39b657bdecd13bdabee73e67b.svg" />
                      <div className='nickName'>닉네임 : {reply.rno}</div>
                      <div className='date'>|  날짜: {reply.createDate}</div>
                    </div>
                    {
                      update === true ?
                        <textarea defaultValue={reply.content} />
                        :
                        <div className='Content'>내용 : {reply.content}</div>
                    }
                    <div className='reply-update-delete'>
                      {
                        userInfo.username === getReply.member ?
                          update === true ?
                            <>
                              <button className='update' onClick={() => {
                                // 댓글 수정
                                axiosInstance.put(`/???`, update)
                                  .then((response) => {
                                    alert(response.data);
                                  })
                                  .catch((error) => {
                                    console.log(error);
                                  })
                              }}>수정완료</button>
                              <button className='delete'>취소</button>
                            </>
                            :
                            <>
                              <button className='update' onClick={setUpdate(true)}>수정</button>
                              <button className='delete' onClick={() => {
                                // 댓글 삭제
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
                    </div>
                    <div>
                      <div>
                        {/* <FontAwesomeIcon icon={faThumbsUp} size="2xl" style={{ color: '#8F7BE0' }} /> */}
                      </div>
                      <FontAwesomeIcon icon={faThumbsUp} size="2xl" style={{ color: like === true ? '#8F7BE0' : 'gray' }} onClick={() => setLike(!like)} />
                      <div className='likeCnt'>{like === true ? liked + 1 : liked}</div>
                    </div>
                  </div>

                </>

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
