import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch as searchIcon } from '@fortawesome/free-solid-svg-icons';
import { faCaretUp as up } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown as down } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import './AdminInquiry.css';
import PaginationComponent from '../../Pagination/PaginationComponent';
import AdminModal from '../modal/AdminModal';


function AdminInquiry({ selectedMenu, currentPage, setCurrentPage }) {
  const page = 10;
  const [inquiryList, setInquiryList] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [searchOption, setSearchOption] = useState('전체');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterOption, setFilterOption] = useState('전체');
  const [filteredList, setFilteredList] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  // ⭐⭐⭐ 1:1문의 전체리스트 받아오기
  const getInquiryList = () => {
    axiosInstance.get('/getInquiryList')
      .then((response) => {
        const sortedData = response.data.sort((a, b) => a.id - b.id);
        setInquiryList(sortedData);
        setFilteredList(sortedData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getInquiryList();
  }, []);

  console.log(inquiryList);

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
    axiosInstance.delete('/deleteInquiryList', { data: checkList })
      .then((response) => {
        alert(response.data);
        // ⭐⭐⭐ 1:1문의 전체리스트 받아오기
        getInquiryList();

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

  const searchChangeHandler = (e) => {
    if (e.code === 'Enter') {
      setSearchKeyword(e.target.value);
      searchHandler();
    }
    setSearchKeyword(e.target.value);
  }

  const searchHandler = () => {
    const filteredInquiryList = inquiryList.filter(inquiry => {
      if (searchOption === '전체') {
        return Object.values(inquiry).some(value =>
          String(value).toLowerCase().includes(searchKeyword.toLowerCase())
        );
      }
      if (searchOption === '카테고리') {
        return inquiry.category.toLowerCase().includes(searchKeyword.toLowerCase());
      }
      if (searchOption === '제목') {
        return inquiry.title.toLowerCase().includes(searchKeyword.toLowerCase());
      }
      if (searchOption === '내용') {
        return inquiry.content.toLowerCase().includes(searchKeyword.toLowerCase());
      }
      return true;
    });

    setFilteredList(filteredInquiryList);
  }

  useEffect(() => {
    if (searchKeyword?.length === 0) {
      setFilteredList(inquiryList);
      setSearchOption('전체');
    }
  }, [searchKeyword])

  useEffect(() => {
    if (filterOption === '전체') {
      setFilteredList(inquiryList);
    } else if (filterOption === '답변 전') {
      setFilteredList(inquiryList.filter(inquiry => inquiry.answer === null));
    } else if (filterOption === '답변 완료') {
      setFilteredList(inquiryList.filter(inquiry => inquiry.answer !== null));
    }
  }, [filterOption, inquiryList]);

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
    <div className="AdminInquiry">
      <div className='title-search-box'>
        <h2>1:1문의 관리</h2>
        <div className='search-box'>
          <select value={searchOption} onChange={(e) => setSearchOption(e.target.value)}>
            <option value="전체">전체</option>
            <option value="카테고리">카테고리</option>
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
      <div className='answerCheckBtn'>
        <div
          onClick={() => setFilterOption('전체')}
          style={{ color: filterOption === '전체' && '#9087d3' }}
        >전체</div>
        <div
          onClick={() => setFilterOption('답변 전')}
          style={{ color: filterOption === '답변 전' && '#9087d3' }}
        >답변 전</div>
        <div
          onClick={() => setFilterOption('답변 완료')}
          style={{ color: filterOption === '답변 완료' && '#9087d3' }}
        >답변 완료</div>
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
              <th>카테고리</th>
              <th>제목</th>
              {/* <th>내용</th> */}
              <th>작성자</th>
              <th>작성일</th>
              <th>답변</th>
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
                      <td>{data.category}</td>
                      <td>{data.title}</td>
                      {/* <td onClick={(e) => openModalHandler(e, data.id)}>
                        <a className='show-modal'>내용보기</a>
                      </td> */}
                      <td>{data.writerName}</td>
                      <td>{data.createDate}</td>
                      <td>
                        <div className='answerChk'>
                          <button
                            onClick={(e) => openModalHandler(e, data.id)}
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
              getInquiryList={getInquiryList}
            />
          }
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

export default AdminInquiry;
