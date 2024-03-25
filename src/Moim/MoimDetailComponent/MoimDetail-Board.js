
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './MoimDetail-Board.css';
import MoimDetailBoardComponent from './MoimDetailInnerComponent/MoimDetail-BoardComponent';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
const MoimDetailBoard = () =>{
  return(
    <div className="moimDetailBoard-container">
      <div className="moimDetail-moimContent-board-header">
          <h6>모임일정 <span style={{color: 'salmon'}}>(나중에 여기 리스트로 보기 버튼 만들어야함)</span></h6>
          {/* 😡임시😡 ↓ 모임장만 보이게 해야함 */}
          <FontAwesomeIcon icon={faEllipsisVertical} size="lg"/>
      </div>

      <MoimDetailBoardComponent/>

      <div className="moimDetail-moimContent-board-header">
          <h6>모임 게시판</h6>
          {/* 😡임시😡 ↓ 모임장만 보이게 해야함 */}
          <FontAwesomeIcon icon={faEllipsisVertical} size="lg"/>
      </div>

    </div>
  )
} 

export default MoimDetailBoard;