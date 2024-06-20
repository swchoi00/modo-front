import './MoimList.css';
// import { moimContent } from './moim-content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fullHeart} from '@fortawesome/free-solid-svg-icons'; // 실선으로 된 하트 아이콘
import { faHeart as lineHeart} from '@fortawesome/free-regular-svg-icons'; // 비어있는 하트 아이콘

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPzModal from '../Login/LoginPzModalComponent/LoginPzModal';
import axiosInstance from '../axiosInstance';


const MoimList = ({isAuth, moimList, userInfo,setUserInfo}) =>{

  const navigate = useNavigate();
  const [likedMoims, setLikedMoims] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false); // 로그인 안했을때 모달창 띄움



  // userInfo가 변경될 때마다 likedMoims의 초기값 설정
  useEffect(() => {
    if(isAuth){
      if (userInfo && userInfo.likedMoim) { //userInfo.likedMoim는 새로고침됐을때 로그인 풀리면서 생기는 오류 방지로 추가됨
        setLikedMoims(userInfo.likedMoim);
      } else {
        setLikedMoims([]); // 비어있는 배열로 초기화
      }
    }else{
      setLikedMoims([]); // 비어있는 배열로 초기화
    }
  }, [userInfo,isAuth]);



  const handleMoimLikeBtn = (moimId, e) => {
    e.stopPropagation(); // 하트 클릭 이벤트의 상위 이벤트 전파 방지

    // 좋아요 기능은 로그인 되어있는 상태만 작동됨
    if(isAuth){
      // ⭐서버에서 받아둔 좋아요 모임 리스트에 좋아요 누른 모임 번호가 있으면 삭제하고 없으면 추가
      const updatedLikedMoims = likedMoims.includes(moimId) ? likedMoims.filter(id => id !== moimId) : [...likedMoims, moimId];
      // ⭐ 해당 좋아요 모임 리스트를 userInfo에 업데이트
      const member = { ...userInfo, likedMoim: updatedLikedMoims };
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



  // ⭐[임시 이미지 생성용] 랜덤 숫자 생성 함수
  const getRandomImageNumber = () => {
    // Math.random()은 0 이상 1 미만의 랜덤한 숫자를 생성합니다.
    // 0~17까지의 숫자를 얻기 위해 18을 곱하고, Math.floor를 사용하여 소수점 이하를 버립니다.
    return Math.floor(Math.random() * 18);
  };


  return(
    <div className='moim-list-box'>
      
       {
        moimList.map((data) => {
          // ⭐ [좋아요 여부 확인] likedMoim 리스트에 해당 모임 id가 들어 있는지 확인
          const isLiked = likedMoims.includes(data.id); //🔥엔티티값이 다름 (member.likedMoim은 String, data.id는 숫자)🔥

           // ⭐각 항목마다 랜덤 숫자 생성
           const imageNumber = getRandomImageNumber();
          return (
            <div className='moim-content-box' key={data.id} onClick={()=>navigate(`/moim/${data.id}/home`)}>
              <div className='moim-content-box-img'
                style={{
                  backgroundImage: `url(https://raw.githubusercontent.com/Jella-o312/modo-image/main/moim-img/moim${imageNumber}.png)` 
                  // backgroundImage: `url(${data.moimPhoto.moimPhotoUrl})`
                  , opacity: '0.85'
                }}>
                <div className='moim-content-box-categoryBack'>
                <span className='moim-content-box-categoty'>{data.category}</span>
                <span className='moim-content-box-like' onClick={(e) => handleMoimLikeBtn(data.id, e)}>
                  <FontAwesomeIcon icon={isLiked ? fullHeart : lineHeart}  size='lg' style={{ color: isLiked ? '#ff2727' : 'white' }}/>
                </span>
                </div>
              </div>

              <div className='moim-content-box-info'>
                <div className='moim-contnent-box-title'>{data.moimname}</div>
                <span>{data.introduction}</span>
                <div className='moim-content-box-info-member'>{data.city}·{data.town} ┃ {data.moimMemberNum}명</div>
              </div>
            </div>
          );
        })
      }

      {/* ⭐로그인 안했을때  좋아요 누르면 뜨는 로그인 모달*/}
      <LoginPzModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal}/>
    </div>
  );
}

export default MoimList;






