import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaginationComponent from '../../Pagination/PaginationComponent';
import Sidebar from "./Sidebar";
import Search from './Search';
import { useState } from "react";

function Notice () {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

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

                {/* <div className='Search'>
                    <Search
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    path={"/"}
                    ad={"/questions"}
                    />

                </div> */}
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