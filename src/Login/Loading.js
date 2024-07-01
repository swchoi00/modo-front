import loadingGif from '../Img/LoginLoaging.gif';

const loadingBoxStyle = {
  width: '100%',
  height: '500px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
};


const Loading = () =>{
  return(
    <div style={loadingBoxStyle}>
      <h5 style={{color: '#434656'}}>잠시만 기다려주세요</h5>
      <img src = {loadingGif} alt="로딩이미지" style={{width: '200px'}}/>
    </div>
  );
}

export default Loading;