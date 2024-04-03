import './HotIssue.css';
import hotImage from '../Img/community_hot.png';

const HotIssue = ({ hotIssues, typeColors }) => {
  
  return (
    <>
      {hotIssues.map((issue, i) => (
        <tr key={i} className="top5">
          <td>{issue.postNo}</td>
          <td style={{ color: typeColors[issue.category], fontWeight: 'bold' }}>[{issue.category}]</td>
          <td className="title"><img src={hotImage} alt="hot" className="hot-icon"/>{issue.title}</td>
          <td>{issue.writer}</td>
          <td>{issue.date}</td>
          <td>{issue.view}</td>
        </tr>
      ))}

    </>
  );
}

export default HotIssue;