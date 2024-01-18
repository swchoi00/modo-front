import { Link } from 'react-router-dom';
import './MoimAddBtn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronUp} from '@fortawesome/free-solid-svg-icons'; 
import { useEffect, useState } from 'react';

const MoimAddBtn = () =>{

  const [moimScrollVisible, setMoimScrollVisible] = useState(false);
  
  const MoimScrollHandler = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


 useEffect(() => {
  const handleScroll = () => {
    const scrollPosition = window.scrollY;

    // 스크롤 위치에 따라 값 조절
    const scrollThreshold = 500;

    setMoimScrollVisible(scrollPosition > scrollThreshold);
  };

  // 컴포넌트가 마운트될 때 이벤트 리스너 추가
  window.addEventListener('scroll', handleScroll);

  // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);




  return(
    <div className='MoimBtn-container'>
      {moimScrollVisible && (
        <div className='MoimScrollBtn-Btn' onClick={MoimScrollHandler}>
          <FontAwesomeIcon icon={faChevronUp}  size='2x' style={{color:'#6a60a9' }}/>
        </div>
      )}

      <Link className='MoimAddBtn-BtnBox' to={'/addMoim'}> 
        <div className='MoimAddBtn-Btn'>
          <FontAwesomeIcon icon={faPlus}  size='2x' style={{color:'white' }}/>
        </div>
      </Link>
    </div>
  );
}

export default MoimAddBtn;