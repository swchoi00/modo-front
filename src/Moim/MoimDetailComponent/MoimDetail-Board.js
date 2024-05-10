import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './MoimDetail-Board.css';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import MoimDetailBoardSchduleComponent from './MoimDetailInnerComponent/MoimDetail-BoardSchduleComponent';
import { useEffect, useRef, useState } from 'react';
import '../../Community/Community.css';
import PaginationComponent from '../../Pagination/PaginationComponent';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';

const MoimDetailBoard = ({moimInfo, currentPage, setCurrentPage, moimCommAfter, setMoimCommAfter}) =>{
  
  // ..dlkdjlkajslkjaldkjasd
  // 모임 게시판 작성 후 페이지 이동을 위해 추가
  const commBoxRef = useRef(null); // ref 생성
  useEffect(() => {
    if (moimCommAfter && commBoxRef.current) {
      const { top } = commBoxRef.current.getBoundingClientRect(); // 현재 요소의 상대적 위치 가져오기
      const offset = window.innerWidth <= 875 ? 150 : 90; // 화면 너비에 따라 offset 결정
      const desiredTopPosition = top + window.scrollY - offset; // 최종 이동할 위치 계산
  
      window.scrollTo({
        top: desiredTopPosition,
        behavior: 'auto'
      });
  
      setMoimCommAfter(false);
    }
  }, [moimCommAfter,setMoimCommAfter]);


  const navigate = useNavigate();
  const moimCommCate = ['전체', '공지','자유','일정투표','가입인사'];
  const [moimCommCateCheck,setMoimCommCateCheck] = useState('전체'); // 모임 커뮤니티 클릭한 카테고리
  const settingMenuRef = useRef(null); // useRef를 사용하여 settingMenu 요소를 참조합니다.
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
  }


  useEffect(()=>{
    axiosInstance.get(`/getMoimCommList/${moimInfo.id}`)
    .then((response)=>{
      setMoimCommList(response.data);
      setShowMoimCommList(response.data);
    }).catch((error)=>{
      console.log(error);
    });
  },[moimInfo]);

  
  const typeColors = {
    '공지': '#FC3232',
    '자유': '#6F6C6C',
    '일정투표': '#7E57C2',
    '가입인사': '#FFC727'
  };

  // 모임게시판 메뉴 아이콘 눌렀는지 여부
  const [commSettingIcon, setCommSettingIcon] = useState(false);

  // 모임게시판 메뉴 아이콘 핸들러
  const commSettingMenuHandler = (e)=>{ 
    // let menu =e.target.textContent;
    // switch(menu){
    //   case "글 쓰기": console.log("글 쓰기");
    // }
    console.log(e.target.textContent);
  }


  // settingMenu 외의 영역을 클릭할 때 settingMenu를 닫기
  const handleOutsideClick = (e) => {
    if (!settingMenuRef.current || !settingMenuRef.current.contains(e.target)) {
      setCommSettingIcon(false);
    }
  };

  

  return(
    <div className="moimDetailBoard-container" onClick={handleOutsideClick}>
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
      
      <div className='moimDetailBoard-comm-Box' ref={commBoxRef}>
        <div className="moimDetailBoard-header">
            <h6>모임 게시판</h6>
            {/* 😡임시😡 ↓ 모임장만 보이게 해야함 */}
            <div className='moimDetailBoard-comm-settingIcon' 
                 onClick={(e)=>{
                  e.stopPropagation(); // 이벤트 버블링 방지
                  setCommSettingIcon(!commSettingIcon);
                  }} 
            >
              <FontAwesomeIcon 
                icon={faEllipsisVertical} 
                size="lg" 
              />
            </div>

            {
              commSettingIcon &&
              <div className='moimDetailBoard-comm-settingMenu' ref={settingMenuRef}>
                <li onClick={()=>navigate(`/moim/${moimInfo.id}/write`)}>글 쓰기✏️</li>
                <li onClick={commSettingMenuHandler}>내 글 보기</li>
                {
                  //이건 방장만 보이게 해야함
                  <li onClick={commSettingMenuHandler} style={{color: 'red'}}>글 삭제</li>
                }
              </div>
            }
        </div>
        <div className='moimDetailBoard-contentBox'>
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
                  {/* { moimCommCateCheck=== '전체' && <li className="category">카테고리</li>} */}
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
                          <div key={i} className="td">
                            <li className="no">{data.postno}</li>
                            {/* { moimCommCateCheck=== '전체' && 
                              <li className="item category" style={{ color: typeColors[data.category], fontWeight: 'bold' }}>{data.category}</li>
                            } */}
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