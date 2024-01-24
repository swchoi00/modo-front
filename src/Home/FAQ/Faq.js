import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Faq.css';
import Sidebar from './Sidebar';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Questions from '../FAQ/mockData/Questions';
import { useState } from 'react';
import PaginationComponent from '../../Pagination/PaginationComponent';
import Search from './Search';

function Faq() {
    const [questionsList, setQuestionsList] = useState(Questions);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const categories = ['all', '소모임', '멘토링', '계정관련'];
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredData = selectedCategory === 'all' ? questionsList : questionsList.filter(item => item.category === selectedCategory);


    console.log(questionsList);

    return (
        <div className="FAQ-container">
            <Sidebar></Sidebar>
            <div className='right-FAQ-container'>

                <div className='right-bar-container'>
                    <div className='notice'>
                        <h4 className='faq-title'>자주 묻는 질문 (FAQ)</h4>
                        <ul className='category-ul'>
                            {/* <li className='category-li'><button className='faq-btn'>소모임</button></li>
                            <li className='category-li'><button className='faq-btn'>회원탈퇴</button></li>
                            <li className='category-li'><button className='faq-btn'>멘토링</button></li> */}
                            {categories.map(category => (
                                <li
                                key={category}
                                className={`category-li ${selectedCategory === category ? 'clicked' : ''}`}
                            >
                                <button
                                    className={`faq-btn ${selectedCategory === category ? 'clicked' : ''}`}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category === 'all' ? '전체' : category}
                                </button>
                            </li>
                            ))}
                        </ul>
                    </div>
                    <div className='search'>
                        <input type='text' className='search-input' placeholder='Search'></input>
                        <span><FontAwesomeIcon icon={faSearch} style={{ color: '#9c9c9c' }} /></span>
                    </div>
                </div>

                <div className='Search'>
                    <Search
                    data={filteredData}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    path={"/"}
                    ad={"/questions"}
                    selectedCategory={selectedCategory}
                    />

                </div>

                <div className='pagination'>
                    <PaginationComponent
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        totalItems={filteredData.length}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>



        </div>
    )
}

export default Faq;
