import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import './MoimDetail-Board.css';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import MoimDetailBoardSchduleComponent from '../MoimDetailInnerComponent/MoimDetail-BoardSchduleComponent';
import { useEffect, useRef, useState } from 'react';
import '../../Community/Community.css';
import PaginationComponent from '../../Pagination/PaginationComponent';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';

const MoimDetailBoard = ({moimInfo, currentPage, setCurrentPage, moimMemberRole, isAuth, userInfo, id, moimMemberInfo,  setMoimPageRef, moimPageRef}) =>{

  const moimBoardRef = useRef(null);
  // 홈, 글쓰기 후 게시판 위치로 이동하기
  useEffect(()=>{
    if (moimPageRef === 'comm' && moimBoardRef.current) {
      moimBoardRef.current.scrollIntoView({ behavior: 'auto' });
      setMoimPageRef(false);
    }
  },[moimPageRef])



  const navigate = useNavigate();
  const moimCommCate = ['전체', '공지','자유','가입인사'];
  const [moimCommCateCheck,setMoimCommCateCheck] = useState('전체'); // 모임 커뮤니티 클릭한 카테고리
  const page = 10;
  const [moimCommList, setMoimCommList] = useState([]);
  const [showMoimCommList, setShowMoimCommList] = useState([]);

  // 모임 커뮤니티 클릭한 카테고리 값 저장 핸들러
  const moimCommCateHandler = (e) => {
    let cate = e.target.textContent;
    setMoimCommCateCheck(cate);

    if(cate === '전체'){
      setShowMoimCommList(moimCommList);
    }else{
      setShowMoimCommList(moimCommList.filter(item => item.categories === cate));
    }
    setCurrentPage(1);
  }


  useEffect(()=>{
    axiosInstance.get(`/getMoimCommList/${id}`)
    .then((response)=>{
      setMoimCommList(response.data);
      setShowMoimCommList(response.data);
    }).catch((error)=>{
      console.log(error);
    });
  },[moimInfo,id]);

  
  const typeColors = {
    '공지': '#FC3232',
    '자유': '#6F6C6C',
    // '일정투표': '#7E57C2',
    // '가입인사': '#FFC727'
    '가입인사': '#7E57C2'
  };




// console.log(showMoimCommList);

                      

  return(
    <div className="moimDetailBoard-container">
      <div className='moimDetailBoard-schedule-Box'>
        <div className="moimDetailBoard-header" style={{marginTop: '1.8rem'}}>
            <h6>모임일정</h6>
            {/* 😡임시😡 ↓ 모임장만 보이게 해야함 */}
            <FontAwesomeIcon icon={faEllipsisVertical} size="lg"/>
        </div>
        <div className='moimDetailBoard-contentBox'>
          <MoimDetailBoardSchduleComponent moimInfo={moimInfo} moimMemberRole={moimMemberRole} isAuth={isAuth} userInfo={userInfo} /> 
        </div>

      </div>

      <span className='moimDatail-line'>&nbsp;</span>{/*⭐ 컨텐츠 나누는 중간 줄 ⭐*/}
      
      <div className='moimDetailBoard-comm-Box'>
        <div className="moimDetailBoard-header" >
            <h6>모임 게시판</h6>
            {/* 😡임시😡 ↓ 모임장만 보이게 해야함 */}
            <div className='moimDetailBoard-comm-writing' 
                  onClick={()=>navigate(`/moim/${moimInfo.id}/write`)}
            >
              <FontAwesomeIcon icon={faPen} size="xs"/>  글 쓰기
            </div>
        </div>
        <div className='moimDetailBoard-contentBox'  ref={moimBoardRef}>
          <div className='moimDetailBoard-comm-categotyBox'>
            {
              moimCommCate.map((cate)=>(
                <div className={`moimDetailBoard-comm-categoty ${moimCommCateCheck === cate && 'moimCommCateCheck'}`}
                     key={cate}
                     onClick={moimCommCateHandler}
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
                  <li className="category">카테고리</li>
                  <li className="postTitle">제목</li>
                  <li className="author">작성자</li>
                  <li className="date">날짜</li>
                  <li className="view">조회수</li>
                </ul>
                {
                  showMoimCommList?.length !== 0 ?
                  <ul className="tr">
                    {showMoimCommList
                      .slice((currentPage - 1) * page, currentPage * page)
                      .map((data, i) => {
                        return (
                          <div key={i} className="td" onClick={()=>navigate(`/moim/${moimInfo.id}/comm/${data.postno}`)}>
                            {/* <li className="no">{data.postno}</li> */}
                            <li className="no">{i+1}</li>
                            <li className="item category" style={{ color: typeColors[data.categories], fontWeight: 'bold' }}>{data.categories}</li>
                            <li className="item postTitle">{data.postname} &nbsp;[{data.views}]</li>
                            <li className="item author">{data.member.nickname}</li>
                            <li className="item date">{data.uploadDate}</li>
                            <li className="view">{data.views}</li>
                          </div>
                        );
                      })}
                  </ul>
                  :
                  <div style={{padding: '7rem 0', backgroundColor: '#F2EEF8', color: 'gray'}}>아직 게시글이 없어요 🥲</div>
                }
              </div>

            </div>
            {
              showMoimCommList?.length !== 0 &&
              <div className="paging">
                <PaginationComponent
                  currentPage={currentPage}
                  itemsPerPage={page}
                  totalItems={showMoimCommList?.length}
                  onPageChange={(page) => setCurrentPage(page)}
                  color="secondary"
                />
              </div>
            }
          </div>
        </div>
      </div>

    </div>
  )
} 

export default MoimDetailBoard;