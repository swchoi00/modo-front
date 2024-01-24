import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar () {
    return (
        <div className="Sidebar">
            <div className='left-FAQ-container'>
                <div className="left-bar-container">
                    <ul className="left-bar-ul">
                        <li className='left-bar-li'><Link to={"/notice"}>공지사항</Link></li>
                        <li className='left-bar-li'><Link to={"/faq"}>자주 묻는 질문 (FAQ)</Link></li>
                        <li className='left-bar-li'><Link to={"/inquieryForm"}>1:1 문의</Link></li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Sidebar;