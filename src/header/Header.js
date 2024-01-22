import { Link } from 'react-router-dom';
import './Header.css';
import logo from'./modo-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';


function Header( {isAuth, setIsAuth} ) {

    const [leftActive, setLeftActive] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [rightActive, setRightActive] = useState(false);

    const toggleHandler = () => {
        setLeftActive(!leftActive);
        setSearchActive(!searchActive);
        setRightActive(!rightActive);
    }

    return (
        <nav className='navbar'>

            <ul className='navbar_logo'>
                <li><Link to = {"/"}><img src={logo} alt='logo' className='logo'></img></Link></li>
            </ul>
            <ul className={`navbar_left ${leftActive ? 'active' : ''}`}>
                <li><Link to = {"/"}>소모임</Link></li>
                <li><Link to = {"/"}>멘토링</Link></li>
                <li><Link to = {"/"}>커뮤니a</Link></li>
                <li><Link to = {"/"}>FAQ</Link></li>
            </ul>

            <input className={`navbar_search ${searchActive ? 'active' : ''}`} type='text' placeholder={' \u00A0 관심있는 도전을 검색해보세요!'}></input>
            {/* <FontAwesomeIcon icon={faSearch} className='search_icon'></FontAwesomeIcon> */}

            
            <ul className={`navbar_right ${rightActive ? 'active' : ''}`}>

                {isAuth ? 
                    <div>
                    <li><Link to = {"/signUp"}>흠{isAuth}</Link></li>
                    <li className='navbar_login'><Link to = {"/login"}>로그아웃</Link></li>
                    </div>
                 : 
                    <div>
                    <li><Link to = {"/signUp"}>회원가입1211555{isAuth}</Link></li>
                    <li className='navbar_login'><Link to = {"/login"}>로그인</Link></li>
                    </div>
                }

            </ul>

            <div className='navbar_toggleBtn' onClick={toggleHandler}>
                <FontAwesomeIcon icon={faBars} />
            </div>

        </nav>
    )
}

export default Header;
