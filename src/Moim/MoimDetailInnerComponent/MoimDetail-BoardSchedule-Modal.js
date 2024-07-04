import './MoimDetail-BoardSchedule-Modal.css';
import {useEffect, useRef, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { ko } from 'date-fns/locale'; // datePicker (일정추가 input) 한글패치
import './react-datepicker.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Form, Modal } from 'react-bootstrap';
import axiosInstance from '../../axiosInstance';

//⭐일정 추가/수정 모달
const MoimDetailBoardSheduleModal = ({addScheduleModal,setAddScheduleModal, Ckdate, moment, moimInfo,markedDates, upDateScheduleInfo})=>{
  
// 일정 시작시간 넣는 임시 스테이트
const [scheduleTime, setScheduleTime] = useState({hour:'', minute:''});
// 일정 종료 시간 넣는 임시 스테이트
const [endscheduleTime, setEndScheduleTime] = useState({hour:'', minute:''});

// 일정추가 모달이 닫힐 때 기존 입력 값 초기화
const endScheduleModal = () => {
  setAddScheduleModal(false); // 모임 모달 props
  setScheduleTerm(false); // 모임 기간 여부
  setScheduleTime({hour: '', minute: ''});  // 시작시간
  setEndScheduleTime({hour: '', minute: ''}); // 종료시간
  setTimePickerIsOpen(false); // 시작시간 오픈여부
  setEndTimePickerIsOpen(false);  //종료시간 오픈여부
  setAddScheduleInfo( // 모임일정 담는 스테이트 비우기
    {
    scheduleNo: '',
    scheduleName: '',
    scheduleStartDate: '',
    scheduleEndDate: '',
    scheduleStartTime: '',
    scheduleEndTime: '',
    scheduleAddress: '',
    scheduleCost: '',
    scheduleMaxMember: '',
    scheduleDescription: ''
  });
};


// 모임 일정 정보 담는 스테이트
// 시간은 나중에 한번에 합쳐서 저장해야할듯
const [addScheduleInfo, setAddScheduleInfo] = useState({
  scheduleNo: '',
  scheduleName: '',
  scheduleStartDate : '',
  scheduleEndDate : '',  
  scheduleStartTime : '',
  scheduleEndTime : '',
  scheduleAddress : '',
  scheduleCost: '',
  scheduleMaxMember: '',
  scheduleDescription:''
});

useEffect(()=>{
if(upDateScheduleInfo){ // 일정 수정인 경우
  setAddScheduleInfo({
    scheduleNo: upDateScheduleInfo.scheduleNo,
    scheduleName: upDateScheduleInfo.scheduleName,
    scheduleStartDate : upDateScheduleInfo.scheduleStartDate,
    scheduleEndDate : upDateScheduleInfo.scheduleEndDate,  
    scheduleStartTime : upDateScheduleInfo.scheduleStartTime,
    scheduleEndTime : upDateScheduleInfo.scheduleEndTime,
    scheduleAddress : upDateScheduleInfo.scheduleAddress,
    scheduleCost: upDateScheduleInfo.scheduleCost,
    scheduleMaxMember: upDateScheduleInfo.scheduleMaxMember,
    scheduleDescription: upDateScheduleInfo.scheduleDescription
  });
  if(upDateScheduleInfo.scheduleEndDate !== null){
    setScheduleTerm(true);
  }
  const [startHour, starMinute] = upDateScheduleInfo.scheduleStartTime.split(':');
  const [endHour, endMinute] = upDateScheduleInfo.scheduleEndTime.split(':');
  setScheduleTime({hour: startHour, minute: starMinute});
  setEndScheduleTime({hour: endHour, minute: endMinute});
}
},[upDateScheduleInfo]); // 일정 수정일 때만 작동됨 (일정 수정 정보가 있을 때만)






// 일정추가_제목, 모임위치, 참여비용, 참여인원, 일정 설명
const AddMoimScheduleHandler = (e)=>{
  let title = e.target.dataset.field;
  let value = e.target.value;
  setAddScheduleInfo((data)=>({...data, [title] : value}));
}


// 모임일정이 하루인지 하루이상인지 여부
const [scheduleTerm, setScheduleTerm] = useState(false);

// 부트스트랩 스위치 커스텀 시 focus 막기 위해 추가
const scheduleSwitch= useRef(); 

// 부트스트랩 스위치 커스텀 시 focus 막기 위해 추가
const scheduleSwitchHandler= (e) => {
  setScheduleTerm(e.target.checked); // true/false로 스위치가 켜진지 설정
  scheduleSwitch.current.blur(); // focus 해제 (스위치가 변경될때마다, css에서 따로 설정 불가능...)
  setAddScheduleInfo((data)=>({...data, scheduleEndDate: ''}));
};
// //console.log(addScheduleInfo);

// 일정 추가 모달이 켜지고 꺼질때마다 
// 사용자가 모임디테일페이지에서 날짜를 바꾸면 해당날짜로 일정 시작 날을 바꿔줌
useEffect(() => {
  // 처음에 사용자가 선택한 날짜로 값을 보여주기 위해
  setAddScheduleInfo((data) => ({
    ...data, scheduleStartDate: Ckdate
  }));
}, [addScheduleModal, Ckdate]);






// 일정 시간 모달창 보이기 여부
const [timePickerIsOpen, setTimePickerIsOpen] = useState(false);  // 시작시간
const [endTimePickerIsOpen, setEndTimePickerIsOpen] = useState(false); // 종료시간

// 일정 시간 입력값 띄우는 버튼(입력도 버튼 눌러야함)
const timePickerHandler = (type) => {
  if(type==='start'){
    setTimePickerIsOpen(!timePickerIsOpen);
    if(endTimePickerIsOpen){  // 다른 타임피커가 켜져있으면 끄기
      setEndTimePickerIsOpen(false);
    }
  }else{
    setEndTimePickerIsOpen(!endTimePickerIsOpen);
    if(timePickerIsOpen){
      setTimePickerIsOpen(false);
    }
  }
};


const startDateCheckHandler = (date)=>{
  const dateString = new Date(date).toDateString();
  const countOnDate = markedDates[dateString] || 0; // 선택한 날짜에 일정이 몇개 있는지 확인 일정 없으면 0으로 리턴됨
  if (countOnDate >= 2) {
    alert("해당 날짜에 더 이상 일정을 추가 할 수 없어요 ");
    setAddScheduleInfo((data)=>({...data, scheduleStartDate: null}));
  }else{
    setAddScheduleInfo((data)=>({...data, scheduleStartDate: date}));
  }
}






// 타임피커 시간 , 분 데이터
const scheduleTimeDB ={
    hourDB:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
    minuteDB: ['00', '15', '30', '45']
};

//타임피커 내부 버튼(취소, 확인) 핸들러
const moimAddTimePickerBtn=(btn, timeType)=>{
  if(scheduleTime.minute === '' || scheduleTime.hour === ''){
      setScheduleTime({hour:'', minute:''}); // 시: 분 중에 하나라도 입력 안하면 그냥 빈값으로 다시 세팅
  }
  
  if(endscheduleTime.minute === '' || endscheduleTime.hour === ''){
      setEndScheduleTime({hour:'', minute:''});
  }

  if(btn==='no'){
    if(timeType==='start'){
      setTimePickerIsOpen(false);
      setScheduleTime({hour: '', minute: ''});
    }else{
      setEndTimePickerIsOpen(false);
      setEndScheduleTime({hour: '', minute: ''});
    }
  }else{ // 확인 눌렀을 때 setScheduleTime({ ...scheduleTime, minute: minute })
    if(timeType==='start'){
      setTimePickerIsOpen(false);
    }else{
      setEndTimePickerIsOpen(false);
    }
  }
}

// 타임피커 글씨 색깔 차이를 위한 핸들러
const timePickerColorHandler = scheduleTime.hour !== '' || scheduleTime.minute !== '';
const endTimePickerColorHandler = endscheduleTime.hour !== '' || endscheduleTime.minute !== '';


// 시작시간, 종료시간의 시간과 분이 다 입력되어 있어야 true로 바뀌는 정규식
const [scheduleTimeRegex, setScheduleTimeRegex] =useState(false);


// 시작시간, 종료시간값이 바뀔때마다 일정추가 데이터에 있는값 업데이트
useEffect(() => {
  // ↓ 아래 의존성 배열에 addScheduleInfo를 넣으면 무한 루프오류가 발생해서 함수형 업데이트로 바꿈...
  setAddScheduleInfo((prevData) => ({ 
    ...prevData,
    scheduleStartTime: `${scheduleTime.hour}:${scheduleTime.minute}`, //minute값 중에 00이 있어서 문자열로 처리
    scheduleEndTime: `${endscheduleTime.hour}:${endscheduleTime.minute}`,
  }));

  // 시, 분이 다 입력되있는 상태여야 시간정규식 값을 true로 바꿈
  if (
    scheduleTime.hour !== '' &&
    scheduleTime.minute !== '' &&
    endscheduleTime.hour !== '' &&
    endscheduleTime.minute !== ''
  ) {
    setScheduleTimeRegex(true);
  } else {
    setScheduleTimeRegex(false);
  }
}, [scheduleTime, endscheduleTime]); //← 얘가 의존성 배열





// scheduleDescription를 제외한 필수 일정값이 모두 입력되었을때 true로 바뀌는 정규식 코드
// Object.entries는 key, value를 반환하는 메서드
// every(([key, value]) => 함수는 배열의 모든 요소가 특정 조건을 만족하는지 확인
// every 함수 내의 조건 key === 'scheduleDescription' || value !== '' 
// ↑[설명] key 'scheduleDescription'와 scheduleEndDate 일치하거나 value가 빈 문자열('')이 아닌 경우를 확인
// key값이 scheduleDescription, scheduleEndDate가 아닌 것들의 value가 ''값이면 flase가 됨
// const addScheduleSubmitCheck = Object.entries(addScheduleInfo).every(([key, value]) => key === 'scheduleDescription' || value !== '');
// const addScheduleSubmitCheck = Object.values(addScheduleInfo).every(value => value !== '' 
//                                 || value === addScheduleInfo.scheduleEndDate // 모임종료 날짜 설명 빈 값 허용
//                                 || value === addScheduleInfo.scheduleDescription); // 모임일정 설명 빈 값 허용

const addScheduleSubmitCheck = Object.entries(addScheduleInfo).every(([key, value]) => 
  key === 'scheduleEndDate' || key === 'scheduleDescription' || key === 'scheduleNo' || value !== '');


const addMoimscheduleSubmitHandler= ()=>{
  if(addScheduleInfo.scheduleMaxMember < 1){
    alert("참여 인원을 다시 입력해주세요 :)");
    document.querySelector('.moimDetail-calendar-scheduleAdd-info-input.moimDetail-scheduleAdd-inputNum').focus();
    return;
  }
  const id = moimInfo.id;
  axiosInstance.post(`/createMoimSchedule/${id}`, addScheduleInfo)
      .then((response) => {
        alert(response.data);
        endScheduleModal();// 모달 종료 핸들러
      })
      .catch((error) => {
        console.log(error);
      });
}

// //console.log(addScheduleInfo);
// //console.log(moimInfo.Id);
// //console.log(addScheduleSubmitCheck);
// //console.log(upDateScheduleInfo);

  return(
    <>
      {/* 모임 일정 추가 모달 */}
    <Modal
        show={addScheduleModal}
        // size="lg"
        onHide={endScheduleModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* style={{border:'none'}} */}
        <Modal.Header closeButton > 
          {/* 수정해야함 */}
          <Modal.Title id="example-modal-sizes-title-lg">
            <div style={{width:'87%', position: 'absolute', top: '0', paddingTop: '0.5rem', display: 'flex', justifyContent:'space-between', alignItems: 'center'}}>
              {upDateScheduleInfo ? '모임 일정 수정' : '모임 일정 추가' } 
              {
                addScheduleInfo.scheduleStartDate &&
                <span style={{color: '#a472ff', fontSize:'medium'}}>
                  {moment(addScheduleInfo.scheduleStartDate).format("M월 D일 (ddd)", 'ko')}
                </span> 
              }
            </div>
          </Modal.Title>
        </Modal.Header>
 
        <Modal.Body style={{padding: '0'}}>
          <div className="moimDetail-calendar-scheduleAdd-infoBox" style={{height: '40rem'}}>
            <div className="moimDetail-calendar-scheduleAdd-info">
              <span className='scheduleAdd-top-title'>일정 제목</span>
              <input className='moimDetail-calendar-scheduleAdd-info-input' 
                     placeholder="일정 제목을 입력해주세요" 
                     data-field= 'scheduleName' 
                     onChange={AddMoimScheduleHandler}
                     value={addScheduleInfo.scheduleName}
              />
            </div>

            <div className="moimDetail-calendar-scheduleAdd-info2">
              <div className="moimDetail-calendar-scheduleAdd-info-inner" style={{display:'flex', alignItems:'center'}}>
                <span className='scheduleAdd-top-title'>일정 날짜</span>
                <Form.Check type="switch" ref={scheduleSwitch} onChange={scheduleSwitchHandler}
                            label="*하루 이상의 일정이면 눌러주세요" //*기간일 경우 눌러주세요
                />
              </div>
              <div className="moimDetail-calendar-scheduleAdd-info-inner-datePickerBox">
                <div className="customDatePickerWidth">
                  <ReactDatePicker
                    locale={ko}
                    selected={addScheduleInfo.scheduleStartDate} // MoimDetailBoardComponent에서 받아온 사용자가 선택한 날짜를 기본값으로 
                    // onChange={(date) => setAddScheduleInfo((data)=>({...data, scheduleStartDate: date}))}
                    onChange={(date)=>startDateCheckHandler(date)}
                    dateFormat="yyyy.MM.dd(eee)" // 선택된 날짜 보여주는 형식
                    minDate={new Date()} // 오늘 이전 날짜 선택 못하게
                    placeholderText="📅일정 날짜"
                    renderCustomHeader={({ date, prevMonthButtonDisabled, nextMonthButtonDisabled, decreaseMonth, increaseMonth }) => (
                      <div className='datePicker-headerBox'>
                        <div className="datePicker-header-month-prev" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                          <FontAwesomeIcon icon={faAngleLeft}/>
                        </div>
                        <div className="datePicker-header-month-day">
                          {date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}
                        </div>
                        <div className="datePicker-header-month-next" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                          <FontAwesomeIcon icon={faAngleRight}/>
                        </div>
                      </div>
                    )}
                  />
                </div>
                {
                  scheduleTerm &&
                  <span className="moimSechdule-last-termText">~</span>
                }
                {
                  scheduleTerm &&
                  // 일정이 하루 이상인 경우 보임
                  <div className="customDatePickerWidth">
                    <ReactDatePicker
                      locale={ko}
                      selected={addScheduleInfo.scheduleEndDate} // MoimDetailBoardComponent에서 받아온 사용자가 선택한 날짜를 기본값으로 
                      onChange={(date) => setAddScheduleInfo((data)=>({...data, scheduleEndDate: date}))}
                      // onChange={(date) => {
                      //   const formattedDate = date.toISOString().slice(0, 10); // yyyy-MM-dd 형식으로 변환
                      //   setAddScheduleInfo((data) => ({ ...data, scheduleEndDate: formattedDate }));
                      // }}
                      dateFormat="yyyy.MM.dd(eee)" // 선택된 날짜 보여주는 형식
                      minDate={new Date()} // 오늘 이전 날짜 선택 못하게
                      // isClearable // 지우기 버튼
                      placeholderText="종료 날짜"
                      renderCustomHeader={({ date, prevMonthButtonDisabled, nextMonthButtonDisabled, decreaseMonth, increaseMonth }) => (
                        <div className='datePicker-headerBox'>
                          <div className="datePicker-header-month-prev" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                            <FontAwesomeIcon icon={faAngleLeft}/>
                          </div>
                          <div className="datePicker-header-month-day">
                            {date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}
                          </div>
                          <div className="datePicker-header-month-next" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                            <FontAwesomeIcon icon={faAngleRight}/>
                          </div>
                        </div>
                      )}
                    />
                  </div>
                }
              </div>

            </div>

            <div className="moimDetail-calendar-scheduleAdd-info">
              <div className="moimDetail-calendar-scheduleAdd-info-inner" style={{display:'flex',alignItems:'center'}}>
                <span className='scheduleAdd-top-title'>일정 시간</span>
                <span className='moimDetail-calendar-scheduleAdd-infoText'>*24시간 기준 </span>
              </div>
              <div className='moimDetail-calendar-schedule-timeContainer'>
                <div className="moimDetail-calendar-schedule-timeBox" style={{display:'flex'}} >
                <button className={`moimDetail-calendar-schedule-title ${timePickerIsOpen && 'moimDetail-calendar-schedule-title-focus'} 
                                    ${timePickerColorHandler && 'timePicker-colored'}`} 
                        // data-field= 'scheduleStartTime' 
                        onClick={()=>timePickerHandler('start')} 
                >
                          {(scheduleTime.hour || scheduleTime.minute) ? `${scheduleTime.hour}  :  ${scheduleTime.minute}` : '시작 시간'}
                </button>
                  {timePickerIsOpen && (
                    <div className="moimDetail-calendar-schedule-timeBox-menu">
                      <div className='moimDetail-calendar-schedule-timeBox-menu-inner'>
                        <div className="moimDetail-calendar-schedule-timeBox-item timeBox-hour-scroll">
                          <ul className="moimDetail-calendar-schedule-timeBox-item-time">
                            {
                              scheduleTimeDB.hourDB.map((hour, i)=>(
                                <li key={i} 
                                    className={scheduleTime.hour === hour ? 'schedule-time-select' : ''}
                                    onClick={() => setScheduleTime({ ...scheduleTime, hour: hour })} 
                                    // onClick={() => setScheduleTime(prevState => ({ ...prevState, hour }))}
                                >{hour} 시</li>
                              ))
                            }
                          </ul>
                        </div>
                        <div className="moimDetail-calendar-schedule-timeBox-item">
                          <ul className="moimDetail-calendar-schedule-timeBox-item-time">
                            {
                              scheduleTimeDB.minuteDB.map((minute, i)=>(
                                <li key={i} 
                                    className={scheduleTime.minute === minute ? 'schedule-time-select' : ''}
                                    onClick={() => setScheduleTime({ ...scheduleTime, minute: minute })} 
                                >{minute} 분</li>
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                      <div className='moimDetail-calendar-schedule-timeBox-bottom' >
                        <button className='moimDetail-calendar-schedule-timeBox-bottomBtn-no'
                                onClick={()=>moimAddTimePickerBtn('no', 'start')}
                        >취소</button>
                        <button className='moimDetail-calendar-schedule-timeBox-bottomBtn-yes'
                                onClick={()=>moimAddTimePickerBtn('yes', 'start')}
                        >확인</button>
                      </div>
                    </div>
                  )}
                </div>

                <span className="moimSechdule-last-termText">~</span>

                <div className="moimDetail-calendar-schedule-timeBox" style={{display:'flex'}} >
                <button className={`moimDetail-calendar-schedule-title ${endTimePickerIsOpen && 'moimDetail-calendar-schedule-title-focus'}
                                    ${endTimePickerColorHandler && 'timePicker-colored'}`} 
                        onClick={()=>timePickerHandler('end')} 
                >
                        {(endscheduleTime.hour || endscheduleTime.minute) ? `${endscheduleTime.hour}  :  ${endscheduleTime.minute}` : '종료 시간'}
                </button>
                  {endTimePickerIsOpen && (
                    <div className="moimDetail-calendar-schedule-timeBox-menu">
                    <div className='moimDetail-calendar-schedule-timeBox-menu-inner'>
                      <div className="moimDetail-calendar-schedule-timeBox-item timeBox-hour-scroll">
                        <ul className="moimDetail-calendar-schedule-timeBox-item-time">
                          {
                            scheduleTimeDB.hourDB.map((hour, i)=>(
                              <li key={i} 
                                  className={endscheduleTime.hour === hour ? 'schedule-time-select' : ''}
                                  onClick={() => setEndScheduleTime({ ...endscheduleTime, hour: hour })} 
                              >{hour} 시</li>
                            ))
                          }
                        </ul>
                      </div>
                        <div className="moimDetail-calendar-schedule-timeBox-item">
                          <ul className="moimDetail-calendar-schedule-timeBox-item-time">
                          {
                            scheduleTimeDB.minuteDB.map((minute, i)=>(
                              <li key={i} 
                              // onClick={() => setEndScheduleTime(prevState => ({ ...prevState, minute }))}
                                  className={endscheduleTime.minute === minute ? 'schedule-time-select' : ''}
                                  onClick={() => setEndScheduleTime({ ...endscheduleTime, minute: minute })} 
                              >{minute} 분</li>
                            ))
                          }
                        </ul>
                        </div>
                      </div>
                      <div className='moimDetail-calendar-schedule-timeBox-bottom' >
                        <button className='moimDetail-calendar-schedule-timeBox-bottomBtn-no'
                                onClick={()=>moimAddTimePickerBtn('no', 'end')}
                        >취소</button>
                        <button className='moimDetail-calendar-schedule-timeBox-bottomBtn-yes'
                                onClick={()=>moimAddTimePickerBtn('yes', 'end')}
                        >확인</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>


            <div className="moimDetail-calendar-scheduleAdd-info">
              <span className='scheduleAdd-top-title'>모임 위치</span>
              <input className='moimDetail-calendar-scheduleAdd-info-input' 
                     placeholder='모임 장소에 대해 적어주세요' 
                     data-field= 'scheduleAddress' 
                     onChange={AddMoimScheduleHandler}
                     value={addScheduleInfo.scheduleAddress}
              />
            </div>


            <div className="moimDetail-calendar-scheduleAdd-info3">
              <div className="moimDetail-calendar-scheduleAdd-info">
                <span className='scheduleAdd-top-title'>참여 비용</span>
                <input className='moimDetail-calendar-scheduleAdd-info-input' 
                       placeholder='ex)3,000원, 카페비용 등' 
                       data-field= 'scheduleCost' 
                       onChange={AddMoimScheduleHandler}
                       value={addScheduleInfo.scheduleCost}
                />
              </div>
              <div className="moimDetail-calendar-scheduleAdd-info">
                <div className="moimDetail-calendar-scheduleAdd-info-inner" style={{display:'flex', alignItems:'center'}}>
                  <span className='scheduleAdd-top-title'>참여 인원</span>
                  <span className='moimDetail-calendar-scheduleAdd-infoText'>*숫자만 입력</span>
                </div>
                <input className='moimDetail-calendar-scheduleAdd-info-input moimDetail-scheduleAdd-inputNum' 
                       placeholder='최대 참여 인원을 적어주세요' 
                       type='number'
                       value={addScheduleInfo.scheduleMaxMember}
                       data-field= 'scheduleMaxMember' 
                       onChange={AddMoimScheduleHandler}
                       onKeyDown={(e) => ["e", "E", "+", "-","."].includes(e.key) && e.preventDefault()} // +-입력 방지
                      //  참고 : https://velog.io/@support/styled-components-Input-%EC%88%AB%EC%9E%90-%EC%9E%85%EB%A0%A5-jbskjgya
                />
              </div>
            </div>

            <div className="moimDetail-calendar-scheduleAdd-info">
              <span className='scheduleAdd-top-title'>일정 설명</span>
              <textarea placeholder='모임원들이 알아야할 사항들을 적어주세요'
                        data-field= 'scheduleDescription' 
                        onChange={AddMoimScheduleHandler}
                        value={addScheduleInfo.scheduleDescription}
              />
            </div>



          <button className='moimDetail-calendar-scheduleAdd-submitBtn'
                  disabled={!(scheduleTimeRegex && addScheduleSubmitCheck)}
                  onClick={addMoimscheduleSubmitHandler}
          >
            {upDateScheduleInfo ? '일정 수정' : '일정 추가' } 
          </button>
          </div>
        </Modal.Body>
    </Modal>
    </>
  )

}

export default MoimDetailBoardSheduleModal;