import { useNavigate } from 'react-router-dom';
import './ServiceCategories.css';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';

const ServiceCategories = ({setCategoryCheck}) =>{

  const navigate = useNavigate();
  
  
  const moim = ['공모전', '디자인', '이직·취업', '운동', '글쓰기', '한잔', '기타'];
  const mentoring = ['프로그래밍', '디자인', '영상편집', '언어', '마케팅', '신입OJT', '기타'];
  const [showAlert, setShowAlert] = useState(false);

  
  const mentoringHandler = ()=>{
    setShowAlert(true);
  }

  const categoryHandler = (cate)=>{
    setCategoryCheck(cate);
    navigate('/moim');
  }


  return(
    <div className="ServiceCategories-container">
      <div className="categories-title">모임 카테고리</div>{/*소모임 글자 들어있던 곳 */}
      <div className='categories-box'> {/* ← 얘가 grid*/}
          {
            moim.map ((title,i)=>{
              return(
                <div className='categories-innerBox' key={title} onClick={()=>categoryHandler(title)}> {/* → 버튼 눌렀을때 해당 카테고리 상세 페이지 이동은 안됨... */}
                  <img className='cate-img' src={`https://raw.githubusercontent.com/Jella-o312/modo-image/main/categoris/somoim/moim${i+1}.svg`} alt=""/>
                  <p className='cate-text'>{title}</p>
                </div>
              );
            })
          }
          <div className='categories-innerBox categories-innerBox2' onClick={() => navigate('/moim')}> {/* → 버튼 눌렀을때 해당 카테고리 상세 페이지 이동은 안됨... */}
            <img className='cate-img' src={`https://raw.githubusercontent.com/Jella-o312/modo-image/main/categoris/somoim/moim8.svg`} alt=""/>
            <p className='cate-text'>전체보기</p>
          </div>
      </div>
      

      <div className="categories-title">멘토링 카테고리</div>
      <div className='categories-box'> 
          {
            mentoring.map ((title,i)=>{
              return(
                <div className='categories-innerBox' key={i} onClick={mentoringHandler}>
                  <img className='cate-img' src={`https://raw.githubusercontent.com/Jella-o312/modo-image/main/categoris/mentoring/mentoring${i+1}.svg`} alt=""/>
                  <p className='cate-text'>{title}</p>
                </div>
              );
            })
          }
          <div className='categories-innerBox categories-innerBox2' onClick={mentoringHandler}> 
            <img className='cate-img' src={`https://raw.githubusercontent.com/Jella-o312/modo-image/main/categoris/mentoring/mentoring8.svg`} alt=""/>
            <p className='cate-text'>전체보기</p>
          </div>
      </div>
      
      <Modal
        show={showAlert}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className='LoginPzModal-Box'>
            <b>멘토링 서비스는 준비중이에요 </b>
            <div className='LoginPzModal-Body'>
              <div className='LoginPzModal-BtnBox'>
                <button className='LoginPzModal-BtnStyle1' onClick={()=>setShowAlert(false)}>확인</button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </div>
)
}


export default ServiceCategories;