import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Banner.css';

const Banner = () => {
  const banner = [1, 2, 3, 4];
  // const bannerCount = banner.length;
  const [activeIndex, setActiveIndex] = useState(0);  // 부트스트랩 캐러셀 select된 번호 저장하는 스테이트

  const handleBanner = (selectedIndex) => { // onSelect될때마다 바뀐 selectIndex를 위에 스테이트에 저장해줌
    setActiveIndex(selectedIndex);
  };



  return (
    <div className="banner-container">
      <Carousel className='banner-carousel' activeIndex={activeIndex} onSelect={handleBanner}> {/*노션 설명 참고 https://www.notion.so/jellachoi/4c1fa67e7afb48d096d8fe21c4b20e9f*/}
        {banner.map((num, i) => (
          <Carousel.Item key={i} className='banner-carousel-item'>
            <img src={`https://raw.githubusercontent.com/Jella-o312/modo-image/main/banner/banner${num}.svg`} />
          </Carousel.Item>
        ))}
      </Carousel>
        <div className='banner-num'>{activeIndex+1} / {banner.length}</div>
    </div>
  );
}

export default Banner;
