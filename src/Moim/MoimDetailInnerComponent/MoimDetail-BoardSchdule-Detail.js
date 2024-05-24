import { useParams } from 'react-router-dom';
import './MoimDetail-BoardSchdule-Detail.css';
import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import imsiImg from '../../Img/깡총강쥐.png';
import moment from 'moment';
import 'moment/locale/ko';  // 요일 한글로 구하려면 필요
import face from '../../HomeComponent/ReviewComponent/face.svg';


const MoimDetailBoardScheduleDetail = ({isAuth, userInfo, moimInfo, setMoimInfo})=>{

  const {id} = useParams(); 
  const {no} = useParams(); 
  const [moimMemberRole, setMoimMemberRole] = useState(null); // 모임장, 매니저, 모임원 여부
  const [moimMemberList,setMoimMemberList] = useState(null); // 모임멤버 리스트
  const [moimScheduleInfo, setMoimScheduleInfo] = useState(false); // 모임 일정
  const dateFormat = "M월 D일 (ddd)";
  moment.locale('ko');

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

    switch(matchingMember.memberRole) {
      case 'leader' : setMoimMemberRole('leader'); break;
      case 'manager' : setMoimMemberRole('manager'); break;
      case 'member' : setMoimMemberRole('member'); break;
      default:  break;
    }
  },[isAuth, userInfo, moimMemberList]);


  useEffect(()=>{
    axiosInstance.get(`/getMoimScheduleDetail/${no}`)
    .then((response)=>{
      setMoimScheduleInfo(response.data);
    }).catch((error)=>{
      console.log(error);
    });
  },[setMoimScheduleInfo]);


  const imsiJoinMember = ['aa','bb','cc','dd','ee','ff','gg'];
  const [participation, setParticipation] = useState('참여 인원이 다 찼어요');
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

  // console.log(moimScheduleInfo);

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
          <div className={`moimScheduleDetail-memberCount ${moimScheduleInfo.scheduleMaxMember === 19 ? 'moimSchedule-memberCount-full': ''}`}
               style={{color : `${moimScheduleInfo.scheduleMaxMember === 1 ? 'red' : 'black'}`}}
          >
            {moimScheduleInfo.scheduleMaxMember -1} / {moimScheduleInfo.scheduleMaxMember}
          </div>
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

        {/* 모임일정 참여멤버*/}
        <div className='moimScheduleDetail-Box'><span>참여멤버</span></div>
        <div className='moimScheduleDetail-MemberBox'>
          <div className='moimScheduleDetail-MemberBox-memberBox'>
            {
              imsiJoinMember.slice(0, 5).map((data, i) => (
                // <div className='moimScheduleDetail-MemberBox-img' key={i}>
                  <div className='moimScheduleDetail-MemberBox-member' style={{backgroundImage: `url(${face})`}} key={i}></div>
                // </div> 
              ))
            }
            <div className='moimScheduleDetail-MemberBox-member' style={{backgroundColor: '#9087d3', color:'white', fontWeight: '500'}}>7명</div>
          </div>

            { imsiJoinMember.length > 5 && <span style={{fontSize: 'large', fontWeight: '800', color:'#9087d3'}}>…</span>}
            <div style={{marginLeft: 'auto'}}>
              더 보기
            </div>
        </div>
        
        <hr/>
        
        {/* 모임일정 설명 */}
        <div className='moimScheduleDetail-Box'><span>일정 설명</span></div>
        <div className='moimScheduleDetail-infoText'>
          <pre>
          여기에 설명이 들어가야 하는디...모임일정 엔티티에 설명 추가해 주쇼...상운🥲🥲
          </pre>
        </div>



        {/* 일정 참여 버튼 */}
        <div className='moimScheduleDetail-btn'
             style={{color: typeColors[participation], 
                     backgroundColor: typeBack[participation],
                     border: participation==='참여 취소하기' && '0.2rem solid #9087d3',
                    }}
        >
          {participation}
        </div>

      
      
      
      </div>
    </div>
  )
}

export default MoimDetailBoardScheduleDetail;