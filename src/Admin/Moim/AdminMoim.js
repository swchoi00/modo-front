import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch as searchIcon } from '@fortawesome/free-solid-svg-icons';
import { faCaretUp as up } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown as down } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import './AdminMoim.css';
import PaginationComponent from '../../Pagination/PaginationComponent';

function AdminMoim({ currentPage, setCurrentPage }) {
  const page = 10;
  const [moimList, setMoimList] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [searchOption, setSearchOption] = useState('전체');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const getMoimList = () => {
    axiosInstance.get('/moimList')
    .then((response) => {
      const sortedData = response.data.sort((a, b) => a.id - b.id);
      setMoimList(sortedData);
      setFilteredList(sortedData);
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    getMoimList();
  }, []);


  useEffect(() => {
    if (moimList.length > 0 && checkList.length === moimList.length) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [checkList, moimList]);

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
      const allcheckList = moimList.map(moim => moim.id);
      setCheckList(allcheckList);
    }
    setAllChecked(!allChecked);
  }

  // ⭐⭐⭐ 1:1문의 선택한 번호<List> 삭제하기
  const removeHandler = () => {
    axiosInstance.delete('/deleteMoimList', {data: checkList})
      .then((response) => {
        alert(response.data);
        getMoimList();

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
    const filteredMoimList = moimList.filter(moim => {
      if (searchOption === '전체') {
        return Object.values(moim).some(value =>
          String(value).toLowerCase().includes(searchKeyword.toLowerCase())
        );
      }
      if (searchOption === '카테고리') {
        return moim.category.toLowerCase().includes(searchKeyword.toLowerCase());
      }
      if (searchOption === '모임명') {
        return moim.moimname.toLowerCase().includes(searchKeyword.toLowerCase());
      }
      if (searchOption === '모임장') {
        return moim.leader.nickname.toLowerCase().includes(searchKeyword.toLowerCase());
      }
      return true;
    });

    setFilteredList(filteredMoimList);
  }

  useEffect(() => {
    if (searchKeyword?.length === 0) {
      setFilteredList(moimList);
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
    <div className="AdminMoim">
      <div className='title-search-box'>
        <h2>모임관리</h2>
        <div className='search-box'>
          <select value={searchOption} onChange={(e) => setSearchOption(e.target.value)}>
            <option value="전체">전체</option>
            <option value="카테고리">카테고리</option>
            <option value="모임명">모임명</option>
            <option value="모임장">모임장</option>
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
              <th>카테고리</th>
              <th>모임명</th>
              <th>간단 설명</th>
              <th>모임 지역</th>
              <th>모임장</th>
              <th>멤버수</th>
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
                      <td>{data.moimname}</td>
                      <td>{data.introduction}</td>
                      <td>{data.city} / {data.town}</td>
                      <td>{data.member_id}</td>
                      <td>{data.moimMemberNum}</td>
                    </tr>
                  )
                })
            }
          </tbody>
        </Table>
        <div className='deleteBtn'>
          <button onClick={removeHandler}>삭제</button>
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

export default AdminMoim;
