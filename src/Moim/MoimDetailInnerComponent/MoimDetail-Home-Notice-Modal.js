import { Modal } from 'react-bootstrap';
import './MoimDetail-Home-Notice-Modal.css';
import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';
const MoimDetailHomeNoticeModal = ({moimNoticeModal, setMoimNoticeModal, id})=>{
  const navigate = useNavigate();
  const [moimCommList, setMoimCommList] = useState([]);



  useEffect(()=>{
    axiosInstance.get(`/getMoimCommList/${id}`)
    .then((response)=>{
      setMoimCommList(response.data.filter(item => item.categories === "공지"));
    }).catch((error)=>{
      console.log(error);
    });
  },[moimNoticeModal]);


  const [checkCommNumList, setCheckCommNumList] = useState([]); // key={i} 값 리스트 저장 (인덱스값)
  const [checkCommList,setCheckCommList] = useState([]); // 선택한 moimComm 엔티티 리스트 

  const checkCommHandler = (i)=>{
  let isCheck = checkCommNumList.includes(i);

   if(isCheck){
    setCheckCommNumList(prev => prev.filter(item => item !== i)); // 선택해제
   }else{
    if(checkCommList.length <5){
      setCheckCommNumList([...checkCommNumList, i]);
    }else{
      alert("최대 5개까지 선택할 수 있습니다.");
      return;
    }
   }
  }

  // 
  useEffect(() => {
    const filteredCommList = moimCommList.filter((data, index) => checkCommNumList.includes(index));
    setCheckCommList(filteredCommList);
  }, [checkCommNumList, moimCommList]);

  console.log(checkCommList);

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
          *대표 공지 혹은 필수 안내 사항을 설정해주세요 (최대 5개 설정 가능)
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
                    const isChecked = checkCommNumList.includes(i);
                    return (
                      <div key={i} className="td"  style={{ backgroundColor: isChecked ? '#f2f1fd' : '' }}> 
                        <li className="check">
                          <input type='checkbox' 
                                  checked={checkCommNumList.includes(i)} // 체크 여부를 상태에 따라 결정
                                  onChange={(e) => checkCommHandler(i)} // onChange 이벤트 사용
                          />
                        </li>
                        <li className="category" style={{ color: '#FC3232', fontWeight: 'bold' }}>{data.categories}</li>
                        <li className="postTitle">
                          {}
                          {data.postname} &nbsp;[{data.views}]
                        </li>
                        <li className="date">{data.uploadDate}</li>
                      </div>
                    );
                  })}
              </div>
              :
              <div style={{padding: '7rem 0', backgroundColor: '#F2EEF8', color: 'gray', display: 'flex',justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap:'1rem'}}>
                <span>아직 공지 게시글이 없어요 🥲</span>
                <div style={{cursor: 'pointer', borderRadius: '0.3rem', backgroundColor: '#9087d3', padding: '0.3rem 0.8rem', color:'white'}}
                      onClick={() =>navigate(`/moim/${id}/write`)}
                >글 쓰러 가기</div>
              </div>
            }
          </div>

        </div>
        
        
        <button className='SubmitBtn'>저장하기</button>

        
      </div>
    </Modal.Body>
  </Modal>
  )
}

export default MoimDetailHomeNoticeModal;