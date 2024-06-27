import './MyPage-detail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MyPageDetailAccount from './MyPage-Component/MyPage-detail-account';
import MyPageDetailActivity from './MyPage-Component/MyPage-detail-activity';
import MyPageDetailSchedule from './MyPage-Component/MyPage-detail-schedule';
import sorryIcon from '../Img/sorryIcon.svg';

const MyPageDetail = ({userInfo, setUserInfo, myPageDetail,setMyPageDetail, isAuth, currentPage, setCurrentPage})=>{
  // **myPageDetail이건 상세 페이지 (내 활동 : 내 모임, 관심모임, 모임 글, 커뮤니티 글/ 내 모임 일정 : 참여 중 모임, 지난 모임 구분용)
  // myPageDetail에 값이 없으면 마이페이지로 들어온거임
  const navigate = useNavigate();

  useEffect(()=>{
    if (myPageDetail.title !== '') {
      sessionStorage.setItem('myPage', JSON.stringify(myPageDetail));
    }else{
      const storedMyPage = sessionStorage.getItem('myPage');
      if (storedMyPage) {
        setMyPageDetail(JSON.parse(storedMyPage));
      }else{
        navigate('/myPage');
      }
    }
  },[myPageDetail]);


  return(
    <>
    {
      isAuth ?
      <div id="MyPageDetail">
        <div className='myPageHeaderBox'>
          <FontAwesomeIcon icon={faArrowLeft} size='lg'style={{cursor: 'pointer'}} onClick={()=>navigate('/myPage')}/>
          <h4 style={{margin: '0'}}>{myPageDetail?.title}</h4>
        </div>
        
        <div className='myPageBodyBox'>
          {
            myPageDetail?.title === '계정설정' ? <MyPageDetailAccount userInfo={userInfo} setUserInfo={setUserInfo} pageType={myPageDetail.type}/>
            :
            myPageDetail?.title === '내 활동' ? <MyPageDetailActivity userInfo={userInfo} setMyPageDetail={setMyPageDetail}pageType={myPageDetail.type} isAuth={isAuth} setUserInfo={setUserInfo} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            :
            myPageDetail?.title === '내 모임 일정' ? <MyPageDetailSchedule userInfo={userInfo} setMyPageDetail={setMyPageDetail}pageType={myPageDetail.type}/>
            :
            null
          }
        </div>
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

export default MyPageDetail;