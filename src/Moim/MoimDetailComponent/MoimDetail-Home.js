import './MoimDetail-Home.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import face from '../../HomeComponent/ReviewComponent/face.svg';
import leaderIcon from '../../Img/moimDetail_leaderIcon.svg';
import managerIcon from '../../Img/moimDetail_managerIcon.svg';
import { Button, Collapse, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import imsiImg from '../../Img/깡총강쥐.png';

const MoimDetailHome = ({moimInfo,setMoimInfo,moimMemberRole}) =>{
  // 제발..
  // 모임 소개 수정용 스테이트 및 이펙트
  const [imsiMoimInfo, setImsiMoimInfo] = useState(null);
  useEffect (()=>{
    setImsiMoimInfo(moimInfo);
  },[moimInfo]);

const imsiScheduleData = [
{
  id : 1,
  title : '🏸정기민턴🏸',
  startDate: '12/13',
  endDate : '',
  startDay : '(수)',
  endDay : '',
  dDay : 2,
  startTime : '16:00',
  endTime : '20:00',
  place : '계양 실내 배드민턴장',
  price : '입장료 5,000원',
  joinMember : 19,
  maxMamber : 25
},
{
  id : 2,
  title : '🏆연말 배드민턴 대회🏆',
  startDate: '12/23',
  endDate : '12/24',
  startDay : '(토)',
  endDay : '(일)',
  dDay : 12,
  startTime : '14:00',
  endTime : '12:00',
  place : '계양구 구민체육관 2관',
  price : '입장료 30,000원',
  joinMember : 29,
  maxMamber : 40
}
];

const imsiBoardData = [
  {
    id : 1,
    category : '공지',
    title : '정기모임 실내 배드민턴 입장료 인상 3,000 ➔ 5,000 💸',
    date : '2023 / 10 / 01'
  },
  {
    id : 2,
    category : '공지',
    title : '🥸 신입 멤버들을 위한 쾌적한 SMASH 생활 (주의사항 및 시설이용 안내)🥸',
    date : '2023 / 10 / 05'
  }
  ];
  
const imsiMemberData = [
  {
    memberRole : 'leader',
    nickname : '배민족장',
    profileText : '네 제가 방장입니다 :-)'
  },
  {
    memberRole : 'manager',
    nickname : '배드Mint',
    profileText : '배드민턴 쪼아'
  },
  {
    memberRole : 'manager',
    nickname : '산비',
    profileText : '올해는 운동좀 하자🫥'
  },
  {
    memberRole : 'member',
    nickname : 'Jella',
    profileText : '안녕하세요'
  },
  {
    memberRole : 'member',
    nickname : '상운',
    profileText : '안녕하세요'
  },
  {
    memberRole : 'member',
    nickname : 'Jella',
    profileText : '안녕하세요'
  },
  {
    memberRole : 'member',
    nickname : '상운',
    profileText : '안녕하세요'
  }
];

const [isMoreMember, setIsMoreMember] = useState(false);
const [memberKickOut, setMemberKickOut] = useState(false);
const [memberKickOutName, setMemberKickOutName] = useState('');
const memberKickOutHandler = (name)=>{
  setMemberKickOut(true);
  setMemberKickOutName(name);
}

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
  
  axiosInstance.post('/updateMoimInfo', imsiMoimInfo)
  .then((response) => {
    setMoimDescription(false); // 수정모달창 끄기
    setMoimInfo(imsiMoimInfo); 
    alert(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
}


  // console.log(imsiMoimInfo.description);

  return(
    <div className="moimDetail-moimContent-home">
      {/*⭐ 모임소개 ⭐*/}
      <div className="moimDetail-moimContent-home-descriptionBox">
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
                          value={imsiMoimInfo.description}
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
                  <div className='moimDetail-moimContent-home-description-non'>
                    아직 모임 설명이 없어요 🥲
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
          <FontAwesomeIcon icon={faEllipsisVertical} size="lg"/>
        </div>
        <div className='moimDetail-moimContent-home-schedule-contentBox'>
          {
            imsiScheduleData.map((data, i)=>(
              <div className='moimDetail-moimContent-home-schedule-content' key={i}>
                <div className='moimDetail-moimContent-home-schedule-content-header-dDay'>D-2</div>
                {/* 모임일정 기간 및 모임제목*/}
                <div className='moimDetail-moimContent-home-schedule-content-headerBox'>
                  <div className='moimDetail-moimContent-home-schedule-content-header-title'>{data.title}</div>
                  <div className='moimDetail-moimContent-home-schedule-content-header-date'>
                    {data.startDate} {data.startDay} {data.endDate!== '' && '~'} {data.endDate} {data.endDay}
                  </div>
                </div>
                {/* 임시 이미지 */}
                <div className='ddd'>
                  <div className='moimDetail-moimContent-home-schedule-content-img' 
                      style={{backgroundImage: `url(${imsiImg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                  />
                  <div className='moimDetail-moimContent-home-schedule-content-info'>
                    {data.endDate === '' ?
                      <div className='moimDetail-moimContent-home-schedule-content-info-data'>
                        <span>일시</span><p>{data.startDate} {data.startDay} {data.startTime} {/*~ {data.endTime}*/}</p>
                      </div>
                    :
                      <div className='moimDetail-moimContent-home-schedule-content-info-data'>
                        <span>일시</span><p>{data.startDate} {data.startDay} {data.startTime} ~ {data.endDate} {data.endDay} {/*{data.endTime}*/}</p>
                      </div>
                    }
                    <div className='moimDetail-moimContent-home-schedule-content-info-data'>
                      <span>위치</span><p>{data.place}</p>
                    </div>
                    <div className='moimDetail-moimContent-home-schedule-content-info-data'>
                      <span>비용</span><p>{data.price}</p>
                    </div>
                  </div> 
                  <div className='moimDetail-moimContent-home-schedule-content-info-member'><span>{data.joinMember}</span> / {data.maxMamber}명</div> 
                </div> 
              </div>
            ))
          }
        </div>
      </div>

      <span className='moimDatail-line'>&nbsp;</span>{/*⭐ 컨텐츠 나누는 중간 줄 ⭐*/}
      
      {/*⭐ 공지사항 ⭐*/}
      <div className='moimDetail-moimContent-home-boardBox'>
        <div className="moimDetail-moimContent-home-header">
          <h6>꼭 읽어주세요!</h6>
          {/* 😡임시😡 ↓ 모임장만 보이게 해야함 */}
          <FontAwesomeIcon icon={faEllipsisVertical} size="lg"/>
        </div>
        <div className='moimDetail-moimContent-home-board-contentBox'>
          {
            imsiBoardData.map((data, i)=>(
              <div className='moimDetail-moimContemt-home-board-content' key={i}>
                <div className='moimDetail-moimContemt-home-board-content-cate'>[{data.category}]</div>
                <div className='moimDetail-moimContemt-home-board-content-title'>{data.title}</div>
                <span>{data.date}</span>
              </div>
            ))
          }
        </div>
      </div>

      <span className='moimDatail-line'>&nbsp;</span>{/*⭐ 컨텐츠 나누는 중간 줄 ⭐*/}
      
      {/* ⭐모임멤버⭐ */}
      <div className='moimDetail-moimContent-home-memberBox'>
        <div className="moimDetail-moimContent-home-header">
          <h6>모임멤버 <span>({imsiMemberData.length}명)</span></h6>
          {/* 😡임시😡 ↓ 모임장만 보이게 해야함 */}
          <div className='moimDetail-moimContent-home-member-settingIcon' onClick={() => setIsMoreMember(true)}>
            <FontAwesomeIcon icon={faEllipsisVertical} size="lg"/>
          </div>
          {/* <div>더보기</div> */}
        </div>
        <div className='moimDetail-moimContent-home-member-contentBox'>
          {
            // imsiMemberData.slice(0, 4).map((data, i) => (
              imsiMemberData.map((data, i) => (
              <div className='moimDetail-moimContent-home-member-content' key={i}>
                <div className='moimDetail-moimContent-home-member-content-img' style={{backgroundImage: `url(${face})`}}>
                  {data.memberRole === 'leader' && <img className='moimDetail-moimLeaderIcon' src={leaderIcon} alt=''/>}
                  {data.memberRole === 'manager' && <img className='moimDetail-moimManagerIcon' src={managerIcon} alt=''/>}
                  {/* <img className='moimDetail-moimMember-img' src={face} alt=''/> */}
                </div>
                <div className='moimDetail-moimContent-home-member-content-text'>
                  <div>{data.nickname}</div>
                  <span>{data.profileText}</span>
                </div>
                {
                  moimMemberRole === "leader" &&
                  <div className='moim-moimContent-home-member-settingBox'>
                  {
                    data.memberRole!== 'leader' &&
                    <div className='moimDetail-moimContent-home-member-modal-setting'>
                      <button className={`moimDetail-moimContent-home-member-modal-managerBtn 
                                        ${data.memberRole==='manager' && 'member-modal-managerBtn'}`}
                                        // onClick={🚫매니저 지정 및 해제 핸들러 추가해야함}
                      >
                        {/* {data.memberRole==='manager'? '★ 매니저 해제' : '★ 매니저 지정'} */}
                        ★ 매니저
                      </button>
                      <button className='moimDetail-moimContent-home-member-modal-kickOut' 
                              onClick={()=>memberKickOutHandler(data.nickname)}>
                        모임강퇴
                      </button>
                    </div>
                  }
                  </div>
                }

              </div>
            ))
          }
          {/* 멤버가 4명 이상인 경우 멤버 더 보기 버튼 활성화 (hover 시 tooltip버튼 활성화) */}
          {/* {imsiMemberData.length > 4 && (
            <OverlayTrigger placement="top" overlay={<Tooltip>멤버 더 보기</Tooltip>}>
              <div className='moimDetail-moimContent-home-member-content2' onClick={() => setIsMoreMember(true)}>
                <div>+</div>
              </div>
            </OverlayTrigger>
          )} */}
        </div>
      </div>


      <Modal
        // size="lg"
        show={isMoreMember}
        onHide={() => setIsMoreMember(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            모임멤버
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{paddingTop: '0', paddingLeft: '0', paddingRight: '0'}}>
          <div className='moimDetail-moimContent-home-member-content-modalBox'>
          {
            imsiMemberData.map((data,i)=>(
              <div className='moimDetail-moimContent-home-member-content-modal' key={i}>
                  <div className='moimDetail-moimContent-home-member-content-img-modal' style={{backgroundImage: `url(${face})`}}>
                    {data.memberRole === 'leader' && <img className='moimDetail-moimLeaderIcon' src={leaderIcon} alt=''/>}
                    {data.memberRole === 'manager' && <img className='moimDetail-moimManagerIcon' src={managerIcon} alt=''/>}
                  </div>
                  <div className='moimDetail-moimContent-home-member-content-text'>
                    <div>{data.nickname}</div>
                    <span>{data.profileText}</span>
                  </div>
                  
                  {
                    data.memberRole!== 'leader' &&
                    <div className='moimDetail-moimContent-home-member-modal-setting'>
                      {/* <button>{data.memberRole==='manager'? '★ 매니저 해제' : '★ 매니저 지정'}</button> */}
                      <button className={`moimDetail-moimContent-home-member-modal-managerBtn 
                                        ${data.memberRole==='manager' && 'member-modal-managerBtn'}`}
                                        // onClick={🚫매니저 지정 및 해제 핸들러 추가해야함}
                      >
                        ★ 매니저
                      </button>
                      <button className='moimDetail-moimContent-home-member-modal-kickOut' 
                              onClick={()=>memberKickOutHandler(data.nickname)}>
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
            <span><strong>{memberKickOutName}</strong> 님을 퇴장시키겠습니까?</span>
            {/* <br/> */}
            <span style={{fontSize: '12.5px', color: 'red', margin:'0.8rem 0 1.4rem'}}>해당 멤버는 다시 모임에 들어올 수 없어요</span>
            <div>
              <Button size='sm' variant="outline-secondary" style={{width: '5rem'}} onClick={()=>setMemberKickOut(false)}>취소</Button>
              <Button size='sm' variant='danger' style={{width: '5rem', marginLeft: '0.7rem'}}>퇴장</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>



    </div>
  )
}

export default MoimDetailHome;