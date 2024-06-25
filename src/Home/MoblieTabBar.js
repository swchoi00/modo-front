import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './MoblieTabBar.css';
import { faHouse, faUserGroup, faCircleUser, faList, faSearch } from '@fortawesome/free-solid-svg-icons'; 
import { Link } from 'react-router-dom';

const MoblieTabBar = ({ pageNow, isAdminPage }) => {
  if (isAdminPage) {
    return null;
  }

  return (
    <div className='TabBar-container'>
      <Link className={`TabBar-box ${pageNow === '/' ? 'tabBar-active' : ''}`} to={'/'}>
        <span><FontAwesomeIcon className='TabBar-img' icon={faHouse} /></span>
        <div className='TabBar-title'>홈</div>
      </Link>

      <Link className={`TabBar-box ${pageNow === '/moim' ? 'tabBar-active' : ''}`} to={'/moim'}>
        <span><FontAwesomeIcon className='TabBar-img' icon={faUserGroup} /></span>
        <div className='TabBar-title'>소모임</div>
      </Link>
      
      <Link className={`TabBar-box ${pageNow === '/search' ? 'tabBar-active' : ''}`} to={'/search'}>
        <span><FontAwesomeIcon className='TabBar-img' icon={faSearch} /></span>
        <div className='TabBar-title'>검색</div>
      </Link>

      <Link className={`TabBar-box ${pageNow === '/community' ? 'tabBar-active' : ''}`} to={'/community'}>
        <span><FontAwesomeIcon className='TabBar-img' icon={faList} /></span>
        <div className='TabBar-title'>자유게시판</div>
      </Link>

      <Link className={`TabBar-box ${pageNow === '/my' ? 'tabBar-active' : ''}`} to={'/myPage'}>
        <span><FontAwesomeIcon className='TabBar-img' icon={faCircleUser} /></span>
        <div className='TabBar-title'>마이페이지</div>
      </Link>
    </div>
  );
}

export default MoblieTabBar;
