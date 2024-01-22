import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Faq.css';
import Sidebar from './Sidebar';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Faq() {

    return (
        <div className="FAQ-container">
            <Sidebar></Sidebar>
            <div className='right-FAQ-container'>

                <div className='right-bar-container'>
                    <div className='notice'>
                        <h4>자주 묻는 질문 (FAQ)</h4>
                <ul className='category-ul'>
                    <li className='category-li'><button className='faq-btn'>소모임</button></li>
                    <li className='category-li'><button className='faq-btn'>회원탈퇴</button></li>
                    <li className='category-li'><button className='faq-btn'>멘토링</button></li>
                </ul>
                    </div>
                    <div className='search'>
                        <input type='text' className='search-input'  placeholder='Search'></input>
                        <span><FontAwesomeIcon icon={faSearch} style={{color:'#9c9c9c'}}/></span>
                    </div>
                </div>

                <tbody style={{ margin: "12px" }}>
                    <tr>
                        <td>테스트 1 자주 묻는 질문 (FAQ)</td>
                    </tr>
                </tbody>

                <tbody style={{ margin: "12px" }}>
                    <tr>
                        <td>테스트 2 자주 묻는 질문 (FAQ)</td>
                    </tr>
                </tbody>

                <tbody style={{ margin: "12px" }}>
                    <tr>
                        <td>테스트 3 자주 묻는 질문 (FAQ)</td>
                    </tr>
                </tbody>
            </div>

        </div>
    )
}

export default Faq;