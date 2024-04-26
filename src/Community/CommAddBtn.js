import { useNavigate } from 'react-router-dom';
import './CommAddBtn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronUp} from '@fortawesome/free-solid-svg-icons'; 
import { useEffect, useState } from 'react';
import LoginPzModal from '../Login/LoginPzModalComponent/LoginPzModal';

const CommAddBtn = ({ isAuth }) =>{

  const navigate = useNavigate();

  const [showLoginModal, setShowLoginModal] = useState(false); // 로그인 안했을때 모달창 띄움
  const [ScrollVisible, setScrollVisible] = useState(false);
  
  const ScrollHandler = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

 useEffect(() => {
  const handleScroll = () => {
    const scrollPosition = window.scrollY;

    // 스크롤 위치에 따라 값 조절
    const scrollThreshold = 500;

    setScrollVisible(scrollPosition > scrollThreshold);
  };

  // 컴포넌트가 마운트될 때 이벤트 리스너 추가
  window.addEventListener('scroll', handleScroll);

  // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);


// 로그인 여부에 따라 + 버튼 눌렀을때 이동하는 페이지가 다르게 하는 핸들러
  const handleAddBtnClick = () => {
    if (isAuth) {
      // 인증된 경우 페이지 이동
      navigate('/addComm');
    } else {
      // 비인증된 경우 알림 표시 및 로그인 페이지로 이동
      setShowLoginModal(true);
    }
  };


  return(
    <div className='CommAddBtn'>
      {ScrollVisible && (
        <div className='ScrollBtn-Btn' onClick={ScrollHandler}>
          <FontAwesomeIcon icon={faChevronUp}  size='2x' style={{color:'#6a60a9' }}/>
        </div>
      )}

      <div className='AddBtn-BtnBox' onClick={handleAddBtnClick}>
        <div className='AddBtn-Btn'>
          <FontAwesomeIcon icon={faPlus} size='2x' style={{ color: 'white' }} />
        </div>
      </div>

      <LoginPzModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal}/>
    </div>
  );
}

export default CommAddBtn;