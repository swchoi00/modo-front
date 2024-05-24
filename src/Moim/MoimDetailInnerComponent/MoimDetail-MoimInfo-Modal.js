import './MoimDetail-MoimInfo-Modal.css';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { faXmark } from '@fortawesome/free-solid-svg-icons'; 
// import addMoimPhotoIcon from '../../../Img/moim_addMoimPhoto.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MoimAdressCity, MoimAdressTown } from '../MoimComponent/MoimAddress';
import axiosInstance from '../../axiosInstance';

const MoimDetailMoimInfoModal = ({showMoimInfoSettingModal, setShowMoimInfoSettingModal,moimInfo,setMoimInfo})=>{

  const moim = ['공모전', '디자인', '이직·취업', '운동', '글쓰기', '한잔', '기타'];
  
  const [hashNum,setHashNum] = useState(null);// 해시태그 배열 기본 값 세팅 (이게 없으면 length 사용했을때 오류 뜸... undifind 오류)

  useEffect(()=>{ // 랜더링 오류로 바로 length 값 뽑으면 오류 생김...

    if(typeof moimInfo.hashtag === 'undefined'){  // 해당 값의 타입이 undifined로 나올경우 (해시태그 없는 경우 이렇게 뜸)
      setHashNum(0);
    }else{
      setHashNum(moimInfo.hashtag.length);
    }

  },[moimInfo.hashtag]); // 해시태그 값 추가 될때마다 렌더링 됨


  // 수정하다가 나갔을때 다시 수정창 들어오면 쓰던 글자가 남아있음, 이거 방지용 초기와 이펙트 
  useEffect(()=>{
    setMoimHashTag(''); // 현재 입력창 비우기 (input)
  },[showMoimInfoSettingModal]);


  // // [미리보기용] 이미지 주소 저장 경로 
  // const [imageUrl, setImageUrl] = useState(null);
  // // 모임 사진파일 저장하는 스테이트
  // const [moimThumbnail, setMoimThumbnail] = useState(null); 
  // // 드래그 중인지 여부를 나타내는 상태 변수
  // const [isDragging, setIsDragging] = useState(false); 

  
  // // [임시] 이미지 업로드 핸들러
  // const onChangeImage= (e) => {
  //   const file = e.target.files[0];
  //   setMoimThumbnail(file);
    
  //   const reader = new FileReader();
  //   // console.log(file);
    
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setImageUrl(reader.result); // 이미지 주소 저장
  //     // console.log("이미지주소", reader.result);
  //   };
  // };
  // // [임시] 드래그 하고 있을때 css 변경을 위한 핸들러
  // const handleDragOver = (e) => {
  //   e.preventDefault(); // 기본 이벤트 동작을 중지
  //   e.stopPropagation(); // 이벤트 버블링을 방지
  //   setIsDragging(true); // 드래그 중 스테이트 값 설정
  // };
  // //드래그해서 파일 업로드할때 사용하는 핸들러 (클릭할때 사용하는 업로드 핸들러와 다름)
  // const handleDrop = (e) => {
  //   e.preventDefault(); 
  //   e.stopPropagation(); 
  //   setIsDragging(false); // 드롭이 발생했으므로 드래그 중임을 나타내는 상태 변수를 해제합니다.
  
  //   const file = e.dataTransfer.files[0]; 
  //   setMoimThumbnail(file);

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //       setImageUrl(reader.result);
  //     };
  //   }
  // };
  // [임시] 이미지 올린거 취소 핸들러
  // const uploadCancleHandler = ()=>{
  //   setImageUrl(null);  // [미리보기용] 여기에 이미지 경로가 저장되어 있음
  //   setMoimThumbnail(null); //[저장용] 이미지 파일 있음
  // }

  
  // 모임 입력 정보 처리하는 핸들러
  const newMoimInfoHandler = (e)=>{
    let eName = e.currentTarget.dataset.field;  // div 에 있는 데이터셋도 뽑으려면 이렇게 해야함
    let eValue = e.target.value; // 해당 타겟 값 뽑아옴 
    let eCategory = e.currentTarget.dataset.value; // 카테고리만 다르게 값 뽑아옴 (input, select는 이걸로 안뽑아짐)
    
    if(eName === 'city'){
      setMoimInfo({...moimInfo, city:eValue, town : ''});
    }else if(eName === 'category'){
      setMoimInfo({...moimInfo, [eName] : eCategory});
    }else{
      setMoimInfo({...moimInfo, [eName] : eValue});
    }
  }
  
  // ⭐⭐해시태그 관련 
  const [moimHashTag, setMoimHashTag] = useState(''); // 임시 해시태그 (입력받은 1개)
  
  // moimHasgTagList 해시태그 리스트에 값 추가하는 핸들러
  const addHashTaghandler = (e)=>{
    let hashTag = e.target.value.trim(); // trim ->공백제거 (스페이스바)
    const allowedCommand = ['Comma', 'Enter', 'Space', 'NumpadEnter'];
    
    if (!allowedCommand.includes(e.code)) return; // 위에 허용 commandKey가 아닌 경우 돌려보냄
    if (hashTag.length=== 0 ) return;  // 빈값 허용 안함
    
    // ,(쉼표)로 입력한 경우 그대로 ,가 들어가진 상태로 저장되기 때문에 아래와 같은 작업 추가
    // #를 입력했다면 글자에서 # 제거
    if(hashTag.includes(',')){ 
      hashTag = hashTag.split(',').join('');
    }else if(hashTag.includes('#')){
      hashTag = hashTag.split('#').join('');
    }

    // moimInfo에 값 업데이트
    if(!moimInfo.hashtag.includes(hashTag)){ //moimInfo.hasgtag에 방금 입력한 값이 없는경우 추가
      setMoimInfo(data=>{return{...data, hashtag : [...data.hashtag, hashTag]}}); 
    }else{
      setMoimInfo(data=>{return{...data, hashtag : [...data.hashtag.filter(tag=>tag !== hashTag), hashTag]}}); 
    }
    
    setMoimHashTag(''); // 현재 입력창 비우기 (input)
  }
  

  // 해시태그 삭제 핸들러
  const moimHashTagDelHandler = (delHash)=>{
    setMoimInfo(data=>{return{...data, hashtag : [...data.hashtag.filter(tag=>tag !== delHash)]}}); 
  }

  
  // submit 버튼 활성화 여부 
  const updateCheck = moimInfo.introduction !== '' && moimInfo.city !== '' && moimInfo.town !== '' && moimInfo.category !== '';
  

  const updateMoimInfo = ()=>{
    axiosInstance.post('/updateMoimInfo', moimInfo)
    .then((response) => {
      alert(response.data);
      setMoimHashTag(''); // 현재 입력창 비우기 (input)
      setShowMoimInfoSettingModal(false); // 수정모달창 끄기
    })
    .catch((error) => {
      console.log(error);
    });
  }


// console.log(hashNum);
// console.log(moimInfo.hashtag);

  return(
    <div>
      <Modal
              show={showMoimInfoSettingModal}
              // size="lg"
              onHide={() =>setShowMoimInfoSettingModal(false)}
              // aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton > 
                <Modal.Title id="moimDetail-moimInfo-setting-modal">
                    모임 정보 수정하기
                </Modal.Title>
              </Modal.Header>
      
              <Modal.Body>
                <div className="moimDetail-moimInfo-setting-modal-container">
                  {/* 대표사진 */}
                  {/* <div className="moimDetail-moimInfo-setting-modal-box">
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
                  </div> */}

                  {/* 모임명 (변경 불가) */}
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
                        <FontAwesomeIcon icon={faXmark}  style={{color:'#929292'}}/>
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
                      <div className='moimDetail-moimInfo-setting-modal-categoryBox'>
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
                            </div>
                          );
                        })
                      }
                      </div>
                    </div>
                  </div>

                  {/* 모임 해시태그 */}
                  <div className="moimDetail-moimInfo-setting-modal-box">
                    <span className='moimDetail-moimInfo-setting-modal-title'>해시태그(선택)</span>
                    <div className='moimDetail-moimInfo-setting-modal-inputBox'>
                      <div className='moimDetail-moimInfo-setting-modal-hashBox'
                        style={{height : hashNum === 0  ? '2.5rem' : ''}}
                      >
                        
                        { // 해시태그가 1개라도 생성되면 활성화
                          hashNum > 0 &&
                          <div className='moimDetail-moimInfo-setting-modal-hashTop'>
                            { 
                              moimInfo.hashtag.map((data,id)=>{
                                return(
                                  <div key={id} onClick={()=>moimHashTagDelHandler(data)}>  {/* 지우기 핸들러를 여기다 넣음, 그게 사용이 편할듯 */}
                                    <span># {data}</span>
                                    <button>
                                      <FontAwesomeIcon icon={faXmark}  style={{color:'#929292'}}/>
                                    </button>
                                  </div>
                                )
                              })
                            }
                          </div>
                        }
                        <input //#해시태그 5개 까지만 입력 가능 '#해시태그를 등록해보세요. (최대 5개)'
                          placeholder={hashNum > 4 ? '🥲더 이상 입력할 수 없어요(최대 5개)' : '#해시태그를 등록해보세요. (최대 5개)'}
                          value={moimHashTag}
                          onChange={(e)=> setMoimHashTag(e.target.value)}
                          onKeyUp={addHashTaghandler}
                          disabled = {hashNum > 4}
                          />
                      </div>
                    </div>
                  </div>

              
                  <div className="moimDetail-moimInfo-setting-modal-box">
                    <button className={`moimDetail-moimInfo-setting-modal-submit ${updateCheck ? '' : 'disabled'}`}
                            disabled={!updateCheck} // 모임 정보 다 입력, 모임 이름 중복확인, 사진 업로드 여부
                            onClick={updateMoimInfo}
                    >수정하기</button>
                  </div>

                </div>
              </Modal.Body>
          </Modal>
    </div>
  );
}

export default MoimDetailMoimInfoModal;