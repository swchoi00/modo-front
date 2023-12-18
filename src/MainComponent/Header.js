
import './Header.css';
import modoLogo from '../modo-logo.svg';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; 
import { faXmark } from '@fortawesome/free-solid-svg-icons'; 
import { Link } from 'react-router-dom';

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
          <Link className='nav-aTag' to = {"/"}>소모임</Link>
          <Link className='nav-aTag' to = {"/"}>멘토링</Link>
          <Link className='nav-aTag' to = {"/"}>커뮤니티</Link>
          <Link className='nav-aTag' to = {"/"}>FAQ</Link>
        </div>

        <div className='nav-searchBar'>        
          <input className='nav-search-input' placeholder='관심사 검색하기'/>
          <span><FontAwesomeIcon icon={faSearch} style={{color:'#9c9c9c'}}/></span>    
          
        </div>

        <div className='nav-joinLogin'>
          <Link className='nav-aTag' to = {"/"}>회원가입</Link>
          <Link className='nav-loginBtn' to = {"/"}>로그인</Link>
        </div>
      </div>




      <div id='HeaderMobile'>
        <div className="header-logo headerMoblie-logo"> 
          <img className="nav-logo" src={modoLogo} alt="홈화면으로 가기"/>
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
          <div className='headerSide-menu-inner1'>
              <h5>로그인 후 이용해주세요 :-)</h5>
              <button>로그인</button>
              <p>아직 회원이 아니라면? <a className='' href=''>회원가입 하러가기</a></p>
          </div>

          <hr/>

          <div className='headerSide-menu-inner2'>
            <Link to = {"/"}><FontAwesomeIcon icon={faSearch} style={{color:'#575757', fontSize: 'x-large'}}/></Link>
            <Link to = {"/"}>소모임</Link>
            <Link to = {"/"}>멘토링</Link>
            <Link to = {"/"}>커뮤니티</Link>
            <Link to = {"/"}>FAQ</Link>
          </div>
        </div>
      
      </div>
        
    </div>
  );
}

export default Header;

// 메뉴들을 div와 a태그로 구성해봄....그냥 div나 button으로 사용해도 되는데 왜 다른 홈페이지들은 a태그를 썼을까?