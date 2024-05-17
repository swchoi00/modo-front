import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './MoimDetail.css';
import { faList} from '@fortawesome/free-solid-svg-icons';
// import { faArrowUpFromBracket as share} from '@fortawesome/free-solid-svg-icons';
import { faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
import { faHeart as fullHeart} from '@fortawesome/free-solid-svg-icons'; // 실선으로 된 하트 아이콘
import { faHeart as lineHeart} from '@fortawesome/free-regular-svg-icons'; // 비어있는 하트 아이콘
import { useEffect, useRef, useState } from 'react';
import face from '../HomeComponent/ReviewComponent/face.svg';
import { Carousel } from 'react-bootstrap';
import MoimDetailHome from './MoimDetailComponent/MoimDetail-Home';
import MoimDetailBoard from './MoimDetailComponent/MoimDetail-Board';
import MoimDetailGellery from './MoimDetailComponent/MoimDetail-Gallery';
import MoimDetailChat from './MoimDetailComponent/MoimDetail-Chat';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import LoginPzModal from '../Login/LoginPzModalComponent/LoginPzModal';
import MoimDetailMoimInfoModal from './MoimDetailComponent/MoimDetailInnerComponent/MoimDetail-MoimInfo-Modal';
import { is, tr } from 'date-fns/locale';

const MoimDetail = ({isAuth, userInfo, setUserInfo, moimInfo, setMoimInfo,currentPage, setCurrentPage, moimCommAfter,setMoimCommAfter})=>{


  // APP에서 지정한 url → /moim/detail/:id 변수이름을 'id'로 저장해야 url파라미터 값을 제대로 가져올 수 있음
  const {id} = useParams(); // URL 파라미터인 id 값을 가져옴 (반환되는 값이 객체형태여서 객체 형태인 {id로 받아줘야함})
  const moimId = Number(id);  // 파라미터로 받은 id를 숫자로 변경
  // const [moimCommAfter, setMoimCommAfter] = useState(false); // 모임 게시글 작성 후 페이지 이동을 위해 사용

  
  // 좋아요 상태 저장하는 스테이트
  const [likedMoims, setLikedMoims] = useState(false); // 초기값을 false로 설정
  // 로그인 유저와 모임장이 일치하는지 여부 (😡😡모임장, 매니저, 모임원 여부 있어야 할거 같은데😡😡)
  const [moimMemberRole, setMoimMemberRole] = useState(null);
  // 모임멤버 리스트
  const [moimMemberList,setMoimMemberList] = useState(null);
  // 모임 기본 정보 수정하는 모달 
  const [showMoimInfoSettingModal, setShowMoimInfoSettingModal] = useState(false);
  // 로그인 안했을때 모달창 
  const [showLoginModal, setShowLoginModal] = useState(false); 


  // 모임정보 받아오는 effect
  useEffect(()=>{
    axiosInstance.get(`/moimInfo/${id}`)
    .then((response) => {
      setMoimInfo(response.data); // 모임 정보 저장
    })
    .catch((error) => {
        console.log(error);
    });
  },[id,setMoimInfo,isAuth]);
  

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

 // 모임 가입 핸들러
 const joinMoimHandler =()=>{
  if(isAuth && userInfo){ //(로그인 유무, 유저 정보 확인)
    axiosInstance.post(`/joinMoim/${id}`, userInfo.id)
    .then((response)=>{
      setMoimMemberList(response.data); // userinfo 컴포넌트에 member 정보 업데이트
      window.alert("가입완료!");
    }).catch((error)=>{
      console.log(error);
    });
  }else{
    setShowLoginModal(true);
  }
}

  // 모임 좋아요 여부 세팅
useEffect(()=>{
  if(isAuth){
    if (userInfo && userInfo.likedMoim) { //userInfo.likedMoim는 새로고침됐을때 로그인 풀리면서 생기는 오류 방지로 추가됨
     setLikedMoims(userInfo.likedMoim.includes(moimId));
   } else {
     setLikedMoims(false); // 비어있는 배열로 초기화
   }
  }else{
    setLikedMoims(false); // 비어있는 배열로 초기화
  }
},[userInfo,isAuth, moimId]);


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
  }
},[isAuth, userInfo, moimMemberList]);


// console.log(moimMemberRole);


  //  ⭐모임 좋아요 버튼 핸들러
  const handleMoimLikeBtn = () => {
    // 좋아요 기능은 로그인 되어있는 상태만 작동됨
    if(isAuth){
      // 서버에서 받아둔 좋아요 모임좋아요 여부가 true면 해당 번호를 제거하고, false면 좋아요 리스트에 추가
      const upDateLikedMoims = likedMoims ? userInfo.likedMoim.filter(data => data !==moimId) : [...userInfo.likedMoim, moimId];
      // 해당 좋아요 모임 리스트를 userInfo에 업데이트
      const member = { ...userInfo, likedMoim: upDateLikedMoims };
      axiosInstance.post('/upDateLikedMoim',member)
      .then((response)=>{
        setUserInfo(response.data); // userinfo 컴포넌트에 member 정보 업데이트
      }).catch((error)=>{
        console.log(error);
      });
      
    }else{ // 로그인되어있지 않은 경우 로그인 안내 모달 띄우는 스테이트 값 변경(해당 컴포넌트는 재활용 가능)
      setShowLoginModal(true);
    }
  };



  // 😡임시_캐러셀 이미지 추후 링크 통해서 대체해야함😡
  const banner = [1, 2, 3, 4, 5];
  const [activeIndex, setActiveIndex] = useState(0);  // 부트스트랩 캐러셀 select된 번호 저장하는 스테이트
  const handleBanner = (selectedIndex) => { // onSelect될때마다 바뀐 selectIndex를 위에 스테이트에 저장해줌
    setActiveIndex(selectedIndex);
  };

  const moimDetailMenu = ['홈', '게시판', '갤러리', '채팅'];
  const [moimMenuCk, setMoimMenuCk] = useState('홈');
  const moimMenuCkHandler = (e) =>{
    setMoimMenuCk(e.target.textContent); // value로 뽑으니까 값이 안나와서 textContent로 변경
  }

  // 상세 페이지 메뉴 바꼈을때마다 화면 최상단으로 바꾸기
  useEffect(() => {
    if (!moimCommAfter && window.innerWidth <= 875) {
      window.scroll(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [moimMenuCk]); // moimCommAfter를 의존성 배열에 포함하면 위치 이동이 안됨....
  

  // 😡임시 모임디테일 페이지 내에서 게시판, 갤러리, 채팅등으로 이동 시 새로고침했을때 페이지 유지를 위함
  useEffect(() => {
    // 컴포넌트가 마운트될 때 로컬 스토리지에서 값을 가져옴
    const savedMenuCk = localStorage.getItem('moimMenuCk');
    if (savedMenuCk) {
      setMoimMenuCk(savedMenuCk);
    }
  }, []);

  useEffect(() => {
    // 컴포넌트가 언마운트될 때 현재 메뉴 상태를 로컬 스토리지에 저장
    localStorage.setItem('moimMenuCk', moimMenuCk);
    return () => {
      // 언마운트 시에는 클린업 함수에서 저장된 값 삭제
      localStorage.removeItem('moimMenuCk');
    };
  }, [moimMenuCk]);


 

  // 모임 게시글 작성 후 페이지 이동을 위해 생성
  useEffect(()=>{
    if(moimCommAfter){
      setMoimMenuCk('게시판');
    }
  },[moimCommAfter,setMoimMenuCk]);


  // 모임기본 메뉴
  const leaderMoimSettingMenu = ['모임 정보 수정', '모임 링크 복사', '모임 삭제'];
  const memberMoimSettingMenu = ['모임 링크 복사','모임 탈퇴'];
  const settingMenuRef = useRef(null); //  settingMenu 요소를 참조

  
  // 모임기본 메뉴 아이콘 눌렀는지 여부
  const [moimSettingIcon, setMoimSettingIcon] = useState(false);
  useEffect(()=>{ //로그인 풀리면 닫으려고 추가
    if(!isAuth){setMoimSettingIcon(false);}
  },[isAuth]);

  // settingMenu 외의 영역을 클릭할 때 settingMenu를 닫기
  const handleOutsideClick = (e) => {
    if (!settingMenuRef.current || !settingMenuRef.current.contains(e.target)) {
      setMoimSettingIcon(false);
    }
  };

  const MoimSettingMenuHandler = (e)=>{ 
    let menu =e.target.textContent;
    switch(menu){
      case "모임 정보 수정": setShowMoimInfoSettingModal(true);
      case "모임 링크 복사": 
        navigator.clipboard.writeText(window.location.href)
          .then(() => {
            alert("링크가 클립보드에 복사되었습니다."); 
          })
          .catch(err => {
            console.error("링크 복사에 실패하였습니다.", err); 
          });
      break;
      case "모임 삭제" : 
        const deleteMoim = window.confirm("정말 모임을 삭제하시겠습니까?");
        // if(deleteMoim){
        //   여기에 모임 삭제 서버 요청하기
        // }
      break;
      case "모임 탈퇴" : 
        const quitMoim = window.confirm("정말 모임을 탈퇴하시겠습니까?");
        if(quitMoim){
          const moimMemberId = moimMemberList?.find(memberInfo => memberInfo.member.id === userInfo.id).id;
          axiosInstance.delete(`/quitMoim/${moimMemberId}`)
          .then((response)=>{
            alert(response.data);
            setMoimMemberList(prevList => prevList.filter(member => member.id !== moimMemberId)); // moimMemberList안에 있는 id값과 일치하는거 제거
            // window.location.reload(); // 페이지 새로고침 (그래야 탈퇴반영됨)
          }).catch((error)=>{
            console.log(error);
          });
        }
      break;
    }
  }

  console.log(moimMemberList);
  return(
    <div className='MoimDetail-container' onClick={handleOutsideClick}>

      <div className='moimDetail-headerBox'>
        <div className='moimDetail-header-beforeBtn'>{/* 목록 */}
          <FontAwesomeIcon icon={faList} size='lg'style={{color: '#6a60a9'}}/>
        </div>
        <div className='moimDetail-header-category'>{moimInfo.category}</div>
        <div className='moimDetail-header-title'>{moimInfo.moimname}</div>
      </div>

      <div className='moimDetail-moimMenu-box-moblie'>
        {
          moimDetailMenu.map((data, i)=>(
            <div className={`moimDetail-moimMenu ${moimMenuCk === data ? 'moimDetail-moimMenu-ck': ''}`} 
                 onClick={moimMenuCkHandler} key={i}>
            {data}</div>
          ))
        }
      </div>

      
      <div className={`moimDetail-moimInfoBox ${moimMenuCk !== '홈' ? 'moimDetail-moimMenu-notShow' : ''}`}>
        <div className='moimDetail-moimInfo-imageBox'>
          <Carousel className='moimDetail-moimInfo-carousel' activeIndex={activeIndex} onSelect={handleBanner} interval={null}>
          {
            banner.map((num, i)=>(
              <Carousel.Item key={i} className='moimDetail-moimInfo-carousel-item'>{/*😡추후에 클릭했을때 모달 띄워서 확대해서 볼 수 있게 해야하나😡*/}
                {/* <div>{num}</div>😡임시😡 */}
                <div className='moimDetail-thumbnail-img'
                  style={{
                    backgroundImage: `url(https://raw.githubusercontent.com/Jella-o312/modo-image/main/moim-img/moim${num}.png)`, // ⭐보안 정책 때문에 컴퓨터 내부에 있는 파일로 테스트 불가
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                  }}
                />
              </Carousel.Item>
            ))
          }
          </Carousel>
          <div className='moimDetail-moimInfo-image-num'><span></span>{activeIndex+1} / {banner.length}</div>
        </div>
        
        <div className='moimDetail-moimInfo-textBox'>          
          <div className='moimDetail-moimInfo-text1-box'>
            <div className='moimDetail-moimInfo-text1-title'>{moimInfo.moimname}</div>
            <div className='moimDetail-moimInfo-text1-like' onClick={handleMoimLikeBtn}>
              <FontAwesomeIcon icon={likedMoims ? fullHeart : lineHeart}  size='lg' style={{ color: likedMoims ? '#ff2727' : 'gray' }}/>
            </div>
            {moimMemberRole !== 'notMember' &&
              <div className='moimDetail-moimInfo-text1-RightBtn'
                  onClick={(e)=>{e.stopPropagation(); setMoimSettingIcon(!moimSettingIcon);}}             
              >
                <FontAwesomeIcon 
                  icon={faEllipsisVertical} 
                  size="lg" 
                />
                  
                  { 
                    moimSettingIcon &&
                    <div className='moimDetail-moimInfo-text1-RightBtn-icon' ref={settingMenuRef}>
                      {
                        (moimMemberRole === 'leader' ? leaderMoimSettingMenu : memberMoimSettingMenu).map((menu) => (
                          <li onClick={MoimSettingMenuHandler} 
                              style={{color: `${menu==='모임 삭제' || menu ==='모임 탈퇴' ? 'red' : ''}`}} 
                              key={menu}
                          >{menu}</li>
                        ))
                      }
                    </div>
                  }
              </div>
            }
          </div>
          <div className='moimDetail-moimInfo-text2-shortinfo'>{moimInfo.introduction}</div>
          <div className='moimDetail-moimInfo-text3-box'>
            <div className='moimDetail-moimInfo-text3-leaderImgBox'>
              <img src={face} alt=''/>
              {/* 추후 프로필 사진 저장되어 있는 url div로 연결하기
              backgroundImage: `url(https://raw.githubusercontent.com/Jella-o312/modo-image/main/moim-img/${data.id}.png)` */}
            </div>
            <div className='moimDetail-moimInfo-text3-leaderName'> 모임장 <span>{moimInfo?.leader?.nickname}</span></div>
          </div>
          <div className='moimDetail-moimInfo-text4-Box'>
            <div className='moimDetail-moimInfo-text4-location'>{moimInfo.city}·{moimInfo.town}</div>
            <div className='moimDetail-moimInfo-text4-member'>{moimMemberList?.length} 명</div>
          </div>
          <div className='moimDetail-moimInfo-text5-Box'>
           {
            moimInfo.hashtag?.map((tag, i) => (
              <div key={i} className='moimDetail-moimInfo-text5-hashtag'># {tag}</div>
            ))
            }
          </div>
          <div className='moimDetail-moimInfo-text3-box2'> {/* 모바일용 방장프로필 */}
            <div className='moimDetail-moimInfo-text3-leaderImgBox'>
              <img src={face} alt=''/>
              {/* 추후 프로필 사진 저장되어 있는 url div로 연결하기
              backgroundImage: `url(https://raw.githubusercontent.com/Jella-o312/modo-image/main/moim-img/${data.id}.png)` */}
            </div>
            <div className='moimDetail-moimInfo-text3-leaderName'> 모임장 <span>{moimInfo.leadername}</span></div>
          </div>
          { !moimMemberList?.some(data => data.member.id === userInfo.id) ? // moimMemberList안에 있는 member 객체 안에 있는id와 유저 id가 있는지 확인
            <div className='moimDetail-moimInfo-joinBtn-Box'>
              <div className='moimDetail-moimInfo-joinBtn' onClick={joinMoimHandler} style={{cursor:'pointer'}}>가입하기</div>
            </div>
            :
            <div className='moimDetail-moimInfo-block' style={{height: '4rem'}}/>
          }
        </div>
      </div>

      <div className='moimDetail-moimMenu-box'>
        {
          moimDetailMenu.map((data, i)=>(
            <div className={`moimDetail-moimMenu ${moimMenuCk === data ? 'moimDetail-moimMenu-ck': ''}`} 
                 onClick={moimMenuCkHandler} key={i}>
            {data}</div>
          ))
        }
      </div>

      <div className='moimDetail-moimContentBox'>
        {moimMenuCk === '홈' &&  <MoimDetailHome moimInfo={moimInfo} setMoimInfo={setMoimInfo} moimMemberRole={moimMemberRole} 
                                                 moimMemberList={moimMemberList} setMoimMemberList={setMoimMemberList}/>}
        {moimMenuCk === '게시판' &&  <MoimDetailBoard moimInfo={moimInfo} currentPage={currentPage} setCurrentPage={setCurrentPage} 
                                                      moimCommAfter={moimCommAfter} setMoimCommAfter={setMoimCommAfter}/>}
        {moimMenuCk === '갤러리' &&  <MoimDetailGellery/>}
        {moimMenuCk === '채팅' &&  <MoimDetailChat/>}
      </div>
      
      <LoginPzModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal}/>
      <MoimDetailMoimInfoModal 
        showMoimInfoSettingModal = {showMoimInfoSettingModal}
        setShowMoimInfoSettingModal ={setShowMoimInfoSettingModal}
        moimInfo={moimInfo}
        setMoimInfo={setMoimInfo}
      />
      
    </div>
  )
}

export default MoimDetail;