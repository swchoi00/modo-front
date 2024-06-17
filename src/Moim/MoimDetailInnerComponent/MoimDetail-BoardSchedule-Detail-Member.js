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


// 🔒보안관련 (로그인 안했거나, 모임멤버 아닌경우 페이지 침입방지)
useEffect(() => {
  axiosInstance.get(`/getMoimMemberList/${id}`)
      .then((response) => {
        let page = window.location.href;
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        let moimMemberList = response.data;
        let matchingMember = moimMemberList?.find(memberInfo => memberInfo.member.id === userInfo?.id); // 모임 멤버 확인
        // setMoimMemberInfo(matchingMember); //모임 멤버 객체 저장 (모임 멤버라면 값 들어가고 아니면 iundifind)
        // console.log(matchingMember);
    
        // 😡😡😡나중에 주소 바꿔줘야함
        if (page !== `http://localhost:3000/moim/${id}/home`) { // 모임 메인 화면이 아닌 페이지를 url로 들어올 경우 (모임 메인 화면은 비회원도 볼 수 있음)
          if(userInfo){ //로그인 상태
              if(!matchingMember){ //모임멤버 아닌 경우
                alert("모임 가입 후 이용해주세요");
                navigate(`/moim/${id}/home`);
              }
          }else{ // 로그인 안한 상태
            alert("로그인 후 이용해주세요😉");
            navigate('/login');
          }
        }
      }).catch((error) => {
          console.log(error);
      });
}, [id]);


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
                    {/* <div>{data.member.nickname}</div> //나중에 바꿔야함 */} 
                    <div>{data}</div>
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