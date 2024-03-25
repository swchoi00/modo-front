import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import axiosInstance from "../../axiosInstance";

function Faq_write( {userInfo} ) {

    console.log('FAQ 작성 유저정보 : ', userInfo);
    
    const navigate = useNavigate();

    const [faqData, setFaqData] = useState({
        adminName : userInfo.username,
        title : '',
        category : '',
        content : '',
    });

    const faqDataHandler = (e) => {
        const {id, value} = e.target;
        setFaqData({
            ...faqData,
            [id] : value
        })
    }

    const insertFaqHandler = (e) => {
        e.preventDefault();

        if(userInfo.role === 'ADMIN') {
            axiosInstance.post('/faq_insert', faqData)
            .then((response) => {
                alert(response.data);
                navigate('/faq');
            }).catch((error) => {
                console.log(error);
            })
        } else {
            alert('FAQ 작성은 관리자만 가능합니다');
            navigate('/faq');
        }
    }

    useEffect(() => {
        // 페이지가 로드될 때 category를 선택하지 않은 상태로 설정
        setFaqData(prevState => ({
            ...prevState,
            category: ''
        }));
    }, []);

    console.log(faqData);


    return (
        <div className="FAQ-container">
            <Sidebar></Sidebar>
            <div className="right-FAQ-container">

                <div className='right-bar-container'>
                    <div className='notice'>
                        <h6 className='faq-title'>
                            <input type="text" placeholder="FAQ 입력" id="title" onChange={faqDataHandler}></input>
                        </h6>
                    </div>
                </div>

                
                
                <div className="category" style={{marginTop : "1rem"}}>
                    <select id="category" value={faqData.category} onChange={faqDataHandler}>
                        <option value="">카테고리 선택</option>
                        <option value="소모임">소모임</option>
                        <option value="멘토링">멘토링</option>
                        <option value="계정관련">계정관련</option>
                    </select>
                </div>

                <div className="" style={{ marginTop: "1rem" }}>
                    <textarea id="content" onChange={faqDataHandler}></textarea>
                </div>

                <div className="btn-container">
                    <button onClick={insertFaqHandler}>글 작성</button>&nbsp;
                    <button>뒤로가기</button>
                </div>

            </div>
        </div>
    )
}


export default Faq_write;