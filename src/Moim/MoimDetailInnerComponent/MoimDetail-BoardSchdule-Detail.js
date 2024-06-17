import { useNavigate, useParams } from 'react-router-dom';
import './MoimDetail-BoardSchdule-Detail.css';
import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import imsiImg from '../../Img/깡총강쥐.png';
import moment from 'moment';
import 'moment/locale/ko';  // 요일 한글로 구하려면 필요
import face from '../../HomeComponent/ReviewComponent/face.svg';
import MoimDetailBoardScheduleReply from './MoimDetail-BoardSchedule-Reply';
import leaderIcon from '../../Img/moimDetail_leaderIcon.svg';
import managerIcon from '../../Img/moimDetail_managerIcon.svg';


const MoimDetailBoardScheduleDetail = ({isAuth, userInfo, moimInfo, setMoimInfo})=>{

  const {id} = useParams(); 
  const {no} = useParams(); 
  const [moimMemberRole, setMoimMemberRole] = useState(null); // 모임장, 매니저, 모임원 여부
  const [moimMemberList,setMoimMemberList] = useState(null); // 모임멤버 리스트
  const [moimScheduleInfo, setMoimScheduleInfo] = useState(false); // 모임 일정
  const dateFormat = "M월 D일 (ddd)";
  moment.locale('ko');
  const [participationBtn, setParticipationBtn] = useState('');// 모임 일정 참여 버튼 값
  const [moimMemberInfo, setMoimMemberInfo] = useState(); // 모임 멤버 정보
  const navigate = useNavigate();
  const [joinNow, setJoinNow] = useState(false); // 모임 참여 중 여부


  // 🔒보안관련 (로그인 안했거나, 모임멤버 아닌경우 페이지 침입방지)
  useEffect(() => {
    axiosInstance.get(`/getMoimMemberList/${id}`)
        .then((response) => {
          let page = window.location.href;
          let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
          let moimMemberList = response.data;
          let matchingMember = moimMemberList?.find(memberInfo => memberInfo.member.id === userInfo?.id); // 모임 멤버 확인
          setMoimMemberInfo(matchingMember); //모임 멤버 객체 저장 (모임 멤버라면 값 들어가고 아니면 iundifind)
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
}, [id,isAuth]);

  // 모임정보 받아오는 effect
  useEffect(()=>{
    axiosInstance.get(`/moimInfo/${id}`)
    .then((response) => {
      setMoimInfo(response.data); // 모임 정보 저장
    })
    .catch((error) => {
        console.log(error);
    });
  },[id,setMoimInfo]);





  // 모임 role확인
  useEffect(()=>{
    // const matchingMember = moimMemberList?.find(memberInfo => memberInfo.member.id === userInfo.id);
    // if(!matchingMember){ //로그인 안하거나, 회원이 아닌 경우
    //   setMoimMemberRole('notMember');
    //   return;
    // }

    // setMoimMemberInfo(matchingMember);

    switch(moimMemberInfo?.memberRole) {
      case 'leader' : setMoimMemberRole('leader'); break;
      case 'manager' : setMoimMemberRole('manager'); break;
      case 'member' : setMoimMemberRole('member'); break;
      default:  break;
    }
  },[isAuth, userInfo, moimMemberList]);


  // 모임 스케쥴 정보 가져오기
  useEffect(()=>{
    axiosInstance.get(`/getMoimScheduleDetail/${no}`)
    .then((response)=>{
      setMoimScheduleInfo(response.data);
    }).catch((error)=>{
      console.log(error);
    });
  },[no, setMoimScheduleInfo, participationBtn]);


  useEffect(() => {
    const today = new Date().toLocaleDateString(); //오늘 년월일만 추출
    const scheduleDate = new Date(moimScheduleInfo?.scheduleStartDate).toLocaleDateString(); // 일정 날짜 년월일만 추출;
    if(moimScheduleInfo?.joinedMember?.some(member => member.id === moimMemberInfo?.id)){
      setJoinNow(true);
    }

    if (scheduleDate < today) { // 일정이 오늘 이전에 있었던건지 확인
      setParticipationBtn('지난 일정이에요');
    } else if (moimScheduleInfo?.joinedMember?.some(member => member.id === moimMemberInfo?.id)) { // 일정에 참여 중인 멤버 인지 확인
      setParticipationBtn('참여 취소하기');
    } else if (moimScheduleInfo.scheduleMaxMember === (moimScheduleInfo.joinedMember?.length || 0)) { // 일정 참여 멤버가 다 찼는지 확인
      setParticipationBtn('참여 인원이 다 찼어요');
    } else {
      setParticipationBtn('일정 참여하기'); // 오늘 이후 일정이고, 일정 참여 중 아니고, 일정 멤버가 다 차지 않은 경우 참여 가능
    }
  }, [moimScheduleInfo, moimMemberInfo]);





  const typeColors = {
    '일정 참여하기': 'white',
    '참여 취소하기': '#9087d3',
    '참여 인원이 다 찼어요': 'white',
    '지난 일정이에요': 'white'
  };

  const typeBack = {
    '일정 참여하기': '#9087d3',
    '참여 취소하기': 'white',
    '참여 인원이 다 찼어요': '#8c8c8c',
    '지난 일정이에요': '#8c8c8c'
  };



const scheduleHandler = ()=>{
  let id = moimMemberInfo.id;
  axiosInstance.post(`/moimScheduleJoin/${id}`, moimScheduleInfo)
  .then((response)=>{
    if(participationBtn === "일정 참여하기"){
      setParticipationBtn("참여 취소하기");
      setJoinNow(true);
    }else{
      setParticipationBtn("일정 참여하기");
      setJoinNow(false);
    }
  }).catch((error)=>{
    console.log(error);
  })
}



console.log(moimScheduleInfo);

  return(
    <div className='MoimDetail-container' style={{alignItems:'center'}}>
      <div className='moimDetail-headerBox'>
        <div className='moimDetail-header-beforeBtn'>{/* 목록 */}
          <FontAwesomeIcon icon={faList} size='lg'style={{color: '#6a60a9'}}/>
        </div>
        <div className='moimDetail-header-category'>{moimInfo.category}</div>
        <div className='moimDetail-header-title'>{moimInfo.moimname}</div>
      </div>

      {/* 모임 일정 박스 */}
      <div className='Moim-schedule-detail-container'>
        {/* 모임일정 이름, 참여자 수*/}
        <div className='moimScheduleDetail-container-header'>
          <div className='moimScheduleDetail-title'>{moimScheduleInfo.scheduleName}</div>
          {/* <div className={`moimScheduleDetail-memberCount ${moimScheduleInfo.scheduleMaxMember === 19 ? 'moimSchedule-memberCount-full': ''}`}
               style={{color : `${moimScheduleInfo.scheduleMaxMember === 1 ? 'red' : 'black'}`}}
          >
            {moimScheduleInfo.joinedMember?.length} / {moimScheduleInfo.scheduleMaxMember}
          </div> */}
        </div>
        {/* 모임일정 사진 */}
        <div className='moimScheduleDetail-img' style={{backgroundImage: `url(${imsiImg})`}}/>

        {/* 모임일정 시간*/}
        <div className='moimScheduleDetail-Box'>
          <span>일시</span>
          <div>
            {moimScheduleInfo.scheduleEndDate === null?
              <>{moment(moimScheduleInfo.scheduleStartDate).format(dateFormat, 'ko')} &nbsp;&nbsp;{moimScheduleInfo.scheduleStartTime} ~ {moimScheduleInfo.scheduleEndTime}</>
              :
              <>{moment(moimScheduleInfo.scheduleStartDate).format(dateFormat, 'ko')} ~ {moment(moimScheduleInfo.scheduleEndDate).format(dateFormat, 'ko')}
               &nbsp;&nbsp;{moimScheduleInfo.scheduleStartTime} ~ {moimScheduleInfo.scheduleEndTime}</>
            }
          </div>
        </div>
      
        {/* 모임일정 위치*/}
        <div className='moimScheduleDetail-Box'>
          <span>위치</span><div>{moimScheduleInfo.scheduleAddress}</div>
        </div>
        
        {/* 모임일정 비용*/}
        <div className='moimScheduleDetail-Box'>
          <span>비용</span><div>{moimScheduleInfo.scheduleCost}</div>
        </div>


        <hr/>


        {/* 모임일정 설명 */}
        {moimScheduleInfo?.scheduleDescription !== null &&
          <>
            <div className='moimScheduleDetail-Box'><span>일정 설명</span></div>
            <div className='moimScheduleDetail-infoText'>
              <pre>
              {moimScheduleInfo.scheduleDescription}
              </pre>
            </div>
    
            <hr/>
          </>
        }

                
        {/* 모임일정 참여멤버*/}
        <div className='moimScheduleDetail-Box' style={{gap: '0.3rem'}}>
          <span>참여멤버</span> 
          <span className={`moimScheduleDetail-memberCount ${moimScheduleInfo.scheduleMaxMember === 19 ? 'moimSchedule-memberCount-full': ''}`}
               style={{color : `${moimScheduleInfo.scheduleMaxMember === 1 ? 'red' : '#5e5e5e'}`}}
          >
            ({moimScheduleInfo.joinedMember?.length} / {moimScheduleInfo.scheduleMaxMember})
          </span>
        </div>
        <div className='moimScheduleDetail-MemberBox'>
          <div className='moimScheduleDetail-MemberBox-memberBox'>
            
            {
              moimScheduleInfo.joinedMember?.slice(0, 5).map((data, i) => (
                // <div className='moimScheduleDetail-MemberBox-img' key={i}>
                  // <div className='moimScheduleDetail-MemberBox-member' style={{backgroundImage: `url(${face})`}} key={i}></div>
                // </div> 

                  <div className='moimDetail-moimContent-home-member-content-img-modal' key={i}style={{backgroundImage: `url(${face})`}}>
                    {data.memberRole === 'leader' && <img className='moimDetail-moimLeaderIcon' src={leaderIcon} alt=''/>}
                    {data.memberRole === 'manager' && <img className='moimDetail-moimManagerIcon' src={managerIcon} alt=''/>}
                  </div>

              ))
            }
            {
              moimScheduleInfo.joinedMember?.length > 0 ?
            <div className='moimScheduleDetail-MemberBox-memberCount'>{moimScheduleInfo.joinedMember?.length}명</div>
            :
            <div style={{width: '100%', paddingBottom: '1rem'}}>참여한 멤버가 없어요 🥲</div>
            }
          </div>

            { moimScheduleInfo.joinedMember?.length > 5 && <span style={{fontSize: 'large', fontWeight: '800', color:'#9087d3'}}>…</span>}
            { moimScheduleInfo.joinedMember?.length > 0 && <div style={{marginLeft: 'auto', cursor: 'pointer'}} onClick={()=>navigate(`/moim/${id}/schedule/${no}/member`)}>더 보기</div>} 
        </div>
        
        <hr/>
        
        
        {/* 일정 참여 버튼 */}
        <div className='moimScheduleDetail-btn'
             style={{color: typeColors[participationBtn], 
                     backgroundColor: typeBack[participationBtn],
                     border: '0.2rem solid',
                     borderColor: typeColors[participationBtn],
                     cursor: (participationBtn === "지난 일정이에요" || participationBtn === "참여 인원이 다 찼어요") ? 'default' : 'pointer'
                    }}
                    onClick={(participationBtn === "지난 일정이에요" || participationBtn === "참여 인원이 다 찼어요") ? null : scheduleHandler}
        >
          {participationBtn}
        </div>

        
        {/* 모임일정 설명 */}
        {
          joinNow &&
          <>
            <div className='moimScheduleDetail-Box'>
              <span>댓글 5</span>
            </div>
            <div className='moimScheduleDetail-infoText'>
              <MoimDetailBoardScheduleReply no={no} moimMemberInfo={moimMemberInfo}  /> 
            </div>
          </>
        }
        



        

      
      
      
      </div>
    </div>
  )
}

export default MoimDetailBoardScheduleDetail;