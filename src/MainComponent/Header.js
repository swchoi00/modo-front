
import './Header.css';
import modoLogo from '../modo-logo.svg';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

const Header = () =>{

  //모바일 버거버튼 여부
  const[isMenuOpen, setIsMenuOpen]= useState(false); 

  // 모바일 버거버튼여부 바꾸는 핸들러
  const handleMenuOpen = ()=>{
    setIsMenuOpen(!isMenuOpen)
  };


  return(
    <div className="HeaderContainer">
      <div id='HeaderDesktop'>
        <div className="header-logo"> 
          <img className="nav-logo" src={modoLogo} alt="홈화면으로 가기"/>
        </div>

        <div className='nav-menu'>
          <a className='nav-aTag' href=''>소모임</a>
          <a className='nav-aTag' href=''>멘토링</a>
          <a className='nav-aTag' href=''>커뮤니티</a>
          <a className='nav-aTag' href=''>FAQ</a>
        </div>

        <div className='nav-searchBar'>        
          <input className='nav-search-input' placeholder='관심사 검색하기'/>
          <span><i className="fa-solid fa-magnifying-glass"></i></span>    
          
        </div>

        <div className='nav-joinLogin'>
          <a className='nav-joinBtn nav-aTag' href=''>회원가입</a>
          <a className='nav-loginBtn' href=''>로그인</a>
        </div>
      </div>




      <div id='HeaderMobile'>
        <div className="header-logo headerMoblie-logo"> 
          <img className="nav-logo" src={modoLogo} alt="홈화면으로 가기"/>
        </div>

        {/* 모바일 메뉴 버튼 모양 */}
        <div className="headerMoblieBtn" onClick={handleMenuOpen}>
          {isMenuOpen ? (
            <i className="fa-solid fa-xmark fa-xl" />
          ) : (
            <i className="fa-solid fa-bars fa-xl" />
          )}
        </div>

        {/* 모바일 사이드바 */}
        <div className={`headerSide-menu ${isMenuOpen ? 'headerSide-menu-open' : ''}`}>
          <div className='headerSide-menu-inner1'>
              <h5>로그인 후 이용해주세요 :-)</h5>
              <button>로그인</button>
              <p>아직 회원이 아니라면? <a className='' href=''>회원가입 하러가기</a></p>
          </div>

          <hr/>

          <div className='headerSide-menu-inner2'>
            <a><i className="fa-solid fa-magnifying-glass sideMenu-search"></i></a>
            <a className='' href=''>소모임</a>
            <a className='' href=''>멘토링</a>
            <a className='' href=''>커뮤니티</a>
            <a className='' href=''>FAQ</a>
          </div>
        </div>
      
      </div>
        
    </div>
  );
}

export default Header;

// 메뉴들을 div와 a태그로 구성해봄....그냥 div나 button으로 사용해도 되는데 왜 다른 홈페이지들은 a태그를 썼을까?