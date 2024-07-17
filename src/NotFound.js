import sorry from './Img/sorryIcon.svg';

const NotFoundPage = ()=>{

  return(
    <div style={{display:'flex', justifyContent: 'center', alignItems:'center', height: '60vh', width: '100%', flexDirection:'column'}}>
      <img src={sorry} alt="" style={{width:'10rem', marginBottom:'1rem'}}/>
      <h5>존재하지 않는 페이지 입니다</h5>
    </div>
  )
}

export default NotFoundPage;