import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './Community.css';
import { useEffect, useState } from "react";
import mockData from "./mockData";
import PaginationComponent from "../Pagination/PaginationComponent";
import HotIssue from "./HotIssue";
import CommAddBtn from "./CommAddBtn";
import axiosInstance from "../axiosInstance";
import view from "../Img/comm_view.png";
import reply from "../Img/comm_reply.png";
// import list from "../Img/comm_list.png";
// import grid from "../Img/comm_grid.png";

const Community = ({ isAuth, currentPage, setCurrentPage }) => {
  const page = 15;

  const type = ['전체보기', '자유', '질문·고민', '홍보', '후기'];
  const [typeBtn, setTypeBtn] = useState('전체보기');

  const [data, setData] = useState(mockData); // 게시글 임시데이터
  const [comm, setComm] = useState([]); // 데이터 받아오기
  const [clickedIcon, setClickedIcon] = useState('list'); // 클릭된 아이콘을 저장하는 상태

  const hotIssues = [...data].sort((a, b) => b.view - a.view).slice(0, 5);
  // const hotIssues = [...comm].sort((a, b) => b.views - a.views).slice(0, 5); // 원본데이터를 변경하지않고 복제해서 새로운 배열 생성 -> 내림차순으로 정렬 -> 조회수 높은 5개의 게시글을 담음

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
      }).catch((error) => {
        console.log(error);
      })
  }, [])

  console.log(comm);

  const typeHandler = (e) => {
    setTypeBtn(e.target.value);
    if (e.target.value === '전체보기') {
      setData(mockData);
      // setComm(comm);
    } else {
      const filteredData = mockData.filter(item => item.category === e.target.value);
      setData(filteredData);
      // const filteredData = comm.filter(item => item.categories === e.target.value);
      // setData(filteredData);
    }
    // 데이터가 변경되면 현재 페이지를 1로 초기화
    setCurrentPage(1);
  }

  // 클릭된 아이콘 상태를 변경하는 함수
  const toggleViewType = (icon) => {
    setClickedIcon(icon);
    setTypeBtn('전체보기');
    setData(mockData);
    // setComm(comm);
    
  }

  // 조회수 증가
  // const viewCnt = () => {
  //   setData
  // }
  return (
    <div className="Community">

      <div className="banner">
        <div className="title">커뮤니티</div>
        <div className='searchBar'>
          <input className='search-input' placeholder='관심 모임을 검색해보세요' />
          <span><FontAwesomeIcon icon={faSearch} size='lg' style={{ color: '#9c9c9c' }} /></span>
        </div>
      </div>

      <div className="icon">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,500,1,0" />

        <span  onClick={() => toggleViewType('list')}>
          <span class="material-symbols-outlined" style={{ color: clickedIcon === 'list' ? "#8F7BE0" : "#C8C8C8" }}>lists</span>
        </span>
        <span onClick={() => toggleViewType('grid')} >
          <span class="material-symbols-outlined" style={{ color: clickedIcon === 'grid' ? "#8F7BE0" : "#C8C8C8" }}>grid_view</span>
        </span>
      </div>

      <div className="btn">
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

      {
        clickedIcon === 'list' ?
          // list 게시물
          <>
            <div>
              <table className="tbl">
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>카테고리</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>날짜</th>
                    <th>조회수</th>
                  </tr>
                </thead>
                <tbody>
                  <HotIssue hotIssues={hotIssues} typeColors={typeColors} />
                  {/* {
                    comm
                    .slice((currentPage - 1) * page, currentPage * page)
                      .map((data, i) => {
                        return (
                          <tr key={i}>
                            <td>{data.postno}</td>
                            <td style={{ color: typeColors[data.categories], fontWeight: 'bold' }}>[{data.categories}]</td>
                            <td>{data.postname}</td>
                            <td>{data.author}</td>
                            <td>{data.date}</td>
                            <td>{data.views}</td>
                          </tr>
                        )
                      })
                  } */}
                  {
                    data
                      .slice((currentPage - 1) * page, currentPage * page)
                      .map((data, i) => {
                        return (
                          <tr key={i}>
                            <td>{data.postNo}</td>
                            <td style={{ color: typeColors[data.category], fontWeight: 'bold' }}>[{data.category}]</td>
                            <td>{data.title}</td>
                            <td>{data.writer}</td>
                            <td>{data.date}</td>
                            <td>{data.view}</td>
                          </tr>
                        )
                      })
                  }
                </tbody>
              </table>
            </div>
            <div className="paging">
              <PaginationComponent
                currentPage={currentPage}
                itemsPerPage={page}
                totalItems={data.length}
                onPageChange={(page) => setCurrentPage(page)}
                color="secondary"
              />
            </div>
          </>
          :

          // grid 게시물
          <div className="grid-comm">
            {/* {
              comm.map((data, i) => {
                return (
                  <div className="card-type" key={i}>
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
                      <div>{data.postname}</div>
                      <div>IMG</div>
                      <div>{data.content}</div>
                    </div>
                    <div className="card-footer">
                      <div className="card-footer inner2">
                        <div># {data.categories}</div>
                      </div>
                      <div className="card-footer inner1">
                        <div>
                          <img src={view} alt="view" />
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
            } */}
            {
              data.map((data, i) => {
                return (
                  <div className="card-type">
                    <div className="card-header">
                      <div className="card-header inner1">
                        <img src="/static/media/face.786407e39b657bdecd13bdabee73e67b.svg" alt="" style={{ height: '45px', marginRight: '10px' }} />
                        <div>{data.writer}</div>
                      </div>
                      <div className="card-header inner2">
                        <div>{data.date}</div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div>{data.title}</div>
                      <div>IMG</div>
                      <div>{data.content}</div>
                    </div>
                    <div className="card-footer">
                      <div className="card-footer inner2">
                        <div># {data.category}</div>
                      </div>
                      <div className="card-footer inner1">
                        <div>
                          <img src={view} alt="view" style={{ margin: ' 0 5px 3px 10px' }} />
                          {data.view}
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