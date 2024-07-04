import './Review.css';
import Slider from 'react-slick';
import './slick.css';
import './slick-theme.css';

import face0 from '../../Img/face0.svg';
import face1 from '../../Img/face1.svg';
import face2 from '../../Img/face2.svg';
import face3 from '../../Img/face3.svg';

import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Review = () => {

  // 추후에 제대로된 유저 리뷰 text 연결하기
  const reviewText = [
    {image: face0, title: '소모임에서 인생 취미를 찾았어요!', content: '매주 다양한 얘기하며 달리는 동안 근손실보다 친구들과의 인맥이 늘어난 느낌? 여튼 새로운 운동 친구들과 즐거운 시간 가득하고 있어요. 솔직히 운동보다 이 친목이 진짜 스트레칭해주는 거 같아요!', userId: 'yewon12**'},
    {image: face2, title: '강아지와 함께 할 수 있는 모임 최고 ㅎ', content: '크기 작은 강아지도 큰 강아지도 다양하게 모여서 놀아주는데, 주인들은 강아지 훈련 비법도 나눠주고 강아지들 사이에 벌어진 귀여운 썰들을 들을 수 있어요. 새로 온 사람들도 눈치보지 말고 환영해주니까 편하게 참여해보세요❤️', userId: 'yunni**'},
    {image: face1, title: '창의력 폭발하는 모임', content: '이 모임은 매주 다양한 주제로 창의력을 자극합니다. 멤버들과의 활발한 토론과 피드백 덕분에 글쓰기 실력이 크게 향상되었습니다. 특히 서로의 작품을 진심으로 응원해주고 개선점을 제시해주는 분위기가 좋아요.', userId: 'sangw**'},
    {image: face3, title: '맛과 이야기가 가득한 시간🍻', content: '각종 맛있는 요리와 어울리는 술을 함께 나누며, 하루의 피로를 풀고 서로의 이야기를 들을 수 있습니다. 새로운 사람들과의 만남도 자연스럽고, 다양한 음식 문화에 대해 배울 수 있어서 좋았어요', userId: '모도몬**'},
  ];


  const settings = {
    slidesToShow: 3,
    infinite: true,
    centerMode: true,
    centerPadding: '0', //2% 하면 양옆에 조금 잘려서 미리보기 할 수 있음 (모바일 혹은 리뷰가 많을 때 사용 고려)
    focusOnSelect: true,
  };



  return (
    <div className="Review-container">
      <div className='review-text'> 소모임 리뷰</div>
        <Slider {...settings}>
         {
          //수정 및 재사용이 용이하게 반복문으로 생성 
          //⭐⭐해야함 ->이미지는 깃헙파일 가져오고, 텍스트는 컴포넌트 만들어서 가져오기 
            reviewText.map((data, i)=>(
              <div className='review-boxinner2' key={i}> 

                <div className='review-boxinner-head'>
                  {/* <img src={여기에 face + i 값을 넣고 싶어} alt=''/> */}
                  <img src={data.image} alt='' />
                  <div className='review-boxinner-title'>{data.title}</div>
                </div>

                <div className='review-boxinner-content'>{data.content}</div>
                
                <div className='review-boxinner-foot'>
                  <div className='review-boxinner-id'>{data.userId}</div>
                  <div className='review-boxinner-star'>
                    {[...Array(5)].map((_, j) => (
                      <FontAwesomeIcon icon={faStar} key={j} />
                    ))}
                  </div>
                </div>

              </div>
            ))
          }
          
        </Slider>
        
        

      {/* <div className='review-text'> 멘토링 리뷰</div>
        <Slider {...settings}>
          {
            reviewText.map((num, i)=>(
              <div className='review-boxinner2' key={i}>

                <div className='review-boxinner-head'>
                  <img src={face} alt=''/>
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
          
        </Slider> */}
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

