import {Modal} from 'react-bootstrap';
import './LoginPzModal.css';
import { useNavigate } from 'react-router-dom';
const LoginPzModal = ({ showLoginModal, setShowLoginModal}) => {

  const navigate = useNavigate();

  return (
    <div className="LoginPzModal-container">
      <Modal
        show={showLoginModal}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className='LoginPzModal-Box'>
            <b>로그인 후 이용해주세요 </b>
            <div className='LoginPzModal-Body'>
              <div className='LoginPzModal-BtnBox'>
                <button className='LoginPzModal-BtnStyle1' onClick={() => navigate('/login')}>로그인</button>
                <button className='LoginPzModal-BtnStyle2'  onClick={()=>setShowLoginModal(false)}>취소</button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LoginPzModal;