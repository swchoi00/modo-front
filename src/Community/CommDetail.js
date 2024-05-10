import { useNavigate, useParams } from 'react-router-dom';
import './CommDetail.css';
import { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import CommReply from './CommReply';

const CommDetail = ({ isAuth, userInfo }) => {
  const { id } = useParams();
  const [comm, setComm] = useState({});
  const [updateComm, setUpdateComm] = useState({});
  const [update, setUpdate] = useState(false);
  const [replyLegth, setReplyLegth] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/comm/${id}`)
      .then((response) => {
        setComm(response.data);
        setUpdateComm(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

      axiosInstance.get(`/commReply/${id}/list`)
      .then((response) => {
        setReplyLegth(response.data); 
      })
      .catch((error) => {
        console.log(error);
      });

  }, [id]);

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
console.log(comm)
  return (
    <div className='CommDetail'>
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
            <div>댓글 {replyLegth ? replyLegth.length : 0}</div>
            {/* <div>댓글 {comm.replies ? comm.replies.length : 0}</div> */}
          </div>
        </div>
        <div className='post-delete-update'>
          {userInfo.nickname === comm.author ? (
            update ? (
              <>
                <button className='delete' onClick={handleUpdate}>수정완료</button>
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
            style={{ width: "100%", minHeight: "50vh", padding: "10px", borderRadius: "10px", outlineColor: "#8F7BE0" }}
          />
        ) : (
          <div>{comm.content}</div>
        )}
      </div>

      <div className='postBtn'>
        <button onClick={() => navigate('/community')}>목록</button>
      </div>

      <CommReply isAuth={isAuth} userInfo={userInfo} id={id} />
    </div>
  );
}

export default CommDetail;
