import { Link } from 'react-router-dom';
import './Header.css';
import logo from'./modo-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; 
import { useState } from 'react';


function Header() {

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
                <li><Link to = {"/"}>커뮤니티</Link></li>
                <li><Link to = {"/"}>FAQ</Link></li>
            </ul>

            <input className={`navbar_search ${searchActive ? 'active' : ''}`} type='text' placeholder={' \u00A0 관심있는 도전을 검색해보세요!'}></input>
            {/* <FontAwesomeIcon icon={faSearch} className='search_icon'></FontAwesomeIcon> */}

            <ul className={`navbar_right ${rightActive ? 'active' : ''}`}>
                <li><Link to>회원가입</Link></li>
                <li className='navbar_login'><Link to>로그인</Link></li>
            </ul>

            <div className='navbar_toggleBtn' onClick={toggleHandler}>
                <FontAwesomeIcon icon={faBars} />
            </div>

        </nav>
    )
}

export default Header;

/*
const toggleBtn = document.querySelector('.navbar_toggleBtn');
const left = document.querySelector('.navbar_left);
const search = document.querySelector('.navbar_search');
const right = document.querySelector('.navbar_right');

toggleBtn.addEventListener('click', () => {
    left.classList.toggle('active');
    search.classList.toggle('active');
    right.classList.toggle('active');
})


*/