import { useState } from "react";
import Sidebar from "../Sidebar";
import axiosInstance from "../../../axiosInstance";
import { useNavigate } from "react-router-dom";

function InquiryForm_write( {userInfo} ) {

    const navigate = useNavigate();

    const [inquiryFormData, setInquiryFormData] = useState({
        title : '',
        content : '',
        writerName : userInfo.username,
    });

    const inquiryFormDataHandler = (e) => {
        const {id, value} = e.target;
        setInquiryFormData({
            ...inquiryFormData,
            [id] : value
        })
    }
    
    const insertInquiryFormHandler = (e) => {
        e.preventDefault();
        
        axiosInstance.post('/inquiryForm_insert', inquiryFormData)
        .then((response) => {
            alert(response.data);
            navigate('/inquiryForm');
        }).catch((error) => {
            console.log(error);
        })

    }

    console.log(inquiryFormData);

    return (
        <div className="FAQ-container">
            <Sidebar></Sidebar>
            <div className="right-FAQ-container">

                <div className='right-bar-container'>
                    <div className='notice'>
                        <h6 className='faq-title'>
                            <input type="text" placeholder="문의 제목을 입력해주세요" id="title" onChange={inquiryFormDataHandler}></input>
                        </h6>
                    </div>
                </div>

                <div className="" style={{ marginTop: "1rem" }}>
                    <textarea id="content" onChange={inquiryFormDataHandler}>문의 내용을 입력해주세요</textarea>
                </div>

                <div className="btn-container">
                    <button onClick={insertInquiryFormHandler}>글 작성</button>&nbsp;
                    <button>뒤로가기</button>
                </div>

            </div>
        </div>
    )
}

export default InquiryForm_write;