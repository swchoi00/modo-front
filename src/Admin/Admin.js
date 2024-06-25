import { useState } from 'react';
import './Admin.css';
import axiosInstance from '../axiosInstance';
import AdminSidebar from './sidebar/AdminSidebar';
import AdminMember from './Member/AdminMember';
import AdminMoim from './Moim/AdminMoim';
import AdminComm from './Community/AdminComm';
import AdminFAQ from './FAQ/AdminFAQ';
import AdminInquiry from './Inquiry/AdminInquiry';
import AdminNotice from './Notice/AdminNotice';

const Admin = ({ isAuth, userInfo, currentPage, setCurrentPage }) => {
  const [selectedMenu, setSelectedMenu] = useState('login');
  const sidebarMenu = ['회원관리', '모임 관리', '커뮤니티 관리', 'FAQ 관리', '1:1문의 관리', '공지사항 관리'];

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const changeHandler = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  // ⭐⭐⭐ 로그인 정보 서버에 보내기
  const loginBtnHandler = () => {
    axiosInstance.post('/????????????????', loginData)
      .then((response) => {
        alert(response.data);
        setSelectedMenu('회원관리');
      }).catch((error) => {
        console.log(error);
      });
  }


  return (
    <>
      <AdminSidebar isAuth={isAuth} userInfo={userInfo} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} sidebarMenu={sidebarMenu} />
      <div className='Admin'>

        <div className='header'>
          <div>관리자 페이지</div>
          {
          userInfo.role === "ADMIN" && (
            <button onClick={() => setSelectedMenu('login')}>로그아웃</button>
          )}
        </div>
        {
          selectedMenu === 'login' &&
          <div className='login-box'>
            <h1 className='title'>로그인</h1>
            <form>
              <div className='log'>
                <div className='idpw'>
                  <div>아이디</div>
                  <input type='text' name='id' onChange={changeHandler} />
                  <div>비밀번호</div>
                  <input type='password' name='pw' onChange={changeHandler} />
                </div>
                <button type='submit' className='loginBtn' onClick={loginBtnHandler}>로그인 하기</button>
              </div>
            </form>
          </div>
        }
        {
          selectedMenu === '회원관리' &&
          <AdminMember selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        }
        {
          selectedMenu === '모임 관리' &&
          <AdminMoim selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        }
        {
          selectedMenu === '커뮤니티 관리' &&
          <AdminComm selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        }
        {
          selectedMenu === 'FAQ 관리' &&
          <AdminFAQ selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        }
        {
          selectedMenu === '1:1문의 관리' &&
          <AdminInquiry selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        }
        {
          selectedMenu === '공지사항 관리' &&
          <AdminNotice selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        }




      </div>
    </>
  )
}

export default Admin;