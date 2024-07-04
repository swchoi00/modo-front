import { Link, useNavigate } from 'react-router-dom';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import { Modal, ModalHeader } from 'react-bootstrap';
import profileImg1 from './../Img/profile_1.svg';
import profileImg2 from './../Img/profile_2.svg';
import profileImg3 from './../Img/profile_3.svg';
import { faCopy } from '@fortawesome/free-regular-svg-icons';


const Footer = () =>{
  const [showModal,setShowModal] = useState(false);
  const [showAlert,setShowAlert] = useState(false);
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const emailCopyHandler = (name) => {
    let email = '';
    switch (name) {
      case "예원": email = "wwww7741@naver.com"; break;
      case "상운": email = "celpic-@naver.com"; break;
      case "윤희": email = "newyoonhee@gmail.com"; break;
      default:break;
    }
  
    // 클립보드에 이메일 복사
    navigator.clipboard.writeText(email)
      .then(() => {
        setShowAlert(true);
      })
      .catch((err) => {
        console.error('클립보드 복사 실패:', err);
      });
  }


  return(
    <div className="footer-container">
      <div className='footer-container2'>
        <div className='footer-box'>
          <div className='footer-logoBox'>
            <div className='footer-logo'/>
            <div className='footer-logo-title'>모두의 도전은 모도!</div>
          </div>
        </div>
        
        <div className='footer-box2'>
          <div>Copyright ©2023 Modo Inc. All Rights Reserved.</div>
          <div>개발책임자 : 최예원, 최상운, 박윤희 &nbsp; | &nbsp; 
            <span onClick={()=>setShowModal(true)}> 개발자 이메일 보기</span> &nbsp; | &nbsp; 
            <span onClick={()=>window.open('https://github.com/swchoi00/modo-front')}> Github <FontAwesomeIcon icon={faGithub}/></span>
          </div>
        </div>

        <div className='footer-box3'>
          <Link className='footer-nav-aTag2' to = {"/termsPage/accessTerms"}>이용약관</Link>
          <Link className='footer-nav-aTag2' to = {"/termsPage/infoTerms"}>개인정보처리방침</Link>
        </div>
      </div>
      
      {/* 개발자 이메일 보기 모달 */}
      <Modal
        show={showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleCloseModal}
      >
        <Modal.Header closeButton > 
          <div className='emailModalHeader'>개발자 이메일 주소</div>
        </Modal.Header>
        <Modal.Body>
          <div className='emailModalBody'>
            <div className='profileBox'>
              <img src={profileImg1} alt=''/>
              <div className='profileText'>
                <h5 onClick={()=>emailCopyHandler("예원")}>최예원 <FontAwesomeIcon className='copyIcon' icon={faCopy}/></h5>
                <span>기획, 디자인, 프론트, 백엔드</span>
                <div onClick={()=>emailCopyHandler("예원")}>이메일 주소 복사 &nbsp;<FontAwesomeIcon icon={faCopy}/></div>
              </div>
            </div>
            <div className='profileBox'>
              <img src={profileImg2} alt=''/>
              <div className='profileText'>
                <h5 onClick={()=>emailCopyHandler("상운")}>최상운 <FontAwesomeIcon className='copyIcon' icon={faCopy}/></h5>
                <span>보안, 프론트, 백엔드</span>
                <div onClick={()=>emailCopyHandler("상운")}>이메일 주소 복사 &nbsp;<FontAwesomeIcon icon={faCopy}/></div>
              </div>
            </div>
            <div className='profileBox'>
              <img src={profileImg3} alt=''/>
              <div className='profileText'>
                <h5 onClick={()=>emailCopyHandler("윤희")}>박윤희 <FontAwesomeIcon className='copyIcon' icon={faCopy}/></h5>
                <span>디자인, 프론트, 백엔드</span>
                <div onClick={()=>emailCopyHandler("윤희")}>이메일 주소 복사 &nbsp;<FontAwesomeIcon icon={faCopy}/></div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* 이메일 복사 완료 알림 모달 */}
      <Modal
        show={showAlert}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className='LoginPzModal-Box'>
            <b>이메일 복사 완료!</b>
            <div className='LoginPzModal-Body'>
              <div className='LoginPzModal-BtnBox'>
                <button className='LoginPzModal-BtnStyle1' onClick={()=>setShowAlert(false)}>확인</button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Footer;
