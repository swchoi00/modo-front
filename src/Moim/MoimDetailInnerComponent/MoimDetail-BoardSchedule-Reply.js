import './MoimDetail-BoardSchedule-Reply.css';
import leaderIcon from '../../Img/moimDetail_leaderIcon.svg';
import managerIcon from '../../Img/moimDetail_managerIcon.svg';
import face from '../../HomeComponent/ReviewComponent/face.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../../axiosInstance';


const MoimDetailBoardScheduleReply = ({no, moimMemberInfo, setReplyCnt, participationBtn})=>{

  // 작성 중인 댓글 저장
  const [replyText, setReplyText] = useState();
  const [replyList, setReplyList] = useState();
  const scrollRef = useRef(); // 댓글 작성 후 스크롤용

  
  // 스케쥴 댓글리스트 가져오기 핸들러
  useEffect(()=>{
    axiosInstance.get(`/moimScheduleReply/${no}`)
    .then((response)=>{
      setReplyList(response.data);  // 댓글 리스트 저장
      setReplyCnt(response.data.length);
      // scrollToBottom(); // 댓글 로드 후 스크롤을 아래로 이동
    }).catch((error)=>{
      console.log(error);
    })
  },[setReplyList, no])


  // 댓글 쓸 때 마다 제일 아래로 고정되게
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [replyList]);


  //댓글 저장 핸들러
  const scheduleReplyhandler = ()=>{
    // 여기에 스케쥴번호, moimMember, replyText 서버에 보내서 저장해줘야함
    let nullCheck = replyText?.trim().length === 0; // 빈값 제거 후 댓글 길이가 0이 아닌지 확인
    if(nullCheck || replyText === undefined){ // 빈값인 경우
      alert("댓글을 적어주세요");
      return;
    }else{
      const moimScheduleReply = {content : replyText, moimMember: {id: moimMemberInfo.id}}
      axiosInstance.post(`/moimScheduleReply/${no}/`, moimScheduleReply)
      .then((response)=>{ // 서버에서 해당 스케쥴 (no)에 해당하는 reply 리스트 리턴해줌
        setReplyList(response.data); // 댓글 리스트 업데이트
        setReplyCnt(response.data.length);
        setReplyText('');
      }).catch((error)=>{
        console.log(error);
      })
    }
  }

//⭐⭐ 댓글 삭제 핸들러 (댓글 번호만 보내기)
const deleteHandler=(rno)=>{
  axiosInstance.delete(`/moimScheduleReply/${rno}/`)
  .then((response)=>{
    alert(response.data);
    setReplyList(replyList.filter(data=>data.rno !== rno))
    setReplyCnt(replyList.length -1);
  }).catch((error)=>{
    console.log(error);
  })
}


  return(
    <div className='Schedule-Reply-Container'>
      <div className='schedule-replyList-box' ref={scrollRef}>
        {
          replyList?.map((data, i)=>(
            <div className='replyBox' key={i}>
              <div className='replyHeader'>
                <div className='memberInfo'>
                  <div className='moimDetail-moimContent-home-member-content-img-modal' style={{backgroundImage: `url(${face})`, width: '2rem'}}>
                    {data.moimMember.memberRole === 'leader' && <img className='moimDetail-moimLeaderIcon' src={leaderIcon} alt=''/>}
                    {data.moimMember.memberRole === 'manager' && <img className='moimDetail-moimManagerIcon' src={managerIcon} alt=''/>}
                  </div>
                  <div className='nickname'>{data.moimMember.member.nickname}</div>
                </div>
                {/* {   
                  (moimMemberInfo.id === data.moimMember.id || moimMemberInfo.memberRole === 'leader' || moimMemberInfo.memberRole === 'manager' )&&
                  <div className='settingBtn' onClick={()=>deleteHandler(data.rno)}> 
                    <button><FontAwesomeIcon icon={faX} size='sm'style={{color: '#acacac'}}/></button>
                  </div>
                } */}
                {
                  (moimMemberInfo.id === data.moimMember.id || // 작성자 본인 삭제 가능
                  (moimMemberInfo.memberRole === 'leader') || // 리더인 경우 삭제 가능
                  (moimMemberInfo.memberRole === 'manager' && data.moimMember.memberRole !== 'leader')) && // 매니저는 리더 글 제외하고 삭제 가능
                  <div className='settingBtn' onClick={() => deleteHandler(data.rno)}>
                    <button><FontAwesomeIcon icon={faX} size='sm' style={{color: '#acacac'}} /></button>
                  </div>
                }
              </div>
              <div className='reply-content'>{data.content}</div>
              <span className='date'>{data.createDate}</span>
            </div>
          ))
        }
      </div>

      {
        participationBtn !== '지난 일정이에요' &&
        <div className='schedule-reply-editBox'>
          <textarea placeholder='댓글을 적어주세요 :)'
                    value={replyText||''}
                    onChange={(e)=>setReplyText(e.target.value)}
                    maxLength="500"
          />
          <div onClick={scheduleReplyhandler} style={{cursor:'pointer'}}>게시</div>
        </div>
      }
    </div>
  )
}

export default MoimDetailBoardScheduleReply;