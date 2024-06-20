import './InquiryDetail.css';
import axiosInstance from '../axiosInstance';
import PaginationComponent from '../Pagination/PaginationComponent';
import { useEffect, useState } from 'react';
import Accordion from '../accordion/Accordion';

const InquiryDetail = ({ userInfo, currentPage, setCurrentPage }) => {
  const page = 10;
  const [inquiryList, setInquiryList] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const encodedUsername = encodeURIComponent(userInfo.username);

    axiosInstance.get(`/myInquiryForm/${encodedUsername}`)
      .then((response) => {
        setInquiryList(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }, [userInfo.username]);

  const handleAccordionToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    setOpenIndex(null);
  }, [currentPage]);

  console.log(inquiryList);

  return (
    <div className="InquiryDetail">
      <div className='accordion-show'>
      {
        inquiryList && inquiryList.length > 0 ? (
          inquiryList
            .slice((currentPage - 1) * page, currentPage * page)
            .map((data, i) => (
              <div key={i}>
                <Accordion
                  answer={data.answer}
                  // answerChk={data.answerChk}
                  date={data.createDate}
                  category={data.category}
                  title={data.title}
                  content={data.content}
                  isOpen={openIndex === i}
                  onToggle={() => handleAccordionToggle(i)}
                />
              </div>
            ))
        ) : (
          <div className='noInquiry '>문의하신 내역이 없습니다.</div>
        )
      }
        
      </div>

      {inquiryList?.length !== 0 && (
        <div className="paging">
          <PaginationComponent
            currentPage={currentPage || 1} // currentPage를 항상 값으로 설정
            itemsPerPage={page}
            totalItems={inquiryList.length}
            onPageChange={(page) => setCurrentPage(page)}
            color="secondary"
          />
        </div>
      )}
    </div>
  );
};

export default InquiryDetail;
