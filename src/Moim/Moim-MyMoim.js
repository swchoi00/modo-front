import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import './Moim-MyMoim.css'; // 사용자 정의 스타일시트 임포트
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'; 
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'; 
import { faHeart as fullHeart} from '@fortawesome/free-solid-svg-icons'; // 실선으로 된 하트 아이콘
import { faHeart as lineHeart} from '@fortawesome/free-regular-svg-icons'; // 비어있는 하트 아이콘
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';


const MoimMyMoim = ({isAuth, myMoim, userInfo,setUserInfo}) => {
  

  const [likedMoims, setLikedMoims] = useState([]);
  const navigate = useNavigate();
  const chunkSize = 4; // 마이 모임 한 페이지 개수 기준
  const chunks = [];  // 마이 모임 페이지별 저장

  // 항목을 4개씩 묶음으로 나누기
  for (let i = 0; i < myMoim.length; i += chunkSize) {
    chunks.push(myMoim.slice(i, i + chunkSize));
  }




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
};

  return (
    <div className="myMoim-container">
      <div className='myMoim-carouselBox'>
        <Carousel className='myMoim-carousel'
           interval={null} // 자동 넘어가기 방지
           indicators={(myMoim?.length > 4 ? true: false)} // 내 모임이 4개 이하면 하단에 있는 페이지 표시 ● 안보임
          //  hideControls={true} // control 버튼 숨기기
           prevIcon={// 이전 버튼 아이콘 변경
                      myMoim?.length > 4 &&
                      <span className="custom-prev-icon"> 
                        <FontAwesomeIcon icon={faAngleLeft}  size='2x'/>
                      </span> 
                    } 
           nextIcon={// 다음 버튼 아이콘 변경
                      myMoim?.length > 4 &&
                      <span className="custom-next-icon">
                        <FontAwesomeIcon icon={faAngleRight}  size='2x'/>
                      </span>
                    } 
        >
          
          {chunks.map((chunk, index) => (
            <Carousel.Item key={index}>
              <div className="myMoim-carousel-listBox">
                {chunk.map((moim, idx) => {
                  const isLiked = likedMoims.includes(moim.id); 
                  return(
                    <div key={idx} className="itembox" style={{cursor: 'pointer'}} onClick={()=>navigate(`/moim/${moim.id}/home`)}>
                      <div className='imgBox'>
                        <div className='img'
                          style={{backgroundImage: `url(https://raw.githubusercontent.com/Jella-o312/modo-image/main/moim-img/moim${idx}.png)`}}
                        />
                        <div className='categoryBox'>
                          <span className='category'>{moim.category}</span>
                          <span className='moim-content-box-like' onClick={(e) => handleMoimLikeBtn(moim.id, e)}>
                            <FontAwesomeIcon icon={isLiked ? fullHeart : lineHeart}  size='lg' style={{ color: isLiked ? '#ff2727' : 'white' }}/>
                          </span>
                        </div>
                      </div>
                      <div className='infoBox'>
                        <div className='title'>{moim.moimname}</div>
                        <div className='cate'>{moim.category}</div>
                        <div className='info'>{moim.city}·{moim.town} ┃ {moim.members?.length}명</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default MoimMyMoim;