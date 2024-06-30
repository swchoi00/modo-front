import { useNavigate } from 'react-router-dom';
import './SignUp2.css';


const SignUpPage = ()=>{
  const navigate = useNavigate();
 
  return (

    <div className="join-container">
      <h3>회원가입</h3>
      <div className="join-typeBox">
        

        <button className='join-naver'
                onClick={() => {
                  window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&state=${process.env.REACT_APP_NAVER_STATE}&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}`
                }}
        >
          <img src="https://d2v80xjmx68n4w.cloudfront.net/assets/icon/icon_naver.png" alt="sns아이콘"/>  
          <span  style={{color:"white"}}>네이버로 회원가입</span>
        </button>
      
        <button className='join-kakao'
                onClick={() => {
                  window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`
                }}
        >
          <img src="https://d2v80xjmx68n4w.cloudfront.net/assets/icon/icon_kakao.png" alt="sns아이콘"></img>
          <span style={{color:"#333333"}}>카카오로 회원가입</span>
        </button>


        <button className='join-google'
                onClick={() => {
                  window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=token&scope=openid%20email%20profile`;
                }}
        >
          <img src="https://d2v80xjmx68n4w.cloudfront.net/assets/icon/icon_google.png" alt="sns아이콘"/>
          <span style={{color:"white"}}>구글로 회원가입</span>
        </button>


        
        <button className='join-email' onClick={()=>{navigate('/signUp')}}>
          <span style={{color:"white"}}>이메일로 회원가입</span>
        </button>
        
      
      
      
      
      </div>


    </div>
  );
}

export default SignUpPage;