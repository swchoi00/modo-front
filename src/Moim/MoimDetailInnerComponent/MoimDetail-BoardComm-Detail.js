import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { faList} from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as likedIcon } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as unLikedIcon } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MoimDetailBoardCommReply from "./MoimDetail-BoardComm-Reply";

const MoimDetailBoardCommDetail = ({isAuth, userInfo})=>{
  const imsi = { 
    uthorid : 1,
    categories : "가입인사",
    content : "asd",
    member : { username: '(n)wwww7741@naver.com', nickname: '예닝', role: 'MEMBER'},
    moim : {id: 1, moimname: 'ㅁㄴ'},
    postname : "asd",
    postno : 1,
    uploadDate : "2024-05-31",
    views : 0
  };

  const {id} = useParams(); 
  const {no} = useParams(); 
  const [comm, setComm] = useState(imsi);
  const [updateComm, setUpdateComm] = useState({});
  const [update, setUpdate] = useState(false);
  const [replyLength, setReplyLength] = useState([]);
  const navigate = useNavigate();
  const [updateReplyCnt, setUpdateReplyCnt] = useState(false);
  const [moimInfo, setMoimInfo] = useState();
  

  // 모임정보 받아오는 effect
  useEffect(()=>{
    axiosInstance.get(`/moimInfo/${id}`)
    .then((response) => {
      setMoimInfo(response.data); // 모임 정보 저장
    })
    .catch((error) => {
        console.log(error);
    });
  },[id,setMoimInfo]);

  


  // 게시글 가져오기
  // useEffect(() => {
  //   axiosInstance.get(`/getMoimCommDetail/${no}`)
  //     .then((response) => {
  //       setComm(response.data);
  //       setUpdateComm(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //     axiosInstance.get(`/commReply/${id}/list`)
  //     .then((response) => {
  //       setReplyLength(response.data); 
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [no]);




  useEffect(()=>{
    if(updateReplyCnt){
      axiosInstance.get(`/commReply/${id}/list`)
        .then((response) => {
          setReplyLength(response.data); 
          setUpdateReplyCnt(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },[updateReplyCnt])

  const changeHandler = (e) => {
    setUpdateComm({
      ...updateComm,
      content: e.target.value
    });
  }

  const handleUpdate = () => {
    if (!updateComm.content.trim()) {
      alert('수정할 내용을 입력해주세요.');
      return;
    }
    axiosInstance.put(`/comm_update/${id}`, updateComm)
      .then((response) => {
        alert(response.data);
        setUpdate(false);
        setComm(updateComm); 
      })
      .catch((error) => {
        console.log(error);
      })
  };

  return(
    <div className='CommDetail' style={{marginTop: '0'}}>
      <div className='moimDetail-headerBox' style={{marginBottom: '1rem'}}>
        <div className='moimDetail-header-beforeBtn'>{/* 목록 */}
          <FontAwesomeIcon icon={faList} size='lg'style={{color: '#6a60a9'}}/>
        </div>
        <div className='moimDetail-header-category'>{moimInfo?.category}</div>
        <div className='moimDetail-header-title'>{moimInfo?.moimname}</div>
      </div>
      <div>
        <div className='postName'>{comm.postname}</div>
        <div className='post'>
          <div className='category-nickName'>
            <div>{comm.categories}</div>
            <div style={{ margin: '0 7px', color: '#e6e6e6' }}> | </div>
            <div>{comm.uploadDate}</div>
            <div style={{ margin: '0 7px', color: '#e6e6e6' }}> | </div>
            <div><img src="/static/media/face.786407e39b657bdecd13bdabee73e67b.svg" alt="face icon" /></div>
            <div>{comm.author}</div>
          </div>
          <div className='view-reply'>
            <div>조회수 {comm.views}</div>
            <div style={{ margin: '0 7px', color: '#e6e6e6' }}>|</div>

            <div>댓글 {replyLength.length} </div>
          </div>
        </div>
        <div className='post-delete-update'>
          {userInfo.username === comm.member.username ? (
            update ? (
              <>
                <button className='delete' onClick={handleUpdate} style={{border: '1px solid #9087d3', backgroundColor: '#9087d3', color: 'white'}}>수정완료</button>
                <button className='update' onClick={() => setUpdate(false)}>취소</button>
              </>
            ) : (
              <>
                <button className='update' onClick={() => setUpdate(true)}>수정</button>
                <button className='delete' onClick={() => {
                  axiosInstance.delete(`/comm_delete/${id}`)
                    .then((response) => {
                      alert(response.data);
                      navigate('/community');
                    })
                    .catch((error) => {
                      console.log(error);
                    })
                }}>삭제</button>
              </>
            )
          ) : null}
        </div>
      </div>

      <div className='postContent'>
        {update ? (
          <textarea
            value={updateComm.content || ''}
            onChange={changeHandler}
            // style={{ width: "100%", minHeight: "50vh", padding: "10px", borderRadius: "10px", outlineColor: "#8F7BE0" }}
          />
        ) : (
          <div style={{minHeight: '10rem'}}>{comm.content}</div>
        )}
      </div>

      <div className='postBtn' style={{borderTop: '1px solid rgb(243, 242, 242)'}}>
        <button onClick={() => navigate(-1)}>목록</button>
      </div>

      <MoimDetailBoardCommReply isAuth={isAuth} userInfo={userInfo} id={no} setUpdateReplyCnt={setUpdateReplyCnt}/>
    </div>
  )
}

export default MoimDetailBoardCommDetail;