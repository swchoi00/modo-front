import './MoimDetail-Home.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import face from '../../HomeComponent/ReviewComponent/face.svg';
import leaderIcon from '../../Img/moimDetail_leaderIcon.svg';
import managerIcon from '../../Img/moimDetail_managerIcon.svg';
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useState } from 'react';

const MoimDetailHome = ({moimInfo}) =>{

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
  }
];

const [isMoreMember, setIsMoreMember] = useState(false);
const [memberKickOut, setMemberKickOut] = useState(false);
const [memberKickOutName, setMemberKickOutName] = useState('');
const memberKickOutHandler = (name)=>{
  setMemberKickOut(true);
  setMemberKickOutName(name);
}


  return(
    <div className="moimDetail-moimContent-home">
      {/*⭐ 모임소개 ⭐*/}
      <div className="moimDetail-moimContent-home-descriptionBox">
        <div className="moimDetail-moimContent-home-header">
          <h6>모임소개</h6>
          {/* 😡임시😡 ↓ 모임장만 보이게 해야함 */}
          <FontAwesomeIcon icon={faEllipsisVertical} size="lg"/>
        </div>
        <div className="moimDetail-moimContent-home-description-text">
          {moimInfo.description}
          {/* 🌟 어서와, SMASH에 찾아온 당신! 🌟 <br/>
          SMASH는 2030을 위한 배드민턴 모임으로, 우리는 스포츠와 즐거움을 함께하는 공간이에요. <br/><br/><br/>


          📅 정기 모임📅 <br/>
          매주 토요일에 SMASH에서 열리는 화려한 배드민턴 대결에 참여하세요! 🏆<br/><br/><br/>


          🏋️‍ 스포츠를 통한 우정의 시작! 🏋️‍♂️ <br/>
          함께 운동하며 건강을 챙기고, 스포츠의 즐거움을 공유하세요.<br/><br/><br/>


          🍲 운동 후엔 맛있는 음식과 함께하는 시간! 🍲 <br/>
          SMASH는 운동 끝에 펼쳐지는 다양한 맛집 탐방도 함께합니다. 먹으면서 즐겁게 소통하세요!<br/><br/><br/>


          🤝 새로운 친구들과 친해지는 특별한 순간! 🤝 <br/>
          SMASH는 모두가 함께 즐기며 성장할 수 있는 공간입니다. 새로운 인연과 친목을 쌓아가세요.<br/><br/><br/>


          지금 바로 함께해, SMASH의 멋진 사람들과 최고의 스포츠와 만남을 경험하세요!<br/>
          #SMASH #배드민턴 #스포츠 #친목 #2030 #함께뛰자 */}
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
                <div className='moimDetail-moimContent-home-schedule-content-img'>{i+1}<br/>임시 이미지</div>
                <div className='moimDetail-moimContent-home-schedule-content-info'>
                  {data.endDate === '' ?
                    <div className='moimDetail-moimContent-home-schedule-content-info-data'>
                      <span>일시</span><p>{data.startDate} {data.startDay} {data.startTime} ~ {data.endTime}</p>
                    </div>
                  :
                    <div className='moimDetail-moimContent-home-schedule-content-info-data'>
                      <span>일시</span><p>{data.startDate} {data.startDay} {data.startTime} ~ {data.endDate} {data.endDay} {data.endTime}</p>
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
      
      <div className='moimDetail-moimContent-home-memberBox'>
        <div className="moimDetail-moimContent-home-header">
          <h6>모임멤버</h6>
          {/* 😡임시😡 ↓ 모임장만 보이게 해야함 */}
          <FontAwesomeIcon icon={faEllipsisVertical} size="lg"/>
          {/* <div>더보기</div> */}
        </div>
        <div className='moimDetail-moimContent-home-member-contentBox'>
          {
            imsiMemberData.slice(0, 4).map((data, i) => (
              <div className='moimDetail-moimContent-home-member-content' key={i}>
                <div className='moimDetail-moimContent-home-member-content-img'>
                  {data.memberRole === 'leader' && <img className='moimDetail-moimLeaderIcon' src={leaderIcon} alt=''/>}
                  {data.memberRole === 'manager' && <img className='moimDetail-moimManagerIcon' src={managerIcon} alt=''/>}
                  <img className='moimDetail-moimMember-img' src={face} alt=''/>
                </div>
                <div className='moimDetail-moimContent-home-member-content-text'>
                  <div>{data.nickname}</div>
                  <span>{data.profileText}</span>
                </div>
              </div>
            ))
          }
          {/* 멤버가 4명 이상인 경우 멤버 더 보기 버튼 활성화 (hover 시 tooltip버튼 활성화) */}
          {imsiMemberData.length > 4 && (
            <OverlayTrigger placement="top" overlay={<Tooltip>멤버 더 보기</Tooltip>}>
              <div className='moimDetail-moimContent-home-member-content2' onClick={() => setIsMoreMember(true)}>
                <div>+</div>
              </div>
            </OverlayTrigger>
          )}
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

        <Modal.Body>
          <div className='moimDetail-moimContent-home-member-content-modalBox'>
          {
            imsiMemberData.map((data,i)=>(
              <div className='moimDetail-moimContent-home-member-content-modal' key={i}>
                  <div className='moimDetail-moimContent-home-member-content-img-modal'>
                    {data.memberRole === 'leader' && <img className='moimDetail-moimLeaderIcon' src={leaderIcon} alt=''/>}
                    {data.memberRole === 'manager' && <img className='moimDetail-moimManagerIcon' src={managerIcon} alt=''/>}
                    <img className='moimDetail-moimMember-img' src={face} alt=''/>
                  </div>
                  <div className='moimDetail-moimContent-home-member-content-text'>
                    <div>{data.nickname}</div>
                    <span>{data.profileText}</span>
                  </div>
                  
                  {
                    data.memberRole!== 'leader' &&
                    <div className='moimDetail-moimContent-home-member-modal-setting'>
                      {/* <button>{data.memberRole==='manager'? '★ 매니저 해제' : '★ 매니저 지정'}</button> */}
                      <Button className={`moimDetail-moimContent-home-member-modal-settingBtn 
                              ${data.memberRole==='manager' && 'member-modal-managerBtn'}`}
                              size='sm'>{data.memberRole==='manager'? '★ 매니저 해제' : '★ 매니저 지정'}</Button>
                      <Button size='sm'variant="outline-secondary" onClick={()=>memberKickOutHandler(data.nickname)}>모임퇴장</Button>
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