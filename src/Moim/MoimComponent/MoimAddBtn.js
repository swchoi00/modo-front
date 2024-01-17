import { Link } from 'react-router-dom';
import './MoimAddBtn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronUp} from '@fortawesome/free-solid-svg-icons'; 
// chevron-up
const MoimAddBtn = ({ scrollTopHandler, isVisible }) =>{

  // const MoimScrollHandler = () => {
  //   console.log('스크롤 버튼 클릭됨');
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // };




  return(
    <div className='MoimBtn-container'>
      {isVisible && (
        <div className='MoimScrollBtn-Btn' onClick={scrollTopHandler}>
          <FontAwesomeIcon icon={faChevronUp}  size='2x' style={{color:'#6a60a9' }}/>
        </div>
      )}

      <Link className='MoimAddBtn-BtnBox' to={'/addMoim'}> 
        <div className='MoimAddBtn-Btn'>
          <FontAwesomeIcon icon={faPlus}  size='2x' style={{color:'white' }}/>
        </div>
      </Link>
    </div>
  );
}

export default MoimAddBtn;