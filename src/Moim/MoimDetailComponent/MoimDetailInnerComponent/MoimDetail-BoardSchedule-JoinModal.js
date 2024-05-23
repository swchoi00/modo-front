import { Modal } from 'react-bootstrap';
import './MoimDetail-BoardSchedule-JoinModal.css';

const MoimDetailBoardScheduleJoinModal = ({ moimScheduleJoinModal, setMoimScheduleJoinModal, isAuth, userInfo, moimScheduleInfo, setMoimScheduleInfo }) => {

  console.log(moimScheduleInfo);

  return (
    <div className='dd'>
      <Modal
        show={moimScheduleJoinModal}
        size="lg"
        onHide={() => setMoimScheduleJoinModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton >
          <Modal.Title id="example-modal-sizes-title-lg">
            <div style={{ width: '87%', position: 'absolute', top: '0', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              모임 일정
            </div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="moimDetail-calendar-scheduleAdd-infoBox" style={{ height: '30rem' }}>
            
            {/* <div className='moimDetail-thumbnail-img'
              style={{
                backgroundImage: `url(https://raw.githubusercontent.com/Jella-o312/modo-image/main/moim-img/moim${1}.png)`, // ⭐보안 정책 때문에 컴퓨터 내부에 있는 파일로 테스트 불가
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
              }}
            /> */}

            <button className='moimDetail-calendar-scheduleAdd-submitBtn'
            // disabled={!(scheduleTimeRegex && addScheduleSubmitCheck)}
            // onClick={addMoimscheduleSubmitHandler}
            >
              일정 추가
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div> 
  ) 
} 
 
export default MoimDetailBoardScheduleJoinModal;