import './SignUp.css';
import modo from './SNSImage/modo.png';
import naver from './SNSImage/naver.png';
import kakao from './SNSImage/kakao.png';
import { useState } from 'react';
import Modal from './Modal';
import TermsContents from './TermsContents';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';

function SignUp() {


    const [modalContent, setModalContent] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const navigate = useNavigate();

    const openModal = (contentKey) => {
        const content = TermsContents[contentKey];
        setModalContent(content);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    }

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const [memberData, setMemberData] = useState({
        username: '',
        password: '',
        pwCheck: '',
        nickname: '',
        // 나중에 entity 항목 변경 시 추가해야함
    })

    const [isUsernameChk, setIsUsernameChk] = useState(false); // 아이디 중복확인 여부 (했을 시 true)
    const [isNickNameChk, setIsNicknameChk] = useState(false); // 닉네임 중복확인 여부 
    const [isPasswordChk, setIsPasswordChk] = useState(false); // 비밀번호 확인 여부

    const [isUsernameInspected, setIsUsernameInspected] = useState(false); // 아이디 정규식 확인
    const [isNicknameInspected, setIsNicknameInspected] = useState(false); // 닉네임 정규식 확인
    const [isPasswordInspected, setIsPasswordInspected] = useState(false); // 비밀번호 정규식 확인


    // 아이디 정규식 어떻게 할건지 상의 const usernameRegex = ?
    const usernameRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // 닉네임 정규식
    const nicknameRegex = /^[a-zA-Z가-힣0-9]{1,8}$/;
    // 대소문자까지 들어가는 정규식 /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{8,}$/;

    const [allChecked, setAllChecked] = useState(false);
    const [accessTermsChecked, setAccessTermsChecked] = useState(false);
    const [infoTermsChecked, setInfoTermsChecked] = useState(false);
    const [ageCheckChecked, setAgeCheckChecked] = useState(false);

    const handleAllCheck = () => {
        const newAllChecked = !allChecked;
        setAllChecked(newAllChecked);
        setAccessTermsChecked(newAllChecked);
        setInfoTermsChecked(newAllChecked);
        setAgeCheckChecked(newAllChecked);
    };

    const handleSingleCheck = (checkboxId) => {
        switch (checkboxId) {
            case 'accessTerms':
                setAccessTermsChecked(!accessTermsChecked);
                break;
            case 'infoTerms':
                setInfoTermsChecked(!infoTermsChecked);
                break;
            case 'ageCheck':
                setAgeCheckChecked(!ageCheckChecked);
                break;
            default:
                break;
        }
    
        // 하나라도 선택된 경우 전체동의 해제
        setAllChecked(false);
    };


    const [pwChkMsg, setPwChkMsg] = useState("");
    const [pwRegexMsg, setPwRegexMsg] = useState("");
    const [usernameRegexMsg, setUsernameRegexMsg] = useState("");
    const [nicknameRegexMsg, setNicknameRegexMsg] = useState("");

    const checkPasswordMatch = () => {
        const pwMsgElement = document.getElementById("pwMsg");

        if (memberData.password !== memberData.pwCheck) {
            setPwChkMsg("비밀번호가 일치하지 않습니다");
            setIsPasswordChk(false);
            pwMsgElement.classList.remove("success");
        } else if (memberData.pwCheck === "") {
            setPwChkMsg("");
            pwMsgElement.classList.remove("success");
        } else {
            setPwChkMsg("비밀번호가 같습니다 !");
            setIsPasswordChk(true);
            pwMsgElement.classList.add("success");
        }
    };

    const inputChangeHandler = (e) => {
        const { id, value } = e.target;
        setMemberData({
            ...memberData,
            [id]: value
        });

        const pwMsgElement = document.getElementById("pwMsg");

        console.log("ID:", id);
        console.log("Value:", value);
        console.log("pwMsgElement:", pwMsgElement);

        if (pwMsgElement) {
            if (id === "username") {
                if(usernameRegex.test(value)) {
                    setIsUsernameInspected(true);
                    setUsernameRegexMsg("")
                } else {
                    setIsUsernameInspected(false);
                    setUsernameRegexMsg("아이디 형식을 확인해주세요")
                }
            }

            if (id === "nickname") {
                if(nicknameRegex.test(value)) {
                    setIsNicknameInspected(true);
                    setNicknameRegexMsg("");
                } else {
                    setIsNicknameInspected(false);
                    setNicknameRegexMsg("닉네임 형식을 확인해주세요")
                }
            }

            if (id === "password") {
                if (passwordRegex.test(value)) {
                    setIsPasswordInspected(true)
                    setPwRegexMsg("")
                } else {
                    setIsPasswordInspected(false);
                    setPwRegexMsg("영문, 숫자, 특수문자 조합 8자 이상이어야 합니다!")
                }

            }

            if (id === "pwCheck" && memberData.password !== value) {
                setPwChkMsg("비밀번호가 일치하지 않습니다");
                setIsPasswordChk(false);
                pwMsgElement.classList.remove("success");
            } else if (id === "pwCheck" && memberData.password === value) {
                setPwChkMsg("비밀번호가 같습니다 !");
                setIsPasswordChk(true);
                pwMsgElement.classList.add("success");
            } else if (memberData.pwCheck === "") {
                setPwChkMsg("");
                pwMsgElement.classList.remove("success");
            }
        }
    }

    const usernameCheck = () => {
        if (usernameRegex.test(memberData.username)) {
            axiosInstance.post('/usernameCheck', { username: memberData.username })
                .then((response) => {
                    if (response.status === 200) {
                        alert(response.data);
                        setIsUsernameChk(true);
                    }
                }).catch((error) => {
                    alert(error.response.data);
                });
        } else {
            alert("아이디 형식을 확인하세요");

        }
    }

    const nicknameCheck = () => {
        if (nicknameRegex.test(memberData.nickname)) {
            axiosInstance.post('/nicknameCheck', { nickname: memberData.nickname })
                .then((response) => {
                    if (response.status === 200) {
                        alert(response.data);
                        setIsNicknameChk(true);
                    }
                }).catch((error) => {
                    alert('오류');
                });
        } else {
            alert("닉네임은 한글, 영어, 숫자를 포함한 8글자까지 가능합니다")
        }
    }

    const signUpHandler = (e) => {
        e.preventDefault();

        let blankField = true;

        for (let id in memberData) {
            if (memberData[id] === "") {
                blankField = false;
                break;
            }
        }
        if (blankField && isUsernameChk && isUsernameInspected && isPasswordChk && isPasswordInspected
            && isNickNameChk && isNicknameInspected && accessTermsChecked && infoTermsChecked && ageCheckChecked) {

            alert("모도 회원가입 완료!");

            axiosInstance.post('/signup', memberData)
                .then((response) => {
                    console.log(response.data);
                }).catch((error) => {
                    console.log(error);
                })
            navigate('/');
        } else if (!blankField) {
            alert('빈 칸 확인');
        } else if (!isUsernameChk) {
            alert('아이디 중복확인');
        } else if (!isUsernameInspected) {
            alert('아이디 형식을 확인하세요');
        } else if (!isPasswordChk) {
            alert('비밀번호가 다릅니다');
        } else if (!isPasswordInspected) {
            alert('비밀번호 형식을 확인하세요');
        } else if (!isNickNameChk) {
            alert('닉네임 중복확인');
        } else if (!isNicknameInspected) {
            alert('닉네임 형식을 확인하세요');
        } else if (!accessTermsChecked) {
            alert('이용약관 동의');
        } else if (!infoTermsChecked) {
            alert('개인정보 수집 및 이용동의');
        } else if (!ageCheckChecked) {
            alert('14세 이상 확인')
        }
    }


    return (
        <div className="SignUp">
            <h3>모도에 온 것을 환영해요!</h3>

            <div className="signUpForm">
                <br></br>
                <br></br>

                <div className='inputWrapper'>아이디 (이메일)</div>
                <div className='listContainer'>
                    <input type='text' className='inputText_check' placeholder='사용 할 이메일을 입력해주세요' id="username" onChange={inputChangeHandler}></input>
                    &nbsp;<button className='idCheck' onClick={usernameCheck}>중복확인</button>
                </div>
                    <div className='pwMsg' id='usernameRegexMsg'>{memberData.username !== "" && usernameRegexMsg}</div>

                <div className='inputWrapper'>비밀번호</div>
                <div className='listContainer'>
                    <input type={showPassword ? 'text' : 'password'} className='inputText' id="password" onChange={inputChangeHandler} placeholder='영문, 숫자, 특수문자 조합 8자 이상 입력해주세요'></input>
                    <button className='showPwd' onClick={togglePasswordVisibility}>
                        {showPassword ? '숨김' : '표시'}
                    </button>
                </div>
                    <div className='pwMsg' id='pwRegexMsg'>{memberData.password !== "" && pwRegexMsg}</div>


                <div className='inputWrapper'>비밀번호 확인</div>
                <div className='listContainer_pwCheck'>
                    <input type={showPassword ? 'text' : 'password'} className='inputText' id="pwCheck" onChange={inputChangeHandler} placeholder='위에 입력한 비밀번호와 똑같이 입력해주세요'></input>
                </div>
                <div className='pwMsg' id='pwMsg'>{memberData.pwCheck !== "" && pwChkMsg}</div>

                <div className='inputWrapper'>닉네임</div>
                <div className='listContainer'>
                    <input type='text' className='inputText_check' placeholder='사용 할 닉네임을 입력해주세요' maxLength={8} id="nickname" onChange={inputChangeHandler}></input>
                    &nbsp;<button className='idCheck' onClick={nicknameCheck}>중복확인</button>
                </div>
                    <div className='pwMsg' id='nicknameRegexMsg'>{memberData.nickname !== "" && nicknameRegexMsg}</div>

                <div className='listContainerLast'>
                    <div className='inputWrapper'>
                        <input type='checkbox' className='agreeAll' id='agreeAll' checked={allChecked} onChange={handleAllCheck}></input>
                        <label className='' for='agreeAll'>전체동의</label>
                    </div>
                    <div className='afterAgreeAll'></div>
                    <br></br>

                    <div className='TermsContainer'>
                        <div className='inputWrapper'>
                            <input type='checkbox' className='' id='accessTerms' checked={accessTermsChecked} onChange={() => handleSingleCheck('accessTerms')}></input>
                            <label className='AgreeTerms' for='accessTerms'>(필수) 이용약관 동의</label>
                            <button className='showTerms' onClick={() => openModal('accessTerms')}>보기</button>
                        </div>
                    </div>

                    <div className='TermsContainer'>
                        <div className='inputWrapper'>
                            <input type='checkbox' className='' id='infoTerms' checked={infoTermsChecked} onChange={() => handleSingleCheck('infoTerms')} ></input>
                            <label className='AgreeTerms' for='infoTerms'>(필수) 개인정보 수집 및 이용 동의</label>
                            <button className='showTerms' onClick={() => openModal('infoTerms')}>보기</button>
                        </div>
                    </div>

                    <div className='TermsContainer'>
                        <div className='inputWrapper'>
                            <input type='checkbox' className='' id='ageCheck' checked={ageCheckChecked} onChange={() => handleSingleCheck('ageCheck')}></input>
                            <label className='AgreeTerms' for='ageCheck'>(필수) 14세 이상입니다</label>
                        </div>
                    </div>
                </div>


                <div className='ModoSignUp'>
                    <button className='SignUpBtn' onClick={signUpHandler}>회원가입</button>
                </div>

                <div className='KakaoSignUp'>
                    <button className='KakaoSignUpBtn'
                        onClick={() => {
                            window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`
                        }}
                    ><img className='kakao' src="https://d2v80xjmx68n4w.cloudfront.net/assets/icon/icon_kakao.png"></img>카카오로 회원가입</button>
                </div>

                <div className='NaverSignUp'>
                    <button className='NaverSignUpBtn'
                        onClick={() => {
                            window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&state=${process.env.REACT_APP_NAVER_STATE}&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}`
                        }}> <img className='naver' src={naver}></img>네이버로 회원가입</button>
                </div>
                
        


                <div className='GoogleSignUp'>
                    <button className='GoogleSignUpBtn'
                        onClick={() => {
                            window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=token&scope=openid%20email%20profile`;
                        }}
                    ><img className='google' src="https://d2v80xjmx68n4w.cloudfront.net/assets/icon/icon_google.png" alt="sns아이콘"></img>구글로 회원가입</button>
                </div>

            </div>
            <Modal isOpen={isModalOpen} content={modalContent} onRequestClose={closeModal} />
        </div>
    )
}

export default SignUp;