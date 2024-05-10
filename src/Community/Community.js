import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Community.css';
import { useEffect, useState } from "react";
import PaginationComponent from "../Pagination/PaginationComponent";
import HotIssue from "./HotIssue";
import CommAddBtn from "./CommAddBtn";
import axiosInstance from "../axiosInstance";
import view from "../Img/comm_view.png";
import reply from "../Img/comm_reply.png";
import { useNavigate } from "react-router-dom";
import dog from "../Img/깡총강쥐.png";

const Community = ({ isAuth, currentPage, setCurrentPage }) => {
  const page = 10;
  const navigate = useNavigate();

  const type = ['전체보기', '자유', '질문·고민', '홍보', '후기'];
  const [typeBtn, setTypeBtn] = useState('전체보기');

  const [comm, setComm] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [clickedIcon, setClickedIcon] = useState('list');

  const hotIssues = [...filteredData].sort((a, b) => b.views - a.views).slice(0, 5); // 원본데이터를 변경하지않고 복제해서 새로운 배열 생성 -> 내림차순으로 정렬 -> 조회수 높은 5개의 게시글을 담음

  const typeColors = {
    '자유': '#6F6C6C',
    '질문·고민': '#FFC727',
    '홍보': '#FC3232',
    '후기': '#7E57C2'
  };

  useEffect(() => {
    axiosInstance.get("/comm_getList")
      .then((response) => {
        setComm(response.data);
        console.log(response.data);
        // ⭐⭐⭐새로고침하거나 페이지 이동해도 로컬스토리지에 저장하여 데이터 유지
        const storedData = localStorage.getItem('filteredData');
        if (storedData) {
          setFilteredData(JSON.parse(storedData));
        } else {
          setFilteredData(response.data);
        }
      }).catch((error) => {
        console.log(error);
      })
  }, [])

  console.log(comm);

  const typeHandler = (e) => {
    setTypeBtn(e.target.value);
    if (e.target.value === '전체보기') {
      setFilteredData(comm);
    } else {
      const filteredData = comm.filter(item => item.categories === e.target.value);
      setFilteredData(filteredData);
    }
    // 데이터가 변경되면 현재 페이지를 1로 초기화
    setCurrentPage(1);
  }

  console.log(filteredData);

  // 클릭된 아이콘 상태를 변경하는 함수
  const toggleViewType = (icon) => {
    setClickedIcon(icon);
    setTypeBtn('전체보기');
    setFilteredData(comm);
  }

  return (
    <div className="Community">

      <div className="banner">
        <div className="title">커뮤니티</div>
        <div className='searchBar'>
          <input className='search-input' placeholder='제목 + 내용 검색하기' />
          <span><FontAwesomeIcon icon={faSearch} size='lg' style={{ color: '#9c9c9c' }} /></span>
        </div>
      </div>

      <div className="icon-typeBtn-box">
        <div className="icon">
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,500,1,0" />

          <span onClick={() => toggleViewType('list')}>
            <span className="material-symbols-outlined" style={{ color: clickedIcon === 'list' ? "#8F7BE0" : "#C8C8C8" }}>lists</span>
          </span>
          <span onClick={() => toggleViewType('grid')} >
            <span className="material-symbols-outlined" style={{ color: clickedIcon === 'grid' ? "#8F7BE0" : "#C8C8C8" }}>grid_view</span>
          </span>
        </div>

        <div className="typBtn-box">
          {
            type.map((show, i) => {
              return (
                <button
                  key={i}
                  value={show}
                  className={`typeBtn ${show === typeBtn ? 'clicked' : ''}`}
                  onClick={typeHandler}
                >{show}</button>
              )
            })
          }
        </div>
      </div>
      {
        clickedIcon === 'list' ?
          // list 게시물
          <>
            <div>

              <div className="tbl">
                <ul className="th">
                  <li className="no">번호</li>
                  <li className="category">카테고리</li>
                  <li className="postTitle">제목</li>
                  <li className="author">작성자</li>
                  <li className="date">날짜</li>
                  <li className="view">조회수</li>
                </ul>
                <HotIssue hotIssues={hotIssues} typeColors={typeColors} />
                <ul className="tr">
                  {filteredData
                    .slice((currentPage - 1) * page, currentPage * page)
                    .map((data, i) => {
                      return (
                        <div key={i} className="td" onClick={() => navigate(`/comm/${data.postno}`)}>
                          <li className="no">{data.postno}</li>
                          <li className="item category" style={{ color: typeColors[data.categories], fontWeight: 'bold' }}>[{data.categories}]</li>
                          <li className="item postTitle">{data.postname.length > 20 ? data.postname.substring(0, 20) + "..." : data.postname} [{data.views}]</li>
                          <li className="item author">{data.author}</li>
                          <li className="item date">{data.uploadDate}</li>
                          <li className="view">{data.views}</li>
                        </div>
                      );
                    })}
                </ul>
              </div>

            </div>
            <div className="paging">
              <PaginationComponent
                currentPage={currentPage}
                itemsPerPage={page}
                totalItems={filteredData.length}
                onPageChange={(page) => setCurrentPage(page)}
                color="secondary"
              />
            </div>
          </>
          :

          // grid 게시물

          <div className="grid-comm">
            {
              filteredData.map((data, i) => {
                return (

                  <div className="card-type" key={i} onClick={() => navigate(`/comm/${data.postno}`)}>
                    <div className="card-header">
                      <div className="card-header inner1">
                        <img src="/static/media/face.786407e39b657bdecd13bdabee73e67b.svg" alt="" style={{ height: '40px', marginRight: '10px' }} />
                        <div>{data.author}</div>
                      </div>
                      <div className="card-header inner2">
                        <div>{data.date}</div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div>{data.postname.length > 20 ? data.postname.substring(0, 18) + "..." : data.postname}</div>
                      <div><img src={dog} alt="" /></div>
                      <div style={{wordWrap: 'break-word'}}>{data.content.length > 60 ? data.content.substring(0, 57) + "..." : data.content}</div>
                    </div>
                    <div className="card-footer">
                      <div className="card-footer inner2">
                        <div># {data.categories}</div>
                      </div>
                      <div className="card-footer inner1">
                        <div>
                          <img src={view} alt="view" style={{ margin: ' 0 5px 3px 10px' }} />
                          {data.views}
                        </div>
                        <div>
                          <img src={reply} alt="view" />
                          댓글수
                        </div>
                      </div>
                    </div>
                  </div>

                )
              })
            }
          </div>

      }

      <CommAddBtn isAuth={isAuth} />
    </div >
  )
}

export default Community;
