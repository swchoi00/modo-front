import { useNavigate } from 'react-router-dom';
import './ServiceCategories.css';

const ServiceCategories = () =>{

  const navigate = useNavigate();
  
  const moim = ['공모전', '디자인', '이직·취업', '운동', '글쓰기', '한잔', '기타'];
  const mentoring = ['프로그래밍', '디자인', '영상편집', '언어', '마케팅', '신입OJT', '기타'];



  return(
    <div className="ServiceCategories-container">
      <div className="categories-title">소모임 카테고리</div>
      <div className='categories-box'> {/* ← 얘가 grid*/}
          {
            moim.map ((title,i)=>{
              return(
                <div className='categories-innerBox' key={title} onClick={() => navigate('/moim')}> {/* → 버튼 눌렀을때 해당 카테고리 상세 페이지 이동은 안됨... */}
                  <img className='cate-img' src={`https://raw.githubusercontent.com/Jella-o312/modo-image/main/categoris/somoim/moim${i+1}.svg`} alt=""/>
                  <p className='cate-text'>{title}</p>
                </div>
              );
            })
          }
          <div className='categories-innerBox categories-innerBox2' onClick={() => navigate('/moim')}> {/* → 버튼 눌렀을때 해당 카테고리 상세 페이지 이동은 안됨... */}
            <img className='cate-img' src={`https://raw.githubusercontent.com/Jella-o312/modo-image/main/categoris/somoim/moim8.svg`} alt=""/>
            <p className='cate-text'>더보기</p>
          </div>
      </div>
      

      <div className="categories-title">멘토링 카테고리</div>
      <div className='categories-box'> {/* ← 얘가 grid*/}
          {
            mentoring.map ((title,i)=>{
              return(
                <div className='categories-innerBox' key={i}>
                  <img className='cate-img' src={`https://raw.githubusercontent.com/Jella-o312/modo-image/main/categoris/mentoring/mentoring${i+1}.svg`} alt=""/>
                  <p className='cate-text'>{title}</p>
                </div>
              );
            })
          }
          <div className='categories-innerBox categories-innerBox2' onClick={() => navigate('/moim')}> {/* → 버튼 눌렀을때 해당 카테고리 상세 페이지 이동은 안됨... */}
            <img className='cate-img' src={`https://raw.githubusercontent.com/Jella-o312/modo-image/main/categoris/mentoring/mentoring8.svg`} alt=""/>
            <p className='cate-text'>더보기</p>
          </div>
      </div>
      
      

    </div>
)
}


export default ServiceCategories;