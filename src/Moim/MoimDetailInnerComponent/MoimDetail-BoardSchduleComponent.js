import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import './MoimDetail-BoardSheduleComponent.css';
import './Calendar.css';
import moment from 'moment';
import 'moment/locale/ko';  // 요일 한글로 구하려면 필요
// import { Form, Modal } from "react-bootstrap";
// import ReactDatePicker from "react-datepicker";
// import { ko } from 'date-fns/locale'; // datePicker (일정추가 input) 한글패치
// import './react-datepicker.css';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
// import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import sorryIcon from '../../Img/sorryIcon.svg';
import MoimDetailBoardSheduleModal from "./MoimDetail-BoardSchedule-Modal";
import axiosInstance from "../../axiosInstance";
import { useNavigate } from "react-router-dom";


const MoimDetailBoardSchduleComponent = ({moimInfo, moimMemberRole, isAuth, userInfo})=>{

  const [date, setDate] = useState(new Date());
  const [moimScheduleList, setMoimScheduleList] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  moment.locale('ko');
  const dateFormat = "M월 D일 (ddd)";
  const [addScheduleModal, setAddScheduleModal] = useState(false); // 일정 추가 버튼 눌렀을때 모달 작동시키는 스테이트
  const [oneDaymoimSchedule, setOneDaymoimSchedule] = useState();  // 달력에서 선택한 날짜 일정 목록 저장 스테이트 
  const navigate = useNavigate();

  // 모임 스케쥴 리스트 가져옴
  useEffect(()=>{
    let id = moimInfo.id;
    axiosInstance.get(`/getMoimSchedule/${id}/list`)
    .then((response)=>{
      setMoimScheduleList(response.data);
      updateMarkedDates(response.data);
      console.log(response.data);
    }).catch((error)=>{
      console.log(error);
    });
  },[moimInfo.id, addScheduleModal]);

  
  // 모임일정이 있는 날짜 찾아서 일정 몇개인지 카운트 
  const updateMarkedDates = (scheduleList) => {
    const newMarkedDates = {};

    scheduleList.forEach((schedule) => {
      const startDate = new Date(schedule.scheduleStartDate);
      const dateString = startDate.toDateString();

      if (newMarkedDates[dateString]) {
        newMarkedDates[dateString]++;
      } else {
        newMarkedDates[dateString] = 1;
      }
    });
    setMarkedDates(newMarkedDates);
  };
  

  // 달력에 모임일정 개수에 따라 마크 표시
  const tileContent = ({ date, view }) => {
    const dateString = date.toDateString();
    const markCount = markedDates[dateString] || 0;
    if (view === 'month' && markCount > 0) {
      return (
        <span role="img" aria-label="star" style={{ fontSize: 'xx-small' }}>
          {markCount === 1 ? '🟣' : '🟣🟡'}
        </span>
      );
    }
  };




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



  // 달력에 찍은 날짜에 해당하는 스케쥴 가져오는 작업
  useEffect(() => {
    const filteredSchedules = moimScheduleList?.filter((schedule) => {
      const scheduleStartDate = new Date(schedule.scheduleStartDate);
      return (
        scheduleStartDate.toDateString() === date.toDateString()
      );
    });
    setOneDaymoimSchedule(filteredSchedules);
  }, [date, moimScheduleList]);

 

  // 모임 스케쥴 상세 페이지 이동 핸들러
  const moimScheduleDetailHandler = (scheduleNo)=>{
    navigate(`/moim/${moimInfo.id}/schedule/${scheduleNo}`);
  }


console.log(moimMemberRole);



  return(
    <div className="moimDetail-calendar-container">
    <div className="moimDetail-calendarBox">
      <Calendar onChange={setDate} 
                value={date} 
                formatDay={(locale, date) => moment(date).format("D")}
                tileContent={tileContent}
      />

    </div>

    {/* 달력 옆 모임 일정 박스 */}
    <div className="moimDetail-calendar-scheduleBox">
      {
       oneDaymoimSchedule?.slice(0, 2).map((data, i) => (
          <div className="moimDetail-calendar-schedule" key={i}>
            <div className="moimDetail-calendar-schedule-header">
              {/* 클릭한 날짜 (추후에 오늘을 기본으로 바꿔야할듯, 혹은 날짜를 클릭해주세요나)*/}
              <span>{moment(date).format("M월 D일 (ddd)", 'ko')}</span> 
              {/* <div>{moimScheduleDday(date) === 0 ? 'Today' : `D-${moimScheduleDday(date)}`}</div> */}
              <div>
                {moimScheduleDday(date) === 0 ? 'Today' :
                moimScheduleDday(date) < 0 ? `D+${Math.abs(moimScheduleDday(date))}` : 
                `D-${moimScheduleDday(date)}`}
              </div>
            </div>

            <div className={`moimDetail-calendar-schedule-body ${moimScheduleDday(date) < 0 ? 'moimDetail-calendar-schedule-past' : ''}`}
                onClick={()=>moimScheduleDetailHandler(data.scheduleNo)}
            >
              <div className="moimDetail-calendar-schedule-body-title">
                <span style={{color: i === 0 ? '#9087d3' : 'sandybrown', marginRight: '0.5rem', lineHeight: '2rem'}}>●</span>
                <div>{data.scheduleName}</div>
              </div>
              <div className="moimDetail-calendar-schedule-body-contentBox">
                {data.scheduleEndDate === null ? // 일정이 하루인지 물어봄
                  <div className='moimDetail-moimContent-board-schedule-content-data'>
                    <span>일시</span><div>{moment(data.scheduleStartDate).format(dateFormat, 'ko')} &nbsp;{data.scheduleStartTime} ~ {data.scheduleEndTime}</div>
                  </div>
                :
                  <div className='moimDetail-moimContent-board-schedule-content-data'>
                    <span>일시</span><div>{moment(data.scheduleStartDate).format(dateFormat, 'ko')} ~ {moment(data.scheduleEndDate).format(dateFormat, 'ko')} &nbsp;{data.scheduleStartTime} ~ {data.scheduleEndTime}</div>
                    {/* <span>일시</span><div>{data.startDate} {data.startDay} {data.startTime} ~ {data.endDate} {data.endDay} {data.endTime}</div> */}
                  </div>
                }
                  <div className="moimDetail-moimContent-board-schedule-content-data">
                    <span>위치</span><div>{data.scheduleAddress}</div>
                  </div>
                  <div className="moimDetail-moimContent-board-schedule-content-data">
                    <span>비용</span><div>{data.scheduleCost}</div>
                  </div>
              </div>
              <div className='moimDetail-moimContent-board-schedule-content-member'><span>{data.scheduleMaxMember -1}</span> / {data.scheduleMaxMember}명</div> 
            </div>
          </div>
        ))
      }


      {oneDaymoimSchedule?.length === 0 && ( // 일정이 없을때
        <div className="moimDetail-calendar-noSchedule">
          <img src={sorryIcon} alt=""/>
          <div>
            <span>{moment(date).format(dateFormat, 'ko')}</span>은 일정이 없어요
          </div>
        </div>
      )}


      {oneDaymoimSchedule?.length < 2 && moimMemberRole === 'leader' && // 해당 날짜에 일정이 두개이상일때는 일정 추가버튼이 안보임
        <div className="moimDetail-calendar-scheduleAdd" onClick={()=>setAddScheduleModal(true)}>
          <span>+</span>모임 일정 추가하기
        </div>
      }
      
                    
    </div>
    

    {/* 모임 일정 추가하는 모달 */}
    <MoimDetailBoardSheduleModal 
      addScheduleModal={addScheduleModal} 
      setAddScheduleModal={setAddScheduleModal} 
      Ckdate={date} 
      moment={moment}
      moimInfo={moimInfo}
      markedDates = {markedDates}
    />


    
 </div>
  )
}

export default MoimDetailBoardSchduleComponent;