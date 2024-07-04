import { Modal } from 'react-bootstrap';
import './MoimDetail-Home-Notice-Modal.css';
import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const MoimDetailHomeNoticeModal = ({moimNoticeModal, setMoimNoticeModal, id, setMoimNoticeList})=>{
  const navigate = useNavigate();
  const [moimCommList, setMoimCommList] = useState([]);
  const [checkCommList, setCheckCommList] = useState([]); // key={i} 값 리스트 저장 (인덱스값)
  
  // 게시글 리스트 가져오기 / 게시글 체크 여부 확인 후 체크된거 있으면, checkCommList 업데이트
  useEffect(()=>{
    if(moimNoticeModal){
      axiosInstance.get(`/getMoimCommList/${id}`)
      .then((response) => {
        //console.log(response.data);
        setMoimCommList(response.data.filter(item => item.categories === "공지"));
        // 이미 체크해둔 공지가 있는지 확인
        let checkNotice = response.data.filter(item => item.noticeCheck === true); // noticeCheck가 true인 것만 필터링
        if (checkNotice?.length > 0) {
          setCheckCommList(checkNotice.map(item => item.postno)); // 체크된 moimComm 엔티티에서 postno만 추출
        } else {
          setCheckCommList([]);
        }
        
      }).catch((error) => {
        console.log(error);
      });
    }
}, [moimNoticeModal]);



// 공지할 게시글 체크 할때마다 작동하는 핸들러
  const checkCommHandler = (i)=>{
  let isCheck = checkCommList.includes(i);

   if(isCheck){
    setCheckCommList(prev => prev.filter(item => item !== i)); // 선택해제
   }else{
    if(checkCommList.length <5){
      setCheckCommList([...checkCommList, i]);
    }else{
      alert("최대 5개까지 선택할 수 있습니다.");
      return;
    }
   }
  }


  // ⭐상운띠 여기 모임공지 업데이트 해주세유 (모임id, 게시글 번호 배열 보냄)
  // 모임 공지 체크리스트 업데이트
  const moimNoticeHandler=()=>{
    axiosInstance.post(`/moimNoticeInsert/${id}`, checkCommList)
    .then((response)=>{
      alert("공지 업데이트 완료!");
      let CommList = response.data; // 업데이트 된 모임게시글 리스트 받아옴
      setMoimNoticeList(CommList.filter(data => data.noticeCheck));
      setMoimNoticeModal(false);
    }).catch((error)=>{
      console.log(error);
    });
  }


  return(
    <Modal
    size="lg"
    show={moimNoticeModal}
    onHide={() => setMoimNoticeModal(false)}
    aria-labelledby="example-modal-sizes-title-lg"
  >
    <Modal.Header closeButton>
      <Modal.Title id="example-modal-sizes-title-lg">📌공지 설정</Modal.Title>
    </Modal.Header>

    <Modal.Body style={{paddingTop: '0', paddingLeft: '0', paddingRight: '0'}}>
      <div className='moim-noticeModal-container'>
        <div className='guide'>
          * 꼭 읽어주세요는 최대 5개 설정 가능해요 <br/>
          * 카테고리가 <b style={{color: '#fe6363'}}>[공지]</b> 로 분류된 것만 공지 할 수 있어요
          {
            moimCommList?.length !== 0 &&
          <div className='noticeMoimCommAdd' 
              onClick={() =>navigate(`/moim/${id}/write`)}
            ><FontAwesomeIcon icon={faPen} size="xs"/> 글 쓰기</div>
          }
        </div>

          <div className='NoticeCommBox'>
            <div className="tbl" >
              <ul className="th">
                <li className="check">선택</li>
                <li className="category">카테고리</li>
                <li className="postTitle">제목</li>
                <li className="date">날짜</li>
              </ul>
              {
                moimCommList?.length !== 0 ?
                <div className="tr">
                  {moimCommList.map((data, i) => {
                      const isChecked = checkCommList.includes(data.postno);
                      return (
                        <div key={i} className="td"  
                             style={{ backgroundColor: isChecked ? '#f2f1fd' : '' }} 
                             onClick={(e) => checkCommHandler(data.postno)}
                        > 
                          <li className="check">
                            <input type='checkbox' 
                                    checked={checkCommList.includes(data.postno)} // 체크 여부를 상태에 따라 결정
                                    onChange={(e) => checkCommHandler(data.postno)} // onChange 이벤트 사용
                            />
                          </li>
                          <li className="category" style={{ color: '#FC3232', fontWeight: 'bold' }}>{data.categories}</li>
                          <li className="postTitle">
                            {}
                            {data.postname} &nbsp;[{data.replyCount}]
                          </li>
                          <li className="date">{data.uploadDate}</li>
                        </div>
                      );
                    })}
                </div>
                :
                <div style={{padding: '7rem 0', backgroundColor: '#F2EEF8', color: 'gray', display: 'flex',justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap:'1rem'}}>
                  <span>아직 공지 게시글이 없어요 </span>
                  <div style={{cursor: 'pointer', borderRadius: '0.3rem', backgroundColor: '#9087d3', padding: '0.3rem 0.8rem', color:'white'}}
                        onClick={() =>navigate(`/moim/${id}/write`)}
                  >글 쓰러 가기</div>
                </div>
              }
            </div>

          </div>
          
          
        {
          moimCommList?.length !== 0 &&
          <button className='SubmitBtn' onClick={moimNoticeHandler}>저장하기</button>
        }

        
      </div>
    </Modal.Body>
  </Modal>
  )
}

export default MoimDetailHomeNoticeModal;