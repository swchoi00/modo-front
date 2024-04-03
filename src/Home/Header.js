
import './Header.css';
import modoLogo from '../modo-logo.svg';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; 
import { faXmark } from '@fortawesome/free-solid-svg-icons'; 
import {faPen} from '@fortawesome/free-solid-svg-icons'; 
import { Link, useNavigate } from 'react-router-dom';
import face from '../HomeComponent/ReviewComponent/face.svg';

const Header = ( {isAuth, setIsAuth, userInfo} ) =>{

  const navigate = useNavigate();

  //모바일 버거버튼 여부
  const[isMenuOpen, setIsMenuOpen]= useState(false); 

  // 모바일 버거버튼여부 바꾸는 핸들러
  const handleMenuOpen = () =>{
    setIsMenuOpen(!isMenuOpen)
  };

  const logoutHandler = () => {
    sessionStorage.removeItem('jwt');
    setIsAuth(false);
    navigate('/');
  }


  return(
    <div className="HeaderContainer">
      <div id='HeaderDesktop'>
        <div className="header-logo">
          <Link  to = {"/"}><img className="nav-logo" src={modoLogo} alt="홈화면으로 가기" /></Link>
        </div>

        <div className='nav-menu'>
          <Link className='nav-aTag' to = {"/moim"} >소모임</Link>
          <Link className='nav-aTag' to = {"/"}>멘토링</Link>
          <Link className='nav-aTag' to = {"/community"}>커뮤니티</Link>
          <Link className='nav-aTag' to = {"/faq"}>FAQ</Link>
        </div>

        <div className='nav-searchBar'>        
          <input className='nav-search-input' placeholder='관심사 검색하기'/>
          <span><FontAwesomeIcon icon={faSearch} style={{color:'#9c9c9c'}}/></span>    
          
        </div>

        <div className='nav-joinLogin'>

          {isAuth ? 
          <>
          <Link className='nav-aTag' to={"/myPage"}>{userInfo.nickname}님</Link>
          <button className='nav-logoutBtn' onClick={logoutHandler}>로그아웃</button>
          </>
          :  
          <>
          <Link className='nav-aTag' to = {"/signUp"}>회원가입</Link>
          <Link className='nav-loginBtn' to = {"/login"}>로그인</Link>
          </>
          }
        </div>
      </div>




      <div id='HeaderMobile'>
        <div className="header-logo headerMoblie-logo"> 
          <Link  to = {"/"}>
            <img className="nav-logo" src={modoLogo} alt="홈화면으로 가기" />
          </Link>
        </div>

        {/* 모바일 메뉴 버튼 모양 */}
        <div className="headerMoblieBtn" onClick={handleMenuOpen}>
          {isMenuOpen ? (
            <FontAwesomeIcon icon={faXmark} style={{color:'#575757', fontSize: 'x-large'}}/>
            ) : (
            <FontAwesomeIcon icon={faBars} style={{color:'#575757', fontSize: 'x-large'}}/>
          )}
        </div>

        {/* 모바일 사이드바 */}
        <div className={`headerSide-menu ${isMenuOpen ? 'headerSide-menu-open' : ''}`}>
          {
            isAuth ? 
            <div className='headerSide-menu-inner1-login'>
              <div>{/* 🟡🟡🟡🟡디자인 보완 필요🟡🟡🟡🟡 */}
                <img src={face} alt=''/>
                <div><FontAwesomeIcon icon={faPen}/></div>                
              </div>
              <div>{userInfo.nickname}님</div>
            </div>
          :
            <div className='headerSide-menu-inner1'>
              <h5>로그인 후 이용해주세요 :-)</h5>
              <Link to = {"/login"} onClick={handleMenuOpen}><button>로그인</button></Link>
              <p>아직 회원이 아니라면? <Link className='headerSide-join' to = {"/signUp"} onClick={handleMenuOpen}>회원가입 하러가기</Link></p>
            </div>
          }
          

          <hr/>

          <div className='headerSide-menu-inner2' onClick={handleMenuOpen}> {/* 아래 메뉴 클릭했을때 사이드 메뉴바 들어가게 하기 위해서 */}
            <Link to = {"/"}><FontAwesomeIcon icon={faSearch} style={{color:'#575757', fontSize: 'x-large'}}/></Link>
            <Link to = {"/moim"}>소모임</Link>
            <Link to = {"/"}>멘토링</Link>
            <Link to = {"/"}>커뮤니티</Link>
            <Link to = {"/faq"}>FAQ</Link>
          </div>
          
          {/* 🟡🟡🟡🟡디자인 보완 필요🟡🟡🟡🟡 */}
          {
            isAuth &&
            <button className='' onClick={logoutHandler}>로그아웃</button>
          }
          
        </div>
      
      </div>
        
    </div>
  );
}

export default Header;

// 메뉴들을 div와 a태그로 구성해봄....그냥 div나 button으로 사용해도 되는데 왜 다른 홈페이지들은 a태그를 썼을까?