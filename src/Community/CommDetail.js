import { useNavigate, useParams } from 'react-router-dom';
import './CommDetail.css';
import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../axiosInstance';
import CommReply from './CommReply';
import * as DOMPurify from "dompurify";
import QuillEditor from '../quill/QuillEditor';
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
  const contentRef = useRef(null);

  // useEffect(() => {
  //   axiosInstance.get(`/comm/${id}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       setComm(response.data);
  //       setUpdateComm(response.data);
  //        // 게시물 내용에서 이미지 URL 추출
  //        const content = response.data.content;
  //        const tempDiv = document.createElement('div');
  //        tempDiv.innerHTML = content;
  //        const imgs = tempDiv.getElementsByTagName('img');
  //        const imgUrls = Array.from(imgs).map(img => img.src);
  //        setUploadedImages(imgUrls);
  //      })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [id]);


// 게시글 가져오기
useEffect(() => {
  axiosInstance.get(`/comm/${id}`)
    .then((response) => {
      let commDB = response.data;
      // 게시물 내용에서 이미지 URL 추출
      const content = commDB.content;
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const imgs = tempDiv.getElementsByTagName('img');
      const imgUrls = Array.from(imgs).map(img => img.src);
      setUploadedImages(imgUrls);


      if (commDB.member.memberImage !== null) {
        axiosInstance.get(`/userProfilePhoto/${commDB.member.id}`, {
          responseType: 'blob',
        })
          .then((response) => {
            const imageUrl = URL.createObjectURL(response.data);
            commDB = ({ ...commDB, authoridImg: imageUrl });
            setComm(commDB);
            setUpdateComm(commDB);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        commDB = ({ ...commDB, authoridImg: 'https://raw.githubusercontent.com/Jella-o312/modo-image/main/etc/userImgNone.svg' });
        setComm(commDB);
        setUpdateComm(commDB);
      }

    }).catch((error)=>console.log(error));
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
        const isContentEmpty = (content) => {
          // HTML 태그를 모두 제거한 후 공백을 제거하여 내용이 있는지 확인
          const text = content.replace(/<\/?[^>]+(>|$)/g, '').trim();
          return text === '';
        };
        if (isContentEmpty(updateComm?.content)) {
          alert('내용은 필수 입력 항목입니다. (이미지만 삽입할 수 없습니다.)');
          contentRef.current.focus();
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
            <div><img src={comm.authoridImg} alt="face icon"  style={{borderRadius: '5rem', width:'auto', aspectRatio: '1/1'}}/></div>
            <div>{comm.member?.nickname}</div>
          </div>
          <div className='view-reply'>
            <div>조회수 {comm.views}</div>
            <div style={{ margin: '0 7px', color: '#e6e6e6' }}>|</div>

            <div>댓글 {replyLength.length} </div>
          </div>
        </div>
        <div className='post-delete-update'>
          {userInfo?.id === comm.member?.id ? (
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
          <QuillEditor update={update} updatecomm={updateComm} setUpdateComm={setUpdateComm} setUploadedImages={setUploadedImages} contentRef={contentRef}/>
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
