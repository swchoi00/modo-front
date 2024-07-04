import { useParams } from "react-router-dom";
import MoimDetailHeader from "../MoimDetailComponent/MoimDetail-Header";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

const MoimGallery = ({isAuth, userInfo, moimInfo, setMoimInfo,currentPage ,setCurrentPage})=>{

  
  const {id} = useParams(); 
  const moimMenuCk = '갤러리';
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


  return(
    <div className='MoimDetail-container'> {/*  style={{overflowX: 'hidden'}} */}
      <MoimDetailHeader isAuth={isAuth} moimCategory = {moimInfo.category} moimName = {moimInfo.moimname} moimMenuCk={moimMenuCk} id={id}/>
      <div style={{height: '20rem',display:'flex' ,justifyContent: 'center', alignItems: 'center'}}> 갤러리는 준비중이에요 </div>
    </div>
  )
}

export default MoimGallery;

