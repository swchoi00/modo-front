import { useState , useRef} from 'react';
import './AddMoim.css';
import { MoimAdressCity, MoimAdressTown } from './MoimAddress';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import MoimPhotoUpload from './MoimPhotoUpload';
// import { tr } from 'date-fns/locale';
const AddMoim = ({ userInfo }) =>{

  const navigate = useNavigate();
  const moimnameInputRef = useRef(null); // 모임이름 중복확인 후 focus이동을 위한 ref생성

  // 생성 모임 정보 담아두는 스테이트
  const [addMoimInfo, setAddMoimInfo] = useState({
      // leaderid : userInfo.id,
      // leadername: userInfo.nickname,
      leader : {id: userInfo.id},
      moimname: '',
      category : '',
      city: '',
      town: '',
      introduction : ''
  })

  // 사진타입 정리
  const PhotoType = {
    MAIN: 'main',
    SCHEDULE: 'schedule',
    GALLERY: 'gallery'
  };

  // 모임 사진파일 저장하는 스테이트
  const [moimThumbnail, setMoimThumbnail] = useState(null); 


  // ⭐모임명 중복확인 여부 [1] 중복확인 필요 [2] 사용가능 [3] 사용불가
  const [checkMoimName, setCheckMoimName] = useState(null);

  const moim = ['공모전', '디자인', '이직·취업', '운동', '글쓰기', '한잔', '기타'];

  // 입력값 공백 여부 확인 스테이트
  const [spaceCheck, setSpaceCheck] = useState(false);


 // 지역 정보 처리하는 핸들러
 const locationHandler = (e)=>{
  let eDataset = e.target.dataset.field; // 데이터셋 값 뽑아옴
  let eValue = e.target.value; // 해당 타겟 값 뽑아옴

  if(eDataset === 'Town'){ // 지역 정보에서 도(town)를 바꾼 경우만 다르게 저장 (시City)
    setAddMoimInfo({...addMoimInfo, town : eValue})  
  }else if(eDataset === 'City'){
    setAddMoimInfo({...addMoimInfo, city : eValue, town : ''});  
  }
}


// 모임 이름 및 모임 설명 가져오는 핸들러
const addMoimHandler = (e)=>{
  let eDataset = e.target.dataset.field;
  let eValue = e.target.value;
  const spaceCheck = eValue.trim(); // trim ->공백제거 (스페이스바)


  if(eDataset === 'moimname'){
    if(spaceCheck.length===0){  // 모임명 공백만 넣으면 중복확인 버튼 활성화 안되게 함
      setSpaceCheck(false);
    }else{
      setSpaceCheck(true);
      setCheckMoimName(1);  // [1] 중복확인 필요 [2] 사용가능 [3] 사용불가
    }
  }
  setAddMoimInfo({...addMoimInfo,  [eDataset] : eValue});
}


// 모임 카테고리 가져오는 핸들러
const addMoimCateHandler = (title, value)=>{
  setAddMoimInfo({...addMoimInfo,  [title] : value});
}


// 모임이름 중복 확인하는 핸들러
const moimnameCheckHandler = () => {
  axiosInstance.post('/moimnameCheck',{ moimname: addMoimInfo.moimname })
      .then((response => {
        if(response.data === "사용 가능한 모임 이름입니다!"){
          setCheckMoimName(2);  // [1] 중복확인 필요 [2] 사용가능 [3] 사용불가
        }else{
          setCheckMoimName(3);
          moimnameInputRef.current.focus(); // ref를 사용하여 해당 입력 창으로 포커스 이동
        }
        alert(response.data);
      }
  )).catch((error) => {
      alert(error.response.data);
  })
}

// 모임 등록하는 핸들러
// const createMoim2 = () => {
//   axiosInstance.post('/createMoim', addMoimInfo)
//       .then((response) => {
//           alert(response.data);
//           navigate('/moim');
//       }).catch((error) => {
//           console.log(error);
//       })
// }


const createMoim = ()=>{
  const formData = new FormData();
  formData.append('moimInfo', JSON.stringify(addMoimInfo)); // 모임 정보 
  formData.append('file', moimThumbnail);  // 모임 사진 
  formData.append('photoType', PhotoType.MAIN); // 사진 타입 (폴더 저장 경로)

  axiosInstance.post('/createMoim', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then((response) => {
    alert(response.data);
    navigate('/moim');
  })
  .catch((error) => {
    console.log(error);
  });
}



// 전체 모임 생성 데이터 입력 받았을때 true로 바뀜
const addMoimSubmitCheck = Object.values(addMoimInfo).every(value => value !== '');



console.log(addMoimInfo);
console.log(moimThumbnail);

  return(
    <div className="AddMoim-container">
      <h5 className='AddMoim-title'>모임 만들기</h5>
      <div className='AddMoim-contentBox'>
        <div className='AddMoim-content'>
          <MoimPhotoUpload moimThumbnail={moimThumbnail} setMoimThumbnail = {setMoimThumbnail}/>
        </div>
        <div className='AddMoim-content'>
          <span className='AddMoim-content-title'>모임 이름</span>
          <div className='AddMoim-content-inner'>
            <input type='text' 
                  ref={moimnameInputRef} // 중복확인 후 사용 불가일때 ref를 통해서 focus됨
                  placeholder='모임 이름을 입력해주세요 :)'
                  data-field= 'moimname'
                  onChange={addMoimHandler}
            />
            <button className={`AddMoim-content-check ${addMoimInfo.moimname.length > 0 && spaceCheck && 'AddMoim-content-checkOn'}`} 
                    disabled={!spaceCheck || addMoimInfo.moimname.length < 1 }
                    onClick={moimnameCheckHandler}
            >중복확인</button>
          </div>
         {
           addMoimInfo.moimname === '' ? '' // 빈칸일 경우 아무런 멘트 없음
           : spaceCheck === false ? (<span className='AddMoim-check-Message AddMoim-check-MessageNo'>띄어쓰기만 입력하면 안돼요...</span>)
            // [1] 중복확인 필요 [2] 사용가능 [3] 사용불가
           : checkMoimName === 1 ? (<span className='AddMoim-check-Message'>중복확인 버튼을 눌러주세요</span>)
           : checkMoimName === 2 ? (<span className='AddMoim-check-Message'>멋진 모임이름이에요😉</span>) 
           : checkMoimName === 3 ?(<span className='AddMoim-check-Message AddMoim-check-MessageNo'>모임이름을 바꿔주세요 🥲</span>)
           : null // 아무것도 입력하지 않은 초기 상태 화면 
         }
         
        </div>

        <div className='AddMoim-content'>
          <span className='AddMoim-content-title'>모임 지역</span>
          <div className='AddMoim-content-inner'>
            <div className='AddMoim-content-inner2'>
              <select id='ejoin-location1' data-field="City" onChange={locationHandler}>
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
            <div className='AddMoim-content-inner2'>
              <select id='ejoin-location1' data-field="Town" onChange={locationHandler}>
                <option value="none">구/군 선택</option>  
                  {// ↓ 다른 컴포넌트에서 가져옴
                    MoimAdressTown.find(town=> town.id === addMoimInfo.city)?.town.map((town)=>{ // selectedCity(선택한 시) 값에 따라 JoinAddressTown 있는 군·구목록을 가져옴
                      return(
                        <option value={town} key={town}>{town}</option>
                        );
                      })
                  }
              </select>
            </div>
          </div>
        </div>


        <div className='AddMoim-content'>
          <span className='AddMoim-content-title'>모임 카테고리</span>
          <div className='AddMoim-content-inner3'>
          {
            moim.map ((title,i)=>{
              return(
                <div className='AddMoim-content-category' key={i} 
                     onClick={()=>addMoimCateHandler('category', title)}
                > 
                { addMoimInfo.category === title ?
                  <img src={`https://raw.githubusercontent.com/Jella-o312/modo-image/main/categoris/somoim/moim${i+1}.svg`} alt=""/>
                  :
                  <img src={`https://raw.githubusercontent.com/Jella-o312/modo-image/main/categoris/somoimBefore/cateBefore${i+1}.svg`} style={{opacity:0.5}} alt=""/>
                }
                  <span className={addMoimInfo.category === title? 'AddMoim-category-check': ''}>{title}</span>
                </div>
              );
            })
          }
          </div>
        </div>

        <div className='AddMoim-content'>
          <span className='AddMoim-content-title'>모임 설명</span>
          <div className='AddMoim-content-inner'>
            <input type='text' 
                  placeholder='모임에 대해 간단하게 설명해주세요!'
                  data-field= 'introduction'
                  onChange={addMoimHandler}
            />
          </div>
        </div>
        
        
        <button className={`AddMoim-submit ${addMoimSubmitCheck && checkMoimName === 2 && moimThumbnail !== null? '' : 'disabled'}`}
                disabled={!addMoimSubmitCheck || checkMoimName !== 2 || moimThumbnail === null} // 모임 정보 다 입력, 모임 이름 중복확인, 사진 업로드 여부
                onClick={createMoim}
        >모임 개설하기</button>
        

      </div>
    </div>
  )
}

export default AddMoim;