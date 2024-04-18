import './MoimDetail-MoimInfo-Modal.css';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { faXmark } from '@fortawesome/free-solid-svg-icons'; 
import addMoimPhotoIcon from '../../../Img/moim_addMoimPhoto.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MoimAdressCity, MoimAdressTown } from '../../MoimComponent/MoimAddress';

const MoimDetailMoimInfoModal = ({showMoimInfoSettingModal, setShowMoimInfoSettingModal,moimInfo,setMoimInfo})=>{
 
  // 모임 정보 업데이트용 스테이트
  // const [newMoimInfo, setNewMoimInfo] = useState(moimInfo);

  // [미리보기용] 이미지 주소 저장 경로 
  const [imageUrl, setImageUrl] = useState(null);
  // 모임 사진파일 저장하는 스테이트
  const [moimThumbnail, setMoimThumbnail] = useState(null); 
  // 드래그 중인지 여부를 나타내는 상태 변수
  const [isDragging, setIsDragging] = useState(false); 

  const moim = ['공모전', '디자인', '이직·취업', '운동', '글쓰기', '한잔', '기타'];

  
  // [임시] 이미지 업로드 핸들러
  const onChangeImage= (e) => {
    const file = e.target.files[0];
    setMoimThumbnail(file);
    
    const reader = new FileReader();
    // console.log(file);
    
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result); // 이미지 주소 저장
      // console.log("이미지주소", reader.result);
    };
  };
  // [임시] 드래그 하고 있을때 css 변경을 위한 핸들러
  const handleDragOver = (e) => {
    e.preventDefault(); // 기본 이벤트 동작을 중지
    e.stopPropagation(); // 이벤트 버블링을 방지
    setIsDragging(true); // 드래그 중 스테이트 값 설정
  };
  //드래그해서 파일 업로드할때 사용하는 핸들러 (클릭할때 사용하는 업로드 핸들러와 다름)
  const handleDrop = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    setIsDragging(false); // 드롭이 발생했으므로 드래그 중임을 나타내는 상태 변수를 해제합니다.
  
    const file = e.dataTransfer.files[0]; 
    setMoimThumbnail(file);

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
    }
  };
  // [임시] 이미지 올린거 취소 핸들러
  const uploadCancleHandler = ()=>{
    setImageUrl(null);  // [미리보기용] 여기에 이미지 경로가 저장되어 있음
    setMoimThumbnail(null); //[저장용] 이미지 파일 있음
  }

  // 모임 입력 정보 처리하는 핸들러
  const newMoimInfoHandler = (e)=>{
    // let eName = e.target.dataset.field; // 데이터셋 값 뽑아옴 (원래 데이터셋 뽑는법)
    let eName = e.currentTarget.dataset.field;  // div 에 있는 데이터셋도 뽑으려면 이렇게 해야함
    let eValue = e.target.value; // 해당 타겟 값 뽑아옴 
    let eCategory = e.currentTarget.dataset.value; // 카테고리만 다르게 값 뽑아옴 (input, select는 이걸로 안뽑아짐)
    

    console.log(eCategory);
    
    if(eName === 'city'){
      setMoimInfo({...moimInfo, city:eValue, town : ''});
    }else if(eName === 'category'){
      setMoimInfo({...moimInfo, [eName] : eCategory});
    }else{
      setMoimInfo({...moimInfo, [eName] : eValue});
    }
  }

  // console.log(moimInfo);
  

  const updateCheck = moimInfo.introduction !== '' && moimInfo.city !== '' && moimInfo.town !== '' && moimInfo.category !== '';

console.log(moimInfo);
  console.log("⭐⭐" + updateCheck);

  return(
    <div>
      <Modal
              show={showMoimInfoSettingModal}
              size="lg"
              onHide={() =>setShowMoimInfoSettingModal(false)}
              // aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton > 
                <Modal.Title id="moimDetail-moimInfo-setting-modal">
                    모임 일정 추가하기 
                </Modal.Title>
              </Modal.Header>
      
              <Modal.Body>
                <div className="moimDetail-moimInfo-setting-modal-container">
                  {/* 대표사진 */}
                  <div className="moimDetail-moimInfo-setting-modal-box">
                    <span className='moimDetail-moimInfo-setting-modal-title'>대표 사진</span>
                    <div className='moimDetail-moimInfo-setting-modal-Photo'>
                     { 
                        imageUrl ? // 이미지가 업로드 됐으면 미리보기로 업로드한 이미지 보여주고 , 없으면 추가하는 화면 띄움
                        <div className='moimDetail-moimInfo-setting-uploadPrevie'>
                          <div className='moimDetail-uploadCancleBtn' onClick={uploadCancleHandler}> 
                            <FontAwesomeIcon icon={faXmark}  style={{color:'rgb(146, 146, 146)'}}/>
                          </div>
                          <div className='moimDetail-uploadPreviewImg' style={{backgroundImage: `url(${imageUrl})`}}></div>
                        </div>
                      :
                        // label은 input 박스 안보이게 하고 드래그앤드롭 작업할때 커스텀 하려고 추가
                        <label className={`moimDetail-moimInfo-setting-uploadBox ${isDragging ? 'uploadDrag' : ''}`} // Drag 해서 이미지 넣을때 css주려고 추가
                          onDragOver={(e) => handleDragOver(e)} // 드래그 상태 이벤트
                          onDragLeave={() => setIsDragging(false)}  // 드래그 떠났을때 이벤트
                          onDrop={(e) => handleDrop(e)} // 드랍됐을때 이벤트
                          >
                            <img className='uploadIcon' src={addMoimPhotoIcon} alt=''/>
                            <span>모임 대표 이미지를 넣어주세요</span>
                          <input type="file" accept='image/*'  onChange={onChangeImage} hidden/> 
                        </label>
                      }
                    </div>
                  </div>

                  <div className="moimDetail-moimInfo-setting-modal-box">
                    <div className='moimDetail-moimInfo-setting-modal-title' style={{display: 'flex', alignItems: 'center'}}>
                      <span>모임명</span>
                      <span style={{fontSize: 'small', marginLeft: '1rem', color:'gray'}}>* 모임명은 변경할 수 없어요</span>
                    </div>
                    <div className='moimDetail-moimInfo-setting-modal-inputBox'>
                      <input className='moimDetail-moiminfo-setting-modal-input' 
                              value={moimInfo.moimname}
                              disabled
                      />
                    </div>
                  </div>


                  {/* 모임 설명 */}
                  <div className="moimDetail-moimInfo-setting-modal-box">
                    <span className='moimDetail-moimInfo-setting-modal-title'>모임설명</span>
                    <div className='moimDetail-moimInfo-setting-modal-inputBox'>
                      <input className='moimDetail-moiminfo-setting-modal-input' 
                              // placeholder="모임에 대해 간단히 설명해주세요" 
                              data-field= 'introduction' 
                              value={moimInfo.introduction}
                              onChange={newMoimInfoHandler}
                      />
                      <span className='moimDetail-moiminfo-setting-modal-input-x'  onClick={()=>setMoimInfo({ ...moimInfo, introduction: '' })}>
                        <FontAwesomeIcon icon={faXmark}  style={{color:'rgb(146, 146, 146)'}}/>
                      </span>
                    </div>
                  </div>

                  {/* 모임 지역 */}
                  <div className="moimDetail-moimInfo-setting-modal-box">
                    <span className='moimDetail-moimInfo-setting-modal-title'>모임지역</span>
                    <div className='moimDetail-moimInfo-setting-modal-inputBox' style={{gap: '1rem'}}>
                        <div className='moimDetail-moimInfo-setting-modal-input2'>
                          <select id='ejoin-location1' data-field="city" value={moimInfo.city} onChange={newMoimInfoHandler}>
                            <option value="none">시/도 선택</option>  
                              {// ↓ 다른 컴포넌트에서 가져옴
                                MoimAdressCity.map((city)=>{
                                  return(
                                    <option value={city} key={city}>{city}</option>
                                  );
                                })
                              }
                          </select>
                        </div>
                        <div className='moimDetail-moimInfo-setting-modal-input2'>
                          <select id='ejoin-location1' data-field="town" value={moimInfo.town} onChange={newMoimInfoHandler}>
                            <option value="none">구/군 선택</option>  
                              {// ↓ 다른 컴포넌트에서 가져옴
                                MoimAdressTown.find(town=> town.id === moimInfo.city)?.town.map((town)=>{ // selectedCity(선택한 시) 값에 따라 JoinAddressTown 있는 군·구목록을 가져옴
                                  return(
                                    <option value={town} key={town}>{town}</option>
                                    );
                                  })
                              }
                          </select>
                        </div>
                    </div>
                  </div>

                  {/* 모임 카테고리 */}
                  <div className="moimDetail-moimInfo-setting-modal-box">
                    <span className='moimDetail-moimInfo-setting-modal-title'>모임 카테고리</span>
                    <div className='moimDetail-moimInfo-setting-modal-inputBox'>
                      {
                        moim.map ((title,i)=>{
                          return(
                            <div className='moimDetail-moimInfo-setting-modal-category' key={i} 
                                 data-field="category" 
                                 data-value={title}
                                onClick={newMoimInfoHandler}
                            > 
                            { moimInfo.category === title ?
                              <img src={`https://raw.githubusercontent.com/Jella-o312/modo-image/main/categoris/somoim/moim${i+1}.svg`} alt=""/>
                              :
                              <img src={`https://raw.githubusercontent.com/Jella-o312/modo-image/main/categoris/somoimBefore/cateBefore${i+1}.svg`} style={{opacity:0.5}} alt=""/>
                            }
                              <span style={{color : moimInfo.category === title? '#C59DF1': 'gray',
                                            fontWeight: moimInfo.category === title? '500' : ''
                                          }}>{title}</span>
                              {/* className={moimInfo.category === title? 'AddMoim-category-check': ''} */}
                            </div>
                          );
                        })
                      }
                    </div>
                  </div>
                  
                  <div className="moimDetail-moimInfo-setting-modal-box">
                    <button className={`moimDetail-moimInfo-setting-modal-submit ${updateCheck ? '' : 'disabled'}`}
                            disabled={!updateCheck} // 모임 정보 다 입력, 모임 이름 중복확인, 사진 업로드 여부
                            // onClick={createMoim}
                    >수정하기</button>
                  </div>

                </div>
              </Modal.Body>
          </Modal>
    </div>
  );
}

export default MoimDetailMoimInfoModal;