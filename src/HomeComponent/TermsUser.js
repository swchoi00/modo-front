import { useParams } from "react-router-dom";
import TermsContents from "../SignUp/TermsContents";

const TermsUser = () => {
  const { id } = useParams();
  const termsText = TermsContents[id];
  const termsTitle = id === "infoTerms" ? "개인정보처리방침" :"이용약관";

  const termsPageStyle = {
    display: 'flex',
    flexDirection : 'column',
    textAlign: 'left',
    padding: '5%',
    gap : '1.5rem'
  }

  return (
    <div className="termsPageContainer" style={termsPageStyle}>
      <h3 style={{fontWeight:'700', textAlign:'center'}}>{termsTitle}</h3>
      {termsText}
    </div>
  )
}

export default TermsUser;