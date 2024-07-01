import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch as searchIcon } from '@fortawesome/free-solid-svg-icons';
import { faCaretUp as up } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown as down } from '@fortawesome/free-solid-svg-icons';
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
  const [filteredList, setFilteredList] = useState([]);
  const [searchOption, setSearchOption] = useState('전체');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const getNoticeList = () => {
    axiosInstance.get('/getNoticeList')
      .then((response) => {
        const sortedData = response.data.sort((a, b) => a.id - b.id);
        setNoticeList(sortedData);
        setFilteredList(sortedData);
      }).catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getNoticeList();
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
    axiosInstance.delete('/deleteNoticeList', { data: checkList })
      .then((response) => {
        alert(response.data);
        getNoticeList();

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
        console.log(error);
      });
  }

  const searchChangeHandler = (e) => {
    if (e.code === 'Enter') {
      setSearchKeyword(e.target.value);
      searchHandler();
    }
    setSearchKeyword(e.target.value);
  }

  const searchHandler = () => {
    const filteredNoticeList = noticeList.filter(notice => {
      if (searchOption === '전체') {
        return Object.values(notice).some(value =>
          String(value).toLowerCase().includes(searchKeyword.toLowerCase())
        );
      }
      if (searchOption === '제목') {
        return notice.title.toLowerCase().includes(searchKeyword.toLowerCase());
      }
      if (searchOption === '내용') {
        return notice.content.toLowerCase().includes(searchKeyword.toLowerCase());
      }
      return true;
    });

    setFilteredList(filteredNoticeList);
  }

  useEffect(() => {
    if (searchKeyword?.length === 0) {
      setFilteredList(noticeList);
      setSearchOption('전체');
    }
  }, [searchKeyword])

  const sortHandler = () => {
    const sortedData = [...filteredList].sort((a, b) => {
      if (sortOrder === 'asc') {
        return b.id - a.id;
      } else {
        return a.id - b.id;
      }
    });
    setFilteredList(sortedData);
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  }

  return (
    <div className="AdminNotice">
      <div className='title-search-box'>
        <h2>공지사항 관리</h2>
        <div className='search-box'>
          <select value={searchOption} onChange={(e) => setSearchOption(e.target.value)}>
            <option value="전체">전체</option>
            <option value="제목">제목</option>
            <option value="내용">내용</option>
          </select>
          <input
            placeholder='검색어를 입력해주세요.'
            value={searchKeyword}
            onChange={searchChangeHandler}
            onKeyUp={searchChangeHandler}
          />
          <FontAwesomeIcon
            icon={searchIcon}
            size='lg'
            style={{ color: '#9c9c9c' }}
            onClick={searchHandler} />
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
              <th onClick={sortHandler} style={{ cursor: 'pointer' }}>
                번호
                <FontAwesomeIcon icon={sortOrder === 'asc' ? up : down} style={{ color: '#9c9c9c', marginLeft: '0.5rem' }} />
              </th>
              <th>제목</th>
              <th>내용</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredList
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
              getNoticeList={getNoticeList}
            />
          }
          <button className='insertBtn' onClick={() => { setSelectedNotice(null); setModal(true); }}>글쓰기</button>
          <button className='deleteBtn' onClick={removeHandler}>삭제</button>
        </div>
      </div>
      {
        filteredList?.length !== 0 &&
        <div className="paging">
          <PaginationComponent
            currentPage={currentPage}
            itemsPerPage={page}
            totalItems={filteredList.length}
            onPageChange={(page) => setCurrentPage(page)}
            color="secondary"
          />
        </div>
      }
    </div>
  )
}

export default AdminNotice;
