import './Inquiry.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import InquiryWrite from './InquiryWrite';
import InquiryDetail from './InquiryDetatil';

const Inquiry = ({ userInfo, currentPage, setCurrentPage }) => {
  const navigate = useNavigate();

  const [clickedTypeBtn, setClickedTypeBtn] = useState('문의하기');
  const typeMenu = ['문의하기', '문의내역확인'];


  return (
    <div className="Inquiry">
      <div className='title'>
        <FontAwesomeIcon icon={faArrowLeft} size="lg" style={{ color: '#9c9c9c' }} onClick={() => navigate('/faq')} />
        <h3>1:1 문의하기</h3>
      </div>
      <div className='inquiryTypeBtn'>
        {
          typeMenu.map((data, i) => {
            return (
              <button
                key={i}
                onClick={() => setClickedTypeBtn(data)}
                className={`${data === clickedTypeBtn && 'clicked'}`}
              >{data}</button>
            );
          })
        }

      </div>
      {
        clickedTypeBtn === '문의하기' ?
          <InquiryWrite userInfo={userInfo} setClickedTypeBtn={setClickedTypeBtn}/> :
          <InquiryDetail userInfo={userInfo} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      }
    </div>

  )
}

export default Inquiry;