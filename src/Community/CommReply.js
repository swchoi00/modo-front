import { useEffect, useState } from 'react';
import './CommReply.css';
import axiosInstance from '../axiosInstance';
import LoginPzModal from '../Login/LoginPzModalComponent/LoginPzModal';
import { faThumbsUp as likedIcon } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as unLikedIcon } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CommReply = ({ isAuth, userInfo, id , setUpdateReplyCnt}) => {
  const [like, setLike] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [postReply, setPostReply] = useState({
    content: '',
    // member: { username: userInfo.username }
  });
  const [getReply, setGetReply] = useState([]);
  const [update, setUpdate] = useState(false);

  const changeHandler = (e) => {
    const { value } = e.target;

    if (update) {
      setGetReply(getReply.map(reply => 
        reply.rno === update ? { ...reply, content: value } : reply
      ));
    } else {
      setPostReply({
        ...postReply,
        content: value
      });
    }
  }

  useEffect(() => {
    axiosInstance.get(`/commReply/${id}/list`)
      .then((response) => {
        setGetReply(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [update]);

  const handleReplySubmit = () => {
    if (isAuth) {
      const updateCommReply = {...postReply, member: { username: userInfo.username }}
      axiosInstance.post(`/commReply/${id}`, updateCommReply)
        .then((response) => {
          alert(response.data);
          setPostReply({ ...postReply, content: '' });
          fetchNewReply(); // 댓글 추가 후 업데이트
          setUpdateReplyCnt(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setShowLoginModal(true);
    }
  };

  const fetchNewReply = () => {
    axiosInstance.get(`/commReply/${id}/list`)
      .then((response) => {
        setGetReply(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleUpdate = (rno) => {
    const updatedReply = getReply.find(reply => reply.rno === rno);

    if (!updatedReply || !updatedReply.content.trim()) {
      alert('수정할 내용을 입력해주세요.');
      return;
    }

      axiosInstance.put(`/commReply_update/${rno}`, { content: updatedReply.content })
      .then((response) => {
        alert(response.data);
        setUpdate(false);
        fetchNewReply(); // 수정 후 댓글 목록 업데이트
      })
      .catch((error) => {
        console.log(error);
      });

  };



const handleLikeClick = (rno) => {
  // getReply 배열을 업데이트합니다. rno가 일치하는 객체만 likedReply를 업데이트합니다.
  const updatedReplies = getReply.map(reply => 
    reply.rno === rno ? {
      ...reply,
      likedReply: reply.likedReply.includes(userInfo.id) 
        ? reply.likedReply.filter(id => id !== userInfo.id) 
        : [...reply.likedReply, userInfo.id]
    } : reply
  );
  // 업데이트된 배열로 상태를 설정합니다.
  setGetReply(updatedReplies); // -> 이거 말고 제일 하단에 서버에 업데이트 요청하기
};



// console.log(getReply);

  return (
    <div className='CommReply'>
      <div className='postReply'>
        <div className='replyTittle'>댓글</div>
        <div className='writeReply'>
          <textarea
            className='replyInput'
            value={postReply.content}
            onChange={changeHandler}
          />
          <button className='replyBtn' onClick={handleReplySubmit}>등록</button>
        </div>
        <div className='getReplyBox'>
          {getReply.map((reply, i) => (
            <div className='getReply' key={i}>
              <div className='getReply-leftBox'>
                <div className='nickName-date'>
                  <img src="/static/media/face.786407e39b657bdecd13bdabee73e67b.svg" />
                  <div className='nickName'>{reply.member.nickname}</div>
                  <div className='date'>| {reply.createDate}</div>
                </div>
                {update === reply.rno ? (
                  <textarea
                    defaultValue={reply.content}
                    className='Content'
                    style={{ width: "100%", outlineColor: "#8F7BE0" }}
                    onChange={changeHandler}
                  />
                ) : (
                  <div className='Content'>{reply.content}</div>
                )}
                <div className='reply-update-delete'>
                  {userInfo.nickname === reply.member.nickname ? (
                    update === reply.rno ? (
                      <>
                        <button className='delete' onClick={() => handleUpdate(reply.rno)}>수정완료</button>
                        {/* <button className='delete' onClick={() => {
                          if (!reply || !reply.content.trim()) {
                            alert('수정할 내용을 입력해주세요.');
                            return;
                          }
                            axiosInstance.put(`/commReply_update/${reply.rno}`, reply)
                            .then((response) => {
                              alert(response.data);
                              setUpdate(false);
                              fetchNewReply(); // 수정 후 댓글 목록 업데이트
                            })
                            .catch((error) => {
                              console.log(error);
                            });
                      
                        }}>수정완료</button> */}
                        <button className='update' onClick={() => setUpdate(false)}>취소</button>
                      </>
                    ) : (
                      <>
                        <button className='update' onClick={() => setUpdate(reply.rno)}>수정</button>
                        <button
                          className='delete'
                          onClick={() => {
                            // 댓글 삭제
                            axiosInstance
                              .delete(`/commReply/${reply.rno}`)
                              .then((response) => {
                                alert(response.data);
                                fetchNewReply(); // 댓글 삭제 후 목록 업데이트
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                          }}
                        >
                          삭제
                        </button>
                      </>
                    )
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div>
                <FontAwesomeIcon
                  icon={reply.likedReply.includes(userInfo.id) ? likedIcon : unLikedIcon}
                  size="lg"
                  style={{ color: reply.likedReply.includes(userInfo.id) ? '#8F7BE0' : 'gray' }}
                  // onClick={() => setLike(!like)}
                  onClick={() => handleLikeClick(reply.rno)}
                />
                <div className='likeCnt'>{reply.liked ? reply.likedReply.length + 1 : reply.likedReply.length}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <LoginPzModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />
    </div>
  );
}

export default CommReply;
