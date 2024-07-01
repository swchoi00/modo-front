import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import './MyPage.css';
import sorryIcon from '../Img/sorryIcon.svg';
import { is } from "date-fns/locale";

function MyPage({ isAuth, userInfo, setIsAuth, setUserInfo, setInquiryList, setMyPageDetail }) {
  const navigate = useNavigate();
  const [activityData, setActivityData] = useState({'moim': 0, 'likemoim': userInfo?.likedMoim?.length || 0, 'moimComm': 0, 'comm' : 0});


  
  // 내 활동에 들어가는 값 가져오기
  useEffect (()=>{
    if(isAuth){
      // 모임 리스트 받아서 내 모임 찾기
      axiosInstance.get("/moimList")
      .then((response) => {
        let myMoim = (response.data.filter(moim =>moim.members.some(data => data.member.id === userInfo.id)));
        setActivityData(activityData =>({...activityData, 'moim' : myMoim.length})); // 내 모임 수 업데이트
      })
      .catch((error) => {
          console.log(error);
      });
  
      // 내가 쓴 모임게시글 가져오기 
      axiosInstance.get(`/myMoimCommList/${userInfo.id}`)
      .then((response) => {
        let myMoimComm = response.data;
        setActivityData(activityData =>({...activityData, 'moimComm' : myMoimComm.length}));
      })
      .catch((error) => {
          console.log(error);
      });
  
      // 내가 쓴 게시글 가져오기 (userInfo.id 로 하는게 아니라 닉네임으로 구분)
      axiosInstance.get("/comm_getList")
        .then((response) => {
          let myComm = response.data.filter(comm => comm.author === userInfo.nickname);
          setActivityData(activityData =>({...activityData, 'comm' : myComm.length})); // 내 모임 수 업데이트
        }).catch((error) => {
          console.log(error);
      })
    }
  },[userInfo,isAuth]);





  // 내 활동, 내 모임 일정 관련 핸들러
  const detailPageHandler = (isTitle, isValue)=>{
    setMyPageDetail({'title' : isTitle, 'type' : isValue});
    navigate('/myPage/detail');
  }


  // 내 문의 관련 핸들러
  const inquiryHandler = (e)=>{
    let value = e.target.textContent;
    if(value === "1:1 문의하기"){
      navigate('/inquiry');
    }else{
      setInquiryList(true); // 이게 inquiry 컴포넌트에서 페이지 보여주는 핸들러
      navigate('/inquiry');
    }
  }

  //로그아웃 핸들러
  const logoutHandler = () => {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('userInfo');
    sessionStorage.removeItem('myPage');
    setUserInfo({
      username : '',
      nickname : ''
    });
    setIsAuth(false);
    navigate('/');
  }

    return (
      <>
      {
        isAuth ?
        <div className="myPage-Container">
          <h3>마이페이지</h3>

          {/* 유저정보 */}
          <div className="userInfoBox">
            <div className="userInfoLeft">
              <div className='userImg'
                  style={{
                    backgroundImage: `url(https://raw.githubusercontent.com/Jella-o312/modo-image/main/etc/face.svg)` 
                    // backgroundImage: `url(https://raw.githubusercontent.com/Jella-o312/modo-image/main/etc/userImgNone.svg)` 
                  }}
              />
              <div className="userNameBox">
                <div>{userInfo.nickname}</div>
                <span>{userInfo.username}</span>
              </div>
            </div>
            <div className="userSettingBtn" onClick={()=>detailPageHandler('계정설정','계정설정')}>계정설정</div>
          </div>

          <hr/>

          {/* 내 활동 */}
          <h5>내 활동</h5>
          <div className="userActivityBox">
            <div className="activity" onClick={()=>detailPageHandler('내 활동', '참여모임')}>
              <div>참여모임</div>
              <span>{activityData.moim}</span>
            </div>
            <div className="activity" onClick={()=>detailPageHandler('내 활동', '관심모임')}>
              <div>관심모임</div>
              <span>{activityData.likemoim}</span>
            </div>
            <div className="activity" onClick={()=>detailPageHandler('내 활동','모임 글')}>
              <div>모임 글</div>
              <span>{activityData.moimComm}</span>
            </div>
            <div className="activity" onClick={()=>detailPageHandler('내 활동','커뮤니티 글')}>
              <div>커뮤니티 글</div>
              <span style={{color: '#FFC000'}}>{activityData.comm}</span>
            </div>
          </div>
          
          <hr/>

          {/* 모임 일정 및 문의 */}
          <div className="moimSchedule-inquiryBox">
            <div className="moimScheduleBox">
              <h5>내 모임 일정</h5>
              <div className="scheduleList">
                <span onClick={()=>detailPageHandler('내 모임 일정', '참여 중 모임 일정')}>참여 중 모임 일정</span>
                <span onClick={()=>detailPageHandler('내 모임 일정', '지난 모임 일정')}>지난 모임 일정</span>
              </div>
            </div>

            <hr className="line"/>
            
            <div className="inquiryBox">
              <h5>내 문의</h5>
              <div className="inquiryList">
                <span onClick={inquiryHandler}>1:1 문의하기</span>
                <span onClick={inquiryHandler}>문의 내역 보기</span>
              </div>
            </div>
          </div>

          <div className="logoutBtn" onClick={logoutHandler}>로그아웃</div>


        </div>
        :
        <div className="loginNeedPage">
          <h5>로그인 후 이용해주세요</h5>
          <img src={sorryIcon} alt=""  style={{width: '8rem'}}/>
          <button onClick={()=>navigate('/login')}>로그인 하러가기</button>
        </div>
      }
      </>
    )
}

export default MyPage;