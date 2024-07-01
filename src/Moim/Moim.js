import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight, faSearch, faXmark, faCaretRight, faCaretDown} from '@fortawesome/free-solid-svg-icons'; 
import './Moim.css';
import { useEffect, useState } from 'react';
import MoimList from './MoimList';
import MoimAddBtn from './MoimComponent/MoimAddBtn';
import axiosInstance from '../axiosInstance';
import MoimMyMoim from './Moim-MyMoim';
import CustomSelectBox from '../customSelectBox';
import { MoimAdressCity, MoimAdressTown2 } from './MoimComponent/MoimAddress';
import sorryIcon from '../Img/sorryIcon.svg';
import { useNavigate } from 'react-router-dom';
import LoginPzModal from '../Login/LoginPzModalComponent/LoginPzModal';


const Moim = ({isAuth, userInfo,setUserInfo}) =>{
  const navigate = useNavigate();
  const [moimList, setMoimList] = useState([]); // 모임 리스트 
  const [filterMoimList, setFilterMoimList] = useState([]); // 필터링 된 모임 리스트
  const [myMoim, setMyMoim] = useState([]); // 마이 모임 리스트
  const [showLoginModal, setShowLoginModal] = useState(false);
  const moimCateType = ['공모전', '디자인', '이직·취업', '운동', '글쓰기', '한잔', '기타'];
  const moimSortType = ['기본', '인기순', '최신순'];
  const [moimSortTypeCheck,setMoimSortTypeCheck] = useState('기본');
  const [filterData, setFilterData] = useState([]); // 검색 할 데이터 목록
  const [searchText, setSearchText] = useState(''); // 검색 창 입력 값 임시 저장
  const [filterCity, setFilterCity] = useState(''); // 필터링 지역 설정을 위한 임시 저장소
  const [filterTown, setFilterTown] = useState(''); // city값에 따라 필터링된 town 목록 저장소
  const [mymoimOpen,setMymoimOpen] = useState(false); // 마이 소모임 보기 여부

  // 모임 결과 보기용
  const moimSortTypeHandler = (sort) => {
    setMoimSortTypeCheck(sort);
  }
  

  //모임 리스트 받아오는 이펙트
  useEffect (()=>{
    axiosInstance.get("/moimList")
    .then((response) => {
      setMoimList(response.data);
      setFilterMoimList(response.data);
      if(isAuth){
        setMyMoim(response.data.filter(moim =>moim.members.some(data => data.member.id === userInfo.id)));
      }
    })
    .catch((error) => {
        console.log(error);
    });
  },[isAuth]);

  

  // 필터 데이터에 값이 추가될 때마다 filterMoimList 값 업데이트
  useEffect(() => {
    // 1단계: 일반 필터 적용 (지역을 제외한 필터링)
    // 일반 검색어 먼저 처리한 뒤, 지역을 여러개 했을 경우 검색어에 해당하는 지역들을 모두 보여주기 위해 2단계로 작업함
    let textList = moimList.filter(moim => {
      return filterData.every(filter => {
        if (!filter.includes(' > ')) { // 일반 필터링: ' > ' 포함되지 않은 경우
          return (moim.category || '').includes(filter) || 
                (moim.description || '').includes(filter) || 
                (moim.introduction || '').includes(filter) || 
                (moim.moimname || '').includes(filter);
        }
        return true; // ' > ' 포함된 경우는 모든 경우를 다 보여주어야 함
      });
    });

    // 2단계: 지역 필터 적용
    const regionFilters = filterData.filter(filter => filter.includes(' > '));
    if (regionFilters.length > 0) { // 지역 필터가 존재할 때만 처리
      const filteredByRegion = [];
      regionFilters.forEach(filter => {
        const [city, town] = filter.split(' > ');
        textList.forEach(moim => {
          if ((town === '전체' && moim.city === city) || (moim.city === city && moim.town === town)) {
            if (!filteredByRegion.some(filteredMoim => filteredMoim.id === moim.id)) {
              filteredByRegion.push(moim);
            }
          }
        });
      });
      textList = filteredByRegion; // 지역 필터링 적용된 결과로 중간 리스트 업데이트
    }
    // 최종 필터링된 리스트를 filterMoimList에 업데이트
    setFilterMoimList(textList);
  }, [filterData, moimList]);

  
  
  


  // filter 박스 눌렀을 때마다 검색값 filterData에 추가하는 핸들러
  const filterSelectHandler = (option, name) => {
    let checkDB = ''; // 중복 확인용 비교 값
    let checkResult = ''; // 중복 확인 결과
    // 추가된 정보가 중복인지 확인
    if(name !== "지역"){ 
      checkDB = name === "상세지역" ? filterCity + " > " + option : option;
      checkResult = filterData.find(data => data === checkDB);
    }
    if(checkResult){ // 중복이면 리턴
      return;  
    }else{ // 아니면 추가 및 업데이트
      switch(name){
        case "카테고리" : 
          setFilterData([...filterData, option]); 
          break;
        case "지역" : 
          setFilterCity(option); // city 임시 저장
          setFilterTown(MoimAdressTown2.find(town=> town.id === option).town); // townDB 업데이트
          break;
        case "상세지역":
          // 입력받은 상세지역이 "전체"이고, 해당 도시의 상세 지역 값이 등록되어 있으면 다 없애고 전체로 포괄 
          if (option === "전체") { //ex) 서울 > 강남구, 서울 > 양천구 를 ==> 서울 > 천체로 변경
            setFilterData([...filterData.filter(data => !data.startsWith(filterCity + " >")), checkDB]);
            // 입력받은 상세지역이 "전체"가 아니고, 기존에 등록된 "전체"가 있는 경우 해당 "도시 > 전체" 값 지움
          }else if(filterData.includes(filterCity + " > 전체")) {  // ex) 서울 > 전체 를 ==> 서울 > 강서구 로 변경
            setFilterData([...filterData.filter(data => data !== filterCity + " > 전체"), filterCity + " > " + option]);
          } else {
            setFilterData([...filterData, filterCity + " > " + option]);  // 그냥 새로 추가되는 경우
          }
          setFilterCity(''); // 임시 도시 저장 DB 삭제
          break;
        }
    }
  };
  

  // 검색 창 입력값 저장하는 핸들러
  const searchTextHandler = (e)=>{
    setSearchText(e.target.value); //입력값 업데이트
    // 엔터 쳤을 때는 filterDB에 값 추가
    if(e.key === 'Enter'){
      if(searchText.trim().length === 0){
        setSearchText(''); // 입력창 초기화
        return;
      }
      else if(filterData.find(data => data === searchText)){ // 이미 동일한 값이 있으면 그냥 무시
        setSearchText(''); // 입력창 초기화
        return;
      }else{
        setFilterData([...filterData, searchText]); // 신규 값이면 추가
        setSearchText(''); // 입력창 초기화
      }
    }
  }

  // 검색 창 입력값 저장하는 핸들러 (🔍버튼)
  const searchTextHandler2 = ()=>{
    if(searchText.trim().length === 0){
      setSearchText(''); // 입력창 초기화
      return;
    }
    else if(filterData.find(data => data === searchText)){ // 이미 동일한 값이 있으면 그냥 무시
      setSearchText(''); // 입력창 초기화
      return;
    }else{
      setFilterData([...filterData, searchText]); // 신규 값이면 추가
      setSearchText(''); // 입력창 초기화
    }
  }



// 모임 검색 결과가 없을 때 모임 만들어 보라고 하는 핸들러
const tryAddMoimHandler = ()=>{
  if(isAuth){
    navigate('/addMoim');
  }else{
    setShowLoginModal(true);
  }
}

  return(
    <div className="Moim-container"  >
      <div className="moim-filterBox">
        <h3>소모임에 오신걸 환영해요!</h3>
        <div className='filterBox'>   
          <div className='searchBar'>
            <input type='text' 
                   placeholder='관심 모임을 검색해 보세요' 
                   value={searchText} 
                   onChange={searchTextHandler}
                   onKeyDown={searchTextHandler} // 엔터키 작업 때문에 추가
            /> 
            <span onClick={searchTextHandler2}><FontAwesomeIcon icon={faSearch}  size='lg' style={{color:'#9c9c9c'}}/></span>    
          </div>
          <div className='searchFiltersBox'>
              <div className='searchFilters'>
                <CustomSelectBox
                    options={moimCateType}
                    placeholder="카테고리"
                    onSelect={filterSelectHandler}
                />           
                <CustomSelectBox
                    options={MoimAdressCity}
                    placeholder="지역"
                    onSelect={filterSelectHandler}
                    select = {filterCity} 
                />          
                <CustomSelectBox
                    options={filterTown}
                    placeholder="상세지역"
                    onSelect={filterSelectHandler}
                />      
              </div>
              <div className="resetBtn" onClick={()=>setFilterData([])}>
                <span style={{color:'#adadad'}}>초기화</span>
                <FontAwesomeIcon icon={faRotateRight}  style={{color:'#adadad'}}/>
              </div>                 
          </div>
          <div className='filterTags'> 
            {
              filterData.map((tag, i)=>(
                <span className='filterTag' key={i} 
                     onClick={() => setFilterData(filterData.filter(data => data !== tag))}
                >{tag} &nbsp; <FontAwesomeIcon icon={faXmark}  style={{color:'white'}}/></span>
              ))
            }
          </div>
          {
            filterData?.length !== 0 &&
            <div className="resetBtn2" onClick={()=>setFilterData([])}>
              <span style={{color:'#adadad'}}>초기화</span>
              <FontAwesomeIcon icon={faRotateRight}  style={{color:'#adadad'}}/>
            </div>     
          }
        </div>
      </div>

      {myMoim?.length !== 0 &&
        <div className='moim-myMoim' style={{marginBottom: !mymoimOpen && '0'}}>
          <div className='moim-myMoim-title' onClick={()=>setMymoimOpen(!mymoimOpen)}>
            마이 소모임 <FontAwesomeIcon icon={mymoimOpen? faCaretDown :faCaretRight}  size='lg' style={{color:'#9c9c9c'}}/>
          </div>
          {
            mymoimOpen &&
            <MoimMyMoim isAuth={isAuth} myMoim={myMoim} userInfo={userInfo} setUserInfo={setUserInfo}/>
          }
        </div>
      }






      <div className='moim-sortTypeBox'>
        <div className='moim-title'>{filterData?.length === 0 ? '전체 모임' : '검색 모임'}</div>
        <div style={{display: 'flex'}}>
          {
            moimSortType.map((sort, i)=>(
              <button 
                key={i}
                className={`moim-sortType  ${moimSortTypeCheck === sort ? 'moim-sort-check' : ''}`}
                onClick={()=> moimSortTypeHandler(sort)}
              >{sort}</button>
            ))
          }
        </div>
      </div>
      
      {
        filterMoimList?.length !== 0 ?
        <MoimList isAuth={isAuth} moimList={filterMoimList} userInfo={userInfo} setUserInfo={setUserInfo}/>
        :
        <div className='noResultBox'>
          <img src={sorryIcon} alt=""/>
          <span>검색한 모임이 존재하지 않아요 🥲<br/>새로 모임을 만들어 보는 건 어떨까요?</span>
          <button onClick={tryAddMoimHandler}>모임 만들러 가기</button>
        </div>
      }
      <MoimAddBtn isAuth={isAuth}/>

      <LoginPzModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal}/>
      

    </div>
  );
}

export default Moim;