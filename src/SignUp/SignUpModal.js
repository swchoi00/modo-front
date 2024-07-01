import React from 'react';
import { Modal } from 'react-bootstrap';
import './SignUpModal.css';


const SignUpModal = ({ modalOpen, setModalOpen, content, title}) => {
    
    return (
        <Modal
            show={modalOpen}
              // size="lg"
            onHide={() =>setModalOpen(false)}
            centered
        >
            <Modal.Header closeButton > 
                <Modal.Title id="moimDetail-moimInfo-setting-modal">
                    {title}
                </Modal.Title>
              </Modal.Header>
      
              <Modal.Body>
                <div className='termsModalBox'>{content}</div>
              </Modal.Body>
        </Modal>
    );
};

export default SignUpModal;