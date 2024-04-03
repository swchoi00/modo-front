import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'; 
import './MoimPhotoUpload.css';
import {useState } from 'react';
import addMoimPhotoIcon from '../../Img/moim_addMoimPhoto.png'


const MoimPhotoUpload = ({setMoimThumbnail})=>{

  const [imageUrl, setImageUrl] = useState(null);// [미리보기용] 이미지 주소 저장 경로 
  // const [moimThumbnail, setMoimThumbnail] = useState(null); // 업로드용 스테이트


  // 클릭해서 파일 업로드 할때 사용하는 핸들러
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


  // 드래그 중인지 여부를 나타내는 상태 변수
  const [isDragging, setIsDragging] = useState(false); 

  // 드래그 하고 있을때 css 변경을 위한 핸들러
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


  // 업로드한 모임 이미지 취소할때 버튼 핸들러
  const uploadCancleHandler = ()=>{
    setImageUrl(null);  // [미리보기용] 여기에 이미지 경로가 저장되어 있음
    setMoimThumbnail(null); //[저장용] 이미지 파일 있음
  }



  return(
    <div className='uploadTestContainer'>
      {
        imageUrl ? // 이미지가 업로드 됐으면 미리보기로 업로드한 이미지 보여주고 , 없으면 추가하는 화면 띄움
        <div className='uploadPreview'>
          <div className='uploadCancleBtn' onClick={uploadCancleHandler}> {/*이미지 임시 저장 스테이트 비우기 */}
            <FontAwesomeIcon icon={faXmark}  style={{color:'rgb(146, 146, 146)'}}/>
          </div>
          <div className='uploadPreviewImg' style={{backgroundImage: `url(${imageUrl})`}}></div>
        </div>
      :
        // label은 input 박스 안보이게 하고 드래그앤드롭 작업할때 커스텀 하려고 추가
        <label className={`uploadBox ${isDragging ? 'uploadDrag' : ''}`} // Drag 해서 이미지 넣을때 css주려고 추가
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
  )
}

export default MoimPhotoUpload;