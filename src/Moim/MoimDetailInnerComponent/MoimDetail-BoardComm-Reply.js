import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { faDongSign, faThumbsUp as likedIcon } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as unLikedIcon } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MoimDetailBoardCommReply = ({isAuth, userInfo, id, no, setUpdateReplyCnt})=>{
  const [postReply, setPostReply] = useState({content: '', moimCommNo : no});
  const [getReply, setGetReply] = useState([]);
  const [update, setUpdate] = useState(false);
  const [moimMemberInfo, setMoimMemberInfo] = useState(); // 모임 멤버 정보
  const [moimMemberRole, setMoimMemberRole] = useState(null); // 모임장, 매니저, 모임원 여부
  const [moimMemberList,setMoimMemberList] = useState(null); // 모임멤버 리스트
   
  //모임 멤버 가져오는거
    useEffect(()=>{
      axiosInstance.get(`/getMoimMemberList/${id}`)
      .then((response)=>{
        setMoimMemberList(response.data);
      }).catch((error)=>{
        console.log(error);
      }
    )
    },[id,setMoimMemberList]);
  
  
    // 모임 role확인
    useEffect(()=>{
      const matchingMember = moimMemberList?.find(memberInfo => memberInfo.member.id === userInfo.id);
      if(!matchingMember){ //로그인 안하거나, 회원이 아닌 경우
        setMoimMemberRole('notMember');
        return;
      }
  
      setMoimMemberInfo(matchingMember); // 모임 멤버 엔티티 저장
  
      switch(matchingMember.memberRole) {
        case 'leader' : setMoimMemberRole('leader'); break;
        case 'manager' : setMoimMemberRole('manager'); break;
        case 'member' : setMoimMemberRole('member'); break;
        default:  break;
      }
    },[isAuth, userInfo, moimMemberList]);
  

  
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
    axiosInstance.get(`/moimReply/${no}/list`)
      .then((response) => {
        setGetReply(response.data);
        setUpdateReplyCnt(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [no]);




  const handleReplySubmit = () => {
    if (isAuth) {
      if (!postReply.content.trim()) {
        alert("댓글을 작성해주세요.");
      }
      else {
        const updateCommReply = { ...postReply, moimMember: {id : moimMemberInfo.id} };
        console.log(updateCommReply);
        axiosInstance.post(`/moimReply/${id}`, updateCommReply)
          .then((response) => {
            alert(response.data);
            setPostReply({ ...postReply, content: '' });
            fetchNewReply(); // 댓글 추가 후 업데이트
            // setUpdateReplyCnt(true);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      // setShowLoginModal(true);
    }
  };

  const fetchNewReply = () => {
    axiosInstance.get(`/moimReply/${no}/list`)
      .then((response) => {
        setGetReply(response.data);
        setUpdateReplyCnt(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleUpdate = (reply) => {
    // const updatedReply = getReply.find(reply => reply.rno === rno);

    if (!reply || !reply.content.trim()) {
      alert('수정할 내용을 입력해주세요.');
      return;
    }

    axiosInstance.put(`/moimReply_update/${reply.rno}`, { content: reply.content })
      .then((response) => {
        alert(response.data);
        setUpdate(false);
        fetchNewReply(); // 수정 후 댓글 목록 업데이트
      })
      .catch((error) => {
        console.log(error);
      });

  };

  const handleCancle = () => {
    setUpdate(false);
    fetchNewReply();
  }




  return(
    <div className='CommReply'>
      <div className='postReply'>
        <div className='replyTittle'>댓글</div>
        <div className='writeReply'>
          <textarea
            className='replyInput'
            style={{borderRadius: '0.5rem'}}
            value={postReply.content}
            onChange={changeHandler}
          />
          <button className='replyBtn' onClick={handleReplySubmit}>등록</button>
        </div>
      </div>
      <div className='getReplyBox'>
        {
          getReply.map((reply, i) => (
            <div className='getReply' key={i}>
              <div className='getReply-leftBox' style={{width: '100%'}}>
                <div className='nickName-date'>
                  <img src="/static/media/face.786407e39b657bdecd13bdabee73e67b.svg" alt='프로필이미지' />
                  <div className='nickName'>{reply.moimMember?.member?.nickname}</div>
                  <div className='date'>| {reply.createDate.split(' ')[0]}</div> {/* 원래 이거 {reply.createDate} */}
                </div>
                {
                  update === reply.rno ? (
                    <textarea
                      defaultValue={reply.content}
                      className='Content'
                 
                      onChange={changeHandler}
                    />
                  ) : (
                    <div className='Content'><pre style={{wordWrap: 'break-word', whiteSpace: 'pre-wrap'}}>{reply.content}</pre></div>
                  )
                }
                <div className='reply-update-delete'>
                  {userInfo?.nickname === reply?.moimMember?.member.nickname ? (
                    update === reply.rno ? (
                      <>
                        <button className='delete' onClick={() => handleUpdate(reply)}>수정완료</button>
                        <button className='update' onClick={() => handleCancle()}>취소</button>
                      </>
                    ) : (
                      <>
                        <button className='update' onClick={() => setUpdate(reply.rno)}>수정</button>
                        <button
                          className='delete'
                          onClick={() => {
                            // 댓글 삭제
                            axiosInstance.delete(`/moimReply/${reply.rno}`)
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
              {/*  좋아요 버튼 
              <div>
                <FontAwesomeIcon
                  icon={reply?.likedReply.includes(userInfo.id) ? likedIcon : unLikedIcon}
                  size="lg"
                  style={{ color: reply.likedReply.includes(userInfo.id) ? '#8F7BE0' : 'gray', cursor: 'pointer' }}
                  onClick={() => handleLikeClick(reply.rno)}
                />
                <div className='likeCnt'>{reply.liked ? reply.likedReply.length + 1 : reply.likedReply.length}</div>
              </div> */}
            </div>
          ))}
      </div>
      </div>
  )
}

export default MoimDetailBoardCommReply;