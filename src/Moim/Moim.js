import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight, faSearch } from '@fortawesome/free-solid-svg-icons'; 
import './Moim.css';
import { useEffect, useState } from 'react';
import Moim2 from './Moim2';


const Moim = () =>{

  const moimShowType = ['전체보기', '카테고리'];
  const [moimShowTypeBtn, setMoimShowTypeBtn] = useState('전체보기');
  // const moimCateType = ['주제별', '지역별']
  // const moimCategories1 = ['공모전', '디자인', '이직·취업', '운동', '글쓰기', '한잔', '기타'];
  // const moimCategories2 = ['서울 ', '경기', '인천', '대구', '부산', '제주', '기타'];

  const moimCateType = [
    {
      title : '주제별',
      name : 'moimType',
      content : ['공모전', '디자인', '이직·취업', '운동', '글쓰기', '한잔', '기타']
    },
    {
      title : '지역별',
      name : 'moimArea',
      content : ['서울 ', '경기', '인천', '대구', '부산', '제주', '기타']
    }
  ];

  
  const moimShowTypeHandler = (e) => {
    setMoimShowTypeBtn(e.target.value);
  };

  
  useEffect(() => {
    if (moimShowTypeBtn === '전체보기') { // 여기서 moimShowTypeBtn으로 수정
      moimCategoryRetryHandler(); // 새로고침 핸들러 (moimCategoryCheck 비워줌)
    }
    
    // console.log(moimCategoryCheck);
  }, [moimShowTypeBtn]); 
  
  
  const [moimCategoryCheck, SetMoimCategoryCheck] = useState({
    moimType:[],
    moimArea:[]
  });
  
      
      
  // ⭐ 모임카테고리 타입과, 지역 선택할때마다 moimCategoryCheck 스테이트의 값을 추가하거나 바꾸는 핸들러
  const moimCategoryHandler = (cateContent, cateType) => {
    SetMoimCategoryCheck(data => ({
      ...data,
      // ↓ 삼항 연산자 써서 사용 (값이 있을때는 없애고, 없을때는 추가)
      [cateType]: data[cateType].includes(cateContent)
      ? data[cateType].filter(item => item !== cateContent)
      : [...data[cateType], cateContent]
    }));
  };
      
            
      // ⭐ 카테고리 선택에서 새로고침을 눌렀을때 작동하는 핸들러
  const moimCategoryRetryHandler = () => SetMoimCategoryCheck({ moimType: [], moimArea: [] });
  
  const moimSortType = ['기본', '인기순', '최신순'];

  const [moimSortTypeCheck,setMoimSortTypeCheck] = useState('기본');

  const moimSortTypeHandler = (sort) => {
    setMoimSortTypeCheck(sort);
  }
  
  
  
  // console.log(moimCategoryCheck);
  console.log(moimSortTypeCheck);
  
  return(
    <div className="Moim-container">
      
      <div className='moim-banner'>
        <div className='moim-banner-icon'/>
        <div className='moim-banner-searchBox' >
          <div className='moim-banner-title'>소모임에 오신걸 환영해요!</div>
          <div className='moim-banner-searchBar'>
              <input className='moim-banner-searchBar-input' placeholder='관심 모임을 검색해보세요'/>
              <span><FontAwesomeIcon icon={faSearch}  size='lg' style={{color:'#9c9c9c'}}/></span>    
          </div>
        </div>
      </div>

      <div className='moim-myMoim'>
        <div className='moim-myMoim-title'>&nbsp;&nbsp;&nbsp;마이 소모임&nbsp;&nbsp;&nbsp;</div>
        <div className='moim-myMoim-empty'>아직 참여 중인 모임이 없어요 🥲</div>
        {/* ⭐⭐참여중인 모임이 있을때는 컴포넌트로 보여주면 좋을듯 (이미 여기 코드가 너무 많음...) */}
      </div>


      <div className='moim-body'>
        <div className='moim-body-ShowTypeBox'>
          {
            moimShowType.map((title, i)=>{
              return(
                <button 
                  key={i}
                  value={title}
                  className={`moim-body-ShowType ${title === moimShowTypeBtn ? 'moim-ShowType-Active' : ''}`}
                  onClick={moimShowTypeHandler}
                >{title}</button>
              );
            })
          }

          {/* ⭐카테고리 버튼 눌렀을때 보여줄 카테고리 박스 [주제별, 지역별]*/}
          {moimShowTypeBtn === '카테고리' && (
            <div className='moim-body-categoryBox'>
                
                {moimCateType.map((cate, i) => (
                  <div className='moim-body-category' key={i}>
                    <div className='moim-body-categories-title'>{cate.title}</div>
                      <div className='moim-body-categories-content'>
                        {cate.content.map((cateContent, j) => (
                          <button
                            key={j}
                            className={`moim-body-categories-button 
                              ${moimCategoryCheck[cate.name].includes(cateContent) && 'moim-cateBtn-active'}
                            `}
                            onClick={() => moimCategoryHandler(cateContent, cate.name)}
                          > {cateContent}
                          </button>
                        ))}
                      </div>  
                  </div>
                ))}

                <div className='moim-body-category-refresh' onClick={moimCategoryRetryHandler}>
                  <FontAwesomeIcon icon={faRotateRight}  size='sm' style={{color:'#adadad'}}/>
                  <span>새로고침</span>
                </div>
            </div>
          )}

          
        </div>
        
        <div className='moim-body-sortTypeBox'>
          {
            moimSortType.map((sort, i)=>(
              <button 
                key={i}
                className={`moim-body-sortType  ${moimSortTypeCheck === sort ? 'moim-sort-check' : ''}`}
                onClick={()=> moimSortTypeHandler(sort)}
              >{sort}</button>
            ))
          }
        </div>
      </div>

      <Moim2/>

    </div>
  );
}

export default Moim;