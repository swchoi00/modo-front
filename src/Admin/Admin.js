import { useEffect, useState } from 'react';
import './Admin.css';
import axiosInstance from '../axiosInstance';
import AdminSidebar from './sidebar/AdminSidebar';
import AdminMember from './Member/AdminMember';
import AdminMoim from './Moim/AdminMoim';
import AdminComm from './Community/AdminComm';
import AdminFAQ from './FAQ/AdminFAQ';
import AdminInquiry from './Inquiry/AdminInquiry';
import AdminNotice from './Notice/AdminNotice';
import { useNavigate } from 'react-router-dom';

const Admin = ({ isAuth, setIsAuth, userInfo, setUserInfo, currentPage, setCurrentPage }) => {
  const [selectedMenu, setSelectedMenu] = useState(() => sessionStorage.getItem('selectedMenu'));
  const sidebarMenu = ['회원관리', '모임 관리', '커뮤니티 관리', 'FAQ 관리', '1:1문의 관리', '공지사항 관리'];

  const navigate = useNavigate();

  useEffect(() => {
    const storedAdminInfo = sessionStorage.getItem('adminInfo');
    if (storedAdminInfo) {
      const userInfoObject = JSON.parse(storedAdminInfo)
      setUserInfo(userInfoObject);
    }
  },[]);

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  useEffect(() => {
    sessionStorage.setItem('selectedMenu', selectedMenu);
    

  }, [selectedMenu]);

  useEffect(() => {
    if(isAuth) {
      if(userInfo.username !== 'admin') {
        navigate('/');
      }
      
    }

  })



  const changeHandler = (e) => {
    setLoginData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
    console.log(loginData);
  };

  // ⭐⭐⭐ 로그인 정보 서버에 보내기
  const loginBtnHandler = (e) => {
    e.preventDefault(); // 새로고침 방지
    console.log(loginData);
    axiosInstance.post('/adminLogin', loginData)
      .then((response) => {

        console.log(response.data);
        const jwt = response.headers.authorization;
        const adminInfo = response.data.admin[0];
        sessionStorage.setItem('jwt', jwt);
        sessionStorage.setItem('adminInfo', JSON.stringify(adminInfo));
        setUserInfo(response.data.admin[0]);
        setIsAuth(true)

        alert("관리자 로그인 완료");
        setSelectedMenu('회원관리');
      }).catch((error) => {

        if (error.response && error.response.status === 401) {
          alert("관리자만 로그인 할 수 있습니다");
          navigate('/');
          setUserInfo({username : ''});
        } else {
          console.error("로그인 오류:", error);
        }
      });
  };

  console.log(userInfo);

  const adminLogoutHandler = () => {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('adminInfo');
    setSelectedMenu('login');
    setUserInfo({username : '', password : ''});
  }

  console.log(userInfo);
  console.log(userInfo.role);

  return (
    <>
      <AdminSidebar isAuth={isAuth} userInfo={userInfo} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} sidebarMenu={sidebarMenu} />
      <div className='Admin'>
        <div className='header'>
          <div>관리자 페이지</div>
          {
          userInfo.role === "ADMIN" && (
            <button onClick={() => adminLogoutHandler()}>로그아웃</button>
          )}
        </div>
        {
          userInfo.username === '' &&
          <div className='login-box'>
            <h1 className='title'>로그인</h1>
            <form>
              <div className='log'>
                <div className='idpw'>
                  <div>아이디</div>
                  <input type='text' name='username' onChange={changeHandler} />
                  <div>비밀번호</div>
                  <input type='password' name='password' onChange={changeHandler} />
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
          <AdminInquiry userInfo={userInfo} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        }
        {
          selectedMenu === '공지사항 관리' &&
          <AdminNotice selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        }
      </div>
    </>
  );
};

export default Admin;
