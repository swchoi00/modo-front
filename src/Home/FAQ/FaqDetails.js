import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import data from '../FAQ/mockData/Questions'; // 예시로 데이터 가져오기
import Sidebar from './Sidebar';
import './FaqDetails.css';
import Questions from '../FAQ/mockData/Questions';
import axiosInstance from '../../axiosInstance';



function FaqDetails( {state} ) {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    // const selectedData = data.find(item => item.id === parseInt(id));

    const [isLoading, setIsLoading] = useState(true);
    const [faqDetail, setFaqDetail] = useState();

    useEffect(() => {
        if(id.startsWith('FAQ')) {
            const faqId = parseInt(id.replace('FAQ', ''), 10);
            const mockData = Questions.find(item => item.id === `FAQ${faqId}`);

            if (mockData) {
                setFaqDetail(mockData);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        } else {
            axiosInstance.get(`/faqDetails/${id}`)
            .then((response) => {
                setFaqDetail(response.data);
                setIsLoading(false);
            }).catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
        }
    }, [id]);

    if(isLoading)
    return 
    <div>
        데이터 로딩중
    </div>

    const returnListHandler = () => {
        navigate('/faq', {
            state: {
                ...state,
                // 추가적인 상태를 필요에 따라 여기에 추가할 수 있습니다.
            }
        });
    }
    
    return (
        <div className="FAQ-container">
            <Sidebar></Sidebar>
            <div className='right-FAQ-container'>

                <div className='right-bar-container'>
                    <div className='notice'>
                        <h4 className='faq-title'>{faqDetail.title}</h4>
                    </div>

                </div>
                
                <div className='faq-content-container'>
                    {faqDetail.content}
                </div>

                <button onClick={returnListHandler}>
                    목록으로
                </button>


        </div>
    </div>
    );
}

export default FaqDetails;