import './MoimList.css';
import { moimContent } from './moim-content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fullHeart} from '@fortawesome/free-regular-svg-icons';
import { faHeart as lineHeart} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const MoimList = () =>{

  const navigate = useNavigate();
  const [likedMoims, setLikedMoims] = useState([]); // 각 모임의 좋아요 상태를 관리하는 배열


  //⭐ 추후 서버에 좋아요 여부 연동되게 해야함
  const handleLikeToggle = (moimId,e) => {
    e.stopPropagation(); // 하트 클릭 이벤트의 상위 이벤트 전파 방지

    // 모임 ID를 통해 해당 모임의 좋아요 상태를 토글
    setLikedMoims((prevLikedMoims) => {
      if (prevLikedMoims.includes(moimId)) {
        // 이미 좋아요한 경우 제거
        return prevLikedMoims.filter((id) => id !== moimId);
      } else {
        // 좋아요하지 않은 경우 추가
        return [...prevLikedMoims, moimId];
      }
    });
  };

  return(
    <div className='moim-list-box'>
      {
        moimContent.map((data) => {
          const isLiked = likedMoims.includes(data.id);
          return (
            <div className='moim-content-box' key={data.id} onClick={()=>navigate('/moimDetail')}>
              <div className='moim-content-box-img'
                style={{
                  backgroundImage: `url(https://raw.githubusercontent.com/Jella-o312/modo-image/main/moim-img/${data.id}.png)`
                  , opacity: '0.85'
                }}>
                <div className='moim-content-box-categoryBack'>
                <span className='moim-content-box-categoty'>{data.category}</span>
                <span className='moim-content-box-like' onClick={(e) => handleLikeToggle(data.id,e)}>
                  <FontAwesomeIcon icon={isLiked ? fullHeart : lineHeart}  size='lg' style={{ color: isLiked ? 'white' : '#ff2727' }}/>
                </span>
                </div>
              </div>

              <div className='moim-content-box-info'>
                <div className='moim-contnent-box-title'>{data.title}</div>
                <span>{data.promotion}</span>
                <div className='moim-content-box-info-member'>{data.area} ┃ {data.member} 명</div>
              </div>
            </div>
          );
        })
      }
      
    </div>
  );
}

export default MoimList;


