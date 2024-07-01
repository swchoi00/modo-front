import './Notice.css';
import Accordion from 'react-bootstrap/Accordion';
import noticeMockData from './noticeMockData';
import { useNavigate } from 'react-router-dom';
import PaginationComponent from '../Pagination/PaginationComponent';
import { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

// Notice 관리자만 작성가능
const Notice = ({ currentPage, setCurrentPage }) => {
  const page = 10;
  const navigate = useNavigate();
  const [noticeList, setNoticeList] = useState([]);

  useEffect(() => {
    axiosInstance.get("/getNoticeList")
    .then((response) => {
        setNoticeList([
            ...noticeMockData,
            ...response.data
        ]);
    })
    .catch((error) => {
        console.log(error);
    })
}, []);


  return (
    <div className='Notice'>
      <h4 className='title'>공지사항</h4>

      <Accordion className='accordionBox'>

        {
          noticeList
            .slice((currentPage - 1) * page, currentPage * page)
            .map((data, i) => {
              return (
                <Accordion.Item eventKey={i} key={data.id} className='accordion'>
                  <Accordion.Header className='accordionBtn'>
                    <div className='titleBox' style={{display:'flex', flexDirection: 'column', gap: '0.5rem'}}>
                      <div className='createDate' style={{textAlign: 'left', color:'gray', fontSize: 'small'}}>{data.createDate}</div>
                      <div className='notice-title'>{data.title}</div>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className='contentBox'>
                    <div>{data.content}</div>
                  </Accordion.Body>
                </Accordion.Item>
              )
            })
        }

      </Accordion>



      {
        noticeMockData?.length !== 0 &&
        <div className="paging">
          <PaginationComponent
            currentPage={currentPage}
            itemsPerPage={page}
            totalItems={noticeMockData.length}
            onPageChange={(page) => setCurrentPage(page)}
            color="secondary"
          />
        </div>
      }


    </div>
  );
}

export default Notice;