import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import axiosInstance from "../../axiosInstance";
import { useState } from "react";

function Notice_write( {userInfo} ) {

    console.log('공지사항 작성 유저정보 : ', userInfo);
    
    const navigate = useNavigate();

    const [noticeData, setNoticeData] = useState({
        adminName : userInfo.username,
        title : '',
        content : '',
    });

    const noticeDataHandler = (e) => {
        const {id, value} = e.target;
        setNoticeData({
            ...noticeData,
            [id] : value
        })
    }

    const insertNoticeHandler = (e) => {
        e.preventDefault();

        if(userInfo.role === 'ADMIN') {
            axiosInstance.post('/notice_insert', noticeData)
            .then((response) => {
                alert(response.data);
                navigate('/notice');
            }).catch((error) => {
                console.log(error);
            })
        } else {
            alert('공지사항 작성은 관리자만 가능합니다');
            navigate('/notice');
        }
    }


    return (
        <div className="FAQ-container">
            <Sidebar></Sidebar>
            <div className="right-FAQ-container">

                <div className='right-bar-container'>
                    <div className='notice'>
                        <h6 className='faq-title'>
                            <input type="text" placeholder="공지사항 입력" id="title" onChange={noticeDataHandler}></input>
                        </h6>
                    </div>
                </div>

                <div className="" style={{ marginTop: "1rem" }}>
                    <textarea id="content" onChange={noticeDataHandler}></textarea>
                </div>

                <div className="btn-container">
                    <button onClick={insertNoticeHandler}>글 작성</button>&nbsp;
                    <button>뒤로가기</button>
                </div>

            </div>
        </div>
    )

}

export default Notice_write;