import './Sidebar.css';

function Sidebar () {
    return (
        <div className="Sidebar">
            <div className='left-FAQ-container'>
                <div className="left-bar-container">
                    <ul className="left-bar-ul">
                        <li className='left-bar-li'>공지사항</li>
                        <li className='left-bar-li'>자주 묻는 질문 (FAQ)</li>
                        <li className='left-bar-li'>1:1 문의</li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Sidebar;