import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Search from "../Search";
import Sidebar from "../Sidebar";
import PaginationComponent from "../../../Pagination/PaginationComponent";
import axiosInstance from "../../../axiosInstance";
import { useNavigate } from "react-router-dom";

function InquiryForm( {userInfo, currentPage, setCurrentPage} ) {

    const itemsPerPage = 10;
    const [isInquiryFormLoading, setIsInquiryFormLoading] = useState(true);
    const [InquiryFormList, setInquiryFormList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if(isInquiryFormLoading) {
            getInquiryFormList();
        }
    }, [isInquiryFormLoading]);

    const getInquiryFormList = () => {

        let encodedUsername = encodeURIComponent(userInfo.username);

        axiosInstance.get(`/myInquiryForm/${encodedUsername}`)
        .then((response) => {
            setInquiryFormList(response.data);
            setIsInquiryFormLoading(false);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
            setIsInquiryFormLoading(false);
        })     
    }

    console.log(InquiryFormList);

    const writeInquiryForm = () => {
        navigate('/inquiryForm_write')
    }

    return (
        <div className="FAQ-container">
            <Sidebar></Sidebar>
            <div className='right-FAQ-container'>

                <div className='right-bar-container'>
                    <div className='notice'>
                        <h4 className='faq-title'>1 : 1 문의</h4>
                    </div>
                    {/* <div className='search'>
                        <input type='text' className='search-input' placeholder='Search'></input>
                        <span><FontAwesomeIcon icon={faSearch} style={{ color: '#9c9c9c' }} /></span>
                    </div> */}
                </div>

                <div className='search-result-container'>
                    <Search
                        data={InquiryFormList}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        path={"/"}
                        ad={"/inquiryFormDetail"}
                    />
                </div>

                {userInfo.role === "MEMBER" && (
                    <button style={{ marginTop: "1rem" }} className="writeInquiryForm_btn"
                    onClick={writeInquiryForm}
                    >글 작성</button>
                )}

                <div className='pagination-container'>
                    <PaginationComponent
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        totalItems={InquiryFormList.length}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            </div>



        </div>
    )
}










export default InquiryForm;