import { useParams } from "react-router-dom";
import MoimDetailHeader from "../MoimDetailComponent/MoimDetail-Header";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import MoimDetailBoard from "../MoimDetailComponent/MoimDetail-Board";

const MoimBoard = ({isAuth, userInfo, moimInfo, setMoimInfo,currentPage ,setCurrentPage})=>{
 
  const {id} = useParams(); 
  const moimMenuCk = '게시판';
  // 모임장, 매니저, 모임원 여부
  const [moimMemberRole, setMoimMemberRole] = useState(null);
  // 모임멤버 리스트
  const [moimMemberList,setMoimMemberList] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false); 

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


  
//모임 멤버 가져오는거
useEffect(()=>{
  axiosInstance.get(`/getMoimMemberList/${id}`)
  .then((response)=>{
    setMoimMemberList(response.data);
  }).catch((error)=>{
    console.log(error);
  }
)
},[id,setMoimMemberList]);


// 모임 role확인
useEffect(()=>{
  const matchingMember = moimMemberList?.find(memberInfo => memberInfo.member.id === userInfo.id);
  if(!matchingMember){ //로그인 안하거나, 회원이 아닌 경우
    setMoimMemberRole('notMember');
    return;
  }

  switch(matchingMember.memberRole) {
    case 'leader' : setMoimMemberRole('leader'); break;
    case 'manager' : setMoimMemberRole('manager'); break;
    case 'member' : setMoimMemberRole('member'); break;
    default:  break;
  }
},[isAuth, userInfo, moimMemberList]);

  return(
    <div className='MoimDetail-container' style={{overflowX: 'hidden'}}>
      <MoimDetailHeader moimCategory = {moimInfo.category} moimName = {moimInfo.moimname} moimMenuCk={moimMenuCk} id={id}/>
      
      <MoimDetailBoard moimInfo={moimInfo} currentPage={currentPage} setCurrentPage={setCurrentPage} id={id}
                                                      moimMemberRole={moimMemberRole} isAuth={isAuth} userInfo={userInfo}
      />
    </div>
  )
}

export default MoimBoard;