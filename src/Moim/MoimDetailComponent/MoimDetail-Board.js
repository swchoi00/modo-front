import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './MoimDetail-Board.css';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import MoimDetailBoardSchduleComponent from './MoimDetailInnerComponent/MoimDetail-BoardSchduleComponent';
import { useEffect, useState } from 'react';
import mockData from '../../Community/mockData';
import '../../Community/Community.css';

const MoimDetailBoard = () =>{

  const moimCommCate = ['전체', '공지','자유','일정투표','가입인사'];
  const [moimCommCateCheck,setMoimCommCateCheck] = useState('전체'); // 모임 커뮤니티 클릭한 카테고리
  const [imsiCommDate, setimsiCommDate] = useState(mockData);
  // 모임 커뮤니티 클릭한 카테고리 값 저장 핸들러
  const moimCommCateHandler = (e) => {
    let cate = e.target.textContent;
    setMoimCommCateCheck(cate);

    if(cate === '전체'){
      setimsiCommDate(mockData);
    }else{
      setimsiCommDate(mockData.filter(item => item.category === e.target.textContent));
    }
  }

  // useEffect = (()=>{
    
  // },[moimCommCateCheck]);
  
  const typeColors = {
    '공지': '#FC3232',
    '자유': '#6F6C6C',
    '일정투표': '#7E57C2',
    '가입인사': '#FFC727'
  };

  return(
    <div className="moimDetailBoard-container">
      <div className='moimDetailBoard-schedule-Box'>
        <div className="moimDetailBoard-header">
            <h6>모임일정 <span style={{color: 'salmon'}}>(나중에 여기 리스트로 보기 버튼 만들어야함)</span></h6>
            {/* 😡임시😡 ↓ 모임장만 보이게 해야함 */}
            <FontAwesomeIcon icon={faEllipsisVertical} size="lg"/>
        </div>
        <div className='moimDetailBoard-contentBox'>
          <MoimDetailBoardSchduleComponent/> 
        </div>

      </div>

      <span className='moimDatail-line'>&nbsp;</span>{/*⭐ 컨텐츠 나누는 중간 줄 ⭐*/}
      
      <div className='moimDetailBoard-comm-Box'>
        <div className="moimDetailBoard-header">
            <h6>모임 게시판</h6>
            {/* 😡임시😡 ↓ 모임장만 보이게 해야함 */}
            <FontAwesomeIcon icon={faEllipsisVertical} size="lg"/>
        </div>
        <div className='moimDetailBoard-contentBox'>
          <div className='moimDetailBoard-comm-categotyBox'>
            {
              moimCommCate.map((cate)=>(
                <div className={`moimDetailBoard-comm-categoty ${moimCommCateCheck === cate && 'moimCommCateCheck'}`}
                     key={cate}
                     onClick={moimCommCateHandler}
                    //  style={{}}
                >
                  {cate}
                </div>
              ))
            }
          </div>
          <div className='moimDetailBoard-commListBox'>
            <div className='Community'>
              <div className="tbl" style={{marginTop: '1.5rem', width: '100%'}}>
                <ul className="th">
                  <li className="no">번호</li>
                  { moimCommCateCheck=== '전체' && <li className="category">카테고리</li>}
                  <li className="postTitle">제목</li>
                  <li className="author">작성자</li>
                  <li className="date">날짜</li>
                  <li className="view">조회수</li>
                </ul>
                <ul className="tr">
                  {imsiCommDate
                    // .slice((currentPage - 1) * page, currentPage * page)
                    .map((data, i) => {
                      return (
                        <div key={i} className="td">
                          <li className="no">{data.postNo}</li>
                          { moimCommCateCheck=== '전체' && 
                            <li className="item category" style={{ color: typeColors[data.category], fontWeight: 'bold' }}>{data.category}</li>
                          }
                          <li className="item postTitle">{data.title} &nbsp;[{data.view}]</li>
                          <li className="item author">{data.writer}</li>
                          <li className="item date">{data.date}</li>
                          <li className="view">{data.view}</li>
                        </div>
                      );
                    })}
                </ul>
              </div>

            </div>
              <div className="paging">
              {/* <PaginationComponent
                currentPage={currentPage}
                itemsPerPage={page}
                totalItems={filteredData.length}
                onPageChange={(page) => setCurrentPage(page)}
                color="secondary"
              /> */}
              </div>
          </div>
        </div>
      </div>

    </div>
  )
} 

export default MoimDetailBoard;