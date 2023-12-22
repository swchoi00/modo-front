import './SignUp.css';
import modo from './SNSImage/modo.png';
import naver from './SNSImage/naver.png';
import kakao from './SNSImage/kakao.png';
import { useState } from 'react';
import Modal from './Modal';
import TermsContents from './TermsContents';

function SignUp() {


    const [modalContent, setModalContent] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = (contentKey) => {
        const content = TermsContents[contentKey];
        setModalContent(content);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <div className="SignUp">
            <h3>모도에 온 것을 환영해요!</h3>

            <div className="signUpForm">
                <br></br>
                <br></br>

                <div className='inputWrapper'>아이디 (이메일)</div>
                <div className='listContainer'>
                    <input type='text' className='inputText_check' placeholder='사용 할 이메일을 입력해주세요'></input>
                    &nbsp;<button className='idCheck'>중복확인</button>
                </div>

                <div className='inputWrapper'>비밀번호</div>
                <div className='listContainer'>
                    <input type='text' className='inputText' placeholder='영문, 숫자, 특수문자 조합 8자 이상 입력해주세요'></input>
                </div>

                <div className='inputWrapper'>비밀번호 확인</div>
                <div className='listContainer'>
                    <input type='text' className='inputText' placeholder='위에 입력한 비밀번호와 똑같이 입력해주세요'></input>
                </div>

                <div className='inputWrapper'>닉네임</div>
                <div className='listContainer'>
                    <input type='text' className='inputText_check' placeholder='사용 할 닉네임을 입력해주세요'></input>
                    &nbsp;<button className='idCheck'>중복확인</button>
                </div>

                <div className='listContainerLast'>
                    <div className='inputWrapper'>
                        <input type='checkbox' className='agreeAll' id='agreeAll'></input>
                        <label className='' for='agreeAll'>전체동의</label>
                    </div>
                    <div className='afterAgreeAll'></div>
                    <br></br>

                    <div className='TermsContainer'>
                        <div className='inputWrapper'>
                            <input type='checkbox' className='' id='accessTerms' ></input>
                            <label className='AgreeTerms' for='accessTerms'>(필수) 이용약관 동의</label>
                            <button className='showTerms' onClick={() => openModal('accessTerms')}>보기</button>
                        </div>
                    </div>

                    <div className='TermsContainer'>
                        <div className='inputWrapper'>
                            <input type='checkbox' className='' id='infoTerms' ></input>
                            <label className='AgreeTerms' for='infoTerms'>(필수) 개인정보 수집 및 이용 동의</label>
                            <button className='showTerms' onClick={() => openModal('infoTerms')}>보기</button>
                        </div>
                    </div>

                    <div className='TermsContainer'>
                        <div className='inputWrapper'>
                            <input type='checkbox' className='' id='ageCheck' ></input>
                            <label className='AgreeTerms' for='ageCheck'>(필수) 14세 이상입니다</label>
                        </div>
                    </div>
                </div>


                <div className='ModoSignUp'>
                    <button className='SignUpBtn'>회원가입</button>
                </div>

                <div className='KakaoSignUp'>
                    <button className='KakaoSignUpBtn'><img className='kakao' src="https://d2v80xjmx68n4w.cloudfront.net/assets/icon/icon_kakao.png"></img>카카오로 회원가입</button>
                </div>

                <div className='NaverSignUp'>
                    <button className='NaverSignUpBtn'><img className='naver' src={naver}></img>네이버로 회원가입</button>
                </div>

                <div className='GoogleSignUp'>
                    <button className='GoogleSignUpBtn'><img className='google' src="https://d2v80xjmx68n4w.cloudfront.net/assets/icon/icon_google.png" alt="sns아이콘"></img>구글로 회원가입</button>
                </div>

            </div>
            <Modal isOpen={isModalOpen} content={modalContent} onRequestClose={closeModal} />
        </div>
    )
}

export default SignUp;