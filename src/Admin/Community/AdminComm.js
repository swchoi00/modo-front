import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch as searchIcon } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import './AdminComm.css';
import PaginationComponent from '../../Pagination/PaginationComponent';

function AdminComm({ selectedMenu, currentPage, setCurrentPage }) {
  const page = 10;
  const [commList, setCommList] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    axiosInstance.get('/getCommunityList')
      .then((response) => {
        setCommList(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (commList.length > 0 && checkList.length === commList.length) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [checkList, commList]);

  const checkHandler = (i) => {
    let isCheck = checkList.includes(i);

    if (isCheck) {
      setCheckList(prev => prev.filter(item => item !== i)); // 선택해제
    } else {
      setCheckList([...checkList, i]);
    }
  }

  const allCheckHandler = () => {
    if (allChecked) {
      setCheckList([]);
    } else {
      const allcheckList = commList.map(comm => comm.postno);
      setCheckList(allcheckList);
    }
    setAllChecked(!allChecked);
  }

  const removeHandler = () => {
    axiosInstance.delete('/deleteCommunityList', checkList)
      .then((response) => {
        alert(response.data);

        axiosInstance.get('/getCommunityList')
      .then((response) => {
        setCommList(response.data);
      }).catch((error) => {
        console.log(error);
      });

      }).catch((error) => {
        console.log(error);
      });
  }

  console.log(commList);

  return (
    <div className="AdminComm">
      <div className='title-search-box'>
        <h2>커뮤니티 관리</h2>
        <div className='search-box'>
          <select>
            <option>전체</option>
            <option>게시글 번호</option>
            <option>제목</option>
            <option>카테고리</option>
          </select>
          <input placeholder='검색 (게시글 번호, 카테고리 등)'></input>
          <FontAwesomeIcon icon={searchIcon} size='lg' style={{ color: '#9c9c9c' }} />
        </div>
      </div>

      <div className="table-container">
        <Table striped>
          <thead>
            <tr>
              <th>
              <input
                  className='checkBox'
                  type='checkbox'
                  onChange={allCheckHandler}
                  checked={allChecked}
                />
              </th>
              <th>번호</th>
              <th>카테고리</th>
              <th>제목</th>
              <th>내용</th>
              <th>작성일</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            {
              commList
                .slice((currentPage - 1) * page, currentPage * page)
                .map((data, i) => {
                  const isChecked = checkList.includes(data.postno);
                  return (
                    <tr
                      key={i}
                      style={{ backgroundColor: isChecked ? '#f2f1fd' : '', cursor: 'pointer' }}
                      onClick={() => checkHandler(data.postno)}
                    >
                      <td>
                        <input
                          className='checkBox'
                          type='checkbox'
                          checked={isChecked}
                          onChange={() => checkHandler(data.postno)}
                        />
                      </td>
                      <td>{data.postno}</td>
                      <td>{data.categories}</td>
                      <td>{data.postname} [{data.replies.length}]</td>
                      <td>내용보기</td>
                      <td>{data.uploadDate}</td>
                      <td>{data.views}</td>
                    </tr>
                  )
                })
            }
          </tbody>
        </Table>
        <div className='deleteBtn'>
          <button>삭제</button>
        </div>
      </div>
      {
        commList?.length !== 0 &&
        <div className="paging">
          <PaginationComponent
            currentPage={currentPage}
            itemsPerPage={page}
            totalItems={commList.length}
            onPageChange={(page) => setCurrentPage(page)}
            color="secondary"
          />
        </div>
      }
    </div>
  )
}

export default AdminComm;
