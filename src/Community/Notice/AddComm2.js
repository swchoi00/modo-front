import './AddComm2.css';
import Accordion from 'react-bootstrap/Accordion';
import noticeMockData from './noticeMockData';
import { useNavigate } from 'react-router-dom';
import PaginationComponent from '../../Pagination/PaginationComponent';

// Notice 관리자만 작성가능
const AddComm = ({ userInfo, currentPage, setCurrentPage }) => {
  const page = 10;
  const navigate = useNavigate();
  return (
    <div className='Notice'>
      <h4 className='title'>공지사항</h4>
      {/* {userInfo.role === "ADMIN" && ( */}
      <div className='adminBtn'>
        <button className='notice-write-btn' onClick={()=> navigate('/noticeWrite')}>글 작성</button>
      </div>
       {/* )}  */}
       <span></span>
      <Accordion className='accordionBox'>

        {
          noticeMockData
            .slice((currentPage - 1) * page, currentPage * page)
            .map((data, i) => {
              return (
                <Accordion.Item eventKey={i} key={data.id} className='accordion'>
                  <Accordion.Header className='accordionBtn'>
                    <div className='titleBox'>
                      <div className='notice-title'>{data.title}</div>
                      {/* <div className='createDate'>{data.createDate}</div> */}
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

export default AddComm;