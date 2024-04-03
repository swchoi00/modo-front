import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../axiosInstance";
import Sidebar from "../Sidebar";
import Reply from "../Reply/Reply";

function InquiryFormDetail({ userInfo, state }) {

    
    const { id } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [Detail, setDetail] = useState();

    useEffect(() => {
        axiosInstance.get(`/inquiryFormDetail/${id}`)
            .then((response) => {
                setDetail(response.data);
                setIsLoading(false);

                console.log(response.data);
            }).catch((error) => {
                console.log(error);
                setIsLoading(false);
            })
    }, [id])

    const returnListHandler = () => {
        navigate('/inquiryForm', {
            state: {
                ...state,
                // 추가적인 상태를 필요에 따라 여기에 추가할 수 있습니다.
            }
        });
    }

    if (isLoading) {
        return (
            <div>
                데이터 로딩중
            </div>
        );
    }



    return (
        <div className="FAQ-container">
            <Sidebar></Sidebar>
            <div className='right-FAQ-container'>

                <div className='right-bar-container'>
                    <div className='notice'>
                        <h4 className='faq-title'>{Detail.title}</h4>
                    </div>

                </div>

                <div className='faq-content-container'>
                    {Detail.content}
                </div>

                <div>
                    {/* <Reply inquiryFormId={id} userInfo={userInfo}/> */}
                </div>
                
                <hr></hr>
                <button onClick={returnListHandler}>
                    목록으로
                </button>
            </div>
            
        </div>
    );
}

export default InquiryFormDetail;