import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './AdminModal.css';
import axiosInstance from '../../axiosInstance';
import * as DOMPurify from "dompurify";

function AdminModal({ setModal, selectedMenu, data }) {

  const [faq, setFaq] = useState({
    // adminName : userInfo.username,
    title: '',
    content: '',
    category: ''
  });
  const [inquiry, setInquiry] = useState({
    answer: ''
  });
  const [notice, setNotice] = useState({
    // adminName : userInfo.username,
    title: '',
    content: '',
  });

  const changeHandler = (e) => {
    if (selectedMenu === 'FAQ 관리') {
      setFaq({
        ...faq,
        [e.target.name]: e.target.value
      })
    }
    if (selectedMenu === '1:1문의 관리') {
      setInquiry({
        ...inquiry,
        [e.target.name]: e.target.value
      })
    }
    if (selectedMenu === '공지사항 관리') {
      setNotice({
        ...notice,
        [e.target.name]: e.target.value
      })
    }
  }

  // ⭐⭐⭐ FAQ, 1:1문의, 공지사항 insert랑 update 합쳐서 만들어주세요
  // 서버 CreateMoimController에 moimCommInsert 메서드 참고해서 만들어주세요!
  // FAQ는 answer이 관리자가 답변 작성하는 컬럼입니다
  // 주석 처리한 곳에 해당 페이지에 맞게 적어주세용
  const uploadHandler = () => {
    // 글 작성 TEST
    if (selectedMenu === 'FAQ 관리') {
      axiosInstance.post('/faq_insert', faq)
        .then((response) => {
          alert(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
    }
    if (selectedMenu === '1:1문의 관리') {
      axiosInstance.post('/???', inquiry)
        .then((response) => {
          alert(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
    }
    if (selectedMenu === '공지사항 관리') {
      axiosInstance.post('/notice_insert', notice)
        .then((response) => {
          alert(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        
      // if (selectedMenu === 'FAQ 관리') {
      //   axiosInstance.post('/???', faq)
      //     .then((response) => {
      //       alert(response.data);
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     })
      // }
      // if (selectedMenu === '1:1문의 관리') {
      //   axiosInstance.post('/???', inquiry)
      //     .then((response) => {
      //       alert(response.data);
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     })
      // }
      // if (selectedMenu === '공지사항 관리') {
      //   axiosInstance.post('/???', notice)
      //     .then((response) => {
      //       alert(response.data);
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     })
    }

    setModal(false)
  }

  console.log(data);
  console.log(faq);
  console.log(inquiry);
  console.log(notice);

  return (
    <Modal
      size="lg"
      show={true}
      onHide={() => setModal(false)}
      dialogClassName="custom-modal"
    >
      <Modal.Header closeButton>
        <div className='AdminModal-header'>
          {
            selectedMenu === '커뮤니티 관리' ? (
              <div className='modal-title-wrapper'>
                <div className='modal-title'>제목</div>
                <input
                  type='text'
                  value={data?.postname}
                  className='modal-comm-input'
                  readOnly={data}
                />
              </div>
            ) : selectedMenu === 'FAQ 관리' ? (
              <div className='modal-header-inner'>
                <select
                  className='modal-select'
                  name='category'
                  value={data?.category || faq.category}
                  onChange={changeHandler}
                >
                  <option value="모임">모임</option>
                  <option value="커뮤니티">커뮤니티</option>
                  <option value="회원정보">회원정보</option>
                  <option value="기타">기타</option>
                </select>
                <input
                  type='text'
                  name='title'
                  value={data?.title || faq.title}
                  className='modal-input'
                  onChange={changeHandler} />
              </div>
            ) : selectedMenu === '1:1문의 관리' ? (
              <div className='modal-header-inner'>
                <div className='modal-inquiry-category'>[{data?.category}]</div>
                <input
                  type='text'
                  value={data?.title || ''}
                  className='modal-inquiry-input'
                  readOnly={data}
                />
              </div>
            ) : (
              <div className='modal-title-wrapper'>
                <div className='modal-title'>제목</div>
                <input
                  type='text'
                  name='title'
                  value={data?.title || notice.title}
                  className='modal-input'
                  onChange={changeHandler}
                />
              </div>
            )}
        </div>
      </Modal.Header>

      <Modal.Body>
        <div className='AdminModal-body'>
          {
            selectedMenu !== '1:1문의 관리' &&
            <div className='modal-body-title'>내용</div>
          }
          <div className='modal-textarea-wrapper'>
            {
              selectedMenu === '커뮤니티 관리' ? (
                <div
                  className='modal-comm-textarea'
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(String(data?.content))
                  }}
                  readOnly={data}
                />
              ) : selectedMenu === 'FAQ 관리' ? (
                <textarea
                  placeholder='내용을 입력해주세요'
                  className='modal-textarea'
                  name='content'
                  value={data?.content || faq.content}
                  onChange={changeHandler}
                />
              ) : selectedMenu === '1:1문의 관리' ? (
                <>
                  <textarea
                    className='modal-inquiry-user-textarea'
                    value={data?.content}
                    readOnly={data}
                  />
                  <div>
                    <div className='modal-body-answer-title'>답변</div>
                    <textarea
                      placeholder='내용을 입력해주세요'
                      className='modal-inquiry-admin-textarea'
                      name='answer'
                      value={data?.answer || inquiry.answer}
                      onChange={changeHandler}
                    />
                  </div>
                </>

              ) : (
                <textarea
                  placeholder='내용을 입력해주세요'
                  className='modal-textarea'
                  name='content'
                  value={data && data?.content || notice.content}
                  onChange={changeHandler}
                />
              )
            }
          </div>
        </div>
      </Modal.Body>

      {
        selectedMenu !== '커뮤니티 관리' && (
          <Modal.Footer>
            <div className='AdminModal-footer'>

              <button className='submitBtn' onClick={() => uploadHandler}>작성완료</button>

            </div>
          </Modal.Footer>
        )
      }
    </Modal>
  );
}

export default AdminModal;
