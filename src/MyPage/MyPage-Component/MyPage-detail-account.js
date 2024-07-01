import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera,faXmark } from '@fortawesome/free-solid-svg-icons';
import './MyPage-detail-account.css';
import axiosInstance from '../../axiosInstance';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 계정 설정 페이지
const MyPageDetailAccount = ({userInfo, setUserInfo, setIsAuth})=>{
  const navigate = useNavigate();
  const userEmail = (username) => {return username.replace(/^\([ng]\)/, '');}; // 이메일 앞에 (n) 이런거 제거하는 정규식
  const [isUpdate,setIsUpdate] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);// [미리보기용] 이미지 주소 저장 경로 
  const [uploadImg, setUploadImg] = useState(null); // 모임 사진파일 저장하는 스테이트
  const profileImgUrl = 'https://raw.githubusercontent.com/Jella-o312/modo-image/main/etc/userImgNone.svg';
  // const PhotoType = {MAIN: 'main', SCHEDULE: 'schedule', GALLERY: 'gallery'}; // 사진타입 정리(나중에 저장할 때 사용);

  const [nickNameUpdate, setNickNameUpdate] = useState(false); // 닉네임 수정 버튼 상태 
  const [passwordUpdate, setPasswordUpdate] = useState(false); // 비밀번호 수정 버튼 상태



  // [이미지] 클릭해서 파일 업로드 할때 사용하는 핸들러
  const onChangeImage= (e) => {
    const file = e.target.files[0];
    setUploadImg(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // 이미지 주소 저장
    reader.onloadend = () => {setImageUrl(reader.result);};

    setIsUpdate(true);
  };

  // [이미지] 프로필 이미지 업데이트 할 때 핸들러
  const saveImgHandler = ()=>{
    alert("프로필 이미지 변경 작업 해야함");
    setIsUpdate(false);
  }
  
  // [이미지] 업로드한 모임 이미지 취소할때 버튼 핸들러
  const uploadCancleHandler = ()=>{
    setImageUrl(null);  // [미리보기용] 여기에 이미지 경로가 저장되어 있음
    setUploadImg(null); //[저장용] 이미지 파일 있음
    setIsUpdate(false);
  }


  //✅닉네임, 비밀번호 관련 스테이트
  const nicknameRegex = /^[a-zA-Z가-힣0-9]{1,8}$/; // 닉네임 정규식
  const passwordRegex = /^(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{8,}$/; // 비밀번호 정규식
  const [nicknameRegexMsg, setNicknameRegexMsg] = useState(""); // 닉네임 하단 알림 메세지
  const [nicknameOk, setNicknameOk] = useState(false);
  const [isNicknameChk,setIsNicknameChk] = useState(false); // 닉네임 중복체크 여부
  const [pwMsg, setPwMsg] = useState(""); // 기존 비밀번호 확인 하단 알림 메세지
  const [pwNewMsg, setPwNewMsg] = useState(""); // 새로운 비밀번호 정규식 하단 알림 메세지
  const [pwNewMsg2, setPwNewMsg2] = useState(""); // 새로운 비밀번호 확인 여부 메세지
  const [pwCheck, setPwCheck] = useState({'before': '', 'new': '', 'new2': ''}); // 비밀번호 변경용
  const [updateData, setUpdateData] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // 닉네임 수정 취소 버튼
  const cancleNicknameHandler = ()=>{
    setNickNameUpdate(false); 
    setNicknameRegexMsg(''); 
    setIsNicknameChk(false); 
    setNicknameOk(false)
    setUpdateData({...updateData, nickname: ''});
  }

  // 닉네임 입력 핸들러
  const incknameChangeHandler = (e) => {
    let { id, value } = e.target;
    if(nicknameRegex.test(value)) {
        setNicknameRegexMsg('');
        setIsNicknameChk(false);
        setUpdateData({...updateData,[id]: value});
        setNicknameOk(true);
    } else {
      setUpdateData({...updateData,[id]: ''});
        setNicknameRegexMsg("*특수문자 제외 8글자 이내로 작성해주세요");
        setNicknameOk(false);
    }
  }

// 닉네임 중복확인 핸들러
const nicknameCheck = () => {
  axiosInstance.post('/nicknameCheck', { nickname: updateData.nickname })
    .then((response) => {
        if (response.data === "가능") {
            alert("사용가능한 닉네임이에요");
            setIsNicknameChk(true);
            setNicknameRegexMsg('');
        }else{
          setIsNicknameChk(true);
          setNicknameRegexMsg("중복된 닉네임이에요");
        }
    }).catch((error) => {
        console.log(error);
    });
}


  // 닉네임 변경 저장 핸들러
  const submitNickname = ()=>{
    if(updateData.nickname === undefined ||updateData.nickname === ''){
      setNicknameRegexMsg("새로운 닉네임을 입력해주세요");
      return;
    }else if(!isNicknameChk){
      alert("*닉네임 중복확인 후 저장해주세요");
      return;
    }else{
      let updateUserInfo = {id : userInfo.id,nickname : updateData.nickname, username : userInfo.username};
      axiosInstance.post('/updateInfo', updateUserInfo)
      .then((response) => {
          setNickNameUpdate(false);
          setUserInfo({...userInfo, 'nickname' : updateData.nickname});
          alert(response.data);
      }).catch((error) => {
          console.log(error);
      });
    }
  }

  // 비밀번호 수정 취소 버튼
  const canclePasswordHandler = ()=>{
    setShowPassword(false);
    setPasswordUpdate(false); 
    setPwNewMsg(''); 
    setPwNewMsg2(''); 
    setPwCheck({'before': '', 'new': '', 'new2': ''});
    setUpdateData({...updateData, beforePassword: '', newPassword: '', newPassword2: '' });
  }


  // 비밀번호 입력 핸들러
  const passwordChangeHandler = (e)=>{
    let { id, value } = e.target;
    
    if(id === 'newPassword'){
      if(passwordRegex.test(value)) {
        setPwNewMsg('');
        setPwCheck({...pwCheck, 'new' : true}); // 정규식 통과하면 true값으로 변경
        setUpdateData({...updateData,[id]: value});
        
        if(updateData.newPassword2 !== ''){ // 새로운 비밀 번호 바꼈을 때 확인 비밀번호 값과 확인 한 번 더
          if(value === updateData.newPassword2) {
            setPwNewMsg2('');
            setPwCheck({...pwCheck, 'new' : true, 'new2' : true}); // 정규식 통과하면 true값으로 변경
            setUpdateData({...updateData,[id]: value});
          } else {
            setPwNewMsg2("*새로운 비밀번호가 일치하지 않아요");
            setPwCheck({...pwCheck, 'new' : true, 'new2' : false}); // 정규식 통과하면 true값으로 변경
          }
        }
      } else {
        setPwNewMsg("*영문, 숫자, 특수문자 조합 8자 이상으로 작성해주세요");
        setPwCheck({...pwCheck, 'new' : false}); // 정규식 통과하면 true값으로 변경
      }
    }else if(id === 'newPassword2'){
      if(updateData.newPassword === value) {
        setPwNewMsg2('');
        setPwCheck({...pwCheck, 'new2' : true}); // 정규식 통과하면 true값으로 변경
        setUpdateData({...updateData,[id]: value});
      } else {
        setPwNewMsg2("*새로운 비밀번호가 일치하지 않아요");
        setPwCheck({...pwCheck, 'new2' : false}); // 정규식 통과하면 true값으로 변경
      }
    }else{
      setUpdateData({...updateData,[id]: value});
      setPwMsg("");
    }
  };



  // 비밀번호 변경 저장 핸들러
  const submitPasswordHandler = ()=>{
    let beforePass = updateData.beforePassword;

    if(pwCheck.new === '' || pwCheck.new === false || pwCheck.new2 === '' || pwCheck.new2 === false){
      alert("새로운 비밀번호를 제대로 입력해주세요");
    }else{
      //여기에 입력한 비밀번호랑 기존 비밀번호랑 일치하는지 확인해야함
      axiosInstance.post('/passwordCheck',  {id : userInfo.id, password: beforePass})
      .then((response)=>{
        if(response.data){
          // 새로운 비밀번호 저장 하는 작업
          axiosInstance.post('/updateInfo',  {id : userInfo.id,username : userInfo.username, password: updateData.newPassword})
            .then((response) => {
                alert(response.data);
                canclePasswordHandler();
            }).catch((error) => {
                alert(error);
            });
        }else{
          setPwMsg("*기존 비밀번호를 확인해주세요");
        }
      }).catch((error)=>{
        console.log(error);
      })
    }
  }

// 회원 탈퇴 핸들러 (상운)
  const deleteAccountHandler = ()=>{
    let answer = window.confirm("탈퇴하시겠습니까? 탈퇴한 계정은 복구할 수 없습니다 🥲");
    if(answer){
      axiosInstance.delete(`deleteAccount/${userInfo.id}`)
      .catch((response)=>{
        alert(response.data); // 서버에서 회원 탈퇴 완료 메세지 보내주기
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('userInfo');
        sessionStorage.removeItem('myPage');
        setUserInfo({
          username : '',
          nickname : ''
        });
        setIsAuth(false);
        navigate('/');
      })

    }
  }

  return(
    <div id='myPageAccount'>
     <div className='profileImg'>
      {/* 업데이트 중 상태가 아니면 프로필 이미지 업로드 (회원 가입 시 기존이미지 다 똑같이 들어가게 만들기)*/}
      <label className='imgBox' style={{backgroundImage: isUpdate ? `url(${imageUrl})` : `url(${profileImgUrl})`}}>
        <span hidden={isUpdate}><FontAwesomeIcon icon={faCamera} size='1x' style={{color: '#A29EBE'}}/></span>
        <input type="file" accept='image/*' onChange={onChangeImage}  hidden/>   
      </label>
      {
        isUpdate &&
        <div className='imgUpdate'>
          <button onClick={saveImgHandler} style={{backgroundColor: '#a472ff', color:'white'}}>저장</button>
          <button onClick={uploadCancleHandler}>취소</button>
        </div>
      }
     </div>

     <div className='profileInfo'>
      <div className='nicknameBox'>
        <div className='title'>
          <h5>닉네임</h5>
          {
            nickNameUpdate ?
            <div>
              <span className='updateBtn' onClick={submitNickname}>저장</span>
              <span className='cancleBtn' onClick={cancleNicknameHandler}>취소</span>
            </div>
            :
            <span className='updateBtn' onClick={()=>setNickNameUpdate(true)}>수정</span>
          }
        </div>
        {
          nickNameUpdate ?
          <div>
            <div className='updateInput'>
              <input placeholder={userInfo.nickname} id="nickname" onChange={incknameChangeHandler}/>
              <button hidden={nicknameRegexMsg !== '' || !nicknameOk} onClick={nicknameCheck}>중복확인</button>
            </div>
            <span className='regexText' hidden={nicknameRegexMsg === ''}>{nicknameRegexMsg}</span>
          </div>
          :
          <span className='titleValue'>{userInfo.nickname}</span>
        }
      </div>

      <div className='nicknameBox'>
        <div className='title'>
          <h5>이메일 <span style={{fontSize: 'small', color: 'gray', fontWeight: 'normal'}}>*이메일은 수정이 불가능 해요</span></h5>
        </div>
        <span className='titleValue'>{userEmail(userInfo.username)}</span>
      </div>
      
      {
        // 여기에 oauth 값이 modo인것만 보여주기 추가해야함
        userInfo.oauth === "MODO" &&
        <div className='nicknameBox'>
          <div className='title'>
            <h5>비밀번호</h5>
            {
              passwordUpdate ?
              <div>
                <span className='updateBtn' onClick={submitPasswordHandler}>저장</span>
                <span className='cancleBtn' onClick={canclePasswordHandler}>취소</span>
              </div>
              :
              <span className='updateBtn' onClick={()=>setPasswordUpdate(true)}>수정</span>
            }
          </div>
          {
            passwordUpdate ?
            <div className='passwordUpdateBox'>
              <div className='password'>
                <b>기존 비밀번호</b>
                <div className='updateInput'>
                  <input type='password' placeholder="기존 비밀번호를 입력해주세요" id="beforePassword" onChange={passwordChangeHandler}/>
                </div>
                <span className='regexText' hidden={pwMsg === ''}>{pwMsg}</span>
              </div>
              <div className='password'>
                <b>새로운 비밀번호</b>
                <div className='updateInput'>
                  <input type={showPassword ? 'text' : 'password'} placeholder="영문, 숫자, 특수문자 조합 8자 이상으로 작성해주세요" id="newPassword" onChange={passwordChangeHandler}/>
                    <button className='showPwd' onClick={()=>setShowPassword(!showPassword)}>
                        {showPassword ? '숨김' : '표시'}
                    </button>
                </div>
                <span className='regexText' hidden={pwNewMsg === ''}>*영문, 숫자, 특수문자 조합 8자 이상이어야 해요</span>
              </div>
              <div className='password'>
                <b>새로운 비밀번호 확인</b>
                <div className='updateInput'>
                  <input type='password' id="newPassword2" placeholder="새로운 비밀번호를 한 번 더 입력해주세요"onChange={passwordChangeHandler}/>
                </div>
                <span className='regexText' hidden={pwNewMsg2 === ''}>*비밀번호가 일치하지 않아요</span>
              </div>
            </div>
            :
            <span className='titleValue'>**********</span>
          }
        </div>
      }
     </div>

     <div className='deleteAccountBtn' onClick={deleteAccountHandler}>회원탈퇴</div>

    </div>
  )
}

export default MyPageDetailAccount;