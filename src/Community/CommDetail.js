import { useNavigate, useParams } from 'react-router-dom';
import './CommDetail.css';
import { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import CommReply from './CommReply';

const CommDetail = ({ isAuth, userInfo }) => {
  const { id } = useParams();
  const [comm, setComm] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/comm/${id}`)
      .then((response) => {
        setComm(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  console.log(comm);


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
            <div><img src="/static/media/face.786407e39b657bdecd13bdabee73e67b.svg" /></div>
            <div>{comm.author}</div>

          </div>
          <div className='view-reply'>
            <div>조회수 {comm.views}</div>
            <div style={{ margin: '0 7px', color: '#e6e6e6' }}>|</div>
            {/* 댓글 수 배열로 되어 있어서 오류뜸 해결방법 찾아야함 {comm.replise.length}*/}
            <div>댓글 {comm.replise}</div>
          </div>
        </div>
        <div className='post-delete-update'>
          {
            userInfo.username === comm.author ?
              <>
                <button className='delete'>삭제</button>
                <button className='update'>수정</button>
              </>
              : ''
          }
        </div>
      </div>

      <div className='postContent'>
        <pre>{comm.content}</pre>

      </div>

      <div className='postBtn'>


        <button onClick={() => { navigate('/community') }}>목록</button>
      </div>
      <CommReply isAuth={isAuth} userInfo={userInfo} id={id} />
    </div>

  );
}

export default CommDetail;