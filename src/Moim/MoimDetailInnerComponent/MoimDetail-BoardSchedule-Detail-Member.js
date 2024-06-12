import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import face from '../../HomeComponent/ReviewComponent/face.svg';
import './MoimDetail-BoardSchedule-Detail-Member.css';
import leaderIcon from '../../Img/moimDetail_leaderIcon.svg';
import managerIcon from '../../Img/moimDetail_managerIcon.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const MoimDetailBoardScheduleDetailMember = ()=>{
  const {id} = useParams(); 
  const {no} = useParams(); 
  const [moimScheduleInfo, setMoimScheduleInfo] = useState(false); // 모임 일정
  const navigate = useNavigate();

  // 모임 스케쥴 정보 가져오기
  useEffect(()=>{
    axiosInstance.get(`/getMoimScheduleDetail/${no}`)
    .then((response)=>{
      setMoimScheduleInfo(response.data);
    }).catch((error)=>{
      console.log(error);
    });
  },[setMoimScheduleInfo]);

console.log(moimScheduleInfo);

const imsiMember2 = [
  {
  member: {nickname: '예닝'},
  memberRole:"leader"
  },
  {
    member: {nickname: '예닝2'},
    memberRole:"manager"
  },
  {
    member: {nickname: '예닝3'},
    memberRole:"manager"
  },
  {
    member: {nickname: '예닝3'},
    memberRole:"member"
  },
  {
    member: {nickname: '예닝3'},
    memberRole:"member"
  },
  {
    member: {nickname: '예닝3'},
    memberRole:"member"
  },
  {
    member: {nickname: '예닝3'},
    memberRole:"member"
  },
  {
    member: {nickname: '예닝3'},
    memberRole:"member"
  },
  {
    member: {nickname: '예닝3'},
    memberRole:"member"
  },
  {
    member: {nickname: '예닝3'},
    memberRole:"member"
  },
]


const backBtnHandler = ()=>{
  navigate(-1);
}

  return(
    <div className="moimSchedule-joinMember-container">
      <div className="moimSchedule-joinMember-headerBox">
        <div className='backBtn-title' style={{display:"flex", gap: '1rem'}}>
        <FontAwesomeIcon icon={faArrowLeft} size='lg'style={{color: 'gray', cursor: 'pointer', paddingTop: '0.2rem'}} onClick={backBtnHandler}/>
        <h5 className="title">모임 일정 참여 멤버 ({moimScheduleInfo.joinedMember?.length} / {moimScheduleInfo.scheduleMaxMember}명)</h5>
        </div>
        <div className="moimName">{moimScheduleInfo?.scheduleName} </div>
      </div>

      <div className="moimSchedule-joinMember-bodyBox">
      {
            moimScheduleInfo?.joinedMember?.map((data,i)=>(
              // imsiMember2.map((data,i)=>(
              <div className='moimDetail-moimContent-home-member-content-modal' key={i} style={{paddingLeft: '0.3rem'}}>
                  <div className='moimDetail-moimContent-home-member-content-img-modal' style={{backgroundImage: `url(${face})`}}>
                    {data.memberRole === 'leader' && <img className='moimDetail-moimLeaderIcon' src={leaderIcon} alt=''/>}
                    {data.memberRole === 'manager' && <img className='moimDetail-moimManagerIcon' src={managerIcon} alt=''/>}
                  </div>
                  <div className='moimDetail-moimContent-home-member-content-text'>
                    <div>{data.member.nickname}</div>
                    <span>{data.profileText}프로필 상태 글</span>
                  </div>
                </div>
            ))
          }
      </div>
      
    </div>
  )
}

export default MoimDetailBoardScheduleDetailMember;