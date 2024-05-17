import './HotIssue.css';
import hotImage from '../Img/community_hot.png';
import { useNavigate } from 'react-router-dom';

const HotIssue = ({ hotIssues, typeColors }) => {
  const navigate = useNavigate();
  return (
    <>
      {hotIssues.map((issue, i) => (
        <div key={i} className="top5 td" onClick={() => navigate(`/comm/${issue.postno}`)}>
          <li className="no">{issue.postno}</li>
          <li className="category" style={{ color: typeColors[issue.categories], fontWeight: 'bold' }}>[{issue.categories}]</li>
                                                                                                                                                                              {/* {issue.replies.length} */}
          <li className="title postTitle"><img src={hotImage} alt="hot" className="hot-icon"/>{issue.postname.length > 20 ? issue.postname.substring(0, 20) + "..." : issue.postname} [0]</li>
          <li className="author">{issue.author}</li>
          <li className="date">{issue.uploadDate}</li>
          <li className="view">{issue.views}</li>
        </div>
      ))}

    </>
  );
}

export default HotIssue;