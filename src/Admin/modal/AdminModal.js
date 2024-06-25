import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './AdminModal.css';

function AdminModal({ setModal, selectedMenu, category, title, content }) {
  return (
    <div className='AdminModal'>
      <Modal
        size="lg"
        show={true}
        onHide={() => setModal(false)}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          {selectedMenu === 'inquiry 관리' ? (
            <div className='modal-header-inner'>
              <div className='modal-category'>[{category}]</div>
              <input type='text' value={title} className='modal-input' readOnly />
            </div>
          ) : selectedMenu === 'FAQ 관리' ? (
            <div className='modal-header-inner'>
              <select className='modal-select'>
                <option>모임</option>
                <option>커뮤니티</option>
                <option>회원정보</option>
                <option>기타</option>
              </select>
              <input type='text' value={title} className='modal-input' readOnly />
            </div>
          ) : (
            <div className='modal-title-wrapper'>
              <div className='modal-title'>제목</div>
              <input
                type='text'
                value={title}
                className='modal-input-title'
                readOnly
              />
            </div>
          )}
        </Modal.Header>

        <Modal.Body>
          <div className='modal-body-title'>내용</div>
          <div className='modal-textarea-wrapper'>
            <textarea
              placeholder='내용을 입력해주세요'
              className='modal-textarea'
              value={content}
              readOnly
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <div className='submitBtn'>
            <button>글쓰기</button>
          </div>

          {/* <Button variant="primary">글쓰기</Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminModal;
