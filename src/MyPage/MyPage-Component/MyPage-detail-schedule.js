import { useEffect, useState } from 'react';
import './MyPage-detail-schedule.css';
import axiosInstance from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ko';
import imsiImg from '../../Img/깡총강쥐.png';

const MyPageDetailSchedule = ({ userInfo, setMyPageDetail, pageType }) => {
  const navigate = useNavigate();
  const pageTypeList = ['참여 중 모임 일정', '지난 모임 일정'];
  const [pageTypeNow, setPageTypeNow] = useState(pageType);
  const [myJoinedSchedules, setMyJoinedSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const dateFormat = "M월 D일 (ddd)";
  

  useEffect(() => {
    let id = userInfo.id;
    axiosInstance.get(`/joinScheduleList/${id}`)
      .then((response) => {
        let allSchedules = response.data;

        axiosInstance.get(`/getUserIdMoimMemberList/${id}`)
          .then((response) => {
            let memberIds = response.data;
            let filteredSchedules = allSchedules.filter(schedule => schedule.joinedMember.some(memberId => memberIds.includes(memberId)));            
            // 날짜별로 정렬
            filteredSchedules.sort((a, b) => new Date(a.scheduleStartDate) - new Date(b.scheduleStartDate));
            setMyJoinedSchedules(filteredSchedules);
          }).catch((error) => {console.log(error);});
      }).catch((error) => {alert(error);});
  }, [userInfo]);

  useEffect(() => {
    const today = moment().startOf('day');
    
    if (pageTypeNow === "참여 중 모임 일정") {
      const upcomingSchedules = myJoinedSchedules.filter(schedule => 
        moment(schedule.scheduleStartDate).isSameOrAfter(today)
      );
      setFilteredSchedules(upcomingSchedules);
    } else {
      const pastSchedules = myJoinedSchedules.filter(schedule => 
        moment(schedule.scheduleStartDate).isBefore(today)
      );
      setFilteredSchedules(pastSchedules);
    }
  }, [pageTypeNow, myJoinedSchedules]);


  
  // 날짜별로 그룹화하는 함수
  const groupByDate = (schedules) => {
    const groups = {};
    schedules.forEach(schedule => {
      const date = moment(schedule.scheduleStartDate).format(dateFormat);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(schedule);
    });
    return groups;
  };

  const groupedSchedules = groupByDate(filteredSchedules);

  //Dday 계산
  const moimScheduleDday = (date) => {
    let today = moment().startOf('day'); // 오늘 날짜
    let selectedDate = moment(date).startOf('day'); // 선택한 날짜
    let remainingDays = selectedDate.diff(today, 'days'); // 오늘 날짜와 선택한 날짜의 차이를 계산하여 반환
    let dday = remainingDays === 0 ? 'Today' : remainingDays < 0 ? `D+${Math.abs(remainingDays)}` : `D-${remainingDays}`; // D-day 계산 값
    return dday;
  };


  return (
    <div id="myPageSchedule">
      <div className='categoryBox'>
        {pageTypeList.map((data, i) => (
          <span key={i} id={data} className={pageTypeNow === data ? 'check' : ''}
            onClick={() => { setPageTypeNow(data); setMyPageDetail({ 'title': '내 모임 일정', 'type': data }); }}
          >{data}</span>
        ))}
      </div>

      <div className='scheduleBox'>
        {Object.entries(groupedSchedules).map(([date, schedules, index]) => ( // date =  날짜 , schdule 일정리스트
          <div className="oneDayScheduleBox" key={index}>
            <div className='scheduleDate'>{date}<span>{moimScheduleDday(schedules[0].scheduleStartDate)}</span></div>
            <div className='oneDaySchedule'>
            {schedules.map((data) => (
              <div className="scheduleBody" key={data.scheduleNo}>
                <div className='mobliescheduleName'>{data.scheduleName}</div>
                <div className='moblieBody'>
                  <div className="schedulePhoto" style={{ backgroundImage: `url(${imsiImg})` }} />
                  <div className="scheduleContent">
                    <div className='scheduleName'>{data.scheduleName}</div>
                    {data?.scheduleEndDate === undefined ? 
                      <div className='moimDetail-moimContent-board-schedule-content-data'>
                        <span>일시</span><div>{moment(data.scheduleStartDate).format(dateFormat, 'ko')} &nbsp;{data.scheduleStartTime} ~ {data.scheduleEndTime}</div>
                      </div>
                      :
                      <div className='moimDetail-moimContent-board-schedule-content-data'>
                        <span>일시</span><div>{moment(data.scheduleStartDate).format(dateFormat, 'ko')} ~ {moment(data.scheduleEndDate).format(dateFormat, 'ko')} &nbsp;{data.scheduleStartTime} ~ {data.scheduleEndTime}</div>
                      </div>
                    }
                    <div className="moimDetail-moimContent-board-schedule-content-data">
                      <span>위치</span><div>{data.scheduleAddress}</div>
                    </div>
                    <div className="moimDetail-moimContent-board-schedule-content-data">
                      <span>비용</span><div>{data.scheduleCost}</div>
                    </div>
                  </div>
                  <div className='scheduleMember'><span>{data.joinedMember?.length || 0}</span> / {data.scheduleMaxMember}명</div>
                </div>
              </div>
            ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyPageDetailSchedule;