import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from "react-router-dom";
import './MoimDetail-Header.css';
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

const MoimDetailHeader = ({ isAuth,moimCategory, moimName, moimMenuCk }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const moimDetailMenu = ['홈', '게시판', '갤러리', '채팅'];


    // 보안관련
    useEffect(() => {

        let page = window.location.href; 
        if (page !== `http://localhost:3000/moim/${id}/home`){ // 😡😡😡나중에 주소 바꿔줘야함
            let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
            if(userInfo.username !== ''){
                axiosInstance.get(`/getMoimMemberList/${id}`)
                .then((response) => {
                  let moimMemberList = response.data;
                  let matchingMember = moimMemberList?.find(memberInfo => memberInfo.member.id === userInfo?.id);  
                  if(!matchingMember){ //모임멤버 아닌 경우
                    alert("모임 가입 후 이용해주세요");
                    navigate(`/moim/${id}/home`);
                  }
                }).catch((error)=>{
                    console.log(error);
                });
            }else{
                alert("로그인 후 이용해주세요");
                navigate('/login');
            }
        }

        // axiosInstance.get(`/getMoimMemberList/${id}`)
        //     .then((response) => {
        //       let page = window.location.href;
        //       let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        //       let moimMemberList = response.data;
        //       let matchingMember = moimMemberList?.find(memberInfo => memberInfo.member.id === userInfo?.id); // 모임 멤버 확인
          
        //       // 😡😡😡나중에 주소 바꿔줘야함
        //       if (page !== `http://localhost:3000/moim/${id}/home`) { // 모임 메인 화면이 아닌 페이지를 url로 들어올 경우 (모임 메인 화면은 비회원도 볼 수 있음)
        //         if(isAuth){ //로그인 상태
        //             if(!matchingMember){ //모임멤버 아닌 경우
        //               alert("모임 가입 후 이용해주세요");
        //               navigate(`/moim/${id}/home`);
        //             }
        //         }else{ // 로그인 안한 상태
        //           alert("로그인 후 이용해주세요");
        //           navigate('/login');
        //         }
        //       }
        //     }).catch((error) => {
        //         console.log(error);
        //     });
    }, []);





    const moimMenuCkHandler = (e) => {
        let menu = e.target.textContent;
        switch (menu) {
            case '홈': navigate(`/moim/${id}/home`); break;
            case '게시판': navigate(`/moim/${id}/board`); break;
            case '갤러리': navigate(`/moim/${id}/gallery`); break;
            case '채팅': navigate(`/moim/${id}/chat`); break;
            default: break;
        }
    }




    return (
        <div className="moimDetail-headerContainer">
            <div className='moimDetail-headerBox'>
                <div className='moimDetail-header-beforeBtn' onClick={()=>navigate('/moim')} style={{cursor:'pointer'}}>{/* 목록 */}
                    <FontAwesomeIcon icon={faList} size='lg' style={{ color: '#6a60a9' }} />
                </div>
                <div className='moimDetail-header-category'>{moimCategory}</div>
                <div className='moimDetail-header-title'  onClick={()=>navigate(`/moim/${id}/home`)} style={{cursor:'pointer'}}>{moimName}</div>
            </div>

            <div className='moimDetail-moimMenuBox'>
                {
                    moimDetailMenu.map((data, i) => (
                        <div className={`moimDetail-moimMenu ${moimMenuCk === data ? 'moimDetail-moimMenu-ck' : ''}`}
                            onClick={moimMenuCkHandler}
                            key={i}>
                            {data}</div>
                    ))
                }
            </div>
        </div>
    )
}

export default MoimDetailHeader;
