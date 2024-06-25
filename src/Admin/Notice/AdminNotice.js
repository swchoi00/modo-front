import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch as searchIcon } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import './AdminNotice.css';
import PaginationComponent from '../../Pagination/PaginationComponent';
import noticeMockData from '../../Notice/noticeMockData';
import AdminModal from '../modal/AdminModal';

function AdminNotice({ selectedMenu, setSelectedMenu, currentPage, setCurrentPage }) {
  const page = 10;
  const [noticeList, setNoticeList] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [modal, setModal] = useState(false);

    useEffect(() => {
      axiosInstance.get('/notice')
        .then((response) => {
          // setNoticeList(response.data);
          setNoticeList(noticeMockData.concat(response.data));
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

  const removeHandler = () => {
    axiosInstance.delete('/deleteNoticeList', checkList)
      .then((response) => {
        alert(response.data);

        axiosInstance.get('/getNoticeList')
          .then((response) => {
            // setNoticeList(response.data);
            setNoticeList(noticeMockData.concat(response.data));
          }).catch((error) => {
            console.log(error);
          });

      }).catch((error) => {
        console.log(error);
      });
  }

  console.log(noticeList);
  console.log(checkList);

  return (
    <div className="AdminNotice">
      <div className='title-search-box'>
        <h2>Notice 관리</h2>
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
                      <td>내용보기</td>
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
            <AdminModal setModal={setModal} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>
          }
          <button className='insertBtn' onClick={() => setModal(true)}>글쓰기</button>
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
