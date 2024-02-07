import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Faq.css';
import Sidebar from './Sidebar';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Questions from '../FAQ/mockData/Questions';
import { useEffect, useState } from 'react';
import PaginationComponent from '../../Pagination/PaginationComponent';
import Search from './Search';
import axiosInstance from '../../axiosInstance';

function Faq({ userInfo, currentPage, setCurrentPage }) {
    const [questionsList, setQuestionsList] = useState(Questions);
    const [isFaqLoading, setIsFaqLoading] = useState(true);
    const itemsPerPage = 10;

    const categories = ['all', '소모임', '멘토링', '계정관련'];
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredData = selectedCategory === 'all' ? questionsList : questionsList.filter(item => item.category === selectedCategory);

    const navigate = useNavigate();


    useEffect(() => {
        if(isFaqLoading) {
            getFaqList();
        }
    }, [isFaqLoading]);


    const getFaqList = () => {
        axiosInstance.get("/faq")
        .then((response) => {
            setQuestionsList([
                ...questionsList,
                ...response.data
            ]);

            setIsFaqLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setIsFaqLoading(false);
        })
    }
   

    const writeFaqBtn = () => {
        navigate('/faq_write')
    }

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
                                        onClick={() => {
                                            setSelectedCategory(category);
                                            setCurrentPage(1); // 현재 페이지를 1로 설정
                                        }}
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

                

                <div className='search-result-container'>
                    <Search
                        data={filteredData}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        path={"/"}
                        ad={"/faqDetails"}
                        selectedCategory={selectedCategory}
                    />

                </div>

                {userInfo.role === "ADMIN" && (
                    <button style={{marginTop : "1rem"}} onClick={writeFaqBtn}>글 작성</button>
                )}

                <div className='pagination-container'>
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
