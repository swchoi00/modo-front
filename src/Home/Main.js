import Banner from '../HomeComponent/Banner';
import ServiceCategories from '../HomeComponent/ServiceCategories';
import './Main.css';
import Review from '../HomeComponent/ReviewComponent/Review';
import motivation from '../Img/main_motivation.svg';
import moimBtn from '../Img/main_moimBtn.svg';
import mentoringBtn from '../Img/main_mentoringBtn.svg';


const Main = ()=>{
  return(
    <div className='main-container'>
      <Banner/>
      <ServiceCategories />

      {/* 홍보 이미지 */}
      <div className="main-service-key-point">
        <img className='main-motivation-img' src={motivation} alt=''/>
      </div>

      <Review/>

      <div className='main-registration-box'>
        <div className='main-registration-moin'>
          <img className='main-registration-moinBtn' src={moimBtn}/>
        </div>
        <div className='main-registration-mentoring'>
          <img className='main-registration-mentoringBtn' src={mentoringBtn}/>
        </div>
      </div>

    </div>
  );
}

export default Main;