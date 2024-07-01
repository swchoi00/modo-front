import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch as searchIcon } from '@fortawesome/free-solid-svg-icons';
import { faCaretUp as up } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown as down } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import './AdminMember.css';
import PaginationComponent from '../../Pagination/PaginationComponent';

function AdminMember({ selectedMenu, currentPage, setCurrentPage }) {
  const page = 10;
  const [memberList, setMemberList] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [searchOption, setSearchOption] = useState('전체');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');


  const getMemberList = () => {
    axiosInstance.get('/getMemberList')
      .then((response) => {
        const sortedData = response.data.sort((a, b) => a.id - b.id);
        setMemberList(sortedData);
        setFilteredList(sortedData);
      }).catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getMemberList();
  }, []);

  useEffect(() => {
    if (memberList.length > 0 && checkList.length === memberList.length) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [checkList, memberList]);

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
      const allcheckList = memberList.map(member => member.id);
      setCheckList(allcheckList);
    }
    setAllChecked(!allChecked);
  }

  // ⭐⭐⭐ 회원 선택한 번호<List> 삭제하기
  const removeHandler = () => {
    axiosInstance.delete('/deleteMemberList', {data: checkList})
      .then((response) => {
        alert(response.data);
        getMemberList();

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
    const filteredMemberList = memberList.filter(member => {
      if (searchOption === '전체') {
        return Object.values(member).some(value =>
          String(value).toLowerCase().includes(searchKeyword.toLowerCase())
        );
      }
      if (searchOption === '닉네임') {
        return member.nickname.toLowerCase().includes(searchKeyword.toLowerCase());
      }
      if (searchOption === '아이디') {
        return member.username.toLowerCase().includes(searchKeyword.toLowerCase());
      }
      if (searchOption === '가입방법') {
        return member.oauth.toLowerCase().includes(searchKeyword.toLowerCase());
      }
      return true;
    });

    setFilteredList(filteredMemberList);
  }

  useEffect(() => {
    if (searchKeyword?.length === 0) {
      setFilteredList(memberList);
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
    <div className="AdminMember">
      <div className='title-search-box'>
        <h2>회원관리</h2>
        <div className='search-box'>
          <select value={searchOption} onChange={(e) => setSearchOption(e.target.value)}>
            <option value="전체">전체</option>
            <option value="닉네임">닉네임</option>
            <option value="아이디">아이디</option>
            <option value="가입방법">가입방법</option>
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
                회원번호
                <FontAwesomeIcon icon={sortOrder === 'asc' ? up : down} style={{ color: '#9c9c9c', marginLeft: '0.5rem' }} />
              </th>
              <th>닉네임</th>
              <th>아이디</th>
              <th>가입방법</th>
              <th>가입일</th>
              <th>참여 모임 수</th>
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
                      <td>{data.nickname}</td>
                      <td>{data.username}</td>
                      <td>{data.oauth}</td>
                      <td>{data.createDate}</td>
                      <td>{data.participatedMoimCount}</td>
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

export default AdminMember;
