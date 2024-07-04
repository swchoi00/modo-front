import './MoimDetail-Home.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import face from '../../HomeComponent/ReviewComponent/face.svg';
import leaderIcon from '../../Img/moimDetail_leaderIcon.svg';
import managerIcon from '../../Img/moimDetail_managerIcon.svg';
import { Button, Collapse, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import imsiImg from '../../Img/깡총강쥐.png';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ko';  // 요일 한글로 구하려면 필요
import MoimDetailHomeNoticeModal from '../MoimDetailInnerComponent/MoimDetail-Home-Notice-Modal';


const MoimDetailHome = ({moimInfo,setMoimInfo,moimMemberRole,moimMemberList, setMoimMemberList, setMoimPageRef}) =>{
 
  const navigate = useNavigate();
  // 모임 소개 수정용 스테이트 및 이펙트
  const [imsiMoimInfo, setImsiMoimInfo] = useState(null);
  useEffect (()=>{
    setImsiMoimInfo(moimInfo);
  },[moimInfo]);

  
const [moimNoticeList, setMoimNoticeList] = useState(null);
const [moimScheduleList, setMoimScheduleList] = useState(null);
const [memberListModal, setMemberListModal] = useState(false); // 모임 멤버 설정 모달 여부
const [memberKickOut, setMemberKickOut] = useState(false); // 모임 멤버 강퇴 모달 여부
const [memberKickOutName, setMemberKickOutName] = useState(null); // 강퇴할 모임 멤버 정보
moment.locale('ko');
const dateFormat = "M월 D일 (ddd)";
const [moimNoticeModal, setMoimNoticeModal] = useState(false); // 공지 설정 모달


  // 모임 스케쥴 리스트 가져옴 (오늘 포함한 앞으로 일정, 지난 일정은 포함하지 않음)
  useEffect(() => {
    let id = moimInfo.id;
    if(id){ // 랜더링 때문에 랜더링이 늦으면 가끔 get 오류 떠서 이렇게 처리함
      axiosInstance.get(`/getMoimSchedule/${id}/list`)
      .then((response) => {
          const today = moment().startOf('day'); // 오늘 날짜의 시작 부분(자정)을 가져옵니다.
          
          // 받아온 일정 목록 중 오늘 이후의 일정 필터링
          const filteredSchedules = response.data.filter(schedule => {
              const scheduleStartDate = moment(schedule.scheduleStartDate);
              // 오늘 이후의 일정만 필터링
              return scheduleStartDate.isSameOrAfter(today);
          });
          
          // 최신 날짜 순으로 정렬 (최근날짜 기준)
          filteredSchedules.sort((a, b) => moment(a.scheduleStartDate) - moment(b.scheduleStartDate)); 
          setMoimScheduleList(filteredSchedules);
  
      }).catch((error) => {
          console.log(error);
      });
    }
  }, [moimInfo.id, setMoimScheduleList]);


  //Dday 계산
  const moimScheduleDday = (date) => {
    // 오늘 날짜
    const today = moment().startOf('day');
    // 선택한 날짜
    const selectedDate = moment(date).startOf('day');
    // 오늘 날짜와 선택한 날짜의 차이를 계산하여 반환
    const remainingDays = selectedDate.diff(today, 'days');
    return remainingDays;
  };


// 모임 게시글 가져옴
useEffect(()=>{
  axiosInstance.get(`/getMoimCommList/${moimInfo.id}`)
  .then((response)=>{
    let moimList = response.data;
    // 여기서 comm.noticeCheck(true) 인것만 filter해서 setMoimNoticeList로 저장
    setMoimNoticeList(moimList.filter(data => data.noticeCheck)); // 이게 공지 여부 체크한 것들
  }).catch((error)=>{
    console.log(error);
  });
},[moimInfo, setMoimNoticeModal]);


// 모임 강퇴 멤버 정보 저장 및 강퇴 모달 띄우는 핸들러
const memberKickOutModalHandler = (memberId, memberName)=>{
  setMemberKickOutName({'id' : memberId, 'name': memberName});
  setMemberKickOut(true);
}

const memberKickOutHandler = (()=>{
  axiosInstance.delete(`/quitMoim/${memberKickOutName.id}`)
  .then(()=>{
    setMemberKickOut(false); // 강퇴 확인 모달창 닫음
    setMemberListModal(false); // 멤버 리스트 모달창 닫음
    alert(memberKickOutName.name + "님을 강퇴했습니다.");
    setMoimMemberList(prevList => prevList.filter(member => member.id !== memberKickOutName.id)); // moimMemberList안에 있는 id값과 일치하는거 제거
    setMemberKickOutName(null); // 강퇴 멤버 정보 null로 초기화
  }).catch((error)=>{
    console.log(error);
  });
});



// 모임 소개 미리보기 토글용 스테이트
const [moimDescriptionSampleOpen, setMoimDescriptionSampleOpen] = useState(false);

// 모임 소개 수정버튼  스테이트
const [moimDescription, setMoimDescription] = useState(false);

// 글자 수 세기 
const [countDescription, setCountDescription] = useState(0);

// 내용 X 모임 소개 수정 시도 방지
const [checkDescription, setCheckDescription] = useState(null);

// 모임 설명 수정 버튼 핸들러
const editDescriptionBtnHandler=()=>{
  setMoimDescription(!moimDescription); 
  setMoimDescriptionSampleOpen(false);

  if(imsiMoimInfo.description){
    setCountDescription(imsiMoimInfo.description.length);
  }
}

// 모임 설명 수정 핸들러
const updateDescriptionHandler = (e)=>{
  const eValue = e.target.value;
  
  setCheckDescription(null);
  setCountDescription(eValue.length);
  setImsiMoimInfo((data)=>({
    ...data, description : eValue
  }));
}

// 모임 수정 서버 작업
const editDesCriptionHandler = ()=>{
//console.log(imsiMoimInfo);
  // 빈 값 넣기 방지
  let Descripton = imsiMoimInfo.description.trim(); // trim ->공백제거 (스페이스바)
  if(countDescription === 0 || Descripton.length === 0) { // 스페이스바만 넣어서 저장하는거 방지
    setCheckDescription(false);
    return;
  }

  if(moimInfo.description === imsiMoimInfo.description){  // 내용이 똑같은데 수정하려는 경우 그냥 수정창 끔
    editDescriptionBtnHandler();
    return;
  }
  
  //console.log(imsiMoimInfo);
  axiosInstance.post('/updateMoimInfo', imsiMoimInfo)
  .then((response) => {
    setMoimInfo(imsiMoimInfo); 
    setMoimDescription(false); // 수정모달창 끄기
    alert(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
}

// 모임 멤버 매니저 지정 밎 해제 핸들러
const moimManagerHandler=(memberId, memberName, memberRole)=>{
  // 해당 멤버role이 member면 manager 값 넣고 이미 manager면 member값 넣기
  let setMemberRole = (memberRole === 'member' ? 'manager' : 'member'); 
  const confirmManager = window.confirm(memberName + "님을 매니저로 " + `${setMemberRole === 'manager' ? '지정' : '해제'}`);
  // //console.log(memberId);
  
  if(confirmManager){
    axiosInstance.put('/updateMoimMemberRole', memberId)
    .then((response)=>{
        setMoimMemberList(response.data);  // 업데이트된 List<moimMember>객체 받아옴
    }).catch((error)=>{
      console.log(error);
    })
  }
}



  return(
    <div className="moimDetail-moimContent-home">
      {/*⭐ 모임소개 ⭐*/}
      <div className="moimDetail-moimContent-home-descriptionBox" style={{marginTop: '1.5rem'}}>
        <div className="moimDetail-moimContent-home-header">
          <h6>모임소개</h6>
           {
            moimMemberRole === "leader" &&
            <div className='moimDetail-moimContent-editBtn-Box' 
                style={{cursor: 'pointer'}}
                onClick={editDescriptionBtnHandler}
            >
              <FontAwesomeIcon icon={faPen} size="1x" style={{color: 'gray'}}/>
            </div>
           }   
        </div>
        <div className="moimDetail-moimContent-home-description-Box">
          {/* ⭐⭐[ 구조 ] 수정창O : 수정창X (모임설명O : 모임설명X) */}
          {moimDescription ? (// 모임 설명 수정 여부
              <div className='moimDetail-moimContent-home-description-edit'>
                <textarea placeholder='모임에 대해 자세히 알려주세요!'
                          value={imsiMoimInfo.description || ''}
                          onChange={updateDescriptionHandler}
                          maxLength="1500"
                />
                <div>
                  { checkDescription === false &&
                    <span style={{position: 'absolute', left: '0', paddingLeft: '0.5rem', fontSize: 'small', color:'red'}}>
                      *내용을 입력해주세요
                    </span>
                  }
                  <span style={{color: '#a472ff'}}>{countDescription}/1500</span>
                  <button onClick={editDesCriptionHandler} style={{backgroundColor: '#a472ff', color:'white'}}>수정</button>
                  <button onClick={()=>{setMoimDescription(false); setImsiMoimInfo(moimInfo); setCheckDescription(null);}}>취소</button>
                </div>
              </div>
            ) : ( // 모임 수정 아닌 경우
              moimInfo.description? ( // 모임 설명 데이터 O
                <div className='moimDetail-moimContent-home-description-yes'>
                  {/* 
                    // 이건 줄바꿈은 적용되지만, 스페이스바 공백 1개 이상 적용 X
                  {moimInfo.description.split('\n').map((item, key) => {return <React.Fragment key={key}>{item}<br/></React.Fragment>})} 
                  */}
                  <pre>{moimInfo.description}</pre>
                </div>
              ):( // 모임 설명 데이터 X
                moimMemberRole === "leader" ?
                (// 모임 리더인 경우
                <div className='moimDetail-moimContent-home-description-no'>
                  <div className='moimDetail-moimContent-home-description-no-guide'>
                    <FontAwesomeIcon icon={faPen} size="1x"/>  &nbsp; 버튼을 눌러 모임 소개를 추가할 수 있어요!
                  </div>
                  <button
                    onClick={() => setMoimDescriptionSampleOpen(!moimDescriptionSampleOpen)}
                    aria-controls="example-collapse-text"
                    aria-expanded={moimDescriptionSampleOpen}
                    style={{backgroundColor: '#ffffff00', border: 'none', color: 'gray', padding: '0', marginLeft: '0.8rem'}}
                  >
                    {// 모임 소개 미리보기 버튼 글자
                      moimDescriptionSampleOpen? 
                      <span><FontAwesomeIcon icon={faAngleDown} size="1x"/> 모임 소개 예시 닫기</span>
                      :
                      <span><FontAwesomeIcon icon={faAngleRight} size="1x"/> 모임 소개 예시 보기👀</span>
                    }
                  </button>
                  <Collapse in={moimDescriptionSampleOpen}>
                    <div id="example-collapse-text" style={{color: 'gray', margin: '0.5rem 1.6rem'}}>
                      {/* <hr/> */}
                      🌟 어서와, SMASH에 찾아온 당신! 🌟 <br/>
                        SMASH는 2030을 위한 배드민턴 모임으로, 우리는 스포츠와 즐거움을 함께하는 공간이에요. <br/><br/><br/>

                        📅 정기 모임📅 <br/>
                        매주 토요일에 SMASH에서 열리는 화려한 배드민턴 대결에 참여하세요! 🏆<br/><br/><br/>

                        🍲 운동 후엔 맛있는 음식과 함께하는 시간! 🍲 <br/>
                        SMASH는 운동 끝에 펼쳐지는 다양한 맛집 탐방도 함께합니다. 먹으면서 즐겁게 소통하세요!<br/><br/><br/>

                        🤝 새로운 친구들과 친해지는 특별한 순간! 🤝 <br/>
                        SMASH는 모두가 함께 즐기며 성장할 수 있는 공간입니다. 새로운 인연과 친목을 쌓아가세요.<br/><br/><br/>

                        지금 바로 함께해, SMASH의 멋진 사람들과 최고의 스포츠와 만남을 경험하세요!<br/>
                        #SMASH #배드민턴 #스포츠 #친목 #2030 #함께뛰자
                    </div>
                  </Collapse>
                </div>
                ):( // 모임설명이 없는데 리더가 아닌 경우
                  <div style={{marginTop: '1rem', textAlign: 'center'}}>
                    아직 모임 설명이 없어요 
                  </div>
                )
              )
            )
           }
        </div>
      </div>
      
      <span className='moimDatail-line'>&nbsp;</span>{/*⭐ 컨텐츠 나누는 중간 줄 ⭐*/}

      {/*⭐ 모임일정 ⭐*/}
      <div className='moimDetail-moimContent-home-scheduleBox'>
        <div className="moimDetail-moimContent-home-header">
          <h6>모임 일정</h6>
          {/* 😡임시😡 ↓ 모임장만 보이게 해야함 */}
          {
            moimMemberRole === 'leader' &&
            <FontAwesomeIcon icon={faPlus} size="lg" style={{color: "gray", cursor:'pointer'}} onClick={()=>navigate(`/moim/${moimInfo.id}/board`)}/>
          }
        </div>
        <div className='moimDetail-moimContent-home-schedule-contentBox'>
          {
            moimScheduleList?.slice(0,2).map((data, i)=>(
              <div className='moimDetail-moimContent-home-schedule-content' key={i} style={{cursor: 'pointer'}} onClick={() =>navigate(`/moim/${moimInfo.id}/schedule/${data.scheduleNo}`)}>
                <div className='moimDetail-moimContent-home-schedule-content-header-dDay'>
                  {moimScheduleDday(data.scheduleStartDate) === 0 ? 'Today' :
                  moimScheduleDday(data.scheduleStartDate) < 0 ? `D+${Math.abs(moimScheduleDday(data.scheduleStartDate))}` : 
                  `D-${moimScheduleDday(data.scheduleStartDate)}`}
                </div>
                {/* 모임일정 기간 및 모임제목*/}
                <div className='moimDetail-moimContent-home-schedule-content-headerBox'>
                  <div className='moimDetail-moimContent-home-schedule-content-header-title'>{data.scheduleName}</div>
                  <div className='moimDetail-moimContent-home-schedule-content-header-date'>
                  {data.scheduleEndDate === null ? // 일정이 하루인지 물어봄
                    <>{moment(data.scheduleStartDate).format(dateFormat, 'ko')}</>
                  :
                    <>{moment(data.scheduleStartDate).format(dateFormat, 'ko')} ~ {moment(data.scheduleEndDate).format(dateFormat, 'ko')} </>
                  }
                    {/* {data.startDate} {data.startDay} {data.endDate!== '' && '~'} {data.endDate} {data.endDay} */}
                  </div>
                </div>
                {/* 임시 이미지 */}
                <div className='moimDetail-moimContent-home-schedule-content-innerBox'>
                  <div className='moimDetail-moimContent-home-schedule-content-img' 
                      style={{backgroundImage: `url(${imsiImg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                  />
                  <div className='moimDetail-moimContent-home-schedule-content-info'>
                    {data.scheduleEndDate === undefined ?
                      <div className='moimDetail-moimContent-home-schedule-content-info-data'>
                        <span>일시</span><p>{moment(data.scheduleStartDate).format(dateFormat, 'ko')} &nbsp;{data.scheduleStartTime} ~ {data.scheduleEndTime}</p>
                      </div>
                    :
                      <div className='moimDetail-moimContent-home-schedule-content-info-data'>
                        <span>일시</span><p>{moment(data.scheduleStartDate).format(dateFormat, 'ko')} ~ {moment(data.scheduleEndDate).format(dateFormat, 'ko')} &nbsp;{data.scheduleStartTime} ~ {data.scheduleEndTime}</p>
                      </div>
                    }
                    <div className='moimDetail-moimContent-home-schedule-content-info-data'>
                      <span>위치</span><p>{data.scheduleAddress}</p>
                    </div>
                    <div className='moimDetail-moimContent-home-schedule-content-info-data'>
                      <span>비용</span><p>{data.scheduleCost}</p>
                    </div>
                  </div> 
                  <div className='moimDetail-moimContent-home-schedule-content-info-member'><span>{data.joinedMember?.length || 0}</span> / {data.scheduleMaxMember}명</div> 
                </div> 
              </div>
            ))
          }
          {moimScheduleList?.length === 1 && // 스케쥴이 1개만 있는 경우 간격 맞추기용으로 빈 공간 채움
            <div className='moimDetail-moimContent-home-schedule-content scheduleMockup' style={{ boxShadow: 'none' }}/>
          }
          {
            moimScheduleList?.length === 0 && // 모임 스케쥴 없을 때
            <div className='moimDetail-moimContent-moimSchedule-non'>아직 모임 일정이 없어요 </div>
          }
        </div>
      </div>

      <span className='moimDatail-line'>&nbsp;</span>{/*⭐ 컨텐츠 나누는 중간 줄 ⭐*/}
      
      {/*⭐ 공지사항 ⭐*/}
      <div className='moimDetail-moimContent-home-boardBox'>
        <div className="moimDetail-moimContent-home-header">
          <h6>꼭 읽어주세요!</h6>
          { moimMemberRole !== 'notMember' && moimMemberRole !== 'leader' &&
            <span onClick={() => {navigate('/moim/1/board'); setMoimPageRef('comm');}} style={{cursor:'pointer'}}>더 보기</span>
          }
          { moimMemberRole === 'leader' &&
            <FontAwesomeIcon icon={faPlus} size="lg" style={{color: "gray", cursor:'pointer'}} onClick={() =>setMoimNoticeModal(true)}/>
          }
        </div>
        <div className='moimDetail-moimContent-home-board-contentBox'>
          {
            moimNoticeList?.length > 0 ?
            (
              moimNoticeList.map((data, i)=>(
                <div className='moimDetail-moimContemt-home-board-content' key={i} onClick={()=>navigate(`/moim/${moimInfo.id}/comm/${data.postno}`)}>
                  <div className='moimDetail-moimContemt-home-board-content-cate'>[공지]</div>
                  <div className='moimDetail-moimContemt-home-board-content-title'>{data.postname}</div>
                  <span>{data.uploadDate}</span>
                </div>
              ))
            )
            :
            <div className='moimDetail-moimContent-moimSchedule-non'>아직 대표 공지사항이 없어요 </div>
          }
        </div>
      </div>

      <span className='moimDatail-line'>&nbsp;</span>{/*⭐ 컨텐츠 나누는 중간 줄 ⭐*/}
      
      {/* ⭐모임멤버⭐ */}
      <div className='moimDetail-moimContent-home-memberBox'>
        <div className="moimDetail-moimContent-home-header">
          <h6>모임멤버 <span>({moimMemberList?.length}명)</span></h6>
          {moimMemberRole === 'leader' &&
            <div className='moimDetail-moimContent-home-member-settingIcon' onClick={() => setMemberListModal(true)}>
              <FontAwesomeIcon icon={faEllipsisVertical} size="lg"/>
            </div>
          }
        </div>
        <div className='moimDetail-moimContent-home-member-contentBox'>
          {
            // imsiMemberData.slice(0, 4).map((data, i) => (
            moimMemberList?.map((data, i) => (
              <div className='moimDetail-moimContent-home-member-content' key={i}>
                <div className='moimDetail-moimContent-home-member-content-img' style={{backgroundImage: `url(${face})`}}>
                  {data.memberRole === 'leader' && <img className='moimDetail-moimLeaderIcon' src={leaderIcon} alt=''/>}
                  {data.memberRole === 'manager' && <img className='moimDetail-moimManagerIcon' src={managerIcon} alt=''/>}
                  {/* <img className='moimDetail-moimMember-img' src={face} alt=''/> */}
                </div>
                <div className='moimDetail-moimContent-home-member-content-text'>
                  <div>{data.member.nickname}</div>
                  <span>임시 프로필 상태 글</span>
                </div>

                {// 여긴 모바일 일때만 보임
                  moimMemberRole === "leader" &&
                  <div className='moim-moimContent-home-member-settingBox'>
                  {
                    data.memberRole!== 'leader' &&
                    <div className='moimDetail-moimContent-home-member-modal-setting'>
                      <button className={`moimDetail-moimContent-home-member-modal-managerBtn 
                                        ${data.memberRole==='manager' && 'member-modal-managerBtn'}`}
                                        onClick={()=>moimManagerHandler(data.id, data.member.nickname, data.memberRole)}
                      >
                        {/* {data.memberRole==='manager'? '★ 매니저 해제' : '★ 매니저 지정'} */}
                        ★ 매니저
                      </button>
                      <button className='moimDetail-moimContent-home-member-modal-kickOut' 
                              onClick={()=>memberKickOutModalHandler(data.id, data.member.nickname)}>
                        모임강퇴
                      </button>
                    </div>
                  }
                  </div>
                }

              </div>
            ))
          }
        </div>
      </div>


      <Modal
        // size="lg"
        show={memberListModal}
        onHide={() => setMemberListModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            모임멤버({moimMemberList?.length}명)
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{paddingTop: '0', paddingLeft: '0', paddingRight: '0'}}>
          <div className='moimDetail-moimContent-home-member-content-modalBox'>
          {
            moimMemberList?.map((data,i)=>(
              <div className='moimDetail-moimContent-home-member-content-modal' key={i}>
                  <div className='moimDetail-moimContent-home-member-content-img-modal' style={{backgroundImage: `url(${face})`}}>
                    {data.memberRole === 'leader' && <img className='moimDetail-moimLeaderIcon' src={leaderIcon} alt=''/>}
                    {data.memberRole === 'manager' && <img className='moimDetail-moimManagerIcon' src={managerIcon} alt=''/>}
                  </div>
                  <div className='moimDetail-moimContent-home-member-content-text'>
                    <div>{data.member.nickname}</div>
                    <span>{data.profileText}프로필 상태 글</span>
                  </div>
                  
                  {
                    data.memberRole!== 'leader' &&
                    <div className='moimDetail-moimContent-home-member-modal-setting'>
                      {/* <button>{data.memberRole==='manager'? '★ 매니저 해제' : '★ 매니저 지정'}</button> */}
                      <button className={`moimDetail-moimContent-home-member-modal-managerBtn 
                                        ${data.memberRole==='manager' && 'member-modal-managerBtn'}`}
                                        onClick={()=>moimManagerHandler(data.id, data.member.nickname, data.memberRole)}
                      >
                        ★ 매니저
                      </button>
                      <button className='moimDetail-moimContent-home-member-modal-kickOut' 
                               onClick={()=>memberKickOutModalHandler(data.id, data.member.nickname)}>
                        모임강퇴
                      </button>
                    </div>
                  }
                </div>
            ))
          }
          
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={memberKickOut}
        size="sm"
        onHide={() => setMemberKickOut(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding:'0.5rem 0'}}>
            <span><strong>{memberKickOutName?.name}</strong> 님을 퇴장시키겠습니까?</span>
            {/* <br/> */}
            <span style={{fontSize: '12.5px', color: 'red', margin:'0.8rem 0 1.4rem'}}>해당 멤버는 다시 모임에 들어올 수 없어요</span>
            <div>
              <Button size='sm' variant="outline-secondary" style={{width: '5rem'}} 
                      onClick={()=>{setMemberKickOut(false); setMemberKickOutName(null);}}>취소</Button>
              <Button size='sm' variant='danger' style={{width: '5rem', marginLeft: '0.7rem'}} 
                      onClick={memberKickOutHandler}>퇴장</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <MoimDetailHomeNoticeModal moimNoticeModal={moimNoticeModal} setMoimNoticeModal={setMoimNoticeModal} 
                                 id={moimInfo.id} setMoimNoticeList={setMoimNoticeList}
      
      />

    </div>
  )
}

export default MoimDetailHome;