import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaginationComponent from '../../Pagination/PaginationComponent';
import Sidebar from "./Sidebar";
import Search from './Search';
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import Notices from "../FAQ/mockData/Notices";

function Notice ( {currentPage, setCurrentPage} ) {

    const itemsPerPage = 10;
    const [isNoticeLoading, setIsNoticeLoading] = useState(true);
    const [noticeList, setNoticeList] = useState([]);

    useEffect(() => {
        if(isNoticeLoading) {
            getNoticeList();
        }
    }, [isNoticeLoading]);
    
    const getNoticeList = () => {
        axiosInstance.get("/notice")
        .then((response) => {
            setNoticeList([
                ...Notices,
                ...response.data
            ]);

            setIsNoticeLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setIsNoticeLoading(false);
        })
    }

    return (
        <div className="FAQ-container">
            <Sidebar></Sidebar>
            <div className='right-FAQ-container'>

                <div className='right-bar-container'>
                    <div className='notice'>
                        <h4 className='faq-title'>공지사항</h4>
                    </div>
                    {/* <div className='search'>
                        <input type='text' className='search-input' placeholder='Search'></input>
                        <span><FontAwesomeIcon icon={faSearch} style={{ color: '#9c9c9c' }} /></span>
                    </div> */}
                </div>

                <div className='Search'>
                    <Search
                    data={noticeList}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    path={"/"}
                    ad={"/noticeDetails"}
                    />
                </div>
{/* 
                <div className='pagination'>
                    <PaginationComponent
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        totalItems={filteredData.length}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div> */}
            </div>



        </div>
    )
}

export default Notice;