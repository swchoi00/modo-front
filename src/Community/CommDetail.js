import { useNavigate, useParams } from 'react-router-dom';
import './CommDetail.css';
import { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import CommReply from './CommReply';
import * as DOMPurify from "dompurify";
import QuillEditor from './QuillEditor';
import 'react-quill/dist/quill.snow.css';

const CommDetail = ({ isAuth, userInfo }) => {
  const { id } = useParams();
  const [comm, setComm] = useState({});
  const [updateComm, setUpdateComm] = useState({});
  const [update, setUpdate] = useState(false);
  const [replyLength, setReplyLength] = useState([]);
  const navigate = useNavigate();
  const [updateReplyCnt, setUpdateReplyCnt] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    axiosInstance.get(`/comm/${id}`)
      .then((response) => {
        setComm(response.data);
        setUpdateComm(response.data);
         // 게시물 내용에서 이미지 URL 추출
         const content = response.data.content;
         const tempDiv = document.createElement('div');
         tempDiv.innerHTML = content;
         const imgs = tempDiv.getElementsByTagName('img');
         const imgUrls = Array.from(imgs).map(img => img.src);
         setUploadedImages(imgUrls);
       })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    if (updateReplyCnt) {
      axiosInstance.get(`/commReply/${id}/list`)
        .then((response) => {
          setReplyLength(response.data);
          setUpdateReplyCnt(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [updateReplyCnt])

  const commDetailHandler = (e) => {
    let menu = e.target.textContent;

    switch (menu) {
      case "수정":
        setUpdate(true);
        break;
      case "취소":
        setUpdate(false);
        break;
      case "수정완료":
        // ⭐⭐⭐⭐ 다 지운 빈 값은 밑에 코드처럼 하면 되는데 스페이바 누른거면 또 안됨... 스페이스바 누르거나 빈 값일 경우 수정할 내용을 입력해주세요 라고 띄우기 @@!!
        if (updateComm?.content === '<p><br></p>') {
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
        break;
      case "삭제":
        const deleteComm = window.confirm("정말 삭제하시겠습니까?");
        if (deleteComm) {
          axiosInstance.delete(`/comm_delete/${id}`, {
            data: { images: uploadedImages },
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then((response) => {
              alert(response.data);
              navigate('/community');
            })
            .catch((error) => {
              console.log(error);
            });
        }
        break;
      default:
        break;
    }
  }

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

            <div>댓글 {replyLength.length} </div>
          </div>
        </div>
        <div className='post-delete-update'>
          {userInfo.nickname === comm.author ? (
            update ? (
              <>
                <button className='delete' onClick={(e) => commDetailHandler(e)}>수정완료</button>
                <button className='update' onClick={(e) => commDetailHandler(e)}>취소</button>
              </>
            ) : (
              <>
                <button className='update' onClick={(e) => commDetailHandler(e)}>수정</button>
                <button className='delete' onClick={(e) => commDetailHandler(e)}>삭제</button>
              </>
            )
          ) : null}
        </div>
      </div>

      <div className='postContent'>
        {update ? (
          <QuillEditor update={update} updatecomm={updateComm} setUpdateComm={setUpdateComm} setUploadedImages={setUploadedImages} />
        ) : (
          <div className='ql-editor'
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(String(comm?.content))
            }}></div>
        )}
      </div>

      <div className='commListBtn'>
        <button onClick={() => navigate(-1)}>목록</button>
      </div>

      <CommReply isAuth={isAuth} userInfo={userInfo} id={id} setUpdateReplyCnt={setUpdateReplyCnt} />
    </div>
  );
}

export default CommDetail;
