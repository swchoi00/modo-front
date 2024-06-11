import './MoimDetail-BoardSchedule-Reply.css';
import leaderIcon from '../../Img/moimDetail_leaderIcon.svg';
import managerIcon from '../../Img/moimDetail_managerIcon.svg';
import face from '../../HomeComponent/ReviewComponent/face.svg';
const MoimDetailBoardScheduleReply = ()=>{
  return(
    <div className='Schedule-Reply-Container'>
      <div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div className='moimDetail-moimContent-home-member-content-img-modal' style={{backgroundImage: `url(${face})`, width: '2rem'}}>
            {/* {data.memberRole === 'leader' && <img className='moimDetail-moimLeaderIcon' src={leaderIcon} alt=''/>}
            {data.memberRole === 'manager' && <img className='moimDetail-moimManagerIcon' src={managerIcon} alt=''/>} */}
            </div>
            <div>닉네임</div>
          </div>
          <div>댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용댓글내용 넣기</div>
        
      </div>
      <div>
        <input className='input-area'/>
        <button>게시</button>
      </div>
    </div>
  )
}

export default MoimDetailBoardScheduleReply;