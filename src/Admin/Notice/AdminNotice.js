import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch as searchIcon } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import './AdminNotice.css';
import PaginationComponent from '../../Pagination/PaginationComponent';
import noticeMockData from '../../Notice/noticeMockData';
import AdminModal from '../modal/AdminModal';

function AdminNotice({ selectedMenu, currentPage, setCurrentPage }) {
  const page = 10;
  const [noticeList, setNoticeList] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);  // 선택된 게시물 상태 추가

  useEffect(() => {
    axiosInstance.get('/notice')
      .then((response) => {
        setNoticeList(response.data);
        // setNoticeList(noticeMockData.concat(response.data));
      }).catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (noticeList.length > 0 && checkList.length === noticeList.length) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [checkList, noticeList]);

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
      const allcheckList = noticeList.map(notice => notice.id);
      setCheckList(allcheckList);
    }
    setAllChecked(!allChecked);
  }

  // ⭐⭐⭐ 공지사항 선택한 번호<List> 삭제하기
  const removeHandler = () => {
    axiosInstance.delete('/deleteNoticeList', checkList)
      .then((response) => {
        alert(response.data);

        axiosInstance.get('/notice')
          .then((response) => {
            setNoticeList(noticeMockData.concat(response.data));
          }).catch((error) => {
            console.log(error);
          });

      }).catch((error) => {
        console.log(error);
      });
  }

  const openModalHandler = (e, id) => {
    e.stopPropagation();
    axiosInstance.get(`/noticeDetail/${id}`)
      .then((response) => {
        setSelectedNotice(response.data);
        setModal(true);
      }).catch((error) => {
        console.log('오류');
        console.log(error);
      });
  }

  return (
    <div className="AdminNotice">
      <div className='title-search-box'>
        <h2>공지사항 관리</h2>
        <div className='search-box'>
          <select>
            <option>전체</option>
            <option>번호</option>
            <option>제목</option>
            <option>카테고리</option>
          </select>
          <input placeholder='검색 (번호, 제목, 카테고리 등)'></input>
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
              <th>제목</th>
              <th>내용</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {
              noticeList
                .slice((currentPage - 1) * page, currentPage * page)
                .map((data, i) => {
                  const isChecked = checkList.includes(data.id);
                  return (
                    <tr
                      key={i}
                      style={{ backgroundColor: isChecked ? '#f2f1fd' : '', cursor: 'pointer' }}
                      onClick={() => checkHandler(data.id)}
                    >
                      <td>
                        <input
                          className='checkBox'
                          type='checkbox'
                          checked={isChecked}
                          onChange={() => checkHandler(data.id)}
                        />
                      </td>
                      <td>{data.id}</td>
                      <td>{data.title}</td>
                      <td onClick={(e) => openModalHandler(e, data.id)}>
                        <a className='show-modal'>내용보기</a>
                      </td>
                      <td>{data.createDate}</td>
                    </tr>
                  )
                })
            }
          </tbody>
        </Table>
        <div className='insert-delete-btn'>
          {
            modal === true &&
            <AdminModal
              setModal={setModal}
              selectedMenu={selectedMenu}
              data={selectedNotice}
            />
          }
          <button className='insertBtn' onClick={() => { setSelectedNotice(null); setModal(true); }}>글쓰기</button>
          <button className='deleteBtn' onClick={removeHandler}>삭제</button>
        </div>
      </div>
      {
        noticeList?.length !== 0 &&
        <div className="paging">
          <PaginationComponent
            currentPage={currentPage}
            itemsPerPage={page}
            totalItems={noticeList.length}
            onPageChange={(page) => setCurrentPage(page)}
            color="secondary"
          />
        </div>
      }
    </div>
  )
}

export default AdminNotice;
