import { useNavigate, useParams } from 'react-router-dom';
import './CommDetail.css';
import { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import CommReply from './CommReply';

const CommDetail = ({ isAuth, userInfo }) => {
  const { id } = useParams();
  const [comm, setComm] = useState([]);
  const [updateComm, setUpdateComm] = useState([]);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/comm/${id}`)
      .then((response) => {
        setComm(response.data);
        setUpdateComm(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])



  const changeHandler = (e) => {

    const updateContent = e.target.value

    setUpdateComm((data) => ({
      ...data,
      content: updateContent
    }))

  }


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

              update === true ?
                <>
                  {/* 게시글 수정 */}
                  <button className='delete' onClick={() => {
                    axiosInstance.put('/???', updateComm)
                      .then((response) => {
                        alert(response.data);
                      })
                      .catch((error) => {
                        console.log(error);
                      })
                  }}>수정완료</button>
                  <button className='update' onClick={() => setUpdate(false)}>취소</button>
                </>
                :
                <>
                  <button className='update' onClick={() => { setUpdate(true) }}>수정</button>
                  {/* 게시글 삭제 */}
                  <button className='delete' onClick={() => {
                    axiosInstance.delete(`/???/${id}`)
                      .then((response) => {
                        alert(response.data);
                      })
                      .catch((error) => {
                        console.log(error);
                      })
                  }}>삭제</button>
                </>

              : ''
          }
        </div>
      </div>

      <div className='postContent'>
        {
          update === true ?
            <textarea
              defaultValue={updateComm.content}
              style={{ width: "100%", minHeight: "50vh", padding: "10px", borderRadius: "10px", outlineColor: "#8F7BE0" }}
              onChange={changeHandler} />
            :
            <div>{comm.content}</div>
        }


      </div>

      <div className='postBtn'>


        <button onClick={() => { navigate('/community') }}>목록</button>
      </div>
      <CommReply isAuth={isAuth} userInfo={userInfo} id={id} />
    </div>

  );
}

export default CommDetail;