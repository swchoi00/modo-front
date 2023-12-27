import { Link } from 'react-router-dom';
import './Footer.css';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faApple } from "@fortawesome/free-brands-svg-icons";
// import { faPlay } from '@fortawesome/free-solid-svg-icons';


const Footer = () =>{
  return(
    <div className="footer-container">
      <div className='footer-container2'>
        <div className='footer-box'>
          <div className='footer-logoBox'>
            <div className='footer-logo'/>
            <div className='footer-logo-title'>모두의 도전은 모도!</div>
          </div>
          <div className='footer-navBox'>
            <Link className='footer-nav-aTag' to = {"/"}>회사소개</Link>
            <Link className='footer-nav-aTag' to = {"/"}>소모임안내</Link>
            <Link className='footer-nav-aTag' to = {"/"}>멘토링안내</Link>
            <Link className='footer-nav-aTag' to = {"/"}>문의하기</Link>
          </div>
        </div>
        <div className='footer-box2'>
          <div>(주)Modo &nbsp; | &nbsp; 개발책임자 : 최예원, 최상운</div>
          <div>주소 : 49, Hwagok-ro, Gangseo-gu, Seoul, Republic of Korea &nbsp; | &nbsp; 전화번호: 1588-0000 &nbsp; | &nbsp; </div>
          <div>사업자등록번호: xxx-xx-xxxxx &nbsp; | &nbsp; 이메일 : dpdnjs0312@gamil.com &nbsp; | &nbsp; Github : https://github.com/swchoi00/modo-front</div>
        </div>
        <div className='footer-box2-mobile'>
          (주)Modo &nbsp; | &nbsp; 개발책임자 : 최예원, 최상운 &nbsp; | &nbsp; 주소 : 49, Hwagok-ro, Gangseo-gu, Seoul, Republic of Korea &nbsp; | &nbsp; 전화번호: 1588-0000 &nbsp; | &nbsp; 사업자등록번호: xxx-xx-xxxxx &nbsp; | &nbsp; 이메일 : dpdnjs0312@gamil.com &nbsp; | &nbsp; Github : https://github.com/swchoi00/modo-front 
        </div>

        <div className='footer-box3'>
          <Link className='footer-nav-aTag2' to = {"/"}>고객센터</Link>
          <Link className='footer-nav-aTag2' to = {"/"}>이용약관</Link>
          <Link className='footer-nav-aTag2' to = {"/"}>개인정보처리방침</Link>
        </div>
      </div>
      
      <div className='ect-info'>
        <div>Copyright ©2023 Modo Inc. All Rights Reserved.</div>
      </div>
      
    </div>
  )
}

export default Footer;
