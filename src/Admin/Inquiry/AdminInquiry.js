import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch as searchIcon } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import './AdminInquiry.css';
import PaginationComponent from '../../Pagination/PaginationComponent';
import AdminModal from '../modal/AdminModal';

function AdminInquiry({ userInfo, selectedMenu, currentPage, setCurrentPage }) {
  const page = 10;
  const [inquiryList, setInquiryList] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // ⭐⭐⭐ 1:1문의 전체리스트 받아오기
  // useEffect(() => {
  //   axiosInstance.get('/getIquiryList')
  //     .then((response) => {
  //       setInquiryList(response.data);
  //     }).catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  useEffect(() => {
    const encodedUsername = encodeURIComponent(userInfo.username);

    axiosInstance.get(`/myInquiryForm/${encodedUsername}`)
      .then((response) => {
        setInquiryList(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }, [userInfo.username]);


  useEffect(() => {
    if (inquiryList.length > 0 && checkList.length === inquiryList.length) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [checkList, inquiryList]);

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
      const allcheckList = inquiryList.map(inquirycheckList => inquirycheckList.id);
      setCheckList(allcheckList);
    }
    setAllChecked(!allChecked);
  }

  // ⭐⭐⭐ 1:1문의 선택한 번호<List> 삭제하기
  const removeHandler = () => {
    axiosInstance.delete('/deleteNoticeList', checkList)
      .then((response) => {
        alert(response.data);

        // ⭐⭐⭐ 1:1문의 전체리스트 받아오기
        axiosInstance.get('/getIquiryList')
          .then((response) => {
            setInquiryList(response.data);
          }).catch((error) => {
            console.log(error);
          });

      }).catch((error) => {
        console.log(error);
      });
  }

  const openModalHandler = (e, id) => {
    e.stopPropagation();
    axiosInstance.get(`/inquiryFormDetail/${id}`)
      .then((response) => {
        setSelectedInquiry(response.data);
        setModal(true);
      }).catch((error) => {
        console.log(error);
      });
  }

  console.log(inquiryList);

  return (
    <div className="AdminInquiry">
      <div className='title-search-box'>
        <h2>1:1문의 관리</h2>
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
              <th>카테고리</th>
              <th>제목</th>
              <th>내용</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>답변여부</th>
            </tr>
          </thead>
          <tbody>
            {/* <button className='test2'>답변완료</button>
            <button className='test1'>답변 전</button> */}
            {
              inquiryList
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
                      <td>{data.category}</td>
                      <td>{data.title}</td>
                      <td onClick={(e) => openModalHandler(e, data.id)}>
                        <a className='show-modal'>내용보기</a>
                      </td>
                      <td>{data.writerName}</td>
                      <td>{data.createDate}</td>
                      <td>
                        <div className='answerChk'>
                          <button
                            onClick={(e) => { openModalHandler(e, data.id);}}
                            style={{
                              color: data.answer ? '#6A60A9' : 'white',
                              backgroundColor: data.answer ? 'white' : '#6A60A9',
                              border: data.answer ? '1px solid #6A60A9' : '1px solid #6A60A9',
                            }}>
                            {data.answer ? '답변완료' : '답변 전'}
                          </button>
                        </div>
                      </td>
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
              data={selectedInquiry}
            />
          }
          <button className='deleteBtn' onClick={removeHandler}>삭제</button>
        </div>
      </div>
      {
        inquiryList?.length !== 0 &&
        <div className="paging">
          <PaginationComponent
            currentPage={currentPage}
            itemsPerPage={page}
            totalItems={inquiryList.length}
            onPageChange={(page) => setCurrentPage(page)}
            color="secondary"
          />
        </div>
      }
    </div>
  )
}

export default AdminInquiry;
