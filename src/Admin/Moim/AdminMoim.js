import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch as searchIcon } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import './AdminMoim.css';
import PaginationComponent from '../../Pagination/PaginationComponent';

function AdminMoim({ currentPage, setCurrentPage }) {
  const page = 10;
  const [moimList, setMoimList] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    axiosInstance.get('/moimList')
      .then((response) => {
        setMoimList(response.data);
      }).catch((error) => {
        console.log(error);
      });
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
    axiosInstance.delete('/deleteMoimList', { data: checkList })
      .then((response) => {
        alert(response.data);

        axiosInstance.get('/moimList')
          .then((response) => {
            setMoimList(response.data);
          }).catch((error) => {
            console.log(error);
          });

      }).catch((error) => {
        console.log(error);
      });
  }

  console.log(moimList);
  console.log(checkList);

  return (
    <div className="AdminMoim">
      <div className='title-search-box'>
        <h2>모임관리</h2>
        <div className='search-box'>
          <select>
            <option>전체</option>
            <option>모임번호</option>
            <option>모임명</option>
            <option>모임 카테고리</option>
          </select>
          <input placeholder='검색 (모임번호, 모임카테고리 등)'></input>
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
              <th>모임명</th>
              <th>간단 설명</th>
              <th>모임 지역</th>
              <th>모임장</th>
              <th>멤버수</th>
            </tr>
          </thead>
          <tbody>
            {
              moimList
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
                      <td>{data.leader.nickname}</td>
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
        moimList?.length !== 0 &&
        <div className="paging">
          <PaginationComponent
            currentPage={currentPage}
            itemsPerPage={page}
            totalItems={moimList.length}
            onPageChange={(page) => setCurrentPage(page)}
            color="secondary"
          />
        </div>
      }
    </div>
  )
}

export default AdminMoim;
