import { useState } from 'react';
import './AddMoim.css';
import { MoimAdressCity, MoimAdressTown } from './MoimAddress';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
const AddMoim = ({ userInfo }) =>{

  const navigate = useNavigate();

  // 생성 모임 정보 담아두는 스테이트
  const [addMoimInfo, setAddMoimInfo] = useState({
      leadername : userInfo.username,
      moimName: '',
      moimCategory : '',
      moimLocation : '',  
      moimShortInfo : ''
  })

  
  // 시, 구 를 합쳐야 하기 때문에 임시로 값을 저장하는 스테이트
  const [moimlocation, setMoimLocation] = useState({
    City : '',
    Town : ''
  })

  // 주소가 제대로 구까지 입력됐는지 확인 및 모임 이름 사용가능한지 확인
  const [isRegexs, setIsRegexs] = useState({
    RMoimLocation : '',
    RMoimName : ''
  });

  const moim = ['공모전', '디자인', '이직·취업', '운동', '글쓰기', '한잔', '기타'];




 // 지역 정보 처리하는 핸들러
 const locationHandler = (e)=>{
  let eDataset = e.target.dataset.field; // 데이터셋 값 뽑아옴
  let eValue = e.target.value; // 해당 타겟 값 뽑아옴
  
  if(eDataset === 'Town'){ // 지역 정보에서 도(town)를 바꾼 경우만 다르게 저장 (시City)
    setMoimLocation({...moimlocation, Town : eValue}) // 임시 town에 저장
    setAddMoimInfo({...addMoimInfo, moimLocation : moimlocation.City + '/' +  eValue})  // 시/도 형식으로 저장
    
    // 임시정규식 결과 객체에 담을때 town location으로 담기고 city는 정규식 처리 안함
    if(eValue !== '' && eValue !== 'none' && eValue !== null){
      setIsRegexs({...isRegexs, RMoimLocation : true}) // 
    }else{
      setIsRegexs({...isRegexs, RMoimLocation : false}) 
    }
  
  }else if(eDataset === 'City'){
    setMoimLocation({ City: eValue, Town: '' }); // 임시 지역 객체에 city 값 바뀌면 Town값 초기화 User정보에 넣는건 town이 바뀔때만 저장함
    setIsRegexs({...isRegexs, RMoimLocation : false});  
  }
}

// 모임 이름 및 모임 설명 가져오는 핸들러
const addMoimHandler = (e)=>{
  let eDataset = e.target.dataset.field;
  let eValue = e.target.value;
  
  setAddMoimInfo({...addMoimInfo,  [eDataset] : eValue});
}

// 모임 카테고리 가져오는 핸들러
const addMoimCateHandler = (title, value)=>{
  setAddMoimInfo({...addMoimInfo,  [title] : value});
}

// 모임이름 중복 확인하는 핸들러
const moimNameCheckHandler = () => {
  axiosInstance.post('/moimnameCheck',{ moimname: addMoimInfo.moimName })
      .then((response => {
          alert(response.data);
      }
  )).catch((error) => {
      alert(error.response.data);
  })
}

// 모임 등록하는 핸들러
const createMoim = () => {
  axiosInstance.post('/createMoim', addMoimInfo)
      .then((response) => {
          alert(response.data);
          navigate('/');
      }).catch((error) => {
          console.log(error);
      })
}


// 전체 모임 생성 데이터 입력 받았을때 true로 바뀜
const addMoimSubmitCheck = Object.values(addMoimInfo).every(value => value !== '');

console.log(addMoimInfo);

  return(
    <div className="AddMoim-container">
      <h5 className='AddMoim-title'>모임 만들기</h5>
      <div className='AddMoim-contentBox'>
        <div className='AddMoim-content'>
          <span className='AddMoim-content-title'>모임 이름</span>
          <div className='AddMoim-content-inner'>
            <input type='text' 
                  placeholder='모임 이름을 입력해주세요 :)'
                  data-field= 'moimName'
                  onChange={addMoimHandler}
            />
            <button className='AddMoim-content-check' onClick={moimNameCheckHandler}>중복확인</button>
          </div>
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
                    MoimAdressTown.find(town=> town.id === moimlocation.City)?.town.map((town)=>{ // selectedCity(선택한 시) 값에 따라 JoinAddressTown 있는 군·구목록을 가져옴
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
                     onClick={()=>addMoimCateHandler('moimCategory', title)}
                > 
                { addMoimInfo.moimCategory === title ?
                  <img src={`https://raw.githubusercontent.com/Jella-o312/modo-image/main/categoris/somoim/moim${i+1}.svg`} alt=""/>
                  :
                  <img src={`https://raw.githubusercontent.com/Jella-o312/modo-image/main/categoris/somoimBefore/cateBefore${i+1}.svg`} style={{opacity:0.5}} alt=""/>
                }
                  <span className={addMoimInfo.moimCategory === title? 'AddMoim-category-check': ''}>{title}</span>
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
                  data-field= 'moimShortInfo'
                  onChange={addMoimHandler}
            />
          </div>
        </div>
        
        
        <button className={`AddMoim-submit ${addMoimSubmitCheck ? '' : 'disabled'}`}
                disabled={!addMoimSubmitCheck}
                onClick={createMoim}
        >모임 개설하기</button>
        

      </div>
    </div>
  )
}

export default AddMoim;