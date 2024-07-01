import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './AdminModal.css';
import axiosInstance from '../../axiosInstance';
import * as DOMPurify from "dompurify";

function AdminModal({ setModal, selectedMenu, data, getInquiryList, getNoticeList, getFAQList }) {

  const [faq, setFaq] = useState({
    id: data && data.id ? data.id : '',
    title: data && data.title ? data.title : '',
    content: data && data.content ? data.content : '',
    category: data && data.category ? data.category : ''
  });

  const [inquiry, setInquiry] = useState({
    id: data && data.id ? data.id : '',
    answer: data && data.answer ? data.answer : ''
  });

  const [notice, setNotice] = useState({
    id: data && data.id ? data.id : '',
    title: data && data.title ? data.title : '',
    content: data && data.content ? data.content : '',
  });

  const changeHandler = (e) => {
    if (selectedMenu === 'FAQ 관리') {
      setFaq({
        ...faq,
        [e.target.name]: e.target.value
      });
    } else if (selectedMenu === '1:1문의 관리') {
      setInquiry({
        ...inquiry,
        [e.target.name]: e.target.value
      });
    } else if (selectedMenu === '공지사항 관리') {
      setNotice({
        ...notice,
        [e.target.name]: e.target.value
      });
    }
  }


  const uploadHandler = () => {
    if (selectedMenu === 'FAQ 관리') {
      if(!faq.category){
        alert("카테고리를 선택해주세요.");
        return;
      } else if (!faq.title){
        alert("제목을 입력해주세요.");
        return;
      } else if(!faq.content){
        alert("내용을 입력해주세요.");
        return;
      }
      axiosInstance.post('/FAQSubmit', faq)
        .then((response) => {
          alert(response.data);
          getFAQList();
        })
        .catch((error) => {
          console.log(error);
        })
    }
    if (selectedMenu === '1:1문의 관리') {
      if(!inquiry.answer){
        alert("답변을 입력해주세요.");
        return;
      }
      axiosInstance.post('/inquirySubmit', inquiry)
        .then((response) => {
          alert(response.data);
          getInquiryList();
        })
        .catch((error) => {
          console.log(error);
        })
    }
    if (selectedMenu === '공지사항 관리') {
      if (!notice.title){
        alert("제목을 입력해주세요.");
        return;
      } else if(!notice.content){
        alert("내용을 입력해주세요.");
        return;
      }
      axiosInstance.post('/noticeSubmit', notice)
        .then((response) => {
          alert(response.data);
          getNoticeList();
        })
        .catch((error) => {
          console.log(error);
        })
    }

    setModal(false)
  }

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
                  value={faq.category}
                  onChange={changeHandler}
                >
                  <option value="" hidden>카테고리</option>
                  <option value="모임">모임</option>
                  <option value="커뮤니티">커뮤니티</option>
                  <option value="회원정보">회원정보</option>
                  <option value="기타">기타</option>
                </select>
                <input
                  type='text'
                  name='title'
                  value={faq.title}
                  className='modal-input'
                  onChange={changeHandler} />
              </div>
            ) : selectedMenu === '1:1문의 관리' ? (
              <div className='modal-header-inner'>
                <div className='modal-inquiry-category'>[{data?.category}]</div>
                <input
                  type='text'
                  value={data?.title}
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
                  value={notice.title}
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
                  value={faq.content}
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
                      value={inquiry.answer}
                      onChange={changeHandler}
                    />
                  </div>
                </>

              ) : (
                <textarea
                  placeholder='내용을 입력해주세요'
                  className='modal-textarea'
                  name='content'
                  value={notice.content}
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

              <button className='submitBtn' onClick={() => uploadHandler()}>작성완료</button>

            </div>
          </Modal.Footer>
        )
      }
    </Modal>
  );
}

export default AdminModal;
