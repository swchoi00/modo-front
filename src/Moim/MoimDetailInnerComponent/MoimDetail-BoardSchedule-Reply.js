import './MoimDetail-BoardSchedule-Reply.css';
import leaderIcon from '../../Img/moimDetail_leaderIcon.svg';
import managerIcon from '../../Img/moimDetail_managerIcon.svg';
import face from '../../HomeComponent/ReviewComponent/face.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';


const MoimDetailBoardScheduleReply = ({no, moimMemberInfo})=>{

  // 작성 중인 댓글 저장
  const [replyText, setReplyText] = useState();



  const imsiDB = [
    { name: '김모씨',
      memberRole : 'leader',
      content: '얄리얄리얄라셩, 얄라리 얄라',
      date : '2024/06/12'
    },
    { name: '최모씨',
      memberRole : 'member',
      content: '모임 너무 좋아요 ㅎㅎ 하.하.하',
      date : '2024/06/12'
    },
    { name: '황모씨',
      memberRole : 'member',
      content: '더 놀고 싶은 사람들은 따로 더 놀고가도 되나요? ❤️',
      date : '2024/06/12'
    },
    { name: '박모씨',
      memberRole : 'manager',
      content: '아뇨 집에가세요 ㅡㅡ',
      date : '2024/06/12'
    },
    { name: '김모씨',
    memberRole : 'leader',
    content: '얄리얄리얄라셩, 얄라리 얄라',
    date : '2024/06/12'
  },
  { name: '최모씨',
    memberRole : 'member',
    content: '모임 너무 좋아요 ㅎㅎ 하.하.하',
    date : '2024/06/12'
  },
  { name: '황모씨',
    memberRole : 'member',
    content: '더 놀고 싶은 사람들은 따로 더 놀고가도 되나요? ❤️',
    date : '2024/06/12'
  },
  { name: '박모씨',
    memberRole : 'manager',
    content: '아뇨 집에가세요 ㅡㅡ',
    date : '2024/06/12'
  },
  ]


  //⭐⭐
  const scheduleReplyhandler = ()=>{
    // 여기에 스케쥴번호, moimMember, replyText 서버에 보내서 저장해줘야함
    console.log(replyText);
  }

  return(
    <div className='Schedule-Reply-Container'>
      <div className='schedule-replyList-box'>
        {
          imsiDB.map((data, i)=>(
            <div className='replyBox' key={i}>
              <div className='replyHeader'>
                <div className='memberInfo'>
                  <div className='moimDetail-moimContent-home-member-content-img-modal' style={{backgroundImage: `url(${face})`, width: '2rem'}}>
                    {data.memberRole === 'leader' && <img className='moimDetail-moimLeaderIcon' src={leaderIcon} alt=''/>}
                    {data.memberRole === 'manager' && <img className='moimDetail-moimManagerIcon' src={managerIcon} alt=''/>}
                  </div>
                  <div className='nickname'>{data.name}</div>
                </div>
                {
                  // ⭐댓글 글쓴이와 moimMember가 일치하는 경우 수정/삭제 가능하게 해야함
                <div className='settingBtn'> 
                  {/* 여기에 작성자 혹은 매니저나, 리더만 삭제 할 수 있어 */}
                  <button><FontAwesomeIcon icon={faX} size='sm'style={{color: '#acacac'}}/></button>
                </div>
                }
              </div>
              <div className='reply-content'>{data.content}</div>
              <span className='date'>{data.date}</span>
            </div>
          ))
        }
      </div>


      <div className='schedule-reply-editBox'>
        <textarea placeholder='댓글을 적어주세요 :)'
                  value={replyText||''}
                  onChange={(e)=>setReplyText(e.target.value)}
                  maxLength="500"
        />
        <div onClick={scheduleReplyhandler} style={{cursor:'pointer'}}>게시</div>
      </div>
    </div>
  )
}

export default MoimDetailBoardScheduleReply;