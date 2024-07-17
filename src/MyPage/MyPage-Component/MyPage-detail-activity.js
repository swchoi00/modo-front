import { useEffect, useState } from 'react';
import './MyPage-detail-activity.css';
import axiosInstance from '../../axiosInstance';
import MoimList from '../../Moim/MoimList';
import { useNavigate } from 'react-router-dom';
import PaginationComponent from '../../Pagination/PaginationComponent';
import sorryIcon from '../../Img/sorryIcon.svg';

const MyPageDetailActivity = ({userInfo, pageType, isAuth, setUserInfo,currentPage, setCurrentPage, setMyPageDetail})=>{
  const pageTypeList = ['참여모임', '관심모임','모임 글','커뮤니티 글'];
  const [pageTypeNow, setPageTypeNow] = useState(pageType);
  const [myMoimData, setMyMoimData] = useState([]); // 내 모임
  const [likeMoimData, setLikeMoimData] = useState([]); // 관심모임
  const [moimCommData, setMoimCommData] = useState([]); // 모임 글
  const [commData, setCommData] = useState([]); // 커뮤니티 글
  const page = 10;
  const navigate = useNavigate();
  const typeColors = {'자유': '#6F6C6C','질문·고민': '#FFC727','홍보': '#FC3232','후기': '#7E57C2'};
  const typeColors2 = {'공지': '#FC3232','자유': '#6F6C6C','가입인사': '#7E57C2'};

  useEffect (()=>{
    // 모임 리스트 받아서 내 모임 찾기 , 관심 모임 찾기
    axiosInstance.get("/moimList")
    .then(async (response) => {
      let moimList = response.data;

      // 이미지 URL을 가져오는 비동기 함수
      const fetchMoimImage = async (moim) => {
        try {
          const imageResponse = await axiosInstance.get(`/getMoimThumbnail/${moim.id}`, {
            responseType: 'blob',
          });
          const imageUrl = URL.createObjectURL(imageResponse.data);
          return { ...moim, moimImg: imageUrl };
        } catch (error) {
          console.log(error);
          return moim;
        }
      };

      // 모든 모임의 이미지를 병렬로 가져옴
      const updatedMoimList = await Promise.all(moimList.map(fetchMoimImage));
      setMyMoimData(updatedMoimList.filter(moim =>moim.members.some(data => data.member.id === userInfo.id)));
      setLikeMoimData(updatedMoimList.filter(moim => userInfo?.likedMoim.includes(moim.id)));
    })
    .catch((error) => {
        console.log(error);
    });

    // 내가 쓴 모임게시글 가져오기 
    axiosInstance.get(`/myMoimCommList/${userInfo.id}`)
    .then((response) => {
      setMoimCommData(response.data);
    })
    .catch((error) => {
        console.log(error);
    });
    
    // 커뮤니티 글 받아오기
    axiosInstance.get("/comm_getList")
    .then((response) => {
      setCommData(response.data.filter(comm => comm.author === userInfo.nickname));
    }).catch((error) => {
      console.log(error);
    })
  },[userInfo,pageTypeNow]);




  
  return(
    <div id='myPageActivity'>
      <div className='categoryBox'>
        {
          pageTypeList.map((data, i)=>(
            <span key={i} id={data} className={pageTypeNow === data ? 'check' :''}
                  onClick={()=>{setPageTypeNow(data); setMyPageDetail({'title' : '내 활동', 'type' : data});}}
            >{data}</span>
          ))
        }
      </div>

      <div className='contentBox'>
        {pageTypeNow === '참여모임' ?
          <>
          {
            myMoimData?.length !== 0 ? 
            <MoimList userInfo={userInfo} moimList={myMoimData} isAuth={isAuth} setUserInfo={setUserInfo}/>
            :
            <div className='noResultBox'>
              <img src={sorryIcon} alt=""/>
              <span>아직 참여 중인 모임이 없어요</span>
            </div>
          }
          </>
          : null
        }


        {pageTypeNow === '관심모임' ?  
          <>
          {
            likeMoimData?.length !== 0 ? 
            <MoimList userInfo={userInfo} moimList={likeMoimData} isAuth={isAuth} setUserInfo={setUserInfo}/>
            :
            <div className='noResultBox'>
              <img src={sorryIcon} alt=""/>
              <span>좋아요♡ 버튼을 누른 관심모임이 없어요</span>
            </div>
          }
          </>
        : null       
        }
        
        {pageTypeNow === '커뮤니티 글' ?
          <>
          {
            commData?.length !== 0 ?
            <>
              <div className='Community' style={{width: '100%'}}>
                <div className="list-comm">
                  <div className="tbl" style={{width: '100%'}}>
                    <ul className="th">
                      <li className="no">번호</li>
                      <li className="category">카테고리</li>
                      <li className="postTitle">제목</li>
                      <li className="author">작성자</li>
                      <li className="date">날짜</li>
                      <li className="view">조회수</li>
                    </ul>
                    <ul className="tr">
                      {
                        commData.slice((currentPage - 1) * page, currentPage * page)
                          .map((data, i) => {
                            return (
                              <div key={i} className="td" onClick={() => navigate(`/comm/${data.postno}`)} style={{width: '100%'}}>
                                <li className="no">{i + 1}</li>
                                <li className="item category" style={{ color: typeColors[data.categories], fontWeight: 'bold' }}>[{data.categories}]</li>
                                <li className="item postTitle">{data.postname.length > 20 ? data.postname.substring(0, 20) + "..." : data.postname} [{data.replies.length}]</li>
                                <li className="item author">{data.author}</li>
                                <li className="item date">{data.uploadDate}</li>
                                <li className="view">{data.views}</li>
                              </div>
                            );
                          })
                      } 
                    </ul>
                  </div>

                </div>
                {
                  commData?.length !== 0 && commData?.length > 10 ?
                  <div className="paging">
                    <PaginationComponent
                      currentPage={currentPage}
                      itemsPerPage={page}
                      totalItems={commData.length}
                      onPageChange={(page) => setCurrentPage(page)}
                      color="secondary"
                    />
                  </div>
                  :
                  null
                }
              </div> 
            </>
          :
            <div className='noResultBox'>
              <img src={sorryIcon} alt=""/>
              <span>아직 작성한 커뮤니티 게시글이 없어요 </span>
            </div>
          }
          </>
          :null
        }



              

        {pageTypeNow === '모임 글' ?
          <>
          {
            moimCommData?.length !== 0 ?
            <div className='moimDetailBoard-commListBox'>
              <div className='Community'>
                <div className="tbl" style={{width: '100%'}}>
                  <ul className="th">
                    <li className="no">번호</li>
                    <li className="category">카테고리</li>
                    <li className="postTitle">제목</li>
                    <li className="author">작성자</li>
                    <li className="date">날짜</li>
                    <li className="view">조회수</li>
                  </ul>
                  <ul className="tr">
                    {moimCommData
                      .slice((currentPage - 1) * page, currentPage * page)
                      .map((data, i) => {
                        return (
                          <div key={i} className="td" onClick={()=>navigate(`/moim/${data.moim.id}/comm/${data.postno}`)}>
                            <li className="no">{i+1}</li>
                            <li className="item category" style={{ color: typeColors2[data.categories], fontWeight: 'bold' }}>{data.categories}</li>
                            <li className="item postTitle">{data.postname} &nbsp;[{data.replyCount}]</li>
                            <li className="item author">{data.moimMember.member.nickname}</li>
                            <li className="item date">{data.uploadDate}</li>
                            <li className="view">{data.views}</li>
                          </div>
                        );
                      })}
                  </ul>
                
                    
                </div>
              </div>
            {
              moimCommData?.length !== 0 && moimCommData?.length > 10 ?
              <div className="paging">
                <PaginationComponent
                  currentPage={currentPage}
                  itemsPerPage={page}
                  totalItems={moimCommData?.length}
                  onPageChange={(page) => setCurrentPage(page)}
                  color="secondary"
                />
              </div>:null
            }
            </div>
          : 
          <div className='noResultBox'>
            <img src={sorryIcon} alt=""/>
            <span>아직 작성한 모임 게시글이 없어요 </span>
          </div>
          }
          </>
          :null
        }
      </div>
        
      
    </div>
  )
}

export default MyPageDetailActivity;