import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './MoimDetail.css';
import { faList} from '@fortawesome/free-solid-svg-icons';
import { faHeart as fullHeart} from '@fortawesome/free-regular-svg-icons';
import { faHeart as lineHeart} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import face from '../HomeComponent/ReviewComponent/face.svg';
import { Carousel } from 'react-bootstrap';
import MoimDetailHome from './MoimDetailComponent/MoimDetail-Home';
import MoimDetailBoard from './MoimDetailComponent/MoimDetail-Board';
import MoimDetailGellery from './MoimDetailComponent/MoimDetail-Gallery';
import MoimDetailChat from './MoimDetailComponent/MoimDetail-Chat';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const MoimDetail = ()=>{

  // APP에서 지정한 url → /moim/detail/:id 변수이름을 'id'로 저장해야 url파라미터 값을 제대로 가져올 수 있음
  const {id} = useParams(); // URL 파라미터인 id 값을 가져옴 (반환되는 값이 객체형태여서 객체 형태인 {id로 받아줘야함})

console.log(id);

  // 모임정보 저장하는 스테이트
  const [moimInfo,setMoimInfo] = useState({});

  // 모임정보 받아오는 effect
  // 나중에 모임일정, 게시판, 모임 멤버 등도 받아와야함
  useEffect(()=>{
    axiosInstance.get(`/moimInfo/${id}`)
    .then((response) => {
      setMoimInfo(response.data);
    })
    .catch((error) => {
        console.log(error);
    });
  },[])


  // 😡임시😡
  const [isLiked, setIsLiked] = useState(false);
  const moimLikeHandler = () =>{
    setIsLiked(!isLiked);
  }
  const hashtagList = ["운동맛집", "인천 정모", "배드민턴"];

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


  console.log(moimMenuCk);

  return(
    <div className='MoimDetail-container'>

      <div className='moimDetail-headerBox'>
        <div className='moimDetail-header-beforeBtn'>{/* 목록 */}
          <FontAwesomeIcon icon={faList} size='lg'style={{color: '#6a60a9'}}/>
        </div>
        <div className='moimDetail-header-category'>{moimInfo.category}</div>
        <div className='moimDetail-header-title'>{moimInfo.moimname}</div>
      </div>

      <div className='moimDetail-moimInfoBox'>
        <div className='moimDetail-moimInfo-imageBox'>
          <Carousel className='moimDetail-moimInfo-carousel' activeIndex={activeIndex} onSelect={handleBanner} interval={null}>
          {
            banner.map((num, i)=>(
              <Carousel.Item key={i} className='moimDetail-moimInfo-carousel-item'>{/*😡추후에 클릭했을때 모달 띄워서 확대해서 볼 수 있게 해야하나😡*/}
                <div>{num}</div>{/*😡임시😡*/}
              </Carousel.Item>
            ))
          }
          </Carousel>
          <div className='moimDetail-moimInfo-image-num'><span></span>{activeIndex+1} / {banner.length}</div>
        </div>
        
        <div className='moimDetail-moimInfo-textBox'>          
          <div className='moimDetail-moimInfo-text1-box'>
            <div className='moimDetail-moimInfo-text1-title'>{moimInfo.moimname}</div>
            <div className='moimDetail-moimInfo-text1-like' onClick={moimLikeHandler}> {/* 😡임시😡 */}
              <FontAwesomeIcon icon={isLiked ? fullHeart : lineHeart}  size='lg' style={{ color: isLiked ? 'gray' : '#ff2727' }}/>
            </div>
            <div className='moimDetail-moimInfo-text1-share'>s</div>
          </div>
          <div className='moimDetail-moimInfo-text2-shortinfo'>{moimInfo.introduction}</div>
          <div className='moimDetail-moimInfo-text3-box'>
            <div className='moimDetail-moimInfo-text3-leaderImgBox'>
              <img src={face} alt=''/>
              {/* 추후 프로필 사진 저장되어 있는 url div로 연결하기
              backgroundImage: `url(https://raw.githubusercontent.com/Jella-o312/modo-image/main/moim-img/${data.id}.png)` */}
            </div>
            {/* ↓ 이거 어떻게 해야하나.....닉네임으로 떠야하는디 */}
            <div className='moimDetail-moimInfo-text3-leaderName'> 모임장 <span>{moimInfo.leadername}</span></div>
          </div>
          <div className='moimDetail-moimInfo-text4-Box'>
            <div className='moimDetail-moimInfo-text4-location'>{moimInfo.city}·{moimInfo.town}</div>
            <div className='moimDetail-moimInfo-text4-member'>34 명</div>
          </div>
          <div className='moimDetail-moimInfo-text5-Box'>
           {
            hashtagList.map((tag, i) => (
              <div key={i} className='moimDetail-moimInfo-text5-hashtag'># {tag}</div>
            ))
            }
          </div>
          {/* 😡여기에 가입여부 가리는거 필요😡 */}
          <div className='moimDetail-moimInfo-joinBtn'>가입하기</div>
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
        {moimMenuCk === '홈' &&  <MoimDetailHome moimInfo={moimInfo}/>}
        {moimMenuCk === '게시판' &&  <MoimDetailBoard/>}
        {moimMenuCk === '갤러리' &&  <MoimDetailGellery/>}
        {moimMenuCk === '채팅' &&  <MoimDetailChat/>}
      </div>
      
    </div>
  )
}

export default MoimDetail;