import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList} from '@fortawesome/free-solid-svg-icons';
import '../MoimDetail/Moim-home.css';
import './MoimDetail-BoardCommComponent.css'
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import QuillEditor from '../../quill/QuillEditor';

const MoimDetailBoardCommComponent = ({isAuth, userInfo, setMoimPageRef})=>{
  const navigate = useNavigate();
  const [moimInfo, setMoimInfo] = useState();
  const {id} = useParams(); // URL 파라미터인 id 값을 가져옴 (반환되는 값이 객체형태여서 객체 형태인 {id로 받아줘야함})
  const commCategory = ['자유', '가입인사'];
  const commLeaderCategory = ['공지', '자유', '가입인사'];
  const [moimMemberInfo, setMoimMemberInfo] = useState(); // 모임 멤버 정보
  const [moimCommInfo, setMoimCommInfo] = useState({
    categories: '',
    postname: '',
    content: '',
    views: 0,
  });
  const [selectedColor, setSelectedColor] = useState('#666');
  const contentRef = useRef(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  
  // 🔒보안관련 (로그인 안했거나, 모임멤버 아닌경우 페이지 침입방지)
  useEffect(() => {
    axiosInstance.get(`/getMoimMemberList/${id}`)
        .then((response) => {
          let page = window.location.href;
          let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
          let moimMemberList = response.data;
          let matchingMember = moimMemberList?.find(memberInfo => memberInfo.member.id === userInfo?.id); // 모임 멤버 확인
          setMoimMemberInfo(matchingMember); //모임 멤버 객체 저장 (모임 멤버라면 값 들어가고 아니면 iundifind)
          // //console.log(matchingMember);
      
          // 😡😡😡나중에 주소 바꿔줘야함
          if (page !== `http://localhost:3000/moim/${id}/home`) { // 모임 메인 화면이 아닌 페이지를 url로 들어올 경우 (모임 메인 화면은 비회원도 볼 수 있음)
            if(userInfo){ //로그인 상태
                if(!matchingMember){ //모임멤버 아닌 경우
                  alert("모임 가입 후 이용해주세요");
                  navigate(`/moim/${id}/home`);
                }
            }else{ // 로그인 안한 상태
              alert("로그인 후 이용해주세요");
              navigate('/login');
            }
          }
        }).catch((error) => {
            console.log(error);
        });
}, [id,isAuth]);



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
  

  
  const changeHandler = (e) => {
    setMoimCommInfo({
      ...moimCommInfo,
      [e.target.name] : e.target.value
    })
    const color = e.target.value === '' ? '#666' : '#000000';
    setSelectedColor(color);
  }
  
  
  // const moimCommSubmitCheck =  Object.values(moimCommInfo).every(value => value.trim() !== ''); 
  // 입력값에서 띄어쓰기 제거 후 값이 ''밖에 없으면 false 도출
  const moimCommSubmitCheck =  Object.values(moimCommInfo).every(value => {
    // 값이 문자열인 경우에만 trim을 호출하고, 그렇지 않은 경우에는 값을 그대로 사용합니다.
    if (typeof value === 'string') {
      return value.trim() !== '';
    }
    return true; // 문자열이 아닌 경우에는 trim을 호출하지 않고, 검사에서 제외합니다.
  });


  
  const moimCommContentHandler = ()=>{
    const isContentEmpty = (content) => {
      // HTML 태그를 모두 제거한 후 공백을 제거하여 내용이 있는지 확인
      const text = content.replace(/<\/?[^>]+(>|$)/g, '').trim();
      return text === '';
    };
    if (isContentEmpty(moimCommInfo?.content)) {
      alert('내용은 필수 입력 항목입니다. (이미지만 삽입할 수 없습니다.)');
      contentRef.current.focus();
      return;
    }
    const updatedMoimCommInfo = {...moimCommInfo, moim: moimInfo, authorid : moimMemberInfo.id}; // 모임정보 저장해주기
    axiosInstance.post('/moimCommInsert', updatedMoimCommInfo)
    .then((response)=>{
      alert(response.data);
      setMoimPageRef("comm");
      navigate(-1); // 이전 페이지로 
    }).catch((error)=>{
      console.log(error);
    });
  }
  

  return(
    <div className='MoimDetail-container '>

      <div className='moimDetail-headerBox'>
        <div className='moimDetail-header-beforeBtn' onClick={()=>navigate('/moim')} style={{cursor:'pointer'}}>
          <FontAwesomeIcon icon={faList} size='lg'style={{color: '#6a60a9'}}/>
        </div>
        {moimInfo &&
          <>
            <div className='moimDetail-header-category'>{moimInfo.category}</div>
            <div className='moimDetail-header-title' onClick={()=>navigate(`/moim/${id}/home`)} style={{cursor:'pointer'}}>{moimInfo.moimname}</div>
          </>
        }
      </div>


      <div className="AddComm moimCommCustomMargin" style={{width: '100%', margin: '0'}}>
        <div className='post' style={{marginTop: '1rem'}}>
          <div className='category-postName'>
            <select
              name='categories'
              onChange={changeHandler}
              style={{ color: moimCommInfo.categories ? '#000000' : '#666' }}
              >
              <option value='' hidden>카테고리</option>
              {(moimMemberInfo?.memberRole === 'member' ? commCategory: commLeaderCategory).map((data, i)=>( // 리더,매니저랑 멤버의 게시글 차이
                  <option key={i}>{data}</option>
              ))}
            </select>
            <input
              name='postname'
              value={moimCommInfo.postname}
              placeholder='제목을 입력해주세요 (최대 30글자)'
              onChange={changeHandler}
              // ref={postnameRef}
            />
          </div>
          <div className='quill'>
          <QuillEditor moimCommInfo={moimCommInfo} setMoimCommInfo={setMoimCommInfo} setUploadedImages={setUploadedImages} contentRef={contentRef}/>
          </div>
        </div>
      
        <button className='MoimDetailBoard-Comm-WriteBox-btn'
                disabled={!moimCommSubmitCheck}
                onClick={moimCommContentHandler}
                style={{width:'100%'}}
        >완료</button>
      </div>
      

    </div>
  )
}

export default MoimDetailBoardCommComponent;