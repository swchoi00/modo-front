import Banner from '../HomeComponent/Banner';
import ServiceCategories from '../HomeComponent/ServiceCategories';
import './Main.css';
import Review from '../HomeComponent/ReviewComponent/Review';
import motivation from '../Img/main_motivation.svg';
import moimBtn from '../Img/main_moimBtn.svg';
import mentoringBtn from '../Img/main_mentoringBtn.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; 


const Main = ()=>{
  return(
    <div className='main-container'>
      <div className="main-container-box">
        <Banner/>

        {/* <div className='main-mobile-searchBar'> 
          <input className='main-mobile-search-input' placeholder='관심사 검색하기'/> 
          <span><FontAwesomeIcon icon={faSearch} style={{color:'#d4b5f5'}} size='lg'/></span>
        </div> */}

        <ServiceCategories />

        {/* 홍보 이미지 */}
        {/* <div className="ds"> */}
          <div className="main-service-key-point">
            <img className='main-motivation-img' src={motivation} alt=''/>
          </div>
        {/* </div> */}

        <Review/>

        <div className='main-registration-box'>
          <div className='main-registration-moin'>
            <img className='main-registration-moinBtn' src={moimBtn} alt=''/>
          </div>
          <div className='main-registration-mentoring'>
            <img className='main-registration-mentoringBtn' src={mentoringBtn} alt=''/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;