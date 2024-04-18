import { useNavigate } from 'react-router-dom';
import './MoimAddBtn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronUp} from '@fortawesome/free-solid-svg-icons'; 
import { useEffect, useState } from 'react';
import LoginPzModal from '../../Login/LoginPzModalComponent/LoginPzModal';

const MoimAddBtn = ({isAuth}) =>{

  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false); // 로그인 안했을때 모달창 띄움
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


// 로그인 여부에 따라 + 버튼 눌렀을때 이동하는 페이지가 다르게 하는 핸들러
  const handleMoimAddBtnClick = () => {
    if (isAuth) {
      // 인증된 경우 페이지 이동
      navigate('/addMoim');
    } else {
      setShowLoginModal(true);
    }
  };


  return(
    <div className='MoimBtn-container'>
      {/* ⭐⭐모임 리스트 스크롤 버튼 */}
      {moimScrollVisible && (
        <div className='MoimScrollBtn-Btn' onClick={MoimScrollHandler}>
          <FontAwesomeIcon icon={faChevronUp}  size='2x' style={{color:'#6a60a9' }}/>
        </div>
      )}

      {/* ⭐⭐모임 추가 버튼 */}
      <div className='MoimAddBtn-BtnBox' onClick={handleMoimAddBtnClick}>
        <div className='MoimAddBtn-Btn'>
          <FontAwesomeIcon icon={faPlus} size='2x' style={{ color: 'white' }} />
        </div>
      </div>

      <LoginPzModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal}/>
    </div>
  );
}

export default MoimAddBtn;