import { useNavigate } from 'react-router-dom';
import './Faq.css';
import LoginPzModal from '../Login/LoginPzModalComponent/LoginPzModal';
import { useEffect, useState } from 'react';
import { faSearch as searchIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosInstance from '../axiosInstance';
import PaginationComponent from '../Pagination/PaginationComponent';
import Accordion from '../accordion/Accordion';
import faqMockData from './faqMockData';

const Faq = ({ isAuth, currentPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const page = 10;
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [questionsList, setQuestionsList] = useState([]);
  const [faqFilteredData, setFaqFilteredData] = useState([]);
  const [categoryBtn, setCategoryBtn] = useState('전체');
  const categoryMenu = ['전체', '모임', '커뮤니티', '회원정보', '기타'];
  const [FaqSearchKeyWord, setFaqSearchKeyWord] = useState('');

  const [openIndex, setOpenIndex] = useState(null); // 현재 열려있는 아코디언 인덱스

  useEffect(() => {
    axiosInstance.get("/faq")
      .then((response) => {
        setQuestionsList([
          ...faqMockData,
          ...response.data
        ]);
        setFaqFilteredData([
          ...faqMockData,
          ...response.data
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInquiryBtnClick = () => {
    if (isAuth) {
      // 인증된 경우 페이지 이동
      navigate('/inquiry');
    } else {
      // 비인증된 경우 알림 표시 및 로그인 페이지로 이동
      setShowLoginModal(true);
    }
  };

  const searchInputChangeHandler = (e) => {
    setFaqSearchKeyWord(e.target.value);
    if (e.code === 'Enter') {
      const questionsListFilteredBySearch = questionsList.filter(item => {
        return item.title.includes(FaqSearchKeyWord);
      });
      setFaqFilteredData(questionsListFilteredBySearch);
      setCategoryBtn('전체');
    }
    setCurrentPage(1);
  }

  useEffect(() => {
    if (FaqSearchKeyWord?.length === 0) {
      setFaqFilteredData(questionsList);
    }
  }, [FaqSearchKeyWord])

  useEffect(() => {
    if (categoryBtn === '전체') {
      setFaqFilteredData(questionsList);
    } else {
      setFaqFilteredData(questionsList.filter(question => question.category === categoryBtn));
    }
    setCurrentPage(1);
  }, [categoryBtn]);

  const handleAccordionToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    // 페이지가 변경될 때 열린 아코디언 닫기
    setOpenIndex(null);
  }, [currentPage]);

  return (
    <div className="Faq">
      <div className='header'>
        <div className='title'>
          <h3>FAQ</h3>
          <h3>자주 묻는 질문</h3>
        </div>
        <div>
          <button className='inquiry-btn' onClick={handleInquiryBtnClick}>1:1문의</button>
        </div>
      </div>

      <div className='search-box'>
        <FontAwesomeIcon icon={searchIcon} className='searchIcon' size='xl' style={{ color: '#9c9c9c' }} />
        <input 
        placeholder='검색어를 입력해주세요' 
        onChange={searchInputChangeHandler}
        onKeyUp={searchInputChangeHandler}/>
      </div>

      <div className='category-btn'>
        {categoryMenu.map((category, i) => (
          <button
            key={i}
            value={category}
            className={`btnNotClicked ${category === categoryBtn && 'btnClicked'}`}
            onClick={() => setCategoryBtn(category)}
          >{category}</button>
        ))}
      </div>

      <div className='FAQ-inner'>
        <div>
          {faqFilteredData
            .slice((currentPage - 1) * page, currentPage * page)
            .map((data, i) => (
              <div key={i}>
                <Accordion
                  category={data.category}
                  title={data.title}
                  content={data.content}
                  isOpen={openIndex === i} // 현재 아코디언이 열려있는지 여부
                  onToggle={() => handleAccordionToggle(i)}
                />
              </div>
            ))}
        </div>
      </div>

      {faqFilteredData?.length !== 0 && (
        <div className="paging">
          <PaginationComponent
            currentPage={currentPage}
            itemsPerPage={page}
            totalItems={faqFilteredData.length}
            onPageChange={(page) => setCurrentPage(page)}
            color="secondary"
          />
        </div>
      )}
      <LoginPzModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />
    </div>
  )
}

export default Faq;
