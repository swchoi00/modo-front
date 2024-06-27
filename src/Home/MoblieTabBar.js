import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './MoblieTabBar.css';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
// import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; 
import { Link } from 'react-router-dom';


const MoblieTabBar = ({pageNow})=>{


  return(
    <div className='TabBar-container'>
      <Link className={`TabBar-box ${pageNow === '/' ? 'tabBar-active' : ''}`} to={'/'}>
        <span><FontAwesomeIcon className='TabBar-img' icon={faHouse} /></span>
        <div className='TabBar-title '>홈</div>
      </Link>

      <Link className={`TabBar-box ${pageNow === '/moim' ? 'tabBar-active' : ''}`} to={'/moim'}>
        <span><FontAwesomeIcon className='TabBar-img' icon={faUserGroup} /></span>
        <div className='TabBar-title'>소모임</div>
      </Link>

      {/* 
      멘토링
      <Link className={`TabBar-box ${pageNow === '/mento' ? 'tabBar-active' : ''}`} to={'/'}>
        <span><FontAwesomeIcon className='TabBar-img' icon={faBookOpen} /></span>
        <div className='TabBar-title'>멘토링</div>
      </Link> */}

      
      {/* <Link className={`TabBar-box ${pageNow === '/search' ? 'tabBar-active' : ''}`} to={'/search'}>
        <span><FontAwesomeIcon className='TabBar-img' icon={faSearch} /></span>
        <div className='TabBar-title'>검색</div>
      </Link> */}

      <Link className={`TabBar-box ${pageNow === '/community' ? 'tabBar-active' : ''}`} to={'/community'}>
        <span><FontAwesomeIcon className='TabBar-img' icon={faList} /></span>
        <div className='TabBar-title'>자유게시판</div>
      </Link>

      <Link className={`TabBar-box ${pageNow === '/myPage' ? 'tabBar-active' : ''}`} to={'/myPage'}>
        <span><FontAwesomeIcon className='TabBar-img' icon={faCircleUser} /></span>
        <div className='TabBar-title'>마이페이지</div>
      </Link>
    </div>
  );
}

export default MoblieTabBar;