import './Review.css';
import Slider from 'react-slick';
import './slick.css';
import './slick-theme.css';

import face from './face.svg';  // 임시 유저 이미지
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Review = () => {

  // 추후에 제대로된 유저 리뷰 text 연결하기
  const reviewText = [
    { id: 1, text: '안녕하세요' },
    { id: 2, text: '반갑습니다' },
    { id: 3, text: '자고싶어요' },
    { id: 4, text: '왜안됅?' },
  ];

  const settings = {
    slidesToShow: 3,
    infinite: true,
    centerMode: true,
    centerPadding: '0', //2% 하면 양옆에 조금 잘려서 미리보기 할 수 있음 (모바일 혹은 리뷰가 많을 때 사용 고려)
    focusOnSelect: true,
    // speed: 1000
    // arrows:false
  };

  return (
    <div className="Review-container">
      <div className='review-text'> 소모임 리뷰</div>
        <Slider {...settings}>
         {
          //수정 및 재사용이 용이하게 반복문으로 생성 
          //⭐⭐해야함 ->이미지는 깃헙파일 가져오고, 텍스트는 컴포넌트 만들어서 가져오기 
            reviewText.map((num, i)=>(
              <div className='review-boxinner2'>

                <div className='review-boxinner-head'>
                  <img src={face}/>
                  <div className='review-boxinner-title'>소모임 최고!</div>
                </div>

                <div className='review-boxinner-content'> 매주 다양한 얘기하며 달리는 동안 근손실보다 친구들과의 인맥이 늘어난 느낌? 여튼 새로운 운동 친구들과 즐거운 시간 가득하고 있어. 솔직히 운동보다 이 친목이 진짜 스트레칭해주는 거 같아! <br/>(최대 185글자)</div>
                
                <div className='review-boxinner-foot'>
                  <div className='review-boxinner-id'>wwww77**</div>
                  <div className='review-boxinner-star'>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                  </div>
                </div>

              </div>
            ))
          }
          
        </Slider>
        
        

      <div className='review-text'> 멘토링 리뷰</div>
        <Slider {...settings}>
          {
            reviewText.map((num, i)=>(
              <div className='review-boxinner2'>

                <div className='review-boxinner-head'>
                  <img src={face}/>
                  <div className='review-boxinner-title'>멘토링 최고!</div>
                </div>

                <div className='review-boxinner-content'> 매주 다양한 얘기하며 달리는 동안 근손실보다 친구들과의 인맥이 늘어난 느낌? 여튼 새로운 운동 친구들과 즐거운 시간 가득하고 있어. 솔직히 운동보다 이 친목이 진짜 스트레칭해주는 거 같아! <br/>(최대 185글자)</div>
                
                <div className='review-boxinner-foot'>
                  <div className='review-boxinner-id'>wwww77**</div>
                  <div className='review-boxinner-star'>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                  </div>
                </div>

              </div>
            ))
          }
          
        </Slider>
    </div>
  );
};

export default Review;



// {reviewText.map((num, i) => (
//             <div key={i} >
//               <h3>{num.text}</h3>
//               <img src={ddd} style={{ width: '300px' }} />
//             </div>
//           ))} 

