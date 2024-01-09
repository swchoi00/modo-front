import './Moim2.css';
import { moimContent } from './moim-content';

const Moim2 = () =>{
  return(
    <div className='moim-list-box'>
      {
        moimContent.map((data) => {
          return (
            <div className='moim-content-box' key={data.id} >
              <div className='moim-content-box-img'
                style={{
                  backgroundImage: `url(https://raw.githubusercontent.com/Jella-o312/modo-image/main/moim-img/${data.id}.png)`
                  , opacity: '0.85'
                }}>
                <span className='moim-content-box-categoty'>{data.category}</span>
              </div>

              <div className='moim-content-box-info'>
                <div className='moim-contnent-box-title'>{data.title}</div>
                <span>{data.promotion}</span>
                <span className='moim-content-box-info-member'>{data.area} ┃ {data.member} 명</span>
              </div>
            </div>
          );
        })
      }
    </div>
  );
}

export default Moim2;