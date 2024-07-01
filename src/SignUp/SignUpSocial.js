import { useLocation, useNavigate } from 'react-router-dom';
import './SignUpSocial.css';
import { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import SignUpModal from './SignUpModal';
import TermsContents from './TermsContents';
import axios from 'axios';

const SignUpSocial = ({setIsAuth, setUserInfo})=>{
    const navigate = useNavigate();

    const location = useLocation(); // 소셜로그인 시도할때 서버에서 받아준 기본정보 navigator로 받아옴
    // const [snsJoinUser, setSnsJoinUser] = useState(location.state); // user 객체는 location.state안에 있음으로 해당 정보 userInfo에 넣어줌
    const [snsJoinUser, setSnsJoinUser] = useState(location.state.data);
    const [accessToken] = useState(location.state.accessToken);

    console.log('Access Token:', accessToken);

    const [newNickname, setNewNickname] = useState('');
    const [allChecked, setAllChecked] = useState(false);
    const [termsCK, setTermsCk] = useState({terms1: false, terms2: false, terms3: false});
    const nicknameRegex = /^[a-zA-Z가-힣0-9]{1,8}$/; // 닉네임 정규식
    const [nicknameRegexMsg, setNicknameRegexMsg] = useState(""); //닉네임 정규식 알림문구
    const [isNicknameChk,setIsNicknameChk] = useState(false); // 닉네임 중복 체크 여부
    const [signUpBtn, setSignUpBtn] = useState(false); // 회원가입 버튼 가능 여부


  
    // 약관 보기 모달 관련
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState(false);
    const [modalContent,setModalContent] = useState();
    const openModal = (contentKey) => {
      setModalTitle(contentKey === "infoTerms" ? "개인정보 수집 및 이용 동의" :"이용약관 동의");
      setModalContent(TermsContents[contentKey]);
      setModalOpen(true);
    };


    // 닉네임 변경 핸들러
    const inputChangeHandler = (e) => {
      setNewNickname(e.target.value);
      setIsNicknameChk(false);
      if (nicknameRegex.test(e.target.value)) {
        setNicknameRegexMsg("");
      } else {
        setNicknameRegexMsg("닉네임 형식을 확인해주세요");
      }
    }


    //닉네임 중복 체크
    const nicknameCheck = () => {
      if (nicknameRegex.test(newNickname)) {
        axiosInstance.post('/nicknameCheck', { nickname: newNickname })
          .then((response) => {
            if (response.data === "중복") {
              setIsNicknameChk(false);
              alert("중복된 닉네임이에요 변경해주세요");
            }else{
              setIsNicknameChk(true);
              alert("사용 가능한 닉네임이에요");
              setSnsJoinUser({...snsJoinUser, nickname :newNickname }); // 여기서 유저 객체에 업데이트
            }
          }).catch((error) => {
            alert('오류');
            console.log(error);
          });
      } else {
        alert("닉네임은 한글, 영어, 숫자를 포함한 8글자까지 가능합니다")
      }
    }
    
    console.log(snsJoinUser);
    // 전체 약관 체크
    const handleAllCheck = () => {
      const newAllChecked = !allChecked;
      setAllChecked(newAllChecked); //전체 약관 동의
      setTermsCk({terms1: newAllChecked, terms2: newAllChecked, terms3: newAllChecked}); // 개별 약관 동의
    };
    
    // 개별 약관 체크 핸들러
    const handleSingleCheck = (checkboxId) => {
      let value = termsCK[checkboxId];
      console.log(value);
      setTermsCk({...termsCK, [checkboxId] : !value});
    };

    // 전체 약관 체크 관련 반응작업
    useEffect(()=>{
      setAllChecked(Object.values(termsCK).every(Boolean));
    },[termsCK]);


    useEffect(()=>{
      if(allChecked && isNicknameChk){
        setSignUpBtn(true);
      }else{
        setSignUpBtn(false);
      }

    }, [allChecked, isNicknameChk])
    

// ✅✅ 회원가입정보 서버에 보내서 저장
  // const snsSignUpHandler = () => {
  //   axiosInstance.post('/oauth/join', snsJoinUser)
  //     .then((response) => {
  //       const jwt = response.headers.authorization;
  //       if (jwt) {
  //         const userInfo = response.data.member[0];
  //         sessionStorage.setItem('jwt', jwt);
  //         sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
  //         setUserInfo(response.data.member[0]);
  //         setIsAuth(true);
  //         navigator('/'); // 홈화면으로 이동
  //       }
  //     }).catch(error => {
  //       console.log(error);
  //       alert("😡로그인 실패😡");
  //     })
  // }
  const snsSignUpHandler = () => {
    const config = {
      headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  }
    // axiosInstance.post('/oauth/join', snsJoinUser, config)
    axios.post(`${process.env.REACT_APP_SERVER_URL}/oauth/join`, snsJoinUser)  

  
      .then((response) => {
        const jwt = response.headers.authorization;
        if (jwt) {
          const userInfo = response.data.member[0];
          sessionStorage.setItem('jwt', jwt);
          sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
          setUserInfo(response.data.member[0]);
          setIsAuth(true);
          navigate('/');
        }
      }).catch(error => {
        console.log(error);
        alert("😡로그인 실패😡");
      });
  };

  return (
    <div className="SignUp">
      <h3>회원가입</h3>

      <div className="signUpForm">

        <div className='inputWrapper'>닉네임</div>
        <div className='listContainer'>
          <input type='text' className='inputText_check' placeholder='사용 할 닉네임을 입력해주세요' maxLength={8} id="nickname" onChange={inputChangeHandler}></input>
          <button className='idCheck' onClick={nicknameCheck}>중복확인</button>
        </div>
        <div className='pwMsg' id='nicknameRegexMsg'>{newNickname !== "" && nicknameRegexMsg}</div>

        {/* ✅동의박스 */}
        <div className='listContainerLast'>
          <div className='TermsContainer'>
            <input type='checkbox' id='agreeAll' checked={allChecked} onChange={handleAllCheck}></input>
            <label className="AgreeTerms" htmlFor="agreeAll" style={{ fontSize: 'medium', fontWeight: '550' }}>
              <FontAwesomeIcon icon={faCheck} className="checkbox-icon" size='sm' />
              전체동의
            </label>
          </div>
          <div className='afterAgreeAll'></div>

          <div className='TermsContainer2'>
            <input type='checkbox' id='accessTerms' checked={termsCK.terms1} onChange={() => handleSingleCheck('terms1')}></input>
            <label className="AgreeTerms" htmlFor="accessTerms">
              <FontAwesomeIcon icon={faCheck} className="checkbox-icon" size='sm' />
              (필수) 이용약관 동의
              <button className='showTerms' onClick={() => openModal('accessTerms')}>보기</button>
            </label>
          </div>

          <div className='TermsContainer2'>
            <input type='checkbox' id='infoTerms' checked={termsCK.terms2} onChange={() => handleSingleCheck('terms2')}></input>
            <label className="AgreeTerms" htmlFor="infoTerms">
              <FontAwesomeIcon icon={faCheck} className="checkbox-icon" size='sm' />
              (필수) 개인정보 수집 및 이용 동의
              <button className='showTerms' onClick={() => openModal('infoTerms')}>보기</button>
            </label>
          </div>

          <div className='TermsContainer2'>
            <input type='checkbox' id='ageCheck' checked={termsCK.terms3} onChange={() => handleSingleCheck('terms3')}></input>
            <label className="AgreeTerms" htmlFor="ageCheck">
              <FontAwesomeIcon icon={faCheck} className="checkbox-icon" size='sm' />
              (필수) 만 14세 이상이며, 이용약관 동의
            </label>
          </div>
        </div>



        <div className='ModoSignUp'>
          <button className='SignUpBtn' disabled={!signUpBtn}
            onClick={snsSignUpHandler}
             style={{ backgroundColor: signUpBtn ? '#a472ff' : '#a2a2ac' }}>
            회원가입</button>
        </div>

      </div>

      <SignUpModal modalOpen={modalOpen} setModalOpen={setModalOpen} content={modalContent} title={modalTitle}/>

    </div>
  )
}

export default SignUpSocial;