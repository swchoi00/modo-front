import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './MoblieTabBar.css';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';


const MoblieTabBar = ()=>{
  return(
    <div className='TabBar-container'>
      <div className='TabBar-box'>
        <span><FontAwesomeIcon className='TabBar-img TabBar-img2' icon={faHouse} /></span>
        <div className='TabBar-title TabBar-title2'>홈</div>
      </div>
      <div className='TabBar-box'>
        <span><FontAwesomeIcon className='TabBar-img' icon={faUserGroup} /></span>
        <div className='TabBar-title'>소모임</div>
      </div>
      <div className='TabBar-box'>
        <span><FontAwesomeIcon className='TabBar-img' icon={faBookOpen} /></span>
        <div className='TabBar-title'>멘토링</div>
      </div>
      <div className='TabBar-box'>
        <span><FontAwesomeIcon className='TabBar-img' icon={faList} /></span>
        <div className='TabBar-title'>자유게시판</div>
      </div>
      <div className='TabBar-box'>
        <span><FontAwesomeIcon className='TabBar-img' icon={faCircleUser} /></span>
        <div className='TabBar-title'>마이페이지</div>
      </div>
    </div>
  );
}

export default MoblieTabBar;