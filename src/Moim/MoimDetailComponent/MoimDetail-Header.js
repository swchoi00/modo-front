import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
const MoimDetailHeader = ({moimCategory, moimName, moimMenuCk, id})=>{
  
  const navigate = useNavigate();
  const moimDetailMenu = ['홈', '게시판', '갤러리', '채팅'];
  
  
  const moimMenuCkHandler = (e)=>{
    let menu = e.target.textContent;  
    switch(menu){
      case '홈' : navigate(`/moim/${id}/home`); break;
      case '게시판' : navigate(`/moim/${id}/board`); break;
      case '갤러리' : navigate(`/moim/${id}/gallery`); break;
      case '채팅' : navigate(`/moim/${id}/chat`); break;
    }
  }
  
  return(
    <div>
      <div className='moimDetail-headerBox'>
        <div className='moimDetail-header-beforeBtn'>{/* 목록 */}
          <FontAwesomeIcon icon={faList} size='lg'style={{color: '#6a60a9'}}/>
        </div>
        <div className='moimDetail-header-category'>{moimCategory}</div>
        <div className='moimDetail-header-title'>{moimName}</div>
      </div>

      <div className='moimDetail-moimMenu-box-moblie'>
        {
          moimDetailMenu.map((data, i)=>(
            <div className={`moimDetail-moimMenu ${moimMenuCk === data ? 'moimDetail-moimMenu-ck': ''}`} 
                  onClick={moimMenuCkHandler} 
                  key={i}>
            {data}</div>
          ))
        }
      </div>
    </div>
  )
}

export default MoimDetailHeader;