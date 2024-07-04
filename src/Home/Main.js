import Banner from '../HomeComponent/Banner';
import ServiceCategories from '../HomeComponent/ServiceCategories';
import './Main.css';
import Review from '../HomeComponent/ReviewComponent/Review';
import motivation from '../Img/main_motivation.svg';
import moimBtn from '../Img/main_moimBtn.svg';
import mentoringBtn from '../Img/main_mentoringBtn.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; 
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoginPzModal from '../Login/LoginPzModalComponent/LoginPzModal';


const Main = ({isAuth, setCategoryCheck})=>{
  const navigate = useNavigate();
  const [showAlert,setShowAlert] = useState(false);
  const [showLoginModal,setShowLoginModal] = useState(false);

  const makeMoimHandler = ()=>{
    if(isAuth === true){
      navigate('/addMoim');
    }else{
      setShowLoginModal(true);
    }
  }

  return(
    <div className='main-container'>
      <div className="main-container-box">
        <Banner/>

        {/* <div className='main-mobile-searchBar'> 
          <input className='main-mobile-search-input' placeholder='관심사 검색하기'/> 
          <span><FontAwesomeIcon icon={faSearch} style={{color:'#d4b5f5'}} size='lg'/></span>
        </div> */}

        <ServiceCategories setCategoryCheck={setCategoryCheck}/>

        {/* 홍보 이미지 */}
        {/* <div className="ds"> */}
          <div className="main-service-key-point">
            <img className='main-motivation-img' src={motivation} alt=''/>
          </div>
        {/* </div> */}

        <Review/>

        <div className='main-registration-box' >
          <div className='main-registration-moin' onClick={makeMoimHandler}>
            <img className='main-registration-moinBtn' src={moimBtn} alt=''/>
          </div>
          <div className='main-registration-mentoring' onClick={()=>setShowAlert(true)}>
            <img className='main-registration-mentoringBtn' src={mentoringBtn} alt=''/>
          </div>
        </div>
      </div>

      <Modal
        show={showAlert}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className='LoginPzModal-Box'>
            <b>멘토링 서비스는 준비중이에요</b>
            <div className='LoginPzModal-Body'>
              <div className='LoginPzModal-BtnBox'>
                <button className='LoginPzModal-BtnStyle1' onClick={()=>setShowAlert(false)}>확인</button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <LoginPzModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal}/>
    </div>
  );
}

export default Main;